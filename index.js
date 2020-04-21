const restify = require("restify")
const server = restify.createServer();

const Carro = require("./models/Carro")

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const CARRO = '/ec021/carro'

// POST http://localhost:3000/carro => Create
// CRIAR
server.post(`${CARRO}`, async (req, res) => {

    // Variaveis para receber do "body" da requeste
    let marca = req.body.marca
    let modelo = req.body.modelo
    let ano = req.body.ano
    let valor = req.body.valor

    let carro = await Carro.create(
        {
            marca:marca,
            modelo:modelo,
            ano:ano,
            valor:valor
        }
    )

    // Verificando se o carro foi criado
    let carroCriado = await Carro.findByPk(carro.id)
    res.json(carroCriado)
})

// PATCH http://localhost:3000/carro => Update
// ATUALIZAR
server.patch(`${CARRO}/:id`, async (req, res) => {
    let id = req.params.id
    let marca = req.body.marca
    let modelo = req.body.modelo
    let ano = req.body.ano
    let valor = req.body.valor

    let carro = await Carro.update(
        {
            marca:marca,
            modelo:modelo,
            ano:ano,
            valor:valor
        },
        {
            where: {id: id}
        }
    )

    // Verificando se o carro foi criado
    let carroAtualizado = await Carro.findByPk(id)
    res.json(carroAtualizado)
})

// GET http://localhost:3000/carro => Read
// GET http://localhost:3000/carro?id=XX => Read
// GET http://localhost:3000/carro?marca=XX => Read
// GET http://localhost:3000/carro?marca=XX&modelo=XX => Read
// GET http://localhost:3000/carro?anoInicial=XX => Read
// GET http://localhost:3000/carro?valorInicial=XX => Read
// LER
server.get(`${CARRO}`, async (req, res) => {
    let id = req.query.id
    let marca = req.body.marca
    let modelo = req.body.modelo
    let ano = req.body.ano
    let valor = req.body.valor
    //let data_cadastro = req.body.data_cadastro
    
    // Busca por ID
    if (id) {
        let carro = await Carro.findByPk(id)
        res.json(carro)
    }

    // Busca por MARCA
    else if (marca) {
        let carro = await Carro.findAll(
            {
                where: { marca:marca }
            }
        )
        res.json(carro)
    }

    // Busca por MARCA e MODELO
    else if (marca & modelo) {
        let carro = await Carro.findAll(
            {
                where: { marca:marca, modelo:modelo }
            }
        )
        res.json(carro)
    }

    // Busca por ANO INICIAL (ano MAIOR ou IGUAL ao ano passado)
    else if (ano) {
        let carro = await Carro.findAll(
            {
                where: { ano:ano }
            }
        )
        res.json(carro)
    }

    // Busca por VALOR INICIAL (valor MAIOR ou IGUAL ao valor passado)
    else if (valor) {
        let carro = await Carro.findAll(
            {
                where: { valor:valor }
            }
        )
        res.json(carro)
    }

    // else if (data_cadastro) {
        
    //     let carro = await Carro.findAll(
    //         {
    //             where: { data_cadastro:data_cadastro }
    //         }
    //     )
    //     res.json(carro)
    // }

    // Busca TODOS os carros
    let carro = await Carro.findAll()
    res.json(carro)
    
})

// DELETE http://localhost:3000/carro/{id} => Delete
/*
O Delete também precisa do ID, pois é por ele que será feito a remoção do elemento
*/
// DELETAR
server.del(`${CARRO}/:id`, async (req, res) => {
    let id = req.params.id

    let excluidos = await Carro.destroy(
        {
            where: { id:id }
        }
    )

    res.json(
        {
            excluidos:excluidos
        }
    )
})

server.listen(3000, () => {
    console.log(`# # # O Servidor está rodando # # #`)
})