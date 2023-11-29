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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

/* NOTIFICATION */
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//actions
import { getDevices, deleteDevice } from "../../store/actions"

import Loading from "../../components/Loading"
//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
function Index(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { list } = useSelector(state => state.devices)

  /* STATES */
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const [uuid, setUuid] = useState("")
  const [name, setName] = useState("")

  /* TITLE PAGE */
  document.title = "Dispositivos | BS Backups"

  useEffect(() => {
    async function fetchAll() {
      try {
        dispatch(await getDevices())
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

  const handleDeleteDevice = async () => {
    try {
      dispatch(await deleteDevice(uuid))
      tog_modal()
      toast.success("Dispositivo deletado com sucesso!", {
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

  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="BS Backups"
            breadcrumbItem="Dispositivos"
            btn="Novo Dispositivo"
            btnRedirect="/devices/create"
          />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("Devices")}</h4>
              {list.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th className="align-middle" width="25%">
                          {props.t("Name")}
                          </th>
                          <th className="align-middle" width="25%">
                          {props.t("Device")}
                          </th>
                          <th className="align-middle" width="25%">
                          {props.t("Status")} 
                          </th>
                          <th className="align-middle" width="25%">
                          {props.t("Options")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, key) => (
                          <tr key={"_tr_" + key}>
                            <td>{item.name}</td>
                            <td>
                              <Badge
                                className="rounded-pill bg-dark"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "140px",
                                  justifyContent: "space-between",
                                  paddingLeft: "1.6em",
                                  paddingRight: "1.6em",
                                }}
                              >
                                <i className="fab fa-2x fa-windows text-white"></i>
                                <span className="text-white">
                                {props.t("Windows")}{" "}
                                  {item.device_types_id === 1 ? "64" : "32"}{" "}
                                bits
                                </span>
                              </Badge>
                            </td>
                            <td>
                              <Badge className="rounded-pill bg-success">
                              {props.t("Active")}
                              </Badge>
                            </td>
                            <td>
                              <Link to={`/devices/edit/${item.uuid}`}>
                                <Button
                                  type="button"
                                  color="info"
                                  size="sm"
                                  className="waves-effect waves-light"
                                  style={{ margin: "0 5px" }}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{ marginRight: "3px" }}
                                  ></i>
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
                                <i
                                  className="fas fa-trash-alt"
                                  style={{ marginRight: "3px" }}
                                ></i>
                                {props.t("Delete")}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>{" "}
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
                    Não existe nenhum dispositivo cadastrado no momento.
                  </Alert>
                </>
              )}
            </CardBody>
          </Card>
        </Container>
        <Modal isOpen={modal} toggle={tog_modal}>
          <ModalHeader toggle={tog_modal}>
          {props.t("Excluir Dispositivo ")} - <strong>{name}</strong>
          </ModalHeader>
          <ModalBody>
            <p>
              Você tem certeza de que deseja excluir o dispositivo{" "}
              <strong>{name}</strong>? Essa ação resultará na desativação de
              todos os backups associados a ele.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={tog_modal}>
            {props.t("To close")}
            </Button>{" "}
            <Button color="danger" onClick={handleDeleteDevice}>
            {props.t("Delete")} 
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default Index
Index.propTypes = {
  t: PropTypes.any
};