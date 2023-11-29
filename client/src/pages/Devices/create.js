import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  FormGroup,
  FormFeedback,
} from "reactstrap"

import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// TOASTIFY
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import { addNewDevice } from "../../store/actions"
//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

function Create(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* STATES */
  const [name, setName] = useState("")
  const [device_types_id, setDeviceId] = useState("1")
  const [buttonDisabled, setButtonDisabled] = useState(false)

  /* TITLE PAGE */
  document.title = "Cadastrar Dispositivo | BS Backups"

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setButtonDisabled(true)
        const response = dispatch(
          await addNewDevice({ name: values.name, device_types_id })
        )
        navigate("/devices/installation")
      } catch (e) {
        setButtonDisabled(false)
        toast.error(
          "Ocorreu um erro ao cadastrar, tente novamente mais tarde!",
          {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            maintitle="Bs Backups"
            title="Dispositivos"
            breadcrumbItem="Cadastrar"
          />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{props.t("Register Device")}</CardTitle>
                  <p className="card-title-desc">
                    Cadastre um dispositivo para organizar melhor os seus
                    backups
                  </p>
                  <Form
                    className="row g-3 needs-validation"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Name")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="name"
                            name="name"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name || ""}
                            type="text"
                            placeholder="Nomeie seu dispositivo"
                            invalid={
                              formik.touched.name && formik.errors.name
                                ? true
                                : false
                            }
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <FormFeedback type="invalid">
                              {formik.errors.name}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Device")}
                      </label>
                      <div className="col-md-10">
                        <div className="options d-flex justify-content-around">
                          <div
                            className="option-device d-flex flex-sm-column align-items-center"
                            style={{
                              padding: "15px",
                              borderRadius: "25px",
                              cursor: "pointer",
                              border:
                                device_types_id === "1"
                                  ? "3px solid #a929e6"
                                  : "",
                            }}
                            onClick={() => setDeviceId("1")}
                          >
                            <i
                              className={`fab fa-3x fa-windows ${
                                device_types_id === "1" && "text-bs"
                              }`}
                            ></i>
                            <span
                              className={
                                device_types_id === "1" ? "text-bs" : ""
                              }
                            >
                              
                            </span>
                          </div>
                          <div
                            className="option-device d-flex flex-sm-column align-items-center"
                            style={{
                              padding: "15px",
                              borderRadius: "25px",
                              cursor: "pointer",
                              border:
                                device_types_id === "2"
                                  ? "3px solid #a929e6"
                                  : "",
                            }}
                            onClick={() => setDeviceId("2")}
                          >
                            <i
                              className={`fab fa-3x fa-windows ${
                                device_types_id === "2" && "text-bs"
                              }`}
                            ></i>
                            <span
                              className={
                                device_types_id === "2" ? "text-bs" : ""
                              }
                            >
                              Windows 32 Bits
                            </span>
                          </div>
                          <div
                            className="option-device d-flex flex-sm-column align-items-center"
                            style={{
                              padding: "15px",
                              borderRadius: "25px",
                            }}
                          >
                            <i className="fab fa-3x fa-apple"></i>
                            <span className="mt-1">MacOS</span>
                          </div>
                          <div
                            className="option-device d-flex flex-sm-column align-items-center"
                            style={{
                              padding: "15px",
                              borderRadius: "25px",
                            }}
                          >
                            <i className="fab fa-3x fa-linux"></i>
                            <span className="mt-1">Linux</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="col-12">
                      <button
                        className="btn btn-bs"
                        type="submit"
                        disabled={buttonDisabled ? true : false}
                      >
                        {props.t("Register")}
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Create);

Create.propTypes = {
  t: PropTypes.any
};
