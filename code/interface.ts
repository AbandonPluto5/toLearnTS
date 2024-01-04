// 1. 定义对象的属性
interface Foo {
  a: string;
}

// 取出属性的类型
type A = Foo['a']; // string

// 可选
interface Foo {
  x?: string;
}

// 只读
interface B {
  readonly a: string;
}

// 2. 属性索引
interface C {
  [prop: string]: number;
  // a: boolean; // 报错
}
// 数值索引服从于字符串索引
interface D {
  [prop: string]: number;
  [prop: number]: string; // 报错
}
interface E {
  [prop: string]: number;
  [prop: number]: number; // 正确
}

// 3. 定义对象的方法 有三种定义方式
interface F {
  f(x: boolean): string;
}
interface G {
  f: (x: boolean) => string
}
interface H {
  f: { (x: boolean): string }
}

// 4. 定义函数
interface Add {
  (x: number, y: number): number;
}
const myAdd:Add = (x, y) => x + y;

// 5. 构造函数
interface ErrorConstructor {
  new (message?: string): Error;
}

// 6. 继承
interface Style {
  color: string;
}

interface Shape {
  name: string;
}

interface Circle extends Style, Shape {
  radius: number;
}

const circle:Circle = {} // 类型“{}”缺少类型“Circle”中的以下属性: radius, color, name

// 继承type 如果type不是对象 就无法继承
type Country = {
  name: string;
  capital: string;
}
interface CountryWithPop extends Country {
  population: number;
}

// 继承class
class I {
  x:string = '';
  y():boolean {
    return true;
  }
}
interface J extends I {
  z: number
}
const b:J = {
  x: '',
  y: function(){ return true },
  z: 123
}

// 7. 接口合并
interface Box {
  height: number;
  width: number;
}
interface Box {
  length: number;
}
// const box:Box = {} // height, width, length

// 同一个属性不能有类型冲突
interface K {
  a: number;
}
interface K {
  a: string; // 报错
}