import { createWebHistory, createRouter } from "vue-router";
import Dashboard from '@/views/Dashboard'
import Portfolio from '@/views/Portfolio'

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Dashboard
    },
    {
      path: "/my-portfolio",
      component: Portfolio
    },
  ],
});

export default router;
