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
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
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
  bytesToSize,
  formatTimestamp,
  formatFileName,
} from "../../helpers/utils_helper"

//services
import { serviceDownloadBackup } from "../../services/download"

//actions
import { getBackupRecords, downloadBackupFilename } from "../../store/actions"

import Loading from "../../components/Loading"
import "./datatables.scss"

function Index(props) {
  /* HOOKS */
  const dispatch = useDispatch()
  const { id } = useParams()
  const { records } = useSelector(state => state.backups)

  /* STATES */
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [menuDropdown, setMenuDropdown] = useState(false)

  const [uuid, setUuid] = useState("")
  const [name, setName] = useState("")

  /* TITLE PAGE */
  document.title = "Baixar Backups | BS Backups"

  useEffect(() => {
    async function fetchAll() {
      dispatch(await getBackupRecords())
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

  const handleDownload = async (backup_id, filename) => {
    try {
      const response = dispatch(
        await downloadBackupFilename(backup_id, filename)
      )
      serviceDownloadBackup(response.payload, filename)
    } catch (e) {
      console.log(e)
    }
  }

  const formattedData = records.map(item => ({
    ...item,
    filename: item.file,
    backup: item.backup.name,
    date: item.created_at,
    options: (
      <div>
        <Button
          type="button"
          color="success"
          size="sm"
          className="waves-effect waves-light"
          onClick={() => handleDownload(item.backup.uuid, item.file)}
        >
          <i className="fas fa-download" style={{ marginRight: "3px" }}></i>
          {props.t("Download")}
        </Button>
      </div>
    ),
  }))

  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="BS Backups" breadcrumbItem="Backups" />
          <Card>
            <CardBody>
              <h4 class="card-title mb-4">{props.t("Download Backups")}</h4>
              {records.length > 0 ? (
                <>
                  <MDBDataTable
                    responsive
                    striped
                    bordered
                    info={false}
                    data={{
                      columns: [
                        {
                          label: "Arquivo",
                          field: "filename",
                          sort: "asc",
                        },
                        {
                          label: "Rotina de Backup",
                          field: "backup",
                          sort: "asc",
                        },
                        {
                          label: "Data Upload",
                          field: "date",
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
                    Não existe nenhum backup no momento para baixar.
                  </Alert>
                </>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

Index.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Index)
