import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

//CHART
import Salesdonut from "../pages/AllCharts/apex/salesdonut"


const ActivitiesReport = props => {
  /* PROPS */
  const { successPercentage, runningPercentage, errorPercentage } = props
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">{props.t("Activity Report")}</h4>
          <div id="ct-donut" className="ct-chart wid pt-4">
            <Salesdonut data={props.data} />
          </div>
          <div className="mt-4">
            <table className="table mb-0">
              <tbody>
                <tr>
                  <td>
                    <span className="badge bg-success">{props.t("Success")}</span>
                  </td>
                  <td>{props.t("Backup performed")}</td>
                  <td className="text-end">{successPercentage}%</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge bg-info">{props.t("Activity Report")}</span>
                  </td>
                  <td>{props.t("Activity Report")}</td>
                  <td className="text-end">{runningPercentage}%</td>
                </tr>
                <tr>
                  <td>
                    <span className="badge bg-danger">{props.t("Activity Report")}</span>
                  </td>
                  <td>{props.t("Activity Report")}</td>
                  <td className="text-end">{errorPercentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default withTranslation()(ActivitiesReport)
ActivitiesReport.propTypes = {
  t: PropTypes.any
};
