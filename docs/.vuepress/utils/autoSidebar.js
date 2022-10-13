// 侧边栏
const fs = require('fs')
const path = require('path')

function getChildren(path, sort = true) {
    // console.log(111, path)
    // 相对路径
    let prPath = ''
    let root = []
    readDirSync(path, root)
    // console.log(777, root)
    root = root.map(item=>{
        if (item.split('/')[3]) {
            return '/' + item.split('/')[2] + '/' + item.split('/')[3]
        } else {
            return '/' + item.split('/')[2]
        }
    })
    // console.log(8888, root)
    // 排序
    if (sort) {
        let sortList = []
        let nosortList = []
        root.forEach(item=>{
            if (item.replace(".md","").match(/\d+_/)) {
                sortList.push(item)
            } else {
                nosortList.push(item)
            }
        })
        // console.log('xxxx: ', sortList)
        root = sortList.sort(function(a, b) {
            return parseInt(a.replace(".md","").match(/\d+_/)[0]) - parseInt(b.replace(".md","").match(/\d+_/)[0])
        }).concat(nosortList)
    }
    
    return root.map(item => {
        let splitArr = item.split('/');
        // 返回一个二维数组
        return [
            item.split('.md')[0],
            splitArr[splitArr.length - 1].split('.md')[0]
        ]
    });
}

function readDirSync(path, root){
    // console.log(222, path, root)
    var pa = fs.readdirSync(path);
    // console.log(444, pa)
    pa.forEach(function(ele, index) {
        var info = fs.statSync(path+"/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + ele, root)
        } else {
            if (checkFileType(ele)) {
                root.push(prefixPath(path, ele))
            }
        }
    })
}

function checkFileType (path) {
    return path.includes(".md") && !path.includes("README.md") && !path.includes("_hidden.md")
}

function prefixPath (basePath, dirPath) {
    // console.log(333, basePath, dirPath)
    let index = basePath.indexOf("/");
    // 去除一级目录地址
    basePath = basePath.slice(index, path.length)
    // console.log(555, index, basePath)
    // replace用于处理windows电脑的路径用\表示的问题
    return path.join(basePath, dirPath).replace(/\\/g,"/")
}

module.exports = {
    getChildren
}
