import dataBase from "../config/DataBase.mjs";
import { Sequelize } from "sequelize";
import Usuario from "./Usuario.mjs";
import Sala from "./Sala.mjs";

const Mensagem = dataBase.define('Mensagem', {
    texto: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dtMensagem: {
        type: Sequelize.DATE,
        allowNull: false
    },
    srcImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    srcDoc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nomeDoc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    typeDoc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sizeDoc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isAddUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


Mensagem.belongsTo(Usuario, { foreignKey: "usuarioId" });
Mensagem.belongsTo(Sala, { foreignKey: "salaId" });

Mensagem.sync();

export default Mensagem;
