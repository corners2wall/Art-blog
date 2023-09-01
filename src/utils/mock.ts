export default function mock(time: number, passedValue = {}, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) resolve(passedValue);

      reject({ message: 'Error' });
    }, time);
  });
}
