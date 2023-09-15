import dataBase from "../config/DataBase.mjs";
import { Sequelize } from "sequelize";

const Usuario = dataBase.define('Usuario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perfilSrc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    wallpaperSrc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    wallpaperLuminosidade: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 100
    }
});

Usuario.sync();

export default Usuario;