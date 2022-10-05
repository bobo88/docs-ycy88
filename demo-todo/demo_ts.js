function login(options, cb) {
    console.log(options.username, options.token, options.password);
    cb();
}
function hello(name) {
    return name;
}
hello('Bob');
hello(123);
var a = null;
var isOK = true;
var str = 'abc';
var isNull = null;
var age = 18;
var empty = undefined;
var s1 = Symbol();
str = null;
str = undefined;
function alertSth(name) {
    alert("\u5F39\u51FA\u7684\u540D\u5B57\u662F: " + name);
}
alertSth('Bob');
var unusable = undefined;
var an = 123;
an = 'Bob';
an = true;
an.toString();
an.hello();
