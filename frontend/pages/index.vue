<template>
  <div>
    <SideBar @submitRepoUrl="analyzeRepo" />
    <div
      v-if="loading"
      :class="['spinner-container', { 'spinner-container-focus': loading }]"
    >
      <Spinner />
    </div>
    <client-only>
      <Network
        id="main-network"
        ref="mynetwork"
        :class="{ close: !sidebarOpen, open: sidebarOpen }"
        :nodes="nodes"
        :edges="edges"
        :options="options"
      />
    </client-only>
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
      nodes: [],
      // create an array with edges
      edges: [],
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
      try {
        const res = await this.$axios.get('/', {
          repoUrl,
        })

        this.edges = res.data.edges
        this.nodes = res.data.nodes
      } catch (err) {
        console.log(err)
      }

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
