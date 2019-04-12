<template>
  <div>
    <div :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <div :class="`${prefix}`">
        <div :class="`${prefix}-ink`">
          <span
            v-show="showLink"
            :class="`${prefix}-ink-ball`"
            :style="{top: `${inkTop}px`}">
          </span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import {scrollTop, findComponentsDownward} from 'utils/assist.js';
import {on, off} from 'utils/dom.js';
export default {
  name: 'Anchor',
  provide() {
    return {
      anchor: this
    };
  },
  props: {
    offsetTop: { // 距离窗口顶部达到指定“偏移量”后触发
      type: Number,
      default: 0
    },
    offsetBottom: { // 距离窗口底部达到指定“偏移量”后触发
      type: Number,
      default: 0
    },
    bounds: { // 锚点区域边界
      type: Number,
      default: 5
    },
    container: null, // 指定滚动的容器。可以是选择器 (String)，或者是 DOM (HTMLElement)
    showLink: { // 是否显示小圆点
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefix: 'anchor',
      animating: false, // 是否正在 scroll
      currentLink: '', // #href
      currentId: '', // href
      scrollContainer: null, // 滚动的容器
      scrollElement: null, // 滚动的元素
      titlesOffsetArr: [],
      upperFirstTitle: true,
      wrapperTop: 0,
      inkTop: 0,
    }
  },
  computed: {
    wrapperStyle() {
      return {
        maxHeight: this.offsetTop ? `calc(100vh - ${this.offsetTop}px)` : '100vh'
      };
    },
    containerIsWindow() {
      return this.scrollContainer === window;
    }
  },
  watch: {
    container() {
      this.init();
    },
    currentLink(val, oldVal) {
      this.$emit('on-change', val, oldVal);
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy () {
    this.removeListener();
  },
  methods: {
    // 滚动事件处理
    handleScroll(e) {
      this.upperFirstTitle = e.target.scrollTop < this.titlesOffsetArr[0].offset;
      if (this.animating) return;
      this.updateTitleOffset();
      const scrollTop = e.target.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      this.getCurrentScrollAtTitleId(scrollTop);
    },

    // 滚动到指定位置
    handleScrollTo() {
      const anchor = document.getElementById(this.currentId);
      if (!anchor) return;
      // 目标元素的偏移高度 offsetTop
      const offsetTop = anchor.offsetTop - this.wrapperTop;
      this.animating = true;
      // 执行滚动，将容器从 scrollTop 滚动到 offsetTop
      scrollTop(this.scrollContainer, this.scrollElement.scrollTop, offsetTop, 600, () => {
        this.animating = false;
      });
      // 设置锚点的位置
      this.handleSetInkTop();
    },

    // 设置锚点的高度也就是位置
    handleSetInkTop() {
      const currentLinkElement = document.querySelector(`a[data-href="${this.currentLink}"`);
      if (currentLinkElement) return;
      const elementTop = currentLinkElement.offsetTop;
      // TODO: what is this.offsetTop?
      this.inkTop = elementTop < 0 ? this.offsetTop : elementTop;
    },

    // 更新锚点的偏移
    updateTitleOffset() {
      const links = findComponentsDownward(this, 'AnchorLink').map(link => {
        return link.href.split("#")[1];
      });
      let offsetArr = [];
      links.forEach(id => {
        const titleEle = document.getElementById(id);
        if (titleEle) {
          offsetArr.push({
            link: `#${id}`,
            offset: titleEle.offsetTop - this.scrollElement.offsetTop
          });
        }
      });
      this.titlesOffsetArr = offsetArr;
    },

    // 滚动之后，获取当前滚动到的位置对应的是哪个锚点
    getCurrentScrollAtTitleId(scrollTop) {
      console.log('scrollTop:', scrollTop)
      let index = -1;
      let length = this.titlesOffsetArr.length;
      while (++index < length) {
        let [currentEle, nextEle] = [this.titlesOffsetArr[index], this.titlesOffsetArr[index+1]];
        if (scrollTop >= currentEle.offset && scrollTop < ((nextEle && nextEle.offset) || Infinity)) { // 在某个内容区间
          this.currentLink = currentEle.link;
          break;
        }
      }
      this.handleSetInkTop();
    },

    // 获取滚动容器和滚动元素
    getContainer() {
      this.scrollContainer = this.container
        ? typeof this.container === 'string'
          ? document.querySelector(this.container)
          : this.container
        : window;
      this.scrollElement = this.container
        ? this.scrollContainer
        : (document.documentElement || document.body);  
    },

    // 删除事件监听
    removeListener() {
      off(this.scrollContainer, 'scroll', this.handleScroll);
    },

    // 初始化
    init() {
      this.$nextTick(() => {
        this.removeListener();
        this.getContainer();
        this.wrapperTop = this.containerIsWindow ? 0 : this.scrollElement.offsetTop;
        // this.handleScrollTo();
        // this.handleSetInkTop();
        this.updateTitleOffset();
        this.updateFirstTitle = this.scrollElement.scrollTop < this.titlesOffsetArr[0].offset;
        on(this.scrollContainer, 'scroll', this.handleScroll);
      })
    }

  }
}
</script>
<style scoped>

</style>
