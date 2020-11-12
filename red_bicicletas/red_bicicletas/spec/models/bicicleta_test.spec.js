var mongoose = require('mongoose');
var Bicicleta = require ('../../models/bicicleta');

describe('Testing Bicicletas', function (){
  beforeEach(function (done) {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.connect(mongoDB, { useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection_error'));
    db.once('open', function () {
      console.log('we are the connected to test database!');
      done();
    });
  });

  afterEach(function(done) {
    Bicicletas.deteleMany({}, function(err, success){
      if (err) console.log(err);
    });
  });

  describe('Bicicleta.createInstance', () => {
    it('crea una instancia de Bicicleta', () => {
      var bici = Bicicleta.createInstance(1, "verde", "urbana", [-6.75, -34.23]);

      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-6.75);
      expect(bici.ubicacion[1]).toEqual(-34.23);

    })
  });

  describe('Bicicleta.allBicis', () => {
    it('comienza vacio', (done) => {
      Bicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });

  describe('Bicileta.add', () => {
    it('agregaron una', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0);
      var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
      Bicicleta.add(aBici, function(err, newBici){
        if (err) console.log(err);
        Bicileta.allBicis(function(err, bicis){
          expect(Bicis.length).toEqual(1);
          expect(Bicis[0].code).toEqual(aBici.code);

          done();
        });
      });
    });
  });

  describe('Bicicleta.findByCode', () => {
    it('debe devolver la bici con code  1', done() => {
      Bicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0);

        var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
        Bicicleta.add(aBici, function(err, newBici){
          if (err) console.log(err);

          var aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "urbana"});
          Bicicleta.add(aBici2, function(err, newBici){
            if (err) console.log(err);
            Bicileta.findByCode(1, function(error, targetBici){
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);

              done();
            });
          });
        });
      });
    });
  });
});

/*beforeEach(() => {Bicicleta.allBicis = []; });
describe('Bicicleta.allBicis', () => {
  it('comienza vacio', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe('Bicileta.add', () => {
  it('agregaron una', () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var a = new Bicicleta(1, 'rojo', 'urbana', [6.255204, -75.6012]);
    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

describe('Bicicleta.findById', () => {
  it('devuelve la bici con el id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var abici = new Bicicleta(1, "verde", "urbana");
    var abici2 = new Bicicleta(2, "violeta", "montaña");
    Bicicleta.add(abici);
    Bicicleta.add(abici2);

    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe(abici.color);
    expect(targetBici.modelo).toBe(abici.modelo);
  });
});
*/
