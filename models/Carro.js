const { Sequelize } = require("sequelize")

const conexao = require("../database/conexao")

const Carro = conexao.define('carro',
    {
        // Objetos com os atributos 
        marca: Sequelize.TEXT,
        modelo: Sequelize.TEXT,
        ano: Sequelize.INTEGER,
        valor: Sequelize.DOUBLE,
        data_cadastro: Sequelize.DATE
    },
    {
        // Não queremos que o Sequelize controle a data e hora da criação do cadastro
        timestamps: false,
        
        // Nome da tabela para setar no singular
        tableName: 'carro'
    }
)

module.exports = Carro