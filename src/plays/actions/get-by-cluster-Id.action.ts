import { Request, Response } from 'express'
import { Play } from '../plays.schema'

export const getByClusterId = async ( 
  req: Request,
  res: Response
) => {
  try {
    const { clusterId } = req.params 
    const plays = await Play.find({ clusterId: clusterId})
    res.status(200).json({ plays })
  } catch (error) {
    res.status(400).json({"message" : "Ocurrió un error"})
    console.log(error)
  }
}
