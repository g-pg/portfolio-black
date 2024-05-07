let lastPos = 0;

export function scrollDirection(node: HTMLElement) {
  document.addEventListener('scroll', sendDirection);

  function sendDirection(e: any) {
    // console.log(e);

    node.dispatchEvent(new CustomEvent('direction', { detail: getDirection(e) }));
  }

  function getDirection(e: any) {
    // console.log(e);
    if (window.scrollY > lastPos) {
      lastPos = window.scrollY;
      return 'down';
    } else if (window.scrollY < lastPos) {
      lastPos = window.scrollY;
      return 'up';
    }

    console.log(lastPos);
  }

  // document.addEventListener('scroll',)
}
