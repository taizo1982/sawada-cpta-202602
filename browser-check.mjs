import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const URL = 'http://localhost:3001/';
const OUT = '/Users/massivecreate/myproject/sawada-cpta-202602/screenshots';

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: true });

// === Desktop full page ===
const desktop = await browser.newPage();
await desktop.setViewport({ width: 1280, height: 800 });
await desktop.goto(URL, { waitUntil: 'networkidle0' });
await desktop.screenshot({ path: `${OUT}/01-desktop-hero.png`, fullPage: false });
await desktop.screenshot({ path: `${OUT}/02-desktop-full.png`, fullPage: true });

// === Mobile full page ===
const mobile = await browser.newPage();
await mobile.setViewport({ width: 375, height: 812 });
await mobile.goto(URL, { waitUntil: 'networkidle0' });
await mobile.screenshot({ path: `${OUT}/03-mobile-hero.png`, fullPage: false });
await mobile.screenshot({ path: `${OUT}/04-mobile-full.png`, fullPage: true });

// === Quiz test: all yes → result-a (5/5) ===
const quizPage = await browser.newPage();
await quizPage.setViewport({ width: 1280, height: 800 });
await quizPage.goto(URL, { waitUntil: 'networkidle0' });

for (let i = 1; i <= 5; i++) {
  await quizPage.click(`#q${i}-yes`);
}
await quizPage.click('.btn-submit');
await new Promise(r => setTimeout(r, 500));
await quizPage.screenshot({ path: `${OUT}/05-quiz-all-yes.png`, fullPage: false });

// Scroll to result
await quizPage.evaluate(() => {
  document.getElementById('result').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await quizPage.screenshot({ path: `${OUT}/06-result-a.png`, fullPage: false });

// === Quiz test: 3 yes, 2 no → result-b ===
const quizPage2 = await browser.newPage();
await quizPage2.setViewport({ width: 1280, height: 800 });
await quizPage2.goto(URL, { waitUntil: 'networkidle0' });

await quizPage2.click('#q1-yes');
await quizPage2.click('#q2-yes');
await quizPage2.click('#q3-yes');
await quizPage2.click('#q4-no');
await quizPage2.click('#q5-no');
await quizPage2.click('.btn-submit');
await new Promise(r => setTimeout(r, 500));
await quizPage2.evaluate(() => {
  document.getElementById('result').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await quizPage2.screenshot({ path: `${OUT}/07-result-b.png`, fullPage: false });

// === Quiz test: 1 yes → result-c ===
const quizPage3 = await browser.newPage();
await quizPage3.setViewport({ width: 1280, height: 800 });
await quizPage3.goto(URL, { waitUntil: 'networkidle0' });

await quizPage3.click('#q1-yes');
await quizPage3.click('#q2-no');
await quizPage3.click('#q3-some');
await quizPage3.click('#q4-no');
await quizPage3.click('#q5-some');
await quizPage3.click('.btn-submit');
await new Promise(r => setTimeout(r, 500));
await quizPage3.evaluate(() => {
  document.getElementById('result').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await quizPage3.screenshot({ path: `${OUT}/08-result-c.png`, fullPage: false });

// === Quiz test: 0 yes → result-d ===
const quizPage4 = await browser.newPage();
await quizPage4.setViewport({ width: 1280, height: 800 });
await quizPage4.goto(URL, { waitUntil: 'networkidle0' });

await quizPage4.click('#q1-no');
await quizPage4.click('#q2-some');
await quizPage4.click('#q3-no');
await quizPage4.click('#q4-some');
await quizPage4.click('#q5-no');
await quizPage4.click('.btn-submit');
await new Promise(r => setTimeout(r, 500));
await quizPage4.evaluate(() => {
  document.getElementById('result').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await quizPage4.screenshot({ path: `${OUT}/09-result-d.png`, fullPage: false });

// === Trouble & Message sections (desktop) ===
const sectionPage = await browser.newPage();
await sectionPage.setViewport({ width: 1280, height: 800 });
await sectionPage.goto(URL, { waitUntil: 'networkidle0' });

await sectionPage.evaluate(() => {
  document.getElementById('trouble').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await sectionPage.screenshot({ path: `${OUT}/10-trouble-section.png`, fullPage: false });

await sectionPage.evaluate(() => {
  document.getElementById('message').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await sectionPage.screenshot({ path: `${OUT}/11-message-section.png`, fullPage: false });

// === Footer ===
await sectionPage.evaluate(() => {
  document.querySelector('.footer').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await sectionPage.screenshot({ path: `${OUT}/12-footer.png`, fullPage: false });

// === Mobile: trouble & message ===
const mobileSections = await browser.newPage();
await mobileSections.setViewport({ width: 375, height: 812 });
await mobileSections.goto(URL, { waitUntil: 'networkidle0' });

await mobileSections.evaluate(() => {
  document.getElementById('trouble').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await mobileSections.screenshot({ path: `${OUT}/13-mobile-trouble.png`, fullPage: false });

await mobileSections.evaluate(() => {
  document.getElementById('message').scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 300));
await mobileSections.screenshot({ path: `${OUT}/14-mobile-message.png`, fullPage: false });

await browser.close();
console.log('All screenshots saved to', OUT);
