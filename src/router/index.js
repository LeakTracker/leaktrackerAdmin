import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Reports from "../views/Reports.vue";
import ReportsInfo from "../views/ReportsInfo.vue";
import Accounts from "../views/Accounts.vue";
import Maps from "../views/Maps.vue";
import Settings from "../views/Settings.vue";
import { auth } from "../firebase";


const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/reports-info",
    name: "Reports Info",
    component: ReportsInfo,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/signin" && auth.currentUser) {
    next('/');
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/signin');
    return;
  }

  next();
});

export default router;
