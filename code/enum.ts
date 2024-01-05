enum Color {
  Red,     // 0
  Green,   // 1
  Blue     // 2
}
// 等同于
enum Color1 {
  Red = 0,     // 0
  Green = 1,   // 1
  Blue = 2     // 2
}

let c = Color.Green; // 1
// 等同于
// let c = Color['Green']; // 1

// 替代写法
const Color2 = {
  Red: 0,
  Green: 1,
  Blue: 2,
} as const;

// 设定一个值 后续的自动递增
enum Color3 {
  Red = 7,
  Green,  // 8
  Blue   // 9
}
enum Color4 {
  Red, // 0
  Green = 7,
  Blue // 8
}

// 成员值都是只读的
// Color.Red = 4;

// 同名enum合并
enum Foo {
  A,
}
enum Foo {
  B = 1,
}
enum Foo {
  C = 2,
}
// 等同于
// enum Foo {
//   A,
//   B = 1,
//   C = 2
// }

// 不能有同名成员
enum Foo1 {
  A,
  B
}

enum Foo1 {
  B = 1, // 报错
  C
}

// 所有定义必须同为const枚举或者非const枚举 不允许混合使用
// 正确
enum E {
  A,
}
enum E {
  B = 1,
}

// 正确
// const enum E {
//   A,
// }
// const enum E {
//   B = 1,
// }

// 报错
// enum E {
//   A,
// }
// const enum E {
//   B = 1,
// }

// 字符串enum
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

// 字符串类型成员值不可使用表达式赋值
// enum MyEnum {
//   A = 'one',
//   B = ['T', 'w', 'o'].join('') // 报错
// }


enum MyEnum {
  A = 'a',
  B = 'b'
}

// 'A'|'B'
type Foo2 = keyof typeof MyEnum;

enum MyEnum1 {
  A = 'a',
  B = 'b'
}

// { a: any, b: any }
type Foo3 = { [key in MyEnum1]: any };

// 反向映射 可以通过成员值取出成员名
enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
console.log(Weekdays[3]) // Wednesday