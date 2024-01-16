import * as fs from "fs";
import * as THREE from "three";
const GLTFExporter = require("three-gltf-exporter");

export default async function drawChart3D(
  data: number[][],
  _: number[][],
  __: number[]
) {
  // Crear una escena 3D con puntos y centroides
  const scene = new THREE.Scene();
  const pointsMaterial = new THREE.PointsMaterial({ size: 4 });
  /*const centroidsMaterial = new THREE.PointsMaterial({
    size: 10,
    color: 0x000000,
  });*/

  // Agregar puntos de datos a la escena
  data.forEach((point, _) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(point[0], point[1], point[2]),
    ]);
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);
  });

  // Agregar centroides a la escena
  // Exportar la escena a formato glTF
  const exporter = new GLTFExporter();
  exporter.parse(scene, (gltf: any) => {
    const gltfArray = new Uint8Array([gltf]);
    fs.writeFileSync("kmeans_example_3d.gltf", gltfArray);
  });
}
