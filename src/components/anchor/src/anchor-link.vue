<template>
  <div :class="anchorLinkClass">
    <a
      :class="linkTitleClass"
      :href="href"
      :data-href="href"
      :title="title"
      @click.prevent="goAnchor">
      {{ title }}
    </a>
  </div>
</template>
<script>
export default {
  name: 'AnchorLink',
  inject: ['anchor'],
  props: {
    href: String,
    title: String,
  },
  data() {
    return {};
  },
  computed: {
    anchorLinkClass() {
      return ['anchor-link', this.anchor.currentLink === this.href && 'is-active'];
    },
    linkTitleClass() {
      return ['anchor-link-title'];
    }
  },
  methods: {
    goAnchor() {
      this.anchor.currentLink = this.href;
      this.anchor.currentId = this.href.split('#')[1];
      this.anchor.handleScrollTo();
      this.anchor.$emit('on-select', this.href);
    }
  }
}
</script>