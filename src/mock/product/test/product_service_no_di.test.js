const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');
// 이경우 의도치않게 ProductClient 내부의 네트워크에 의존하는 Fetch 테스트를 진행하게 됨
// ProductClient자체를 mock처리해보자!!
jest.mock('../product_client');
describe('ProductService', () => {
  const fetchItems = jest.fn(async () => [
    { item: 'milk', available: true },
    { item: 'banana', available: false },
  ]);
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });
  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: 'milk', available: true }]);
  });

  it('test', async () => {
    const items = await productService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
