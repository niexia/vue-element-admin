import SearchBar from './src/index.vue';

SearchBar.install = function(Vue) {
  Vue.component(SearchBar.name, SearchBar);
}

export default SearchBar;