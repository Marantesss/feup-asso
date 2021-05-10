<template>
  <div class="wrapper">
    <div class="title-section">
      <h1 class="title">Live Dependency Manager</h1>
      <h3 class="subtitle">Linda e Girão</h3>
    </div>
    <div class="container">
      <label for="fname">Github Repository URL:</label>
      <input v-model="repoUrl" class="input-text" type="text" name="fname" />
      <button class="button" @click="submitRepoUrl">Analyze</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',

  data() {
    return {
      repoUrl: '',
    }
  },

  methods: {
    submitRepoUrl() {
      this.$emit('submitRepoUrl', this.repoUrl)
    },
  },
}
</script>

<style scoped>
.title-section {
  margin: 2rem 0rem;
}

.wrapper {
  position: absolute;
  z-index: 10;
  box-shadow: 1px 1px 8px #444;
  padding: 2rem 2rem;
  width: 24rem;
  min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
