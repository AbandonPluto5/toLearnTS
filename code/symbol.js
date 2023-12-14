let x = Symbol();
let y = Symbol();
console.log(x === y); // false
const z = Symbol();
// 等同于
const zz = Symbol();
// let zzz:unique symbol = Symbol() // 类型为 "unique symbol" 的变量必须为 "const"
const a = Symbol();
const b = Symbol();
// a === b // 此条件将始终返回 "false"，因为类型 "typeof a" 和 "typeof b" 没有重叠
