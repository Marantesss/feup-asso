<template>
  <div>
    <FormCard @submitRepoUrl="analyzeRepo" />
    <Network
      id="main-network"
      ref="mynetwork"
      :nodes="nodes"
      :edges="edges"
      :options="options"
    >
    </Network>
  </div>
</template>

<script>
import FormCard from '~/components/FormCard'

export default {
  name: 'Vis',

  components: {
    FormCard,
  },

  data() {
    return {
      // create an array with nodes
      nodes: [
        { id: 1, label: 'Node 1', group: 'deprecatedGroup' },
        { id: 2, label: 'Node 2', color: '#ff0000', group: 'deprecatedGroup' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' },
      ],
      // create an array with edges
      edges: [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
      options: {
        // group styles
        groups: {
          deprecatedGroup: {
            color: { background: 'red' },
            borderWidth: 3,
          },
        },
        autoResize: true, // the Network will automatically detect when its container is resized, and redraw itself accordingly.
        width: '100%',
        height: '100%',
      },
    }
  },

  methods: {
    analyzeRepo(repoUrl) {
      console.log(repoUrl)
    },
  },
}
</script>

<style>
#main-network {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  padding-left: 24rem;
  min-height: 100vh;
  /* background-color: aquamarine; */
}
</style>
