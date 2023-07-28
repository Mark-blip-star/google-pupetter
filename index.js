const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getEmailContent(email, password) {
  try {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.goto("https://mail.google.com");
    await delay(1000);

    await page.waitForSelector('input[type="email"]', { visible: true });
    await delay(2000);
    await page.type('input[type="email"]', email);
    await page.keyboard.press("Enter");

    await page.waitForSelector('input[type="password"]', { visible: true });
    await delay(2000);
    await page.type('input[type="password"]', password);
    await delay(1000);
    await page.keyboard.press("Enter");

    await page.waitForNavigation({ waitUntil: "networkidle" });
    await page.waitForSelector(".bsU");

    const divElement = await page.waitForSelector(".bsU");
    const content = await divElement.evaluate((el) => el.textContent);

    await browser.close();

    return content;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

app.use(express.json());

app.post("/getEmailContent", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const content = await getEmailContent(email, password);
    return res.status(200).json({ content });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching email content." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
