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

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"

// TOASTIFY
import { showToast } from "../../components/Toast"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import { addNewPlan, updatePlan, getPlan } from "../../store/actions"
import PropTypes from 'prop-types';

//i18n
import { withTranslation } from "react-i18next";

function CreateUpdate(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { name, slug, description, quota, backups, devices, price_stripe_id } =
    useSelector(state => state.plans)

  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [titlePage, setTitlePage] = useState("Cadastrar")
  const [subdescription, setSubdescription] = useState(
    "Cadastre os seus planos para organizar o uso dos seus clientes!"
  )

  useEffect(() => {
    async function fetchAll() {
      if (id !== undefined) {
        setTitlePage("Atualizar")
        setSubdescription(
          "Edite os seus planos para organizar o uso dos seus clientes!"
        )
        dispatch(await getPlan(id))
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      formik.setValues({
        name,
        slug,
        description,
        quota,
        backups,
        devices,
        price_stripe_id,
      })
    }
  }, [name, slug, description, quota, backups, devices, price_stripe_id])

  /* TITLE PAGE */
  document.title = titlePage + " Plano | BS Backups"

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    slug: Yup.string()
      .required("Campo obrigatório")
      .matches(/^[a-z]+$/, "Apenas letras minúsculas são permitidas")
      .min(4, "Mínimo de 4 caracteres")
      .max(30, "Máximo de 30 caracteres"),
    quota: Yup.string()
      .required("Campo obrigatório")
      .min(0, "O número mínimo permitido é 0")
      .max(100000, "O número máximo permitido é 100000"),
    backups: Yup.string()
      .required("Campo obrigatório")
      .min(0, "O número mínimo permitido é 0")
      .max(100, "O número máximo permitido é 100"),
    devices: Yup.string()
      .required("Campo obrigatório")
      .min(0, "O número mínimo permitido é 0")
      .max(50, "O número máximo permitido é 50"),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      quota: 10,
      backups: 5,
      devices: 2,
      price_stripe_id: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setButtonDisabled(true)
        if (id !== undefined) {
          dispatch(await updatePlan(id, { ...values }))
          showToast("Plano atualizado com sucesso!", {
            type: "success",
          })
        } else {
          dispatch(await addNewPlan({ ...values }))
          showToast("Plano cadastrado com sucesso!", {
            type: "success",
          })
        }
        navigate("/plans")
      } catch (e) {
        setButtonDisabled(false)
        showToast(
          `Ocorreu um erro ao tentar ${titlePage.toLowerCase()} o plano, entre em contato com o suporte.`,
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
            title="Planos"
            breadcrumbItem={titlePage}
          />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{titlePage}{props.t("Plano")}</CardTitle>
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
                            placeholder="Digite um nome para o plano"
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
                        htmlFor="slug-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Slug")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="slug"
                            name="slug"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.slug || ""}
                            type="text"
                            placeholder="Digite um slug para o plano"
                            invalid={
                              formik.touched.slug && formik.errors.slug
                                ? true
                                : false
                            }
                          />
                          {formik.touched.slug && formik.errors.slug ? (
                            <FormFeedback type="invalid">
                              {formik.errors.slug}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

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
                            placeholder="Digite uma descrição para o plano"
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
                        htmlFor="quota-text-input"
                        className="col-md-2 col-form-label"
                      >
                       {props.t("Quota")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="quota"
                            name="quota"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.quota || ""}
                            type="number"
                            placeholder="Digite a quota em GB do plano"
                            invalid={
                              formik.touched.quota && formik.errors.quota
                                ? true
                                : false
                            }
                          />
                          {formik.touched.quota && formik.errors.quota ? (
                            <FormFeedback type="invalid">
                              {formik.errors.quota}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

                    <Row className="mb-1">
                      <label
                        htmlFor="backups-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Backups")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="backups"
                            name="backups"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.backups || ""}
                            type="number"
                            placeholder="Digite a quantidade de rotina de backups do plano"
                            invalid={
                              formik.touched.backups && formik.errors.backups
                                ? true
                                : false
                            }
                          />
                          {formik.touched.backups && formik.errors.backups ? (
                            <FormFeedback type="invalid">
                              {formik.errors.backups}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

                    <Row className="mb-1">
                      <label
                        htmlFor="devices-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Devices")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="devices"
                            name="devices"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.devices || ""}
                            type="number"
                            placeholder="Digite a quantidade de dispositivos do plano"
                            invalid={
                              formik.touched.devices && formik.errors.devices
                                ? true
                                : false
                            }
                          />
                          {formik.touched.devices && formik.errors.devices ? (
                            <FormFeedback type="invalid">
                              {formik.errors.devices}
                            </FormFeedback>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Row>

                    <Row className="mb-1">
                      <label
                        htmlFor="price-stripe-text-input"
                        className="col-md-2 col-form-label"
                      >
                        {props.t("Price Stripe ID")}
                      </label>
                      <div className="col-md-10">
                        <FormGroup>
                          <Input
                            id="price_stripe_id"
                            name="price_stripe_id"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price_stripe_id || ""}
                            type="text"
                            placeholder="Digite o price stripe id"
                            invalid={
                              formik.touched.price_stripe_id &&
                              formik.errors.price_stripe_id
                                ? true
                                : false
                            }
                          />
                          {formik.touched.price_stripe_id &&
                          formik.errors.price_stripe_id ? (
                            <FormFeedback type="invalid">
                              {formik.errors.price_stripe_id}
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
