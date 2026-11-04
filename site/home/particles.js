// @ts-nocheck — ported from the three.js background script of astro HomePage.astro
/** Gold particle field + stars behind the home page. Returns a cleanup function. */
export function mountParticles(canvas, THREE) {


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Color palette
    const goldColors = [
      new THREE.Color('#fef3c7'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#d4a017'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#b8860b'),
      new THREE.Color('#fde68a'),
    ];

    // ========== FLOATING PARTICLES ==========
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 16;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 6 - 2;

      const color = goldColors[Math.floor(Math.random() * goldColors.length)];
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;

      particleSizes[i] = Math.random() * 0.04 + 0.01;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.001,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ========== CONNECTION LINES ==========
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#fbbf24'),
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });

    // ========== BACKGROUND STARS ==========
    const starCount = 600;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 25;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 25;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 10 - 5;

      const color = goldColors[Math.floor(Math.random() * goldColors.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.015,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.4,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const bgStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(bgStars);

    // ========== SHOOTING STARS ==========
    const shootingStars = [];
    const shootingStarGeometry = new THREE.BufferGeometry();
    shootingStarGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));

    for (let i = 0; i < 3; i++) {
      const shootingStarMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color('#ffffff'),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });

      const shootingStar = new THREE.Points(shootingStarGeometry, shootingStarMaterial);
      shootingStar.visible = false;
      scene.add(shootingStar);
      shootingStars.push({
        mesh: shootingStar,
        active: false,
        velocity: new THREE.Vector3(),
        timer: Math.random() * 500 + 200,
      });
    }

    // ========== MOUSE INTERACTION ==========
    const mouse = { x: 0, y: 0 };
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouse = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', onMouse);

    // ========== SCROLL EFFECT ==========
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.pageYOffset;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ========== ANIMATION ==========
    const clock = new THREE.Clock();

    let rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta() || 0.016;

      // Smooth mouse
      mouse.x += (targetMouseX - mouse.x) * 0.03;
      mouse.y += (targetMouseY - mouse.y) * 0.03;

      // Update particles
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const vel = particleVelocities[i];

        positions[i3] += vel.x + Math.sin(elapsed + i) * 0.0003;
        positions[i3 + 1] += vel.y + Math.cos(elapsed * 0.8 + i) * 0.0003;
        positions[i3 + 2] += vel.z;

        // Wrap around
        if (positions[i3] > 8) positions[i3] = -8;
        if (positions[i3] < -8) positions[i3] = 8;
        if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
        if (positions[i3 + 1] < -5) positions[i3 + 1] = 5;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Rotate stars
      bgStars.rotation.y = elapsed * 0.008;
      bgStars.rotation.x = elapsed * 0.004;

      // Camera follows mouse gently
      camera.position.x = mouse.x * 0.15;
      camera.position.y = mouse.y * 0.1;
      camera.lookAt(0, 0, 0);

      // Scroll effect on camera
      camera.position.z = 8 + scrollY * 0.003;

      renderer.render(scene, camera);
    }

    animate();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    document.removeEventListener('mousemove', onMouse);
    window.removeEventListener('scroll', onScroll);
    renderer.dispose();
  };
}
