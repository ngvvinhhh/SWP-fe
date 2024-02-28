import React, { useEffect, useState } from "react";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Modal,
  Row,
  Select,
  TreeSelect,
  Upload,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/upload";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { changeAvatar} from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const Profile = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = useForm()
  const dispatch = useDispatch();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const onFinish = async (values) => {
    console.log(values);
    const url = values.avatar.file ? await uploadFile(values.avatar.file.originFileObj) : values.avatar;
    try {
      const response = await api.put("/profile", {
        ...values,
        avatar: url,
        
      });
      toast.success("Update profile sucessfully");
      dispatch(changeAvatar(url))
    } catch (error) {
      let message = "";
      if (error.response.data.includes(values.userName)) {
        message = "Duplicate username";
      } else {
        message = "Duplicate email";
      }
      toast.error(message);
    }
  };

  async function fetchProfile(){
   const response = await api.get('profile')
    console.log(response.data);
    form.setFieldsValue(response.data)
    setFileList([ {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: response.data.avatar,
    },])
  }

useEffect(()=> {
  fetchProfile();
},[])

  return (
    <div className="profile">
      <div className="profile-left">
        <img
          src="https://images.unsplash.com/photo-1551892644-51a6e2e8fc65?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="profile-right">
        <h1>Profile</h1>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            width: "100%",
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          form = {form}
        >
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input avatar!",
              },
            ]}
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please input role!",
                  },
                ]}
              >
                <Select disabled
                  style={{ width: "100%" }}
                  options={[
                    { value: "CUSTOMER", label: "Customer" },
                    { value: "HOST", label: "Host" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input gender!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input usernname!",
              },
            ]}
            
          >
            <Input disabled/>
          </Form.Item>

          
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input fullname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input Phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
        
            <Row justify={"center"}>
              <Button type="primary" htmlType="update">
                Update
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default Profile;
