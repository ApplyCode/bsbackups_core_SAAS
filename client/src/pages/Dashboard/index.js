import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// Custom Scrollbar
import SimpleBar from "simplebar-react"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"
import servicesIcon4 from "../../assets/images/services-icon/04.png"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"
import smimg1 from "../../assets/images/small/img-1.jpg"
import smimg2 from "../../assets/images/small/img-2.jpg"

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart"
import RadialChart from "../AllCharts/apex/apexdonut"
import Apexdonut from "../AllCharts/apex/apexdonut1"
import SparkLine from "../AllCharts/sparkline/sparkline"
import SparkLine1 from "../AllCharts/sparkline/sparkline1"
import Salesdonut from "../AllCharts/apex/salesdonut"

import "chartist/dist/scss/chartist.scss"

//i18n
import { withTranslation } from "react-i18next"

//actions
import { getDashboard } from "../../store/actions"

/* NOTIFICATION */
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//COMPONENTS
import CardLatestActivities from "../../components/CardLatestActivities"
import ActivitiesReport from "../../components/ActivitiesReport"

const Dashboard = props => {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    quote,
    allocated_volume,
    available_volume,
    backups,
    activities,
    dataActivities,
  } = useSelector(state => state.dashboard)

  useEffect(() => {
    async function fetchAll() {
      try {
        dispatch(await getDashboard())
      } catch (e) {
        /* CASO A CONTA ESTIVER EXPIRADA */
        if (e.response.data.expires !== undefined) {
          navigate("/renew-account")
        }
      }
    }
    fetchAll()
  }, [])

  /* STATES */
  const [menu, setMenu] = useState(false)

  /* ARROW FUNCTIONS */
  const toggle = () => {
    setMenu(!menu)
  }
  document.title = "Dashboard | BS Backups"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">{props.t("Dashboard")}</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                  {props.t("Welcome to the BS Backups Panel")}
                  </li>
                </ol>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    {props.t("MY PLAN")}
                    </h5>
                    <h4 className="fw-medium font-size-24">{quote} GB </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    {props.t("USED ​​SPACE")}
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {allocated_volume} GB{" "}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                    {props.t("AVAILABLE SPACE")}
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {available_volume} GB{" "}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon4} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      {props.t("BACKUP ROUTINES")}
                    </h5>
                    <h4 className="fw-medium font-size-24">{backups}</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* {activities.length > 0 && ( */}
            <Row>
              <Col md={8}>
                <CardLatestActivities list={activities} />
              </Col>
              <Col md={4}>
                <ActivitiesReport
                  data={dataActivities.count}
                  successPercentage={dataActivities.percentage[0]}
                  runningPercentage={dataActivities.percentage[1]}
                  errorPercentage={dataActivities.percentage[2]}
                />
              </Col>
            </Row>
          {/* )} */}
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)

