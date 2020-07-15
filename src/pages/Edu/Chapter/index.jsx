import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Player from 'griffith'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import { getLessonList } from './redux'
import "./index.less";
dayjs.extend(relativeTime);
@connect(
  (state) => ({
    chapterList: state.chapterList
  }),
  { getLessonList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    // 控制modal窗口是否展示
    previewVisible: false,
    // previewImage: "",
    selectedRowKeys: [],
    video: ''
  };
  showModal = (video) => () => {
    this.setState({
      previewVisible: true,
      // previewImage: img,
      video
    });
  };
  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };
  componentDidMount() {

  }
  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });
    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };
  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  handleClickExpand = (expand, record) => {
    console.log(expand, record)
    if (expand) {
      //发送请求获取数据
      this.props.getLessonList(record._id)
    }
  }
  goAddLesson = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }
  render() {
    const { previewVisible, selectedRowKeys } = this.state;
    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      //视频预览展示
      {
        title: "视频",
        render: (value) => {
          if (!value.free) return
          return <Button onClick={this.showModal(value.video)}>预览</Button>
          // return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          // if ("free" in data) {
          return (
            <div>
              {data.free === undefined && (<Tooltip title="新增课时">
                <Button type='primary'
                  // marginRight={20}
                  style={{ margin: "20 10" }, { marginRight: 10 }}
                  onClick={this.goAddLesson(data)}
                >
                  <PlusOutlined />
                </Button>
              </Tooltip>)}
              <Tooltip title={data.free === undefined ? '更新章节' : '更新课时'}>
                <Button type="primary" style={{ margin: "20 10" }, { marginRight: 10 }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={data.free === undefined ? '更新课时' : '删除课时'}>
                <Button type="danger"
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
          // }
        },
      },
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,

    };
    const sources = {
      hd: {
        // play_url: this.state.video,
        play_url: this.state.video,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }}>
                <span>批量删除</span>
              </Button>
              <Tooltip title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{
              onExpand: this.handleClickExpand
            }}
          />
        </div>
        {/* antd的对话框组件 */}
        <Modal
          title='视频'
          visible={previewVisible}
          footer={null}
          // modal的关闭按钮
          onCancel={this.handleImgModal}
          footer={null}
          destroyOnClose={true}
        >
          <Player
            sources={sources}
            id={'1'}
            //视频封面
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          ></Player>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
