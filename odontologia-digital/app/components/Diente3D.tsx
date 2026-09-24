"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry } from "three";

// Molar en malla 3D (estilo del logo) que gira sobre su eje vertical.
export default function Diente3D({ size = 200 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 1.3, 8.8);
      camera.lookAt(0, -0.05, 0);

      const cian = new THREE.Color("#3fe3f2");
      const lineMat = new THREE.LineBasicMaterial({
        color: cian,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pointMat = new THREE.PointsMaterial({
        color: cian,
        size: 0.075,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const diente = new THREE.Group();
      const agregar = (geo: BufferGeometry) => {
        diente.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat));
        diente.add(new THREE.Points(geo, pointMat));
      };

      // Superficie paramétrica (u = vuelta, v = altura) cerrada en u.
      const superficie = (
        f: (u: number, v: number) => [number, number, number],
        nu: number,
        nv: number,
      ) => {
        const verts: number[] = [];
        const idx: number[] = [];
        for (let j = 0; j <= nv; j++)
          for (let i = 0; i < nu; i++) verts.push(...f((i / nu) * Math.PI * 2, j / nv));
        for (let j = 0; j < nv; j++)
          for (let i = 0; i < nu; i++) {
            const a = j * nu + i;
            const b = j * nu + ((i + 1) % nu);
            const c = a + nu;
            const d = b + nu;
            idx.push(a, c, b, b, c, d);
          }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        g.setIndex(idx);
        return g;
      };
      // Ruido determinista para que la malla tenga triángulos irregulares, como en el logo.
      const ruido = (x: number, y: number, z: number) => {
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
        return (n - Math.floor(n)) * 2 - 1;
      };
      const jitter = (p: [number, number, number], a: number): [number, number, number] => [
        p[0] + ruido(p[0], p[1], p[2]) * a,
        p[1] + ruido(p[1], p[2], p[0]) * a,
        p[2] + ruido(p[2], p[0], p[1]) * a,
      ];
      const suave = (t: number) => t * t * (3 - 2 * t);

      // Corona: abombada, con cuatro lóbulos (cúspides) redondeados y surco central.
      const cuspides: [number, number][] = [
        [-0.5, -0.42],
        [0.52, -0.4],
        [-0.48, 0.44],
        [0.5, 0.46],
      ];
      const relieve = (x: number, z: number) =>
        Math.max(...cuspides.map(([cx, cz]) => Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / 0.2)));
      const corona = superficie(
        (u, v) => {
          // v: 0 = centro de la cara oclusal, 1 = cuello.
          let r: number;
          let y: number;
          if (v < 0.35) {
            const s = v / 0.35;
            r = Math.sin(s * (Math.PI / 2));
            const x = Math.cos(u) * r;
            const z = Math.sin(u) * r;
            y = 0.95 + 0.5 * relieve(x * 1.1, z) - 0.3 * s ** 4;
          } else {
            const s = (v - 0.35) / 0.65;
            r = 1 + 0.1 * Math.sin(s * Math.PI * 0.8) - 0.2 * suave(Math.max(0, (s - 0.5) / 0.5));
            y = 0.65 - s * 1.2;
          }
          const ex = 1.12 + 0.04 * Math.cos(2 * u);
          return jitter([Math.cos(u) * r * ex, y, Math.sin(u) * r], v > 0.03 ? 0.03 : 0);
        },
        24,
        14,
      );
      agregar(corona);

      // Tres raíces largas (dos vestibulares y una palatina) que se afinan y abren hacia la punta.
      const raices: [number, number, number, number][] = [
        [-0.46, 0.26, -0.28, 0.1],
        [0.48, 0.24, 0.26, 0.08],
        [0.02, -0.42, 0.04, -0.24],
      ];
      for (const [bx, bz, dx, dz] of raices) {
        const raiz = superficie(
          (u, v) => {
            const r = 0.46 * Math.pow(1 - v, 0.8) + 0.05;
            const y = -0.25 - v * 2.25;
            const curva = Math.sin(v * Math.PI * 0.85);
            const cx = bx + dx * curva - bx * 0.2 * v * v;
            const cz = bz + dz * curva;
            return jitter([cx + Math.cos(u) * r, y, cz + Math.sin(u) * r * 0.9], 0.028 * (1 - v));
          },
          12,
          10,
        );
        agregar(raiz);
      }
      diente.position.y = 0.55;
      diente.rotation.x = 0.08;
      scene.add(diente);

      // Anillo de escaneo fijo a media corona, con halo.
      const anilloMat = new THREE.MeshBasicMaterial({
        color: cian,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      const anillo = new THREE.Group();
      anillo.add(new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.016, 8, 120), anilloMat));
      anillo.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(2.05, 0.045, 8, 120),
          new THREE.MeshBasicMaterial({ color: cian, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending }),
        ),
      );
      anillo.rotation.x = Math.PI / 2 - 0.26;
      anillo.position.y = 1.05;
      scene.add(anillo);

      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        if (e) visible = e.isIntersecting;
      });
      io.observe(el);

      let raf = 0;
      let t0 = performance.now();
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const dt = (t - t0) / 1000;
        t0 = t;
        if (!reducido) {
          diente.rotation.y += dt * ((Math.PI * 2) / 8);
        }
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [size]);

  return <div ref={ref} className="diente-3d" style={{ width: size, height: size }} aria-hidden />;
}
