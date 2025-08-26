import { useFormik } from 'formik';
import * as yup from 'yup';
import { FieldConfig } from '../../components/FormComponent/fieldConfig';
import { FORM_TYPE } from '../../components/FormComponent/formType';
import { ChangeEvent, useState } from 'react';
import { FormFields } from '../../components/FormComponent';
import { Button, Divider, Space, Typography } from 'antd';
import './style.css';
import Logo from '../../assets/images/logo192.png';
import LeftLogo from '../../assets/images/leftLogo.png';
import RightLogo from '../../assets/images/rightLogo.png';
import { useNavigate } from 'react-router';
import { GithubFilled, GoogleCircleFilled } from '@ant-design/icons';
import { loginApi } from '../../services/LoginService';
import { homepageRoute } from '../../routes/routes.constant';
import Cookies from 'js-cookie';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { Text } = Typography;

  const LoginFormValidation = yup.object({
    email: yup.string().required('Email is missing!').email('The input should be email'),
    password: yup.string().required('Password is missing!'),
  });

  const LoginFormControl = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidation,
    onSubmit: () => {
      loginApi
        .loginUser({
          email: LoginFormControl.values.email,
          password: LoginFormControl.values.password,
        })
        .then((response: any) => {
          if (response.data.idToken) {
            Cookies.set('token', response.data.idToken);
          }
          navigate(homepageRoute);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Invalid login credentials');
          LoginFormControl.resetForm();
        });
    },
  });

  const handleChange = (key: string, value: string) => {
    LoginFormControl.setFieldValue(key, value);
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential?.accessToken) {
          Cookies.set('token', credential.accessToken);
        }
        navigate(homepageRoute);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  const handleLoginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential?.accessToken) {
          Cookies.set('token', credential.accessToken);
        }
        navigate(homepageRoute);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  const LoginInputForm: FieldConfig[] = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Example@gmail.com',
      type: FORM_TYPE.TEXT,
      required: true,
      className: 'w-full',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('email', e.target.value);
      },
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: '********',
      type: FORM_TYPE.PASSWORD,
      required: true,
      className: 'w-full',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('password', e.target.value);
      },
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="w-full max-w-md p-8 relative z-10 bg-white"
        style={{ borderWidth: '1px', borderColor: 'grey', borderRadius: '10px' }}
      >
        <div className="flex flex-col items-center text-center">
          <img src={Logo} alt="logo-web" className="w-16 h-16 mb-3" />
          <Typography.Title level={5} className="!text-gray-500">
            Signin to Continue
          </Typography.Title>
        </div>

        <div className="mb-4">
          <FormFields fields={LoginInputForm} form={LoginFormControl} />
          {errorMessage && (
            <Text type="danger" className="block mt-2 text-red-500 text-sm">
              {errorMessage}
            </Text>
          )}
        </div>

        <div className="-mt-11 mb-2 flex justify-end">
          <p className="italic">
            Does not have account?{' '}
            <Button type="link" className="!p-0 italic">
              Signup
            </Button>
          </p>
        </div>

        <Button
          type="primary"
          block
          className="!bg-blue-600 hover:!bg-blue-700 !h-12 !text-lg !rounded-xl shadow-md transition"
          onClick={() => LoginFormControl.handleSubmit()}
        >
          Continue
        </Button>

        <div className="mt-6">
          <Divider plain className="text-black" style={{ borderColor: 'black' }}>
            Or
          </Divider>
          <Space className="flex justify-center">
            <Button
              icon={<GoogleCircleFilled />}
              htmlType="button"
              className="!w-12 !h-12 flex items-center justify-center !text-red-500 hover:!bg-red-50"
              onClick={handleLoginWithGoogle}
            />

            <Button
              icon={<GithubFilled />}
              htmlType="button"
              className="!w-12 !h-12 flex items-center justify-center !text-gray-800 hover:!bg-gray-100"
              onClick={handleLoginWithGithub}
            />
          </Space>
        </div>

        <div className="mt-0 flex flex-col items-center">
          <Button
            type="link"
            className="!text-blue-700 hover:!text-blue-500"
            onClick={() => navigate('/privacy-policy')}
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
