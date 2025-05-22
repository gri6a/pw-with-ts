import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Completing Inline form", async ({ page }) => {
  const inlineForm = page.locator(".inline-form-card");
  await inlineForm.getByPlaceholder("Jane Doe").fill("Bobby Green");
  await inlineForm.getByPlaceholder("Email").fill("bg2803@test.com");
  await inlineForm.locator(".custom-checkbox").check();
  await inlineForm.getByRole("button", { name: "Submit" }).click();
});

test("Completing Using the Grid", async ({ page }) => {
  await page.locator("#inputEmail1").fill("abc123456@test.com");
  await page.locator("#inputPassword2").fill("Te$$ter321");
  await page.getByText("Option 1").check();
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("button", { name: "Sign in" })
    .click();
});

test("Completing Basic form", async ({ page }) => {
  await page.locator("#exampleInputEmail1").fill("tester@test.com");
  await page.locator("#exampleInputPassword1").fill("te$$ter123");
  await page.getByText("Check me out").check();
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("button", { name: "Submit" })
    .click();
});

test("Completing Form without labels", async ({ page }) => {
  await page.getByPlaceholder("Recipients").fill("FO Departament");
  await page.getByPlaceholder("Subject").fill("Staff party");
  await page
    .getByPlaceholder("Message")
    .fill("Party will take place at... on ...");
  await page.getByRole("button", { name: "Send" }).click();
});

test("Completing Block form", async ({ page }) => {
  await page.locator("#inputFirstName").fill("Annie");
  await page.locator("#inputLastName").fill("Smith");
  await page.locator("#inputEmail").fill("as@test.com");
  await page.locator("#inputWebsite").fill("www.google.com");
  await page
    .locator("nb-card", { hasText: "Block form" })
    .getByRole("button", { name: "Submit" })
    .click();
});

test("Completing Horizontal form", async ({ page }) => {
  const horizontalForm = page.locator("nb-card", {
    hasText: "Horizontal form",
  });
  const email = "horizontal@test.com";
  const password = "Pa$$word321";

  await horizontalForm.getByPlaceholder("Email").fill(email);
  await horizontalForm.getByLabel("Password").fill(password);
  await horizontalForm.locator("nb-checkbox").click();
  await horizontalForm.getByRole("button").click();
});
