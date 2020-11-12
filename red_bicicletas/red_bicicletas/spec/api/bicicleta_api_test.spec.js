var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/bicicletas";

describe('Bicicleta API', () => {
  beforeEach(function(done) {
    var mongoDB ='mongodb://localhost/testdb';
    mongoose.connect(mongoDB, {useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database');
      done();
    });


  });

  afterEach(function(done){
    Bicicleta.deleteMany({}, function(err, success){
      if(err) console.log(err);
      done();
    });
  });

  describe('GET BiCICLETAS /', () => {
    it('status 200', (done) => {
      request.get(base_url, funtion(error, response, body) {
        var result = JSON.parse(body);
        expect(response.statusCode).toBe(200);
        expect(result.bicicletas.length).toBe(0);
        done();
      });
    });
  });

  describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
      var headers = {'Content-Type' : 'application/json'};
      var aBici '("code": 10, "color": "morado", "modelo": "urbana", "lat": "-10.00", "lng": "-1.0")';
      request.post({
        headers: headers,
        url: base_url + '/create',
        body: aBici
      }, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        var bici = JSON.parse(body).bicicleta;
        console.log(bici);
        expect(bici.color).toBe("morado");
        expect(bici.ubicacion[0]).toBe(-10.00);
        expect(bici.ubicacion[1]).toBe(-1.0);
        done();
      });
    });
  });

  describe("DELETE BICICLETAS /delete", () => {
    it('STATUS 204', (done) => {
      var a = Bicileta.createInstance(1, 'negro', 'urbana', ["-25.9", "lng": "-8.9"]);
      var headers = {'Content-Type' : 'application/json'};
        request.post({
        headers: headers,
        url: base_url + '/create',
        body: aBici
      }, function(error, response, body) {
        expect(response.statusCode).toBe(204);
        Bicicleta.findByCode(1, function(err, targetBici) {
                       expect(targetBici).toEqual(null);
                       done();
                   });
      });
    });
  });
  /*describe('GET BiCICLETAS /', () => {
    it('status 200', () => {
      expect(Bicicleta.allBicis.length).toBe(0);

      var a = new Bicicleta(1, 'rojo', 'urbana', [6.255204, -75.6012]);
      Bicicleta.add(a);

      request.get('http://localhost:3000/api/bicicltetas', funtion(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('POST BICICLETAS /create', () => {
    it('STATUS 200', (done) => {
      var headers = {'Content-Type' : 'application/json'};
      var aBici '("id": 10, "color": "morado", "modelo": "urbana", "lat": "10.000", "lng": "-1.0")';
      request.post({
        headers: headers,
        url: 'http://localhost:3000/api/bicicltetas/create',
        body: aBici
      }, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        expect(Bicicleta.findById(10).color).toBe("morado");
        done();
      });
    });
  });*/

});
