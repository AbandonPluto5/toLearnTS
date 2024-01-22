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
- 使用 typeof 套用另一个函数:
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
- interface 定义
  ```
    interface MyFunc1 {
      (a:number, b:number): number;
    }
  ```
- Function 类型: 任何函数都属于 Function 类型 可以接受任意数量的参数 每个参数的类型都是 any 返回值的类型也是 any
- 函数返回值
  - void: 函数正常执行结束 但是不返回值或返回 undefined
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
- type 定义
  ```
    type User = {
      name: string,
      age: number
    };
  ```
- interface 定义
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

- 继承: 使用 extends 关键字
  - interface 继承 interface: 相同属性时 子接口覆盖父接口 存在相同属性且类型冲突时直接报错
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
  - interface 继承 type: 如果 type 定义的类型不是对象 就无法继承
    ```
      type Country = {
        name: string;
        capital: string;
      }
      interface CountryWithPop extends Country {
        population: number;
      }
    ```
  - interface 继承 class 如果类中存在私有成员和保护成员 继承时会报错 因为对象无法实现这些成员
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

- type 可以表示非对象类型 interface 只能表示对象类型(包括数组、函数等)
- interface 可以继承 type 只能用&添加属性
- 同名 interface 会自动合并 同名 type 会报错
- this 只能用于 interface
- type 可以扩展原始类型 interface 不可以
- interface 无法表达某些复杂类型(如交叉类型和联合类型) type 可以
- interface 不能包含属性映射 type 可以

### class

- 只有 get 方法的属性 默认为只读属性
- implements 关键字: 让类满足外部 interfae 或 type 定义的类型限制
  - interface 描述的是类的对外接口 也就是实例的公开属性和公开方法 不能定义私有的属性和方法
    ```
      interface Foo {
        private member:{}; // 报错
      }
    ```
- 获得类的自身类型
  - 使用 typeof
  - 使用构造函数的形式
  - 基于构造函数单独提供一个 interface
- 确定两个类定的兼容关系
  - 只检查实例成员 不考虑静态成员和构造方法
  - 如果类中有私有成员(private)或保护成员(protected) 则需要两个类存在继承关系

### 泛型

- 不确定具体类型时使用
- 一般使用 T 作为类型参数的名字
  ```
    function getFirst<T>(arr:T[]):T {
      return arr[0];
    }
    getFirst<number>([1,2,3])
  ```
- 类型参数的约束条件 如下: 传入的参数必须要有 length 属性
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
- 同名 enum 自动合并
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
  - 所有定义必须同为 const 枚举或者非 const 枚举 不允许混合使用
- 字符串类型成员值不可使用表达式赋值如: ['T', 'w', 'o'].join('')
  ```
    enum MyEnum {
      A = 'one',
      B = ['T', 'w', 'o'].join('') // 报错
    }
  ```
- keyof 可以取出 enum 结构的所有成员名 作为联合类型返回
  ```
    enum MyEnum {
      A = 'a',
      B = 'b'
    }
    type Foo = keyof typeof MyEnum; // 'A'|'B'
  ```
- in 可以取出 enum 结构的所有成员值
  ```
    type Foo = { [key in MyEnum]: any }; // { a: any, b: any }
  ```
- 反向映射 可以通过成员值取出成员名 只存在于数值 enum

### 类型断言

- 让开发者指定类型 绕过编译器的类型推断
- 方式一: 使用 as `value as Type` 值的类型与断言的类型必须兼容
- 方式二: `<Type>value` 与 jsx 语法冲突 所以推荐方式一
- 特殊类型断言: as const 将值推断为常量类型
  - 只能用于字面量
    ```
      let s1 = 'JavaScript';
      let s2 = s1 as const; // 报错
    ```
  - 不能用于表达式 `let s = ('Java' + 'Script') as const; // 报错`
- 非空断言 ! 确保一个变量不会为 null 或 undefined 时写在后面 防止编译器检测到值可能为 undefined 或 null 时报错
- 断言函数 定义一个函数用来保证函数参数是否符合某种类型 不符合就抛出异常 中断程序执行

### 模块

- 支持导入和导出类型 其它和 ES6 一致
- import 时可以用 type 关键字区分类型和其它
  如: `import { type A, a } from './a';`
  或: `import type { A } from './a';`
- export 时也支持使用区分类型和其它
  如: `export {type A, type B};`
  或: `export type {A, B};`

### namespace 命名空间

- 用来建立一个容器 内部所有的变量和函数 只能在这个容器中使用
- 如果需要在外部使用内部的变量和函数 则需要给变量和函数加上 export
- namespace 支持嵌套
- 同名 namespace 自动合并 同 interface
  - 非 export 成员不会被合并 只能在各自的 namespace 中使用
- namespace 与同名函数合并
  - 前提: 函数必须在 namespace 之前声明 确保先创建函数
- namespace 与同名 class 合并
  - 前提: class 必须在 namespace 之前声明
- namespace 与同名 enum 合并
  - enum 成员与 namespace 导出成员不可同名

### 装饰器

- 用来在定义时修改类的行为 执行类之前会先执行装饰器 一般用来给类添加某种特定行为
- 用@符号指代装饰器 后面的表达式执行后得到的应该是一个函数
- 装饰器的种类有 5 种
  - class 类装饰器
  - method 方法装饰器
  - getter
  - setter
  - field 属性装饰器
- 新的属性修饰符 accessor
  - 为公开属性自动生成取值器和存值器

### declare 关键字

- 用来告诉编译器 某个类型是外部定义的
- 只用来给出类型描述 不允许设置变量初始值
  ```
    declare let x:number = 1; // 报错
  ```
- declare module
  - 可以使用 declare 对一个模块的接口进行扩展
    ```
      // a.ts
      export interface A {
        x: number;
      }
      // b.ts
      import { A } from './a';
      declare module './a' {
        interface A {
          y: number;
        }
      }
      const a:A = { x: 0, y: 0 };
    ```
    - 必须和当前文件加载该语法的写法保持一致
    - 不能创建新的顶层类型
    - 不能对默认的 default 接口进行扩展
  - 如果外部模块没有提供接口类型 可以在自己的脚本顶部加上 `declare module "模块名";` 即使外部模块没有类型声明 也可以通过编译
- declare global
  - 用来为 js 引擎的原生对象添加属性和方法
  - 只能扩充现有对象的类型描述 不能增加新的顶层类型

### .d.ts 类型声明文件

### 类型运算符

- keyof 运算符

  - 主要用途

    - 精确表达对象的属性类型
    - 属性映射

  - 接受一个对象类型作为参数 返回对象所有 key 组成的联合类型

    ```
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
    ```

  - 由于对象的键名只有三种类型 所以对于 any 的键名联合类型就是 string|number|symbol
    `type KeyT = keyof any; // string | number | symbol`
  - 使用在没有自定义键名的类型上时返回 never 类型
    `type KeyT = keyof object; // never`
  - 对象属性名是索引类型时返回属性名的索引类型
    ```
      interface T1 {
        [prop: number]: number;
      }
      type KeyT1 = keyof T1; // number
    ```
  - 用于数组或元组 返回所有的键名
    `type Result = keyof ["a", "b", "c"]; // number | "0" | "1" | "2" | "length" | "pop" | "push" | ···`
  - 用于联合类型 返回成员共有的键名
    ```
      type A = { a: string; z: boolean };
      type B = { b: string; z: boolean };
      type KeyT3 = keyof (A | B); // 'z'
    ```
  - 用于交叉类型 返回所有键名
    ```
      type A = { a: string; z: boolean };
      type B = { b: string; z: boolean };
      type KeyT3 = keyof (A & B); // 'a | b | z'
    ```
  - 取出键值组成的联合类型
    ```
      type MyObj = {
        foo: number,
        bar: string,
      };
      type Keys = keyof MyObj;
      type Values = MyObj[Keys]; // number|string
    ```

- in 运算符
  - 用来取出联合类型的每一个成员类型
    ```
      type U = 'a'|'b'|'c';
      type Foo = {
        [Prop in U]: number;
      };
      // 等同于
      type Foo = {
        a: number,
        b: number,
        c: number
      };
    ```
- [] 运算符
  - 用来取出对象的键值类型
    ```
      type Person = {
        age: number;
        name: string;
        alive: boolean;
      };
      type Age = Person["age"]; // number
    ```
  - 如果参数是联合类型 返回的也是联合类型
    ```
      type Person = {
        age: number;
        name: string;
        alive: boolean;
      };
      type Age = Person[keyof Person]; // number | string | boolean
    ```
  - []中不能有值的运算
- extends...?: 条件运算符
  - 根据当前类型是否符合某种条件 返回不同的类型
    `type T = 1 extends number ? true : false; // true`
  - 如果需要判断的类型是联合类型 条件运算符会展开这个联合类型
    ```
      (A|B) extends U ? X : Y
      // 等同于
      (A extends U ? X : Y) | (B extends U ? X : Y)
    ```
- infer 关键字
  - 用来定义泛型里面推断出来的类型参数 而不是外部传入的类型参数 通俗来说可以减少传入的类型参数
    ```
      type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
      // 使用
      type Str = Flatten<string[]>; // string
      type Num = Flatten<number>; // number
    ```
- is 运算符
  - 用来描述返回值属于 false 还是 true
  ```
    type A2 = { a: string };
    type B2 = { b: string };
    function isTypeA(x: A | B): x is A {
      if ("a" in x) return true;
      return false;
    }
  ```
- 模板字符串

  - 可以用来在内部引用其它类型
    ```
      type World = "world";
      type Greeting = `hello ${World}`; // "hello world"
    ```
  - 可以引用的类型有 6 种 为: string、number、bigint、boolean、null、undefined
  - 如果引用的类型是联合类型 返回的也是联合类型
  - 如果引用的是两个联合类型 会交叉展开两个类型

- satisfies 运算符
  - 检测某个值是否符合指定类型

### 类型映射

- 用于不同的类型间存在相同的属性结构但属性类型不一样
  ```
    type A = {
      foo: number;
      bar: number;
    };
    type B = {
      foo: string;
      bar: string;
    };
    // 类型映射后
    type A = {
      foo: number;
      bar: number;
    };
    type B = {
      [prop in keyof A]: string;
    };
  ```
- 为了提高复用 可以将常用映射写成泛型
  ```
    type ToBoolean<Type> = {
      [prop in keyof Type]: boolean;
    };
  ```
- Readonly 内置类型 本质也是通过映射实现
  ```
    type Readonly<T> = {
      readonly [P in keyof T]: T[P];
    };
  ```
- 映射会原样复制原始对象的只读属性和可选属性
- 键名重映射 允许改变键名
  ```
    type A = {
      foo: number;
      bar: number;
    };
    type B = {
      [p in keyof A as `${p}ID`]: number;
    };
  ```
- 属性过滤
  ```
    type User = {
      name: string;
      age: number;
    };
    type Filter<T> = {
      [K in keyof T as T[K] extends string ? K : never]: string;
    };
    type FilteredUser = Filter<User>; // { name: string }
  ```

### 类型工具

- `Awaited<Type>` 返回 Promise 的返回值类型 还可以返回多重的 Promise 返回值类型
  ```
    type A = Awaited<Promise<string>>; // string
    type B = Awaited<Promise<Promise<number>>>; // number
  ```
  - 如果类型参数不是 Promise 类型 就会原样返回 `type C = Awaited<boolean | Promise<number>>; // number|boolean`
- `ConstructorParameters<Type>` 返回一个由构造函数的参数类型组成的元组
  ```
    type T1 = ConstructorParameters<new (x: string, y: number) => object>; // [x: string, y: number]
    type T2 = ConstructorParameters<new (x?: string) => object>; // [x?: string | undefined]
  ```
  - 如果类型参数不是构造方法 就会报错
    - 例外: 参数如果是 any 则返回 unknown[] 如果是 never 则返回 never
- `Exclude<UnionType, ExcludedMembers>` 用来从联合类型中删除指定类型 返回一个新的类型
- `Extract<Type, Union>` 用来从联合类型中提取指定类型 返回一个新的类型
  - 如果参数类型不包含在联合类型中 则返回 never 类型
- `InstanceType<Type>` 返回构造函数的实例类型
  - 如果类型参数不是构造方法 就会报错
    - 例外: 参数如果是 any 则返回 any 如果是 never 则返回 never
- `NonNullable<Type>` 用来从联合类型中删除 null 类型和 undefined 类型 返回一个新类型
- `Omit<Type, Keys>` 用来从对象类型中删除指定的属性 返回一个新的对象类型
- `OmitThisParameter<Type>` 从函数类型中移除 this 参数
- `Parameters<Type>` 从函数类型中提取参数类型 组成一个元组返回
  - 如果参数类型不是带有参数的函数 就会报错
    - 例外: 如果参数是 any 则返回 unknown 如果是 never 则返回 never
  - 主要用于从外部模块提供的函数类型中获取参数类型
- `Partial<Type>` 将类型参数 Type 的所有属性变为可选属性 返回一个新类型
- `Required<Type>` 将类型参数 Type 的所有属性变为必选属性 返回一个新类型
- `Pick<Type, Keys>` 从对象类型中提取出指定的键名 返回一个新的对象类型
  - 必须是对象类型中存在的属性 否则会报错
- `Readonly<Type>` 将类型参数 Type 的所有属性变为只读属性 返回一个新类型
- `ReadonlyArray<Type>` 用来生成一个只读数组类型
- `Record<Keys, Type>` 返回一个对象类型 Keys 是键名 Type 是键值类型
  - 如果参数 Keys 是联合类型 则会依次展开为多个键名
  - 如果参数 Type 是联合类型 则表明键值是联合类型
  - Keys 的类型必须兼容 string|number|symbol 否则不能用作键名 会报错
- `ReturnType<Type>` 返回一个函数类型 Type 的返回值类型
  - 如果类型参数是泛型函数 返回值取决于泛型 如果泛型不带限制条件 则返回 unknown
  - 如果类型参数不是函数 则会报错
  - 如果类型参数是 any 或 never 则分别返回 any 和 never
- `ThisParameterType<Type>` 提取函数类型中 this 参数的类型
  - 如果函数没有 this 参数 则返回 unknown
- `ThisType<Type>` 用来和其它类型组成交叉类型 提示 TS 其它类型中的 this 类型
  - 使用时需要开启 noImplicitThis 设置
- 针对字符串的类型工具
  - `Uppercase<StringType>` 将字符串类型的每个字符转为大写
  - `Lowercase<StringType>` 将字符串类型的每个字符转为小写
  - `Capitalize<StringType>` 将字符串的第一个字符转为大写
  - `Uncapitalize<StringType>` 将字符串的第一个字符转为小写
