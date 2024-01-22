// 若两个类型的属性名相同 但是属性类型不同 则可以用其中一个类型映射出另一个类型
type A = {
  foo: number;
  bar: number;
};
type B = {
  foo: string;
  bar: string;
};

// 类型映射后
type A1 = {
  foo: number;
  bar: number;
};
type B1 = {
  [prop in keyof A]: string;
};
// 如果是复制原始类型 则可写为
type B3 = {
  [prop in keyof A]: A[prop];
};

// 将常用映射写成泛型
type ToBoolean<Type> = {
  [prop in keyof Type]: boolean;
};

// 用联合类型映射
type myObj = {
  [P in 0 | 1 | 2]: string;
};
// 等同于
type myObj1 = {
  0: string;
  1: string;
  2: string;
};

// 直接使用某种类型进行映射
type MyObj2 = {
  [p in string]: boolean;
};
// 等同于
type MyObj3 = {
  [p: string]: boolean;
};

type MyObj4 = {
  [p in "foo"]: number;
};
// 等同于
type MyObj5 = {
  foo: number;
};

// 通过映射把对象的所有属性改成可选属性
type A2 = {
  a: string;
  b: number;
};
type B2 = {
  [prop in keyof A2]?: A2[prop];
};

// Readonly内置类型 本质也是通过映射
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// 映射会原样复制原始对象的可选属性和只读属性
type A3 = {
  a?: string;
  readonly b: number;
};
type B4 = {
  [Prop in keyof A3]: A3[Prop];
};
// 等同于
type B5 = {
  a?: string;
  readonly b: number;
};

// 添加可选属性
type Optional<Type> = {
  [Prop in keyof Type]+?: Type[Prop];
};
// 移除可选属性
type Concrete<Type> = {
  [Prop in keyof Type]-?: Type[Prop];
};

// 添加 readonly
type CreateImmutable<Type> = {
  +readonly [Prop in keyof Type]: Type[Prop];
};
// 移除 readonly
type CreateMutable<Type> = {
  -readonly [Prop in keyof Type]: Type[Prop];
};

// 键名重映射
type A4 = {
  foo: number;
  bar: number;
};
type B6 = {
  [p in keyof A4 as `${p}ID`]: number;
};
// 等同于
type B7 = {
  fooID: number;
  barID: number;
};

// 示例二
interface Person {
  name: string;
  age: number;
  location: string;
}
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};
type LazyPerson = Getters<Person>;
// 等同于
type LazyPerson1 = {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
};

// 属性过滤
type User = {
  name: string;
  age: number;
};
type Filter<T> = {
  [K in keyof T as T[K] extends string ? K : never]: string;
};
type FilteredUser = Filter<User>; // { name: string }

// 联合类型的映射
type S = {
  kind: "square";
  x: number;
  y: number;
};
type C = {
  kind: "circle";
  radius: number;
};
type MyEvents<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};
type Config = MyEvents<S | C>;
// 等同于
type Config1 = {
  square: (event: S) => void;
  circle: (event: C) => void;
};
