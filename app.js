'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./utils/pass');
const app = express();
const port = 3000;

// ei, ei näin proujektissa

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};
// älä käytä projektissa...

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'naurismakkara';
const password = 'k3cKosmieli';

// älä tee näin projektissa

app.use(cookieParser());
app.use(session( {
  secret: 'aivan höpönpöpöä',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 24},
}));

app.use(passport.initialize());
app.use(passport.session()); // älä te näin proujektissa

app.set('views', './views');
app.set('view engine', 'pug');

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
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