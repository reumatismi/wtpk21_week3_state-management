'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;
// älä käytä projektissa...

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'naurismakkara';
const password = 'k3cKosmieli';

app.use(cookieParser());
app.use(session( {
  secret: 'aivan höpönpöpöä',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 24},
}));

app.set('views', './views');
app.set('view engine', 'pug');

app.post('/login',(req, res) =>{
  const uname = req.body.username;
  const passwd = req.body.password;
  if (uname === username && passwd === password) {
    req.session.kirjautunut = true;
    res.redirect('/secret');
  } else {
    res.redirect('/form');
  }
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if(req.session.kirjautunut) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, { httpOnly: true}).send('cookie set');
});

app.get('/readCookie/:clr', (req, res) => {
  console.log('Cookies: ', req.cookies.color);
  res.send('cookie read');
});

app.get('/deleteCookie/:clr', (req, res) => {
  res.clearCookie('color');
  res.send('cookie read');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));