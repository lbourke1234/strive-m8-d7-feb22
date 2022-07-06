import mongoose from 'mongoose'
import supertest from 'supertest'
import dotenv from 'dotenv'
import server from '../src/server'
import ProductsModel from '../src/api/products/model.js'

dotenv.config()

console.log('mongo test url: ', process.env.MONGO_TEST_URL)
console.log('mongo url: ', process.env.MONGO_URL)

const client = supertest(server)

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_TEST_URL)
  const newProduct = new ProductsModel({
    name: 'Leon',
    description: 'nothing here',
    price: 28
  })
  await newProduct.save()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('apiProducts test', () => {
  test("Non existant ID's from /products/:id should give a 404", async () => {
    const response = await client.get('/products/123456123456123456123456').expect(404)
    console.log(response.body)
  })
  test('Delete product should give 204 and 404 with wrong Id', async () => {
    const response = await client.get('/products/123456123456123456123456').expect(404)
    console.log(response.body)
  })
})
