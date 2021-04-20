<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">frontend</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
    <div id="arc"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'Index',

  data() {
    return {
      gdp: [
        { country: 'USA', value: 20.5 },
        { country: 'China', value: 13.4 },
        { country: 'Germany', value: 4.0 },
        { country: 'Japan', value: 4.9 },
        { country: 'France', value: 2.8 },
      ],
    }
  },

  mounted() {
    this.generateArc()
  },
  methods: {
    generateArc() {
      const w = 500
      const h = 500

      const svg = d3
        .select('#arc')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

      const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1))
      const color = d3.scaleOrdinal(d3.schemeDark2)

      const maxGDP = d3.max(sortedGDP, (o) => o.value)

      const angleScale = d3
        .scaleLinear()
        .domain([0, maxGDP])
        .range([0, 1.5 * Math.PI])

      const arc = d3
        .arc()
        .innerRadius((d, i) => (i + 1) * 25)
        .outerRadius((d, i) => (i + 2) * 25)
        .startAngle(angleScale(0))
        .endAngle((d) => angleScale(d.value))

      const g = svg.append('g')

      g.selectAll('path')
        .data(sortedGDP)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .attr('stroke', '#FFF')
        .attr('stroke-width', '1px')
        .on('mouseenter', function () {
          d3.select(this).transition().duration(200).attr('opacity', 0.5)
        })
        .on('mouseout', function () {
          d3.select(this).transition().duration(200).attr('opacity', 1)
        })

      g.selectAll('text')
        .data(this.gdp)
        .enter()
        .append('text')
        .text((d) => `${d.country} -  ${d.value} Trillion`)
        .attr('x', -150)
        .attr('dy', -8)
        .attr('y', (d, i) => -(i + 1) * 25)

      g.attr('transform', 'translate(200,300)')
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
