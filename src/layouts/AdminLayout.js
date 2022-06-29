import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";

import sidebarImage from "../assets/img/sidebar-3.jpg";
import adminRoutes from "adminRoutes";
import ActivityManageUpdate from "views/Admin/ActivityManageUpdate";
import ActivityManageCreate from "views/Admin/ActivityManageCreate";
import FoodManageUpdate from "views/Admin/FoodManageUpdate";
import FoodManageUpdateNutrition from "views/Admin/FoodManageUpdateNutrition";
import FoodManageCreate from "views/Admin/FoodManageCreate";

function AdminLayout() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (
        prop.layout === "/admin" &&
        window.location.href.split("/").length === 5
      ) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return (
          <Switch>
            <Route path="/admin/activitymanage/update/:activityid">
              <ActivityManageUpdate />
            </Route>
            <Route path="/admin/activitymanage/create">
              <ActivityManageCreate />
            </Route>
            <Route path="/admin/foodmanage/updatefood/:foodid">
              <FoodManageUpdate />
            </Route>
            <Route path="/admin/foodmanage/updatenutrition/:foodid">
              <FoodManageUpdateNutrition />
            </Route>
            <Route path="/admin/foodmanage/create">
              <FoodManageCreate />
            </Route>
          </Switch>
        );
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          routes={adminRoutes}
        />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(adminRoutes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default AdminLayout;
