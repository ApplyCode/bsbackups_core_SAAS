import React from "react"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import RecoverPassword from "../pages/Authentication/RecoverPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

/* OTHERS PAGES */
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

/* ROUTES IMPORT */
import Dashboard from "../pages/Dashboard/index"
import Backups from "../pages/Backups/index"
import FormBackup from "../pages/Backups/form"
import Devices from "../pages/Devices/index"
import CreateDevice from "../pages/Devices/create"
import InstallationDevice from "../pages/Devices/installation"
import EditDevice from "../pages/Devices/edit"
import Backup from "../pages/Backups/backup"
import Profile from "../pages/Profile/index"
import Plans from "../pages/Plans/index"
import FormPlan from "../pages/Plans/form"
import Users from "../pages/Users/index"
import FormUser from "../pages/Users/form"
import RenewAccount from "../pages/RenewAccount/index"
import Account from "../pages/Account/index"
import DownloadBackups from "../pages/DownloadBackups/index"
import ChangePlan from "../pages/ChangePlan/index"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/backups", component: <Backups /> },
  { path: "/backups/create", component: <FormBackup /> },
  { path: "/backups/edit/:id", component: <FormBackup /> },
  { path: "/devices", component: <Devices /> },
  { path: "/devices/create", component: <CreateDevice /> },
  { path: "/devices/installation", component: <InstallationDevice /> },
  { path: "/devices/edit/:id", component: <EditDevice /> },
  { path: "/backup/:id", component: <Backup /> },
  { path: "/profile", component: <Profile /> },
  { path: "/plans", component: <Plans /> },
  { path: "/plans/create", component: <FormPlan /> },
  { path: "/plans/edit/:id", component: <FormPlan /> },
  { path: "/users", component: <Users /> },
  { path: "/users/create", component: <FormUser /> },
  { path: "/users/edit/:id", component: <FormUser /> },
  { path: "/renew-account", component: <RenewAccount /> },
  { path: "/account", component: <Account /> },
  { path: "/download-backups", component: <DownloadBackups /> },
  { path: "/change-plan", component: <ChangePlan /> },

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/recover-password/:id", component: <RecoverPassword /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-login-2", component: <Login2 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/pages-register-2", component: <Register2 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
  { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  { path: "/page-confirm-mail", component: <ConfirmMail /> },
  { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  {
    path: "/auth-two-step-verification-2",
    component: <TwostepVerification2 />,
  },
]

export { userRoutes, authRoutes }
