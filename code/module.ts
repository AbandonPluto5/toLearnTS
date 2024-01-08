// 1. es模块
export type Bool = true | false;

// 文件间导入和导出
// a.ts
export interface A {
  foo: string;
}
export let a = 123;
// b.ts
// type关键字区分类型和其它
// import { type A, a as a1 } from './a';
// import type { A } from './a';

// 导入默认类型
// import type DefaultType from 'moduleA';

// 导入所有类型
// import type * as TypeNS from 'moduleA';

// 2. commonjs模块 报错是因为ts默认是使用es而不是commonjs
// import fs = require('fs');
// const code = fs.readFileSync('hello.ts', 'utf8');

// import * as fs from 'fs';
// 等同于
// import fs = require('fs');

// exports = 等同于 module.exports
// let obj = { foo: 123 };
// export = obj;
// export = 导出的对象只能用import = 语法进行导入
// import obj = require('./a');
