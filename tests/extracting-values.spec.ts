import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to Form Layouts", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Extracting text from the element", async ({ page }) => {
  // Basic Form => extract name of the 'Submit' button and confirm that it is a correct name
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  // console.log(buttonText);
  expect(buttonText).toContain("Submit");
  expect(buttonText).toEqual("Submit");
});

test("Extracting text from multiple elements", async ({ page }) => {
  // Using the Grid form => extracting text from all radio buttons
  // Verifying that at least one has 'Option 2' value
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  // console.log(allRadioButtonsLabels);
  expect(allRadioButtonsLabels).toContain("Option 2");
});

test("Assertions on input values", async ({ page }) => {
  // validations on input values
  const formWithoutLabels = page.locator("nb-card", {
    hasText: "Form without labels",
  });
  const recipientsField = formWithoutLabels.getByPlaceholder("Recipients");
  await recipientsField.fill("Internal Only");
  const recipientsValue = await recipientsField.inputValue();
  expect(recipientsValue).toEqual("Internal Only");
});

test("Assertion on attribute value", async ({ page }) => {
  // validating that placeholder attribute has value 'Email' in Basic Form
  const basicForm = page.locator("nb-card", { hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  const placeholderValue = await emailField.getAttribute("placeholder");
  expect(placeholderValue).toEqual("Email");
});
