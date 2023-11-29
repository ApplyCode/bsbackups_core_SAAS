import React from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
//i18n
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
const Index = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">{props.t("Renew your account")}</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">{props.t("Your account has expired!")}</li>
                </ol>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Card>
                  <CardBody
                    className="d-flex align-items-center justify-content-center"
                    style={{ flexDirection: "column" }}
                  >
                    <i className="mdi mdi-alert-circle-outline text-danger display-4"></i>
                    <p className="text-muted">
                      Sua conta expirou, por favor, entre em contato para
                      renovação.
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Index);

Index.propTypes = {
  t: PropTypes.any
};
