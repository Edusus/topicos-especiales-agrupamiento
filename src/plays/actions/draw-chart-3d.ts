import * as THREE from "three";
import * as fs from "fs";
const GLTFExporter = require("gltf-pipeline");

export default async function drawChart3D(data: number[][], _: any, __: any) {
  // Crear una escena 3D con puntos
  const scene = new THREE.Scene();
  const pointsMaterial = new THREE.PointsMaterial({ size: 4 });

  // Agregar puntos de datos a la escena
  data.forEach((point) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(point[0], point[1], point[2]),
    ]);
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);
  });

  // Exportar la escena a formato glTF
  const exporter = new GLTFExporter();
  const gltf = exporter.parse(scene, { binary: true });

  // Guardar el archivo glTF
  fs.writeFileSync("kmeans_example_3d.gltf", gltf);
}
