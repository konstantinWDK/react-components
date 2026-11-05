"""Manual fixes applied after scripts/astro2react.mjs (re-run this after any --force regeneration)."""
import re, os
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'src/components/lib'))

def edit(p, pairs):
    s = open(p).read()
    for a, b in pairs:
        if a in s:
            s = s.replace(a, b)
        elif b not in s:
            print('fix not applied:', p, a[:60])
    open(p, 'w').write(s)

# Astro source bug: class:list without opening brace
edit('layout/StickySidebarWrapper.tsx', [('className={cx(undefined)} className]}', "className={cx(['sticky-sidebar', className])}")])
# Astro allows several siblings inside `cond && (...)`
s = open('ecommerce/CartToast.tsx').read()
s = s.replace('{demo && (\n', '{demo && (<>\n', 1)
s = re.sub(r'(aria-label="Dismiss"[^\n]*\n\s*</div>\n)(\s*)\)\}', r'\1\2</>)}', s, count=1) if '</>)}' not in s else s
open('ecommerce/CartToast.tsx', 'w').write(s)
# Dynamic <Body> tag: attribute name not mapped
edit('app/SettingsSection.tsx', [('novalidate={form ? true : undefined}', 'noValidate={form ? true : undefined}')])
# duplicated type import (frontmatter + script)
edit('ecommerce/OrderSummary.tsx', [("import type { ShippingRate } from './types';\n", '')])
# AnimatedGalaxy: style as object, no `class` prop
s = open('AnimatedGalaxy.tsx').read()
s = s.replace('  class?: string;\n  style?: string;', '  style?: CSSProperties;')
s = s.replace("{ className = '', class: classProp = '', style = '' }", "{ className = '', style }")
s = re.sub(r'className=\{`animated-galaxy-svg \$\{className\} \$\{classProp\}`\.trim\(\)\} style=\{st\(style\)\}', 'className={`animated-galaxy-svg ${className}`.trim()} style={style}', s)
s = re.sub(r'/\*\* "a: b; --c: d" → style object \*/\nfunction st\([\s\S]*?\n\}\n\n', '', s)
if 'import type { CSSProperties }' not in s:
    s = s.replace("'use client';\n", "'use client';\n\nimport type { CSSProperties } from 'react';", 1)
open('AnimatedGalaxy.tsx', 'w').write(s)
# ChartFrame: tooltip module is browser-only, initialise it after mount
edit('charts/ChartFrame.tsx', [("import './chart-tooltip';\n", ''),
  ("    mounted.current = true;\n    \n", "    mounted.current = true;\n    import('./chart-tooltip').then((m) => m.initChartTooltips());\n")])
# Astro's GlassNavbar preview passes `brand`, which the component ignores: accept it as optional
s = open('navigation/GlassNavbar.tsx').read()
if 'brand?:' not in s:
    s = s.replace('export interface GlassNavbarProps {', 'export interface GlassNavbarProps {\n  /** Accepted for compatibility with the Astro demo (the logo is rendered instead). */\n  brand?: string;', 1)
open('navigation/GlassNavbar.tsx', 'w').write(s)
# NeumorphicSwitch: Astro preview renders it without an id
s = open('forms/NeumorphicSwitch.tsx').read()
s = re.sub(r'(\n  id): string;', r'\1?: string;', s, count=1)
open('forms/NeumorphicSwitch.tsx', 'w').write(s)
# ApexCharts cannot parse CSS variables: resolve var(--x, fallback) before rendering (bug also in the Astro kit)
RESOLVE = "          const config = JSON.parse(configStr);\n          config.colors = (config.colors || []).map((c: string) => {\n            const m = /^var\\((--[\\w-]+)\\s*(?:,\\s*([^)]+))?\\)$/.exec(String(c).trim());\n            return m ? getComputedStyle(container as Element).getPropertyValue(m[1]).trim() || (m[2] || '').trim() : c;\n          });\n"
for f in ['charts/AreaChart.tsx', 'charts/BarChart.tsx', 'charts/DonutChart.tsx']:
    s2 = open(f).read()
    if 'config.colors = (config.colors' not in s2:
        s2 = s2.replace("          const config = JSON.parse(configStr);\n", RESOLVE, 1)
    open(f, 'w').write(s2)
# DonutChart: ApexCharts exposes seriesTotals, not seriesGlobals (bug also in the Astro kit)
edit('charts/DonutChart.tsx', [('w.globals.seriesGlobals.reduce', 'w.globals.seriesTotals.reduce')])
# ApexCharts grid colour: CSS vars are not supported → neutral translucent grey (works in both themes)
for f in ['charts/AreaChart.tsx', 'charts/BarChart.tsx']:
    edit(f, [("borderColor: 'rgb(var(--ink-rgb, 255 255 255) / 0.05)'", "borderColor: 'rgba(148, 163, 184, 0.12)'")])
print('port-fixes applied')
