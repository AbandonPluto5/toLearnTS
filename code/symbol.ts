
let x: symbol = Symbol()
let y: symbol = Symbol()
console.log(x === y); // false

const z: unique symbol = Symbol()
// 等同于
const zz = Symbol()

// let zzz:unique symbol = Symbol() // 类型为 "unique symbol" 的变量必须为 "const"

const a: unique symbol = Symbol()
const b: unique symbol = Symbol()
// a === b // 此条件将始终返回 "false"，因为类型 "typeof a" 和 "typeof b" 没有重叠

// unique symbol相当于值类型 此处是不一样的所以不相等
const c: unique symbol = Symbol();
// const d:unique symbol = c; // 报错: 不能将类型“typeof c”分配给类型“typeof d”
// 正确写法
const d:typeof c = c

// 值相等 值类型不等
const e: unique symbol = Symbol.for('foo')
const f: unique symbol = Symbol.for('foo')

// unique symbol是symbol的子类型
const g: unique symbol = Symbol()
const h: symbol = g
// const i: unique symbol = h // 不能将类型“symbol”分配给类型“unique symbol”

// unique symbol可以用作固定不变的属性名
const j: unique symbol = Symbol()
const k: symbol = Symbol()
interface Foo {
  [j]: string;
  // [k]: string; // 接口中的计算属性名称必须引用必须引用类型为文本类型或 "unique symbol" 的表达式
}

// 类型推断
let l = Symbol() // symbol
const m = Symbol() // unique symbol
const n = l // symbol