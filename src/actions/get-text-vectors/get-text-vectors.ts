import { exec } from "child_process";
import path from "path";

export interface InputDataScript {
  modelPath: string;
  texts: string[];
  nComponents?: number;
}

export interface InputData {
  texts: string[];
  nComponents?: number | null;
}

export type Vector = number[];

async function getTextVectors(inputData: InputData): Promise<Vector[]> {
  const projectBasePath = path.resolve(__dirname, "../../..");
  const modelPath = `${projectBasePath}/models/cc.es.300.bin`;

  const inputDataScript = {
    ...inputData,
    modelPath,
  };

  // Definir la constante para determinar qué script ejecutar
  const applyDimensionalityReduction =
    inputData.nComponents !== null && inputData.nComponents !== undefined;

  // Llamada al script de Python
  let pythonScript: string;
  if (applyDimensionalityReduction) {
    pythonScript = `${__dirname}/get-text-dim-vectors.py`;
  } else {
    pythonScript = `${__dirname}/get-text-vectors.py`;
  }

  return new Promise((resolve, reject) => {
    const pythonProcess: any = exec(
      `python3 ${pythonScript}`,
      { encoding: "utf-8" },
      (error, stdout, _) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }

        const outputData = JSON.parse(stdout);
        if (
          outputData === null ||
          typeof outputData !== "object" ||
          !Array.isArray(outputData)
        ) {
          reject(`Error: ${stdout}`);
          return;
        }

        resolve(outputData);
      }
    );

    // Enviar datos de entrada al script de Python
    pythonProcess.stdin.write(JSON.stringify(inputDataScript));
    pythonProcess.stdin.end();
  });
}

export default getTextVectors;
