<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              title="Total Users"
              :value="userLists.length"
              iconClass="fa fa-user"
              iconBackground="bg-gradient-primary"
              detail="Overall"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              title="Total Water Loss (Liters)"
              :value="waterLoss.toLocaleString()"
              iconClass="fa fa-faucet"
              iconBackground="bg-gradient-danger"
              detail="Overall"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              title="Total Reports"
              :value="reportLists.length"
              iconClass="fa fa-list-ol"
              iconBackground="bg-gradient-success"
              detail="Overall"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              title="Total Pending Reports"
              :value="pendingReportLists.length"
              iconClass="fa fa-list"
              iconBackground="bg-gradient-warning"
              detail="Overall"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Reports</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(data, index) in reportLists" :key="index">
                      <span v-if="index < 10">
                        <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="data.image_link" alt="Country flag" height="30" class="avatar avatar-sm me-3" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Name:</p>
                            <p class="mb-0" style="font-size: 12px;">{{ data.name }}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Status:</p>
                          <p class="mb-0" style="font-size: 12px;">
                            <span v-if="data.status == 'Submitted'" class="badge badge-warning">{{ data.status }}</span>
                            <span v-if="data.status == 'Confirmed'" class="badge badge-success">{{ data.status }}</span>
                            <span v-if="data.status == 'Repaired'" class="badge badge-primary">{{ data.status }}</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Date Reported:</p>
                          <p class="mb-0" style="font-size: 12px;">{{ data.time_reported.toDate("dd/MM/yyyy").toDateString() }}</p>
                        </div>
                      </td>
                      </span>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Pending Reports</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(data, index) in pendingReportLists" :key="index">
                      <span v-if="index < 10">
                        <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="data.image_link" alt="Country flag" height="30" class="avatar avatar-sm me-3" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Name:</p>
                            <p class="mb-0" style="font-size: 12px;">{{ data.name }}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Status:</p>
                          <p class="mb-0" style="font-size: 12px;">
                            <span v-if="data.status == 'Submitted'" class="badge badge-warning">{{ data.status }}</span>
                            <span v-if="data.status == 'Confirmed'" class="badge badge-success">{{ data.status }}</span>
                            <span v-if="data.status == 'Repaired'" class="badge badge-primary">{{ data.status }}</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Date Reported:</p>
                          <p class="mb-0" style="font-size: 12px;">{{ data.time_reported.toDate("dd/MM/yyyy").toDateString() }}</p>
                        </div>
                      </td>
                      </span>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-lg-0 mb-4 mt-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="">
                  <h6 class="mb-2">Generate Report</h6>
                  <div class="d-flex">
                    <select class="form-select" @change="setUser($event)" aria-label="Default select example" style="width: 240px;">
                      <option selected value="All Users">All Users</option>
                      <option v-for="(data, index) in userListOnly" :key="index" :value="data.name">{{ data.name }}</option>
                    </select>
                    <VueDatePicker v-model="date" @update:model-value="updateReport()" range multi-calendars enable-time-picker="false" style="width: 400px;margin-left: 10px;"/>
                    <!-- <p>{{ date }}</p> -->
                  </div>
                </div>
              </div>
              <div class="m-3" id="element-to-convert">
                <h6 class="mb-2" v-if="date != null" style="font-size:15px;">Reports from: {{ date1.toDateString() }} - {{ date2.toDateString() }}</h6>
                <h6 class="mb-2" v-if="date != null" style="font-size:15px;">User: {{ userFilter }}</h6>
                <table class="table table-striped table-responsive align-items-center" style="font-size: 13px;">
                    <thead>
                      <tr style="text-align: center;">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date Reported</th>
                        <th scope="col">Date Repaired</th>
                        <th scope="col">Water Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(data, index) in generatedReports" :key="index" style="text-align:center;">
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{ data.name }}</td>
                        <td>{{ data.status }}</td>
                        <td>{{ data.time_reported.toDate("dd/MM/yyyy").toDateString() }}</td>
                        <td>{{ data.time_repaired.toDate("dd/MM/yyyy").toDateString() }}</td>
                        <td>{{ data.water_loss.toLocaleString() }}</td>
                      </tr>
                    </tbody>
              </table>
              <hr>
              <div>
                <h6 class="mb-2" v-if="date != null" style="font-size:15px;">Total water loss: {{reportTotalWaterLoss.toLocaleString()}} Liters</h6>
              </div>
              </div>
              <div style="width: 200px;margin-left: 20px;">
                <button v-if="date != null" @click="exportToPDF" class="btn btn-primary">Export to PDF</button>
              </div>
            </div>
          </div>
      </div>
      <!-- <div id="app" ref="document" class="mt-5">
          <div id="element-to-convert">
            <center>
              <img width="400" src="../assets/img/bruce-mars.jpg" />
            </center>
          </div>
        </div> -->
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import html2pdf from "html2pdf.js";
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, onMounted } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

export default {
  name: "dashboard-default",
  
  mounted() {
        this.getAll();
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
        date.value = [startDate, endDate];
    },
  data() {
    return {
      userLists: [],
      waterLoss: 0,
      reportLists: [],
      pendingReportLists: [],
      generatedReports: [],
      date: null,
      date1: null,
      date2:null,
      reportTotalWaterLoss: 0,
      userListOnly: [],
      userFilter: "All Users",
    };
  },
  components: {
    Card,
    GradientLineChart,
    VueDatePicker
  },
  methods: {
    async getAll() {
      this.getUsers();
      this.getReports();
      this.getPendingReports();
      this.getMonthlyWaterLoss();
    },
    async getUsers() {
      var all_users = [];
      var users_only = [];
      const accRef = collection(db, "Accounts");
      const querySnapshot = await getDocs(query(accRef, orderBy("created_at", "desc")));
      querySnapshot.forEach((doc) => {
        all_users.push(doc.data());
        if(doc.data().user_type == "user"){
          users_only.push(doc.data());
        }
      });
      this.userLists = all_users;
      this.userListOnly = users_only;
    },
    async getReports(){
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
      });
      this.reportLists = all_reports;
    },
    async getPendingReports(){
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("status", "!=", "Repaired"), orderBy("status", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
      });
      this.pendingReportLists = all_reports;
    },
    async getMonthlyWaterLoss() {
      this.waterLoss = 0;
      var all_reports = [];
      const d = new Date();
      let year = d.getFullYear();
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("year", "==", year), where("status", "==", "Repaired"), orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
      });

      for(let i = 0; i < all_reports.length; i++){
        this.waterLoss += all_reports[i].water_loss;
      }
    },
   async generateReportAll(name){
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("name", "==", name), where("timestamp", ">", this.date[0]),where("timestamp", "<", this.date[1]), orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
      });
      this.generatedReports = all_reports;
    },
   async generateReportByAll(){
      this.reportTotalWaterLoss = 0;
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("timestamp", ">", this.date[0]),where("timestamp", "<", this.date[1]), orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
        this.reportTotalWaterLoss += doc.data().water_loss;
        console.log(doc.data().water_loss);
      });
      this.generatedReports = all_reports;
    },
    async generateReportByUser(){
      this.reportTotalWaterLoss = 0;
      var all_reports = [];
      const accRef = collection(db, "Reports");
      const querySnapshot = await getDocs(query(accRef, where("name", "==", this.userFilter), where("timestamp", ">", this.date[0]),where("timestamp", "<", this.date[1]), orderBy("timestamp", "desc")));
      querySnapshot.forEach((doc) => {
        all_reports.push(doc.data());
        this.reportTotalWaterLoss += doc.data().water_loss;
        console.log(doc.data().water_loss);
      });
      this.generatedReports = all_reports;
    },
    updateReport(){
      this.date1 = this.date[0];
      this.date2 = this.date[1];
      if(this.userFilter == "All Users"){
        this.generateReportByAll();
      }else{
        this.generateReportByUser();
      }
      console.log("Update report");
    },
    exportToPDF() {
			html2pdf(document.getElementById('element-to-convert'));
		},
    setUser(event){
      console.log(event.target.value);
      this.userFilter = event.target.value;
      if(this.date != null){
        if(this.userFilter == "All Users"){
          this.generateReportByAll();
        }else{
          this.generateReportByUser();
        }
      }
    }
  }
};

</script>

