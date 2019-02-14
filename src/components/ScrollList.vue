<template>
  <div style="margin-top: 50px;" class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-0">
    <md-scroll-view
      ref="scrollView"
      @scroll="$_onScroll"
    >
      <div
        v-for="friend in friends"
        class="scroll-view-item"
        :key="friend.id"
        @click="$_onItemClick(i)"
      >
        {{friend.name}}
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import { ScrollView, Toast } from 'mand-mobile'

export default {
  name: 'scroll-list',
  components: {
    [ScrollView.name]: ScrollView
  },
  props: {
    friends: Array
  },
  data () {
    return {
      list: 5
    }
  },
  mounted () {
    window.ScrollViewTrigger0 = () => {
      this.addItems()
    }
  },
  methods: {
    $_onItemClick (i) {
      Toast.info(`Click ${i}`)
    },
    $_onScroll ({scrollLeft, scrollTop}) {
      console.log(`[Mand Mobile ScrollView - demo0 - onScroll] scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`)
    },
    addItems () {
      this.list += 5
      this.$refs.scrollView.reflowScroller()
    }
  }
}

</script>

<style lang="css" scoped>
.md-example-child-scroll-view-0 {
  height: 100%;
  background: gray;
}
.md-example-child-scroll-view-0 .scroll-view-item {
  padding: 20px 0;
  text-align: center;
  font-size: 28px;
  font-family: DINAlternate-Bold;
  border-bottom: 0.5px solid #efefef;
}
</style>
