const puppeteer = require('puppeteer') // Require Puppeteer module
const cloudinary = require('cloudinary')
const streamifier = require('streamifier')
require('dotenv').config()
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const uploadFromBuffer = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'foo',
      },
      (error: any, result: any) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )

    streamifier.createReadStream(buffer).pipe(cld_upload_stream)
  })
}

export const screenshot = async (
  url: string,
  onResult: (result: any) => void
) => {
  // Define Screenshot function
  const browser = await puppeteer.launch() // Launch a "browser"
  const page = await browser.newPage() // Open new page
  await page.goto(url) // Go website
  const selector = '#repo-content-pjax-container > div > div'
  await page.waitForSelector(selector) // Method to ensure that the element is loaded
  const logo = await page.$(selector) // logo is the element you want to capture
  const image = await logo.screenshot({
    path: 'testim.png',
  })

  await page.close() // Close the website
  await browser.close() // Close the browser

  const result = await uploadFromBuffer(image)
  console.log({ image, result })

  onResult(result)
}
