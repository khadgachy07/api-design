import * as user from '../user'

describe('User Handler', () => {
    it('Should create a user and return token', async () => {
      const req = {
        body: {
          "username": "test1",
          "password": "test1",
          "email": "test1@example.com"
        }
      };
      let token;
      const res = {
        json: (data) => {
          token = data;
          expect(token).toBeTruthy();
          expect(typeof token).toBe('string');
          expect(token.length).toBeGreaterThan(0);
        }
      };
      try {
        await user.createUser(req, res ,() => {});
      } catch (error) {
        expect(error).toBeNull();
      }
    });
  });