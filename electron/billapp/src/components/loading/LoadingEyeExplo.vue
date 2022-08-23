<template>
  <div>
    <div class="modal-mask modal-transition" >
      <div class="modal-wrapper">
        <div class="explose"></div>
        <div class="modal-container">
          <!--左眼开始-->
            <div class="eyesBoxs pullLeft">
              <!--轮廓开始-->
            <div class="skewLeft"></div>
              <div class="eyeshot"></div>
              <!--轮廓结束-->
              <!--写轮眼开始-->
              <div class="eyes ani-zoom">
                <div class="line">           
                  <div class="tube ani-rotateTube">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                  </div>
                </div>
              </div>
            </div>
          <!--左眼结束-->
        </div>
        <div style="text-align:center;clear:both"></div>
        </div>
        
      </div>
    </div>
</template>

<script>
let doms= []

export default {
  name: "Myloading",
  components: {},
  data() {
    return {
      container: '',
    };
  },
  mounted(){
    this.initDom()
  },
  methods: {
    initDom(){
      let dd=document.createDocumentFragment()
      for(let i =0;i<72;i++){
        let temp = document.createElement('p')
        // temp.innerHTML = i+1
        dd.appendChild(temp)
      }
      console.log(dd)
      this.container= document.querySelector('.explose')
      this.container.appendChild(dd)
      let conHeight = this.container.offsetHeight
      let conWidth = this.container.offsetWidth
      doms = this.container.querySelectorAll('p')
      for(let i =0;i< doms.length;i++){
        var a= i % 12* Math.ceil(conWidth/12)
        var b =parseInt(i / 12) * Math.ceil(conHeight/6)
        doms[i].style.width = Math.ceil(conWidth/12)+'px'
        doms[i].style.height = Math.ceil(conHeight/6)+'px'
        doms[i].style.left= a+'px'
        doms[i].style.top= b+'px'
        doms[i].style.backgroundPosition= (-a) + "px " + (-b) + "px"
      }
      this.animatePic()
    },
    // 爆炸动画
    animatePic(){
      doms.forEach(v=>{
        v.style.transition = "all 2s ease 0s"
      })
      this.container.classList.add('fei')
      setTimeout(function(){
        doms.forEach(v=>{
          v.style.transition = "none"
        })
      },2000);
    }
  },
};
</script>

<style lang="less">
.modal-mask {
  
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: table;
}
.modal-container {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%,-50%);
  .eyes{
    position:relative;
    top: -59px;
    left: 4px;
    width:55px;
    height:55px;
    background:#ff0000;
    border-radius:60%;
    box-shadow:0 0 2px 4px #bd0000 inset,0 0 0 2px #000;
    .line{
      width:64%;
      height:64%;
      background:#ff0000;
      position:absolute;
      right:0;
      left:0;
      top:10px;
      margin:0 auto;
      border-radius:60%;
      box-shadow:0 0 2px 0 #b20000 inset;
      &:before{
        content:"";
        display:block;
        width:10px;
        height:11px;
        position:absolute;
        left:3px;
        top:4px;
        z-index:100;
        border-radius:60%;
        background-image:radial-gradient(circle,rgb(225,225,225),rgb(225,225,225),rgba(225,225,225,0.7),rgba(225,225,225,0.3));
        -webkit-background-image:radial-gradient(circle,rgb(225,225,225),rgb(225,225,225),rgba(225,225,225,0.7),rgba(225,225,225,0.3));
        -o-background-image:radial-gradient(circle,rgb(225,225,225),rgb(225,225,225),rgba(225,225,225,0.7),rgba(225,225,225,0.3));
      }
      &:after{
        content:"";
        display:block;
        width:10px;
        height:10px;
        position:absolute;
        background:#f00;
        right:0;
        left:-1px;
        top:13px;
        z-index:100;
        margin:0 auto;
        border-radius:60%;
        transform:rotate(150deg);
      }
      .tube{
        width:93%;
        height:93%;
        position:absolute;
        right:0;
        left:0px;
        top:2px;
        margin:0 auto;
        background:#000;
        border-radius:60%;
      }
      .tube .bar{
        display:block;
        width:10px;
        height:20px;
        border-style:solid;
        border-width:0 0 0 10px;
        border-color:transparent transparent transparent black;
        position:absolute;
        border-radius:100% 0 0 0;
      }
      .tube .bar:nth-child(1){
        top:-10px;
        left:2px;
        transform:rotate(-10deg);
      }
      .tube .bar:nth-child(2){
        bottom:0px;
        right:-10px;
        transform:rotate(105deg);
        -webkit-transform:rotate(105deg);
        -o-transform:rotate(105deg);
      }
      .tube .bar:nth-child(3){
        bottom:-3px;
        left:-10px;
        transform:rotate(235deg);
        -webkit-transform:rotate(235deg);
        -o-transform:rotate(235deg);
      }
    }
  }
  .ani-rotateTube{			/*万花筒*/
    animation:ani-rotateTube 1s linear infinite;
  }
  @keyframes ani-rotateTube{
    0%{
      transform:scale(1) rotate(0);
    }
    50%{
      transform:scale(1) rotate(-180deg);
    }
    100%{
      transform:scale(1) rotate(-360deg);
    }
  }
  .ani-zoom,
  .ani-rotateTube,
  .eyes .line:after{
    animation-fill-mode:both;
  }

  .eyeshot{ // 环绕阴影，辐射背景
    position: relative;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, red, #fff);
    box-shadow:0 0 15px 0 rgba(222,222,222,.8);
    border-radius: 50%;
    animation: big-circle 1.5s linear infinite;
    @keyframes big-circle{
      0%{
        transform:scale(1);
      }
      33%{
        transform:scale(3);
      }
      50%{
        transform:scale(6);
      }
      100%{
        transform:scale(12);
      }
  }
  }
}
  //爆炸特效
  .explose{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    button{
      position: absolute;
      bottom:10px;
      right: 10px;
    }
    p{
      position: absolute;
      background-image:url('../assets/imgs/hy.jpg');
      font-size: 40px;
      // background-color: rgba(255,188,188,1);
    }
  }
  .fei{
    p{
      opacity: 0;
    }
    p:nth-child(12n+1){-webkit-transform:rotateX(30deg) rotateY(-60deg) translateZ(-400px);}
    p:nth-child(12n+2){-webkit-transform:rotateX(240deg) rotateY(-80deg) translateZ(400px);}
    p:nth-child(12n+3){-webkit-transform:rotateX(650deg) rotateY(10deg) translateZ(400px);}
    p:nth-child(12n+4){-webkit-transform:rotateX(-30deg) rotateY(-10deg) translateZ(400px);}
    p:nth-child(12n+5){-webkit-transform:rotateX(330deg) rotateY(-80deg) translateZ(400px) scale(0.2);}
    p:nth-child(12n+6){-webkit-transform:rotateX(80deg) rotateY(40deg) translateZ(500px);}
    p:nth-child(12n+7){-webkit-transform:rotateX(-30deg) rotateY(-10deg) translateZ(400px) scale(0.2);}
    p:nth-child(12n+8){-webkit-transform:rotateX(330deg) rotateY(-80deg) translateZ(400px) scale(0.1);}
    p:nth-child(12n+9){-webkit-transform:rotateX(50deg) rotateY(40deg) translateZ(-400px);}
    p:nth-child(12n+10){-webkit-transform:rotateX(650deg) rotateY(10deg) translateZ(200px) scale(0.1);}
    p:nth-child(12n+11){-webkit-transform:rotateX(-30deg) rotateY(-10deg) translateZ(800px);}
    p:nth-child(12n+12){-webkit-transform:rotateX(330deg) rotateY(-80deg) translateZ(-400px);}
  }
</style>

