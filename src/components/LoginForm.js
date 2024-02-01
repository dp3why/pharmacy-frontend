import { Button, Form, Input, Modal, message } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

class LoginForm extends React.Component {
  state = {
    displayModal: false,
    loading: false,
  };

  onFinish = (data) => {
    this.setState({
      loading: true,
    });
    login(data)
      .then(() => {
        message.success(`Login Successful`);
        this.props.onSuccess();
        localStorage.setItem("login_token", "true");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };
  loginOnClick = () => {
    this.setState({ displayModal: true });
  };
  handleCancel = () => {
    this.setState({ displayModal: false });
  };
  render = () => {
    return (
      <>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={this.loginOnClick}
          className="login-btn"
          style={{
            marginRight: "10px",
            boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.75)",
          }}
          icon={<UserOutlined />}
        >
          Login
        </Button>
        <Modal
          title="Login"
          open={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="normal_login"
            onFinish={this.onFinish}
            style={{
              width: 300,
              margin: "auto",
            }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="false"
              />
            </Form.Item>

            <Form.Item>
              <Button
                shape="round"
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default LoginForm;
