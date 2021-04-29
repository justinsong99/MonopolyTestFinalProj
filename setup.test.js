const puppeteer = require('puppeteer')
const pti = require('puppeteer-to-istanbul')
//require("regenerator-runtime/runtime");

test("test basic game site load", async () => {
    const browser = await puppeteer.launch({
       
    })
    const page = await browser.newPage()

    // Enable both JavaScript and CSS coverage
    await Promise.all([
        page.coverage.startJSCoverage([false, false]),
        page.coverage.startCSSCoverage()
    ]);

    await page.goto(
        'file:///Users/anirudhsharma/Documents/Semester8_College/STAD/Final%20Project/MonopolyTestFinalProj/monopoly-master1/index.html'
    )

    await page.click('#setup > div:nth-child(10) > input[type=button]')

    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true , storagePath: './.nyc_output' })
    await browser.close()
})

test("test start game click - 4 players", async () => {
    const browser = await puppeteer.launch({

    })
    const page = await browser.newPage()

    // Enable both JavaScript and CSS coverage
    await Promise.all([
        page.coverage.startJSCoverage([false, false]),
        page.coverage.startCSSCoverage()
    ]);

    await page.goto(
        'file:///Users/anirudhsharma/Documents/Semester8_College/STAD/Final%20Project/MonopolyTestFinalProj/monopoly-master1/index.html'
    )

    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true , storagePath: './.nyc_output' })
    await browser.close()
})

