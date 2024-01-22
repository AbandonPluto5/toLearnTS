// 1. Awaited<Type> 返回Promise的返回值类型
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
// 类型参数不是Promise类型 就返回原样
type C = Awaited<boolean | Promise<number>>; // number|boolean
// Awaited<Type>的实现如下
// type Awaited<T> =
//   T extends null | undefined ? T :
//   T extends object & {
//     then(
//       onfulfilled: infer F,
//       ...args: infer _
//     ): any;
//   } ? F extends (
//     value: infer V,
//     ...args: infer _
//   ) => any ? Awaited<...> : never:
//   T;

// 2. ConstructorParameters<Type> 提取构造函数Type的参数类型 组成一个元组类型返回
type T1 = ConstructorParameters<new (x: string, y: number) => object>; // [x: string, y: number]
type T2 = ConstructorParameters<new (x?: string) => object>; // [x?: string | undefined]
// 可以返回一些内置构造方法的参数类型
type T3 = ConstructorParameters<ErrorConstructor>; // [message?: string ｜ undefined]
type T4 = ConstructorParameters<FunctionConstructor>; // string[]
type T5 = ConstructorParameters<RegExpConstructor>; // [pattern:string|RegExp, flags?:string|undefined]
// 参数类型不是构造方法 则报错
// type T6 = ConstructorParameters<string>; // 报错
// type T7 = ConstructorParameters<Function>; // 报错
// 参数如果是any 则返回unknown[]
type T8 = ConstructorParameters<any>; // unknown[]
// 参数如果是never 则返回never
type T9 = ConstructorParameters<never>; // never
// ConstructorParameters<Type>的实现如下
// type ConstructorParameters<
//   T extends abstract new (...args: any) => any
// > = T extends abstract new (...args: infer P)
//   => any ? P : never

// 3. Exclude<UnionType, ExcludedMembers> 用来从联合类型UnionType里面 删除某些类型ExcludedMembers 组成一个新的类型返回
type T10 = Exclude<"a" | "b" | "c", "a">; // 'b'|'c'
type T11 = Exclude<"a" | "b" | "c", "a" | "b">; // 'c'
type T12 = Exclude<string | (() => void), Function>; // string
type T13 = Exclude<string | string[], any[]>; // string
type T14 = Exclude<(() => void) | null, Function>; // null
type T15 = Exclude<200 | 400, 200 | 201>; // 400
type T16 = Exclude<number, boolean>; // number
// Exclude<UnionType, ExcludedMembers>的实现如下
// type Exclude<T, U> = T extends U ? never : T;

// 4. Extract<Type, Union> 用来从联合类型UnionType之中 提取指定类型Union 组成一个新类型返回
type T17 = Extract<"a" | "b" | "c", "a">; // 'a'
type T18 = Extract<"a" | "b" | "c", "a" | "b">; // 'a'|'b'
type T19 = Extract<"a" | "b" | "c", "a" | "d">; // 'a'
type T20 = Extract<string | string[], any[]>; // string[]
type T21 = Extract<(() => void) | null, Function>; // () => void
type T22 = Extract<200 | 400, 200 | 201>; // 200
// 如果参数类型不包含在联合类型中 则返回never类型
type T23 = Extract<string | number, boolean>; // never
// Extract<UnionType, Union>的实现如下
// type Extract<T, U> = T extends U ? T : never;

// 5. InstanceType<Type> 返回构造函数的实例类型
type T24 = InstanceType<new () => object>; // object
type A1 = InstanceType<ErrorConstructor>; // Error
type B1 = InstanceType<FunctionConstructor>; // Function
type C1 = InstanceType<RegExpConstructor>; // RegExp
// 由于class作为类型时表示的是实例类型 要获取它的构造方法必须把它当成值 用typeof获取它的构造方法类型
class C2 {
  x = 0;
  y = 0;
}
type T25 = InstanceType<typeof C2>; // C2
// 如果类型参数不是构造方法 就会报错
// type T26 = InstanceType<string>; // 报错
// type T27 = InstanceType<Function>; // 报错
// 如果类型参数是any或never两个特殊值，分别返回any和never
type T26 = InstanceType<any>; // any
type T27 = InstanceType<never>; // never
// InstanceType<Type>的实现如下
// type InstanceType<T extends abstract new (...args: any) => any> =
//   T extends abstract new (...args: any) => infer R ? R : any;

// 6. NonNullable<Type>用来从联合类型Type删除null类型和undefined类型
type T28 = NonNullable<string | number | undefined>; // string|number
type T29 = NonNullable<string[] | null | undefined>; // string[]
type T30 = NonNullable<boolean>; // boolean
type T31 = NonNullable<number | null>; // number
type T32 = NonNullable<string | undefined>; // string
type T33 = NonNullable<null | undefined>; // never
// NonNullable<Type>的实现如下
// type NonNullable<T> = T & {};

// 7. Omit<Type, Keys> 用来从对象类型中删除指定的属性 返回一个新的对象类型
interface A2 {
  x: number;
  y: number;
}
type T34 = Omit<A, "x">; // { y: number }
type T35 = Omit<A, "y">; // { x: number }
type T36 = Omit<A, "x" | "y">; // { }
// 指定删除的键名可以是对象类型中不存在的属性 但必须兼容string|number|symbol
interface A3 {
  x: number;
  y: number;
}
type T37 = Omit<A3, "z">; // { x: number; y: number }
// Omit<Type, Keys>的实现如下
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 8. OmitThisParameter<Type> 从函数类型中移除this参数
function toHex(this: Number) {
  return this.toString(16);
}
type T38 = OmitThisParameter<typeof toHex>; // () => string
// OmitThisParameter<Type>的实现如下
// type OmitThisParameter<T> = unknown extends ThisParameterType<T>
//   ? T
//   : T extends (...args: infer A) => infer R
//   ? (...args: A) => R
//   : T;

// 9. Parameters<Type>从函数类型Type里面提取参数类型，组成一个元组返回
type T39 = Parameters<() => string>; // []
type T40 = Parameters<(s: string) => void>; // [s:string]
type T41 = Parameters<<T>(arg: T) => T>; // [arg: unknown]
type T42 = Parameters<(x: { a: number; b: string }) => void>; // [x: { a: number, b: string }]
type T43 = Parameters<(a: number, b: number) => number>; // [a:number, b:number]
// 如果参数不是带有参数的函数 就会报错
// type T44 = Parameters<string>; // 报错
// type T45 = Parameters<Function>; // 报错
// 由于any和never是两个特殊值，会返回unknown[]和never
type T44 = Parameters<any>; // unknown[]
type T45 = Parameters<never>; // never
// 示例 模块只导出了getGift() 没有导出SecretName和SecretSanta 这时就可以使用Parameters<T>和ReturnType<T>拿到这两个接口
// interface SecretName {
//   first: string;
//   last: string;
// }
// interface SecretSanta {
//   name: SecretName;
//   gift: string;
// }
// export function getGift(
//   name: SecretName,
//   gift: string
// ): SecretSanta {
//  // ...
// }
// type T46 = Parameters<typeof getGift>[0]; // SecretName
// type T47 = ReturnType<typeof getGift>; // SecretSanta
// Parameters<Type>的实现如下
// type Parameters<T extends (...args: any) => any> = T extends (
//   ...args: infer P
// ) => any
//   ? P
//   : never;

// 10. Partial<Type> 将类型参数 Type 的所有属性变为可选属性 返回一个新属性
interface A2 {
  x: number;
  y: number;
}
type T48 = Partial<A2>; // { x?: number | undefined; y?: number | undefined; }
// Partial<Type>的实现如下
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// 11. Pick<Type, Keys> 会从对象类型中提取出指定的键名 返回一个新的对象类型
interface A3 {
  x: number;
  y: number;
}
type T49 = Pick<A3, "x">; // { x: number }
type T50 = Pick<A3, "y">; // { y: number }
type T51 = Pick<A3, "x" | "y">; // { x: number; y: number }
// 必须是对象类型中存在的键名 否则会报错
// type T52 = Pick<A3, 'z'>; // 报错
// Pick<Type, Keys>的实现如下
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// 12. Readonly<Type> 将类型参数 Type 的所有属性变为只读属性 返回一个新类型
interface A4 {
  x: number;
  y?: number;
}
type T53 = Readonly<A4>; // { readonly x: number; readonly y?: number; }
// Readonly<Type>的实现如下
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };
// Readonly<Type>可以与Partial<Type>结合使用 将所有属性变成只读的可选属性
interface Person {
  name: string;
  age: number;
}
const worker: Readonly<Partial<Person>> = { name: "张三" };
// worker.name = "李四"; // 无法为“name”赋值，因为它是只读属性

// 13. Record<Keys, Type> 返回一个对象类型 参数Keys是键名 Type是键值类型
type T54 = Record<"a", string>; // { a: string }
// 参数 Keys 如果是联合类型 则会依次展开为多个键名
type T55 = Record<"a" | "b", number>; // { a: number; b: number; }
// 如果参数 Type 是联合类型 则表明键值是联合类型
type T56 = Record<"a", number | string>; // { a: number | string }
// Record<Keys, Type>的实现如下
// type Record<K extends string | number | symbol, T> = { [P in K]: T };

// 14. Required<Type> 返回一个新类型 将参数类型Type的所有属性变为必选属性
interface A5 {
  x?: number;
  y: number;
}
type T57 = Required<A5>; // { x: number; y: number; }
// Required<Type>的实现如下
// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };

// 15. ReadonlyArray<Type> 用来生成一个只读数组类型
const values: ReadonlyArray<string> = ["a", "b", "c"];
// values[0] = 'x'; // 报错
// values.push('x'); // 报错
// values.pop(); // 报错
// values.splice(1, 1); // 报错
// ReadonlyArray<Type>的实现如下
interface ReadonlyArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  // ...
}

// 16. ReturnType<Type> 返回一个函数类型 Type 的返回值类型
type T58 = ReturnType<() => string>; // string
type T59 = ReturnType<
  () => {
    a: string;
    b: number;
  }
>; // { a: string; b: number }
type T60 = ReturnType<(s: string) => void>; // void
type T61 = ReturnType<() => () => any[]>; // () => any[]
type T62 = ReturnType<typeof Math.random>; // number
type T63 = ReturnType<typeof Array.isArray>; // boolean
// 如果参数类型是泛型函数 返回值取决于泛型类型 如果泛型不带有限制条件 就会返回unknown
type T64 = ReturnType<<T>() => T>; // unknown
type T65 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
// 如果类型参数是泛型函数 返回值取决于泛型 如果泛型不带限制条件 则返回 unknown
type T66 = ReturnType<<T>() => T>; // unknown
type T67 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
// 如果类型不是函数 会报错
// type T68 = ReturnType<boolean>; // 报错
// type T69 = ReturnType<Function>; // 报错
// any和never是两个特殊值 分别返回any和never
type T70 = ReturnType<any>; // any
type T71 = ReturnType<never>; // never
// ReturnType<Type>的实现如下
// type ReturnType<T extends (...args: any) => any> = T extends (
//   ...args: any
// ) => infer R
//   ? R
//   : any;

// 17. ThisParameterType<Type>提取函数类型中this参数的类型
function toHex1(this: number) {
  return this.toString(16);
}
type T72 = ThisParameterType<typeof toHex>; // number
// ThisParameterType<Type>的实现如下
// type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
//   ? U
//   : unknown;

// 18. ThisType<Type> 用来和其它类型组成交叉类型 提示ts其它类型里面的this的类型 使用时必须打开noImplicitThis设置
// 示例一
interface HelperThisValue {
  logError: (error: string) => void;
}
let helperFunctions: { [name: string]: Function } & ThisType<HelperThisValue> =
  {
    hello: function () {
      this.logError("Error: Something wrong!"); // 正确
      this.update(); // 报错
    },
  };
// 示例二
let obj: ThisType<{ x: number }> & { getX: () => number };
obj = {
  getX() {
    return this.x + this.y; // 报错
  },
};
// ThisType<Type>的实现就是一个空接口
interface ThisType<T> {}

// 19. 针对字符串的类型工具
// 19.1 Uppercase<StringType> 将字符串类型的每个字符转为大写
type A6 = "hello";
type B2 = Uppercase<A>; // "HELLO"
// 19.2 Lowercase<StringType> 将字符串类型的每个字符转为小写
type A7 = "HELLO";
type B3 = Lowercase<A>; // "hello"
// 19.3 Capitalize<StringType> 将字符串的第一个字符转为大写
type A8 = "hello";
type B4 = Capitalize<A>; // "Hello"
// 19.4 Uncapitalize<StringType> 将字符串的第一个字符转为小写
type A9 = "HELLO";
type B5 = Uncapitalize<A>; // "hELLO"
