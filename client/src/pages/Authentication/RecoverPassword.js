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

import { Link, useNavigate, useParams } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// action
import { resetPassword } from "../../store/actions"

// import images
import Logo from "../../assets/images/logo-bs.png"

//TOASTIFY
import { showToast } from "../../components/Toast"
import { ToastContainer } from "react-toastify"

const RecoverPassword = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: "",
      repeat_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Campo obrigatório"),
      repeat_password: Yup.string()
        .required("Campo obrigatório")
        .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
    }),
    onSubmit: async values => {
      try {
        setButtonDisabled(true)
        dispatch(await resetPassword(id, { ...values }))
        showToast("Sua senha foi alterada com sucesso!", {
          type: "success",
        })
        navigate("/login")
      } catch (e) {
        setButtonDisabled(false)
        showToast("Ocorreu um erro, token expirado ou inválido!", {
          type: "error",
        })
      }
    },
  })

  document.title = "Resetar Senha | BS Backups"
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-bs">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">Nova Senha</h5>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div class="text-center">
                    <img src={Logo} height="32" alt="logo" />
                  </div>

                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                    className="mt-4"
                  >
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="password">
                        Senha
                      </Label>
                      <Input
                        name="password"
                        className="form-control"
                        placeholder="Digite sua nova senha"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.password}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label" htmlor="password">
                        Repita a Senha
                      </Label>
                      <Input
                        name="repeat_password"
                        className="form-control"
                        placeholder="Digite a sua senha novamente"
                        type="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.repeat_password || ""}
                        invalid={
                          validation.touched.repeat_password &&
                          validation.errors.repeat_password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.repeat_password &&
                      validation.errors.repeat_password ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.repeat_password}</div>
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
                          Resetar Senha
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

export default RecoverPassword
