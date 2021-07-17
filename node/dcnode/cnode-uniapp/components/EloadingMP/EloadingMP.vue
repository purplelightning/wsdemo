<template>
	<view id="loading-wrapper" :class="[loadingType+ '-loading']" v-show="showLoading">
		<view class="modal-mask modal-transition">
			<view class="modal-wrapper">
				<view class="modal-container">
					<!--左眼开始-->
						<view class="eyesBoxs pullLeft">
							<!--轮廓开始-->
						<view class="skewLeft"></view>
							<view class="eyeshot"></view>
							<view class="eyeshot-inner"></view>
								<!--轮廓结束-->
								<!--写轮眼开始-->
								<view class="eyes ani-zoom">
									<view class="line">           
										<view class="tube ani-rotateTube">
											<span class="bar"></span>
											<span class="bar"></span>
											<span class="bar"></span>
										</view>
											<!--end-->
									</view>
							</view>
						</view>
					<!--左眼结束-->
				</view>
				<view style="text-align:center;clear:both"></view>
				</view>
			</view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
	computed:{
		...mapState(['showLoading', 'loadingType'])
	}
}
</script>

<style scoped lang="less">
#loading-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
	z-index: 100;
}
.modal-mask {
  background-color: rgba(188,111,111,.6);
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
		top: 60px;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, red, #fff);
    box-shadow:0 0 15px 0 rgba(222, 222,222,.8);
    border-radius: 50%;
    animation: big-circle 1.5s linear infinite;
    @keyframes big-circle{
      0%{
        transform:scale(1);
      }
      33%{
        transform:scale(2);
      }
      50%{
        transform:scale(4);
      }
      100%{
        transform:scale(8);
      }
		}
  }
	.eyeshot-inner{
		position: relative;
		width: 60px;
		height: 60px;
		background: radial-gradient(circle, red, #fff);
		box-shadow:0 0 15px 0 rgba(222,0,222,.8);
		border-radius: 50%;
		animation: small-circle 1.5s linear infinite;
		@keyframes small-circle{
		  0%{
		    transform:scale(1);
		  }
		  33%{
		    transform:scale(1.5);
		  }
		  50%{
		    transform:scale(2);
		  }
		  100%{
		    transform:scale(4);
		  }
		}
}
}
</style>
