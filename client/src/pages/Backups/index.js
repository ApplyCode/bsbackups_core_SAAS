import React, { useState, useEffect } from "react"
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Button,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap"
import { MDBDataTable } from "mdbreact"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

/* NOTIFICATION */
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import moment from "moment"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//Helpers
import {
  convertNumberToFrequency,
  convertToDays,
} from "../../helpers/utils_helper"

//actions
import { getBackups, deleteBackup } from "../../store/actions"

import Loading from "../../components/Loading"
import "./datatables.scss"

const Index = props => {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { list } = useSelector(state => state.backups)

  /* STATES */
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [menuDropdown, setMenuDropdown] = useState(false)

  const [uuid, setUuid] = useState("")
  const [name, setName] = useState("")

  /* TITLE PAGE */
  document.title = "Rotina de Backups | BS Backups"

  useEffect(() => {
    async function fetchAll() {
      try {
        dispatch(await getBackups())
        setLoading(false)
      } catch (e) {
        /* CASO A CONTA ESTIVER EXPIRADA */
        if (e.response.data.expires !== undefined) {
          navigate("/renew-account")
        }
      }
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

  const handleDeleteBackup = async () => {
    try {
      dispatch(await deleteBackup(uuid))
      tog_modal()
      toast.success("Backup deletado com sucesso!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (e) {
      tog_modal()
      toast.error("Ocorreu um erro, tente novamente mais tarde!", {
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
  }

  const formattedData = list.map(item => ({
    ...item,
    device: item.device.name,
    type: (
      <div className="d-flex align-items-center">
        <i className="far fa-folder text-primary"></i>
        <div className="text-primary" style={{ marginLeft: "5px" }}>
         {props.t("Files and Folders")}
        </div>
      </div>
    ),
    mode: (
      <div className="d-flex align-items-center">
        {item.mode_schedule ? (
          <Badge color="primary" className="rounded-pill bg-primary">
            {props.t("Simple")}
          </Badge>
        ) : (
          <Badge className="rounded-pill bg-light">{props.t("Custom")}</Badge>
        )}
      </div>
    ),
    frequency: (
      <div className="d-flex align-items-center">
        {item.mode_schedule ? (
          <Badge color="dark" className="rounded-pill bg-dark">
            {convertNumberToFrequency(item.frequency)}
          </Badge>
        ) : (
          <Badge className="rounded-pill bg-dark" color="primary">
            {item.cron_expression}
          </Badge>
        )}
      </div>
    ),
    day: (
      <div className="d-flex align-items-center">
        {convertToDays(
          item.mode_schedule,
          item.frequency,
          item.day_month,
          item.days_week
        )}
      </div>
    ),
    hour: (
      <div className="d-flex align-items-center">
        {moment(item.hour).format("HH:mm")}
      </div>
    ),
    options: (
      <div>
        <Link to={`/backup/${item.uuid}`}>
          <Button
            type="button"
            color="bs"
            size="sm"
            className="waves-effect waves-light"
          >
            <i className="fas fa-database" style={{ marginRight: "3px" }}></i>
            {props.t("Backups")}
          </Button>
        </Link>
        <Link to={`/backups/edit/${item.uuid}`}>
          <Button
            type="button"
            color="info"
            size="sm"
            className="waves-effect waves-light"
            style={{ margin: "0 5px" }}
          >
            <i className="fas fa-edit" style={{ marginRight: "3px" }}></i>
            {props.t("To edit")}
          </Button>
        </Link>
        <Button
          type="button"
          color="danger"
          size="sm"
          className="waves-effect waves-light"
          onClick={() => {
            setUuid(item.uuid)
            setName(item.name)
            tog_modal()
          }}
        >
          <i className="fas fa-trash-alt" style={{ marginRight: "3px" }}></i>
          {props.t("Delete")}
        </Button>
      </div>
    ),
  }))

  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("BS Backups")}
            breadcrumbItem={props.t("Backup Routines")}
            btn={props.t("New Backup Routine")}
            btnRedirect="/backups/create"
          />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("Rotina Backups")}</h4>
              {list.length > 0 ? (
                <>
                  <MDBDataTable
                    responsive
                    striped
                    bordered
                    info={false}
                    data={{
                      columns: [
                        {
                          label: "Nome",
                          field: "name",
                          sort: "asc",
                        },
                        {
                          label: "Dispositivo",
                          field: "device",
                          sort: "asc",
                        },
                        {
                          label: "Tipo",
                          field: "type",
                          sort: "asc",
                        },
                        {
                          label: "Modo",
                          field: "mode",
                          sort: "asc",
                        },
                        {
                          label: "Frequência",
                          field: "frequency",
                          sort: "asc",
                        },
                        {
                          label: "Dia(s)",
                          field: "day",
                          sort: "asc",
                        },
                        {
                          label: "Horário",
                          field: "hour",
                          sort: "asc",
                        },
                        {
                          label: "",
                          field: "options",
                        },
                      ],
                      rows: formattedData,
                    }}
                    searchLabel={props.t("Search")}
                    entriesLabel={props.t("Pagination labelRowsSelect")}
                    paginationLabel={[
                      props.t("Pagination previousAriaLabel"),
                      props.t("Pagination nextAriaLabel"),
                    ]}
                    noRecordsFoundLabel={props.t("Body emptyDataSourceMessage")}
                  />
                </>
              ) : (
                <>
                  <Alert color="danger" className="mb-0" role="alert">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: "none" }}
                    >
                      <symbol
                        id="check-circle-fill"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </symbol>
                      <symbol
                        id="info-fill"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </symbol>
                      <symbol
                        id="exclamation-triangle-fill"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </symbol>
                    </svg>
                    <svg
                      className="bi flex-shrink-0 me-2"
                      width="24"
                      height="24"
                      role="img"
                      aria-label="Danger:"
                    >
                      <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    {props.t("There is no backup routine registered at the moment.")}
                  </Alert>
                </>
              )}
            </CardBody>
          </Card>
        </Container>
        <Modal isOpen={modal} toggle={tog_modal}>
          <ModalHeader toggle={tog_modal}>
          {props.t("Delete Backup")} - <strong>{name}</strong>
          </ModalHeader>
          <ModalBody>
            <p>
            {props.t("Are you sure you want to delete the backup")}{" "}
              <strong>{name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={tog_modal}>
            {props.t("To close")} 
            </Button>{" "}
            <Button color="danger" onClick={handleDeleteBackup}>
            {props.t("Delete")}
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

Index.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(Index);
