// 1. 函数的泛型写法
// 定义类型参数
function getFirst<T>(arr:T[]):T {
  return arr[0];
}
// 调用时指定类型参数
getFirst<number>([1,2,3])
getFirst<string>(['a','b','c'])

// 多个类型参数
function map<T, U>(
  arr: T[],
  f: (arg:T) => U
):U[]{
  return arr.map(f)
}
map<string, number>(
  ['1', '2', '3'],
  (n) => parseInt(n)
);

// 2. 接口的泛型写法
interface Box<Type> {
  contents: Type;
}
let box:Box<string>;

// 3. 泛型类
class Pair<K, V> {
  key: K;
  value: V;
}

// 4. 类型别名的泛型写法
type Nullable<T> = T | undefined | null;

type Container<T> = { value: T };
const a: Container<number> = { value: 0 };
const b: Container<string> = { value: 'b' };

type Tree<T> = {
  value: T;
  left: Tree<T> | null;
  right: Tree<T> | null;
};

// 5. 类型参数默认值
function getFirst1<T = string>(
  arr:T[]
):T {
  return arr[0];
}
// 有默认值就表示可选参数 可选参数必须位于必选参数之后
class Generic<U, T = string> {
  list:T[] = []

  add(t:T) {
    this.list.push(t)
  }
}

// 6. 数组的泛型表示
let arr:Array<number> = [1, 2, 3];

// 7. 类型参数的约束条件
// 传入的参数必须要有length属性
function comp<T extends { length: number }>(
  a: T,
  b: T
) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}