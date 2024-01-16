import { kmeans } from "ml-kmeans";
import { Request, Response } from "express";
import { Play } from "../plays.schema";
import getTextVectors from "../../actions/get-text-vectors/get-text-vectors";
import drawChart from "./draw-chart";

export const clusterize = async (_req: Request, res: Response) => {
  try {
    const plays = await Play.find();
    //const data = plays.map((play) => [play.year, play.sales]);

    const data = await getTextVectors({
      texts: plays.map(
        (play) =>
          " " +
          play.titulo +
          " " +
          play.genero +
          " " +
          play.nombreAutor +
          " " +
          play.descripcion
      ),
      nComponents: 2,
    });

    // Número de clústeres que deseamos encontrar
    const k = 3;
    // Aplicar el algoritmo k-means
    const result = kmeans(
      data.filter((x) => x[0] !== null && x[0] !== undefined) as number[][],
      k,
      {}
    );

    //let contador = 0;
    plays.forEach((play, index) => {
      play.clusterId = String(result.clusters[index]);
      play.save();
      console.log(play.year, play.sales, play.clusterId);
      //contador++;
    });

    console.log("data", data);

    // Imprimir los centroides y las asignaciones de clúster
    console.log("Centroides:", result.centroids);
    console.log("Clusteres:", result.clusters);

    // Dibujar el gráfico
    await drawChart(data, result.centroids, result.clusters);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Ocurrió un error" });
    console.log(error);
  }
};
