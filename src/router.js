import { createWebHistory, createRouter } from "vue-router";
import Dashboard from '@/views/Dashboard'
import Wallet from '@/views/Wallet'

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Dashboard
    },
    {
      path: "/my-wallet",
      component: Wallet
    },
  ],
});

export default router;
