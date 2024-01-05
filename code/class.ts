// 顶层声明
class Point {
  x!:number;
  y!:number;
  z;
  a = 0;
  b = 'b'
}

// 1. 只读
class A {
  readonly id:string = 'foo';
  constructor() {
    this.id = 'bar'; // 正确
  }
}
const a = new A();
// a.id = 'bar'; // 报错

// 2. 类的方法定义类型 省略返回值 ts可以推断
class Point1 {
  x:number;
  y:number;

  constructor(x:number = 0, y:number = 0) {
    this.x = x;
    this.y = y;
  }

  add(point:Point) {
    return new Point1(
      this.x + point.x,
      this.y + point.y
    );
  }
}

// 3. 存取器方法
// 只有get方法的属性自动是只读属性
class C {
  _name = 'foo';
  _age = 10;

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get age() {
    return this._age;
  }
}
const c = new C();
// c.age = 18; // 报错

// 4. 属性索引
// [s:string]表示所有属性名类型为字符串的属性 属性值是布尔值或返回布尔值的函数
class MyClass {
  [s:string]: boolean |
    ((s:string) => boolean);

  // 方法的类型必须定义在属性索引中
  get(s:string) {
    return this[s] as boolean;
  }
  // 存取器同属性 所以可以不定义在属性索引中
  get isOk(){
    return true
  }
}

// 5. implements满足类型限制
interface Country {
  name:string;
  capital:string;
}
// 或者
// type Country = {
//   name:string;
//   capital:string;
// }
class MyCountry implements Country {
  name = '';
  capital = '';
}

// implements关键字后面 不仅可以是接口 也可以是另一个类 后面的类将被当作接口
class Car {
  id:number = 1;
  move():void {};
}
class MyCar implements Car {
  id = 2; // 不可省略
  move():void {};   // 不可省略
}

// interface 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法
// interface Foo {
//   private member:{}; // 报错
// }

// 6. 实现多个接口
// class Car1 implements MotorVehicle, Flyable, Swimmable {
//   // ...
// }
// 使用类的继承实现多个接口
// class Car2 implements MotorVehicle {
// }
// class SecretCar extends Car implements Flyable, Swimmable {
// }
// 使用接口的继承实现多个接口 省略...

// 7. 类与接口合并
// 类和接口同名 接口会被合并进类中
class B {
  x:number = 1;
}
interface B {
  y:number;
}
let b = new B();
b.y = 10;
b.x // 1
b.y // 10

// 8. class本身也是一种类型 代表该类的实例类型
class Color {
  name:string;

  constructor(name:string) {
    this.name = name;
  }
}
const green:Color = new Color('green');

// 对于引用实例对象的变量来说 类型可以是interface 也可以是class
interface MotorVehicle {
}
class Car3 implements MotorVehicle {
}
// 写法一
const c1:Car3 = new Car3();
// 写法二
const c2:MotorVehicle = new Car3();

// 9. 类的自身类型
// 使用typeof
function createPoint(
  PointClass:typeof Point1,
  x:number,
  y:number
):Point1 {
  return new PointClass(x, y);
}
// 使用构造函数的形式
function createPoint1(
  PointClass: new (x:number, y:number) => Point1,
  x: number,
  y: number
):Point1 {
  return new PointClass(x, y);
}
// 单独提供一个interface
interface PointConstructor {
  new(x:number, y:number):Point;
}
function createPoint2(
  PointClass: PointConstructor,
  x: number,
  y: number
):Point {
  return new PointClass(x, y);
}

// 10. 结构类型原则
class Person {
  name: string;
  age: number
}
class Customer {
  name: string;
}
const cust:Customer = new Person();
// 如果是对象和class的实例结构相同 也遵循结构类型原则
const obj = { name: 'John' };
const p: Customer = obj;

// 空类 任何类都可以使用
class Empty {}
function fn(x:Empty) {
  // ...
}
fn({});
fn(window);
fn(fn);

// 11. 继承
// 父类的protected属性可以被子类设置为public或者protected 但是不能设置为private
class D {
  protected x: string = '';
  protected y: string = '';
  protected z: string = '';
}
class E extends D {
  // 正确
  public x:string = '';

  // 正确
  protected y:string = '';

  // 报错
  // private z: string = '';
}

// 父类的私有成员不可以在子类中定义
class F {
  private x = 0;
}

// class G extends F {
//   x = 1; // 报错
// }

// 12. 泛型类
class Box<Type> {
  contents: Type;

  constructor(value:Type) {
    this.contents = value;
  }
}
const box:Box<string> = new Box('hello!');