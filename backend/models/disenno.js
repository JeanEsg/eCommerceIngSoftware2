const { Schema, model } = require("mongoose");

const disennoSchema = Schema({
  identificador: {
    type: String,
    require: true,
    unique: true,
  },

  descripcion: {
    type: String,
    require: true,
  },

  urlImagen: {
    type: String,
    require: true,
  },

  producto: {
    type: Schema.Types.ObjectId,
    ref: "Articulo",
    require: true,
  },

  estado: {
    type: String,
    require: true,
  },

  disennadorEncargado: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
    require: false,
  },

  fechaCreacion: {
    type: Date,
    require: true,
  },

  usuario: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: "usuario" },
});

module.exports = model("Disenno", disennoSchema);
