import React, { useState, useEffect } from "react"
import {
  Container,
  Badge,
  Button,
  Row,
  Label,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  InputGroup,
  FormGroup,
  FormFeedback,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap"

import Select from "react-select"
import { useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import classnames from "classnames"
import moment from "moment"

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

// TOASTIFY
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { showToast } from "../../components/Toast"

/* VALIDATIONS */
import * as Yup from "yup"
import { useFormik } from "formik"

//HELPERS
import { convertToDaysWeek } from "../../helpers/utils_helper"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import Loading from "../../components/Loading"
//actions
import {
  getDevices,
  createBackup,
  getBackup,
  updateBackup,
} from "../../store/actions"
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

const optionsFrequency = [
  { value: "1", label: "Mensalmente" },
  { value: "2", label: "Semanalmente" },
  { value: "3", label: "Diariamente" },
]

const optionsDayMonth = [
  { value: "1", label: "01" },
  { value: "2", label: "02" },
  { value: "3", label: "03" },
  { value: "4", label: "04" },
  { value: "5", label: "05" },
  { value: "6", label: "06" },
  { value: "7", label: "07" },
  { value: "8", label: "08" },
  { value: "9", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
]

const Create = props => {
  /* HOOKS */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  /* STATES */
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(1)
  const [progressValue, setProgressValue] = useState(25)
  const [activeTabVertical, setToggleTabVertical] = useState(1)
  const [modal, setModal] = useState(false)
  const [titlePage, setTitlePage] = useState("Cadastrar")

  /* DATA */
  const [name, setName] = useState("")

  const [selectedDevice, setSelectedDevice] = useState(null)
  const [optionsDevice, setOptionsDevice] = useState([])

  const [path, setPath] = useState("")
  const [retention, setRetention] = useState("9999")

  /* AGENDAMENTO */
  const [modeSchedule, setModeSchedule] = useState(true)
  const [selectedFrequency, setSelectedFrequency] = useState(null)
  const [selectedDayMonth, setSelectedDayMonth] = useState(null)
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(null)
  const [wednesday, setWednesday] = useState(null)
  const [thursday, setThursday] = useState(null)
  const [friday, setFriday] = useState(null)
  const [saturday, setSaturday] = useState(null)
  const [sunday, setSunday] = useState(null)
  const [hour, setHour] = useState(null)
  const [cronExpression, setCronExpression] = useState("")

  /* CRIPTOGRAFIA */
  const [encryptionType, setEncryptionType] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      const response = dispatch(await getDevices())

      if (response.payload) {
        setOptionsDevice(
          response.payload.map(item => ({
            label: item.name,
            value: item.id,
          }))
        )
      }

      if (id !== undefined) {
        const res = dispatch(await getBackup(id))
        setName(res.payload.backup.name)
        setSelectedDevice(res.payload.backup.device_id)
        setPath(res.payload.backup.path)
        setRetention(res.payload.backup.retention)
        setModeSchedule(!!res.payload.backup.mode_schedule)
        setSelectedFrequency(res.payload.backup.frequency)
        setSelectedDayMonth(res.payload.backup.day_month)
        setHour(res.payload.backup.hour)

        if (res.payload.backup.frequency === "2") {
          var day_week = JSON.parse(res.payload.backup.days_week)
          setSunday(day_week[0])
          setMonday(day_week[1])
          setTuesday(day_week[2])
          setWednesday(day_week[3])
          setThursday(day_week[4])
          setFriday(day_week[5])
          setSaturday(day_week[6])
        }
        setCronExpression(res.payload.backup.cron_expression)
        setTitlePage("Atualizar")
      }

      setLoading(false)
    }
    fetchAll()
  }, [])

  /* TITLE PAGE */
  document.title = titlePage + " Backup | BS Backups"

  const toggleModal = () => {
    setModal(!modal)
    document.body.classList.add("no_padding")
  }

  function handleSelectDevice(item) {
    setSelectedDevice(item ? item.value : null)
  }

  function handleSelectFrequency(item) {
    setSelectedFrequency(item ? item.value : null)
  }

  function handleSelectDayMonth(item) {
    setSelectedDayMonth(item ? item.value : null)
  }

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVertical !== tab) {
      if (tab >= 1 && tab <= 4) {
        seToggleTabVertical(tab)
      }
    }
  }

  function toggleTabProgress(tab) {
    if (activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 4) {
        setActiveTabProgress(tab)

        if (tab === 1) {
          setProgressValue(25)
        }
        if (tab === 2) {
          setProgressValue(50)
        }
        if (tab === 3) {
          setProgressValue(75)
        }
        if (tab === 4) {
          setProgressValue(100)
        }
      }
    }
  }

  const handleValidation = () => {
    /* NOME */
    if (name === "") {
      return showToast("Você precisa escolher um nome para o backup.", {
        type: "error",
      })
    }
    /*  DISPOSITIVO */
    if (selectedDevice === null) {
      return showToast(
        "Você precisa selecionar um dispositivo para cadastrar o backup.",
        {
          type: "error",
        }
      )
    }
    /* PATH */
    if (path === "") {
      return showToast(
        "Você precisa preencher o caminho do diretório de arquivos que deseja realizar o backup.",
        {
          type: "error",
        }
      )
    }

    if (modeSchedule) {
      if (selectedFrequency === null) {
        return showToast("Você precisa escolher a frequência do seu backup.", {
          type: "error",
        })
      }

      if (hour === null) {
        return showToast(
          "Você precisa escolher um horário para executar o backup.",
          {
            type: "error",
          }
        )
      }

      if (selectedFrequency && selectedFrequency.value === "1") {
        if (selectedDayMonth === null) {
          return showToast(
            "Você precisa escolher um dia para executar o backup.",
            {
              type: "error",
            }
          )
        }
      }

      if (selectedFrequency && selectedFrequency.value === "2") {
        if (
          !sunday &&
          !monday &&
          !tuesday &&
          !wednesday &&
          !thursday &&
          !friday &&
          !saturday
        ) {
          return showToast(
            "Você precisa escolher ao menos um dia da semana para executar o backup.",
            {
              type: "error",
            }
          )
        }
      }
    } else {
      if (cronExpression === "") {
        return showToast(
          "Você precisa preencher a expressão cron para executar o backup.",
          {
            type: "error",
          }
        )
      }
    }

    toggleModal()
  }
  const handleSubmit = async e => {
    try {
      if (id !== undefined) {
        dispatch(
          await updateBackup(id, {
            name: name,
            device_id: selectedDevice,
            path: path,
            retention: retention,
            cron_expression: cronExpression,
            mode_schedule: modeSchedule,
            frequency: selectedFrequency ? selectedFrequency : null,
            hour: hour,
            day_month: selectedDayMonth ? selectedDayMonth : null,
            days_week: [
              sunday,
              monday,
              tuesday,
              wednesday,
              thursday,
              friday,
              saturday,
            ],
            encryption: encryptionType,
          })
        )
        showToast("Backup atualizado com sucesso!", {
          type: "success",
        })
      } else {
        dispatch(
          await createBackup({
            name: name,
            device_id: selectedDevice,
            path: path,
            retention: retention,
            cron_expression: cronExpression,
            mode_schedule: modeSchedule,
            frequency: selectedFrequency ? selectedFrequency : null,
            hour: hour,
            day_month: selectedDayMonth ? selectedDayMonth : null,
            days_week: [
              sunday,
              monday,
              tuesday,
              wednesday,
              thursday,
              friday,
              saturday,
            ],
            encryption: encryptionType,
          })
        )
        showToast("Backup cadastrado com sucesso!", {
          type: "success",
        })
      }
      navigate("/backups")
    } catch (e) {
      console.log(e)
      showToast(
        `Ocorreu um erro ao tentar ${titlePage.toLowerCase()} o backup, entre em contato com o suporte.`,
        {
          type: "error",
        }
      )
    }
  }
  if (loading) return <Loading />

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            maintitle={props.t("Bs Backups")}
            title={props.t("Backup Routines")}
            breadcrumbItem={titlePage}
          />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{titlePage} {props.t("Backup")}</CardTitle>
                  <div className="form-horizontal form-wizard-wrapper wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setActiveTab(1)
                            }}
                          >
                            <span className="number">1.</span>{props.t("Backup Set")}
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setActiveTab(2)
                            }}
                          >
                            <span className="number">2.</span>{props.t("Backup Source")}
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setActiveTab(3)
                            }}
                          >
                            <span className="number">3.</span>
                            {props.t("Scheduling")}
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setActiveTab(4)
                            }}
                          >
                            <span className="number">4.</span>
                            {props.t("Cryptography")}
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtName"
                                  className="col-lg-3 col-form-label"
                                >
                                 {props.t("Name")}
                                </label>
                                <div className="col-lg-9">
                                  <Input
                                    id="txtName"
                                    type="text"
                                    className="form-control"
                                    placeholder={props.t("Enter a name for the backup")}
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                  />
                                </div>
                              </Row>
                            </Col>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtFirstNameBilling"
                                  className="col-lg-3 col-form-label"
                                >
                                  {props.t("Device")}
                                </label>
                                <div className="col-lg-9">
                                  <Select
                                    value={
                                      selectedDevice
                                        ? optionsDevice.find(
                                            option =>
                                              option.value === selectedDevice
                                          )
                                        : null
                                    }
                                    onChange={e => {
                                      handleSelectDevice(e)
                                    }}
                                    classNamePrefix="select2-selection"
                                    options={optionsDevice}
                                    getOptionValue={option => option.value}
                                    getOptionLabel={option => option.label}
                                    styles={customStyles}
                                    placeholder="Selecione um dispositivo"
                                  />
                                </div>
                              </Row>
                            </Col>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtFirstNameBilling"
                                  className="col-lg-3 col-form-label"
                                >
                                  {props.t("Type")}
                                </label>
                                <div className="col-lg-9 d-flex">
                                  <div className="d-flex align-items-center">
                                    <i className="far fa-2x fa-folder text-primary"></i>
                                    <div
                                      className="text-primary"
                                      style={{ marginLeft: "5px" }}
                                    >
                                     {props.t("Files and Folders")}
                                    </div>
                                  </div>
                                </div>
                              </Row>
                            </Col>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <Form>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtPath"
                                  className="col-lg-3 col-form-label"
                                >
                                 {props.t("Backup")}
                                </label>
                                <div className="col-lg-9">
                                  <Input
                                    type="textarea"
                                    id="textPath"
                                    className="form-control"
                                    rows="5"
                                    onChange={e => setPath(e.target.value)}
                                    value={path}
                                  />
                                </div>
                              </Row>
                            </Col>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtRetention"
                                  className="col-lg-3 col-form-label"
                                >
                                {props.t("How many backup copies should we keep?")}
                                </label>
                                <div className="col-lg-9">
                                  <Input
                                    type="number"
                                    id="txtRetention"
                                    name="retention"
                                    value={retention}
                                    min={1}
                                    max={9999}
                                    onChange={e => setRetention(e.target.value)}
                                  />
                                </div>
                              </Row>
                            </Col>
                          </Form>
                        </TabPane>
                        <TabPane tabId={3}>
                          <Form>
                            <Col md={12}>
                              <Row className="mb-3">
                                <label
                                  htmlFor="txtFirstNameBilling"
                                  className="col-lg-3 col-form-label"
                                >
                                 {props.t("Simplified Mode")}
                                </label>
                                <div className="col-lg-9">
                                  <div className="square-switch">
                                    <input
                                      type="checkbox"
                                      id="square-switch1"
                                      switch="none"
                                      checked={modeSchedule}
                                      onChange={() => {
                                        setModeSchedule(!modeSchedule)
                                      }}
                                    />
                                    <label
                                      htmlFor="square-switch1"
                                      data-on-label="On"
                                      data-off-label="Off"
                                    />
                                  </div>
                                </div>
                              </Row>
                            </Col>

                            {modeSchedule ? (
                              <>
                                <Col md={12}>
                                  <Row className="mb-3">
                                    <label
                                      htmlFor="txtFirstNameBilling"
                                      className="col-lg-3 col-form-label"
                                    >
                                     {props.t("Frequency")}
                                    </label>
                                    <div className="col-lg-9">
                                      <Select
                                        value={
                                          selectedFrequency
                                            ? optionsFrequency.find(
                                                option =>
                                                  option.value ===
                                                  selectedFrequency
                                              )
                                            : null
                                        }
                                        onChange={e => {
                                          handleSelectFrequency(e)
                                        }}
                                        classNamePrefix="select2-selection"
                                        options={optionsFrequency}
                                        getOptionValue={option => option.value}
                                        getOptionLabel={option => option.label}
                                        styles={customStyles}
                                        placeholder={props.t("Select backup frequency")}
                                      />
                                    </div>
                                  </Row>
                                </Col>
                                {selectedFrequency !== null && (
                                  <>
                                    {selectedFrequency === "1" && (
                                      <Col md={12}>
                                        <Row className="mb-3">
                                          <label
                                            htmlFor="txtFirstNameBilling"
                                            className="col-lg-3 col-form-label"
                                          >
                                           {props.t("Back up on the next day of the month")}
                                          </label>
                                          <div className="col-lg-9">
                                            <Select
                                              value={
                                                selectedDayMonth
                                                  ? optionsDayMonth.find(
                                                      option =>
                                                        option.value ===
                                                        selectedDayMonth
                                                    )
                                                  : null
                                              }
                                              onChange={e => {
                                                handleSelectDayMonth(e)
                                              }}
                                              classNamePrefix="select2-selection"
                                              options={optionsDayMonth}
                                              getOptionValue={option =>
                                                option.value
                                              }
                                              getOptionLabel={option =>
                                                option.label
                                              }
                                              styles={customStyles}
                                              placeholder={props.t("Select the day of the month you want to run the backup")}
                                            />
                                          </div>
                                        </Row>
                                      </Col>
                                    )}
                                    {selectedFrequency === "2" && (
                                      <Col md={12}>
                                        <Row className="mb-3">
                                          <label
                                            htmlFor="txtFirstNameBilling"
                                            className="col-lg-3 col-form-label"
                                          >
                                            {props.t("Back up on the following day(s) every week:")}
                                          </label>
                                          <div className="col-lg-9 d-flex align-items-center">
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={sunday}
                                                name="sunday"
                                                onChange={e =>
                                                  setSunday(!sunday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleSunday"
                                              >
                                               {props.t("Domingo")}
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={monday}
                                                name="monday"
                                                onChange={e =>
                                                  setMonday(!monday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleMonday"
                                              >
                                               {props.t("Second")}
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={tuesday}
                                                name="tuesday"
                                                onChange={e =>
                                                  setTuesday(!tuesday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleTuesday"
                                              >
                                                {props.t("Third")}Terça
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={wednesday}
                                                name="wednesday"
                                                onChange={e =>
                                                  setWednesday(!wednesday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleWednesday"
                                              >
                                               {props.t("Fourth")}
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={thursday}
                                                name="thursday"
                                                onChange={e =>
                                                  setThursday(!thursday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleThursday"
                                              >
                                               {props.t("Quinta")}
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={friday}
                                                name="friday"
                                                onChange={e =>
                                                  setFriday(!friday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleFriday"
                                              >
                                                {props.t("Friday")}
                                              </Label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                              <Input
                                                type="checkbox"
                                                checked={saturday}
                                                name="saturday"
                                                onChange={e =>
                                                  setSaturday(!saturday)
                                                }
                                                className="form-check-input"
                                              />
                                              <Label
                                                className="form-check-label"
                                                htmlFor="customRadioScheduleSaturday"
                                              >
                                               {props.t("Saturday")}
                                              </Label>
                                            </div>
                                          </div>
                                        </Row>
                                      </Col>
                                    )}
                                    <Col md={12}>
                                      <Row className="mb-3">
                                        <label
                                          htmlFor="txtFirstNameBilling"
                                          className="col-lg-3 col-form-label"
                                        >
                                          {props.t("Time")}
                                        </label>
                                        <div className="col-lg-9">
                                          <InputGroup>
                                            <Flatpickr
                                              className="form-control d-block"
                                              placeholder={props.t("Select the best time to run the backup")}
                                              options={{
                                                enableTime: true,
                                                noCalendar: true,
                                                dateFormat: "H:i",
                                                time_24hr: true,
                                              }}
                                              value={hour}
                                              onChange={([date]) =>
                                                setHour(date)
                                              }
                                            />
                                            <div className="input-group-append">
                                              <span className="input-group-text">
                                                <i className="mdi mdi-clock-outline" />
                                              </span>
                                            </div>
                                          </InputGroup>
                                        </div>
                                      </Row>
                                    </Col>
                                  </>
                                )}
                              </>
                            ) : (
                              <Col md={12}>
                                <Row className="mb-3">
                                  <label
                                    htmlFor="txtCronExpression"
                                    className="col-lg-3 col-form-label"
                                  >
                                   {props.t("Cron Expression")}
                                  </label>
                                  <div className="col-lg-9">
                                    <Input
                                      id="txtCronExpression"
                                      type="text"
                                      className="form-control"
                                      placeholder={props.t("Enter the cron expression")}
                                      value={cronExpression}
                                      onChange={e =>
                                        setCronExpression(e.target.value)
                                      }
                                    />
                                  </div>
                                </Row>
                              </Col>
                            )}
                          </Form>
                        </TabPane>
                        <TabPane tabId={4}>
                          <Col md={12}>
                            <Row className="mb-3">
                              <label
                                htmlFor="txtFirstNameBilling"
                                className="col-lg-3 col-form-label"
                              >
                               {props.t("Standard")}
                              </label>
                              <div className="col-lg-9">
                                <div className="square-switch">
                                  <input
                                    type="checkbox"
                                    id="square-switch2"
                                    switch="none"
                                    checked={encryptionType}
                                    onChange={() => {
                                      setEncryptionType(!encryptionType)
                                    }}
                                  />
                                  <label
                                    htmlFor="square-switch2"
                                    data-on-label="On"
                                    data-off-label="Off"
                                  />
                                </div>
                              </div>
                            </Row>
                          </Col>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Button
                            className="btn btn-bs"
                            disabled={activeTab === 1 ? true : false}
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                          {props.t("Anterior")}
                          </Button>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          {activeTab === 4 ? (
                            <Button
                              className="btn btn-bs"
                              onClick={() => {
                                handleValidation()
                              }}
                            >
                             {props.t("Finish")}
                            </Button>
                          ) : (
                            <Button
                              className="btn btn-bs"
                              onClick={() => {
                                toggleTab(activeTab + 1)
                              }}
                            >
                            {props.t("Next")}
                            </Button>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            {titlePage} {props.t("Backup Routine")}
          </ModalHeader>
          <ModalBody>
            <h5>{props.t("Backup Set")}</h5>
            <span>
              <strong>{props.t("Name")}:</strong> {name}
            </span>{" "}
            <br />
            <span>
              <strong>{props.t("Device")}:</strong>{" "}
              {selectedDevice &&
                optionsDevice.find(item => item.value === selectedDevice)
                  ?.label}
            </span>{" "}
            <br />
            <span>
              <strong>{props.t("Type")}:</strong> {props.t("Backup")}Arquivos e Pastas
            </span>{" "}
            <br />
            <br />
            <h5>{props.t("Backup Source")}</h5>
            <span>
              <strong>{props.t("File path(s)")}:</strong> {path}
            </span>{" "}
            <br />
            <span>
              <strong>{props.t("Retention")}:</strong> {retention}
            </span>{" "}
            <br />
            <br />
            <h5>{props.t("Scheduling")}</h5>
            <span>
              <strong>{props.t("Simplified Mode")}:</strong>{" "}
              {modeSchedule ? (
                <Badge color="primary" className="rounded-pill bg-primary">
                  {props.t("ON")}
                </Badge>
              ) : (
                <Badge className="rounded-pill bg-light">{props.t("OFF")}</Badge>
              )}
            </span>{" "}
            <br />
            {modeSchedule ? (
              <>
                <span>
                  <strong>{props.t("Frequency")}:</strong>{" "}
                  {selectedFrequency &&
                    optionsFrequency.find(
                      item => item.value === selectedFrequency
                    )?.label}
                </span>{" "}
                <br />
                {selectedFrequency && (
                  <>
                    {selectedFrequency === "1" && (
                      <>
                        <span>
                          <strong>{props.t("Run every day")}:</strong>{" "}
                          {selectedDayMonth &&
                            optionsDayMonth.find(
                              item => item.value === selectedDayMonth
                            )?.label}
                        </span>{" "}
                        <br />
                      </>
                    )}
                    {selectedFrequency === "2" && (
                      <>
                        <span>
                          <strong>{props.t("Run on the following day(s)")}:</strong>{" "}
                          {convertToDaysWeek(
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday
                          )}
                        </span>{" "}
                        <br />
                      </>
                    )}
                    <span>
                      <strong>{props.t("Time")}:</strong>{" "}
                      {hour && moment(hour).format("HH:mm")}
                    </span>{" "}
                  </>
                )}
              </>
            ) : (
              <span>
                <strong>{props.t("Cron Expression")}:</strong> {cronExpression}
              </span>
            )}
            <br />
            <br />
            <h5>{props.t("Cryptography")}</h5>
            <span>
              <strong>{props.t("Standard")}:</strong>{" "}
              {encryptionType ? (
                <Badge color="primary" className="rounded-pill bg-primary">
                 {props.t("ON")}
                </Badge>
              ) : (
                <Badge className="rounded-pill bg-light">{props.t("OFF")}</Badge>
              )}
            </span>{" "}
            <br />
            <br />
            <p>
            {props.t("Are you sure you want")} {titlePage.toLowerCase()} {props.t("Is this backup routine?")}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
            {props.t("To close")}
            </Button>{" "}
            <Button color="success" onClick={handleSubmit}>
              {titlePage}
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Create);

Create.propTypes = {
  t: PropTypes.any
};