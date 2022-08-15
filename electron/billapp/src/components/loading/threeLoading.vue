<template>
  <div id="load-container"></div>
</template>
<script setup name="loading">
import * as THREE from "./three.module.js"
import { TWEEN } from "./tween.module.min.js"
import { TrackballControls } from "./TrackballControls.js"
import { CSS3DRenderer, CSS3DSprite } from "./CSS3DRenderer.js"
import { onMounted } from "vue-demi"

import NiuBi from "./pstar.png"
import pStar from "./nubi.webp"
import sprite from "./sprite.png"

let camera, scene, renderer
let controls

// const particlesTotal = 512;
const particlesTotal = 125
const positions = []
const objects = []
let current = 0, count = 0

const wide = 2000
const off = 1000

const imgArr = [NiuBi, pStar, sprite]

const init = () => {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000
  )
  camera.position.set( 600, 400, 1500 );
  camera.lookAt(0, 0, 0)

  scene = new THREE.Scene()

  const image = document.createElement("img")
  image.addEventListener("load", function () {
    for (let i = 0; i < particlesTotal; i++) {
      const object = new CSS3DSprite(image.cloneNode())
      ;(object.position.x = Math.random() * wide - off),
        (object.position.y = Math.random() * wide - off),
        (object.position.z = Math.random() * wide - off)
      scene.add(object)
      objects.push(object)
    }
    transition()
  })
  image.src = NiuBi

  // Plane
  const amountX = 16
  const amountZ = 32
  const separationPlane = 150
  const offsetX = ((amountX - 1) * separationPlane) / 2
  const offsetZ = ((amountZ - 1) * separationPlane) / 2

  for (let i = 0; i < particlesTotal; i++) {
    const x = (i % amountX) * separationPlane
    const z = Math.floor(i / amountX) * separationPlane
    const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200

    positions.push(x - offsetX, y, z - offsetZ)
  }

  // Cube
  // const amount = 8;
  const amount = 5
  const separationCube = 150
  const offset = ((amount - 1) * separationCube) / 2

  for (let i = 0; i < particlesTotal; i++) {
    const x = (i % amount) * separationCube
    const y = Math.floor((i / amount) % amount) * separationCube
    const z = Math.floor(i / (amount * amount)) * separationCube

    positions.push(x - offset, y - offset, z - offset)
  }

  // Random
  for (let i = 0; i < particlesTotal; i++) {
    positions.push(
      Math.random() * wide - off,
      Math.random() * wide - off,
      Math.random() * wide - off
    )
  }

  // Sphere
  // const radius = 750;
  const radius = 500

  for (let i = 0; i < particlesTotal; i++) {
    const phi = Math.acos(-1 + (2 * i) / particlesTotal)
    const theta = Math.sqrt(particlesTotal * Math.PI) * phi

    positions.push(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    )
  }

  renderer = new CSS3DRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById("load-container").appendChild(renderer.domElement)

  controls = new TrackballControls(camera, renderer.domElement)

  window.addEventListener("resize", onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function transition() {
  const offset = current * particlesTotal * 3
  const duration = 1500

  for (let i = 0, j = offset; i < particlesTotal; i++, j += 3) {
    const object = objects[i]

    new TWEEN.Tween(object.position)
      .to(
        {
          x: positions[j],
          y: positions[j + 1],
          z: positions[j + 2],
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
    //修改动画改变时的图片
    setTimeout(() => {
      let tmp = count%3
      object.element.src = imgArr[tmp]
    }, 1200)
  }

  new TWEEN.Tween(this)
    .to({}, duration * 3)
    .onComplete(transition)
    .start()
  current = (current + 1) % 4
  count++
}

const animate = () => {
  requestAnimationFrame(animate)
  TWEEN.update()
  controls.update()

  const time = performance.now()

  for (let i = 0, l = objects.length; i < l; i++) {
    const object = objects[i]
    const scale =
      Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1
    object.scale.set(scale, scale, scale)
  }

  renderer.render(scene, camera)
}
onMounted(() => {
  init()
  animate()
})
</script>
<style>
#load-container {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(242,242,242,.9);
}
img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
