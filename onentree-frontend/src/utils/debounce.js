export default function debounce(callback, timeout = 500) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

