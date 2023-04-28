<template>
  <div class="container top-0 position-sticky z-index-sticky">
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <center>
                  <img src="../assets/img/nwssu-logo.jpg" alt="" height="150">
                </center>
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent='login'>
                    <div class="mb-3">
                      <!-- <input type="email" v-model="login_form.email" class="form-control" placeholder="Enter email" name="email"> -->
                      <input type="email" class="form-control" placeholder="Email Address" v-model="login_form.email" name="email" size="lg" />
                    </div>
                    <div class="mb-3">
                      <input type="password" class="form-control" placeholder="Password" v-model="login_form.password" name="password" size="lg" />
                      <!-- <input type="password" v-model="login_form.password" class="form-control" placeholder="Password" name="password"> -->
                    </div>
                    <!-- <argon-switch id="rememberMe">Remember me</argon-switch> -->

                    <div class="text-center">
                      <argon-button 
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        value="Login"
                      >Sign in</argon-button>
                    </div>
                  </form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div> -->
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
          background-size: cover;"
              >
                <center>
                  <img src="../assets/img/leaktracker.png" alt="" height="150">
                </center>
                <span class="mask bg-gradient-success opacity-3"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >"LeakTracker"</h4>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >"Northwest Samar State University"</h4>
                <p
                  class="text-white position-relative"
                >Calculation of detected water loss using Torricelli's equation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { ref } from 'vue';
import { useStore } from "vuex";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  setup (){ 
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      // console.log("asdas" + login_form);
      store.dispatch('login', login_form.value);
    }

    return {
      login_form,
      register_form,
      login
    }
  },
  components: {
    // ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
