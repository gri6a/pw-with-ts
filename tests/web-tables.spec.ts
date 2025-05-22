import { test, expect } from "@playwright/test";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Web Tables Part 1a - updating user's age", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/tables/smart-table"
  );

  // updating Age from 18 to 80 for user with ID = 3
  await page
    .getByRole("row", { name: "twitter@outlook.com" })
    .locator(".nb-edit")
    .click();
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("80");
  await page.locator("td .nb-checkmark").click();
});

test("Web Tables Part 1b - updating a record searching by ID column", async ({
  page,
}) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/tables/smart-table"
  );
  // navigating to 2nd page
  await page.locator("nav ul", { hasText: "2" }).click();

  // updating user's age, locating user by ID column (ID = 11)
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator("td .nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("mark38@gmail.com");
  await page.keyboard.press("Enter");
  await expect(
    page.locator("table tr td", { hasText: "mark38@gmail.com" })
  ).toHaveText("mark38@gmail.com");
});

test("Web Tables Part 2", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/tables/smart-table"
  );
  const ageFilter = page.locator("input-filter").getByPlaceholder("Age");
  const ages = ["20", "38", "55", "100"];

  for (const age of ages) {
    await ageFilter.clear();
    await ageFilter.fill(age);
    await page.waitForTimeout(1000);

    const ageRows = page.locator("tbody tr");

    for (const row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();

      if (age === "100") {
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found"
        );
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
  await page.close();
});
