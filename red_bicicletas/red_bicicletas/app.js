var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarios');
var tokenRouter = require('./routes/token');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');

const store = new session.MemoryStore;

var app = express();

app.set('secretKey', 'jwt_pwd_!!223344');

app.use(session({
    cookie: { maxAge: 240 * 60 * 60 * 1000 },
    store: store,
    saveUninitialized: true,
    resave: true,
    secret: 'red_bicis-sarasa-12345678'
}));

var mongoose  = require('mongoose');

var mongoDB  = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB, { useNewUrlParser:true});
mongoose.Promise = global.Promise;
var db  = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passportinitialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));}

app get('/login',function(req, res) {
  res.render('session/login');
});

app.post('/login',function(req, res, next){
  passport.authenticate('local'. function(err, user, info){
    if(er) return next(err);
    if(usuario)  return res.render('session/login', {info});
    req.login(usuario, function(err){
      if (err)return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout',function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('forgotPassword', function(req, res){
  res.render('session/forgotPassword');
});


app.post('/forgotPassword', (req, res) => {
  Usuario.findOne({ email: req.body.email }, (err, usuario) => {
    if (!usuario) return res.render('session/forgotPassword', { info: 'No existe el usuario'});

    usuario.resetPassword((err) => {
      if (err) return next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage');
  });
});

app.get('/resetPassword/:token', (req, res, next) => {
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!token) return res.status(400).send({type: 'not-vedified', msg: 'No existe un usuario asociado al token. Verifique que su token no haya expirado.'});

    Usuario.findById(token._userId, (err, usuario) => {
      if (!usuario) return res.status(400).send({msg: 'No existe un usuario asociado al token.'});
      res.render('session/resetPassword', {errors: {}, usuario: usuario});
    });
  });
});

app.post('/resetPassword', (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', { errors: {confirm_password: { message: 'No coincide con el password ingresado'}}, usuario: new Usuario({email: req.body.email})});
    return;
  }
  Usuario.findOne({email: read.body.email}, (err, usuario) => {
    usuario.password = req.body.password;
    Usuario.save((err) => {
      if (err){
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({email: req.body.email})});
      } else {
        res.redirect('/login');
      }
    });
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);

app.use('api/auth', authAPIRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);
app.use('/token', tokenRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function loggedIn(req, res, next){
  if (req.user){
    next();
  } else {
    console.log('usuario sin ser logueado');
    res.redirect('/');
  }
};

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({status: "error", message: err.message, data:null});
    } else {
      req.body.userId = decoded.id;
      console.log('jwt verify: ' + decoded);
      next();
    }
  });
};

module.exports = app;
