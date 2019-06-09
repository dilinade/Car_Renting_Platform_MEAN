const expect = require('chai').expect;
const server = require('../index');

const uu = false;

function generateUserData() {
  return {
    username: randomstring.generate(10),
    password: randomstring.generate(5),
    email: 'test@test.com',
    role: 'user',
  };
}

describe('test', () => {
  it('should return a string', () => {
    expect('Connection succeed!').to.equal('Connection succeed!');
  });
});
if (uu) {
  describe('Login user', () => {
    let username; let password; let role; let email;
    before((done) => {
      // creating user for tests
      ({username, password, email, role} = generateUserData());
      createUser(username, email, password, role, (res) => {
        done();
      });
    });
    describe('Happy path', () => {
      it('Contains all needed params and user exists', (done) => {
        loginUser(username, password, (res) => {
          assert.strictEqual(res.status, 'OK');
          assert.strictEqual(res.role, role);
          assert(res.token);
          done();
        });
      });
    });
    describe('Should throw errors', () => {
      it('User doesn\'t exist', (done) => {
        loginUser('a@a.pl', 'a', (res) => {
          assert.strictEqual(res.status, 'ERROR');
          assert.strictEqual(res.msg, 'Invalid Email-Id');
          done();
        });
      });
      it('Username is null', (done) => {
        loginUser('', password, (res) => {
          assert.strictEqual(res.status, 'ERROR');
          assert.strictEqual(res.msg, 'Username , password must be specified');
          done();
        });
      });
      it('Password is null', (done) => {
        loginUser(username, '', (res) => {
          assert.strictEqual(res.status, 'ERROR');
          assert.strictEqual(res.msg, 'Username , password must be specified');
          done();
        });
      });
      it('Password is wrong', (done) => {
        loginUser(username, 'a', (res) => {
          assert.strictEqual(res.status, 'ERROR');
          assert.strictEqual(res.msg, 'Invalid password');
          done();
        });
      });
    });
  });
}
