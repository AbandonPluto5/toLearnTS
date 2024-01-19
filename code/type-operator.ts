// 1. keyof
type MyObj = {
  foo: number;
  bar: string;
};
type Keys = keyof MyObj; // 'foo'|'bar'

interface T {
  0: boolean;
  a: string;
  b(): void;
}
type KeyT = keyof T; // 0 | 'a' | 'b'

type KeyU = keyof any; // string | number | symbol

type KeyP = keyof object; // never

// 如果只需要联合类型中的其中一种类型 可以使用交叉类型的写法
// 以下要使用string类型 但是类型不兼容导致报错
type Capital<T extends string> = Capitalize<T>;
// type MyKeys<Obj extends object> = Capital<keyof Obj>; // 不能将类型“string | number | symbol”分配给类型“string”。
// 交叉类型解决
type MyKeys<Obj extends object> = Capital<string & keyof Obj>; // string & keyof Obj等同于string & string|number|symbol

// 如果对象属性是索引形式 返回属性名的索引类型
interface T1 {
  [prop: number]: number;
}
type KeyT1 = keyof T1; // number

interface T2 {
  [prop: string]: number;
}
type KeyT2 = keyof T2; // string|number

// 运用到数组或元组 则是返回数组所有的键名
type Result = keyof ["a", "b", "c"];

// 用于联合类型 返回成员共有的键名
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };
type KeyT3 = keyof (A | B); // 'z'

// 用于交叉类型 返回所有键名
type C = { a: string; z: boolean };
type D = { b: string; z: boolean };
type KeyT4 = keyof (C & D); // 'a' | 'b' | 'z'
// 相当于
// keyof (C & D) = keyof A | keyof B

// 题外：取出键值组成的联合类型
type MyObj1 = {
  foo: number;
  bar: string;
};
type Keys1 = keyof MyObj;
type Values = MyObj[Keys]; // number|string

// 用途: 精确表达对象的属性类型
// 以下写法 返回值只能是any 无法表示key和obj之间的关系
function prop(obj: { [p: string]: any }, key: string): any {
  return obj[key];
}
// 改写后 精确表达返回值类型
function prop1<Obj, K extends keyof Obj>(obj: Obj, key: K): Obj[K] {
  return obj[key];
}

// 用途: 用于属性映射
type NewProps<Obj> = {
  [Prop in keyof Obj]: boolean;
};
type MyObj2 = { foo: number };
// 等于 { foo: boolean; }
type NewObj = NewProps<MyObj2>;

// 去掉readonly修饰符
type Mutable<Obj> = {
  -readonly [Prop in keyof Obj]: Obj[Prop];
};
// 增加readonly修饰符
// type Mutable<Obj> = {
//   +readonly [Prop in keyof Obj]: Obj[Prop];
// };
type MyObj3 = {
  readonly foo: number;
};
// 等于 { foo: number; }
type NewObj1 = Mutable<MyObj3>;

// 让可选属性变成必有属性
type Concrete<Obj> = {
  [Prop in keyof Obj]-?: Obj[Prop];
};
// 必选变可选
// type Concrete<Obj> = {
//   [Prop in keyof Obj]+?: Obj[Prop];
// };
type MyObj4 = {
  foo?: number;
};
// 等于 { foo: number; }
type NewObj2 = Concrete<MyObj4>;

// 2. in
type U = "a" | "b" | "c";
type Foo = {
  [Prop in U]: number;
};
// 等同于
type Foo1 = {
  a: number;
  b: number;
  c: number;
};

// 3. []运算符
type Person = {
  age: number;
  name: string;
  alive: boolean;
};
// Age 的类型是 number
type Age = Person["age"];

// 如果参数是联合类型 则返回的也是联合类型
type Person1 = {
  age: number;
  name: string;
  alive: boolean;
};
type T3 = Person["age" | "name"]; // number | string
type A1 = Person[keyof Person]; // number | string | boolean

// 参数也可以是属性名的索引类型
type Obj = {
  [key: string]: number;
};
type T4 = Obj[string]; // number

// 适用于数组
// MyArray 的类型是 { [key:number]: string }
const MyArray = ["a", "b", "c"];
// 等同于 (typeof MyArray)[number]
// 返回 string
type Person2 = (typeof MyArray)[number];

// []中不能有值的运算
const key = "age";
// type Age1 = Person[key]; // 报错

// 示例二
// type Age2 = Person['a' + 'g' + 'e']; // 报错

// 4. extends...?: 条件运算符
type T5 = 1 extends number ? true : false; // true
// 如果需要判断的类型是联合类型 条件运算符就会展开这个联合类型
type TT = A | B extends U ? string : boolean;
// 等同于
type TT1 = (A extends U ? string : boolean) | (B extends U ? string : boolean);

// 如果不希望联合类型被展开 可以把extends两侧的操作书=数都放在[]中
// 示例一 会被展开为联合类型
type ToArray<Type> = Type extends any ? Type[] : never;
type T6 = ToArray<string | number>; // string[]|number[]
// 示例二 不会被展开为联合类型
type ToArray1<Type> = [Type] extends [any] ? Type[] : never;
type T7 = ToArray<string | number>; // (string | number)[]

// 也可以嵌套使用联合运算符
type LiteralTypeName<T> = T extends undefined
  ? "undefined"
  : T extends null
  ? "null"
  : T extends boolean
  ? "boolean"
  : T extends number
  ? "number"
  : T extends bigint
  ? "bigint"
  : T extends string
  ? "string"
  : never;
// "bigint"
type Result1 = LiteralTypeName<123n>;
// "string" | "number" | "boolean"
type Result2 = LiteralTypeName<true | 1 | "a">;

// 5. infer 用来定义泛型里面推断出来的类型参数 而不是外部传入的类型参数
// 以下表示 如果Type是一个数组 那么就将该数组的成员类型推断为Item 也就是说Item是从Type推断出来的 如果不是数组 就会推断为Type本身
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
// 使用
type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number
// 如果不用infer定义类型参数 就需要传入两个类型参数
type Flatten1<Type, Item> = Type extends Array<Item> ? Item : Type;

// 提取指定对象属性
type MyType<T> = T extends {
  a: infer A;
  b: infer B;
}
  ? [A, B]
  : never;
type T8 = MyType<{ a: string; b: boolean }>; // [string, number]

// 通过正则匹配提取类型参数
type Str1 = "foo-bar";
type Bar = Str1 extends `foo-${infer rest}` ? rest : never; // 'bar'

// 6. is
// 用于描述函数的返回值类型
type A2 = { a: string };
type B2 = { b: string };
function isTypeA(x: A | B): x is A {
  if ("a" in x) return true;
  return false;
}

// 用于类型保护
// function isCat(a: any): a is Cat {
//   return a.name === "kitty";
// }

// let x: Cat | Dog;

// if (isCat(x)) {
//   x.meow(); // 正确，因为 x 肯定是 Cat 类型
// }

// 描述类的方法的返回值
class Teacher {
  isStudent(): this is Student {
    return false;
  }
}
class Student {
  isStudent(): this is Student {
    return true;
  }
}

// 7. 模板字符串
type World = "world";
// "hello world"
type Greeting = `hello ${World}`;
// 引用类型只能为 string、number、bigint、boolean、null、undefined
// type Num = 123;
// type Obj = { n : 123 };
// type T1 = `${Num} received`; // 正确
// type T2 = `${Obj} received`; // 报错
// 如果引用的类型是联合类型 返回的也是联合类型
type T9 = "A" | "B";
// "A_id"|"B_id"
type U1 = `${T9}_id`;
// 如果引用的是两个联合类型 会交叉展开两个类型
type T10 = "A" | "B";
type U2 = "1" | "2";
// 'A1'|'A2'|'B1'|'B2'
type V = `${T10}${U2}`;

// 8. satisfies
// 示例一 常见写法 没有使用satisfies 使用字符串方法报错 因为会改变palette的类型推断
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];
const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255], // 报错
};
const greenComponent = palette.green.substring(1, 6); // 报错
// 示例二 使用satisfies
// 变量palette的值后面增加了satisfies Record<Colors, string|RGB>，表示该值必须满足Record<Colors, string|RGB>这个条件，所以能够检测出属性名bleu的拼写错误。同时，它不会改变palette的类型推断，所以，TypeScript 知道palette.green是一个字符串，对其调用substring()方法就不会报错。
type Colors1 = "red" | "green" | "blue";
type RGB1 = [number, number, number];
const palette1 = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255], // 报错
} satisfies Record<Colors, string | RGB>;
const greenComponent1 = palette1.green.substring(1); // 不报错

// satisfies可以检测属性值 属性blue的值只有两个成员，不符合元组RGB必须有三个成员的条件，从而报错了
const palette3 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0], // 报错
} satisfies Record<Colors, string | RGB>;
