import dataBase from "../config/DataBase.mjs";
import { Sequelize } from "sequelize";
import Usuario from "./Usuario.mjs";
import Sala from "./Sala.mjs";

const Chat = dataBase.define('Chat', {
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


Chat.belongsTo(Usuario, { foreignKey: "usuarioId" });
Chat.belongsTo(Sala, { foreignKey: "salaId" });

Chat.sync();

export default Chat;
