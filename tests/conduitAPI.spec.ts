import { test, expect } from "@playwright/test";
// import tags from '../test-data/tags.json';
const tags = require("../test-data/tags.json");
test.beforeEach("Navigate to base url", async ({ page }) => {
  await page.route(
    "*/**/api/tags",
    async (route) => {
    //   const tags = {
    //     tags: ["Automation", "Mocked API"],
    //   };
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    }
  );
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });
});

test("test1 - Mocking API", async ({ page }) => {
  await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
  await expect(page.locator(".sidebar .tag-default.tag-pill")).toHaveText([
    "Automation",
    "Mocked API",
  ]);
});
