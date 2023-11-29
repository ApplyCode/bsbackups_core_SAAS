import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { useDispatch, useSelector } from "react-redux"

//ACTIONS
import { getProfile } from "../../../store/actions"

//MODAL primeiro acesso
import ModalFirstLogin from "../../../components/ModalFirstLogin"

//AVATARS
import avatar1 from "../../../assets/images/avatars/1.jpg"
import avatar2 from "../../../assets/images/avatars/2.jpg"
import avatar3 from "../../../assets/images/avatars/3.jpg"
import avatar4 from "../../../assets/images/avatars/4.jpg"
import avatar5 from "../../../assets/images/avatars/5.jpg"
import avatar6 from "../../../assets/images/avatars/6.jpg"
import avatar7 from "../../../assets/images/avatars/7.jpg"
import avatar8 from "../../../assets/images/avatars/8.jpg"

const ProfileMenu = props => {
  const navigate = useNavigate()

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [username, setusername] = useState("Admin")

  const [modal_center, setmodal_center] = useState(false)

  const dispatch = useDispatch()
  const { photo } = useSelector(state => state.profile.user)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.username)
      }
    }
  }, [props.success])

  useEffect(() => {
    async function fetchAll() {
      const res = dispatch(await getProfile())
      if (res.payload.first_access) {
        setmodal_center(true)
      }
    }
    fetchAll()
  }, [])

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_center = () => {
    setmodal_center(!modal_center)
    removeBodyCss()
  }

  const getAvatarProfile = () => {
    switch (photo) {
      case "1.jpg":
        return avatar1
      case "2.jpg":
        return avatar2
      case "3.jpg":
        return avatar3
      case "4.jpg":
        return avatar4
      case "5.jpg":
        return avatar5
      case "6.jpg":
        return avatar6
      case "7.jpg":
        return avatar7
      case "8.jpg":
        return avatar8
      default:
        return avatar1
    }
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={getAvatarProfile()}
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" onClick={() => navigate("/profile")}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => navigate("/account")}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("My account")}{" "}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
      <ModalFirstLogin tog_center={tog_center} modal_center={modal_center} />
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
