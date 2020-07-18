import React, { Component } from 'react'
// 导入antd中栅格布局的组件
import { Row, Col, Statistic } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
// 导入项目中自己封装的Card组件
import Card from '@comps/Card'
const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示col在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}
export default class Analysis extends Component {
  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <span>
                周同比 12% <CaretUpOutlined style={{ color: 'red' }} />
              </span>
              <span style={{ marginLeft: 10 }}>
                日同比 10% <CaretDownOutlined style={{ color: 'pink' }} />
              </span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            ></Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
          <Col {...firstRowCol}>
            <Card></Card>
          </Col>
        </Row>
      </div>
    )
  }
}
