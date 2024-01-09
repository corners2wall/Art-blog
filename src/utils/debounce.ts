export function debounce(callback: (...args: any) => void, delay: number) {
  let timerId: NodeJS.Timeout | undefined = undefined;

  return (...args: any) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => callback(...args), delay);
  };
}
