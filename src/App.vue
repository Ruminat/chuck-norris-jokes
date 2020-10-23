<template lang="pug">
.app
  .columns
    //- Chuck's picture
    .half.chuck-image
      .wrapper
        img.the-greatest(src="@/assets/chuck2.png")
    //- Content
    .half.content
      .wrapper
        //- Tell me a joke button
        .input-group
          button.btn.btn-success.input-group-btn(@click="getJoke" style="width: 6rem;")
            span(v-if="!loading") Tell me a joke
            .loading(v-else)
        .input-group
          //- Categories
          .dropdown
            a.btn.btn-error.input-group-btn.dropdown-toggle(href='#' tabindex='0')
              | In category [{{ currentCategory }}]
              i.icon.icon-caret
            ul.menu
              li.menu-item(v-for="category in categories" :key="category" @click="changeCategory(category)")
                a(href="#") {{ category }}
          //- The word
          span.input-group-addon With a word
          input.form-input(placeholder="Russia" v-model="word" @keyup.enter="getJoke")
        //- The joke's text
        textarea.form-input(spellcheck="false" readonly v-model="currentJoke" rows="4")
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      currentJoke: '',
      currentCategory: 'any',
      word: '',
      loading: false,
      categories: ['any', 'animal', 'career', 'celebrity', 'dev', 'explicit', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'political', 'religion', 'science', 'sport', 'travel']
    }
  },
  methods: {
    async getJoke () {
      this.loading = true
      const word = this.word.trim()
      try {
        // Searching without the word.
        if (!word) {
          const category = this.currentCategory !== 'any' ? `?category=${this.currentCategory}` : ''
          const url = `https://api.chucknorris.io/jokes/random${category}`
          const joke = await fetch(url).then(res => res.json())
          this.currentJoke = joke.value
        // Searching with the word.
        } else {
          const query = encodeURIComponent(word)
          const url = `https://api.chucknorris.io/jokes/search?query=${query}`
          const jokes = await fetch(url).then(res => res.json())
          if (jokes.total > 0) {
            const joke = jokes.result[Math.round((jokes.total + 1) * Math.random() - 0.5)]
            this.currentJoke = joke.value
          } else {
            this.currentJoke = `Not a single soul dared to write a «${word}» joke about Chuck Norris. Try another one.`
          }
        }
      } catch (err) {
        console.log('something went wrong', err)
      }
      this.loading = false
    },
    changeCategory (category) {
      this.currentCategory = category
    }
  },
  mounted () {
    this.getJoke()
  }
}
</script>

<style lang="sass">
@import '@/sass/main.sass'
</style>
