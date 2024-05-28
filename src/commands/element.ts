import { log } from '../logger';
import _ from 'lodash';
import { getProxyDriver } from '../utils';
const elements = new Map();
export async function findElOrEls(
  strategy: string,
  selector: string,
  mult: boolean,
  context: string,
): Promise<any> {
  log.info('Finding element or elements', strategy, selector, mult, context);
  const driver = await getProxyDriver(strategy, this.proxy, this.proxydriver);
  console.log('Driver', driver);
  if (mult) {
    return await driver.command('/elements', 'POST', {
      strategy,
      selector,
    });
  } else {
    const element = await driver.command('/element', 'POST', {
      strategy,
      selector,
    });
    elements.set(element.ELEMENT, driver);
    return element;
  }
}

export async function click(element: string) {
  const driver = elements.get(element);
  return await driver.command(`/element/${element}/click`, 'POST', {
    element,
  });
}

export async function getText(elementId) {
  const driver = elements.get(elementId);
  return String(await driver.command(`/element/${elementId}/text`, 'GET', {}));
}

export async function elementEnabled(elementId) {
  return toBool(await this.getAttribute('enabled', elementId));
}

export async function getAttribute(attribute: string, elementId: string) {
  const driver = elements.get(elementId);
  return await driver.command(
    `/element/${elementId}/attribute/${attribute}`,
    'GET',
    {},
  );
}

export async function elementDisplayed(elementId: string) {
  return await this.getAttribute('displayed', elementId);
}

function toBool(s) {
  return _.isString(s) ? s.toLowerCase() === 'true' : !!s;
}
