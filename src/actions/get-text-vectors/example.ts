import getTextVectors, { InputData } from "./get-text-vectors";

// Ejemplo de datos de entrada
const inputData: InputData = {
  texts: [
    "Texto 1",
    "Texto 2",
    "Texto 3",
    "Gato comida",
    "Señor de los anillos",
    "Texto de muestra",
    "Hola mundo",
    "Texto de prueba",
    "Texto de ejemplo",
    "Texto 3 de prueba",
    "Texto 2 de ejemplo",
    "Texto de super prueba",
  ],
  nComponents: 10,
};

// Definir la constante para determinar qué script ejecutar
const applyDimensionalityReduction = false;

// Llamada al script de Python
let pythonScript: string;
if (applyDimensionalityReduction) {
  pythonScript = "get-text-dim-vectors.py";
} else {
  pythonScript = "get-text-vectors.py";
}

// Ejecutar el script de Python y manejar el resultado
async function main() {
  try {
    const outputData = await getTextVectors(inputData);
    console.log("Vectores resultantes:", outputData);
  } catch (error) {
    console.error(error);
  }
}

//main();
