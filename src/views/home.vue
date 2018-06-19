<template>
    <div>
      <h1><span>{{name}}</span></h1>
      <p>Framework fullstack</p>
    </div>
</template>

<script>
export default {
    name:'main',
    data(){
        return {}
    }
}
</script>

<style scoped>
  body {
  font-family: Futura PT, serif;
  background: #9064eb;
  background: -moz-linear-gradient(-45deg, #49ff9b -20%, #7f4dea 100%);
  background: -webkit-linear-gradient(-45deg, #49ff9b -20%, #7f4dea 100%);
  background: linear-gradient(135deg, #49ff9b -20%, #7f4dea 100%);
  background-repeat: no-repeat;
  color: white;
  padding: 75px 0;
  min-height: 100vh;
}
div {
  margin: 0 auto;
  width: 405px;
}
h1 {
  font-family: Futura PT, sans-serif;
  font-weight: 900;
  font-size: 70px;
  margin-bottom: 0;
  letter-spacing: 15px;
  position: relative;
  z-index: 1;
  opacity: 0;
  -webkit-animation: slideBot 0.8s ease 0.15s forwards;
  animation: slideBot 0.8s ease 0.15s forwards;
}
h1 span {
  position: relative;
  z-index: 10;
}
h1 span:before {
  content: "";
  display: inline-block;
  width: 380px;
  position: absolute;
  height: 380px;
  background: url("http://ismanfromes.be/projets/codepen/casque.png") no-repeat;
  background-size: 100%;
  top: -150px;
  left: -40px;
  z-index: -1;
  opacity: 0;
  -webkit-transition: all 0.5s 0.4s ease;
  transition: all 0.5s 0.4s ease;
}
h1:after {
  content: "";
  display: inline-block;
  width: 80px;
  height: 2px;
  background: #7f4dea;
  opacity: 0.1;
  position: absolute;
  bottom: 0px;
  margin: 0 auto;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
p {
  margin: 10px auto;
  position: relative;
  z-index: 20;
  text-align: center;
  width: 280px;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  -webkit-animation: slideBot 0.75s ease 0.5s forwards;
  animation: slideBot 0.75s ease 0.5s forwards;
}
.scroll-down-wrapper {
  margin-top: 100px;
  width: 18px;
  height: 50px;
  opacity: 0;
  -webkit-transition: all 1s 1s ease;
  transition: all 1s 1s ease;
}
.scroll-down-wrapper span {
  display: block;
  width: 18px;
  height: 14px;
  text-indent: -999px;
  background: url("http://ismanfromes.be/projets/codepen/down-arrow.svg") no-repeat;
  background-size: cover;
  animation: scroll-Anim 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite reverse;
}
.scroll-down-wrapper span:nth-child(1) {
  animation-delay: 0.2s;
}
.scroll-down-wrapper span:nth-child(2) {
  animation-delay: 0.4s;
}
.scroll-down-wrapper span:nth-child(3) {
  animation-delay: 0.6s;
}
.scroll-down-wrapper.fadeIn {
  opacity: 1;
}
.slideTop:before {
  top: -35px;
  opacity: 1;
}
@-webkit-keyframes slideBot {
  0% {
    -webkit-transform: translateY(75px);
    opacity: 0;
  }
  75% {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideBot {
  0% {
    -webkit-transform: translateY(75px);
    opacity: 0;
  }
  75% {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
}
@-webkit-keyframes scroll-Anim {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes scroll-Anim {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

</style>

