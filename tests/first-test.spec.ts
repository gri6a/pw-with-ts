import { test, expect } from "@playwright/test";

test.beforeEach("Navigating to Main page", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
});

test.describe("Suite1 - Forms page", () => {
  test.beforeEach("Navigate to Forms page", async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("Navigate to Form Layouts page", async ({ page }) => {
    await page.getByText("Form Layouts").click();
    await expect(page).toHaveURL("http://localhost:4200/pages/forms/layouts");
  });

  test("Navigate to Datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
    await expect(page).toHaveURL(
      "http://localhost:4200/pages/forms/datepicker"
    );
  });
});
