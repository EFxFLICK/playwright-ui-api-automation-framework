import { test, expect } from '../../fixtures/api.fixture';
import {
  expectSuccessfulResponse,
  expectResponseCode,
  expectResponseMessage,
} from '../../utils/api-assertions';

test.describe('Products API', () => {

  test('should return the products list successfully', async ({
  productsService,
}) => {
  // Arrange
  const response = await productsService.getProductsList();

  // Act
  const responseBody = await response.json();

  // Assert
  expectSuccessfulResponse(response);

  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);
});

  test('should return products with required fields', async ({
    productsService,
  }) => {
    // Arrange
    const response = await productsService.getProductsList();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);

    for (const product of responseBody.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('brand');
      expect(product).toHaveProperty('category');
    }
  });

  test('should return products with valid data types', async ({
    productsService,
  }) => {
    // Arrange
    const response = await productsService.getProductsList();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);

    for (const product of responseBody.products) {
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('string');
      expect(typeof product.brand).toBe('string');
      expect(typeof product.category).toBe('object');
    }
  });

  test('should return application-level error for unsupported POST request', async ({
   productsService,}) => {
   // Arrange
   const response = await productsService.createProductsList();

   // Act
   const responseBody = await response.json();

   // Assert
   expectSuccessfulResponse(response);
   expectResponseMessage(
  responseBody,
  'This request method is not supported.',
);
 });

 test('should search products successfully', async ({
   productsService,}) => {
   const response = await productsService.searchProduct('top');

   const responseBody = await response.json();

   expectSuccessfulResponse(response);
   expect(responseBody).toHaveProperty('products');
   expect(Array.isArray(responseBody.products)).toBe(true);
   expect(responseBody.products.length).toBeGreaterThan(0);
 });

  test('should reject search request without search parameter', async ({
   productsService,}) => {
   const response = await productsService.searchProductWithoutParameter();

   expectSuccessfulResponse(response);

   const responseBody = await response.json();

   expectResponseCode(responseBody, 400);
   expectResponseMessage(
   responseBody,
   'Bad request, search_product parameter is missing in POST request.',
   );
   
   });

  test('should return no products for a non-matching search', async ({
    productsService,}) => {
    // Arrange
     const response = await productsService.searchProduct(
     'xyznonexistent123',
    );

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);
    expect(responseBody.products.length).toBe(0);
  });
 
})
