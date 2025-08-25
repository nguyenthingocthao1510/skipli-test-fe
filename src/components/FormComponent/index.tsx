import { Form } from 'antd'
import { FORM_TYPE } from './formType'
import { InputField } from './InputType/InputField';
import { FieldConfig } from './fieldConfig';
import { FormikProps } from "formik";
import { PasswordField } from './InputType/PasswordField';

interface Props {
    fields: FieldConfig[];
    form: FormikProps<any>;
}

export const FormFields = ({fields, form, ...otherProps} : Props) => {
    const renderFields = (field: FieldConfig) => {
        switch(field.type)
        {
            case FORM_TYPE.TEXT:
                return(
                    <div>
                        <InputField
                            id={field.name} 
                            value={form.values[field.name]}
                            key={field.name}
                            placeholder={field.placeholder}
                            onBlur={form.handleBlur}
                            onChange={form.handleChange || field.onChange}
                        />
                    </div>
                );
            case FORM_TYPE.PASSWORD:
                return(
                    <div>
                        <PasswordField
                            id={field.name} 
                            value={form.values[field.name]}
                            key={field.name}
                            placeholder={field.placeholder}
                            onBlur={form.handleBlur}
                            onChange={form.handleChange || field.onChange}
                        />
                    </div>
                );
            default:
                return null;    
        }
    }
  return (
    <div>
        <Form >
            {fields.map((field) => (
                <Form.Item 
                    key={field.name} 
                    name={field.name} 
                    label={field.label}
                    className={field.className}
                    validateStatus={form.errors[field.name] && form.touched[field.name] ? 'error' : ''}
                    help={form.touched[field.name] && form.errors[field.name]
                        ? <p className='justify-items start flex'>{form.errors[field.name] as string}</p>
                        : ''}>
                    {renderFields(field)}
                </Form.Item>
            ))}
        </Form>
    </div>
  );
};
