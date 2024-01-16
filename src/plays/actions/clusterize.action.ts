import { kmeans } from "ml-kmeans";
import { Request, Response } from "express";
import { Play } from "../plays.schema";

export const clusterize = async (_req: Request, res: Response) => {
  try {
    const plays = await Play.find();
    const data = plays.map((play) => [play.year, play.sales]);

    // Número de clústeres que deseamos encontrar
    const k = 3;
    // Aplicar el algoritmo k-means
    const result = kmeans(
      data.filter((x) => x[0] !== null && x[0] !== undefined) as number[][],
      k,
      {}
    );
    console.log("data", data);

    // Imprimir los centroides y las asignaciones de clúster
    console.log("Centroides:", result.centroids);
    console.log("Clusteres:", result.clusters);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
