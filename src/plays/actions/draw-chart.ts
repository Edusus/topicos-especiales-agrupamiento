import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs";

export default async function drawChart(
  data: number[][],
  centroids: number[][],
  clusters: number[]
) {
  // Crear un gráfico de dispersión con colores para los clústeres
  const configuration = getDrawConfiguration(data, centroids, clusters);

  // Crea el servicio de renderizado y genera el gráfico
  const canvasRenderService = new ChartJSNodeCanvas({
    width: 800,
    height: 600,
    backgroundColour: "white",
  });
  const image = canvasRenderService.renderToBufferSync(configuration as any);

  // Guarda la imagen en un archivo
  await fs.writeFileSync("kmeans_year_sales_example-2024.png", image);

  console.log("Centroides y asignaciones guardados en kmeans_example.png");
}

function getDrawConfiguration(
  data: number[][],
  centroids: number[][],
  clusters: number[]
): DrawConfiguration {
  const punticosADibujar: ClusterData[] = centroids.map((_, index) => {
    const clusterData = data.filter(
      (_, i) => clusters[i] === index && i < clusters.length
    );
    return {
      label: `Cluster ${index + 1}`,
      data: clusterData.map((point) => ({ x: point[0], y: point[1] })),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.8)`,
    };
  });

  return {
    type: "scatter",
    data: {
      datasets: [
        ...punticosADibujar,
        {
          label: "Centroides",
          data: centroids.map((centroid) => ({
            x: centroid[0],
            y: centroid[1],
          })),
          backgroundColor: "black",
          pointRadius: 10,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "Año de Publicación" },
        },
        y: {
          type: "linear",
          position: "left",
          title: { display: true, text: "Ventas" },
        },
      },
    },
  };
}

interface Point {
  x: number;
  y: number;
}

interface ClusterData {
  label: string;
  data: Point[];
  backgroundColor: string;
}

interface DrawConfiguration {
  type: string;
  data: {
    datasets: (
      | ClusterData
      | {
          label: string;
          data: Point[];
          backgroundColor: string;
          pointRadius: number;
        }
    )[];
  };
  options: {
    scales: {
      x: {
        type: string;
        position: string;
        title: { display: boolean; text: string };
      };
      y: {
        type: string;
        position: string;
        title: { display: boolean; text: string };
      };
    };
  };
}
