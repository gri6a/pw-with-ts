import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Assertions", async ({ page }) => {
  // Generic assertions
  const value = 5;
  expect(value).toEqual(5);

  // Locator assertions
  const horizontalFormSignInBtn = page
    .locator("nb-card")
    .filter({ hasText: "Horizontal form" })
    .getByRole("button");
  const horizontalFormSignInBtnText =
    await horizontalFormSignInBtn.textContent();
  expect(horizontalFormSignInBtnText).toEqual("Sign in"); // Generic
  await expect(horizontalFormSignInBtn).toHaveText("Sign in"); // Locator
  // Soft assertion - not a good practice (expect.soft)
});