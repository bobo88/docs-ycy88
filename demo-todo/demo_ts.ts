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




