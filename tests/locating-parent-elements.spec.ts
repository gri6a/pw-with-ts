import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locating parent elements", async ({ page }) => {
  // await page.getByRole('button', {name: 'Sign in'}).first().click();
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("button", { name: "Sign in" })
    .click();
});
