<template>
    <div class="py-4 container-fluid">
        <button type="button" @click="setIsEditing()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add
             Department</button>
        <div class=" row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>Department List</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0" style="text-align: center;">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            #</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Deparment</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                            Tank Height</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in reports" :key="index" :value="data">
                                        <td class="align-middle">
                                            <p class="text-xs font-weight-bold mb-0">{{ index+1 }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.department }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.height }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn" style="margin-right:10px;" data-bs-toggle="modal" data-bs-target="#addModal"
                                                @click="selectEditData(data.department, data.height)"><i
                                                    class="fa fa-eye"></i></button>
                                                    <button class="btn btn-danger" 
                                                @click="deleteDepartment(data.department)"><i
                                                    class="fa fa-trash"></i></button>
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
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Add New Department</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                      <p class="text-xs font-weight-bold mb-3 mt-3">
                      <span v-if="status == 'Submitted'" class="badge badge-warning">{{ status }}</span>
                      <span v-if="status == 'Confirmed'" class="badge badge-success">{{ status }}</span>
                      <span v-if="status == 'Repaired'" class="badge badge-primary">{{ status }}</span>
                      </p>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Department</label>
                                <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Name" >
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Tank Height in meters</label>
                                <input type="email" v-model="height" class="form-control" id="inputEmail4"
                                    placeholder="Email" >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                        <button type="button" @click="clearFields()" class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal" style="margin-left: 30px;">Close</button>
                        <button type="button" @click="saveDepartment()"
                        class="btn bg-gradient-primary" data-bs-dismiss="modal">Save</button>

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
  import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query, setDoc } from "firebase/firestore";
  
    
    export default {
      name: "Reports",
      mounted() {
          this.getAll();
      },
      components: {
      },
      data() {
          return {
              reports: [],
              is_editing: false,
              selected_id: "",
              name: "",
              height: 0,
          };
      },
      methods: {
          async getAll() {
              var all_reports = [];
              const accRef = collection(db, "Departments");
              const querySnapshot = await getDocs(query(accRef, orderBy("department", "asc")));
              querySnapshot.forEach((doc) => {
                  all_reports.push(doc.data());
              });
              this.reports = all_reports;
              console.log(this.reports);
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
          selectId(id) {
              console.log(id);
              this.selected_id = id;
          },
          selectEditData(name, height) {
              this.is_editing = true;
              this.name = name;
              this.height = height;
          },
          clearFields() {
              this.is_editing = false;
              this.name = "";
              this.height = 0;
          },
          setIsEditing() {
            this.is_editing = false;
            this.clearFields();
            console.log(this.is_editing);
        },
       async saveDepartment(){
            if(this.height != "0" && this.height != null){
                    try {
                    await setDoc(doc(db, "Departments", this.name), {
                        department: this.name,
                        height: parseFloat(this.height),
                    });
                    this.getAll();
                    this.clearFields();
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        },
        async deleteDepartment(name) {
              await deleteDoc(doc(db, "Departments", name));
              this.getAll();
          },
      }
    };
    </script>
    