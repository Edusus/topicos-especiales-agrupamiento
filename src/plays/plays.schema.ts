import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const playsSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  genero: String,
  nombreAutor: String
})

playsSchema.plugin(mongoosePaginate)

export const Play = mongoose.model('PLay', playsSchema)