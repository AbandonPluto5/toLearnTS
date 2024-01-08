// /// <reference path="./interfaces.d.ts" />
// /// <reference path="./functions.d.ts" />
// ///三斜杠命令可以加载其它类型声明文件 只能在文件的头部
// main.d.ts文件

// const maxInterval = 12;
// function getArrayLength(arr) {
//   return arr.length;
// }
// module.exports = {
//   getArrayLength,
//   maxInterval,
// };
// 上述模块类型声明文件可以写成下列
// export function getArrayLength(arr: any[]): number;
// export const maxInterval: 12;

