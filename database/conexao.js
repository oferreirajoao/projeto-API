// Importando APENAS a configuração necessária do sequelize que iremo utilizar
const { Sequelize } = require("sequelize")

/**
 * new Sequelize precisa de alguns parametros, como:
 *  * 'nome do banco'
 *  * 'usuario'
 *  * 'senha'
 *  * 'objeto': onde serão definidos outros dois parametros:
 *      {
 *          * host: 'localhost'
 *          * dialect: 'mysql'
 *      }
 *      
 */
const sequelize = new Sequelize('ec021_2020_11', 'root', '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

// A conexão "sequelize" está exportada dentro do nosso módulo "conexao.js" e apartir disso, é possível importar em outros arquivos e usar
module.exports = sequelize