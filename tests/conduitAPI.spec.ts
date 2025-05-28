import { test, expect } from "@playwright/test";
// import tags from '../test-data/tags.json';
const tags = require("../test-data/tags.json");
test.beforeEach("Navigate to base url", async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    //   const tags = {
    //     tags: ["Automation", "Mocked API"],
    //   };
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "Title updated";
    responseBody.articles[0].description = "Description updated";

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  });
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });
});

test("test1 - Mocking API", async ({ page }) => {
  await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
  // Assertion for mock tags
  await expect(page.locator(".sidebar .tag-default.tag-pill")).toHaveText([
    "Automation",
    "Mocked API",
  ]);
  // Assertion for mock article
  await expect(page.locator('app-article-preview h1').first()).toHaveText('Title updated')
  await expect(page.locator('app-article-preview p').first()).toHaveText('Description updated')

});
