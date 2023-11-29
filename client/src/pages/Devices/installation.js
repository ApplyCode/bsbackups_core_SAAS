import React from "react"
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

function Installation(props) {
  document.title = "BS Backups | Instalação"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            maintitle="Bs Backups"
            title="Dispositivos"
            breadcrumbItem="Instalação"
          />

          <Row>
            <Col>
              <Card>
                <CardBody className="d-flex align-items-center justify-content-center">
                  <div className="py-4 text-center">
                    <i className="ion ion-ios-checkmark-circle-outline display-4 text-success"></i>

                    <h5 className="text-primary mt-4">
                      {props.t("Device registered successfully!")}
                    </h5>
                    <p className="text-muted">
                      Faça o download da versão correta abaixo e instale no
                      dispositivo cadastrado
                    </p>
                    <div className="mt-4">
                      <a
                        href="https://bsbackups.com.br/downloads/"
                        className="btn btn-primary btn-sm"
                        target="_blank"
                      >
                        <i
                          className="fas fa-download"
                          style={{ marginRight: 5 }}
                        ></i>
                        {props.t("Download")}
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Installation);

Installation.propTypes = {
  t: PropTypes.any
};