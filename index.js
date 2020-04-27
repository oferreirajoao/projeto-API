const { Op } = require("sequelize")

const restify = require("restify")

const server = restify.createServer()

const Carro = require("./models/Carro")

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const CARRO = '/ec021/carro'

server.post(`${CARRO}`, async (req, res) => {

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

    let carroCriado = await Carro.findByPk(carro.id)
    res.json(carroCriado)
})

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
            where: 
            {
                id: id
            }
        }
    )

    let carroAtualizado = await Carro.findByPk(id)
    res.json(carroAtualizado)
})

server.get(`${CARRO}`, async (req, res) => {
    let id = req.query.id
    let marca = req.query.marca
    let modelo = req.query.modelo
    let anoInicial = req.query.anoInicial
    let valorInicial = req.query.valorInicial

    if (id) {
        let carro = await Carro.findByPk(id)
        res.json(carro)
    }

    else if (marca && modelo) {
        let carro = await Carro.findAll(
            {
                where:
                { 
                    [Op.and] :
                    [
                        { marca : marca },
                        { modelo : modelo }
                    ]
                }
            }
        )
        res.json(carro)
    }

    else if (marca) {
        let carro = await Carro.findAll(
            {
                where:
                {
                    marca:marca
                }
            }
        )
        res.json(carro)
    }

    else if (anoInicial) {
        let carro = await Carro.findAll(
            {
                where: 
                {
                    ano: 
                    { 
                        [Op.gte] : anoInicial
                    }
                }
            }
        )
        res.json(carro)
    }

    else if (valorInicial) {
        let carro = await Carro.findAll(
            {
                where: 
                {
                    valor: 
                    { 
                        [Op.gte] : valorInicial
                    }
                }
            }
        )
        res.json(carro)
    }

    else {
        let carro = await Carro.findAll()
        res.json(carro)
    }   
   
})

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