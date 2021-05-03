<template>
  <Network
    id="main-network"
    ref="mynetwork"
    :nodes="nodes"
    :edges="edges"
    :options="options"
  >
  </Network>
</template>

<script>
export default {
  name: 'Vis',

  data() {
    return {
      // create an array with nodes
      nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
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
      options: {},
    }
  },
}
</script>

<style>
#main-network {
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  min-height: 100vh;
  /* background-color: aquamarine; */
}
</style>
