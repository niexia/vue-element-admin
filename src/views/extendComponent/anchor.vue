<template>
  <div class="main__anchor">
    <main>
      <template v-for="i in 300">
        <h1 v-if="(i - 1) % 30 === 0" :key="`h1${i}`" :id="`title-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 69" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <h1 v-if="i === 75" :key="`h1${i}`" :id="`title-child-${i}`">{{ `title-${i}` }}</h1>
        <p v-else :key="`p${i}`">{{ `content-row-index-${i}` }}</p>
      </template>
    </main>
    <aside>
      <anchor :bounds="100" :offset-top="30" :scroll-offset="100" container=".views__content" show-ink>
				<anchor-link v-for="link in 300" :key="`link${link}`" v-if="(link - 1) % 30 === 0" :href="`#title-${link}`" :title="`title-${link}`">
            <anchor-link :scroll-offset="20" v-if="link === 61" href="#title-child-69" title="title-child-69"/>
        </anchor-link>
			</anchor>
    </aside>
  </div>
</template>
<script>
export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    
  }
}
</script>
<style scoped>
.main__anchor {
  display: flex;
}
.main__anchor main {
  flex: 1;
  background: #fff;
}
.main__anchor aside {
  width: 200px;
  background: #fff;
}
</style>

