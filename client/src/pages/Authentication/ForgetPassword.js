import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  Form,
  FormFeedback,
  Label,
  Input,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// Redux
import { connect, useDispatch } from "react-redux"

import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// action
import { recoverPassword } from "../../store/actions"

// import images
import Logo from "../../assets/images/logo-bs.png"

//TOASTIFY
import { showToast } from "../../components/Toast"
import { ToastContainer } from "react-toastify"

const ForgetPasswordPage = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Por favor, digite seu e-mail."),
    }),
    onSubmit: async values => {
      try {
        setButtonDisabled(true)
        dispatch(await recoverPassword(values))
        showToast("Foi enviado um email de recuperação!", {
          type: "success",
        })
        navigate("/login")
      } catch (e) {
        setButtonDisabled(false)
        showToast("Ocorreu um erro, email não encontrado!", {
          type: "error",
        })
      }
    },
  })

  document.title = "Esqueceu a Senha? | BS Backups"
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-bs">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">
                      Esqueceu a Senha
                    </h5>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div class="text-center">
                    <img src={Logo} height="32" alt="logo" />
                  </div>
                  {props.forgetError && props.forgetError ? (
                    <Alert
                      color="danger"
                      style={{ marginTop: "13px" }}
                      className="mt-5"
                    >
                      {props.forgetError}
                    </Alert>
                  ) : null}
                  {props.forgetSuccessMsg ? (
                    <Alert
                      color="success"
                      style={{ marginTop: "13px" }}
                      className="mt-5"
                    >
                      {props.forgetSuccessMsg}
                    </Alert>
                  ) : null}

                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                    className="mt-4"
                  >
                    <div className="mb-3">
                      <Label className="form-label" htmlor="useremail">
                        Email
                      </Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Digite seu e-mail"
                        type="email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.email}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="row  mb-0">
                      <div className="col-12 text-end">
                        <button
                          className="btn btn-bs w-md waves-effect waves-light"
                          type="submit"
                          disabled={buttonDisabled ? true : false}
                        >
                          Recuperar conta
                        </button>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Lembrou sua senha ?{" "}
                  <Link to="/login" className="fw-medium text-bs">
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />  
      </div>
    </React.Fragment>
  )
}

export default ForgetPasswordPage
