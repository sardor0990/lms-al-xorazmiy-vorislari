import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Img from "../../assets/img/signin-img.png";
import Logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import request from "../../services/api/index";

const SigninComponent = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.warning({
      message: "Please fill the  fields",
    });
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleError = (callback) => {
    if (!email || !password) {
      console.log("Error");
      openNotification();
    } else {
      return callback();
    }
  };

  const submitFunction = () => {
    handleError(loginFunction);
  };

  const loginFunction = async () => {
    try {
      const response = await request.post("/manager/signin/", {
        ...state,
      });
      localStorage.setItem("token", response?.data?.access);
      navigate("/transactions");
    } catch (error) {
      api.warning({
        message: error?.data?.non_field_errors?.[0],
      });
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target?.value,
    });
    setError({
      ...error,
      [e.target.name]: false,
    });
  };
  return (
    <div className="w-full h-screen flex max-[768px]:justify-center max-[768px]:pt-[60px] max-[768px]:pb-[30px]">
      {contextHolder}
      <div
        className="w-[50%] flex flex-col items-center justify-center relative max-[768px]:hidden "
        style={{
          background: `url(${Img})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(29, 31, 36)",
          backgroundSize: "cover",
        }}
      >
        <div className="flex gap-[12px] items-center absolute top-[100px] left-[140px] z-10">
          <img src={Logo} alt="Sunstone" />
          <p className="text-[#fff] text-[18px] font-[600] leading-[36px]">
            Sunstone
          </p>
        </div>
        <div className="flex gap-[12px] items-center absolute bottom-[100px] left-[140px] z-10">
          <p className="text-[#fff] text-[26px] font-[600] leading-[36px] w-[444px]">
            The ultimate multipurpose dashboard UI Kit for kickstart any
            project.
          </p>
        </div>
        <div className="w-full h-full opacity-40 bg-[#1d1f24]"></div>
      </div>

      <div className="w-[50%]  flex flex-col items-center bg-[#fff] justify-center max-[768px]:w-[100%] max-[1366px]:pt-[60px] p-[10px] relative">
        <div className="w-[375px] flex flex-col items-start gap-[8px] mb-[20px] max-[400px]:w-[90%]">
          <p className="text-[#1d1f24] text-[24px] font-[600] leading-[36px]">
            Sign in
          </p>
        </div>

        <div className="w-[375px] flex flex-col gap-[8px] mb-[20px] max-[400px]:w-[90%]">
          <p className="text-[#6b6e75] text-[12px] font-[500]">Email</p>
          <Input
            style={{ height: "44px", borderRadius: "8px" }}
            onChange={handleChange}
            value={email}
            name="email"
          />
          {error.email && (
            <p className="text-[red] text-[14px] font-[600]">{error.email}</p>
          )}
        </div>
        <div className="w-[375px] flex flex-col gap-[8px] mb-[20px]  max-[400px]:w-[90%]">
          <p className="text-[#6b6e75] text-[12px] font-[500]">Password</p>
          <Input.Password
            style={{ height: "44px", borderRadius: "8px" }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handleChange}
            value={password}
            name="password"
          />
          {error.password && (
            <p className="text-[red] text-[14px] font-[600]">
              {error.password}
            </p>
          )}

          <Button
            type="primary"
            radius={"12px"}
            height={"44px"}
            width={"100%"}
            padding={"12px 32px"}
            bgcolor={"red"}
            margin={"36px 0 0 0"}
            htmlType="submit"
            onClick={submitFunction}
            style={{
              backgroundColor: "rgb(118, 98, 234)",
              height: "44px",
              marginTop: "40px",
            }}
          >
            <p className="text-[#fff] text-[13px] font-[500]">Sign in </p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
