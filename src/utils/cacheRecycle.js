const cacheRecycle = (cache, limit = 20) => {
  const caches = { ...cache };
  const keys = Object.keys(caches);
  if (keys.length > limit) {
    let index;
    let temp = null;
    // first in first out
    keys.forEach((key) => {
      const { timestamp } = caches[key];
      if (timestamp < temp || temp == null) {
        index = key;
        temp = timestamp;
      }
    });
    delete caches[index];
  }
  return caches;
};

export default cacheRecycle;
