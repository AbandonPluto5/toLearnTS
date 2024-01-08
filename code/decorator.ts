function simpleDecorator( 
  value:any,
  context:any
) {
  console.log(`hi, this is ${context.kind} ${context.name}`);
  return value;
}

// 类A在执行前会先执行装饰器
@simpleDecorator
class A {} // "hi, this is class A"

// 装饰器的不同形式
// @myFunc
// @myFuncFactory(arg1, arg2)

// @libraryModule.prop
// @someObj.method(123)

// @(wrap(dict['prop']))

// @frozen class Foo {

//   @configurable(false)
//   @enumerable(true)
//   method() {}

//   @throttle(500)
//   expensiveMethod() {}
// }

// 1. 类装饰器
// 可以不返回任何值
function Greeter(value, context) {
  if (context.kind === 'class') {
    value.prototype.greet = function () {
      console.log('你好');
    };
  }
}

@Greeter
class User {}

let u = new User();
u.greet(); // "你好"

// 也可以返回一个函数替代当前类的构造方法
function countInstances(value:any, context:any) {
  let instanceCount = 0;

  const wrapper = function (...args:any[]) {
    instanceCount++;
    const instance = new value(...args);
    instance.count = instanceCount;
    return instance;
  } as unknown as typeof MyClass;

  wrapper.prototype = value.prototype; // A
  return wrapper;
}

@countInstances
class MyClass {}

const inst1 = new MyClass();
inst1 instanceof MyClass // true
inst1.count // 1

// 还可以放好一个新的类替代当前类
function countInstances1(value:any, context:any) {
  let instanceCount = 0;

  return class extends value {
    constructor(...args:any[]) {
      super(...args);
      instanceCount++;
      this.count = instanceCount;
    }
  };
}

@countInstances1
class MyClass1 {}

const inst2 = new MyClass1();
inst2 instanceof MyClass1 // true
inst2.count // 1

// 2. 方法装饰器
function trace(decoratedMethod,context) {
  // ...
}
class C {
  @trace
  toString() {
    return 'C';
  }
}
// `@trace` 等同于
// C.prototype.toString = trace(C.prototype.toString);

// 装饰器函数返回新函数 就会替代原函数
function replaceMethod(value,context) {
  return function () {
    return `How are you, ${this.name}?`;
  }
}
class Person {
  name;
  constructor(name) {
    this.name = name;
  }
  @replaceMethod
  hello() {
    return `Hi ${this.name}!`;
  }
}
const robin = new Person('Robin');
robin.hello() // 'How are you, Robin?'

// 3. addInitializer 在类的初始化阶段添加回调函数 早于属性初始化
function collect(
  value,
  {name, addInitializer}
) {
  addInitializer(function () {
    if (!this.collectedMethodKeys) {
      this.collectedMethodKeys = new Set();
    }
    this.collectedMethodKeys.add(name);
  });
}

class C1 {
  @collect
  toString() {}

  @collect
  [Symbol.iterator]() {}
}

const inst = new C1();
inst.collectedMethodKeys // new Set(['toString', Symbol.iterator])

// 4. 属性装饰器
function logged(value, context) {
  const { kind, name } = context;
  if (kind === 'field') {
    return function (initialValue) {
      console.log(`initializing ${name} with value ${initialValue}`);
      return initialValue;
    };
  }
}

class Color {
  @logged name = 'green';
}
const color = new Color();
// "initializing name with value green"

// 属性装饰器的返回值函数 可以更改属性的初始值
// function twice() {
//   return initialValue => initialValue * 2;
// }

// class C3 {
//   @twice
//   field = 3;
// }

// const inst3 = new C3();
// inst3.field // 6

// 5. getter装饰器会setter装饰器
// 下面例子将取值器结果保存为一个属性 加快后续读取
class C4 {
  @lazy
  get value() {
    console.log('正在计算……');
    return '开销大的计算结果';
  }
}
function lazy(
  value:any,
  {kind, name}:any
) {
  if (kind === 'getter') {
    return function (this:any) {
      const result = value.call(this);
      Object.defineProperty(
        this, name,
        {
          value: result,
          writable: false,
        }
      );
      return result;
    };
  }
  return;
}
const inst4 = new C4();
inst4.value
// 正在计算……
// '开销大的计算结果'
inst4.value
// '开销大的计算结果'

// 6. assessor修饰符
class C5 {
  accessor x = 1;
}
// 等同于
class C6 {
  #x = 1;

  get x() {
    return this.#x;
  }

  set x(val) {
    this.#x = val;
  }
}

