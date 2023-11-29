import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  FormGroup,
  FormFeedback,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Badge,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import moment from "moment"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import PropTypes from 'prop-types';

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

// TOASTIFY
import { showToast } from "../../components/Toast"

/* NOTIFICATION */
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//ACTIONS
import { getProfile, cancelAccount } from "../../store/actions"

//HELPERS
import { convertToCurrencyBRL } from "../../helpers/utils_helper"
//i18n
import { withTranslation } from "react-i18next";

const  Index = props => {
  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* TITLE PAGE */
  document.title = "Minha Conta | BS Backups"

  const { name, email, plan, expires_in, photo } = useSelector(
    state => state.profile.user
  )

  const { nextInvoiceDate, nextInvoiceAmount } = useSelector(
    state => state.profile.nextInvoice
  )

  useEffect(() => {
    async function fetchAll() {
      dispatch(await getProfile())
      setLoading(false)
    }
    fetchAll()
  }, [])

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_modal = () => {
    setModal(!modal)
    removeBodyCss()
  }

  const handleCancel = async () => {
    try {
      dispatch(await cancelAccount())
      tog_modal()
      showToast(
        `Sua conta foi cancelada com sucesso, você ainda tem 30 dias para baixar backups!`,
        {
          type: "success",
        }
      )
      navigate("/dashboard")
    } catch (e) {
      tog_modal()
      showToast(
        `Ocorreu um erro ao tentar cancelar a conta, entre em contato com o suporte.`,
        {
          type: "error",
        }
      )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("BS Backups")} breadcrumbItem={props.t("My account")} />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("My account")}</h4>

              <Row>
                <Col style={{ fontSize: "18px", marginBottom: "10px" }}>
                  <span>{props.t("Signature")}:</span>{" "}
                  <Badge color="primary" className="bg-primary">
                  {props.t("Plano")} {plan.name || ""}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col style={{ fontSize: "18px", marginBottom: "10px" }}>
                  <span>{props.t("Change Plan")}</span>{" "}
                  <Link to="/change-plan">
                    <Button className="btn btn-info btn-sm">
                      <i className="mdi mdi-cached"></i>{props.t("Change Subscription")}
                    </Button>
                  </Link>
                </Col>
              </Row>
              {nextInvoiceDate && (
                <Row>
                  <Col style={{ fontSize: "18px", marginBottom: "10px" }}>
                    <span>{props.t("Next Invoice:")}</span>{" "}
                    <strong>
                      {moment(nextInvoiceDate).format("DD/MM/YYYY")} -{" "}
                      {convertToCurrencyBRL(nextInvoiceAmount)}
                    </strong>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => setModal(true)}
                  >
                    <i className="mdi mdi-delete-circle-outline"></i> {props.t("Cancel Subscription")}
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>

        <Modal isOpen={modal} toggle={tog_modal}>
          <ModalHeader toggle={tog_modal}>
          {props.t("Cancel account")}- <strong>{name}</strong>
          </ModalHeader>
          <ModalBody>
            <p>
              Tem certeza de que deseja cancelar sua conta? <br />
              Se você optar pelo cancelamento, você terá 30 dias para realizar o
              download dos backups gerados. <br />
              Após esse período, o acesso ao sistema não estará mais disponível.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={tog_modal}>
            {props.t("To close")}
            </Button>{" "}
            <Button color="danger" onClick={handleCancel}>
            {props.t("Cancel")}
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Index);

Index.propTypes = {
  t: PropTypes.any
};
