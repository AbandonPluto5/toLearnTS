// 数组
const arr = []
arr
// arr.push(123)
let a = [1, true] // a:(number | boolean)[]

// 只读数组
const arr1: readonly number[] = [1]
const arr2: Readonly<number[]> = [1]
const arr3: ReadonlyArray<number> = [1]
const arr4 = [1] as const // 叫作只读数组或只读元组都可以
// arr1.push(2) // 类型“readonly number[]”上不存在属性“push”


// 元组
let b: [number, number?] = [1, 2] // b:[number, (number | undefined)]
// b[2] = 3 // 越界成员会报错

// 利用展开运算符指定不限成员数量的元组
type NamesType = [
  string,
  ...number[]
]
const c: NamesType = ['c', 1, 2]
const d: NamesType = ['c', 1, 2, 3]

// 不确定成员数量和类型时
type Tuple = [...any[]]
const e: Tuple = ['a',1,'b']

// 元组成员名称无任何作用
type Color = [
  red: number,
  yellow: number,
  blue: number
]
const f:Color = [100, 255, 250]

// 读取成员类型
type Tuple1 = [number, string]
type Age = Tuple1[0] // number
type Tuple2 = [string, number, Date]
type Tuple21 = Tuple2[number] // string | number | Date

// 推断元组成员数量
function fn(p: [number, number, number?]) {
  if (p.length === 3) {}
  // if (p.length === 4) {} // 此条件将始终返回 "false"，因为类型 "2" 和 "3" 没有重叠
  // 使用展开运算符 无法推断成员数量 原因：ts内部会将其当成数组处理
  const names: [...string[]] = ['a', 'b' , 'c']
  if (names.length === 5) {}
}

// 当使用展开运算符传递参数时 ts会认为成员数量不确定 因此报错
const arr5 = [2, 3]
function fn1(x: number, y: number){
  console.log(x, y);
}
// fn1(...arr5) // 扩张参数必须具有元组类型或传递给 rest 参数
// 解决方法 将变量类型写为成员数量确定的元组或只读
const arr6: [number, number] = [2, 3]
fn1(...arr6)
const arr7 = [2, 3] as const
fn1(...arr7)