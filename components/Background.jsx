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

    // ── Load Three.js dynamically (avoids bundler issues if not installed)
    // If you already have three in package.json, replace this with:
    //   import * as THREE from "three";
    // and remove the dynamic script loading below.

    let THREE_lib;
    let animationId;
    let cleanup;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      THREE_lib = window.THREE;
      cleanup = initScene(THREE_lib, canvas, particleCount, torusSpeed, () => {
        animationId = null;
      });
    };
    document.head.appendChild(script);

    return () => {
      if (cleanup) cleanup();
      document.head.removeChild(script);
    };
  }, [particleCount, torusSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Core scene — pure JS, no React inside
// ─────────────────────────────────────────────────────────────────────────────
function initScene(THREE, canvas, PCOUNT, speedMult) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x030305, 1);

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
  const sizes = new Float32Array(PCOUNT);

  for (let i = 0; i < PCOUNT; i++) {
    const r = 40 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Teal 60% · Purple 20% · Pink 20%
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

    sizes[i] = Math.random() * 1.5 + 0.3;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ── Central torus knot ────────────────────────────────────────────────────

  // ── Lights ────────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x050510, 1));

  const neonLight = new THREE.PointLight(0x00ffe7, 3, 40);
  neonLight.position.set(10, 10, 10);
  scene.add(neonLight);

  const pinkLight = new THREE.PointLight(0xff2d78, 2, 35);
  pinkLight.position.set(-12, -8, 5);
  scene.add(pinkLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 1.5, 30);
  purpleLight.position.set(0, 15, -10);
  scene.add(purpleLight);

  // ── Mouse + scroll tracking ───────────────────────────────────────────────
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
  let time = 0;
  let rafId;

  function animate() {
    rafId = requestAnimationFrame(animate);
    time += 0.005;

    particles.rotation.y += 0.0004 * speedMult;
    particles.rotation.x += 0.0001 * speedMult;

    // Mouse parallax
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.position.z = 30 - scrollY * 0.015;

    // Pulsing lights
    neonLight.intensity = 2.5 + Math.sin(time * 2) * 0.8;
    pinkLight.intensity = 1.5 + Math.cos(time * 1.7) * 0.5;
    neonLight.position.x = Math.sin(time) * 12;
    neonLight.position.y = Math.cos(time * 0.7) * 8;

    // Scroll-driven scale

    renderer.render(scene, camera);
  }

  animate();

  // ── Cleanup (returned to useEffect) ──────────────────────────────────────
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
