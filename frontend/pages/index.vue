<template>
  <div>
    <SideBar @submitRepoUrl="analyzeRepo" />
    <div
      v-if="loading"
      :class="[{ 'spinner-container-focus': loading }, 'spinner-container']"
    >
      <Spinner />
    </div>
    <Network
      id="main-network"
      ref="mynetwork"
      :class="{ close: !sidebarOpen, open: sidebarOpen }"
      :nodes="nodes"
      :edges="edges"
      :options="options"
    >
    </Network>
    <button class="button toggle-sidebar-button" @click="toggleSidebar">
      Toggle Sidebar
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SideBar from '~/components/SideBar'
import Spinner from '~/components/helpers/Spinner'

export default {
  name: 'Vis',

  components: {
    SideBar,
    Spinner,
  },

  data() {
    return {
      loading: false,
      error: false,
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

  computed: {
    ...mapGetters(['sidebarOpen']),
  },

  methods: {
    async analyzeRepo(repoUrl) {
      this.loading = true
      console.log(repoUrl)
      /*
      const res = await this.$axios.get('/', {
        repoUrl,
      })
      console.log(res)
      */
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.loading = false
    },
    ...mapActions({
      toggleSidebar: 'toggleSidebar',
    }),
  },
}
</script>

<style>
.toggle-sidebar-button {
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  z-index: 10;
}

.spinner-container {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  margin-left: 24rem;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner-container-focus {
  background-color: var(--main-grey-opaque);
}

.close {
  padding-left: 0rem;
}

.open {
  padding-left: 24rem;
}

#main-network {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  min-height: 100vh;
  /* background-color: aquamarine; */
}
</style>
