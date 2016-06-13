$(function(){
  var ctx=$("#canvas").get(0).getContext("2d")
  var canvasSize=600
  var block=15
  var off=canvasSize/block
  var huizhi=function(){
    ctx.save()
    ctx.beginPath()
    ctx.translate((off/2)+0.5,(off/2)+0.5)
    ctx.moveTo(0,0)
    ctx.lineTo(canvasSize-off,0)
    for(var i=0;i<14;i++){
      ctx.translate(0,off)
      ctx.moveTo(0,0)
      ctx.lineTo(canvasSize-off,0)
    }
    ctx.strokeStyle="#ffffff"
    ctx.stroke()
    ctx.closePath()
    ctx.restore()

    ctx.save()
    ctx.beginPath()
    ctx.translate((off/2)+0.5,(off/2)+0.5)
    ctx.moveTo(0,0)
    ctx.lineTo(0,canvasSize-off)
    for(var i=0;i<14;i++){
      ctx.translate(off,0)
      ctx.moveTo(0,0)
      ctx.lineTo(0,canvasSize-off)
    }
    ctx.strokeStyle="#ffffff"
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    var p=[3.5*off,11.5*off]
    for(var i=0;i<2;i++){
      for(var j=0;j<2;j++){
        ctx.save()
        ctx.beginPath()
        ctx.translate(p[i],p[j])
        ctx.arc(0,0,4,0,(Math.PI/180)*360)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
      }
    }
    ctx.save()
    ctx.beginPath()
    ctx.translate(7.5*off,7.5*off)
    ctx.arc(0,0,4,0,(Math.PI/180)*360)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
  huizhi()
  var all={}
  var kaiguan=true
  var step=1
   chuzi=function(q){
    var x=(q.x+0.5)*off
    var y=(q.y+0.5)*off
    ctx.save()
    ctx.beginPath()
    ctx.translate(x,y)
    ctx.arc(0,0,15,0,(Math.PI/180)*360)
    if(q.color===0){
      // var img=$("#w").get(0)
      // img.src="./w.png"
      ctx.fillStyle="#fff"
    }else{
      // var img=$("#b").get(0)
      // img.src="./b.png"
      ctx.fillStyle="#000"
    }
    ctx.fill()
    // ctx.drawImage(img,-15,-15)
    ctx.closePath()
    ctx.restore()
  }
  $("#canvas").on("click",function(e){
    x=Math.floor(e.offsetX/off)
    y=Math.floor(e.offsetY/off)
    var qizi
    if(all[x+"-"+y]){
      return
    }
    if(kaiguan){
       qizi={x:x,y:y,color:1,step:step}
       $("#audio1").get(0).play()
       kaiguan=false
    }else{
       qizi={x:x,y:y,color:0,step:step}
      $("#audio2").get(0).play()
       kaiguan=true
    }
    step+=1
    chuzi(qizi)
    all[x+"-"+y]=qizi
    panduan(qizi)
  })
  var panduan=function(qizi){
      var shuju={}
      $.each(all,function(i,v){
        if(v.color===qizi.color){
          shuju[i]=v
        }
      })
      var shu=1
      var hang=1
      var zuo=1
      var you=1
      var tx,ty
      tx=qizi.x
      ty=qizi.y
      while(shuju[tx+"-"+(ty-1)]){
        shu++
        ty--
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[tx+"-"+(ty+1)]){
        shu++
        ty++
      }
      tx=qizi.x
      ty=qizi.y
      while (shuju[(tx-1)+"-"+ty]){
        hang++
        tx--
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[(tx+1)+"-"+ty]){
        hang++
        tx++
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[(tx+1)+"-"+(ty-1)]){
        zuo++
        tx++
        ty--
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[(tx-1)+"-"+(ty+1)]){
        zuo++
        tx--
        ty++
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[(tx+1)+"-"+(ty+1)]){
        you++
        tx++
        ty++
      }
      tx=qizi.x
      ty=qizi.y
      while(shuju[(tx-1)+"-"+(ty-1)]){
        you++
        tx--
        ty--
      }
      if(shu>=5||hang>=5||zuo>=5||you>=5){
        if(qizi.color===0){
          $(".fg").css("display","block")
          $("strong").text("白棋赢")
        }
        else if(qizi.color===1){
          $(".fg").css("display","block")
          $("strong").text("黑棋赢")
        }
      }
  }
  $("i").on("click",function(){
    $(".fg").hide()
    ctx.clearRect(0,0,600,600)
    all={}
    kaiguan=true
    step=0
    huizhi()
  })
  $(".k").on("click",false)
  $(".fg").on("click",function(){
    $(".fg").hide()
    ctx.clearRect(0,0,600,600)
    all={}
    kaiguan=true
    step=0
    huizhi()
  })
  $("#jixu").on("click",function(){
    $(".fg").hide()
    ctx.clearRect(0,0,600,600)
    all={}
    kaiguan=true
    step=0
    huizhi()
  })
  $("#qipu").on("click",function(){
    $(".fg").hide()
    for(var i in all){
      if(all[i].color===0){
        ctx.fillStyle="#000"
      }else{
        ctx.fillStyle="#fff"
      }
      ctx.save()
      ctx.beginPath()
      ctx.translate((all[i].x+0.5)*off,(all[i].y+0.5)*off)
      ctx.font="20px serif"
      ctx.textAlign="center"
      ctx.textBaseline="middle"
      ctx.fillText(all[i].step,0,0)
      ctx.closePath()
      ctx.restore()
    }
    $("a").css("display","block")
    console.dir($("#canvas").get(0))
    var image=$("#canvas").get(0).toDataURL('image/jpg',1)
    console.log(image)
    $("a").attr("href",image)
    $("a").attr("download","qipu.png")
  })
})
