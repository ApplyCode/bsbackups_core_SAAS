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
import { useNavigate } from "react-router-dom"
import moment from "moment"
import Breadcrumbs from "../../components/Common/Breadcrumb"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

// TOASTIFY
import { showToast } from "../../components/Toast"

//ACTIONS
import { getProfile, changePlan } from "../../store/actions"

//HELPERS
import { convertToCurrencyBRL } from "../../helpers/utils_helper"

//COMPONENTS
import CardPricing from "../../components/CardPricing"
//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

function Index(props) {
  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [name, setName] = useState("")
  const [id, setId] = useState(null)

  const pricings = [
    {
      id: 1,
      title: "Basic",
      description:
        "O plano Basic é a opção mais acessível para quem busca proteção de dados essencial.",
      icon: "ion ion-md-star",
      price: "49",
      duration: "Por mês",
      link: "",
      features: [
        { pre: "50 GB", title: "Armazenamento" },
        { pre: "Até 2", title: "Dispositivos" },
        { pre: "Até 5", title: "Rotinas de Backup" },
      ],
    },
    {
      id: 2,
      title: "Standard",
      description:
        "O plano Standard é uma escolha intermediária que oferece um equilíbrio entre custo e recursos.",
      icon: "ion ion-ios-trophy",
      price: "89",
      duration: "Por mês",
      link: "",
      features: [
        { pre: "150 GB", title: "Armazenamento" },
        { pre: "Até 5", title: "Dispositivos" },
        { pre: "Até 10", title: "Rotinas de Backup" },
      ],
    },
    {
      id: 3,
      title: "Premium",
      description:
        "O plano Premium é a opção mais avançada e completa para todos os seus backups. ",
      icon: "mdi mdi-diamond",
      price: "127",
      duration: "Por mês",
      link: "",
      features: [
        { pre: "400 GB", title: "Armazenamento" },
        { pre: "Até 20", title: "Dispositivos" },
        { pre: "Até 50", title: "Rotinas de Backup" },
      ],
    },
  ]

  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* TITLE PAGE */
  document.title = "Minha Conta | BS Backups"

  const { plan } = useSelector(state => state.profile.user)

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

  const handleChangePlan = async () => {
    try {
      dispatch(await changePlan(id))
      tog_modal()
      showToast(`Sua assinatura foi alterada com sucesso!`, {
        type: "success",
      })
      navigate("/account")
    } catch (e) {
      tog_modal()
      showToast(
        `Ocorreu um erro ao tentar alterar assinatura, entre em contato com o suporte.`,
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
          <Breadcrumbs title="BS Backups" breadcrumbItem="Mudar Plano" />
          <Row>
            {pricings.map((pricing, key) => (
              <CardPricing
                pricing={pricing}
                key={"_pricing_" + key}
                plan={plan}
                tog_modal={tog_modal}
                setName={setName}
                setId={setId}
              />
            ))}
          </Row>
        </Container>

        <Modal isOpen={modal} toggle={tog_modal}>
          <ModalHeader toggle={tog_modal}>
           {props.t("Alter Plane")} - <strong>{name}</strong>
          </ModalHeader>
          <ModalBody>
            <p>
              Tem certeza de que deseja alterar a sua assinatura? <br />
              Iremos cobrar o valor proporcional da assinatura na sua próxima
              fatura.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={tog_modal}>
            {props.t("To close")}  
            </Button>{" "}
            <Button color="success" onClick={handleChangePlan}>
            {props.t("To alter")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Index);

Index.propTypes = {
  t: PropTypes.any
};