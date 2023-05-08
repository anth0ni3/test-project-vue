import {ref, unref} from 'vue';

interface DragOptions {
  target: HTMLElement | Ref<HTMLElement | null> | null;
  constraint?: HTMLElement | null | string;
}

export function useDrag(options: DragOptions) {
  const {target, constraint = '#app'} = options;
  const wrapper =
    typeof unref(constraint) == 'object'
      ? // ? [(document, window)].includes(unref(constraint))
        unref(constraint)
      : // : document.querySelector(unref(constraint))
        document.querySelector(unref(constraint));

  //reactive values
  const elementRef = target;
  const parentRef = {
    value: wrapper,
  };
  const isDragging = ref(false);
  const initialX = ref(0);
  const initialY = ref(0);
  const xOffset = ref(0);
  const yOffset = ref(0);

  // if (!elementRef.value) return void 0;
  if (!parentRef.value || !elementRef.value) return;

  // Start dragging the element
  const startDrag = (event: MouseEvent) => {
    // console.log('startDrag');
    event.stopPropagation();

    isDragging.value = true;
    // console.log(elementRef.value);

    const elementRect = elementRef.value.getBoundingClientRect();

    initialX.value = event.clientX;
    initialY.value = event.clientY;
    xOffset.value = initialX.value - elementRect.left;
    yOffset.value = initialY.value - elementRect.top;
  };

  // Stop dragging the element
  const stopDrag = () => {
    // console.log('stopDrag');
    event.stopPropagation();

    isDragging.value = false;
  };

  // Drag the element
  const drag = (event: MouseEvent) => {
    event.stopPropagation();
    // console.log('drag');
    if (!isDragging.value) return;
    const parentRect = parentRef.value.getBoundingClientRect();
    const x = event.clientX - parentRect.left - xOffset.value;
    const y = event.clientY - parentRect.top - yOffset.value;
    if (
      x >= 0 &&
      y >= 0 &&
      x + elementRef.value.offsetWidth <= parentRect.width &&
      y + elementRef.value.offsetHeight <= parentRect.height
    ) {
      elementRef.value.style.position = 'absolute';
      elementRef.value.style.left = x + 'px';
      elementRef.value.style.top = y + 'px';
    }
  };

  // Set up event listeners
  elementRef.value.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
}
