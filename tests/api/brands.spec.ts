import { test, expect } from '../../fixtures/api.fixture';
import {
  expectSuccessfulResponse,
  expectResponseCode,
  expectResponseMessage,
} from '../../utils/api-assertions';


test.describe('Brands API', () => {
  test('should return the brands list successfully', async ({
    brandsService,
  }) => {
    // Arrange
    const response = await brandsService.getBrandsList();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);

    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBe(true);
    expect(responseBody.brands.length).toBeGreaterThan(0);
  });

  test('should return brands with required fields', async ({
    brandsService,
  }) => {
    // Arrange
    const response = await brandsService.getBrandsList();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);

    for (const brand of responseBody.brands) {
      expect(brand).toHaveProperty('id');
      expect(brand).toHaveProperty('brand');
    }
  });

  test('should return brands with valid data types', async ({
    brandsService,
  }) => {
    // Arrange
    const response = await brandsService.getBrandsList();

    // Act
    const responseBody = await response.json();

    // Assert
    expectSuccessfulResponse(response);

    for (const brand of responseBody.brands) {
      expect(typeof brand.id).toBe('number');
      expect(typeof brand.brand).toBe('string');
    }
  });

  test('should return application-level error for unsupported PUT request', async ({
    brandsService,}) => {
   // Arrange
   const response = await brandsService.updateBrandsList();

   // Act
   const responseBody = await response.json();

   // Assert
   expectResponseCode(responseBody, 405);
   expectResponseMessage(
    responseBody,
  'This request method is not supported.',
);
 });

 test('should return brands with unique IDs', async ({
  brandsService,
}) => {
  // Arrange
  const response = await brandsService.getBrandsList();

  // Act
  const responseBody = await response.json();

  // Assert
  expectSuccessfulResponse(response);

  const brandIds = responseBody.brands.map(
    (brand: { id: number }) => brand.id,
  );

  const uniqueBrandIds = new Set(brandIds);

  expect(uniqueBrandIds.size).toBe(brandIds.length);
});

});

