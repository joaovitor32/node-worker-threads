const sleep = (delayTime: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delayTime);
  });
};

export { sleep };
