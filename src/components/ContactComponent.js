import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      telNum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: "",
      touched: {
        firstName: false,
        lastName: false,
        telNum: false,
        email: false,
      },
    };

    /* LƯU Ý: để thực hiện phương thức handleSubmit này, ta cần ràng buộn (bind) nó trong constructor  */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  //kiểm tra trường đã được điền hay chưa
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(firstName, lastName, telNum, email) {
    const errors = {
      firstName: "",
      lastName: "",
      telNum: "",
      email: "",
    };

    //thiết lập firstName có từ 3-10 ký tự
    if (this.state.touched.firstName && firstName.length < 3)
      errors.firstName = "First Name should be >= 3 characters";
    else if (this.state.touched.firstName && firstName.length > 10)
      errors.firstName = "First Name should be <= 10 characters";

    if (this.state.touched.lastName && lastName.length < 3)
      errors.lastName = "Last Name should be >= 3 characters";
    else if (this.state.touched.lastName && lastName.length > 10)
      errors.lastName = "Last Name should be <= 10 characters";

    // kiểm tra telNum phải là tập hợp các số
    // Ta sử dụng regular expression (biểu thức chính quy)
    const reg = /^\d+$/; // điều này biểu thị: tất cả các ký tự nên toàn là số và không nên chứa các kí tự khác
    if (this.state.touched.telNum && !reg.test(telNum))
      errors.telNum = "Tel. Number should contain only numbers";

    //ktra email
    //ktra trong mỗi ký tự trong email có chứa dấu @ hay không, nếu ko có hoặc có hơn 1 ký tự thì báo lỗi
    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    )
      errors.email = "Email should contain a @";

    return errors;
  }

  //Dùng để ràng buộc các giá trị nhập vào từ input và các giá trị state
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log(`Current state: ${JSON.stringify(this.state)}`);
    //hành vi mặc định khi bạn gửi Form trong bất kỳ trình duyệt nào thì sẽ chuyển đến trang tiếp theo. Ta ngăn chặn điều đó bằng cách:
    event.preventDefault();
  }
  render() {
    const errors = this.validate(
      this.state.firstName,
      this.state.lastName,
      this.state.telNum,
      this.state.email
    );

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>

        {/* TRIỂN KHAI FORM  */}
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us Your Feedback</h3>
          </div>

          <div className="col-12 col-md-9">
            {/* LƯU Ý: để thực hiện phương thức handleSubmit này, ta cần ràng buộn (bind) nó trong constructor  */}
            <Form onSubmit={this.handleSubmit}>
              {/* FormGroup cho phép xác định một hàng - vì vậy, đây là một row của form. Từ đó ta có thể sd grid của bootstrap bên trong form  */}
              <FormGroup row>
                {/* md={2} có nghĩa là: đối với kích thước màn hình từ trung bình
                trở lên của label sẽ chiếm 2 columns ở trong row */}
                <Label htmlFor="firstName" md={2}>
                  First Name
                </Label>
                {/* Col md={10} trong reactstrap giống như là div có class col-md-10 */}
                <Col md={10}>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    valid={errors.firstName === ""}
                    invalid={errors.firstName !== ""}
                    onBlur={this.handleBlur("firstName")}
                    onChange={this.handleInputChange}
                  />
                  {/* hiển thị lỗi nếu có  */}
                  <FormFeedback>{errors.firstName}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* md={2} có nghĩa là: đối với kích thước màn hình từ trung bình
                trở lên của label sẽ chiếm 2 columns ở trong row */}
                <Label htmlFor="lastName" md={2}>
                  Last Name
                </Label>
                {/* Col md={10} trong reactstrap giống như là div có class col-md-10 */}
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    valid={errors.lastName === ""}
                    invalid={errors.lastName !== ""}
                    onBlur={this.handleBlur("lastName")}
                    onChange={this.handleInputChange}
                  />
                  {/* hiển thị lỗi nếu có  */}
                  <FormFeedback>{errors.lastName}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* md={2} có nghĩa là: đối với kích thước màn hình từ trung bình
                trở lên của label sẽ chiếm 2 columns ở trong row */}
                <Label htmlFor="telNum" md={2}>
                  Contact Telephone
                </Label>
                {/* Col md={10} trong reactstrap giống như là div có class col-md-10 */}
                <Col md={10}>
                  <Input
                    type="tel"
                    id="telNum"
                    name="telNum"
                    placeholder="Telephone Number"
                    value={this.state.telNum}
                    valid={errors.telNum === ""}
                    invalid={errors.telNum !== ""}
                    onBlur={this.handleBlur("telNum")}
                    onChange={this.handleInputChange}
                  />
                  {/* hiển thị lỗi nếu có  */}
                  <FormFeedback>{errors.telNum}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* md={2} có nghĩa là: đối với kích thước màn hình từ trung bình
                trở lên của label sẽ chiếm 2 columns ở trong row */}
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                {/* Col md={10} trong reactstrap giống như là div có class col-md-10 */}
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    valid={errors.email === ""}
                    invalid={errors.email !== ""}
                    onBlur={this.handleBlur("email")}
                    onChange={this.handleInputChange}
                  />
                  {/* hiển thị lỗi nếu có  */}
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>

              {/* TRIỂN KHAI CHECK BOX */}
              <FormGroup row>
                {/* { size: 6, offset:2} chỉ định số lượng cột =6, độ lệch (offset) của 2 cột => Dùng offset để đẩy row về bên phải */}
                <Col md={{ size: 6, offset: 2 }}>
                  {/* TRIỂU KHAI FORMGROUP CHO CHECKBOX */}
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="agree"
                        checked={this.state.agree}
                        onChange={this.handleInputChange}
                      />
                      <strong>May we contact you?</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                  <Input
                    type="select"
                    name="contactType"
                    value={this.state.contactType}
                    onChange={this.handleInputChange}
                  >
                    <option>Telephone</option>
                    <option>Email</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* md={2} có nghĩa là: đối với kích thước màn hình từ trung bình
                trở lên của label sẽ chiếm 2 columns ở trong row */}
                <Label htmlFor="message" md={2}>
                  Your Feedback
                </Label>
                {/*rows="12" thiết lập số hàng của text area thành 12 hàng*/}
                <Col md={10}>
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    rows="12"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
