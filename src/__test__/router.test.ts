import app from '../server'
import supertest from 'supertest'

// Test for server response
describe('Server', () => {
  it('should be able to get response', async () => {
    // Send GET request to server
    const res = await supertest(app).get('/')
    // Check if response message is 'hello'
    expect(res.body.message).toBe('hello')
  })
})