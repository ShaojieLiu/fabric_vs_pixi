/**
 * Created by liushaojie on 2017/6/15.
 */

var  testThree = function() {
    var dadClass = `game3`,
        gameNum = 3,
        btn = `
            <div class="btn-group">
                <button id="btnNT">Native</button>
                <button id="btnFB">Fabric</button>
                <button id="btnPX">PIXI</button>
            </div>
            <input id="ballNum-input" type="text">
            <button id="ballNum-enter">确定输入 并 刷新</button>
        `

    insert(`${num}个圆圈的动画`, dadClass, gameNum, [canvasW, canvasH], btn)

    var testThreeNT = function() {
        var canvas = e(`#nt${gameNum}`),
            drawCircleNT = function(x, y, r) {
                var ctx = canvas.getContext("2d")
                ctx.beginPath()
                ctx.strokeStyle = 'green'
                ctx.arc(x, y, r, 0, 2 * Math.PI, false)
                ctx.stroke()
            }
    }

    return [testThreeNT]
}