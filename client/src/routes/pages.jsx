import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

// material-ui-icons
import PersonAdd from "material-ui-icons/PersonAdd";
import Fingerprint from "material-ui-icons/Fingerprint";
import LockOpen from "material-ui-icons/LockOpen";
import ForgotPassword from "../views/Pages/ForgotPassword";

const pagesRoutes = [
  {
    path: "/user/register-page",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/user/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/user/forgot-password",
    name: "Forgot Password",
    short: "Forgot Password",
    icon: LockOpen,
    component: ForgotPassword
  },
  {
    redirect: true,
    path: "/user",
    pathTo: "/user/login-page",
    name: "Login Page"
  }
];

export default pagesRoutes;
