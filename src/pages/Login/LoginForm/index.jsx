import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reqGetverifyCode } from '@api/acl/oauth'
import { login, mobileLogin } from "@redux/actions/login";
import "./index.less";
const { TabPane } = Tabs;

function LoginForm(props) {
  const [form] = Form.useForm()
  const [isShowDownCount, setIsShowDownCount] = useState(false)
  let [downCount, setDownCount] = useState(5)
  const [activeKey, setActiveKey] = useState('user')
  const onFinish = () => {
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        let { userneme, password } = res
        props.login(userneme, password).then(token => {
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    } else {
      form.validateFields(['phone', 'verify']).then(res => {
        let { phone, verify } = res
        props.mobileLogin(phone, verify).then(token => {
          // 登录成功
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    }

    // props.login(username, password).then((token) => {
    //   localStorage.setItem("user_token", token);
    //   props.history.replace("/");
    // });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };
  //密码验证
  const validator = (rules, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject('写密码给我look下')
      }
      if (value.length > 16) {
        return reject('少写几个，太多了')
      }
      if (value.length < 4) {
        return reject('太少了，多写俩')
      }
      if (!/^[0-9a-zA-Z_]+$/.test(value)) {
        return reject('密码只能输入数字,字母,下划线')
      }
      resolve()
    })
  }
  //输入手机号获取验证码按钮验证手机号
  const huoquYanzheng = async () => {
    const res = await form.validateFields(['phone'])
    console.log('手机号是', res)
    await reqGetverifyCode(res.phone)
    setIsShowDownCount(true)
    let timeId = setInterval(() => {
      downCount--
      setDownCount(downCount)
      if (downCount <= 0) {
        clearInterval(timeId)
        setIsShowDownCount(false)
        setDownCount(5)
      }
    }, 1000)
  }
  const handleTabChange = activeKey => {
    setActiveKey(activeKey)
  }
  const gitOauthLogin = () => {
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=b79c068a6d6d01127265'
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
          onClick={handleTabChange}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username">
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password"
              rules={[{ validator }]}
            >
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '你输入不是手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>
            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify"
                  rules={[
                    {
                      required: true,
                      message: ''
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={huoquYanzheng}
                  disabled={isShowDownCount}
                > {isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}</Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            className="login-form-button"
            onClick={onFinish}
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon"
                  onClick={gitOauthLogin} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
export default withRouter(
  connect(
    null,
    { login, mobileLogin }
  )(LoginForm)
)