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
