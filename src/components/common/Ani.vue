<template>
  <div class="ani">
    <transition-group
      appear
      v-on:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
    >
      <slot></slot>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Ani',
  props: {
    mode: {
      type: String,
      default: 'right-left'
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const delay = el.dataset.index * 100;
      const modeArr = this.mode.split(' ');
      const animation =
        el.dataset.index % 2 === 0
          ? `${modeArr[0]} 0.6s infinite`
          : `${modeArr[1]} 0.6s infinite`;

      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ';
        el.style.opacity = 1;
        el.style.animation = modeArr[1]
          ? animation
          : `${modeArr[0]} 0.6s infinite`;
        el.style['animation-iteration-count'] = 1;
        done();
      }, delay);
    }
  }
};
</script>

<style lang="scss">
@keyframes right-left {
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes left-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes bottom-top {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes top-bottom {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes rotateX {
  0% {
    transform-origin: center top;
    transform: rotateX(75deg);
  }
  100% {
    transform-origin: center top;
    transform: rotateX(0deg);
  }
}
@keyframes rotateY {
  0% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
@keyframes rotateZ {
  0% {
    // transform-origin: right bottom;
    transform: rotateZ(45deg);
  }
  100% {
    // transform-origin: right bottom;
    transform: rotateZ(0deg);
  }
}
@keyframes scale {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
