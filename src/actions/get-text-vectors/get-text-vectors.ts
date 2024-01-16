import { exec } from "child_process";

export interface InputDataScript {
  modelPath: string;
  texts: string[];
  nComponents?: number;
}

export interface InputData {
  texts: string[];
  nComponents?: number;
}

export type Vector = number[];

async function getTextVectors(inputData: InputData): Promise<Vector[]> {
  const inputDataScript = {
    ...inputData,
    modelPath: `${__dirname}/models/cc.es.300.bin`,
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
