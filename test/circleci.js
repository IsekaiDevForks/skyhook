process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const json = {
    "payload": {
        "vcs_url": "https://github.com/circleci/mongofinil",
        "build_url": "https://circleci.com/gh/circleci/mongofinil/22",
        "build_num": 22,
        "branch": "master",
        "vcs_revision": "1d231626ba1d2838e599c5c598d28e2306ad4e48",
        "committer_name": "Allen Rohner",
        "committer_email": "arohner@gmail.com",
        "subject": "Don't explode when the system clock shifts backwards",
        "body": "",
        "why": "github",
        "dont_build": null,
        "queued_at": "2013-02-12T21:33:30Z",
        "start_time": "2013-02-12T21:33:38Z",
        "stop_time": "2013-02-12T21:34:01Z",
        "build_time_millis": 23505,
        "username": "circleci",
        "reponame": "mongofinil",
        "lifecycle": "finished",
        "outcome": "success",
        "status": "success",
        "retry_of": null
    }
};

/*
 * Test the /POST route
 */
describe('/POST circleci', () => {
    it('build', (done) => {
        chai.request(server)
            .post('/api/webhooks/test/test/circleci')
            .set("test", "true")
            .send(json)
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('embeds');
                done();
            });
    });
});
