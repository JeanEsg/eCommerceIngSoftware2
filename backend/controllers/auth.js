const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.request) => {
  const { identificacion, correo, username, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ identificacion: identificacion });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El ID " + identificacion + " ya se encuentra en uso",
      });
    }

    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const loginUsuario = async (req, res = express.request) => {
  const { correo, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ correo: correo });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El correo" + correo + " no se ha encontrado en la base de datos",
      });
    }

    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    const token = await generarJWT(usuario.identificacion, usuario.username);

    res.status(200).json({
      ok: true,
      token,
      msg: "Bienvenido " + usuario.username + " Login correcto",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const revalidarToken = async (req, res = express.request) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarToken,
};
