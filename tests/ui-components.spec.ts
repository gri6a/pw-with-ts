import { state } from "@angular/animations";
import { test, expect } from "@playwright/test";
import { using } from "rxjs";
import { timeout } from "rxjs-compat/operator/timeout";

test.beforeEach("Navigate to UAT", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
    await expect(page).toHaveURL("http://localhost:4200/pages/forms/layouts");
  });

  test("Input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByPlaceholder("Email");

    await usingTheGridEmailInput.fill("bobby123@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("tester@test.com", {
      delay: 200,
    });
    // generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("tester@test.com");
    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("tester@test.com");
  });

  test("Radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    // selecting radio button Option 2
    // await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true});
    // await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).click({force:true});
    await usingTheGridForm.getByLabel("Option 2").check({ force: true });
    const radioStatus = await usingTheGridForm
      .getByLabel("Option 2")
      .isChecked();
    await expect(usingTheGridForm.getByLabel("Option 2")).toBeChecked();
    await expect(radioStatus).toBeTruthy();
    await expect(usingTheGridForm.getByLabel("Option 1")).toBeChecked({
      checked: false,
    });
  });
});

test("Checkboxes", async ({ page }) => {
  // click on Hide on click
  const modalsAndOverlays = page.getByText("Modal & Overlays");
  const toastr = page.getByText("Toastr");
  const hideOnClickCheckbox = page.locator("nb-checkbox", {
    hasText: "Hide on click",
  });
  const showToastWithIconCheckbox = page.getByRole("checkbox", {
    name: "Show toast with icon",
  });
  const preventArisingOfDuplicateToastCheckbox = page.getByRole("checkbox", {
    name: "Prevent arising of duplicate toast",
  });

  await modalsAndOverlays.click();
  await toastr.click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/toastr"
  );
  await hideOnClickCheckbox.click(); // clicking on / unchecking 'Hide on click'

  await showToastWithIconCheckbox.uncheck({ force: true }); // unchecking 'Show toast with icon'

  await preventArisingOfDuplicateToastCheckbox.check({ force: true });

  const allBoxes = page.getByRole("checkbox");

  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("Lists and dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();

  // page.getByRole('list') - used when the list has a UL tags
  // page.getByRole('listitem') - used when teh list has an LI tags

  const optionList1 = page.getByRole("list").locator("nb-option");
  const optionList2 = page.locator("nb-option-list nb-option");

  await expect(optionList1).toHaveText([
    "Light",
    "Dark",
    "Cosmic",
    "Corporate",
  ]);

  await optionList2.filter({ hasText: "Dark" }).click();

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  await dropDownMenu.click();
  for (const color in colors) {
    await optionList2.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color != "Corporate") await dropDownMenu.click();
  }
});

test("Tooltips 1", async ({ page }) => {
  // page.getByRole('tooltip') - you can use this is you have role tooltip created in your source code
  // to inspect tooltip message: 1) inspect element 2) go to Sources, hover over element and press F8 (debugger)
  // 3) go back to Elements and search for tooltip (dynamic element)

  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/tooltip"
  );

  const tooltipPlacementsCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });

  await tooltipPlacementsCard.getByRole("button", { name: "Top" }).hover();

  const TopTooltip = await page.locator("nb-tooltip").textContent();
  await expect(TopTooltip).toEqual("This is a tooltip");
});

test("Tooltips 2", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/tooltip"
  );
  const coloredTooltips = page.locator("nb-card", {
    hasText: "Colored Tooltips",
  });
  await coloredTooltips.getByRole("button", { name: "Default" }).hover();
  const defaultTooltip = await page.locator("nb-tooltip").textContent();
  await expect(defaultTooltip).toEqual("This is a tooltip");
});

test("Dialog boxes 1", async ({ page }) => {
  const openDialogWithComponentBtn = page.getByRole("button", {
    name: "Open Dialog with component",
  });
  const dismissDialogBtn = page.getByRole("button", { name: "Dismiss Dialog" });
  // console.log(textContainer);
  const expectedText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis tincidunt tincidunt. Vestibulum vulputate maximus massa vel tristique. Suspendisse potenti. Duis aliquet purus sed dictum dictum. Donec fringilla, purus at fermentum imperdiet, velit enim malesuada turpis, quis luctus arcu arcu nec orci. Duis eu mattis felis. Quisque sollicitudin elementum nunc vel tincidunt. Vestibulum egestas mi nec iaculis varius. Morbi in risus sed sapien ultricies feugiat. Quisque pulvinar mattis purus, in aliquet massa aliquet et.";

  await page.getByText("Modal & Overlays").click();
  await page.getByText("Dialog").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/dialog"
  );
  await openDialogWithComponentBtn.click();
  const textContainer = await page
    .locator("nb-dialog-container nb-card-body")
    .textContent();
  expect(textContainer.trim()).toEqual(expectedText);
  await dismissDialogBtn.click();
});

test("Dialog boxes 2", async ({ page }) => {
  const enterNameBtn = page.getByRole("button", { name: "Enter Name" });
  // const nameInputBox = page.getByRole('textbox', {name: 'Name'});
  const nameInputBox2 = page.getByPlaceholder("Name");
  const submitBtn = page.getByRole("button", { name: "Submit" });
  const cancelBtn = page.getByRole("button", { name: "Cancel" });
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Dialog").click();
  await expect(page).toHaveURL(
    "http://localhost:4200/pages/modal-overlays/dialog"
  );

  await enterNameBtn.click();
  await nameInputBox2.fill("Hello World");
  await submitBtn.click();
  const returnedNameText = await page.locator("nb-card-body li").textContent();
  await expect(returnedNameText).toEqual("Hello World");
});

test("Dialog boxes 3 - Accepting Alert/Dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // adding listener for dialog box / JS Alert
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("Dialog boxes 4 - Dismissing Alert/Dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // adding listener for dialog box / JS Alert
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.dismiss();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
  await expect(
    page.getByRole("table").getByRole("row", { name: "@mdo" })
  ).toContainText("mdo@gmail.com");
});
