<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['options', 'chartData'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
