import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Container,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  Input,
  FormGroup,
  FormFeedback,
} from "reactstrap"

import { useDispatch } from "react-redux"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

// TOASTIFY
import { showToast } from "./Toast"
import { ToastContainer } from "react-toastify"
/* ACTIONS */
import { changePassword } from "../store/actions"
import PropTypes from 'prop-types';
//i18n
import { withTranslation } from "react-i18next";

const ModalFirstLogin = props => {
  const dispatch = useDispatch()
  /* PROPS */
  const { tog_center, modal_center } = props
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Campo obrigatório"),
    repeat_password: Yup.string()
      .required("Campo obrigatório")
      .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      repeat_password: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setButtonDisabled(true)

        dispatch(await changePassword({ new_password: values.password }))
        props.tog_center()
        showToast("Senha atualizada com sucesso!", {
          type: "success",
        })
      } catch (e) {
        console.log(e)
        props.tog_center()
        setButtonDisabled(false)
      }
    },
  })

  return (
    <>
      <Modal isOpen={modal_center} toggle={tog_center} centered>
        <ModalHeader className="mt-0" toggle={tog_center}>
          {props.t("First access")}
        </ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: "50px" }}>
            Seja bem-vindo ao Painel BS Backups. Como este é o seu primeiro
            acesso, é essencial reforçar a segurança da sua conta redefinindo
            sua senha. Por favor, digite a nova senha abaixo para prosseguir.
          </p>
          <Form
            className="row g-3 needs-validation"
            onSubmit={formik.handleSubmit}
          >
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
                    placeholder="Digite uma nova senha"
                    invalid={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
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
                {props.t("Repeat the password")}
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
                    placeholder="Repita senha "
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
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-success"
                type="submit"
                disabled={buttonDisabled ? true : false}
              >
                {props.t("To change")}
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default withTranslation()(ModalFirstLogin);

ModalFirstLogin.propTypes = {
  t: PropTypes.any
};
