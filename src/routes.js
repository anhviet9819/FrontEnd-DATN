import Dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import UserBasicTracking from "views/UserBasicTracking";
import BasicTrackingHistory from "views/BasicTrackingHistory";
import MealsTracking from "views/MealsTracking";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/userprofile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/usertracking",
    name: "User Basic Tracking",
    icon: "nc-icon nc-notes",
    component: UserBasicTracking,
    layout: "/admin",
  },
  {
    path: "/basictrackinghistory",
    name: "Basic Tracking History",
    icon: "nc-icon nc-notes",
    component: BasicTrackingHistory,
    layout: "/admin",
  },
  {
    path: "/mealstracking",
    name: "Meals Tracking",
    icon: "nc-icon nc-food",
    component: MealsTracking,
    layout: "/admin",
  },
];

export default dashboardRoutes;
