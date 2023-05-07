<template>
    <div class="py-4 container-fluid">
        <div class=" row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>List of Pending Reports</h6>
                        <!-- <GMapMap
                            :center="center"
                            :zoom="15"
                            map-type-id="terrain"
                            style="height: 700px"
                        >
                            <GMapCluster :imagePath='imageMark'>
                            <GMapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="center=m.position"
                                :imagePath='imageMark'
                            />
                            </GMapCluster>
                        </GMapMap> -->
                        <!-- <GMapMap :center="center" :zoom="15" map-type-id="terrain" style="height: 700px;">
                            <GMapCluster>
                                <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position"
                                    :clickable="true" :draggable="true" @click="center=m.position" />
                            </GMapCluster>
                        </GMapMap> -->
                    </div>
                    <div class="card-body px-0 pt-0 pb-2"  :key="renderComp">
                        <GMapMap
                            :center="center"
                            :zoom="15"
                            map-type-id="terrain"
                            style="height: 700px"
                        >
                            <GMapCluster :zoomOnClick="true"  :imagePath='imageMark'>
                            <GMapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="center=m.position"
                                :imagePath='imageMark'
                            />
                            </GMapCluster>
                        </GMapMap>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


  
<script>

import { db } from "../firebase";
import { collection, getDocs, query, where} from "firebase/firestore";
// import router from "../router";
// import { stat } from "fs";


export default {
    name: "Reports",
    mounted() {
        this.getAll();
    },
    components: {
    },
    data() {
        return {
            center: { lat: 12.0679229, lng: 124.5940815, },
            position: {
                lat: 12.0679229, lng: 124.5940815,
            },
            markers: [
                   {
                    id: 'dfsldjl3r',
                    position: {
                        lat: 0, lng: 0,
                    },
                }
            ],
            renderComp: 0,
            imageMark: "https://firebasestorage.googleapis.com/v0/b/water-loss.appspot.com/o/car-repair.png?alt=media&token=0ea5243d-c25b-4895-b392-88dc8268d685",
        };
    },
    methods: {
        async getAll() {
            var all_reports = [];
            var ids = [];
            this.markers = [];
                const accRef = collection(db, "Reports");
                const querySnapshot = await getDocs(query(accRef, where("status", "!=", "Repaired")));
                querySnapshot.forEach((doc) => {
                    all_reports.push(doc.data());
                    ids.push(doc.id);
                    if(doc.data().address_lat != null && doc.data().address_lat != 0){
                        this.markers.push(
                            {
                                position: {
                                    lat:doc.data().address_lat, lng: doc.data().address_lng,
                                },
                            }
                        );
                    }
                });
                console.log(this.markers);
        },
        selectEditData(id, name, email, contact_number, occupation, department, status, image_link, docId, water_loss, lat, lng) {
            // router.push('/reports-info');
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

            this.renderComp += 1;
            
        },
    }
};
</script>
  