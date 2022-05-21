// wir importieren chai und chai-http:
const chai = require('chai');
const chaiHttp = require('chai-http');

// wir importieren unsere server app:
const server = require('../src/Backend/server');

// zum testen verschiedener assertion dialekte nutzen wir heute should:
const should = chai.should();

// wir sagen chai, es soll chaiHttp als middleware/plugin nutzen:
chai.use(chaiHttp);

describe('App', () =>
    {
        describe('POST /create/user', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/create/user')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /user/update', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/user/update')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /login', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/login')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /user/logout', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/user/logout')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /img', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/img')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });
        describe('POST /uploadphoto', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/uploadphoto')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /DeleteProfilePhoto', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/DeleteProfilePhoto')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });

        describe('POST /DeleteAccount', () =>
        {
            it('should return status 200', (done) =>
            {
                chai.request(server)
                .post('/DeleteAccount')
                .end((err, res) =>
                {
                    // wir sagen, es sollte status 200 zurückliefern:
                    res.should.have.status(200);
    
                    done();
                });
            });
        });
    });
