document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById('display');

  document.querySelector('.calculator').addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON') {
          handleButtonClick(e.target.textContent);
      }
  });

  document.addEventListener('keydown', function (e) {
      const key = e.key;
      if (isDigitOrOperator(key) && !e.repeat) {
          e.preventDefault();
          handleButtonClick(key);
      } else if ((key === 'Enter' || key === '=') && !e.repeat) {
          e.preventDefault();
          handleEqual();
      } else if (key === 'Escape') {
          handleClear();
      } else if (key === 'Backspace' && !e.repeat) {
          handleBackspace();
      }
  });

  function isDigitOrOperator(char) {
      return /[\d+\-*/.]/.test(char);
  }

  function handleButtonClick(value) {
      if (value === '=') {
          handleEqual();
      } else if (value === 'C') {
          handleClear();
      } else {
          appendToDisplay(value);
      }
  }

  function handleEqual() {
      try {
          input.value = Function('"use strict";return (' + input.value + ')')();
      } catch (error) {
          input.value = 'Error';
      }
  }

  function handleClear() {
      clearDisplay();
  }

  function handleBackspace() {
      input.value = input.value.slice(0, -1);
  }

  function appendToDisplay(value) {
      input.value += value;
  }

  function clearDisplay() {
      input.value = '';
  }
});
