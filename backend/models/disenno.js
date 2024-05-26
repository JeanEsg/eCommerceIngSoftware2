const { Schema, model } = require("mongoose");

const disennoSchema = Schema({
  identificador: {
    type: String,
    require: true,
    unique: true,
  },

  nombre: {
    type: String,
    require: true,
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
    type: String,
    require: true,
  },

  estado: {
    type: String,
    require: true,
  },

  disennadorEncargado: {
    type: String,
    require: true,
  },

  fechaCreacion: {
    type: Date,
    require: true,
  }
});

module.exports = model("disenno", disennoSchema);
