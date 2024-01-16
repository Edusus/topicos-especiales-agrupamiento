import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const playsSchema = new mongoose.Schema({
  clusterId: String || null,
  titulo: String,
  descripcion: String,
  genero: String,
  nombreAutor: String,
  year: Number,
  sales: Number,
  imageUrl: String
})

playsSchema.plugin(mongoosePaginate)

export const Play = mongoose.model('PLay', playsSchema)