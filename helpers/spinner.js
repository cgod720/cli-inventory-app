const inquirer = require('inquirer');
const spinners = require('cli-spinners');

function startLoadingAnimation() {
  const spinner = spinners.dots12 // Choose a spinner style from cli-spinners
  let i = 0;

  // Function to update spinner animation
  const updateSpinner = () => {
    process.stdout.write('\r' + spinner.frames[i] + ' Loading...🛹');
    i = (i + 1) % spinner.frames.length;
  };

  // Start the spinner animation
  const spinnerInterval = setInterval(updateSpinner, spinner.interval);

  // Return a function to stop the spinner animation
  return function stopLoadingAnimation() {
    clearInterval(spinnerInterval);
    process.stdout.write('\r'); // Clear the current line
  };
}

const spinnerDelay = (clearSpinner, func, arg) => {
    setTimeout(() => {
      clearSpinner()
      func(arg)
    }, 1200)
}




module.exports = { startLoadingAnimation, spinnerDelay }
