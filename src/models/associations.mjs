import Sala from "./Sala.mjs";
import Chat from "./Chat.mjs";
import Usuario from "./Usuario.mjs";

Usuario.hasMany(Chat, { foreignKey: "usuarioId" });
Sala.hasMany(Chat, { foreignKey: "salaId" });
