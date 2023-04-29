# [Full-Stack Web Application]

## ReactJS / NextJS / ThreeJS Game Prototype [2023]

This repository contains prototype of a simple 3D game based on the ThreeJS.

![Preview](/git/preview.jpg)

## Releases:

<details>
<summary>v0.1.1 - Prototype (2023-04-29)</summary>

### Bug fixes:
- 🐲 Restructured the project
- 🐲 Optimized Zustand stores
- 🐲 Removed unused cannon physics engine
- 🐲 Refactores stores
- 🐲 Isolated rogue model from hero component
- 🐲 Entity manager moved to app store

### New features:
- 🐲 Scene loading indicator
- 🐲 Each unit has YukaJS vehicle
</details>

<details>
<summary>v0.1.0 - Prototype (before 2023-04-24)</summary>

### New features:
- 🐲 Initialized UI prototype - ReactJS
- 🐲 Prepared a simply 3D scene - ThreeJS, ReactThree
- 🐲 Included path finding movement system - YukaJS
- 🐲 Initialized units store - Zustand
- 🐲 Started auto-targeting system
- 🌐 Initialized backend server - NestJS, SocketIO

</details>

| Icons: | 🐲 Front-End (client) |     | 🌐 Back-End (server) |
| ------ | --------------------- | --- | -------------------- |

## References:

[GLTF/GLB to JSX](https://github.com/pmndrs/gltfjsx)

`npx gltfjsx model.glb --transform`

---

## Main technologies:

**ReactJS** - A JavaScript library for building user interfaces.

**NextJS** - Next.js is a React framework that gives you building blocks to create web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.

**ThreeJS** - Cross-browser JavaScript library and application programming interface (API) used to create and display animated 3D computer graphics in a web browser using WebGL.

**@react-three/fiber** - React renderer for three.js.

**@react-three/drei** - A growing collection of useful helpers and fully functional, ready-made abstractions for @react-three/fiber.

**@react-three/cannon** - React hooks for cannon-es (Lightweight 3D physics for the web).

**@react-three/postprocessing** - Postprocessing wrapper for @react-three/fiber.

**Yuka** - A JavaScript library for developing Game AI.

**Zustand** - A small, fast and scalable bearbones state-management solution using simplified flux principles.

## Planned technologies for a next steps:

SocketIO; NodeJS; ExpressJS; Prisma; tRPC; MongoDB;
