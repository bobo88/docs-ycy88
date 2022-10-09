// // console.log(abc)

// interface dataInfo {
//     msg: string,
//     list: string[]
// }
// interface LoginData {
//     data: dataInfo,
//     code: number,
// }

// // const login: LoginData = {
// //     data: {
// //         msg: 'Response is OK',
// //         list: null // 不能将类型“null”分配给类型“string[]”。
// //     },
// //     code: 200
// // }

// interface LoginOptions {
//     username: string,
//     token: string,
//     password: string,
// }

// function login(options: LoginOptions, cb: () => number) {
//     // ...
//     console.log(options.username, options.token, options.password)
//     cb()
// }

// // function hello(name: string): string {
// //     return `你好，我的名字叫${name}`
// // }
// // hello('Bob')

// function hello<T>(name: T): T {
//     return name
// }
// hello<string>('Bob')

// hello<number>(123)

// const a: any = null


// // 类型注解
// let isOK: boolean = true;
// let str: string = 'abc';
// let isNull: null = null;
// let age: number = 18;
// let empty: undefined = undefined;
// let s1: symbol = Symbol();

// str = null
// str = undefined

// // function alertSth(name: string): void {
// //     alert(`弹出的名字是: ${name}`)
// // }
// // alertSth('Bob')

// let unusable: void = undefined;

// // let an: any = 123;
// // an = 'Bob';
// // an = true;
// // an.toString();
// // an.hello();

// let num1 = 123;
// // num1 = 'Bob'

// let anyKey;
// anyKey = 123;
// anyKey = 'Bob';
// anyKey = true;

// // 简便数组类型
// let arr1: string[] = ['abc', 'Bob', 'xyz'];
// // 使用泛型来表示数组
// let arr2: Array<string> = ['xiaoming', 'xiaoli', 'xiaoyuan'];
// // 复合类型
// let arr3: (string | number)[] = [123, 'Bob', 'Tst'];

// // function funcArgs(...args: string[]) {
// //     console.log(args)
// // }
// // funcArgs('a', 'b', 123, true)
// const readOnlyArr: ReadonlyArray<number> = [342, 3]
// // readOnlyArr.push(1) // 类型“readonly number[]”上不存在属性“push”。

// const color:readonly number[] = [32,546];
// const color2:readonly number[] = [32,546];
// const readOnlyArr2: readonly number[] = [12, 34];
// const readOnlyArr3: Readonly<number[]> = [12, 34];

// let oneTuple: [number, boolean, string]
// // 正确初始化
// oneTuple = [6, false, 'Bob'];
// oneTuple.push(234)

// const twoTuple: readonly [string, number, boolean] = ['Bob', 123, true];
// // twoTuple.push(122);

// const group: [x: string, y: number] = ['Bob', 123];
// const [x, y] = group;
// console.log(x, y)

// interface StringArray {
//     [index: number]: string
// }
// let names: StringArray = ['Bob', 'Li', 'Yuan'];


// // interface Person {
// //     name: string;
// //     age: number;
// //     addr: string;
// // }

// // let bob: Person = {
// //     name: 'Bob',
// //     age: 28,
// //     addr: 'ShenZhen',
// // }

// // // 可选属性
// // interface Person {
// //     name: string;
// //     age: number;
// //     addr?: string;
// // }

// // let bob: Person = {
// //     name: 'Bob',
// //     age: 28,
// // }

// // interface Person {
// //     name: string;
// //     age?: number;
// //     [propName: string]: any;
// // }

// // let bob: Person = {
// //     name: 'Bob',
// //     age: 28,
// //     birth: '10-01'
// // }


// interface Person {
//     readonly name: string;
//     age: number;
//     [propName: string]: any;
// }

// let bob: Person = {
//     name: 'Bo',
//     age: 28,
//     birth: '10-01'
// }
// // bob.name = 'Yuan'; // 报错：无法为“name”赋值，因为它是只读属性。
// bob = {
//     name: 'Bob',
//     age: 22,
//     addr: 'SZ'
// }
// console.log(bob)


// // function add(x: number, y: number): number {
// //     return x + y
// // }
// // console.log(add(1, 2))

// // // 函数表达式
// // let reduce = function(x: number, y: number): number {
// //     return x - y
// // }
// // console.log(reduce(3, 1)) // print: 2

// // // 完整的函数表达式
// // let reduce2:(x: number, y: number) => number = function(x: number, y: number): number {
// //     return x - y
// // }
// // console.log(reduce2(3, 1)) // print: 2

// function add (x: number, y?: number) {
//     return x + (y || 0)
// }
// console.log(add(8, 1))
// console.log(add(8))

// function fullName(firstName: string, lastName = 'Bob') {
//     return firstName + ' ' + lastName
// }
// console.log(fullName('Yuan'))
// console.log(fullName('Yuan', 'BoBo'))

// // 剩余参数
// function queueClass(grade: string, ...rest: string[]) {
//     return grade + ': ' + rest.join(',')
// }
// console.log(queueClass('大四班', 'xiaoming', 'xiaoyuan', 'xiaoli'))

// // type NumberOrString = (number | string);
// function reload(x: number, y: number): number;
// function reload(x: string, y: number): string;
// function reload(x: string, y: string): string;
// function reload(x: any, y: any): any {
//     return x + y;
// }
// console.log(reload(1, 2))       // print: 3
// console.log(reload('1', 2))     // print: 12
// console.log(reload('1', '2'))   // print: 12
// // console.log(reload(1, '2'))     // 报错： 没有与此调用匹配的重载。...

// interface LabelledValue {
//     label: string;
// }

// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
// }

// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);


// // interface IName {
// //     name: string;
// // }

// // function sayHello(user: IName) {
// //     console.log(user.name)
// // }
// // let Bob = {name: 'Bob', age: 28}
// // sayHello(Bob)
// // // sayHello({name: 'Bob', age: 28})

// interface IUser {
//     readonly id: number;
//     // 必要属性
//     name: string;
//     // 可选属性
//     age?: number;
//     // 任意属性
//     [propName: string]: any;
// }

// function sayHello(user: IUser) {
//     console.log(user.name)
// }

// let Bob = {id: 1, name: 'Bob', age: 28}
// sayHello(Bob)                            // print: Bob
// sayHello({id: 2, name: 'BoBo', age: 28}) // print: BoBo

// // 验证 只读属性
// let testUser: IUser = {id: 3, name: 'xiaoli'}
// // testUser.id = 4 // 报错：无法为“id”赋值，因为它是只读属性。

// interface IFullName {
//     (firstName: string, lastName: string): string;
// }

// let fullName: IFullName;
// fullName = function (firstName: string, lastName: string): string {
//     return firstName + ' ' + lastName
// }
// console.log(fullName('Yuan', 'Bob'))    // print: Yuan Bob

// interface Animal {
//     sleep: string;
// }
  
// class Dog implements Animal {
//     sleep: string;
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//         this.sleep = '躺着睡觉';
//     }
// }
// const xiaohuang = new Dog('小黄')
// console.log(xiaohuang.name)     // print: 小黄
// console.log(xiaohuang.sleep)    // print: 躺着睡觉


// // 定义接口 A
// interface Animal {
//     sleep: string;
// }
// // 定义接口 B
// interface Person {
//     eat: (sth: string) => void;
//     name: string;
//     age?: number;
// }
// interface Children extends Animal, Person {
//     play: (sth: string) => void;
// }

// let xiaohong = <Children>{};
// xiaohong = {
//     sleep: '躺着睡觉',
//     name: '小红',
//     eat: function (food: string) {
//         console.log(this.name + ' eat ' + food)
//     },
//     play: function(toy: string) {
//         console.log(this.name + ' play ' + toy)
//     }
// }
// xiaohong.eat('汉堡包')
// xiaohong.play('玩具熊')


// function Student(name) {
//     this.name = name;
// }
// Student.prototype.school = 'Shenzhen University';

// let stu1 = new Student('Bob');
// console.log(stu1.name)
// console.log(stu1.school)

// class Person {
//     name: string;
//     age: number;
//     constructor(age: number) {
//         this.age = age;
//     }
//     move () {
//         return `${this.name} is move.`
//     }
// }
// class Student extends Person {
//     constructor (name: string, age: number) {
//         super(age);
//         this.name = name;
//     }
//     sayHello () {
//         return `${this.name} say hello for you.`
//     }
// }
// let stu1 = new Student('Bob', 28)
// console.log(stu1.sayHello()); // Bob say hello for you.
// console.log(stu1.move()); // Bob is move.


// class Person {
//     public name: string;
//     public age: number;
//     public constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
//     public move () {
//         return `${this.name} is move.`
//     }
// }

// let p1 = new Person('Bob', 28)
// console.log(p1.move()); // Bob is move.

// class Person {
//     private name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
// }

// let p1 = new Person('Bob')
// console.log(p1.name); // Error

// class Animal {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }

// class Rhino extends Animal {
//     constructor() { super("Rhino"); }
// }

// class Employee {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }

// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Bob");

// animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.

// class Person {
//     private name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     getName () {
//         return this.name
//     }
// }

// let p1 = new Person('Bob')
// console.log(p1.getName()); // Bob

// class Person {
//     protected name: string;
//     protected constructor(name: string) {
//         this.name = name
//     }
// }

// // let p1 = new Person('Bob')     // 报错提示：类“Person”的构造函数是受保护的，仅可在类声明中访问。
// class Employee extends Person {
//     constructor(name: string) {
//         super(name)
//     }
//     getName () {
//         return this.name
//     }
// }
// let p2 = new Employee('Bob')
// console.log(p2.getName())

// class Person {
//     readonly name: string;
//     constructor(name: string) {
//         this.name = name
//     }
// }
// let p1 = new Person('Bob')    
// console.log(p1.name)          // print: Bob
// // p1.name = 'BoBo'           // 报错提示：无法为“name”赋值，因为它是只读属性。

// abstract class Department {
//     constructor(public name: string) {}
//     printName(): void {
//         console.log('Department name: ' + this.name);
//     }
//     abstract printMeeting(): void; // 必须在派生类中实现
// }

// class AccountingDepartment extends Department {
//     constructor() {
//         super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
//     }
//     printMeeting(): void {
//         console.log('The Accounting Department meets each Monday at 10am.');
//     }
//     generateReports(): void {
//         console.log('Generating accounting reports...');
//     }
// }

// let department: Department;         // 允许创建一个对抽象类型的引用
// // department = new Department();      // 错误: 不能创建一个抽象类的实例
// department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
// department.printName();
// department.printMeeting();
// department.generateReports();   // 错误: 方法在声明的抽象类中不存在


// class Person {
//     static desc: string = '人类';
//     name: string;
//     constructor (name: string) {
//         this.name = name
//     }
// }
// let p1 = new Person('Bob')
// console.log(p1.name)           // print: Bob
// // console.log(p1.desc)        // 报错提示：属性“desc”在类型“Person”上不存在
// console.log(Person.desc)       // print: 人类


// function printLog (arg: number): number {
//     return arg;
// }
// console.log(printLog(123))    // print: 123
// console.log(printLog('Bob'))  // 报错提示： 类型“string”的参数不能赋给类型“number”的参数。

// function printLog (arg: any): any {
//     return arg;
// }
// console.log(printLog(123))       // print: 123
// console.log(printLog('Bob'))     // print: Bob

// function printLog (arg: number | string) {
//     return ('' + arg) as typeof arg;
// }
// console.log(typeof printLog(123))       // print: 123
// console.log(typeof printLog('Bob'))     // print: Bob


// // 语法格式
// function printLog<T>(arg: T): T {
//     return arg;
// }
// // 方式一：指定类型
// console.log(printLog<number>(123))       // print: 123
// console.log(printLog<string>('Bob'))     // print: Bob
// // 方式二：类型推导
// console.log(printLog(123))       // print: 123
// console.log(printLog('Bob'))     // print: Bob


// // 亦可定义多个参数
// function change<T, U>(tuple: [T, U]): [U, T] {
//     return [tuple[1], tuple[0]]
// }
// console.log(change<string, number>(['Bob', 28]))    // print: [ 28, 'Bob' ]
// console.log(change(['Bob', 28]))                    // print: [ 28, 'Bob' ]



// 泛型接口
// interface GenericPrintLogFn {
//     <T>(arg: T): T;
// }
// interface GenericPrintLogFn2<T> {
//     (arg: T): T;
// }
// function printLog<T>(arg: T): T {
//     return arg;
// }
// let myPrintLog: GenericPrintLogFn = printLog;
// let myPrintLog2: GenericPrintLogFn2<number> = printLog;

// console.log(myPrintLog<number>(123))
// console.log(myPrintLog2(123))

// class GenericNumber<T> {
//     zeroValue: T;
//     add: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericNumber<number>()
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };
// console.log(myGenericNumber.add(1, 2))          // print: 3


// function printLog<T>(arg: T): T {
//     console.log(arg.length)
//     return arg;
// }

// interface Lengthwise {
//     length: number;
// }
// function printLog<T extends Lengthwise>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }
// console.log(printLog<string>('123'))


function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");    // okay
getProperty(x, "m");    // 提示报错：类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。



// function copyFields<T extends U, U>(target: T, source: U): T {
//     for (let id in source) {
//         target[id] = (<T>source)[id];
//     }
//     return target;
// }
// let y = { a: 1, b: 2, c: 3, d: 4 };
// copyFields(y, { b: 10, d: 20 });




