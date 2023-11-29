import React from "react"
import { Container, Row, Col } from "reactstrap"
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";

const Footer = props => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <div className="col-12">
              © {new Date().getFullYear()} {props.t("BlueSky Softwares")}
            </div>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default withTranslation()(Footer)

Footer.propTypes = {
  t: PropTypes.any
};
