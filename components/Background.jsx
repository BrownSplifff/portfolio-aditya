"use client";
import { useEffect, useRef } from "react";

/**
 * NexusBackground
 * Drop this anywhere in your React app. It renders a full-screen fixed canvas
 * behind all your content. No props required — works out of the box.
 *
 * Usage:
 *   import NexusBackground from "./NexusBackground";
 *   <NexusBackground />
 *
 * Optional props:
 *   particleCount  {number}  default 3500
 *   torusSpeed     {number}  default 1.0  (multiplier for rotation speed)
 */
export default function NexusBackground({
  particleCount = 3500,
  torusSpeed = 1.0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      cleanup = initScene(window.THREE, canvas, particleCount, torusSpeed);
    };
    document.head.appendChild(script);

    return () => {
      if (cleanup) cleanup();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [particleCount, torusSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers — r128-safe capsule (cylinder + two hemisphere caps merged as a Group)
// ─────────────────────────────────────────────────────────────────────────────
function makeCapsuleGroup(
  THREE,
  radiusTop,
  radiusBot,
  height,
  mat,
  segments = 24,
) {
  const g = new THREE.Group();

  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBot, height, segments),
    mat,
  );
  g.add(shaft);

  const top = new THREE.Mesh(
    new THREE.SphereGeometry(
      radiusTop,
      segments,
      12,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    ),
    mat,
  );
  top.position.y = height / 2;
  g.add(top);

  const bot = new THREE.Mesh(
    new THREE.SphereGeometry(
      radiusBot,
      segments,
      12,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2,
    ),
    mat,
  );
  bot.position.y = -height / 2;
  g.add(bot);

  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core scene
// ─────────────────────────────────────────────────────────────────────────────
function initScene(THREE, canvas, PCOUNT, speedMult) {
  // ── Renderer ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x030305, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 30);

  // ── Particle field ────────────────────────────────────────────────────────
  const positions = new Float32Array(PCOUNT * 3);
  const colors = new Float32Array(PCOUNT * 3);

  for (let i = 0; i < PCOUNT; i++) {
    const r = 40 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const hue = Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? 1 : 2;
    if (hue === 0) {
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.93;
    } else if (hue === 1) {
      colors[i * 3] = 0.66;
      colors[i * 3 + 1] = 0.33;
      colors[i * 3 + 2] = 0.97;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.18;
      colors[i * 3 + 2] = 0.47;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ── Lights ────────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x0a0a20, 2));

  const neonLight = new THREE.PointLight(0x00ffe7, 4, 60);
  neonLight.position.set(10, 10, 10);
  scene.add(neonLight);

  const pinkLight = new THREE.PointLight(0xff2d78, 3, 50);
  pinkLight.position.set(-12, -8, 5);
  scene.add(pinkLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 2, 40);
  purpleLight.position.set(0, 15, -10);
  scene.add(purpleLight);

  // Dedicated fill light for the characters
  const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(5, 8, 15);
  scene.add(fillLight);

  // ── ═══════════════════════════════════════════════════════════════════════
  // AMONG US — detailed character
  // ══════════════════════════════════════════════════════════════════════════

  const AU = new THREE.Group();

  // --- Materials ---
  const suitMat = new THREE.MeshStandardMaterial({
    color: 0x00ffe7,
    emissive: 0x001a18,
    emissiveIntensity: 1.5,
    metalness: 0.15,
    roughness: 0.55,
  });

  const suitDarkMat = new THREE.MeshStandardMaterial({
    color: 0x00c4b4,
    emissive: 0x001010,
    emissiveIntensity: 1.2,
    metalness: 0.1,
    roughness: 0.65,
  });

  const footMat = new THREE.MeshStandardMaterial({
    color: 0x009688,
    emissive: 0x000808,
    emissiveIntensity: 1,
    metalness: 0.2,
    roughness: 0.6,
  });
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x88eeff,
    emissive: 0x003344,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.85,
  });
  const visorReflMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xaaddff,
    metalness: 1,
    roughness: 0.0,
    transparent: true,
    opacity: 0.35,
  });
  const visorRimMat = new THREE.MeshStandardMaterial({
    color: 0x223344,
    emissive: 0x001122,
    metalness: 0.8,
    roughness: 0.2,
  });

  // --- Body (tall rounded pill) ---
  const bodyGroup = makeCapsuleGroup(THREE, 1.05, 1.15, 2.0, suitMat, 32);
  AU.add(bodyGroup);

  // --- Head bump (slightly wider rounded top, fused at top of body) ---
  const headBump = new THREE.Mesh(
    new THREE.SphereGeometry(1.18, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
    suitMat,
  );
  headBump.position.y = 1.55;
  AU.add(headBump);

  // --- Visor frame (dark rim around visor) ---
  const visorFrame = new THREE.Mesh(
    new THREE.SphereGeometry(0.76, 32, 28),
    visorRimMat,
  );
  visorFrame.scale.set(1.0, 0.72, 0.38);
  visorFrame.position.set(0.52, 1.08, 0.82);
  AU.add(visorFrame);

  // --- Visor glass ---
  const visorGlass = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 28),
    visorMat,
  );
  visorGlass.scale.set(1.0, 0.68, 0.38);
  visorGlass.position.set(0.54, 1.09, 0.88);
  AU.add(visorGlass);

  // --- Visor reflection highlight (small bright streak) ---
  const visorRefl = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 16, 16),
    visorReflMat,
  );
  visorRefl.scale.set(0.55, 0.35, 0.2);
  visorRefl.position.set(0.22, 1.28, 1.0);
  AU.add(visorRefl);

  // --- Backpack ---
  const backpackBody = makeCapsuleGroup(
    THREE,
    0.38,
    0.38,
    0.9,
    suitDarkMat,
    20,
  );
  backpackBody.position.set(-1.0, 0.25, 0);
  backpackBody.rotation.z = Math.PI / 2;
  AU.add(backpackBody);

  // Backpack connector strap
  const strapMat = suitDarkMat;
  const strap = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.28, 0.22),
    strapMat,
  );
  strap.position.set(-0.7, 0.25, 0);
  AU.add(strap);

  // --- Legs ---
  const legL = makeCapsuleGroup(THREE, 0.3, 0.26, 0.7, suitDarkMat, 16);
  legL.position.set(0.45, -1.72, 0);
  AU.add(legL);

  const legR = makeCapsuleGroup(THREE, 0.3, 0.26, 0.7, suitDarkMat, 16);
  legR.position.set(-0.45, -1.72, 0);
  AU.add(legR);

  // Feet (slightly wider at bottom)

  const footL = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), footMat);
  footL.scale.set(1.1, 0.55, 1.3);
  footL.position.set(0.45, -2.22, 0.1);
  AU.add(footL);

  const footR = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), footMat);
  footR.scale.set(1.1, 0.55, 1.3);
  footR.position.set(-0.45, -2.22, 0.1);
  AU.add(footR);

  AU.position.set(-8, -2, 0);
  AU.scale.setScalar(1.1);
  scene.add(AU);

  // ── ═══════════════════════════════════════════════════════════════════════
  // ROCKET — detailed multi-stage rocket
  // ══════════════════════════════════════════════════════════════════════════

  const RKT = new THREE.Group();

  // --- Materials ---
  const bodyWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    emissive: 0x111111,
    metalness: 0.45,
    roughness: 0.35,
  });
  const bodyGrayMat = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    emissive: 0x0a0a0a,
    metalness: 0.5,
    roughness: 0.3,
  });
  const accentRedMat = new THREE.MeshStandardMaterial({
    color: 0xff3344,
    emissive: 0x550010,
    metalness: 0.3,
    roughness: 0.45,
  });
  const accentBlueMat = new THREE.MeshStandardMaterial({
    color: 0x1155cc,
    emissive: 0x001133,
    metalness: 0.3,
    roughness: 0.4,
  });
  const nozzleMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    emissive: 0x111111,
    metalness: 0.8,
    roughness: 0.25,
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x88ccff,
    emissive: 0x113355,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.8,
  });
  const flame1Mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
  });
  const flame2Mat = new THREE.MeshBasicMaterial({
    color: 0xffdd00,
    transparent: true,
    opacity: 0.85,
  });
  const flame3Mat = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.7,
  });
  const flame4Mat = new THREE.MeshBasicMaterial({
    color: 0xff2200,
    transparent: true,
    opacity: 0.4,
  });

  // All geometry is oriented vertically (Y-axis) then rotated at the end

  // --- Stage 2 (upper, narrower) ---
  const s2Body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 1.4, 24),
    bodyWhiteMat,
  );
  s2Body.position.y = 2.7;
  RKT.add(s2Body);

  // Stage 2 nose (ogive approximated with cone)
  const s2Nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.85, 24),
    accentRedMat,
  );
  s2Nose.position.y = 3.825;
  RKT.add(s2Nose);

  // Stage 2 window
  const win2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 12, 12),
    windowMat,
  );
  win2.position.set(0.29, 3.1, 0);
  RKT.add(win2);

  // Interstage ring (connects s2 to s1)
  const interstage = new THREE.Mesh(
    new THREE.CylinderGeometry(0.33, 0.42, 0.25, 24),
    bodyGrayMat,
  );
  interstage.position.y = 1.975;
  RKT.add(interstage);

  // --- Stage 1 (main body) ---
  const s1Body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.44, 2.8, 24),
    bodyWhiteMat,
  );
  s1Body.position.y = 0.5;
  RKT.add(s1Body);

  // Red stripe band on stage 1
  const stripe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.435, 0.435, 0.18, 24),
    accentRedMat,
  );
  stripe.position.y = 0.8;
  RKT.add(stripe);

  // Blue flag / logo band
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.435, 0.435, 0.1, 24),
    accentBlueMat,
  );
  band.position.y = 0.35;
  RKT.add(band);

  // Porthole windows on stage 1 (3 evenly spaced)
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const win = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      windowMat,
    );
    win.position.set(Math.cos(angle) * 0.44, 1.3, Math.sin(angle) * 0.44);
    RKT.add(win);
    // Porthole rim
    const rimGeo = new THREE.TorusGeometry(0.075, 0.018, 8, 20);
    const rim = new THREE.Mesh(rimGeo, bodyGrayMat);
    rim.position.copy(win.position);
    rim.lookAt(rim.position.clone().multiplyScalar(2)); // face outward
    RKT.add(rim);
  }

  // --- Engine section (bottom of stage 1) ---
  const engineSection = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.5, 0.35, 24),
    bodyGrayMat,
  );
  engineSection.position.y = -1.075;
  RKT.add(engineSection);

  // --- 3 engine nozzles in a cluster ---
  const nozzleOffsets = [
    [0, 0.18],
    [0.156, -0.09],
    [-0.156, -0.09],
  ];
  nozzleOffsets.forEach(([ox, oz]) => {
    const bell = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.115, 0.32, 16, 1, true),
      nozzleMat,
    );
    bell.position.set(ox, -1.41, oz);
    RKT.add(bell);
    // Nozzle inner dark
    const inner = new THREE.Mesh(
      new THREE.CircleGeometry(0.115, 16),
      new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.BackSide }),
    );
    inner.rotation.x = Math.PI / 2;
    inner.position.set(ox, -1.57, oz);
    RKT.add(inner);
  });

  // --- 4 aerodynamic fins ---
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0.55, -0.5);
  finShape.lineTo(0.55, -0.9);
  finShape.lineTo(0, -0.6);
  finShape.closePath();

  const finGeo = new THREE.ExtrudeGeometry(finShape, {
    depth: 0.04,
    bevelEnabled: false,
  });
  const finMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    emissive: 0x080808,
    metalness: 0.55,
    roughness: 0.3,
  });

  for (let i = 0; i < 4; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    const angle = (i / 4) * Math.PI * 2;
    fin.rotation.y = angle;
    fin.position.set(Math.cos(angle) * 0.44, -0.85, Math.sin(angle) * 0.44);
    fin.rotation.x = -Math.PI / 2; // stand upright
    fin.rotation.y = angle;
    // simpler: use a flat extruded quad rotated around center
    RKT.add(fin);
  }

  // Redo fins cleanly using BoxGeometry for r128 simplicity
  RKT.children = RKT.children.filter(
    (c) => !(c.geometry instanceof THREE.ExtrudeGeometry),
  );
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.5), finMat);
    fin.position.set(Math.cos(angle) * 0.46, -1.1, Math.sin(angle) * 0.46);
    fin.rotation.y = angle;
    RKT.add(fin);
  }

  // --- Flame plume (layered cones, animated) ---
  const flame1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.55, 16),
    flame1Mat,
  ); // core white
  flame1.position.y = -1.85;
  flame1.rotation.x = Math.PI;
  RKT.add(flame1);

  const flame2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.9, 16),
    flame2Mat,
  ); // yellow
  flame2.position.y = -1.95;
  flame2.rotation.x = Math.PI;
  RKT.add(flame2);

  const flame3 = new THREE.Mesh(
    new THREE.ConeGeometry(0.26, 1.3, 16),
    flame3Mat,
  ); // orange
  flame3.position.y = -2.1;
  flame3.rotation.x = Math.PI;
  RKT.add(flame3);

  const flame4 = new THREE.Mesh(
    new THREE.ConeGeometry(0.34, 1.8, 12),
    flame4Mat,
  ); // outer red glow
  flame4.position.y = -2.3;
  flame4.rotation.x = Math.PI;
  RKT.add(flame4);

  // Exhaust glow light
  const exhaustLight = new THREE.PointLight(0xff8800, 3.5, 8);
  exhaustLight.position.y = -2.0;
  RKT.add(exhaustLight);

  // Orient rocket horizontally (nose pointing +X) and place it
  RKT.rotation.z = -Math.PI / 2;
  RKT.position.set(-45, 12, -10);
  RKT.scale.setScalar(1.4);
  scene.add(RKT);

  // ── Mouse + scroll ────────────────────────────────────────────────────────
  let mouseX = 0,
    mouseY = 0,
    scrollY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  const onScroll = () => {
    scrollY = window.scrollY;
  };
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // ── Animation loop ────────────────────────────────────────────────────────
  let time = 0,
    rafId;

  // Store leg refs for walk animation
  const legLeft = AU.children.find((c, i) => i === 8); // legL index
  const legRight = AU.children.find((c, i) => i === 9); // legR index

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.005;

    particles.rotation.y += 0.0004 * speedMult;
    particles.rotation.x += 0.0001 * speedMult;

    // Camera parallax
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.position.z = 30 - scrollY * 0.015;

    // Pulsing scene lights
    neonLight.intensity = 3.0 + Math.sin(time * 2) * 1.0;
    pinkLight.intensity = 2.0 + Math.cos(time * 1.7) * 0.7;
    neonLight.position.x = Math.sin(time) * 12;
    neonLight.position.y = Math.cos(time * 0.7) * 8;

    // ── Among Us: follow cursor + bob + leg swing ─────────────────────────
    const targetX = mouseX * 10;
    const targetY = -mouseY * 6;
    AU.position.x += (targetX - AU.position.x) * 0.015;
    AU.position.y += (targetY - AU.position.y) * 0.015;

    // Slow idle rotation to show the backpack
    AU.rotation.y = Math.sin(time * 0.4) * 0.6;
    AU.rotation.z = Math.sin(time * 1.8) * 0.06; // gentle tilt

    // Leg walk cycle (swing legL/legR forward-back)
    const walkAmp = 0.25;
    const walkFreq = 2.5;
    AU.children.forEach((child, idx) => {
      // legL is index 7, legR is index 8 (after body,headBump,visorFrame,visorGlass,visorRefl,backpack,strap = 7 items => 0-6)
      // feet are idx 9,10; just swing all child groups that are legs
      if (idx === 7) child.rotation.x = Math.sin(time * walkFreq) * walkAmp;
      if (idx === 8) child.rotation.x = -Math.sin(time * walkFreq) * walkAmp;
    });

    // ── Rocket: drift across + roll + flame flicker ───────────────────────
    RKT.position.x += 0.1;
    // Gentle pitch oscillation while flying
    RKT.rotation.x = Math.sin(time * 0.9) * 0.07;
    // Vertical sine wave
    const baseY = 12;
    RKT.position.y = baseY + Math.sin(time * 1.5) * 1.4;

    if (RKT.position.x > 55) RKT.position.x = -55;

    // Flame scale flicker — animate the four flame cones
    const flicker = 0.88 + Math.random() * 0.24;
    flame1.scale.set(flicker, 0.85 + Math.random() * 0.3, flicker);
    flame2.scale.set(
      flicker * 0.95,
      0.9 + Math.random() * 0.25,
      flicker * 0.95,
    );
    flame3.scale.set(flicker * 0.9, 0.92 + Math.random() * 0.2, flicker * 0.9);
    flame4.scale.set(
      flicker * 0.85,
      0.95 + Math.random() * 0.15,
      flicker * 0.85,
    );

    // Exhaust light flicker
    exhaustLight.intensity = 3.0 + Math.random() * 2.0;

    renderer.render(scene, camera);
  }

  animate();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
    geo.dispose();
    mat.dispose();
  };
}
