import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Card,
  CardBody,
  Form,
  Input,
  FormGroup,
  FormFeedback,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import Breadcrumbs from "../../components/Common/Breadcrumb"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

// TOASTIFY
import { showToast } from "../../components/Toast"

//ACTIONS
import { updateProfile, getProfile } from "../../store/actions"

//AVATARS
import avatar1 from "../../assets/images/avatars/1.jpg"
import avatar2 from "../../assets/images/avatars/2.jpg"
import avatar3 from "../../assets/images/avatars/3.jpg"
import avatar4 from "../../assets/images/avatars/4.jpg"
import avatar5 from "../../assets/images/avatars/5.jpg"
import avatar6 from "../../assets/images/avatars/6.jpg"
import avatar7 from "../../assets/images/avatars/7.jpg"
import avatar8 from "../../assets/images/avatars/8.jpg"

//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

function Index(props) {
  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)

  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name, email, plan, expires_in, photo } = useSelector(
    state => state.profile.user
  )

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
        const response = dispatch(await updateProfile({ name: values.name }))
        showToast("Perfil atualizado com sucesso!", {
          type: "success",
        })
        navigate("/dashboard")
      } catch (e) {
        setButtonDisabled(false)
        showToast(
          "Ocorreu um erro ao atualizar o perfil, tente novamente mais tarde!",
          {
            type: "error",
          }
        )
      }
    },
  })

  useEffect(() => {
    async function fetchAll() {
      dispatch(await getProfile())
      setLoading(false)
    }
    fetchAll()
  }, [])

  useEffect(() => {
    // Initialize the formik values after Redux state is loaded
    formik.setValues({
      name: name,
    })
  }, [name])

  const updateAvatar = async data => {
    dispatch(await updateProfile({ photo: data }))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="BS Backups" breadcrumbItem="Perfil" />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("Avatar")}</h4>
              <div className="avatars d-flex align-items-center justify-content-between">
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "1.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("1.jpg")}
                >
                  <img
                    src={avatar1}
                    alt="Avatar 01"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "2.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("2.jpg")}
                >
                  <img
                    src={avatar2}
                    alt="Avatar 02"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "3.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("3.jpg")}
                >
                  <img
                    src={avatar3}
                    alt="Avatar 03"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "4.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("4.jpg")}
                >
                  <img
                    src={avatar4}
                    alt="Avatar 04"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "5.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("5.jpg")}
                >
                  <img
                    src={avatar5}
                    alt="Avatar 05"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "6.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("6.jpg")}
                >
                  <img
                    src={avatar6}
                    alt="Avatar 06"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "7.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("7.jpg")}
                >
                  <img
                    src={avatar7}
                    alt="Avatar 07"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="item rounded-circle"
                  style={{
                    cursor: "pointer",
                    border: photo === "8.jpg" && "3px solid #a929e6",
                  }}
                  onClick={() => updateAvatar("8.jpg")}
                >
                  <img
                    src={avatar8}
                    alt="Avatar 08"
                    className="avatar-xl rounded-circle img-thumbnail"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h4
                class="card-title mb-4"
                style={{ marginBottom: "20px !important" }}
              >
                {props.t("Account information")}
              </h4>
              <Form
                className="row needs-validation"
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
                        type="text"
                        placeholder="Seu Nome"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        required
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
                        type="text"
                        placeholder="Seu E-mail"
                        v
                        value={email}
                        disabled
                      />
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
                      <Input
                        id="plan"
                        name="plan"
                        className="form-control"
                        type="text"
                        placeholder="Seu Nome"
                        value={plan.name || ""}
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Row>
                <Row className="mb-1">
                  <label
                    htmlFor="example-text-input"
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
                        type="text"
                        placeholder="Expira em"
                        value={
                          expires_in
                            ? moment(expires_in).format("DD/MM/YYYY")
                            : "ILIMITADO"
                        }
                        disabled
                      />
                    </FormGroup>
                  </div>
                </Row>
                <div className="col-12">
                  <button
                    className="btn btn-bs"
                    type="submit"
                    disabled={buttonDisabled ? true : false}
                  >
                    {props.t("To update")}
                  </button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Index);
Index.propTypes = {
  t: PropTypes.any
};
