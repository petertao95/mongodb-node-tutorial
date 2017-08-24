const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
const {app} = require('./../../../server');
const {User} = require('./../models/user');
const {Post} = require('./../models/post');

// const users = [{
//   _id: new ObjectID(),
//   device_id: 'some device id'
// }, {
//   _id: new ObjectID(),
//   device_id: 'some other device id'
// }]

beforeEach((done) => {
  Post.remove({}).then(() => {
    return User.insertMany([]);
  }).then(() => done());
});

function addVersion(path) {
  return '/v0' + path;
}

describe('POST ' + addVersion('/posts'), () => {
  it('should create a new post', (done) => {
    var data = {
      "user_id": "599e2683adb42f2442de2404",
      "media_type": "image",
      "media_url": "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg",
      "latitude": -16.5004,
      "longitude": 151.7415
    }

    request(app)
      .post(addVersion('/posts'))
      .send(data)
      .expect(200)
      .expect((res) => {
        expect(res.body.user).toBe(data.user_id);
      })
      .expect((res) => {
        expect(res.body.media_type).toBe(data.media_type);
      })
      .expect((res) => {
        expect(res.body.geometry.coordinates[1]).toBe(data.latitude);
      })
      .expect((res) => {
        expect(res.body.geometry.coordinates[0]).toBe(data.longitude);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Post.find().then((posts) => {
          expect(posts.length).toBe(1);
          done()
        }).catch((e) => done(e))
      })
  });

  it('should not create a new post with invalid body data', (done) => {
    request(app)
      .post(addVersion('/posts'))
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Post.find().then((posts) => {
          expect(posts.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});
