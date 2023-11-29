import React, { useState, useEffect } from "react"
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

import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import moment from "moment"

// TOASTIFY
import { showToast } from "../../components/Toast"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import { addNewUser, updateUser, getUser, getPlans } from "../../store/actions"

//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #b78bcb" : provided.border, // Altere a cor da borda aqui
    boxShadow: state.isFocused ? "0 0 0 1px #b78bcb" : provided.boxShadow, // Opcional: Adicionar uma sombra
    // Outros estilos de controle aqui
  }),
  // Outros estilos aqui
}

function CreateUpdate(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { name, email, description, plan_id, expires_in } = useSelector(
    state => state.users
  )

  console.log(expires_in)

  /* STATES */
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [optionsPlan, setOptionsPlan] = useState([])
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [titlePage, setTitlePage] = useState("Cadastrar")
  const [subdescription, setSubdescription] = useState(
    "Cadastre os usuários para utilizar o sistema!"
  )

  useEffect(() => {
    async function fetchAll() {
      if (id !== undefined) {
        setTitlePage("Atualizar")
        setSubdescription("Edite os usuários para utilizar o sistema!")
        dispatch(await getUser(id))
        setSelectedPlan(plan_id)
      }

      const response = dispatch(await getPlans())
      if (response.payload) {
        setOptionsPlan(
          response.payload.map(item => ({
            label: item.name,
            value: item.id,
          }))
        )
      }
      setLoading(false)
    }

    fetchAll()
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      formik.setValues({
        name,
        email,
        description,
        expires_in: moment(expires_in).format("YYYY-MM-DD"),
      })
    }
  }, [name, email, description, expires_in])

  /* TITLE PAGE */
  document.title = titlePage + " Usuário | BS Backups"

  function handleSelectPlan(item) {
    setSelectedPlan(item ? item.value : null)
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password:
      id !== undefined
        ? Yup.string().notRequired()
        : Yup.string().required("Campo obrigatório"),
    repeat_password:
      id !== undefined
        ? Yup.string().notRequired()
        : Yup.string()
            .required("Campo obrigatório")
            .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
    expires_in: Yup.date().required("Campo obrigatório").nullable(),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      repeat_password: "",
      password: "",
      expires_in: moment().add(30, "days").format("YYYY-MM-DD"),
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setButtonDisabled(true)
        if (id !== undefined) {
          dispatch(await updateUser(id, { ...values, plan_id: selectedPlan }))
          showToast("Usuário atualizado com sucesso!", {
            type: "success",
          })
        } else {
          dispatch(await addNewUser({ ...values, plan_id: selectedPlan }))
          showToast("Usuário cadastrado com sucesso!", {
            type: "success",
          })
        }
        navigate("/users")
      } catch (e) {
        setButtonDisabled(false)
        showToast(
          `Ocorreu um erro ao tentar ${titlePage.toLowerCase()} o usuário, entre em contato com o suporte.`,
          {
            type: "error",
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
            title="Usuários"
            breadcrumbItem={titlePage}
          />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{titlePage}{props.t("User")}</CardTitle>
                  <p className="card-title-desc">{subdescription}</p>
                  <Form
                    className="row g-3 needs-validation"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row className="mb-1">
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
                            placeholder="Digite o nome do usuário"
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

                    <Row className="mb-1">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                       {props.t("Email")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email || ""}
                            type="email"
                            placeholder="Digite o email do usuário"
                            invalid={
                              formik.touched.email && formik.errors.email
                                ? true
                                : false
                            }
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <FormFeedback type="invalid">
                              {formik.errors.email}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>
                    {id === undefined && (
                      <>
                        <Row className="mb-1">
                          <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                          >
                           {props.t("Password")}
                          </label>
                          <div className="col-md-10">
                            <FormGroup>
                              <Input
                                id="password"
                                name="password"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password || ""}
                                type="password"
                                placeholder="Digite uma senha pro usuário"
                                invalid={
                                  formik.touched.password &&
                                  formik.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <FormFeedback type="invalid">
                                  {formik.errors.password}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </div>
                        </Row>

                        <Row className="mb-1">
                          <label
                            htmlFor="example-text-input"
                            className="col-md-2 col-form-label"
                          >
                            {props.t("repeat the password")}
                          </label>
                          <div className="col-md-10">
                            <FormGroup>
                              <Input
                                id="repeat_password"
                                name="repeat_password"
                                className="form-control"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.repeat_password || ""}
                                type="password"
                                placeholder="Repita senha do usuário"
                                invalid={
                                  formik.touched.repeat_password &&
                                  formik.errors.repeat_password
                                    ? true
                                    : false
                                }
                              />
                              {formik.touched.repeat_password &&
                              formik.errors.repeat_password ? (
                                <FormFeedback type="invalid">
                                  {formik.errors.repeat_password}
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </div>
                        </Row>
                      </>
                    )}

                    <Row className="mb-1">
                      <label
                        htmlFor="description-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Description")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description || ""}
                            type="textarea"
                            rows="4"
                            placeholder="Digite uma descrição para o usuário"
                            invalid={
                              formik.touched.description &&
                              formik.errors.description
                                ? true
                                : false
                            }
                          />
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <FormFeedback type="invalid">
                              {formik.errors.description}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

                    <Row className="mb-1">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Plano")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Select
                            value={
                              selectedPlan
                                ? optionsPlan.find(
                                    option => option.value === selectedPlan
                                  )
                                : null
                            }
                            onChange={e => {
                              handleSelectPlan(e)
                            }}
                            classNamePrefix="select2-selection"
                            options={optionsPlan}
                            getOptionValue={option => option.value}
                            getOptionLabel={option => option.label}
                            styles={customStyles}
                            placeholder="Selecione um plano"
                          />
                        </FormGroup>
                      </div>
                    </Row>

                    <Row className="mb-1">
                      <label
                        htmlFor="expires-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Expires in")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="expires_in"
                            name="expires_in"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.expires_in}
                            type="date"
                            placeholder="Digite a data de expiração para o usuário"
                            invalid={
                              formik.touched.expires_in &&
                              formik.errors.expires_in
                                ? true
                                : false
                            }
                          />
                          {formik.touched.expires_in &&
                          formik.errors.expires_in ? (
                            <FormFeedback type="invalid">
                              {formik.errors.expires_in}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

                    <div className="col-12">
                      <button
                        className="btn btn-bs"
                        type="submit"
                        disabled={buttonDisabled ? true : false}
                      >
                        {titlePage}
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

export default  withTranslation()(CreateUpdate);

CreateUpdate.propTypes = {
  t: PropTypes.any
};