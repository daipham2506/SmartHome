import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Buttons from "views/Components/Buttons.jsx";
// import GridSystem from "views/Components/GridSystem.jsx";
// import Panels from "views/Components/Panels.jsx";
// import SweetAlert from "views/Components/SweetAlert.jsx";
// import Notifications from "views/Components/Notifications.jsx";
// import Icons from "views/Components/Icons.jsx";
// import Typography from "views/Components/Typography.jsx";
// import RegularForms from "views/Forms/RegularForms.jsx";
// import ExtendedForms from "views/Forms/ExtendedForms.jsx";
// import ValidationForms from "views/Forms/ValidationForms.jsx";
// import Wizard from "views/Forms/Wizard.jsx";
// import RegularTables from "views/Tables/RegularTables.jsx";
// import ExtendedTables from "views/Tables/ExtendedTables.jsx";
// import ReactTables from "views/Tables/ReactTables.jsx";
import LoginPage from "../views/Pages/LoginPage";
import Setting from "../views/Setting/Setting"
import Control from "../views/Control/Control"
import Chart from "../views/Chart/Chart"
import ManageUser from "../views/ManageUser/ManageUser"

// material-ui-icons
import DashboardIcon from "material-ui-icons/Dashboard";
// import Apps from "material-ui-icons/Apps";
// import ContentPaste from "material-ui-icons/ContentPaste";
// import GridOn from "material-ui-icons/GridOn";
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import PersonAdd from "material-ui-icons/PersonAdd";
// import WbIncandescentIcon from 'material-ui-icons/WbIncandescent';
import SettingsIcon from 'material-ui-icons/Settings';
import SettingsRemoteIcon from 'material-ui-icons/SettingsRemote';
import AssessmentIcon from 'material-ui-icons/Assessment';

var dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
  { 
    path: "/setting", 
    name: "Setting", 
    icon: SettingsIcon, 
    component: Setting 
  },
  { 
    path: "/control", 
    name: "Control", 
    icon: SettingsRemoteIcon, 
    component: Control 
  },
  {
    path: "/chart",
    name: "Chart",
    icon:  AssessmentIcon,
    component: Chart
  },
  { 
    path: "/manage-user", 
    name: "Manage User", 
    icon: PersonAdd,
    admin: true, 
    component: ManageUser 
  },
  { 
    path: "/user/login-page", 
    name: "Logout", 
    icon: ExitToAppIcon, 
    component: LoginPage 
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
  // {
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: Apps,
  //   views: [
  //     {
  //       path: "/components/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons
  //     },
  //     {
  //       path: "/components/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem
  //     },
  //     {
  //       path: "/components/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels
  //     },
  //     {
  //       path: "/components/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert
  //     },
  //     {
  //       path: "/components/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications
  //     },
  //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
  //     {
  //       path: "/components/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: ContentPaste,
  //   views: [
  //     {
  //       path: "/forms/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms
  //     },
  //     {
  //       path: "/forms/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms
  //     },
  //     {
  //       path: "/forms/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms
  //     },
  //     {
  //       path: "/forms/wizard",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: GridOn,
  //   views: [
  //     {
  //       path: "/tables/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables
  //     },
  //     {
  //       path: "/tables/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables
  //     },
  //     {
  //       path: "/tables/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables
  //     }
  //   ]
  // },
  
];
export default dashboardRoutes;
