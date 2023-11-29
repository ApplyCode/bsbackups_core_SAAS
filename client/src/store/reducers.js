import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Calendar
import calendar from "./calendar/reducer"

//Devices
import devices from "./devices/reducer"

//Backups
import backups from "./backups/reducer"

//Dashboard
import dashboard from "./dashboard/reducer"

//Profile
import profile from "./profile/reducer"

//Plans
import plans from "./plans/reducer"

//Users
import users from "./users/reducer"

//RecoverPassword
import recoverPassword from "./recoverPassword/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  devices,
  backups,
  dashboard,
  profile,
  plans,
  users,
  recoverPassword,
})

export default rootReducer
