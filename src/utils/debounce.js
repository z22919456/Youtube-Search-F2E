function debounce(func, delay = 1000) {
  let timer = null;

  return (...args) => {
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export default debounce;
