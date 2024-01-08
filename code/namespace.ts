namespace Utils {
  function isString(value:any) {
    return typeof value === 'string';
  }
  // 外部使用加上export
  export function log(msg:string) {
    console.log(msg);
  }
  export function error(msg:string) {
    console.error(msg);
  }
  // 正确
  isString('yes');
}
// Utils.isString('no'); // 报错

Utils.log('hello');
Utils.error('hello');

// 导入外部成员
namespace App {
  import isString = Utils.log;
  isString('yes');
  // 等同于
  Utils.log('yes');
}

namespace Shapes {
  export namespace Polygons{
    export class Triangle {}
    export class Square {}
  }
}

import polygons = Shapes.Polygons;
const sq = new polygons.Square(); // 等同于 new Shapes.Polygons.Square(); 

// 也可以输出类型
namespace N {
  export interface MyInterface{}
  export class MyClass{}
}

// 本身也支持使用export导出 供其它文件使用
export namespace Shapes1 {
  export class Triangle {
    // ...
  }
  export class Square {
    // ...
  }
}
// 其它文件使用import导入
// 写法一
// import { Shapes1 } from './shapes';
let t = new Shapes1.Triangle()
// 写法二
// import * as shapes from './shapes';
// let t2 = new shapes.Shapes1.Triangle()

// 同名namespace合并
namespace Animals {
  export class Cat {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// 等同于
// namespace Animals {
//   export interface Legged {
//     numberOfLegs: number;
//   }
//   export class Cat {}
//   export class Dog {}
// }

// 非export成员只能在自己的namespace中使用 不会进行合并
namespace N {
  const a = 0;

  export function foo() {
    console.log(a);  // 正确
  }
}
namespace N {
  export function bar() {
    foo(); // 正确
    // console.log(a);  // 报错
  }
}

// namespace与同名函数合并 相当于给函数添加额外的属性
function f() {
  return f.version;
}
namespace f {
  export const version = '1.0';
}
f()   // '1.0'
f.version // '1.0'

// namespace与同名class合并
class C {
  foo = 1;
}
namespace C {
  export const bar = 2;
}
C.bar // 2

// namespace与同名enum合并 enum成员与namespace导出成员不允许同名
enum E {
  A,
  B,
  C,
}
namespace E {
  export function foo() {
    console.log(E.C);
  }
  // export const A = 'a' // 报错
}

E.foo() // 2
