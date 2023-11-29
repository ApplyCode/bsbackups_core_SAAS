import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Label,
  Form,
  FormFeedback,
  Input,
} from "reactstrap"

// Redux
import { connect, useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// TOASTIFY
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//AUTH
import { loginAuth } from "../../services/auth"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import Logo from "../../assets/images/logo-bs.png"

const Login = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState([])

  const { user } = useSelector(state => ({
    user: state.Account.user,
  }))

  useEffect(() => {
    if (user && user) {
      setUserLogin({
        email: user.email,
        password: user.password,
      })
    }
  }, [user])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "",
      password: userLogin.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Por favor, digite o seu e-mail."),
      password: Yup.string().required("Por favor, digite a sua senha."),
    }),
    onSubmit: async values => {
      try {
        const response = dispatch(
          await loginUser(values, props.router.navigate)
        )
        loginAuth(response.payload.token)
        navigate("/")
      } catch (e) {
        toast.error("Credenciais incorretas, tente novamente!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    },
  })

  document.title = "Login | BS Backups"
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-bs">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">Bem Vindo !</h5>
                    <p className="text-white-50">
                      Preencha os dados abaixo para logar
                    </p>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div class="text-center">
                    <img src={Logo} height="32" alt="logo" />
                  </div>
                  <div className="p-3">
                    <Form
                      className="mt-4"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                      action="#"
                    >
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="username">
                          E-mail
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Digite seu e-mail"
                          type="email"
                          id="username"
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
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="userpassword">
                          Senha
                        </Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          className="form-control"
                          placeholder="Digite sua senha"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
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
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Lembrar-me
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6 text-end">
                          <button
                            className="btn btn-bs w-md waves-effect waves-light"
                            type="submit"
                          >
                            Entrar
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password" className="text-bs">
                            <i className="mdi mdi-lock"></i> Esqueceu a senha?
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
