import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';

// import images
import img1 from "../../assets/images/small/img-2.jpg";
import avtar1 from "../../assets/images/users/avatar-2.jpg";

const BlogDetails = (props) => {
  document.title = "Blog Details | Veltrix - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs maintitle="Veltrix" title="Blog" breadcrumbItem="Blog Details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      <div className="col-xl-8">
                        <div>
                          <div className="text-center">
                            <div className="mb-4">
                              <Link
                                to="#"
                                className="badge bg-light font-size-12"
                              >
                                <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                               {props.t("Project")}
                              </Link>
                            </div>
                            <h4>{props.t("Beautiful Day with Friends")}</h4>
                            <p className="text-muted mb-4">
                              <i className="mdi mdi-calendar me-1"></i> 10 Apr, 2020
                            </p>
                          </div>

                          <hr />
                          <div className="text-center">
                            <Row>
                              <Col sm={4}>
                                <div>
                                  <p className="text-muted mb-2">{props.t("Categories")}</p>
                                  <h5 className="font-size-15">{props.t("Project")}</h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">{props.t("Project")}Date</p>
                                  <h5 className="font-size-15">{props.t("Project")}10 Apr, 2020</h5>
                                </div>
                              </Col>
                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <p className="text-muted mb-2">{props.t("Post by")}</p>
                                  <h5 className="font-size-15">{props.t("Gilbert Smith")}</h5>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <hr />

                          <div className="my-5">
                            <img
                              src={img1}
                              alt=""
                              className="img-thumbnail mx-auto d-block"
                            />
                          </div>

                          <hr />

                          <div className="mt-4">
                            <div className="text-muted font-size-14">
                              <p>
                                Neque porro quisquam est, qui dolorem ipsum quia
                                dolor sit amet, consectetur, adipisci velit, sed
                                quia non numquam eius modi tempora incidunt ut
                                labore et dolore magnam enim ad minima veniam quis
                              </p>

                              <p className="mb-4">
                                Ut enim ad minima veniam, quis nostrum
                                exercitationem ullam corporis suscipit laboriosam,
                                nisi ut aliquid ex ea reprehenderit qui in ea
                                voluptate velit esse quam nihil molestiae
                                consequatur, vel illum qui dolorem eum fugiat quo
                                voluptas nulla pariatur? At vero eos et accusamus et
                                iusto odio dignissimos ducimus qui blanditiis
                                praesentium voluptatum deleniti atque corrupti quos
                                dolores et quas molestias excepturi sint occaecati
                                cupiditate non provident, similique sunt
                              </p>

                              <blockquote className="p-4 border-light border rounded mb-4">
                                <div className="d-flex">
                                  <div className="me-3">
                                    <i className="bx bxs-quote-alt-left text-dark font-size-24"></i>
                                  </div>
                                  <div>
                                    <p className="mb-0">
                                      {" "}
                                      At vero eos et accusamus et iusto odio
                                      dignissimos ducimus qui blanditiis praesentium
                                      deleniti atque corrupti quos dolores et quas
                                      molestias excepturi sint quidem rerum facilis
                                      est
                                    </p>
                                  </div>
                                </div>
                              </blockquote>

                              <p>
                                Itaque earum rerum hic tenetur a sapiente delectus,
                                ut aut reiciendis voluptatibus maiores alias
                                consequatur aut perferendis doloribus asperiores
                                repellat. Sed ut perspiciatis unde omnis iste natus
                                error sit
                              </p>

                              <div className="mt-4">
                                <h5 className="mb-3">{props.t("Title")}: </h5>

                                <div>
                                  <div className="row">
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                          {props.t("Until the members of the arrow")}
                                          </li>
                                          <li className="py-1">
                                          {props.t("But the result needs timing")}
                                          </li>
                                          <li className="py-1">
                                          {props.t("Some information before")}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                      <div>
                                        <ul className="ps-4">
                                          <li className="py-1">
                                          {props.t("Aenean buys it")}
                                          </li>
                                          <li className="py-1">
                                          {props.t("Born with his companions")}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <hr />

                            <div className="mt-5">
                              <h5 className="font-size-15">
                                <i className="bx bx-message-dots text-muted align-middle me-1"></i>{" "}
                                {props.t("Comments")} :
                              </h5>

                              <div>
                                <div className="media py-3">
                                  <div className="avatar-xs me-3">
                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                      <i className="bx bxs-user"></i>
                                    </div>
                                  </div>
                                  <div className="media-body">
                                    <h5 className="font-size-14 mb-1">
                                   Delores Williams{" "}
                                      <small className="text-muted float-end">
                                      1 hr Ago
                                      </small>
                                    </h5>
                                    <p className="text-muted">
                                      If several languages coalesce, the grammar of
                                      the resulting language is more simple and
                                      regular than that of the individual
                                    </p>
                                    <div>
                                      <Link to="#" className="text-success">
                                        <i className="mdi mdi-reply"></i> {props.t("Reply")}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="media py-3 border-top">
                                  <div className="avatar-xs me-3">
                                    <img
                                      src={avtar1}
                                      alt=""
                                      className="img-fluid d-block rounded-circle"
                                    />
                                  </div>
                                  <div className="media-body">
                                    <h5 className="font-size-14 mb-1">
                                    Clarence Smith{" "}
                                      <small className="text-muted float-end">
                                       2 hrs Ago
                                      </small>
                                    </h5>
                                    <p className="text-muted">
                                      Neque porro quisquam est, qui dolorem ipsum
                                      quia dolor sit amet
                                    </p>
                                    <div>
                                      <Link to="#" className="text-success">
                                        <i className="mdi mdi-reply"></i> Reply
                                      </Link>
                                    </div>

                                    <div className="media pt-3">
                                      <div className="avatar-xs me-3">
                                        <div className="avatar-title rounded-circle bg-light text-primary">
                                          <i className="bx bxs-user"></i>
                                        </div>
                                      </div>
                                      <div className="media-body">
                                        <h5 className="font-size-14 mb-1">
                                         Silvia Martinez{" "}
                                          <small className="text-muted float-end">
                                          2 hrs Ago
                                          </small>
                                        </h5>
                                        <p className="text-muted">
                                          To take a trivial example, which of us
                                          ever undertakes laborious physical
                                          exercise
                                        </p>
                                        <div>
                                          <Link to="#" className="text-success">
                                            <i className="mdi mdi-reply"></i> {props.t("Reply")}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="media py-3 border-top">
                                  <div className="avatar-xs me-3">
                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                      <i className="bx bxs-user"></i>
                                    </div>
                                  </div>
                                  <div className="media-body">
                                    <h5 className="font-size-14 mb-1">
                                   Keith McCoy{" "}
                                      <small className="text-muted float-end">
                                        12 Aug
                                      </small>
                                    </h5>
                                    <p className="text-muted">
                                      Donec posuere vulputate arcu. phasellus
                                      accumsan cursus velit
                                    </p>
                                    <div>
                                      <Link to="#" className="text-success">
                                        <i className="mdi mdi-reply"></i> {props.t("Reply")}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <h5 className="font-size-16 mb-3">{props.t("Leave a Message")}</h5>

                              <Form>
                                <Row>
                                  <Col md={6}>
                                    <div className="mb-3">
                                      <Label htmlFor="commentname-input">
                                      {props.t("Name")} 
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="commentname-input"
                                        placeholder="Enter name"
                                      />
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <div className="mb-3">
                                      <Label htmlFor="commentemail-input">
                                      {props.t("Email")} Email
                                      </Label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        id="commentemail-input"
                                        placeholder="Enter email"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <div className="mb-3">
                                  <Label htmlFor="commentmessage-input">
                                  {props.t("Message")} 
                                  </Label>
                                  <textarea
                                    className="form-control"
                                    id="commentmessage-input"
                                    placeholder="Your message..."
                                    rows="3"
                                  ></textarea>
                                </div>

                                <div className="text-end">
                                  <button
                                    type="submit"
                                    className="btn btn-success w-sm"
                                  >
                                   {props.t("Submit")}
                                  </button>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(BlogDetails);
BlogDetails.propTypes = {
  t: PropTypes.any
};
