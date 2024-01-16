import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('home page', () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/UK COVID-19 Cases/);
  });

  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'UK COVID-19 Regional Dashboard' })
    ).toBeVisible();
  });

  test('can link to region', async ({ page }) => {
    // Link to regional page
    const region = '/London';
    await page.getByLabel(/choose a region/i).selectOption(region);

    // Test that region page is showing correctly
    let urlPattern = new RegExp(`.*${region}`, 'i');
    await expect(page).toHaveURL(urlPattern);
    await expect(page.getByRole('combobox')).toHaveValue(region);
  });
});
