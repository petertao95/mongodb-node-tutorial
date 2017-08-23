const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');

const users = [{
  device_id: 'some device id'
}, {
  device_id: 'some other device id'
}]

beforeEach((done) => {
  User.remove({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});

describe('Post /users', () => {
  it('should create a new user with device_id', (done) => {
    var device_id = 'a sample device_id'

    request(app)
      .post('/users')
      .send({device_id})
      .expect(200)
      .expect((res) => {
        expect(res.body.device_id).toBe(device_id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find().then((users) => {
          expect(users.length).toBe(3);
          done()
        }).catch((e) => done(e))
      })

  });

  it('should not create a new user with invalid body data', (done) => {
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        User.find().then((users) => {
          expect(users.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /users', () => {
  it('should get all users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
});
