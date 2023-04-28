<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <span class="font-weight-bold">Monthly overall water loss - {{ currentYear }}</span>
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Chart from "chart.js/auto";


export default {
  name: "gradient-line-chart",
  props: {
    title: {
      type: String,
      default: "Repair overview",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },
  async mounted()  {
    const d = new Date();
    this.currentYear = d.getFullYear();
    await this.getMonthlyWaterLoss();
    var ctx1 = document.getElementById("chart-line").getContext("2d");

    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
    gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");

    new Chart(ctx1, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Water Loss",
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#4BB543 ",
            backgroundColor: gradientStroke1,
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            fill: true,
            data: [this.jan,this.feb,this.mar,this.apr, this.may, this.jun, this.jul, this.aug, this.sep, this.oct, this.nov, this.dec],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#fbfbfb",
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: "#ccc",
              padding: 20,
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  },
  data() {
    return {
      jan:0,
      feb:0,
      mar:0,
      apr:0,
      may:0,
      jun:0,
      jul:0,
      aug:0,
      sep:0,
      oct:0,
      nov:0,
      dec:0,
      currentYear: 0,
    };
  },
  methods: {
    async getMonthlyWaterLoss() {
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("year", "==", this.currentYear), where("status", "==", "Repaired"), orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
      });
      for(let i = 0; i < all_reports.length; i++){
        if(all_reports[i].month == 1){
          this.jan += all_reports[i].water_loss
        }
        if(all_reports[i].month == 2){
          this.feb += all_reports[i].water_loss
        }
        if(all_reports[i].month == 3){
          this.mar += all_reports[i].water_loss
        }
        if(all_reports[i].month == 4){
          this.apr += all_reports[i].water_loss
        }
        if(all_reports[i].month == 5){
          this.may += all_reports[i].water_loss
        }
        if(all_reports[i].month == 6){
          this.jun += all_reports[i].water_loss
        }
        if(all_reports[i].month == 7){
          this.jul += all_reports[i].water_loss
        }
        if(all_reports[i].month == 8){
          this.aug += all_reports[i].water_loss
        }
        if(all_reports[i].month == 9){
          this.sep += all_reports[i].water_loss
        }
        if(all_reports[i].month == 10){
          this.oct += all_reports[i].water_loss
        }
        if(all_reports[i].month == 11){
          this.nov += all_reports[i].water_loss
        }
        if(all_reports[i].month == 12){
          this.dec += all_reports[i].water_loss
        }
      }
    },
  }
};
</script>
