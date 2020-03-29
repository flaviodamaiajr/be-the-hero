const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(cors());

// Define que o padrão das requisições utilizadas serão do tipo JSON.
app.use(express.json());
app.use(routes);

app.listen(3333);
