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

const a = null