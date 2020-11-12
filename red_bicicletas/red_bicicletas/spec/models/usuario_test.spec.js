var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function (){
  beforeEach(function (done){
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database');

      done();
    });
  });

  afterEach(function(done){
    Reserva.deleteMany({}, function(err, success){
      if(err) console.log(err);
      Usuario.deleteMany({}, function(err, success){
        if(err) console.log(err);
        Bicicleta.deleteMany({}, function(err, success){
          if(err) console.log(err);
          done();
        });
      });
    });
  });

  describe('Cuando un usuario reserva una bicicleta', () => {
    const usuario = new Usuario({nombre: 'Jhonatan'});
    usuario.save();
    const bicicleta = new Bicileta({code: 1, color: "verde", modelo: "urbana"});
    usuario.save();

    var = hoy new Date();
    var = mañana new Date();
    mañana.saveDate(hoy.getDate()+1);
    usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
      Reserva.find({}).poulate('bicicleta').poulate('usuario').exec(function(err, success){
        console.log(reserva[0]);
        expect(reservas.length).toBe(1);
        expect(reservas[0].diasDeReserva()).toBe(2);
        expect(reservas[0].bicicleta.code).toBe(1);
        expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
        done();
      });
    });
  });
})
