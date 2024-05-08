export function getRandomNumber(min: number, max: number, float: boolean = false) {
  let num = Math.random() * (max - min) + min;

  if (float) {
    num = Number(num.toFixed(2));
  } else {
    num = Math.floor(num);
  }

  return num;
}
