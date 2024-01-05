var x = Symbol();
var y = Symbol();
console.log(x === y); // false
var z = Symbol();
// 等同于
var zz = Symbol();
// let zzz:unique symbol = Symbol() // 类型为 "unique symbol" 的变量必须为 "const"
var a = Symbol();
var b = Symbol();
// a === b // 此条件将始终返回 "false"，因为类型 "typeof a" 和 "typeof b" 没有重叠
// unique symbol相当于值类型 此处是不一样的所以不相等
var c = Symbol();
// const d:unique symbol = c; // 报错: 不能将类型“typeof c”分配给类型“typeof d”
// 正确写法
var d = c;
// 值相等 值类型不等
var e = Symbol.for('foo');
var f = Symbol.for('foo');
// unique symbol是symbol的子类型
var g = Symbol();
var h = g;
// const i: unique symbol = h // 不能将类型“symbol”分配给类型“unique symbol”
// unique symbol可以用作固定不变的属性名
var j = Symbol();
var k = Symbol();
// 类型推断
var l = Symbol(); // symbol
var m = Symbol(); // unique symbol
var n = l; // symbol
