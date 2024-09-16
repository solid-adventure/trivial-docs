<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';


export default {
  name: 'LineGraph',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartRef = ref(null);
    let chart = null;

    const createChart = () => {
      const ctx = chartRef.value.getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: props.data.map(item => `Day ${item.day}`),
          datasets: [
            {
              label: 'Cash',
              data: props.data.map(item => item.balance),
              borderColor: 'rgb(75, 192, 192)',
              borderDash: [4, 4],
              tension: 0.1,
              pointStyle: false

            },
            {
              label: 'Revenue',
              data: props.data.map(item => item.cumulativeRevenue),
              borderColor: 'rgb(255, 205, 86)',
              tension: 0.1,
              pointStyle: false

            },
            {
              label: 'COGS',
              data: props.data.map(item => item.cumulativeCogs),
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [13, 3],
              tension: 0.1,
              pointStyle: false

            },
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Store Performance Over Time'
            }
          }
        }
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(() => props.data, () => {

      chart.data.labels = props.data.map(item => `Day ${item.day}`)
      chart.data.datasets[0].data = props.data.map(item => item.balance);
      chart.data.datasets[1].data = props.data.map(item => item.cumulativeRevenue);
      chart.data.datasets[2].data = props.data.map(item => item.cumulativeCogs);

      chart.update();

      // if (chart) {
      //   chart.destroy();
      // }
      // createChart();
    }, { deep: true });

    return {
      chartRef
    };
  }
}
</script>