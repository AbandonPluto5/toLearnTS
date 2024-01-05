// type T = 'a'|'b'|'c';
// let foo = 'a';

// let bar:T = foo; // 报错 foo类型时string 是T的父类型 父类型不能赋值给子类型

type T = 'a'|'b'|'c';
let foo = 'a';
// 方式一
// let bar:T = foo as T; // 正确
// 方式二
let bar:T = <T>foo;

// as cosnt
// 报错
// let s = 'JavaScript';
// 正确
let s = 'JavaScript' as const
// s = 'a' // 报错 不能改值
type Lang =
  |'JavaScript'
  |'TypeScript'
  |'Python';
function setLang(language:Lang) {
  /* ... */
}
setLang(s); // 报错

// as const只能用于字面量
let s1 = 'JavaScript';
// let s2 = s1 as const; // 报错
// 也不能用于表达式
// let s2 = ('Java' + 'Script') as const; // 报错

// 用于整个对象和单个属性是不一样的
const v1 = {
  x: 1,
  y: 2,
}; // 类型是 { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
}; // 类型是 { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const; // 类型是 { readonly x: 1; readonly y: 2; }


// 非空断言
function f(x?:number|null) {
  validateNumber(x); // 自定义函数，确保 x 是数值
  console.log(x!.toFixed());
}
function validateNumber(e?:number|null) {
  if (typeof e !== 'number')
    throw new Error('Not a number');
}

const root = document.getElementById('root')!;
root.addEventListener('click', e => {
  /* ... */
});

class Point {
  x!:number; // 正确
  y!:number; // 正确

  constructor(x:number, y:number) {
    // ...
  }
}

// 断言函数
function isString(value:unknown):asserts value is string {
  if (typeof value !== 'string')
    throw new Error('Not a string');
}
function toUpper(x: string|number) {
  isString(x);
  return x.toUpperCase();
}