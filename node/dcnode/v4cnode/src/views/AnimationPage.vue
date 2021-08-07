<template>
  <div id="animation-page">
  </div>
</template>

<script>
export default {
  props:['show'],
  data() {
    return {
      interval: ''
    }
  },
  mounted(){
    this.initAnimation()
  },
  watch:{
    show(){
      if(this.show){
        this.initAnimation()
      }else{
        this.closeAnimation()
      }
    }
  },
  methods:{
    initAnimation(){
      // js美化放烟花
      var canvas = document.createElement('canvas')
      document.body.appendChild(canvas)
      canvas.style.position='fixed'
      canvas.style.left='0'
      canvas.style.top='0'
      canvas.style.zIndex='-1'


      var context = canvas.getContext('2d')
      
      function resizeCanvas(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        clearCanvas()
      }
      function clearCanvas(){
        context.fillStyle = 'rgba(0,0,0,.9)'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      function mouseDownHandler(e){
        var x = e.clientX
        var y = e.clientY

        createFireworks(x, y)
      }
      document.addEventListener('mousedown', mouseDownHandler)

      var particles = []
      //自动烟花
      this.interval = setInterval(function(){
        createFireworks(Math.random()*canvas.width,Math.random()*canvas.height)
      }, 2000)

      function createFireworks(x, y){
        var count = 100
        var hue = Math.floor(Math.random()*51)+150
        var hueVarience = 30


        for(let i=0;i<count;i++){
          
          var p = {}
          var angle = Math.floor(Math.random()*360)
          p.radians = angle*Math.PI/180
          p.x = x
          p.y = y
          p.speed = (Math.random()*5)+.4
          p.radius = p.speed
          p.size = Math.floor(Math.random()*3)+1
          p.hue = Math.floor(Math.random() *((hue+hueVarience)-(hue-hueVarience)) + (hue-hueVarience))
          p.brightness = Math.floor(Math.random() * 31) +50
          p.alpha = (Math.floor(Math.random() * 61) + 40)/100

          particles.push(p)
        }
      }
      function drawFireworks(){
        clearCanvas()
        for( let i=0;i<particles.length;i++){
          var p = particles[i]
          var vx = Math.cos(p.radians) * p.radius
          var vy = Math.sin(p.radians) * p.radius + 0.4
          p.x+=vx
          p.y+=vy
          // 衰减
          p.radius *= 1-p.speed/100
          p.alpha -= 0.005
          if(p.x<0||p.x>canvas.width||p.y<0||p.y>canvas.height || p.alpha<=0){
            particles.splice(i,1)
          }

          context.beginPath()
          context.arc(p.x, p.y, p.size, 0, Math.PI*2, false)
          context.closePath()
          context.fillStyle = 'hsla('+p.hue+',100%,'+p.brightness+'%,'+p.alpha+')'
          context.fill()
        }
      }

      function tick(){
        //拖尾
        context.globalCompositeOperation = 'destination-out'
        context.fillStyle = 'rgba(0,0,0,.1)'
        context.fillRect(0,0,canvas.width,canvas.height)
        context.globalCompositeOperation='lighter'

        drawFireworks()
        requestAnimationFrame(tick)
      }
      tick()
    },
    closeAnimation(){
      clearInterval(this.interval)
      this.interval = ''

    }
  }
}
</script>

<style scoped lang="less">
#animation-page {
  div {
    outline: none;
  }
}
</style>
