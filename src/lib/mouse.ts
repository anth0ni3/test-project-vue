interface Options {
  constraint: string | null;
}

export function mousedown(e: MouseEvent, element: HTMLElement | null, options: Options = {}) {
  const {constraint = window} = options;

  // get the drag contraint of the draggable
  const elementWrapper = typeof constraint == 'string' ? document.querySelector(constraint) : null;

  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e: MouseEvent) {
    // new x - where the mouse is now
    const newX = prevX - e.clientX;
    const newY = prevY - e.clientY;

    if (!element) return;

    //set style to absolute for dragging
    element.style.position = 'absolute';
    const rect = element.getBoundingClientRect();

    // //element Position
    // const elementPositionX = rect.left + window.pageXOffset;
    // const elementPositionY = rect.top + window.pageYOffset;

    // const elX = e.clientX - elementPositionX;
    // const elY = e.clientY - elementPositionY;
    // const isOutside =
    //   rect.width === 0 ||
    //   rect.height === 0 ||
    //   elX < 0 ||
    //   elY < 0 ||
    //   elX > rect.width ||
    //   elY > rect.height;

    // console.log({
    //   elX,
    //   elY,
    //   elementPositionX,
    //   elementPositionY,
    // });

    element.style.left = rect.left - newX + 'px';
    element.style.top = rect.top - newY + 'px';

    prevX = e.clientX;
    prevY = e.clientY;
  }
  function mouseup() {
    // remove event listener
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  }
}
