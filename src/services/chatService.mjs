import Sala from "../models/Sala.mjs";
import Chat from "../models/Chat.mjs";
import Mensagem from "../models/Mensagem.mjs";
import Usuario from "../models/Usuario.mjs";
import '../models/associations.mjs';
import { Op } from 'sequelize';


export function cadastrarSala(nome, identificador) {
    return Sala.create({
        nome: nome,
        identificador: identificador
    });
}

export async function sairDaSala(idSala, idUser) {
    try {
        await Chat.update({
            isOut: true,
        }, {
            where: {
                salaId: idSala,
                usuarioId: idUser
            }
        });

        const chat = await Chat.findOne({
            where: {
                salaId: idSala,
                usuarioId: {
                    [Op.ne]: null
                },
                isOut: false
            }
        });

        if (!chat) {
            await Sala.destroy({
                where: {
                    id: idSala
                }
            });
        }
    } catch (error) {
        console.error("Erro ao sair da sala: ", error);
        throw error;
    }
}

export async function removerUsuarioSala(idSala, idUser) {
    Chat.update({
        isOut: true,

    }, {
        where: {
            salaId: idSala,
            usuarioId: idUser
        }
    });

}

export function atualizarUsuarioSala(idSala, idUser, isAdmin) {
    return Chat.update({
        isAdmin: isAdmin,

    }, {
        where: {
            salaId: idSala,
            usuarioId: idUser
        }
    })
}

export function verificarUsuarioNaSala(idSala, idUser) {
    return Chat.findAll({
        where: {
            salaId: idSala,
            usuarioId: idUser
        }
    })
}

export async function inserirUser(salaId, usuarioId, isAdmin) {
    return Chat.create({
        salaId: salaId,
        usuarioId: usuarioId,
        isAdmin: isAdmin
    });
}

export function realocarUser(idSala, idUser) {
    return Chat.update({
        isOut: false
    }, {
        where: {
            usuarioId: idUser,
            salaId: idSala
        }
    });
}

export function inserirMensagem(idUsuario, idSala, mensagem, dtAgora, isAddUser) {
    return Mensagem.create({
        usuarioId: idUsuario,
        salaId: idSala,
        texto: mensagem,
        dtMensagem: dtAgora,
        isAddUser: isAddUser
    });
}

export function inserirMensagemImagem(idUsuario, idSala, srcImage, dtAgora) {
    return Mensagem.create({
        usuarioId: idUsuario,
        salaId: idSala,
        dtMensagem: dtAgora,
        srcImage: srcImage
    });
}

export function inserirMensagemDoc(idUsuario, idSala, srcDoc, nomeDoc, typeDoc, sizeDoc, dtAgora) {
    return Mensagem.create({
        usuarioId: idUsuario,
        salaId: idSala,
        dtMensagem: dtAgora,
        srcDoc: srcDoc,
        nomeDoc: nomeDoc,
        typeDoc: typeDoc,
        sizeDoc: sizeDoc
    });
}

export function listarChats(usuarioId) {
    return Sala.findAll({
        include: [
            {
                model: Chat,
                attributes: ['usuarioId', 'salaId'],
                where: {
                    usuarioId: usuarioId,
                    isOut: false
                },
            }
        ],
    });

}

export function listarMensagens(salaId, limit, skip) {
    return Mensagem.findAll({
        attributes: ['texto', 'dtMensagem', 'usuarioId', 'srcImage', 'srcDoc', 'nomeDoc', 'typeDoc', 'sizeDoc', 'isAddUser'],
        include: [
            {
                model: Usuario,
                attributes: ['id', 'nome', 'perfilSrc']
            }
        ],
        where: {
            salaId: salaId
        },
        order: [
            ['dtMensagem', 'DESC']
        ],
        limit: limit,
        offset: skip,
        raw: true
    })
}


export function verUsuariosDaSala(idSala) {
    return Usuario.findAll({
        attributes: ['id', 'nome', 'perfilSrc'],
        include: [
            {
                model: Chat,
                attributes: ['isAdmin', 'isOut'],
                where: {
                    salaId: idSala
                }
            },
        ],
        order: [
            ['nome', 'ASC']
        ],
        raw: true
    })
}

