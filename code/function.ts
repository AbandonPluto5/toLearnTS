const hello = function (txt:string) {
  console.log('hello ' + txt);
}

const hello1:
  (txt:string) => void
= function (txt) {
  console.log('hello ' + txt);
};

// 1. 参数名必须写
type MyFunc = (string, number) => number; // type MyFunc = (string: any, number: any) => number

// 2. 函数实际参数个数可以少于类型指定的个数 但是不能多于
let myFunc:
  (a:number, b:number) => number;
myFunc = (a:number) => a; // 正确
myFunc = (
  a:number, b:number, c:number
) => a + b + c; // 报错

// 3. 函数x只有一个参数，函数y有两个参数，x可以赋值给y，反过来就不行。
let x = (a:number) => 0;
let y = (b:number, s:string) => 0;

y = x; // 正确
x = y; // 报错

// 4. 套用另一个函数类型使用typeof 因为原函数不是类型而是一个值
function add(x: number, y: number): number {
  return x + y;
}
const myAdd:typeof add = function(x,y){
  return x + y
}
myAdd('add','blue') // 类型“string”的参数不能赋给类型“number”的参数。

// 5. 采用对象写法
let add1: {
  (x:number, y:number):number
}

add1 = function (x,y) {
  return x + y
}
// 函数本身存在属性 就可以使用对象写法
function fn(x:number) {
  console.log(x);
}
fn.version = '1.0'; 

let foo: {
  (x:number): void,
  version: string
} = fn

// 6. 采用interface写法
interface MyFunc1 {
  (a:number, b:number): number;
}

let add2: MyFunc1 = (a, b) => a + b;

// 7. Function类型
function doSomething(f:Function) {
  return f(1, 2, 3);
}

// 8. 可选参数
function f(x?:number) {
  // ...
}
f(); // OK
f(10); // OK

// 必选参数不能位于可选参数后
let myFunc2:(a?:number, b:number) => number; // 报错
let myFunc3:(a:number | undefined, b:number) => number;

// 默认值 和js一致
function createPoint(
  x:number = 0,
  y:number = 0
):[number, number] {
  return [x, y];
}

createPoint() // [0, 0]

// 可选参数和默认值不能同时使用
// 报错
function f(x?: number = 0) {
  // ...
}

// 设有默认值的参数 如果传入undefined 也会触发默认值
function f2(x = 456) {
  return x;
}

f2(undefined) // 456

// 只读参数
function f3(arr: readonly number[]) {
  arr[0] = 1 // 类型“readonly number[]”中的索引签名仅允许读取
}
f3([])

// 9. void表示函数没有返回值 但是可以返回undefined和null 开启strictNullChecks时返回null会报错
function f4(x: number):void {
  // return x // 不能将类型“number”分配给类型“void”
  // return undefined
  // return null // 开启strictNullChecks就会报错
  return
}

// 如果是作为变量、对象方法、函数参数的函数返回值是void 则可以返回任意值不报错 但是如果要使用返回值就会报错
type voidFunc = () => void;
const f5:voidFunc = () => {
  return 123;
};
f5() * 2 // 报错

let obj: {
  fn5:() => void
} = {
  fn5:function () {
    return 123
  }
} 

function myFunc4(fn: () => void){}
myFunc4(function fn(){return 123})


// 10. never返回值 函数不会正常执行结束时才是never类型返回值
// 抛出异常
function fail(msg:string):never {
  throw new Error(msg);
}
// 如果直接返回 则不是never类型
function fail1(msg:string):Error {
  return new Error(msg);
}

// 无限执行的函数 返回值类型never
const sing = function():never {
  while (true) {
    console.log('sing');
  }
};

// 11. 函数重载 可以用来对应参数和返回值 
function add3(
  x:number,
  y:number
):number;
function add3(
  x:any[],
  y:any[]
):any[];
function add3(
  x:number|any[],
  y:number|any[]
):number|any[] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else if (Array.isArray(x) && Array.isArray(y)) {
    return [...x, ...y];
  }

  throw new Error('wrong parameters');
}

// 12. 构造函数 用new关键字
class Animal {
  numLegs: number = 4;
}
type AnimalConstructor = new () => Animal;
function create(c:AnimalConstructor): Animal {
  return new c()
}
const a = create(Animal);

// 13. 使用对象方法定义构造函数类型 既可以当普通函数 又可以当构造函数
type F = {
  new (s:string): object;
  (n?:number): number;
}