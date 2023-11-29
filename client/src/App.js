import PropTypes from "prop-types"
import React from "react"
import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<Authmiddleware>{route.component}</Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
