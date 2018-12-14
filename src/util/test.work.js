var count = 0;
function tick() {
  count++;
  postMessage(count);
}
tick();