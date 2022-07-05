import mongoose from 'mongoose'
import supertest from 'supertest'
import dotenv from 'dotenv'
import server from '../src/server'
import ProductsModel from '../src/api/products/model.js'

dotenv.config()

const client = supertest(server)

beforeAll(async () => {
  mongoose.connect(process.env.MONGO_TEST_URL)
  const newProduct = new ProductsModel({
    name: 'Leon',
    description: 'nothing here',
    age: 28
  })
  await newProduct.save()
})

afterAll(async () => {
  await mongoose.connection.close()
})

test("Non existant ID's from /products/:id should give a 404", async () => {
  const response = await client.get('/products/123456123456123456123456').expect(404)
})
