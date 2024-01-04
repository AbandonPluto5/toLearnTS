// interface继承 type使用&添加属性
interface Country {
  name: string;
  capital: string;
}
interface Country1 extends Country {
  age: number
}
type A = {
  name: string
}
type B = A & {age: number}

// 同名interface会合并 同名type报错
interface Country {
  name: string;
  capital: string;
}
interface Country {
  name: string;
  age: number;
}
type C = {
  name: string
}
type C = {
  name: string
}

// this只能用于interface
interface Foo {
  add(num:number): this;
};

// 报错
type Foo1 = {
  add(num:number): this;
};

// type可以扩展原始类型 interface不可以
// 正确
type MyStr = string & {
  type: 'new'
};

// 报错
interface MyStr1 extends string {
  type: 'new'
}

// interface无法表达某些复杂类型(如交叉类型和联合类型) type可以
type AorB = A | B;
type AorBwithName = AorB & {
  name: string
};

// interface不能包含属性映射 type可以
interface Point {
  x: number;
  y: number;
}

// 正确
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};

// 报错
interface PointCopy2 {
  [Key in keyof Point]: Point[Key];
};