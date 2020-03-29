const express = require("express");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

/**
 * Tipos Parâmetros:
 *
 * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, páginação...)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição  utilizado para criar ou alterar recrusos
 *
 */

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
