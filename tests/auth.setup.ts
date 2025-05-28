import { patch } from "@nebular/theme";
import { test as setup } from "@playwright/test";
// import user from '../.auth/user.json';
const user = require("../.auth/user.json");
const fs = require("fs");

const authFile = ".auth/user.json";

setup("authentication", async ({ page, request }) => {
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: { user: { email: "tester2803@test.com", password: "Tester123" } },
    }
  );
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;
  user.origins[0].localStorage[0].value = accessToken;

  fs.writeFileSync(authFile, JSON.stringify(user));

  process.env["ACCESS_TOKEN"] = accessToken;
});
