### array

- 所有成员类型必须相同
- 成员数量不确定
- 写法：成员类型[] 或 Array<成员类型>

### tuple

- 可以理解为与数组的区别是：有长度且成员可以是任意类型，但是每个成员的类型都必须声明
- 写法：[成员类型 1， 成员类型 2]
- 可选成员写法：[成员类型 1, 成员类型 2?]

### symbol & unique symbol

- 用来指代唯一的值
- unique symbol 用来指代单个、不能被修改的 Symbol 值，为 symbol 的子类型，相当于 1 这个值类型是 number 的子类型

### 函数类型

- (a:number, b:number) => number;
- 使用typeof套用另一个函数: 
  ```function add(x: number, y: number): number {
       return x + y;
     }
     const myAdd:typeof add = function(x,y){
       return x + y
     }
  ```
- 对象写法:
  ```
    let add1: {
      (x:number, y:number):number
    }
  ```
- interface定义
  ```
    interface MyFunc1 {
      (a:number, b:number): number;
    }
  ```
- Function类型: 任何函数都属于Function类型 可以接受任意数量的参数 每个参数的类型都是any 返回值的类型也是any
- 函数返回值
  - void: 函数正常执行结束 但是不返回值或返回undefined
  - never: 函数没有执行结束 不可能有返回值

### object
- 字面量定义
  ```
    {
      x:number;
      y:number;
      add(x:number, y:number): number;
    }
  ```
- type定义
  ```
    type User = {
      name: string,
      age: number
    };
  ```
- interface定义
  ```
    interface MyObj {
      x: number;
      y: number;
    }
  ```
- 属性名的索引类型: 用于有多个属性不确定时
  ```
    type MyObj = {
      [property: string]: string
    };

    const obj:MyObj = {
      foo: 'a',
      bar: 'b',
      baz: 'c',
    };
  ```
- 最小可选属性规则(弱类型检测): 如果某个类型的所有属性都是可选的 那么该类型的对象必须至少存在一个可选属性 不能所有可选属性都不存在

### interface

- 继承:  使用extends关键字
  - interface继承interface: 相同属性时 子接口覆盖父接口 存在相同属性且类型冲突时直接报错
    ```
      interface Style {
        color: string;
      }
      interface Shape {
        name: string;
      }
      interface Circle extends Style, Shape {
        radius: number;
      }
    ```
  - interface继承type: 如果type定义的类型不是对象 就无法继承
    ```
      type Country = {
        name: string;
        capital: string;
      }
      interface CountryWithPop extends Country {
        population: number;
      }
    ```
  - interface继承class 如果类中存在私有成员和保护成员 继承时会报错 因为对象无法实现这些成员
    ```
      class I {
        x:string = '';
        y():boolean {
          return true;
        }
      }
      interface G extends I {
        z: number
      }
    ```
- 同名接口合并
  - 同名属性类型必须相同
  - 同名方法有不同的类型声明 会发生函数重载 越靠后的优先级越高 但是如果其中一个参数是字面量类型 则优先级最高

### interface 与 type
- type可以表示非对象类型 interface只能表示对象类型(包括数组、函数等)
- interface可以继承 type只能用&添加属性
- 同名interface会自动合并 同名type会报错
- this只能用于interface
- type可以扩展原始类型 interface不可以
- interface无法表达某些复杂类型(如交叉类型和联合类型) type可以
- interface不能包含属性映射 type可以

### class
- 只有get方法的属性 默认为只读属性
- implements关键字: 让类满足外部interfae或type定义的类型限制
  - interface 描述的是类的对外接口 也就是实例的公开属性和公开方法 不能定义私有的属性和方法
    ```
      interface Foo {
        private member:{}; // 报错
      }
    ```
- 获得类的自身类型
  - 使用typeof
  - 使用构造函数的形式
  - 基于构造函数单独提供一个interface
- 确定两个类定的兼容关系
  - 只检查实例成员 不考虑静态成员和构造方法
  - 如果类中有私有成员(private)或保护成员(protected) 则需要两个类存在继承关系

### 泛型
- 不确定具体类型时使用
- 一般使用T作为类型参数的名字
  ```
    function getFirst<T>(arr:T[]):T {
      return arr[0];
    }
    getFirst<number>([1,2,3])
  ```
- 类型参数的约束条件 如下: 传入的参数必须要有length属性
  ```
    function comp<T extends { length: number }>(
      a: T,
      b: T
    ) {
      if (a.length >= b.length) {
        return a;
      }
      return b;
    }
  ```

### enum

- 用于定义常量类型 默认数值 也可以显式设置为字符串
  ```
    enum Color {
      Red,     // 0
      Green,   // 1
      Blue     // 2
    }
  ```
- 成员值都是只读的
- 同名enum自动合并
  - 只允许其中一个首成员省略初始值
    ```
      enum Foo {
        A,
      }
      enum Foo {
        B, // 报错
      }
    ```
  - 不能有同名成员
    ```
      enum Foo {
        A,
        B
      }
      enum Foo {
        B = 1, // 报错
        C
      }
    ```
  - 所有定义必须同为const枚举或者非const枚举 不允许混合使用
- 字符串类型成员值不可使用表达式赋值如: ['T', 'w', 'o'].join('')
  ```
    enum MyEnum {
      A = 'one',
      B = ['T', 'w', 'o'].join('') // 报错
    }
  ```
- keyof 可以取出enum结构的所有成员名 作为联合类型返回
  ```
    enum MyEnum {
      A = 'a',
      B = 'b'
    }
    type Foo = keyof typeof MyEnum; // 'A'|'B'
  ```
- in 可以取出enum结构的所有成员值
  ```
    type Foo = { [key in MyEnum]: any }; // { a: any, b: any }
  ```
- 反向映射 可以通过成员值取出成员名 只存在于数值enum

### 类型断言

- 让开发者指定类型 绕过编译器的类型推断
- 方式一: 使用as `value as Type` 值的类型与断言的类型必须兼容
- 方式二: `<Type>value` 与jsx语法冲突 所以推荐方式一
- 特殊类型断言: as const 将值推断为常量类型
  - 只能用于字面量
    ```
      let s1 = 'JavaScript';
      let s2 = s1 as const; // 报错
    ```
  - 不能用于表达式 `let s = ('Java' + 'Script') as const; // 报错`
- 非空断言 ! 确保一个变量不会为null或undefined时写在后面 防止编译器检测到值可能为undefined或null时报错
- 断言函数 定义一个函数用来保证函数参数是否符合某种类型 不符合就抛出异常 中断程序执行