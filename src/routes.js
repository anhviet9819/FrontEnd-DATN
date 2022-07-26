import Dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import UserBasicTracking from "views/UserBasicTracking";
import BasicTrackingHistory from "views/BasicTrackingHistory";
import MealsTracking from "views/MealsTracking";
import ActivitiesTracking from "views/ActivitiesTracking";
import ChangePassword from "views/ChangePassword";
import CreateMealTracking from "components/CreateMealTracking/CreateMealTracking";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/userprofile",
    name: "Thông tin cá nhân",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user",
  },
  // {
  //   path: "/usertracking",
  //   name: "Sức khỏe cá nhân",
  //   icon: "nc-icon nc-notes",
  //   component: UserBasicTracking,
  //   layout: "/user",
  // },
  {
    path: "/basictrackinghistory",
    name: "Lịch sử sức khỏe",
    icon: "nc-icon nc-paper-2",
    component: BasicTrackingHistory,
    layout: "/user",
  },
  {
    path: "/mealstracking",
    name: "Nhật ký bữa ăn",
    muiicon: "meal",
    component: MealsTracking,
    layout: "/user",
  },
  {
    path: "/activitiestracking",
    name: "Nhật ký hoạt động",
    muiicon: "active",
    component: ActivitiesTracking,
    layout: "/user",
  },
  {
    path: "/updatepassword",
    name: "Thay đổi mật khẩu",
    icon: "nc-icon nc-food",
    component: ChangePassword,
    layout: "/user",
    redirect: "khong co",
  },
];

export default dashboardRoutes;
