// 1.
const obj:{
  x:number;
  y:number;
  add(x:number, y:number): number;
} = { 
  x: 1, 
  y: 1,
  add(x, y) {
    return x + y;
  }
};
// 读写不存在的属性报错
console.log(obj.z); // 报错
obj.z = 1; // 报错
delete obj.x // 报错

// 2. 通过对象属性读取类型
type User = {
  name: string,
  age: number
};
type Name = User['name']; // string

// 3. interface定义
interface MyObj {
  x: number;
  y: number;
}

// 4. 可选属性
type User1 = {
  firstName: string;
  lastName?: string;
};
// 等同于
type User2 = {
  firstName: string;
  lastName?: string|undefined;
};

// 5. 只读属性
const person:{
  readonly age: number
} = { age: 20 };

person.age = 21; // 报错

// 如果属性值是一个对象 readonly只是禁止完全替换掉该对象
interface Home {
  readonly resident: {
    name: string;
    age: number
  };
}
const h:Home = {
  resident: {
    name: 'Vicky',
    age: 42
  }
};
h.resident.age = 32; // 正确
h.resident = {
  name: 'Kate',
  age: 23 
} // 报错

// 只读对象的另一种写法
const myUser = {
  name: "Sabrina",
} as const;

myUser.name = "Cynthia"; // 报错

// 如果声明了类型 会以声明的类型为准
const myUser1:{ name: string } = {
  name: "Sabrina",
} as const;
myUser1.name = "Cynthia"; // 正确

// 6. 属性名的索引类型 属性名的类型可以取string | number | symbol
type MyObj1 = {
  [property: string]: string
};
const obj1:MyObj1 = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
};

type MyArr = {
  [n:number]: number;
};
const arr:MyArr = [1, 2, 3];
// 或者
const arr1:MyArr = {
  0: 1,
  1: 2,
  2: 3,
};

// 属性名的索引类型写法 不适用于数组 会导致无法使用数组的方法和length属性
type MyArr1 = {
  [n:number]: number;
};
const arr2:MyArr1 = [1, 2, 3];
arr2.length // 报错

// 7. 严格字面量检查
// 如果字面量的结构和定义的不一致 就会报错
const point:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
};
// 但是如果不是字面量 而是一个变量 根据结构类型原则 不会报错
const myPoint = {
  x: 1,
  y: 1,
  z: 1
}
const point1: {
  x: number;
  y: number;
} = myPoint; // 正确
// 也可以使用类型断言规避严格字面量检查
const point2:{
  x:number;
  y:number;
} = {
  x: 1,
  y: 1,
  z: 1 // 报错
} as { 
  x: number;
  y: number;
}
// 允许字面量有多余属性
let x: {
  foo: number,
  [x: string]: any
};

x = { foo: 1, baz: 2 };  // Ok

// 8. 最小可选属性规则(弱类型检测) 如果某个类型的所有属性都是可选的，那么该类型的对象必须至少存在一个可选属性，不能所有可选属性都不存在。这就叫做“最小可选属性规则”。
type Options = {
  a?:number;
  b?:number;
  c?:number;
};

const opts = { d: 123 };

const obj2:Options = opts; // 报错

// 9. 空对象类型
let d:{};
// 等同于
let e:Object;
d = {};
d = { x: 1 };
d = 'hello';
d = 2;
// 无法赋值为null和undefined
// d = null;
// d = undefined;
// 无法直接新增属性
// d.a = 'a'
// 也无法读取属性
// d.x
// 空对象类型的另一种定义方法 会强制为空对象
interface WithoutProperties {
  [key: string]: never;
}
const a:WithoutProperties = { prop: 1 }; // 报错
const b:WithoutProperties = {}; // 正确