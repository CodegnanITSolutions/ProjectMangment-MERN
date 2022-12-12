
//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


let User = require("../models/user.model");
let Project = require("../models/project.model");
let Task = require("../models/task.model");

chai.use(chaiHttp);

describe('App', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.deleteMany({}, (err) => { 
            Project.deleteMany({}, (err) => { 
                User.deleteMany({}, (err) => { 
                    done();           
                 });          
             });        
        });        
    });
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
          chai.request(server)
              .get('/users')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });

});