/**
 * Created by liushaojie on 2017/6/14.
 */

var num = 599,
    main = e('.main'),
    canvasW = 300,
    canvasH = 500,
    radius = 50

var testOne = function() {
    var dadClass = `game1`,
        gameNum = 1

    insert(`依次绘制${num}个圆圈`, dadClass, gameNum, [canvasW, canvasH])

    var testOneNT = function() {
        var canvas = e(`#nt${gameNum}`),
            drawCircleNT = function(x, y, r) {
                var ctx = canvas.getContext("2d")
                ctx.beginPath()
                ctx.strokeStyle = 'green'
                ctx.arc(x, y, r, 0, 2 * Math.PI, false)
                ctx.stroke()
            }
        // 重复次数, 调用方法, 结果反馈选择器, draw的参数
        test(num, drawCircleNT, `.${dadClass} .ans0`, [canvasW, canvasH, radius])
    }

    var testOneFB = function() {
        var canvas = new fabric.StaticCanvas(`fb${gameNum}`),
            drawCircleFB = function(x, y, r) {
                var circ = new fabric.Circle({
                    left: x, top: y, radius: r, strokeWidth: 1, stroke: 'red', fill: 'transparent'
                })
                // log(circ)
                canvas.add(circ)
            }
            var c = canvas.getElement(); // canvas = fabric.Canvas
            var w = c.width, h = c.height;
            c.setAttribute('width', w/window.devicePixelRatio);
            c.setAttribute('height', h/window.devicePixelRatio);
        // 重复次数, 调用方法, 结果反馈选择器, draw的参数
        test(num, drawCircleFB, `.${dadClass} .ans1`, [canvasW, canvasH, radius])
    }

    var testOnePX = function() {
        var renderer = new PIXI.CanvasRenderer(canvasW, canvasH, {antialias: true, transparent: true, resolution: 1})
        renderer.view.classList.add('grandson')
        renderer.view.id = `px${gameNum}`
        es(`.${dadClass} .son`)[2].appendChild(renderer.view)
        var stage = new PIXI.Container()
        var circArr = new PIXI.Container()
        var drawCirclePX = function(x, y, r) {
            var circ = new PIXI.Graphics();
            circ.lineStyle(1, 0x3355ff, 1)
            // circ.beginFill(0x9966FF);
            circ.drawCircle(0, 0, r)
            circ.x = x;
            circ.y = y;
            // circ.endFill()
            circArr.addChild(circ)
            stage.addChild(circArr)
            renderer.render(stage)
        }
        test(num, drawCirclePX, `.${dadClass} .ans2`, [canvasW, canvasH, radius])
    }

    return [testOneNT, testOneFB, testOnePX]
}

var testTwo = function() {
    var dadClass = `game2`,
        gameNum = 2


    insert(`同时绘制${num}个圆圈`, dadClass, gameNum, [canvasW, canvasH])

    var testTwoNT = function() {
        var canvas = e(`#nt${gameNum}`),
            drawCircleNT = function(x, y, r) {
                var ctx = canvas.getContext("2d")
                ctx.beginPath()
                ctx.strokeStyle = 'green'
                ctx.arc(x, y, r, 0, 2 * Math.PI, false)
                ctx.stroke()
            }
        // 重复次数, 调用方法, 结果反馈选择器, draw的参数
        test(num, drawCircleNT, `.${dadClass} .ans0`, [canvasW, canvasH, radius])
    }

    var testTwoFB = function() {
        var canvas = new fabric.StaticCanvas(`fb${gameNum}`),
            sel = `.${dadClass} .ans1`,
            arr = [canvasW, canvasH, radius],
            circArr = []
            drawCircleFB = function(x, y, r) {
                var circ = new fabric.Circle({
                    left: x, top: y, radius: r, stroke: 'red', fill: 'transparent'
                })
                circArr.push(circ)
            }
            var c = canvas.getElement(); // canvas = fabric.Canvas
            var w = c.width, h = c.height;
            c.setAttribute('width', w/window.devicePixelRatio);
            c.setAttribute('height', h/window.devicePixelRatio);

        // 重复次数, 调用方法, 结果反馈选择器, draw的参数
        let t0 = new Date()
        for(let i = 0; i < num; i++) {
            drawCircleFB(...rand(...arr))
            // log(fun.prototype.constructor.name)
        }
        // circArr.forEach(function(ele) {
        //     canvas.add(ele)
        // })
        var group = new fabric.Group(circArr, {left: 0, top: 0})
        canvas.add(group)
        // let t1 = new Date()
        let ans = ` 用时 ${new Date() - t0} ms`
        e(sel).innerText = e(sel).innerText.replace('{{result}}', ans)


    }

    var testTwoPX = function() {
        var renderer = new PIXI.autoDetectRenderer(canvasW, canvasH, {antialias: true, transparent: true, resolution: 1})
        renderer.view.classList.add('grandson')
        renderer.view.id = `px${gameNum}`
        es(`.${dadClass} .son`)[2].appendChild(renderer.view)
        var stage = new PIXI.Container()
        var circArr = new PIXI.Container()
        var drawCirclePX = function(x, y, r) {
            var circ = new PIXI.Graphics();
            circ.lineStyle(1, 0x3355ff, 1)
            // circ.beginFill(0x9966FF);
            circ.drawCircle(0, 0, r)
            circ.x = x;
            circ.y = y;
            // circ.endFill()
            circArr.addChild(circ)
            stage.addChild(circArr)
        }
        let t0 = new Date()
        test(num, drawCirclePX, `.${dadClass} .ans2`, [canvasW, canvasH, radius])
        log(stage)
        renderer.render(stage)
        // renderer.render(stage)
        let t1 = new Date()
        let ans = `PIXI.js 用时 ${t1 - t0} ms`
        e(`.${dadClass} .ans2`).innerText = ans

    }

    return [testTwoNT, testTwoFB, testTwoPX]
}

var begin = function() {
    var type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }
    PIXI.utils.sayHello(type)
}
var __main = function() {
    begin()
    waterFall(...testOne(), ...testTwo(), ...testThree())
    // waterFall(...testTwo(), ...testThree())
}
__main()