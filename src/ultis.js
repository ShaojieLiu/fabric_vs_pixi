/**
 * Created by liushaojie on 2017/6/14.
 */
var e = function(sel) {return document.querySelector(sel)}
var es = function(sel) {return Array.from(document.querySelectorAll(sel))}
var log = function(...arg) {console.log.apply(console, arg)}
// 随机整数生产: 数量, 范围的数组
var rand = function(...rangeArr) {
    var num = rangeArr.length
    let result = []
    for(let i = 0; i < num; i++) {
        let r = Math.floor(Math.random() * rangeArr[i])
        result.push(r)
    }
    return result
}
// 重复次数, 调用方法, 结果反馈选择器, draw的参数
let test = (num, fun, sel, arr) => {

    let t0 = new Date()
    for(let i = 0; i < num; i++) {
        fun(...rand(...arr))
        // log(fun.prototype.constructor.name)
    }
    let t1 = new Date()

    let ans = ` 用时 ${t1 - t0} ms`
    e(sel).innerText = e(sel).innerText.replace('{{result}}', ans)
}

var template = (name, dadClass, num, arr, diy) => {return `
    <span>${name}</span>
    ${diy || '<span></span>'}
    <div class="dad ${dadClass}">
        
        <div class="son">
            <span class="ans0">Native{{result}}</span>
            <canvas class="grandson" id='nt${num}' width=${arr[0]} height=${arr[1]} ></canvas>
        </div>
        
        <div class="son">
            <span class="ans1">Fabric.js{{result}}</span>
            <canvas class="grandson" id='fb${num}' width=${arr[0]} height=${arr[1]} ></canvas>
        </div>
        
        <div class="son">
            <span class="ans2">PIXI.js{{result}}</span>
        </div>
    </div>`
}

var insert = (...args) => {
    let t = template(...args)
    e('.main').insertAdjacentHTML('beforeend', t)
}