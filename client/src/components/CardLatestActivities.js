import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from 'prop-types';
//i18n
import { withTranslation } from "react-i18next";

const CardLatestActivities = props => {
  const { list } = props

  /* FUNCTIONS TO STATUS */
  const getStatus = status => {
    if (status === "success")
      return <span className="badge bg-success">{props.t("Success")}</span>
    if (status === "running")
      return <span className="badge bg-info">{props.t("Running")}</span>
    return <span className="badge bg-danger">{props.t("Error")}</span>
  }
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">{props.t("Latest Activities")}</h4>
          <div className="table-responsive">
            <table className="table table-hover table-centered table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{props.t("Routine")}</th>
                  <th scope="col">{props.t("Time")}</th>
                  <th scope="col" colSpan="2">
                  {props.t("Error")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.backup ? item.backup.name : ""}</td>
                    <td>
                      {moment(item.created_at).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td>{getStatus(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default withTranslation()(CardLatestActivities)

CardLatestActivities.propTypes = {
  t: PropTypes.any
};