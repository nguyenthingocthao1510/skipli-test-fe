import { useFormik } from 'formik';
import * as yup from 'yup';
import { FieldConfig } from '../../components/FormComponent/fieldConfig';
import { FORM_TYPE } from '../../components/FormComponent/formType';
import { ChangeEvent } from 'react';
import { FormFields } from '../../components/FormComponent';
import { Button } from 'antd';


export const LoginPage = () => {
    const LoginFormValidation = yup.object({
        username: yup.string().required('Email is missing!').email('The input should be email'),
        password: yup.string().required('Password is missing!'),
    });

    const LoginFormControl = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginFormValidation,
        onSubmit: () => {
            console.log('value: ', LoginFormControl.values);
        },
    });

    const LoginInputForm: FieldConfig[] = [
        {
            name: 'username',
            label: 'Email',
            placeholder:'Example@gmail.com',
            type: FORM_TYPE.TEXT,
            required: true,
            className:'mx-6 pt-5',
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleChange('username', e.target.value);
            }
        },
        {
            name: 'password',
            label: 'Password',
            placeholder:'********',
            className:'mr-6',
            type: FORM_TYPE.PASSWORD,
            required: true,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleChange('password', e.target.value);
            }
        }
    ]

    const handleChange = (key: string, value: string) => {
       LoginFormControl.setFieldValue(key,value);
    }

    return(
        <div>
            <div className='mx-5'>
                <FormFields fields={LoginInputForm} form={LoginFormControl}></FormFields>
            </div>
            <Button onClick={() => LoginFormControl.handleSubmit()}>Submit</Button>
        </div>
    )
}
