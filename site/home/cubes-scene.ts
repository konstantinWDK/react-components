/**
 * Cubes hero scene for reactcomponents.dev (three.js).
 *
 * Hundreds of thin rounded cubes — light sky blue glass and black — fly in from the sky and
 * diagonally from both sides and assemble a voxel React atom across the hero. Once built, cubes
 * keep detaching and flying back, so the figure is always "under construction"; loose cubes rain
 * and drift in the background. Hovering makes the cubes breathe like water: concentric ripples
 * swell and lift them around the cursor (all in the vertex shader).
 *
 * Returns a cleanup function. Honours prefers-reduced-motion (static figure) and pauses when the
 * canvas is off-screen or the tab is hidden.
 */
import type * as THREE_NS from 'three';

type THREE = typeof THREE_NS;
type Vec3 = { x: number; y: number; z: number };

interface Cube {
  mesh: 0 | 1; // 0 = sky glass, 1 = black
  index: number;
  size: number;
  target: Vec3;
  from: Vec3;
  rotFrom: Vec3;
  rot: Vec3;
  t0: number;
  dur: number;
}

interface Loose {
  mesh: 0 | 1;
  index: number;
  size: number;
  pos: Vec3;
  vel: Vec3;
  rot: Vec3;
  spin: Vec3;
}

const SKY = [0.49, 0.83, 0.99]; // #7dd3fc
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vGlow;
  varying float vDepth;

  void main() {
    mat4 inst = modelMatrix * instanceMatrix;
    vec4 center = inst * vec4(0.0, 0.0, 0.0, 1.0);

    // Water breathing: concentric ripples around the cursor, fading with distance.
    float d = distance(center.xy, uMouse);
    float wave = sin(d * 2.1 - uTime * 3.4);
    float reach = exp(-(d * d) / 14.0) * uHover;
    float breathe = 1.0 + 0.42 * reach * (0.55 + 0.45 * wave);

    vec4 world = inst * vec4(position * breathe, 1.0);
    world.z += reach * wave * 0.85;
    world.y += reach * 0.18 * sin(uTime * 2.0 + d);

    vNormal = normalize(mat3(inst) * normal);
    vView = normalize(cameraPosition - world.xyz);
    vGlow = reach * (0.5 + 0.5 * wave);
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTone; // 0 = sky glass, 1 = black
  uniform vec3 uSky;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vGlow;
  varying float vDepth;

  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float rim = pow(1.0 - facing, 3.0);          // thin bright edges
    float fog = smoothstep(46.0, 18.0, vDepth);  // far cubes fade out
    vec3 color;
    float alpha;
    if (uTone < 0.5) {
      color = uSky * (0.22 + 2.1 * rim + 1.2 * vGlow);
      alpha = (0.16 + 1.0 * rim + 0.45 * vGlow) * fog;
    } else {
      color = mix(vec3(0.008, 0.012, 0.024), uSky * 1.1, clamp(pow(rim, 0.8) * 1.15 + vGlow * 0.7, 0.0, 1.0));
      alpha = (0.92) * fog;
    }
    gl_FragColor = vec4(color, alpha);
  }
`;

/** Voxel React atom: three elliptical orbits (0°, 60°, 120°) + a small nucleus. */
function atomTargets(): { p: Vec3; size: number }[] {
  const out: { p: Vec3; size: number }[] = [];
  const rx = 10.5;
  const ry = 3.9;
  for (const angle of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    const steps = 118;
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const ex = rx * Math.cos(t);
      const ey = ry * Math.sin(t);
      const big = Math.random() < 0.28;
      const size = big ? rand(0.5, 0.66) : rand(0.24, 0.4);
      out.push({ p: { x: ex * ca - ey * sa, y: ex * sa + ey * ca, z: rand(-0.35, 0.35) + Math.sin(t) * 0.6 }, size });
      if (Math.random() < 0.22) {
        // a few doubled voxels make the rings feel built, not drawn
        out.push({ p: { x: ex * ca - ey * sa + rand(-0.35, 0.35), y: ex * sa + ey * ca + rand(-0.35, 0.35), z: rand(-0.7, 0.7) }, size: rand(0.18, 0.3) });
      }
    }
  }
  const step = 0.52;
  for (let x = -2; x <= 2; x++)
    for (let y = -2; y <= 2; y++)
      for (let z = -2; z <= 2; z++) {
        if (x * x + y * y + z * z > 4.6) continue;
        out.push({ p: { x: x * step, y: y * step, z: z * step }, size: rand(0.36, 0.48) });
      }
  return out;
}

export function mountCubes(canvas: HTMLCanvasElement, THREE: THREE, RoundedBoxGeometry: new (w?: number, h?: number, d?: number, segments?: number, radius?: number) => THREE_NS.BufferGeometry): () => void {
  const container = canvas.parentElement;
  if (!container) return () => {};
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 120);
  camera.position.set(0, 0, 27);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new RoundedBoxGeometry(1, 1, 1, 3, 0.16);
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(999, 999) },
    uHover: { value: 0 },
    uSky: { value: new THREE.Color(...(SKY as [number, number, number])) },
  };
  const material = (tone: number, transparent: boolean) =>
    new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uTone: { value: tone } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: !transparent,
      blending: transparent ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

  // ── Figure + loose cubes, split between the two meshes ──
  const targets = atomTargets();
  const LOOSE = 110;
  const figure: Cube[] = [];
  const loose: Loose[] = [];
  const counts = [0, 0];
  const take = (mesh: 0 | 1) => counts[mesh]++;

  const spawnFrom = (target: Vec3): Vec3 => {
    const r = Math.random();
    if (r < 0.42) return { x: target.x + rand(-3, 3), y: rand(16, 24), z: target.z + rand(-6, 4) }; // falling from the sky
    if (r < 0.71) return { x: rand(-34, -26), y: target.y - rand(6, 14), z: rand(-8, 6) }; // diagonal from the left
    return { x: rand(26, 34), y: target.y + rand(6, 14), z: rand(-8, 6) }; // diagonal from the right
  };
  const randRot = (): Vec3 => ({ x: rand(-Math.PI, Math.PI), y: rand(-Math.PI, Math.PI), z: rand(-Math.PI, Math.PI) });

  for (const tgt of targets) {
    const mesh: 0 | 1 = Math.random() < 0.66 ? 0 : 1;
    // build order sweeps from left to right with jitter, like an assembly line
    const delay = ((tgt.p.x + 11) / 22) * 3.2 + rand(0, 1.6);
    figure.push({
      mesh, index: take(mesh), size: tgt.size, target: tgt.p, from: spawnFrom(tgt.p),
      rotFrom: randRot(), rot: { x: rand(-0.25, 0.25), y: rand(-0.25, 0.25), z: rand(-0.25, 0.25) },
      t0: delay, dur: rand(1.6, 2.8),
    });
  }
  for (let i = 0; i < LOOSE; i++) {
    const mesh: 0 | 1 = Math.random() < 0.55 ? 0 : 1;
    const big = Math.random() < 0.18;
    loose.push({
      mesh, index: take(mesh), size: big ? rand(0.9, 1.7) : rand(0.16, 0.5),
      pos: { x: rand(-30, 30), y: rand(-16, 16), z: rand(-22, 4) },
      vel: { x: 0, y: 0, z: 0 }, rot: randRot(), spin: { x: rand(-0.5, 0.5), y: rand(-0.5, 0.5), z: rand(-0.3, 0.3) },
    });
  }
  const resetLoose = (c: Loose, initial: boolean) => {
    const mode = Math.random();
    if (mode < 0.5) {
      // rain: falls from the top
      c.pos = { x: rand(-30, 30), y: initial ? rand(-16, 18) : rand(17, 24), z: rand(-22, 2) };
      c.vel = { x: rand(-0.4, 0.4), y: -rand(1.6, 4.2), z: 0 };
    } else {
      // diagonal drift from either side
      const fromLeft = Math.random() < 0.5;
      c.pos = { x: initial ? rand(-30, 30) : fromLeft ? -32 : 32, y: rand(-14, 14), z: rand(-22, 2) };
      c.vel = { x: (fromLeft ? 1 : -1) * rand(1.4, 3.4), y: (fromLeft ? -1 : 1) * rand(0.4, 1.4), z: 0 };
    }
  };
  loose.forEach((c) => resetLoose(c, true));

  const meshes = [
    new THREE.InstancedMesh(geometry, material(0, true), counts[0]),
    new THREE.InstancedMesh(geometry, material(1, false), counts[1]),
  ];
  const group = new THREE.Group();
  meshes.forEach((m) => {
    m.frustumCulled = false;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(m);
  });
  // black (opaque) first, glass on top
  meshes[1].renderOrder = 0;
  meshes[0].renderOrder = 1;
  scene.add(group);

  const dummy = new THREE.Object3D();
  const write = (mesh: 0 | 1, index: number, p: Vec3, r: Vec3, s: number) => {
    dummy.position.set(p.x, p.y, p.z);
    dummy.rotation.set(r.x, r.y, r.z);
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    meshes[mesh].setMatrixAt(index, dummy.matrix);
  };

  // ── Sizing ──
  let visibleW = 30;
  function resize() {
    const w = container!.clientWidth;
    const h = container!.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    visibleW = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
    group.scale.setScalar(Math.min(1, visibleW / 25));
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ── Pointer → world position on the z = 0 plane ──
  const ndc = new THREE.Vector3();
  const dir = new THREE.Vector3();
  let hoverTarget = 0;
  const mouseTarget = new THREE.Vector2(999, 999);
  const onPointer = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    hoverTarget = inside ? 1 : 0;
    if (!inside) return;
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1, 0.5).unproject(camera);
    dir.copy(ndc).sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    mouseTarget.set(camera.position.x + dir.x * dist, camera.position.y + dir.y * dist);
    if (uniforms.uMouse.value.x > 900) uniforms.uMouse.value.copy(mouseTarget);
  };
  const onLeave = () => (hoverTarget = 0);
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  // ── Animation ──
  const clock = new THREE.Clock();
  let elapsed = 0;
  let rafId = 0;
  let visible = true;
  let disposed = false;

  function update(dt: number) {
    elapsed += dt;
    uniforms.uTime.value = elapsed;
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * Math.min(1, dt * 4);
    uniforms.uMouse.value.lerp(mouseTarget, Math.min(1, dt * 6));

    // the finished atom sways gently in 3D
    group.rotation.y = Math.sin(elapsed * 0.18) * 0.28;
    group.rotation.x = Math.sin(elapsed * 0.13) * 0.08;

    for (const c of figure) {
      let k = (elapsed - c.t0) / c.dur;
      if (k >= 1 && elapsed > 9 && Math.random() < dt * 0.045) {
        // keep building: a placed cube detaches and flies back in from somewhere else
        c.from = spawnFrom(c.target);
        c.rotFrom = randRot();
        c.t0 = elapsed;
        c.dur = rand(1.8, 3);
        k = 0;
      }
      k = Math.max(0, Math.min(1, k));
      const e = easeOutBack(k);
      const p = {
        x: c.from.x + (c.target.x - c.from.x) * e,
        y: c.from.y + (c.target.y - c.from.y) * e,
        z: c.from.z + (c.target.z - c.from.z) * e,
      };
      const r = {
        x: c.rotFrom.x + (c.rot.x - c.rotFrom.x) * e + (k >= 1 ? Math.sin(elapsed * 0.6 + c.index) * 0.08 : 0),
        y: c.rotFrom.y + (c.rot.y - c.rotFrom.y) * e,
        z: c.rotFrom.z + (c.rot.z - c.rotFrom.z) * e,
      };
      write(c.mesh, c.index, p, r, k <= 0 ? 0.0001 : c.size * Math.min(1, 0.35 + k));
    }

    const half = visibleW / 2 / group.scale.x + 4;
    for (const c of loose) {
      c.pos.x += c.vel.x * dt;
      c.pos.y += c.vel.y * dt;
      c.rot.x += c.spin.x * dt;
      c.rot.y += c.spin.y * dt;
      c.rot.z += c.spin.z * dt;
      if (c.pos.y < -20 || c.pos.y > 26 || Math.abs(c.pos.x) > Math.max(half, 34)) resetLoose(c, false);
      write(c.mesh, c.index, c.pos, c.rot, c.size);
    }
    meshes.forEach((m) => (m.instanceMatrix.needsUpdate = true));
  }

  function frame() {
    rafId = requestAnimationFrame(frame);
    update(Math.min(clock.getDelta(), 0.05));
    renderer.render(scene, camera);
  }
  function start() {
    if (disposed || rafId || !visible || document.hidden) return;
    clock.getDelta();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  if (reduceMotion) {
    // static, fully built figure
    figure.forEach((c) => (c.t0 = -10));
    update(0.016);
    renderer.render(scene, camera);
  } else {
    start();
  }

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else stop();
  });
  io.observe(container);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  return () => {
    disposed = true;
    stop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVis);
    geometry.dispose();
    meshes.forEach((m) => (m.material as THREE_NS.Material).dispose());
    renderer.dispose();
  };
}
