const hashCode = (string) => {
  let hash = 0; let i; let
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i += 1) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

export default hashCode;
