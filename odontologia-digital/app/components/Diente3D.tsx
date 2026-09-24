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
      camera.position.set(0, 0.9, 8.6);
      camera.lookAt(0, 0, 0);

      const cian = new THREE.Color("#3fe3f2");
      const lineMat = new THREE.LineBasicMaterial({
        color: cian,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const pointMat = new THREE.PointsMaterial({
        color: cian,
        size: 0.06,
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
      // Sección "cuadrada redondeada" (superelipse).
      const sq = (t: number) => {
        const c = Math.abs(Math.cos(t));
        const s2 = Math.abs(Math.sin(t));
        return 1 / Math.pow(c ** 3 + s2 ** 3, 1 / 3);
      };

      // Corona + cuello: tapa con cuatro cúspides y surco central.
      const corona = superficie(
        (u, v) => {
          let r: number;
          let y = 1.0 - v * 1.75;
          if (v < 0.2) r = Math.sin((v / 0.2) * (Math.PI / 2));
          else if (v < 0.6) r = 1 + 0.06 * Math.sin(((v - 0.2) / 0.4) * Math.PI);
          else r = 1 - 0.3 * ((v - 0.6) / 0.4);
          if (v < 0.22) {
            const cusp = Math.max(0, Math.cos(4 * (u - Math.PI / 4)));
            y += cusp * 0.2 * (v / 0.22) - 0.3 * (1 - v / 0.22);
          }
          const k = sq(u) * r;
          return [Math.cos(u) * k * 1.22, y, Math.sin(u) * k * 0.98];
        },
        24,
        16,
      );
      agregar(corona);

      // Dos raíces anchas que nacen del cuello y se afinan hacia la punta.
      for (const lado of [-1, 1]) {
        const raiz = superficie(
          (u, v) => {
            const r = 0.5 * (1 - v) + 0.09;
            const y = -0.45 - v * 2.0;
            const x = lado * (0.5 + 0.12 * v - 0.18 * v * v) + Math.cos(u) * r;
            return [x, y, Math.sin(u) * r * 1.35];
          },
          12,
          9,
        );
        agregar(raiz);
      }
      diente.position.y = 0.72;
      scene.add(diente);

      // Línea de escaneo horizontal, como en el logo.
      const anillo = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.012, 6, 90),
        new THREE.MeshBasicMaterial({ color: cian, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }),
      );
      anillo.rotation.x = Math.PI / 2;
      anillo.position.y = 0.6;
      scene.add(anillo);

      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
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
          anillo.position.y = 0.6 + Math.sin(t / 900) * 1.1;
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
