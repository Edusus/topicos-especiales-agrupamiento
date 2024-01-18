import { Request, Response } from "express";
import { Play } from "../plays.schema";

const getOnePlay = async (req: Request, res: Response) => {
  try {
    const { workId } = req.params;
    const play = await Play.findById(workId);
    if (!play) {
      return res.status(404).json({ message: "Play not found" });
    }
    res.status(200).json(play);
    return; // Add this line
  } catch (error) {
    res.status(400).json({ message: "Ocurrió un error" });
    console.log(error);
    return;
  }
};

export default getOnePlay;
