import { Button, Checkbox, Flex, Form, Input } from "antd";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";
import { Provider, useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

//import { provider } from "./config/firebase";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await api.post("/authentication/login", values);
      console.log(response);
      dispatch(login(response.data));
      toast.success("Login successfully");
      navigate("/dashboard");
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      console.log(e);
      toast.error("Login fail");
    }
  };

  const loginGoogle = () => {

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async(result) => {
        const token = await result.user.getIdToken()
        const response = await api.post('/authentication/logingg', {
          token: token
        })
        dispatch(login(response.data));
        toast.success("Login successfully");
        navigate("/dashboard");
        localStorage.setItem('token', response.data.token)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="background">
      <div className="background-left">
        <img
          src="https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="background-right">
        <h1>Sign in</h1>

        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <p>
              Don't have account? <Link to={"/register"}>sign up</Link>
            </p>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
            
              onClick={loginGoogle}
            >
              <div   style={{
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
                gap:10
              }}>
                <img
                  width={20}
                  src="https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?rs=1&pid=ImgDetMain"
                  alt=""
                />
                Login with google
              </div>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
