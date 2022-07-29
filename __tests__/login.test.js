const { By, Key, Builder } = require("selenium-webdriver");
require("geckodriver");

const url = process.env.AUTH0_BASE_URL || "http://localhost:3000";

// test case
it("Successful Login", async () => {
  let driver = await new Builder().forBrowser("firefox").build();

  await driver.get(url);

  await new Promise(r => setTimeout(r, 2000));

  await driver.findElement(By.id("login")).click();

  await new Promise(r => setTimeout(r, 3500));

  // username field
  await driver.findElement(By.id("username")).sendKeys("elkareem123@gmail.com");
  // password field
  await driver
    .findElement(By.id("password"))
    .sendKeys("Wv5412656..", Key.RETURN);

  await new Promise(r => setTimeout(r, 5000));

  const currentUrl = await driver.getCurrentUrl();
  const splitUrl = currentUrl.split("/");
  const route = splitUrl[splitUrl.length - 1];

  // This means we are in dashboard page
  expect(route).toEqual("dashboard");

  driver.quit();
});
