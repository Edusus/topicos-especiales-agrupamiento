import { Request, Response } from 'express'
import { Play } from '../plays.schema'

export const getRecommend = async ( 
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const play = await Play.findById(id)
    if (play !== null){
      const plays = await Play.find({ clusterId: play.clusterId, _id: { $ne: id } })
      res.status(200).json({ plays })
    }
    
  } catch (error) {
    res.status(400).json({"message" : "Ocurrió un error"})
    console.log(error)
  }
}
