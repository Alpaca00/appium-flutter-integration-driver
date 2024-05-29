import { browser } from '@wdio/globals';

export async function flutterWaitForVisible(
  this: WebdriverIO.Browser,
  ...args: any
) {
  return await browser.executeScript('flutter: waitFor', [...args]);
}

export async function flutterWaitForAbsent(
  this: WebdriverIO.Browser,
  ...args: any
) {
  return await browser.executeScript('flutter: waitForAbsent', [...args]);
}
