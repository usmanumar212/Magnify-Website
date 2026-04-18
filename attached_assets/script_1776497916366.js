import gsap from 'https://esm.sh/gsap@3.13.0';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.13.0/ScrollTrigger';
import { ScrollSmoother } from 'https://esm.sh/gsap@3.13.0/ScrollSmoother';
import { CustomEase } from 'https://esm.sh/gsap@3.13.0/CustomEase';
import { Renderer, Camera, Transform, Texture, Program, Mesh, Geometry } from 'https://esm.sh/ogl@1.0.11';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);
CustomEase.create('uxSilk', '0.45, 0.05, 0.55, 0.95');
CustomEase.create('uxSmooth', '0.25, 0.1, 0.25, 1');
CustomEase.create('uxFlow', '0.33, 0, 0.2, 1');
CustomEase.create('uxLinear', '0.4, 0, 0.6, 1');

const root = document.getElementById('app-root');

let teardown = () => {};

const panoramaImages = Array.from({ length: 12 }, (_, idx) => `./img/img${idx + 1}.webp`);

const panoramaText = [
  { title: 'Immersive experiences', subtitle: 'Where creativity comes to life', position: 'top' },
  { title: 'Infinite Perspective', subtitle: 'Explore new dimensions', position: 'center' },
  { title: 'Inside the Universe', subtitle: 'Immerse yourself in the extraordinary', position: 'center' },
  { title: 'Cinematic GSAP Scroll Experiences', subtitle: '', position: 'bottom' },
];

function mapPositionClass(key) {
  const map = {
    top: 'ux-top',
    center: 'ux-center',
    bottom: 'ux-bottom',
  };
  return map[key] || 'ux-center';
}

function renderShell() {
  root.innerHTML = `
    <div class="ux-shell">
      <div class="ux-canvas-layer" id="ux-canvas-host"></div>
      <div class="ux-text-layer" id="ux-copy-host"></div>
      <div id="ux-smooth-wrap">
        <div id="ux-smooth-flow">
          <div class="ux-scroll-guard" id="ux-scroll-guard"></div>
        </div>
      </div>
    </div>
  `;
}

function drawCover(ctx, img, x, y, w, h) {
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

function createCylinderGeometry(gl, radius, height, radialSegments, heightSegments) {
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

function buildScene() {
  const smoothWrap = document.getElementById('ux-smooth-wrap');
  const smoothFlow = document.getElementById('ux-smooth-flow');
  const canvasHost = document.getElementById('ux-canvas-host');
  const copyHost = document.getElementById('ux-copy-host');
  const scrollGuard = document.getElementById('ux-scroll-guard');

  scrollGuard.style.height = '500svh';
  copyHost.innerHTML = panoramaText
    .map(
      (item) => `
      <div class="ux-copy-block ${mapPositionClass(item.position)}">
        <h2 style="font-size:clamp(2rem,7vw,7rem); font-weight:300; line-height:0.8;">${item.title}</h2>
        <p style="font-size:clamp(1rem,2vw,2rem); font-weight:300; opacity:0.5;">${item.subtitle || ''}</p>
      </div>
    `
    )
    .join('');

  const canvas = document.createElement('canvas');
  canvasHost.appendChild(canvas);

  const smoother = ScrollSmoother.create({
    wrapper: smoothWrap,
    content: smoothFlow,
    smooth: 4,
    effects: false,
    smoothTouch: 0.1,
  });

  const renderer = new Renderer({
    canvas,
    width: innerWidth,
    height: innerHeight,
    dpr: Math.min(devicePixelRatio, 2),
    alpha: true,
    antialias: true,
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 1);
  gl.disable(gl.CULL_FACE);

  const camera = new Camera(gl, { fov: innerWidth < 768 ? 50 : 45, aspect: innerWidth / innerHeight });
  const scene = new Transform();
  camera.position.set(0, 0, innerWidth < 768 ? 6 : 8);

  const geometry = createCylinderGeometry(gl, 2.5, 2, 64, 1);
  const lineParticles = [];
  const animationCamera = { x: 0, y: 0, z: innerWidth < 768 ? 6 : 8 };

  const imageCanvas = document.createElement('canvas');
  const imageCtx = imageCanvas.getContext('2d', { alpha: false });
  const safeLimit = innerWidth < 768 ? 2048 : Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), 8192);
  const totalOriginalWidth = 1024 * panoramaImages.length;
  const scale = Math.min(1, safeLimit / totalOriginalWidth);
  imageCanvas.width = Math.floor(totalOriginalWidth * scale);
  imageCanvas.height = Math.floor(1024 * scale);

  Promise.all(
    panoramaImages.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
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
        line.userData = { baseAngle: start, speed: 0.5 + Math.random(), span, radius };
        line.setParent(scene);
        lineParticles.push(line);
      }

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scrollGuard, start: 'top top', end: 'bottom bottom', scrub: 1 },
      });

      timeline
        .to(animationCamera, { x: 0, y: 0, z: innerWidth < 768 ? 6 : 8, duration: 1, ease: 'uxSilk' })
        .to(animationCamera, { x: 0, y: 5, z: 5, duration: 1, ease: 'uxFlow' })
        .to(animationCamera, { x: 1.5, y: 2, z: 2, duration: 2, ease: 'uxLinear' })
        .to(animationCamera, { x: 0.5, y: 0, z: 0.8, duration: 3.5, ease: 'power1.inOut' })
        .to(animationCamera, { x: -6, y: -1, z: innerWidth < 768 ? 6 : 8, duration: 1, ease: 'uxSmooth' });

      timeline.to(cylinder.rotation, { y: '+=28.27', duration: 8.5, ease: 'none' }, 0);

      [...copyHost.children].forEach((el, index) => {
        const sectionSize = 100 / panoramaText.length;
        const start = index * sectionSize;
        const end = (index + 1) * sectionSize;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scrollGuard,
              start: `${start}% top`,
              end: `${end}% top`,
              scrub: 0.8,
            },
          })
          .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'uxSmooth' })
          .to(el, { opacity: 1, duration: 0.6, ease: 'none' })
          .to(el, { opacity: 0, duration: 0.2, ease: 'uxSmooth' });
      });

      let prevRot = cylinder.rotation.y;
      const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        camera.position.set(animationCamera.x, animationCamera.y, animationCamera.z);
        camera.lookAt([0, 0, 0]);

        const velocity = cylinder.rotation.y - prevRot;
        prevRot = cylinder.rotation.y;
        const speed = Math.abs(velocity) * 100;
        const moving = Math.abs(velocity) > 0.0001;

        lineParticles.forEach((line) => {
          const target = moving ? Math.min(speed * 3, 0.95) : 0;
          const current = line.program.uniforms.uOpacity.value;
          line.program.uniforms.uOpacity.value = current + (target - current) * 0.15;
          if (!moving) return;
          line.userData.baseAngle += velocity * line.userData.speed * 1.5;
          const positions = line.geometry.attributes.position.data;
          const segments = 20;
          for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            const angle = line.userData.baseAngle + line.userData.span * t;
            positions[j * 3] = Math.cos(angle) * line.userData.radius;
            positions[j * 3 + 2] = Math.sin(angle) * line.userData.radius;
          }
          line.geometry.attributes.position.needsUpdate = true;
        });

        renderer.render({ scene, camera });
      };
      renderLoop();
    })
    .catch(() => {});

  const onResize = () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.perspective({ fov: innerWidth < 768 ? 50 : 45, aspect: innerWidth / innerHeight });
  };
  addEventListener('resize', onResize);

  return () => {
    removeEventListener('resize', onResize);
    smoother.kill();
    ScrollTrigger.getAll().forEach((x) => x.kill());
  };
}

function boot() {
  teardown();
  renderShell();
  teardown = buildScene();
}

boot();
