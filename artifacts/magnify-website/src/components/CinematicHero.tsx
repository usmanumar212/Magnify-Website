import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { CustomEase } from "gsap/CustomEase";
import { Renderer, Camera, Transform, Texture, Program, Mesh, Geometry } from "ogl";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);

const panoramaImages = Array.from({ length: 12 }, (_, idx) => `/hero/img${idx + 1}.png`);

const panoramaText = [
  { title: "Software, made with intention.", subtitle: "Magnify Studio", position: "top" },
  { title: "We build for ambition.", subtitle: "Websites. Apps. Commerce.", position: "center" },
  { title: "Every pixel, every line.", subtitle: "Crafted with discipline.", position: "center" },
  { title: "Magnify your presence.", subtitle: "Birmingham · Abuja", position: "bottom" },
];

function mapPositionClass(key: string) {
  const map: Record<string, string> = {
    top: "ch-top",
    center: "ch-center",
    bottom: "ch-bottom",
  };
  return map[key] || "ch-center";
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (imgRatio > boxRatio) {
    sw = img.naturalHeight * boxRatio;
    sx = (img.naturalWidth - sw) * 0.5;
  } else {
    sh = img.naturalWidth / boxRatio;
    sy = (img.naturalHeight - sh) * 0.5;
  }
  ctx.save();
  ctx.translate(x, y + h);
  ctx.scale(1, -1);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  ctx.restore();
}

function setupFallbackScroll(scrollGuard: HTMLElement, copyHost: HTMLElement) {
  const triggers: ScrollTrigger[] = [];
  [...copyHost.children].forEach((el, index) => {
    const sectionSize = 100 / panoramaText.length;
    const start = index * sectionSize;
    const end = (index + 1) * sectionSize;
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: scrollGuard,
          start: `${start}% top`,
          end: `${end}% top`,
          scrub: 0.8,
        },
      })
      .fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
      .to(el, { opacity: 1, duration: 0.6, ease: "none" })
      .to(el, { opacity: 0, y: -40, duration: 0.2, ease: "power2.in" });
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
  });
  return () => {
    triggers.forEach((t) => t.kill());
  };
}

function createCylinderGeometry(gl: any, radius: number, height: number, radialSegments: number, heightSegments: number) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const yPos = (v - 0.5) * height;
    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * Math.PI * 2;
      positions.push(Math.cos(theta) * radius, yPos, Math.sin(theta) * radius);
      uvs.push(u, 1 - v);
    }
  }
  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < radialSegments; x++) {
      const a = y * (radialSegments + 1) + x;
      const b = a + radialSegments + 1;
      const c = a + 1;
      const d = b + 1;
      indices.push(a, b, c, b, d, c);
    }
  }
  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(positions) },
    uv: { size: 2, data: new Float32Array(uvs) },
    index: { data: new Uint16Array(indices) },
  });
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const copyHostRef = useRef<HTMLDivElement>(null);
  const smoothWrapRef = useRef<HTMLDivElement>(null);
  const smoothFlowRef = useRef<HTMLDivElement>(null);
  const scrollGuardRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let cancelled = false;
    const localTriggers: ScrollTrigger[] = [];
    const lineMeta = new WeakMap<any, { baseAngle: number; speed: number; span: number; radius: number }>();

    if (!CustomEase.get("chSilk")) CustomEase.create("chSilk", "0.45, 0.05, 0.55, 0.95");
    if (!CustomEase.get("chSmooth")) CustomEase.create("chSmooth", "0.25, 0.1, 0.25, 1");
    if (!CustomEase.get("chFlow")) CustomEase.create("chFlow", "0.33, 0, 0.2, 1");
    if (!CustomEase.get("chLinear")) CustomEase.create("chLinear", "0.4, 0, 0.6, 1");

    const canvasHost = canvasHostRef.current!;
    const copyHost = copyHostRef.current!;
    const scrollGuard = scrollGuardRef.current!;

    const activateFallback = (reason?: unknown) => {
      if (reason) console.warn("CinematicHero: falling back to static hero.", reason);
      containerRef.current?.classList.add("ch-fallback-mode");
      const cleanup = setupFallbackScroll(scrollGuard, copyHost);
      localTriggers.push(...ScrollTrigger.getAll().filter((t) => t.vars?.trigger === scrollGuard && !localTriggers.includes(t)));
      return cleanup;
    };

    const canvas = document.createElement("canvas");
    canvasHost.appendChild(canvas);

    const webglProbe = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!webglProbe) {
      const fallbackCleanup = activateFallback();
      return () => {
        cancelled = true;
        fallbackCleanup();
        localTriggers.forEach((t) => t.kill());
        if (canvasHost.contains(canvas)) canvasHost.removeChild(canvas);
      };
    }

    let renderer: any;
    try {
      renderer = new Renderer({
        canvas,
        width: innerWidth,
        height: innerHeight,
        dpr: Math.min(devicePixelRatio, 2),
        alpha: true,
        antialias: true,
      });
    } catch (err) {
      const fallbackCleanup = activateFallback(err);
      return () => {
        cancelled = true;
        fallbackCleanup();
        localTriggers.forEach((t) => t.kill());
        if (canvasHost.contains(canvas)) canvasHost.removeChild(canvas);
      };
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.CULL_FACE);

    const camera = new Camera(gl, { fov: innerWidth < 768 ? 50 : 45, aspect: innerWidth / innerHeight });
    const scene = new Transform();
    camera.position.set(0, 0, innerWidth < 768 ? 6 : 8);

    const geometry = createCylinderGeometry(gl, 2.5, 2, 64, 1);
    const lineParticles: any[] = [];
    const animationCamera = { x: 0, y: 0, z: innerWidth < 768 ? 6 : 8 };

    const imageCanvas = document.createElement("canvas");
    const imageCtx = imageCanvas.getContext("2d", { alpha: false })!;
    const safeLimit = innerWidth < 768 ? 2048 : Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), 8192);
    const totalOriginalWidth = 1024 * panoramaImages.length;
    const scale = Math.min(1, safeLimit / totalOriginalWidth);
    imageCanvas.width = Math.floor(totalOriginalWidth * scale);
    imageCanvas.height = Math.floor(1024 * scale);

    let animationFrameId: number;

    Promise.all(
      panoramaImages.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          })
      )
    )
      .then((imgs) => {
        imgs.forEach((img, i) => {
          const x0 = Math.floor((i / imgs.length) * imageCanvas.width);
          const x1 = Math.floor(((i + 1) / imgs.length) * imageCanvas.width);
          drawCover(imageCtx, img, x0, 0, x1 - x0, imageCanvas.height);
        });

        const texture = new Texture(gl, {
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
          generateMipmaps: false,
        });
        texture.image = imageCanvas;
        texture.needsUpdate = true;

        const cylinder = new Mesh(gl, {
          geometry,
          program: new Program(gl, {
            vertex: `
              attribute vec2 uv;
              attribute vec3 position;
              uniform mat4 modelViewMatrix;
              uniform mat4 projectionMatrix;
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragment: `
              precision highp float;
              uniform sampler2D tMap;
              uniform float uDarkness;
              varying vec2 vUv;
              void main() {
                vec4 tex = texture2D(tMap, vUv);
                tex.rgb *= (1.0 - uDarkness);
                gl_FragColor = tex;
              }
            `,
            uniforms: { tMap: { value: texture }, uDarkness: { value: 0.3 } },
            cullFace: null,
          }),
        });

        cylinder.setParent(scene);
        cylinder.rotation.y = 0.5;
        const cylScale = innerWidth < 768 ? 0.72 : 1;
        cylinder.scale.set(cylScale, cylScale, cylScale);

        for (let i = 0; i < 12; i++) {
          const segments = 20;
          const lineData = [];
          const start = (i / 12) * Math.PI * 2;
          const span = 0.3;
          const radius = 3.3;
          const yPos = i < 6 ? 1.4 + Math.random() * 0.6 : -2 + Math.random() * 0.6;
          for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            const angle = start + span * t;
            lineData.push(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
          }
          const lineGeom = new Geometry(gl, { position: { size: 3, data: new Float32Array(lineData) } });
          const line = new Mesh(gl, {
            geometry: lineGeom,
            mode: gl.LINE_STRIP,
            program: new Program(gl, {
              vertex: `
                attribute vec3 position;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
              `,
              fragment: `
                precision highp float;
                uniform vec3 uColor;
                uniform float uOpacity;
                void main() { gl_FragColor = vec4(uColor, uOpacity); }
              `,
              uniforms: { uColor: { value: [1, 1, 1] }, uOpacity: { value: 0 } },
              transparent: true,
              depthTest: true,
            }),
          });
          lineMeta.set(line, { baseAngle: start, speed: 0.5 + Math.random(), span, radius });
          line.setParent(scene);
          lineParticles.push(line);
        }

        const timeline = gsap.timeline({
          scrollTrigger: { 
            trigger: scrollGuard, 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 1 
          },
        });
        if (timeline.scrollTrigger) localTriggers.push(timeline.scrollTrigger);

        timeline
          .to(animationCamera, { x: 0, y: 0, z: innerWidth < 768 ? 6 : 8, duration: 1, ease: "chSilk" })
          .to(animationCamera, { x: 0, y: 5, z: 5, duration: 1, ease: "chFlow" })
          .to(animationCamera, { x: 1.5, y: 2, z: 2, duration: 2, ease: "chLinear" })
          .to(animationCamera, { x: 0.5, y: 0, z: 0.8, duration: 3.5, ease: "power1.inOut" })
          .to(animationCamera, { x: -6, y: -1, z: innerWidth < 768 ? 6 : 8, duration: 1, ease: "chSmooth" });

        timeline.to(cylinder.rotation, { y: "+=28.27", duration: 8.5, ease: "none" }, 0);

        [...copyHost.children].forEach((el, index) => {
          const sectionSize = 100 / panoramaText.length;
          const start = index * sectionSize;
          const end = (index + 1) * sectionSize;
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: scrollGuard,
                start: `${start}% top`,
                end: `${end}% top`,
                scrub: 0.8,
              },
            })
            .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "chSmooth" })
            .to(el, { opacity: 1, duration: 0.6, ease: "none" })
            .to(el, { opacity: 0, duration: 0.2, ease: "chSmooth" });
          if (tl.scrollTrigger) localTriggers.push(tl.scrollTrigger);
        });

        let prevRot = cylinder.rotation.y;
        const renderLoop = () => {
          if (cancelled) return;
          animationFrameId = requestAnimationFrame(renderLoop);
          camera.position.set(animationCamera.x, animationCamera.y, animationCamera.z);
          camera.lookAt([0, 0, 0]);

          const velocity = cylinder.rotation.y - prevRot;
          prevRot = cylinder.rotation.y;
          const speed = Math.abs(velocity) * 100;
          const moving = Math.abs(velocity) > 0.0001;

          lineParticles.forEach((line) => {
            const meta = lineMeta.get(line);
            if (!meta) return;
            const target = moving ? Math.min(speed * 3, 0.95) : 0;
            const current = line.program.uniforms.uOpacity.value;
            line.program.uniforms.uOpacity.value = current + (target - current) * 0.15;
            if (!moving) return;
            meta.baseAngle += velocity * meta.speed * 1.5;
            const positions = line.geometry.attributes.position.data;
            const segments = 20;
            for (let j = 0; j <= segments; j++) {
              const t = j / segments;
              const angle = meta.baseAngle + meta.span * t;
              positions[j * 3] = Math.cos(angle) * meta.radius;
              positions[j * 3 + 2] = Math.sin(angle) * meta.radius;
            }
            line.geometry.attributes.position.needsUpdate = true;
          });

          renderer.render({ scene, camera });
        };
        renderLoop();
      })
      .catch((err) => {
        if (cancelled) return;
        activateFallback(err);
      });

    const onResize = () => {
      if (cancelled) return;
      renderer.setSize(innerWidth, innerHeight);
      camera.perspective({ fov: innerWidth < 768 ? 50 : 45, aspect: innerWidth / innerHeight });
    };
    addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      removeEventListener("resize", onResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      localTriggers.forEach((t) => t.kill());
      if (canvasHost.contains(canvas)) {
        canvasHost.removeChild(canvas);
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cinematic-hero-wrap {
          position: relative;
          width: 100%;
          font-family: 'Cormorant Garamond', 'Times New Roman', Times, serif;
          font-weight: 300;
          color: white;
          background: #000;
        }
        .ch-canvas-layer, .ch-text-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
        }
        .ch-canvas-layer { z-index: 1; }
        .ch-canvas-layer canvas { width: 100%; height: 100%; display: block; }
        .ch-text-layer { z-index: 6; pointer-events: none; }
        .ch-copy-block {
          position: absolute;
          opacity: 0;
          text-align: center;
          max-width: 70vw;
          width: 100%;
        }
        @media (max-width: 768px) {
          .ch-copy-block { max-width: 90vw; }
        }
        .ch-copy-block h2 { margin: 0; font-size: clamp(2rem, 7vw, 7rem); font-weight: 300; line-height: 0.8; }
        .ch-copy-block p { margin: 0.4rem 0 0; font-size: clamp(1rem, 2vw, 2rem); font-weight: 300; opacity: 0.5; }
        .ch-top { top: 20vh; left: 50%; transform: translateX(-50%); }
        .ch-center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .ch-bottom { bottom: 20vh; left: 50%; transform: translateX(-50%); }
        .ch-scroll-guard { height: 500svh; position: relative; z-index: 4; }
        .ch-fallback-mode .ch-canvas-layer { background: #000; overflow: hidden; }
        .ch-fallback-mode .ch-canvas-layer::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.7) 100%),
            url("/hero/img1.png");
          background-size: cover;
          background-position: center;
          filter: grayscale(100%) contrast(1.05);
          animation: chFallbackPan 40s ease-in-out infinite alternate;
        }
        @keyframes chFallbackPan {
          0% { background-position: 0% 50%; transform: scale(1.05); }
          100% { background-position: 100% 50%; transform: scale(1.15); }
        }
      `}} />
      <div className="cinematic-hero-wrap" ref={containerRef}>
        <div className="ch-canvas-layer" ref={canvasHostRef}></div>
        <div className="ch-text-layer" ref={copyHostRef}>
          {panoramaText.map((item, idx) => (
            <div key={idx} className={`ch-copy-block ${mapPositionClass(item.position)}`}>
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          ))}
        </div>
        <div ref={smoothWrapRef}>
          <div ref={smoothFlowRef}>
            <div className="ch-scroll-guard" ref={scrollGuardRef}></div>
          </div>
        </div>
      </div>
    </>
  );
}