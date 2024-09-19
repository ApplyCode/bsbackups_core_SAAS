import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

import {
  Row,
  Col,
  BreadcrumbItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from "reactstrap"

const Breadcrumb = props => {
  const [setting_Menu, setsetting_Menu] = useState(false)

  return (
    <Row className="align-items-center">
      <Col sm={6}>
        <div className="page-title-box">
          <h4 className="font-size-18">{props.breadcrumbItem}</h4>
          <ol className="breadcrumb mb-0">
            {props.maintitle ? (
              <>
                <BreadcrumbItem>
                  <Link to="/#">{props.maintitle}</Link>
                </BreadcrumbItem>
              </>
            ) : (
              ""
            )}
            <BreadcrumbItem>
              <Link to="/#">{props.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.breadcrumbItem}</BreadcrumbItem>
          </ol>
        </div>
      </Col>
      <Col sm={6}>
        <div className="float-end d-md-block">
          {props.btn && (
            <Link to={props.btnRedirect}>
              <Button className="btn btn-success waves-effect waves-light btn btn-success">
                <i className="fas fa-plus" style={{ marginRight: "5px" }}></i>{" "}
                {props.btn}
              </Button>
            </Link>
          )}
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
}

export default Breadcrumb
