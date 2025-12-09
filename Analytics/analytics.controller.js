function track(id) {
  // console.log('tracking begins right here');
  const body = document.getElementById(id);
  addEventListener('click', (e) => {
    // console.log(e.target.tagName);
    console.log('clicked :' + e.target.innerText);
  });
}
export default { track };
