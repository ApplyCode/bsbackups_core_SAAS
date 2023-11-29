import React from "react"
import { Container } from "reactstrap"
import { BlockReserveLoading } from "react-loadingg"

const Loading = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container
          fluid
          className="d-flex align-items-center justify-content-center"
        >
          <BlockReserveLoading
            color="#a929e6 "
            size="large"
            style={{ position: "relative" }}
          />
          <BlockReserveLoading
            color="#a929e6 "
            size="large"
            style={{ position: "relative" }}
          />
          <BlockReserveLoading
            color="#a929e6 "
            size="large"
            style={{ position: "relative" }}
          />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Loading
