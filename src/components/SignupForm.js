import React, { Component } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { signup } from "../utils";
import { LockOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
export default class SignupForm extends Component {
  state = {
    displayModal: false,
  };
  handleCancel = () => {
    this.setState({ displayModal: false });
  };

  signupOnClick = () => {
    this.setState({ displayModal: true });
  };

  onFinish = (data) => {
    signup(data)
      .then(() => {
        this.setState({ displayModal: false });
        message.success("Sign up successfully!");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render() {
    return (
      <>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={this.signupOnClick}
          className="signup-btn"
          style={{ boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.75)" }}
          icon={<UserAddOutlined />}
        >
          Register
        </Button>
        <Modal
          title="Sign up"
          open={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your First Name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your Last Name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item>
              <Button shape="round" type="primary" htmlType="submit">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
