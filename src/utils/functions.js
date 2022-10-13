export const nextFibonacci = (n) => {
  let a = (n * (1 + Math.sqrt(5))) / 2.0;
  return Math.round(a);
};
