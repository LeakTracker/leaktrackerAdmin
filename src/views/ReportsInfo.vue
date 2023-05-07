<template>
    <div class="py-4 container-fluid">
        <div class=" row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>Reports Info</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            User</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                            Status</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                            Date Reported</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Pipe Size </th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Water Loss</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Department</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in reports" :key="index" :value="data">
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img :src="data.image_link" class="avatar avatar-sm me-3"
                                                        alt="user1" />
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ data.name }}</h6>
                                                    <p class="text-xs text-secondary mb-0">{{ data.email }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">
                                              <span v-if="data.status == 'Submitted'" class="badge badge-warning">{{ data.status }}</span>
                                              <span v-if="data.status == 'Confirmed'" class="badge badge-success">{{ data.status }}</span>
                                              <span v-if="data.status == 'Repaired'" class="badge badge-primary">{{ data.status }}</span>
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs text-secondary mb-0">{{ data.time_reported.toDate("dd/MM/yyyy").toDateString() }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.pipe_size }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.water_loss.toLocaleString() }} Liters</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">{{ data.department }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn" data-bs-toggle="modal" data-bs-target="#addModal"
                                                @click="selectEditData(data.document_id, data.name, data.email, data.contact_number, data.occupation, data.department, data.status, data.image_link, id_lists[index], data.water_loss, data.address_lat, data.address_lng)"><i
                                                    class="fa fa-eye"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Add -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-    " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Report Info</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                  <div>
                      <GMapMap
                      :center="center"
                      :zoom="15"
                      map-type-id="terrain"
                      style="width: 450px; height: 300px"
                  >
                      <GMapCluster>
                      <GMapMarker
                          :key="index"
                          v-for="(m, index) in markers"
                          :position="position"
                          :clickable="true"
                          :draggable="true"
                          @click="center=position"
                      />
                      </GMapCluster>
                  </GMapMap>
                  <br>
                    <center><img :src="image_link" alt="user1" /></center>
                    <br>
                    </div>
                 
                    <form>
                      <p class="text-xs font-weight-bold mb-3 mt-3">
                      <span v-if="status == 'Submitted'" class="badge badge-warning">{{ status }}</span>
                      <span v-if="status == 'Confirmed'" class="badge badge-success">{{ status }}</span>
                      <span v-if="status == 'Repaired'" class="badge badge-primary">{{ status }}</span>
                      </p>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Name</label>
                                <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Name" disabled>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Email</label>
                                <input type="email" v-model="email" class="form-control" id="inputEmail4"
                                    placeholder="Email" disabled>
                            </div>
                  
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">Contact Number</label>
                            <input type="text" v-model="contact_number" class="form-control" id="inputAddress"
                                placeholder="09xxxxxxxxx" disabled>
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputAddress2">Occupation</label>
                            <input type="text" v-model="occupation" class="form-control" id="inputAddress2"
                                placeholder="eg. Instructor">
                        </div> -->
                        <div class="form-group">
                            <label for="inputAddress2">Department</label>
                            <input type="text" v-model="department" class="form-control" id="inputAddress2"
                                placeholder="eg. CCIS" style="text-transform:uppercase" disabled>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Water Loss</label>
                            <input type="text" v-model="water_loss" class="form-control" id="inputAddress2"
                                placeholder="eg. CCIS" style="text-transform:uppercase" disabled>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                   
                        <!-- <button type="button" @click="updateReport('Confirmed')"
                        class="btn bg-gradient-secondary" data-bs-dismiss="modal">Confirm</button>
                        <button type="button" @click="updateReport('Repaired')"
                        class="btn bg-gradient-primary" data-bs-dismiss="modal">Repaired</button>
                        <button type="button" 
                        class="btn bg-gradient-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Remove</button>
                        <button type="button" @click="clearFields()" class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal" style="margin-left: 30px;">Close</button> -->
                </div>
            </div>
        </div>
    </div>
  
    <!-- Modal Delete -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Account</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to remove this report?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="clearFields()" class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal">Cancel</button>
                    <button type="button" @click="deleteReport()" class="btn bg-gradient-danger"
                        data-bs-dismiss="modal">Remove</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  
    
    <script>
  
  import { db } from "../firebase";
  import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
  
    
    export default {
      name: "Reports",
      mounted() {
          this.getAll();
      },
      components: {
      },
      data() {
          return {
              stats: {
                  titleColor: "opacity-7 text-white",
                  descColor: "text-white",
                  trip: {
                      title: "Today's Trip",
                      desc: "145 KM",
                      classIcon: "text-dark ni ni-money-coins",
                  },
                  health: {
                      title: "Battery Health",
                      desc: "99 %",
                      classIcon: "text-dark ni ni-controller ",
                  },
                  speed: {
                      title: "Average Speed",
                      desc: "56 Km/h",
                      classIcon: "text-dark ni ni-delivery-fast",
                  },
                  volume: {
                      title: "Music Volume",
                      desc: "15/100",
                      classIcon: "text-dark ni ni-note-03",
                  },
              },
              reports: [],
              name: "",
              email: "",
              contact_number: "",
              occupation: "",
              department: "",
              password: "",
              password_confirm: "",
              selected_id: "",
              is_editing: false,
              image_link: "",
              id_lists: [],
              doc_id: [],
              status: "",
              water_loss:0,
              center: {lat: 12.0679229, lng: 124.5940815,},
              position: {
                      lat: 12.0679229, lng: 124.5940815,
                  },
              markers: [
                  {
                  position: {
                      lat: 51.093048, lng: 6.842120
                  },
                 }
                , // Along list of clusters
              ]
          };
      },
      methods: {
          async getAll() {
              var all_reports = [];
              var ids = [];
              const accRef = collection(db, "Reports");
              const querySnapshot = await getDocs(query(accRef, orderBy("timestamp", "desc")));
              querySnapshot.forEach((doc) => {
                  all_reports.push(doc.data());
                  ids.push(doc.id);
              });
              this.reports = all_reports;
              this.id_lists = ids;
          },
          async addAccount() {
              try {
                  const docRef = await addDoc(collection(db, "Reports"), {
                      name: this.name,
                      email: this.email,
                      contact_number: this.contact_number,
                      occupation: this.occupation,
                      department: this.department.toUpperCase(),
                      password: this.password,
                      created_at: new Date(),
                      updated_at: new Date(),
                  });
                  const accRef = doc(db, "Accounts", docRef.id);
                  await updateDoc(accRef, {
                      document_id: docRef.id,
                  });
                  this.getAll();
                  this.clearFields();
                  console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                  console.error("Error adding document: ", e);
              }
          },
          async updateReport(type) {
              const accRef = doc(db, "Reports", this.doc_id);
              await updateDoc(accRef, {
                status: type,
              });
              this.getAll();
              this.clearFields();
          },
          async deleteReport() {
              await deleteDoc(doc(db, "Reports", this.doc_id));
              this.getAll();
          },
          selectId(id) {
              console.log(id);
              this.selected_id = id;
          },
          selectEditData(id, name, email, contact_number, occupation, department, status, image_link, docId, water_loss,lat,lng) {
              this.is_editing = true;
              this.selected_id = id;
              this.name = name;
              this.email = email;
              this.contact_number = contact_number;
              this.occupation = occupation;
              this.department = department;
              this.status = status;
              this.water_loss = water_loss;
  
              this.image_link = image_link;
              this.doc_id = docId;
              console.log(lat);
              console.log(lng);
              this.position = {
                      lat: lat, lng: lng
                  };
              this.center = {
                  lat: lat, lng: lng
              };
              
              this.markers = [
                  {
                  position: {
                      lat: lat, lng: lng
                  },
                 }
              ];
          },
          clearFields() {
              this.is_editing = false;
              this.selected_id = "",
                  this.name = "";
              this.email = "";
              this.contact_number = "";
              this.occupation = "";
              this.department = "";
              this.status = "";
              this.water_loss = "";
  
              this.image_link = "";
              this.doc_id = "";
          },
      }
    };
    </script>
    