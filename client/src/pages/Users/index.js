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
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import PropTypes from "prop-types"

/* NOTIFICATION */
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { showToast } from "../../components/Toast"

import moment from "moment"

import Breadcrumbs from "../../components/Common/Breadcrumb"

//Helpers
import {
  convertNumberToFrequency,
  convertToDays,
} from "../../helpers/utils_helper"

//actions
import { getUsers, deleteUser } from "../../store/actions"

import Loading from "../../components/Loading"
import "./datatables.scss"

function Index(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const { list } = useSelector(state => state.users)

  /* STATES */
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [menuDropdown, setMenuDropdown] = useState(false)

  const [uuid, setUuid] = useState("")
  const [name, setName] = useState("")

  /* TITLE PAGE */
  document.title = "Usuários | BS Backups"

  useEffect(() => {
    async function fetchAll() {
      dispatch(await getUsers())
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

  const handleDelete = async () => {
    try {
      dispatch(await deleteUser(uuid))
      tog_modal()
      showToast(`Usuário deletado com sucesso!`, {
        type: "success",
      })
    } catch (e) {
      tog_modal()
      showToast(
        `Ocorreu um erro ao tentar excluir o usuário, entre em contato com o suporte.`,
        {
          type: "error",
        }
      )
    }
  }

  const formattedData = list.map(item => ({
    ...item,
    admin: (
      <>
        {item.admin ? (
          <Badge color="dark" className="rounded-pill bg-dark">
            {props.t("Administrator")}
          </Badge>
        ) : (
          <Badge color="success" className="rounded-pill bg-success">
            {props.t("Client")}
          </Badge>
        )}
      </>
    ),
    plan: (
      <Badge color="primary" className="rounded-pill bg-primary">
        {item.plan ? item.plan.name : "Normal"}
      </Badge>
    ),
    expires_in: item.expires_in
      ? moment(item.expires_in).format("DD/MM/YYYY")
      : "01/01/2099",
    options: (
      <div>
        <Link to={`/users/edit/${item.uuid}`}>
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
        {item.admin != 1 && (
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
        )}
      </div>
    ),
  }))

  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="BS Backups"
            breadcrumbItem="Usuários"
            btn="Novo Usuário"
            btnRedirect="/users/create"
          />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("Users")}</h4>
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
                          label: "Email",
                          field: "email",
                          sort: "asc",
                        },
                        {
                          label: "Tipo de Conta",
                          field: "admin",
                          sort: "asc",
                        },
                        {
                          label: "Plano",
                          field: "plan",
                          sort: "asc",
                        },
                        {
                          label: "Expira em",
                          field: "expires_in",
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
                    Não existe nenhum usuário cadastrada no momento.
                  </Alert>
                </>
              )}
            </CardBody>
          </Card>
        </Container>
        <Modal isOpen={modal} toggle={tog_modal}>
          <ModalHeader toggle={tog_modal}>
          {props.t("Delete User")} - <strong>{name}</strong>
          </ModalHeader>
          <ModalBody>
            <p>
              Você tem certeza de que deseja excluir o usuário{" "}
              <strong>{name}</strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={tog_modal}>
            {props.t("To close")}
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
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
export default withTranslation()(Index)
