var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//revisar 
const token = require('../models/token');
const mailer = require('../mailer/mailer');
var Schema = mongoose.Schema;

const validateEmail = function(email){
  const  re = ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$:
  return re.test(email);
};

var usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, 'el nombre es obligatorio']

  },

  email: {
    type: String,
    trim: true,
    required: [true, 'el email obligatorio']
    lowercase: true,
    unique: true,
    required: [validateEmail, 'porfavor ingrese un email valido'],
    match: [^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$]
  },

  password: {
    type: String,
    trim: true,
    required: [true, 'el password es obligatorio']
  },

  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }

});
usuarioSchema.plugin(uniqueValidator, { message: 'el (PATH) ya existe con otro usuario'});
usuarioSchema.pre( 'save', function (next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
  next();
});

usuarioSchema.methods.validatePassword = function (password){
  return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function(BiciId, desde, hasta, cb){
  var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
  console.log(reserva);
  reserva.save(cb);
}

usuarioSchema.methods.envir_email_bienvenida = function (cb) {
  const token  = new Token({_userId: this.id, token: crypto.randomBytes(Id).toString('hex')});
  const email_destination = this.email;
  token.save(function (err) {
   if (err) {return cb(err)}
   const mailOptions = {
     from: 'no-reply@redbicicletas.com',
     to: email_destination,
     subject: 'vericicacion',
     text: 'Hola,\n\n'
     + 'para la verificacion de su cuenta haga click en este link: \n'
     + 'http://localhost:4200'
     + '\/resetPassword\/' + token.token + '\n'
   }
   mailer.sendMail(mailOptions, function(err){
     if( err ) { return cb(err) }
     console.log('Se ha enviado un email : ' + email_destination)
   });

   cb(null);

 });
}

module.exports = mongoose.model('usuario', UsuarioSchema);
