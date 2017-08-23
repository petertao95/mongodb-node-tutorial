const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');

beforeEach((done) => {
  User.remove({}).then(() => done());
})

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
          expect(users.length).toBe(1);
          expect(users[0].device_id).toBe(device_id);
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
          expect(users.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
