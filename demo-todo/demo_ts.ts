// console.log(abc)

interface dataInfo {
    msg: string,
    list: string[]
}
interface LoginData {
    data: dataInfo,
    code: number,
}

// const login: LoginData = {
//     data: {
//         msg: 'Response is OK',
//         list: null // 不能将类型“null”分配给类型“string[]”。
//     },
//     code: 200
// }

interface LoginOptions {
    username: string,
    token: string,
    password: string,
}

function login(options: LoginOptions, cb: () => number) {
    // ...
    console.log(options.username, options.token, options.password)
    cb()
}

// function hello(name: string): string {
//     return `你好，我的名字叫${name}`
// }
// hello('Bob')

function hello<T>(name: T): T {
    return name
}
hello<string>('Bob')

hello<number>(123)

const a: any = null


// 类型注解
let isOK: boolean = true;
let str: string = 'abc';
let isNull: null = null;
let age: number = 18;
let empty: undefined = undefined;
let s1: symbol = Symbol();

str = null
str = undefined

// function alertSth(name: string): void {
//     alert(`弹出的名字是: ${name}`)
// }
// alertSth('Bob')

let unusable: void = undefined;

// let an: any = 123;
// an = 'Bob';
// an = true;
// an.toString();
// an.hello();

let num1 = 123;
// num1 = 'Bob'

let anyKey;
anyKey = 123;
anyKey = 'Bob';
anyKey = true;

// 简便数组类型
let arr1: string[] = ['abc', 'Bob', 'xyz'];
// 使用泛型来表示数组
let arr2: Array<string> = ['xiaoming', 'xiaoli', 'xiaoyuan'];
// 复合类型
let arr3: (string | number)[] = [123, 'Bob', 'Tst'];

// function funcArgs(...args: string[]) {
//     console.log(args)
// }
// funcArgs('a', 'b', 123, true)
const readOnlyArr: ReadonlyArray<number> = [342, 3]
// readOnlyArr.push(1) // 类型“readonly number[]”上不存在属性“push”。

const color:readonly number[] = [32,546];
const color2:readonly number[] = [32,546];
const readOnlyArr2: readonly number[] = [12, 34];
const readOnlyArr3: Readonly<number[]> = [12, 34];

let oneTuple: [number, boolean, string]
// 正确初始化
oneTuple = [6, false, 'Bob'];
oneTuple.push(234)

const twoTuple: readonly [string, number, boolean] = ['Bob', 123, true];
// twoTuple.push(122);

const group: [x: string, y: number] = ['Bob', 123];
const [x, y] = group;
console.log(x, y)

interface StringArray {
    [index: number]: string
}
let names: StringArray = ['Bob', 'Li', 'Yuan'];


// interface Person {
//     name: string;
//     age: number;
//     addr: string;
// }

// let bob: Person = {
//     name: 'Bob',
//     age: 28,
//     addr: 'ShenZhen',
// }

// // 可选属性
// interface Person {
//     name: string;
//     age: number;
//     addr?: string;
// }

// let bob: Person = {
//     name: 'Bob',
//     age: 28,
// }

// interface Person {
//     name: string;
//     age?: number;
//     [propName: string]: any;
// }

// let bob: Person = {
//     name: 'Bob',
//     age: 28,
//     birth: '10-01'
// }


interface Person {
    readonly name: string;
    age: number;
    [propName: string]: any;
}

let bob: Person = {
    name: 'Bo',
    age: 28,
    birth: '10-01'
}
// bob.name = 'Yuan'; // 报错：无法为“name”赋值，因为它是只读属性。
bob = {
    name: 'Bob',
    age: 22,
    addr: 'SZ'
}
console.log(bob)


// function add(x: number, y: number): number {
//     return x + y
// }
// console.log(add(1, 2))

// // 函数表达式
// let reduce = function(x: number, y: number): number {
//     return x - y
// }
// console.log(reduce(3, 1)) // print: 2

// // 完整的函数表达式
// let reduce2:(x: number, y: number) => number = function(x: number, y: number): number {
//     return x - y
// }
// console.log(reduce2(3, 1)) // print: 2

function add (x: number, y?: number) {
    return x + (y || 0)
}
console.log(add(8, 1))
console.log(add(8))

function fullName(firstName: string, lastName = 'Bob') {
    return firstName + ' ' + lastName
}
console.log(fullName('Yuan'))
console.log(fullName('Yuan', 'BoBo'))

// 剩余参数
function queueClass(grade: string, ...rest: string[]) {
    return grade + ': ' + rest.join(',')
}
console.log(queueClass('大四班', 'xiaoming', 'xiaoyuan', 'xiaoli'))

// type NumberOrString = (number | string);
function reload(x: number, y: number): number;
function reload(x: string, y: number): string;
function reload(x: string, y: string): string;
function reload(x: any, y: any): any {
    return x + y;
}
console.log(reload(1, 2))       // print: 3
console.log(reload('1', 2))     // print: 12
console.log(reload('1', '2'))   // print: 12
// console.log(reload(1, '2'))     // 报错： 没有与此调用匹配的重载。...
