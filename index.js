/**
 * Created by liushaojie on 2017/6/14.
 */

var testOne = function() {
    var num = 9,
        main = e('.main')
    
    var testOneFB = function() {
        
    }    
    var testOnePX = function() {
        
    }
    
    testOneFB()
    testOnePX()

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
    testOne()
}
__main()