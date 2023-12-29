import mongoose from "mongoose"
import { mongoDB } from "./keys"

mongoose.connect(mongoDB.URI)

const connection = mongoose.connection

connection.once('open',() => {
  console.log('Conexión exitosa')
})

connection.on('error',(err) => {
  console.log('Error al conectar: ', err)
})
