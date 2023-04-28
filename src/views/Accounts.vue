<template>
    <div class="py-4 container-fluid">
        <button type="button" @click="setIsEditing()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add
            Account</button>
        <div class=" row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>Accounts</h6>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Author</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            User Type</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                                            Contact Number</th>
                                        <th
                                            class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Occupation</th>
                                        <!-- <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Department</th> -->
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Account Password</th>
                                        <th
                                            class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Action</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in accounts" :key="index" :value="data">
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3"
                                                        alt="user1" />
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{ data.name }}</h6>
                                                    <p class="text-xs text-secondary mb-0">{{ data.email }}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-3 mt-3">
                                            <span v-if="data.user_type == 'user'" class="badge badge-success">{{ data.user_type }}</span>
                                            <span v-if="data.user_type == 'maintenance'" class="badge badge-primary">{{ data.user_type }}</span>
                                            </p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold text-secondary mb-0">{{ data.contact_number }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.occupation }}</p>
                                        </td>
                                        <!-- <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.department }}</p>
                                        </td> -->
                                        <td class="align-middle text-center">
                                            <span class="text-secondary text-xs font-weight-bold">{{ data.password }}</span>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn" data-bs-toggle="modal" data-bs-target="#addModal"
                                                @click="selectEditData(data.document_id, data.name, data.email, data.contact_number, data.occupation, data.department, data.password, data.user_type)"><i
                                                    class="fa fa-edit"></i></button>
                                            <button class="btn btn-danger" @click="selectId(data.document_id)"
                                                data-bs-toggle="modal" data-bs-target="#deleteModal"
                                                style="margin-left: 10px;"><i class="fa fa-trash"></i></button>
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
                    <h5 class="modal-title" id="addModalLabel">Add Account</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Name</label>
                                <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputEmail4">Email</label>
                                <input type="email" v-model="email" class="form-control" id="inputEmail4"
                                    placeholder="Email" :disabled=is_editing>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword4">Password</label>
                                <input type="password" v-model="password" class="form-control" id="inputPassword4"
                                    placeholder="Password">
                            </div>
                            <div class="form-group">
                                <label for="inputPassword4">Confirm Password</label>
                                <input type="password" v-model="password_confirm" class="form-control" id="inputPassword4"
                                    placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">Contact Number</label>
                            <input type="text" v-model="contact_number" class="form-control" id="inputAddress"
                                placeholder="09xxxxxxxxx">
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Occupation</label>
                            <input type="text" v-model="occupation" class="form-control" id="inputAddress2"
                                placeholder="eg. Instructor">
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputAddress2">Department</label>
                            <input type="text" v-model="department" class="form-control" id="inputAddress2"
                                placeholder="eg. CCIS" style="text-transform:uppercase">
                        </div> -->
                        <div class="form-group">
                            <label for="inputAddress2">User Type</label>
                            <select v-model="user_type" class="form-select" aria-label="Default select example">
                                <option selected value="user">User</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                       
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="clearFields()" class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="is_editing ? updateAccount() : addAccount()"
                        class="btn bg-gradient-primary" data-bs-dismiss="modal">Save</button>
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
                    <p>Are you sure you want to delete this account?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="clearFields()" class="btn bg-gradient-secondary"
                        data-bs-dismiss="modal">Cancel</button>
                    <button type="button" @click="deleteAccount()" class="btn bg-gradient-danger"
                        data-bs-dismiss="modal">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
    name: "accounts",
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
            accounts: [],
            name: "",
            email: "",
            contact_number: "",
            occupation: "",
            department: "",
            user_type: "",
            password: "",
            password_confirm: "",
            selected_id: "",
            is_editing: false,
        };
    },
    methods: {
        async getAll() {
            var all_accounts = [];
            const accRef = collection(db, "Accounts");
            const querySnapshot = await getDocs(query(accRef, orderBy("created_at", "asc")));
            querySnapshot.forEach((doc) => {
                all_accounts.push(doc.data());
            });
            this.accounts = all_accounts;
        },
        async addAccount() {
            try {
                const docRef = await addDoc(collection(db, "Accounts"), {
                    name: this.name,
                    email: this.email,
                    contact_number: this.contact_number,
                    occupation: this.occupation,
                    department: this.department.toUpperCase(),
                    user_type: this.user_type,
                    password: this.password,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                const accRef = doc(db, "Accounts", docRef.id);
                await updateDoc(accRef, {
                    document_id: docRef.id,
                });
                this.registerUser();
                this.getAll();
                this.clearFields();
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async updateAccount() {
            const accRef = doc(db, "Accounts", this.selected_id);
            await updateDoc(accRef, {
                name: this.name,
                email: this.email,
                contact_number: this.contact_number,
                occupation: this.occupation,
                department: this.department.toUpperCase(),
                user_type: this.user_type,
                password: this.password,
                updated_at: new Date(),
            });
            this.getAll();
            this.clearFields();
        },
        async deleteAccount() {
            await deleteDoc(doc(db, "Accounts", this.selected_id));
            this.getAll();
        },
        selectId(id) {
            console.log(id);
            this.selected_id = id;
        },
        selectEditData(id, name, email, contact_number, occupation, department, password, user_type) {
            this.is_editing = true;
            this.selected_id = id;
            this.name = name;
            this.email = email;
            this.contact_number = contact_number;
            this.occupation = occupation;
            this.department = department;
            this.user_type = user_type;
            this.password = password;
            this.password_confirm = password;
        },
        clearFields() {
            this.is_editing = false;
            this.selected_id = "",
                this.name = "";
            this.email = "";
            this.contact_number = "";
            this.occupation = "";
            this.department = "";
            this.user_type = "";
            this.password = "";
            this.password_confirm = "";
        },
        async registerUser() {
            try {
                await createUserWithEmailAndPassword(auth, this.email, this.password)
            } catch (error) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert("Email already in use");
                        break;
                    case 'auth/invalid-email':
                        alert("Invalid Email");
                        break;
                    case 'auth/operation-not-allowed':
                        alert("Operation not allowed");
                        break;
                    case 'auth/weak-password':
                        alert("Weak Password");
                        break;
                    default:
                        alert('Something went wrong');
                }
                return
            }
        },
        setIsEditing() {
        this.is_editing = false;
        this.clearFields();
        console.log(this.is_editing);
        }
    },
    
};
</script>
  