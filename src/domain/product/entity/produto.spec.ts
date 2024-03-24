import Product from './product'
import { ValidationError } from 'yup'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100)
    }).toThrowError()
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100)
    }).toThrowError()
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Name', -1)
    }).toThrowError()
  })

  it('should throw error when price is less than zero and name is empty', () => {
    try {
      new Product('123', '', -1)
    } catch (error) {
      const errorsExpected = [
        { context: 'product', message: 'Name is required' },
        { context: 'product', message: 'Price must be greater than zero' },
      ]
      const e = error as ValidationError
      expect(e.errors).toStrictEqual(errorsExpected)
    }
  })

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 100)
    product.changePrice(150)
    expect(product.price).toBe(150)
  })
})
