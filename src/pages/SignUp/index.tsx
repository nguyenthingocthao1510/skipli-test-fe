import { useFormik } from "formik";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { FieldConfig } from "../../components/FormComponent/fieldConfig";
import { FORM_TYPE } from "../../components/FormComponent/formType";
import Logo from "../../assets/images/logo192.png";
import LeftLogo from "../../assets/images/leftLogo.png";
import RightLogo from "../../assets/images/rightLogo.png";
import { Button, message, Typography } from "antd";
import { FormFields } from "../../components/FormComponent";
import { loginRoute } from "../../routes/routes.constant";
import { signupApi } from "../../services/SignupService";

interface Props {}

export const SignUpPage = (props: Props) => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const SignUpValidationSchema = yup.object({
    email: yup
      .string()
      .required("Email is missing!")
      .email("The input should be email"),
    password: yup.string().required("Password is missing!"),
  });

  const SignUpFormControl = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: () => {
      signupApi
        .registerUser({
          email: SignUpFormControl.values.email,
          password: SignUpFormControl.values.password,
        })
        .then((response: any) => {
          success();
          navigate(loginRoute);
        })
        .catch((error) => {
          console.error(error);
          handleError();
        });
    },
  });

  const handleChange = (key: string, value: string) => {
    SignUpFormControl.setFieldValue(key, value);
  };

  const SignupFormFields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      placeholder: "Example@gmail.com",
      type: FORM_TYPE.TEXT,
      required: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange("email", e.target.value);
      },
    },
    {
      name: "password",
      label: "Password",
      placeholder: "********",
      type: FORM_TYPE.PASSWORD,
      required: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange("password", e.target.value);
      },
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Register user successfully!",
    });
  };

  const handleError = () => {
    messageApi.open({
      type: "error",
      content: "Failed to register user!",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {contextHolder}
      <div
        className="w-full max-w-md p-8 relative z-10 bg-white"
        style={{
          borderWidth: "1px",
          borderColor: "grey",
          borderRadius: "10px",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <img src={Logo} alt="logo-web" className="w-16 h-16 mb-3" />
          <Typography.Title level={5} className="!text-gray-500">
            Signin to Continue
          </Typography.Title>
        </div>

        <div className="mb-4">
          <FormFields fields={SignupFormFields} form={SignUpFormControl} />
        </div>

        <div className="-mt-8 mb-2 flex justify-end">
          <p className="italic">
            Already have an account?{" "}
            <Button
              type="link"
              className="!p-0 italic"
              onClick={() => navigate(loginRoute)}
            >
              Signin
            </Button>
          </p>
        </div>

        <Button
          type="primary"
          block
          className="!bg-blue-600 hover:!bg-blue-700 !h-12 !text-lg !rounded-xl shadow-md transition"
          onClick={() => SignUpFormControl.handleSubmit()}
        >
          Continue
        </Button>

        <div className="mt-0 flex flex-col items-center">
          <Button
            type="link"
            className="!text-blue-700 hover:!text-blue-500"
            onClick={() => navigate("/privacy-policy")}
          >
            Privacy Policy
          </Button>
          <Typography.Text className="text-gray-500 text-sm">
            This site was created by ntnthao15102002@gmail.com
          </Typography.Text>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end z-0">
        <img
          src={LeftLogo}
          alt="left-logo"
          className="w-72 h-auto object-contain pointer-events-none"
        />
        <img
          src={RightLogo}
          alt="right-logo"
          className="w-72 h-auto object-contain pointer-events-none"
        />
      </div>
    </div>
  );
};
