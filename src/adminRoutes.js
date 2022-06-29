import ActivityManage from "views/Admin/ActivityManage";
import FoodManage from "views/Admin/FoodManage";
import AdminDashboard from "views/Admin/AdminDashboard";
import AdminProfile from "views/Admin/AdminProfile";
import UserManage from "views/Admin/UserManage";

const adminRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-chart-pie-35",
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/usermanage",
    name: "Quản lý danh mục tài khoản",
    icon: "nc-icon nc-single-02",
    component: UserManage,
    layout: "/admin",
  },
  {
    path: "/activitymanage",
    name: "Quản lý danh mục hoạt động",
    icon: "nc-icon nc-notes",
    component: ActivityManage,
    layout: "/admin",
  },
  {
    path: "/foodmanage",
    name: "Quản lý danh mục món ăn",
    icon: "nc-icon nc-paper-2",
    component: FoodManage,
    layout: "/admin",
  },
];

export default adminRoutes;
