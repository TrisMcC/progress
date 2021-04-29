const TIMEOUT = 10;

// Place to put progress bars
const container = document.getElementById("bars");

// Simple template of progress bar
const template = document.getElementById("bar-template");

let advancing = false;

// Progress bar queue
const bars = [];

function advance(bar) {
  advancing = true;
  bar.value += 0.01;
  if (bar.value !== 1) {
    setTimeout(() => advance(bar), TIMEOUT);
  } else if (bars.length) {
    bar = bars.shift();
    setTimeout(() => advance(bar), TIMEOUT);
  } else {
    advancing = false;
  }
}

function go() {
  if (advancing) {
    // Progress is being made
    return;
  }

  // LET'S GOOOOOOOOOOO
  advancing = true;
  const bar = bars.shift();
  if (bar) {
    setTimeout(() => advance(bar), TIMEOUT);
  }
}

document.getElementById("add").addEventListener("click", () => {
  const progress = template.content.cloneNode(true);
  const bar = progress.querySelector("progress");
  bars.push(bar);
  container.appendChild(progress);
  go();
});
