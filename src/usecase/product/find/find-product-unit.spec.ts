import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find-product-usecase'

const product = new Product('123', 'bike', 1)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '123',
    }

    const output = await usecase.execute(input)

    expect(output).toStrictEqual({
      id: '123',
      name: 'bike',
      price: 1,
    })
  })

  it('should not find a product', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })
    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '1234',
    }

    expect(() => usecase.execute(input)).rejects.toThrowError(
      'Product not found'
    )
  })
})
