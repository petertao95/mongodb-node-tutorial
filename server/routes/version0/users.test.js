const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
const {app} = require('./../../server');
const {User} = require('./../../models/user');

const users = [{
  _id: new ObjectID(),
  device_id: 'some device id'
}, {
  _id: new ObjectID(),
  device_id: 'some other device id'
}]

beforeEach((done) => {
  User.remove({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});

function addVersion(path) {
  return '/v0' + path;
}

describe('Post ' + addVersion('/users'), () => {
  it('should create a new user with device_id', (done) => {
    var device_id = 'a sample device_id'

    request(app)
      .post(addVersion('/users'))
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
      .post(addVersion('/users'))
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
      .get(addVersion('/users'))
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /users/:id', () => {
  it('should get a user', (done) => {
    request(app)
      .get(addVersion(`/users/${users[0]._id.toHexString()}`))
      .expect(200)
      .expect((res) => {
        expect(res.body.user.device_id).toBe(users[0].device_id);
      })
      .end(done);
  });

  it('should return a 404 if user does not exist', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(addVersion(`/users/${hexId}`))
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non object ids', (done) => {
    request(app)
      .get(addVersion('/users/123'))
      .expect(400)
      .end(done);
  });

});
