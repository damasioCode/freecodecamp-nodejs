let express = require('express');
let app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
process.env.TZ = 'America/Sao_Paulo'
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(
  bodyParser.urlencoded({extended: false})
);
app.use( (req, res, next) => {
  const {method, path, ip} = req;
  console.log("I'm a middleware...");
  console.log(`${method} ${path} - ${ip}`);

  next();
});


app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);


app.get('/', (req, res) => {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
  if(process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({"message": "HELLO JSON"});
  }
  return res.json({"message": "Hello json"});
});
module.exports = app;

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({echo: word})
});

app.get('/name', (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}`})
});
app.post('/name', (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}`})
});