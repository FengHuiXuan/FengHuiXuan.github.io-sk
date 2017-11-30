

var can = new createjs.Stage('canvas')
var obj = new createjs.Shape()




obj.graphics.beginFill('#000').drawRect(0,400,600,1)//定义颜色。以及坐标、宽高
can.addChild(obj)
var corols = ['blue', 'red', 'green', 'yellow','pink']
var sekuai
var arr = []

randomAllot()//生成十个不覆盖的坐标

console.log(arr)
for (var i = 0; i < corols.length; i++) { //定义五个色块
   sekuai = new createjs.Shape()
   sekuai.graphics.setStrokeStyle(1).beginStroke("#000");
   sekuai.graphics.beginFill(corols[i]).drawRect(0,0,100,100)
   sekuai.y = 420 
   sekuai.x = i*120+10
   can.addChild(sekuai)
}
let n = 0;
for (var i = 0; i < arr.length; i++) {
    i<5 ?n = i : n = i-5
    arr[i].corol = corols[n]
    
    tidongsekuan(i,n)
    
}

function tidongsekuan(i,n) {  //拖拽
  var shape = new createjs.Shape()
    shape.graphics.beginFill(arr[i].corol).drawCircle(0,0,arr[i].radius)
    shape.y = arr[i].y
    shape.x = arr[i].x
    shape.addEventListener('mousedown',function(e){
        can.addEventListener('stagemousemove',function(e){
            shape.x = e.rawX
            shape.y = e.rawY
            can.update()
        })
        can.addEventListener('stagemouseup',function(e){
            if(e.target.mouseY>=420 && e.target.mouseY<=520 && e.target.mouseX>=n*120+10 && e.target.mouseX<=n*120+110){
                shape.y = 470 
                shape.x = n*120+60
            }else{
                shape.y = arr[i].y
                shape.x = arr[i].x
            }
            e.target.removeAllEventListeners();
            can.update()
        })
    })


    can.addChild(shape)
}

can.update()

function randomAllot() {
    let obj = {};
    obj.radius = parseInt(Math.random()*20+40)
    suiji(obj)
    if(obj.x){
      arr.push(obj)
    }
    if(arr.length<10){
        randomAllot()
    }
}
function suiji(obj){
    let l = obj.radius
    let x = parseInt(Math.random()*(600-2*l)+l)
    let y = parseInt(Math.random()*(400-2*l)+l)
    for (var i = 0; i < arr.length; i++) {
        let r = l+arr[i].radius   
        let m = Math.sqrt((arr[i].x-x)*(arr[i].x-x) + (arr[i].y-y)*(arr[i].y-y))
        if( r > m){
            obj.x = false
            return obj 
        }
    }
    obj.x = x
    obj.y = y
    return obj
}
