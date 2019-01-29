<template>
  <div class="logo">
    <div v-for="color in colors" v-bind:key="color" v-bind:style="{ background: color}"  class="square">
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    this.generateColors()
    setInterval(() => this.generateColors(), 8000)
  },
  data () {
    return {
      colors: []
    }
  },
  methods: {
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    generateColors () {
      this.colors = [...Array(9)].map(() => this.getRandomColor())
    }
  }
}
</script>

<style scoped>
.logo,
.logo * {
  box-sizing: border-box;
}
.logo {
  height: 20px;
  width: 20px;
  top: calc(-5px * 2 / 3);
}
.logo .square {
  height: 5px;
  width: 5px;
  top: calc(-5px * 2 / 3);
  margin-right: calc(5px / 3);
  margin-top: calc(5px / 3);
  float: left;
  position: relative;
  opacity: 0;
  animation: logo 8s infinite;
}
.logo .square:nth-child(1) {
  animation-delay: calc(400ms * 6);
}
.logo .square:nth-child(2) {
  animation-delay: calc(400ms * 7);
}
.logo .square:nth-child(3) {
  animation-delay: calc(400ms * 8);
}
.logo .square:nth-child(4) {
  animation-delay: calc(400ms * 3);
}
.logo .square:nth-child(5) {
  animation-delay: calc(400ms * 4);
}
.logo .square:nth-child(6) {
  animation-delay: calc(400ms * 5);
}
.logo .square:nth-child(7) {
  animation-delay: calc(400ms * 0);
}
.logo .square:nth-child(8) {
  animation-delay: calc(400ms * 1);
}
.logo .square:nth-child(9) {
  animation-delay: calc(400ms * 2);
}
.logo .clear {
  clear: both;
}
@-moz-keyframes logo {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
@-webkit-keyframes logo {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
@-o-keyframes logo {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
@keyframes logo {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}

</style>

