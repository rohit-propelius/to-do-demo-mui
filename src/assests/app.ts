export const filterFun = (arr: any[], findVal: any) => {
  let filter = arr.filter((val: string) => {
    let regEx = new RegExp(`${findVal}`, "gi");
    let matchVal = val.match(regEx);
    if (!!matchVal) return val;
  });
  return filter;
};
