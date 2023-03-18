let isSelectingGPT4 = false;

function getElementByXPath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function clickDropdownMenu() {
  const dropdownMenuXPath = '//button[contains(., "Default (GPT-3.5)")]';
  const dropdownMenuElement = getElementByXPath(dropdownMenuXPath);

  if (dropdownMenuElement) {
    dropdownMenuElement.click();
    return true;
  }
  return false;
}

function clickGPT4Element() {
  const gpt4ElementXPath = '//li[contains(., "GPT-4")]';
  const gpt4Element = getElementByXPath(gpt4ElementXPath);

  if (gpt4Element) {
    gpt4Element.click();
    return true;
  }
  return false;
}

function triggerGPT4Selection() {
  if (isSelectingGPT4) {
    return;
  }

  isSelectingGPT4 = true;

  // Attempt to click the dropdown menu every 50 milliseconds until successful
  const dropdownIntervalId = setInterval(() => {
    if (clickDropdownMenu()) {
      clearInterval(dropdownIntervalId);

      // Attempt to click the GPT-4 element every 50 milliseconds until successful, starting after a 50-millisecond delay
      setTimeout(() => {
        const gpt4IntervalId = setInterval(() => {
          if (clickGPT4Element()) {
            clearInterval(gpt4IntervalId);
            isSelectingGPT4 = false;
          }
        }, 50);
      }, 50);
    }
  }, 50);
}

function checkGPT4Selected() {
  const selectedOptionXPath = '//button[contains(., "Default (GPT-3.5)")]';
  const selectedOptionElement = getElementByXPath(selectedOptionXPath);
  if (selectedOptionElement) {
    triggerGPT4Selection();
  }
}

// Periodically check if GPT-4 is selected and trigger the selection process if necessary
setInterval(checkGPT4Selected, 500);
