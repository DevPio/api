

const getDev = ({ db }) => async(req, res) => {
    const devs = await db
        .select('*')
        .from('desenvolvedores')
    res.status(200).json(devs)
}


const creatDev = ({db}) => async (req, res) => {
    const data = req.body;

    const dataBody = {
        name:data.name,
        sexo: data.sexo,
        idade:data.idade,
        hobby:data.hobby
    }

    const [id] = await db.insert(dataBody).into('desenvolvedores');

    dataBody.id = id;

    return res.status(201).json(dataBody)


}
const updateDev = ({ db }) => async (req, res) => {
    const data = req.body
    let { id } = req.params

    const desenvolvedorUnico = await db('desenvolvedores').select().where('id', id)
    if (desenvolvedorUnico.length === 0) {

        return res.status(400).json({ error: true })
    }

    const desenvolvedorUpdate = {
        name:data.name,
        sexo: data.sexo,
        idade:data.idade,
        hobby:data.hobby
    }

    await db('desenvolvedores')
        .where('id', id)
        .update(desenvolvedorUpdate)

    return res.json(desenvolvedorUpdate)
}

const getOneDev = ({ db }) => async(req, res) => {
    let id = req.params.id
    const dev = await db('desenvolvedores').select('*').where('id', id).first()

    return res.status(200).json(dev)
}


const removeDev = ({ db }) => async(req, res) => {
    const { id } = req.params
    const dev = await db('desenvolvedores').select().where('id', id)
    if (dev.length === 0) {
        res.status(400)
        return res.json({ error: true })
    } else {
        await db('desenvolvedores').select().where('id', id).del()
        return res.status(204).json({ success: true })
    }
}

module.exports = {getDev, creatDev,updateDev,getOneDev,removeDev }

