const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="ebooksImgBlkFront"]');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('txtContent');
    const rawTxt = await txt.jsonValue();

    console.log({ srcTxt, rawTxt });

    browser.close();
}

scrapeProduct(
    'https://www.amazon.com/dp/B09BNH4TLW/ref=s9_acsd_al_bw_c2_x_0_i?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-4&pf_rd_r=WS0VJ0KGRHZHQ16NW54K&pf_rd_t=101&pf_rd_p=bf802927-c32f-4f19-85a7-b1c1a5c53145&pf_rd_i=3003015011'
);
