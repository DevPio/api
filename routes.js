const routes = require('express').Router();

const {getDev,creatDev,updateDev,getOneDev,removeDev} = require('./controllers/devs');

const db = require('./db');

const connection = { db }

routes.get('/developers',getDev(connection))


routes.post('/developers',creatDev(connection))

routes.put('/developers/:id',updateDev(connection))

routes.get('/developers/:id',getOneDev(connection))

routes.delete('/developers/:id',removeDev(connection))

module.exports = routes;
