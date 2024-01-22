// 1. // @ts-nocheck 告诉编译器不对当前脚本进行类型检查
// // @ts-nocheck
// const element = document.getElementById(123);

// 2. // @ts-check 如果js脚本顶部添加了 那么编译器将对该脚本进行类型检查 不论是否启用了checkJs编译选项
// // @ts-check
// let isChecked = true;
// console.log(isChceked); // 报错

// 3. // @ts-ignore 告诉编译器不对下一行代码进行类型检查
let x: number;
x = 0;
// // @ts-ignore
// x = false; // 不报错

// 4. // @ts-expect-error 当下一行有类型错误时 不显示报错信息 把错误交给代码自己处理
// function doStuff(abc: string, xyz: string) {
//   assert(typeof abc === "string");
//   assert(typeof xyz === "string");
//   // do some stuff
// }
// expect(() => {
//   // @ts-expect-error
//   doStuff(123, 456);
// }).toThrow();
// 下一行没有类型错误时 提示没有用到
// // @ts-expect-error
// console.log(1 + 1);

// 5. JSDoc
// 5.1 @typedef 创建自定义类型 等同于 TS 中的类型别名
/**
 * @typedef {(number | string)} NumberLike
 */
// 等同于
type NumberLike = string | number;
// 5.2 @type 定义变量的类型
/**
 * @type {string}
 */
let a;

/**
 * @typedef {(number | string)} NumberLike
 */

/**
 * @type {NumberLike}
 */
let b = 0;
// 允许使用ts类型及其语法
/**@type {true | false} */
let a1;

/** @type {number[]} */
let b1;

/** @type {Array<number>} */
let c;

/** @type {{ readonly x: number, y?: string }} */
let d;

/** @type {(s: string, b: boolean) => number} */
let e;
// 5.3 @param 用于定义函数参数的类型
/**
 * @param {string}  x
 */
function foo(x) {}
// 可选参数要放到[]中
/**
 * @param {string}  [x]
 */
function foo1(x) {}
// 5.4 @return和@returns命令的作用相同 指定函数返回值的类型
/**
 * @return {boolean}
 */
function foo2() {
  return true;
}

/**
 * @returns {number}
 */
function bar() {
  return 0;
}
// 5.5 @extends 和类型修饰符
// 5.5.1 @extends命令用于定义继承的基类
/**
 * @extends {Base}
 */
// class Derived extends Base {}
// 5.5.2 @public、@protected、@private分别指定类的公开成员、保护成员和私有成员 @readonly指定只读成员
class Base {
  /**
   * @public
   * @readonly
   */
  x = 0;

  /**
   *  @protected
   */
  y = 0;
}
