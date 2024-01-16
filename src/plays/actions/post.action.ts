import { Request, Response } from 'express'
import { Play } from '../plays.schema'

export const postPlay = async ( 
  req: Request,
  res: Response
) => {
  try {
  const { titulo, descripcion, genero, nombreAutor, year, sales, imageUrl } = req.body
  const play = new Play({ titulo, descripcion, genero, nombreAutor, year, sales, imageUrl})

  await play.save()

  res.status(200).json(play)

} catch (error) {
  console.log(error)
}
}
