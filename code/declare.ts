// 1. 给出外部属性的类型描述
declare let x: number
x = 123

document.title = 'hello'

// 只是用来给出类型描述 不能设置初始值
// declare let y:number = 1;

// 2. 给外部函数添加类型描述
declare function sayHello(
  name:string
):void;

sayHello('张三');

// 下列例子 myLib为外部库 没有类型描述时就会报错找不到 添加类型描述后就没有报错了
let result = myLib.makeGreeting('你好');
console.log('欢迎词：' + result);
let count = myLib.numberOfGreetings;
// 添加类型描述为
declare namespace myLib {
  function makeGreeting(name:string):string;
  let numberOfGreetings:number;
}

// 3. 可以在一个模块中 对另一个模块的接口类型进行扩展
// a.ts
export interface A {
  x: number;
}
// b.ts
// import { A } from './a';
// declare module './a' {
//   interface A {
//     y: number;
//   }
// }
// const a:A = { x: 0, y: 0 };

// 4. 为js引擎的原生对象添加属性和方法
export {};
declare global {
  interface String {
    toSmallString(): string;
  }
}
String.prototype.toSmallString = ():string => {
  // 具体实现
  return '';
};
