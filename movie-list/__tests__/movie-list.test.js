const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get(
    "file:///C:/Users/nitin/Desktop/Devmountain/Foundations/Lectures/week6/Day%203%20-%20Automation/automation-demo/solution/movie-list/index.html"
  );
});

afterAll(async () => {
  await driver.quit();
});

test("add a movie to the list", async () => {
  const inputField = await driver.findElement(By.xpath("//input"));
  await inputField.sendKeys("Tenet\n");
  const movieTitle = await driver.findElement(
    By.xpath("/html/body/main/ul/li/span")
  );
  const isMovieTitleVisible = await movieTitle.getText();
  expect(isMovieTitleVisible).toBe("Tenet");
  await driver.sleep(2000);
});

test("can strikethrough a listed movie", async () => {
  const movieTitle = await driver.findElement(By.xpath("//span"));
  await movieTitle.click();
  const strikeThrough = await movieTitle.getCssValue("text-decoration");
  expect(strikeThrough).toContain("line-through");
  await driver.sleep(2000);
});

test("delete movie from list", async () => {
  const deleteButton = await driver.findElement(
    By.xpath("/html/body/main/ul/li/button")
  );
  await deleteButton.click();
  await driver.sleep(2000);
});
