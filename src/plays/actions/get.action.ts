import { Request, Response } from 'express'
import { Play } from '../plays.schema'

export const getPlays = async ( 
  _req: Request,
  res: Response
) => {
  try {
    const plays = await Play.find()
    res.status(200).json({ "items": plays})

  } catch (error) {
    res.status(400).json({"message" : "Ocurrió un error"})
    console.log(error)
  }
}
