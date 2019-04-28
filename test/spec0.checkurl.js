process.env.NODE_ENV = 'test';
const expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    server = app.listen(),
    api = supertest(server);

describe('#CheckUpAndRunning', () => {
    describe('404ERROR', () => {
        it('Expect database not found', (done) => {
            api.get('/test/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('check Site does not changed hash value', (done)=> {
            api.get('/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {                    
                    expect(res.body).to.have.property('msg');
                    expect(res.body).to.equal('server up and running')
                    expect(res.body).to.have.property('time');                    
                    done();
                });
        });
        it('check Site does not changed hash value', (done)=> {
            api.get('/checkurl/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {                    
                    expect(res.body).to.have.property('siteChanged');
                    expect(res.body.siteChanged).to.equal(false);
                    done();
                });
        });
        it('check Site changed hash value', (done)=> {
            api.get('/checkurl/')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {                    
                    expect(res.body).to.have.property('siteChanged');
                    expect(res.body.siteChanged).to.equal(false);
                    done();
                });
        });
    });
});
