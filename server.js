const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/static', express.static(path.join(__dirname, 'stubs')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/product/*', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/category/*', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/order/*', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/orders', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/card-pay', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/delivery', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/payment', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/order-check', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/order-done', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));
app.get('/add-address', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));

app.get('/api/config', (req, res) => {
  if (!isAuthorizationTokenValid(req.headers.authorization)) return;

  let data = require('./stubs/config.json');
  return res.send(data);
});

app.get('/api/category/*', (req, res) => {
  if (!isAuthorizationTokenValid(req.headers.authorization)) return;

  let data = require('./stubs/category.json');
  return res.send(data);
});

app.get('/api/product/*', (req, res) => {
  if (!isAuthorizationTokenValid(req.headers.authorization)) return;

  let data = require('./stubs/product.json');
  data.id = req.params[0];

  return res.send(data);
});

app.get('/api/orders', (req, res) => {
  if (!isAuthorizationTokenValid(req.headers.authorization)) return;

  let data = require('./stubs/orders.json');
  return res.send(data);
});

app.get('/api/order/*', (req, res) => {
  if (!isAuthorizationTokenValid(req.headers.authorization)) return;

  let data = require('./stubs/order.json');
  return res.send(data);
});

function isAuthorizationTokenValid(token) {
  return true;
}

app.post('/api/send_order', (req, res) => { console.log(req.body); return res.sendStatus(200) });
app.post('/api/add_address', (req, res) => { console.log(req.body); return res.sendStatus(200) });
app.post('/api/pay_order', (req, res) => { console.log(req.body); return res.sendStatus(200) });
app.post('/api/cancel_order/*', (req, res) => { console.log(req.body); return res.sendStatus(200) });
app.post('/api/repeat_order/*', (req, res) => { console.log(req.body); return res.sendStatus(200) });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

