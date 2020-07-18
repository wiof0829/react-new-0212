import React, { Component } from 'react'
// 导入antd中栅格布局的组件
import { Row, Col, Statistic,Progress } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { AreaChart, ColumnChart } from 'bizcharts';
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
const data = [
  { year: '1991', value: 5 },
  { year: '1992', value: 8 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 9.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 2 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const adata = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
export default class Analysis extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000);
  }
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
            >
              <AreaChart
                data={data}
                // title={{
                //   visible: true,
                // }}
                xField='year'
                yField='value'
                xAxis={{ visible: false }}
                yAxis={{ visible: false }}
                smooth={true}
                padding='0'
                forceFit={true}
                color={['hotpink']}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <ColumnChart
                data={adata}

                forceFit
                padding='0'
                xField='type'
                yField='sales'
                xAxis={{ visible: false }}
                yAxis={{ visible: false }}
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={<Statistic title='运营结果' value={112893} />}
              footer={<span>转化率 80.9%</span>}
              loading={this.state.loading} //表示展示骨架组件
            >
              <Progress
                percent={80.9} // 进度值
                strokeColor={{
                  //渐变颜色
                  from: '#108ee9',
                  to: '#87d068'
                }}
                status='active'
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
