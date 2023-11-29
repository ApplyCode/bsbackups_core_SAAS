import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Button } from "reactstrap"
//i18n
import { withTranslation } from "react-i18next";

const CardPricing = props => {
  /* PROPS */
  const { plan, tog_modal, setId, setName } = props
  return (
    <React.Fragment>
      <Col xl="4" md="6">
        <Card className="pricing-box">
          <CardBody className="p-4">
            <div className="d-flex mt-2">
              <div className="flex-shrink-0 align-self-center">
                <i className={props.pricing.icon + " h2"}></i>
              </div>
              <div className="flex-grow-1 ms-auto text-end">
                <h4>{props.pricing.title}</h4>
                <p className="text-muted mb-0">{props.pricing.description}</p>
              </div>
            </div>
            <div className="pricing-features mt-5 pt-2">
              {props.pricing.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <font className={"text-primary me-2"}>{feature.pre}</font>{" "}
                  {feature.title}
                </p>
              ))}
            </div>
            <div className="text-center mt-5">
              <h1 className="mb-0">
                <sup>
                  <small>R$</small>
                </sup>
                {props.pricing.price}/
                <span className="font-size-16">{props.pricing.duration}</span>
              </h1>
            </div>
            <div className="d-grid mt-5">
              <Button
                className="btn waves-effect waves-light"
                color="primary"
                disabled={plan.id === props.pricing.id}
                onClick={() => {
                  setId(props.pricing.id)
                  setName(props.pricing.title)
                  tog_modal()
                }}
              >
                {props.t("Alter Plane")}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object,
  t: PropTypes.any
}

export default withTranslation()(CardPricing)
