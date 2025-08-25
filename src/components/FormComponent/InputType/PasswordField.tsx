import React from 'react'
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface Props {
    addonAfter?: React.ReactNode,
    addonBefore?: React.ReactNode,
    allowClear?: boolean,
    defaultValue?: string,
    id?: string,
    prefix?: React.ReactNode,
    status?: 'error' | 'warning',
    style?: React.CSSProperties,
    suffix?: React.ReactNode,
    value?: string,
    onChange?: (e?:any) => void;
    onPressEnter?: (e?: any) => void;
    onClear?: (e?: any) => void;
    placeholder?: string;
    onBlur?: (e?: any) => void;
    iconRender?: (visible: boolean) => React.ReactNode;
}

export const PasswordField = ({
    id,
    value,
    status,
    allowClear,
    defaultValue,
    style,
    placeholder,
    onChange,
    onBlur,
    ...otherProps
}: Props) => {
    return (
            <Input.Password
                id={id}
                value={value}
                defaultValue={defaultValue}
                style={style}
                status={status}
                allowClear={allowClear}
                placeholder={placeholder}
                onChange={onChange}
                addonAfter={otherProps.addonAfter}
                addonBefore={otherProps.addonBefore}
                prefix={otherProps.prefix}
                suffix={otherProps.suffix}
                onPressEnter={otherProps.onPressEnter}
                onClear={otherProps.onClear}
                onBlur={onBlur}
                iconRender={(visible: boolean) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            ></Input.Password> 
    )
}
