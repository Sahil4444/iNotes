const connectMongo = require("./db");
const express = require("express");
connectMongo();

var cors = require('cors')
var app = express()
 
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})