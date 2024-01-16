import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/London');
});

test.describe('region selection', () => {
  test('can go directly to region', async ({ page }) => {
    const regionSelector = page.getByRole('combobox');

    await page.goto('/London');
    await expect(page).toHaveURL(/.*london/i);
    await expect(regionSelector).toHaveValue(/\/london/i);

    await page.goto('/West%20Midlands');
    await expect(page).toHaveURL(/.*West%20Midlands/i);
    await expect(regionSelector).toHaveValue(/\/west%20midlands/i);
  });

  test('all regions are accessible', async ({ page }) => {
    const regionSelector = page.getByRole('combobox');

    const allAvailableRegions = [
      'East Midlands',
      'East of England',
      'London',
      'North East',
      'North West',
      'South East',
      'South West',
      'West Midlands',
      'Yorkshire and The Humber',
    ].map((unEncodedRegion) => `/${encodeURIComponent(unEncodedRegion)}`);

    for (let region of allAvailableRegions) {
      await regionSelector.selectOption(region);
      let urlPattern = new RegExp(`.*${region}`, 'i');
      await expect(page).toHaveURL(urlPattern);
      await expect(regionSelector).toHaveValue(region);
    }
  });
});
