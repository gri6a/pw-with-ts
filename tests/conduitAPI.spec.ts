import { test, expect, request } from "@playwright/test";
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
  await page.goto("https://conduit.bondaracademy.com/");
  await page.getByText("Sign in").click();
  await page.getByPlaceholder("Email").fill("tester2803@test.com");
  await page.getByPlaceholder("Password").fill("Tester123");
  await page.getByRole("button", { name: "Sign in" }).click();
});

test("test1 - Mocking API", async ({ page }) => {
  // await expect(page).toHaveURL("https://conduit.bondaracademy.com/");
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "Title updated Mock";
    responseBody.articles[0].description = "Description updated Mock";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });
  await page.goto("https://conduit.bondaracademy.com/", {
    waitUntil: "networkidle",
  });
  // Assertion for mock tags
  await expect(page.locator(".sidebar .tag-default.tag-pill")).toHaveText([
    "Automation",
    "Mocked API",
  ]);
  // Assertion for mock article
  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-preview h1").first()).toHaveText(
    "Title updated Mock"
  );
  await expect(page.locator("app-article-preview p").first()).toHaveText(
    "Description updated Mock"
  );
});

test("Deleting an article", async ({ page, request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: { user: { email: "tester2803@test.com", password: "Tester123" } },
    }
  );
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "titlev2",
          description: "??v2",
          body: "testv2",
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );
  expect(articleResponse.status()).toEqual(201);

  await page.getByText("Global Feed").click();
  await expect(page.locator("app-article-preview h1").first()).toHaveText(
    "titlev2"
  );
  await page.waitForTimeout(3000);
  await page.getByText("titlev2").click();
  await page.getByRole("button", { name: " Delete Article " }).first().click();
  await expect(page.locator("app-article-preview h1").first()).not.toHaveText(
    "titlev2"
  );
});
