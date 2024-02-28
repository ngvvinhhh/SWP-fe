import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Row,
  theme,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to ={key}>{label}</Link>,
  };
}


const Dashboard = () => {

  const itemsHost = [
    getItem("Package", "/dashboard/package", <PieChartOutlined />,),
    getItem("Statistics", "/dashboard/statistics", <DesktopOutlined />),
    
  ];

  const itemsAdmin = [
    getItem("Report", "/dashboard/report", <PieChartOutlined />),
    getItem("Account", "/dashboard/account", <UserOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const menu = [
    {
      key: "1",
      label: <Link to={"/dashboard/profile"}>Profile</Link>,
    },

    {
      key: "2",
      label: (
        <p
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </p>
      ),
    },

  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={user?.role == "HOST"?itemsHost:itemsAdmin}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row
            justify={"end"}
            align={"middle"}
            style={{
              height: "100%",
              marginRight: 50,
            }}
          >
            <Dropdown menu={{ items: menu }} placement="bottomRight">
              <Row align={"middle"}>
                <Avatar
                  style={{
                    marginRight: 10,
                  }}
                  size={40}
                  src={user?.avatar}
                />
                <p
                  style={{
                    fontSize: 18,
                  }}
                >
                  {user?.fullname}
                </p>
              </Row>
            </Dropdown>
          </Row>
        </Header>
        <Content
          style={{
            margin: "0 16px",
            height: 200,
            overflow: "auto",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          BirthdayForKids ©{new Date().getFullYear()} Created by VVinh
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
