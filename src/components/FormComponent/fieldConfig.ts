import React from "react";
import { FORM_TYPE } from "./formType";

export interface FieldConfig {
  name: any;
  label?: string;
  type: FORM_TYPE;
  required?: boolean;
  placeholder?: string;
  className?: string | React.CSSProperties | any;
  onChange?: (e?: any) => void;
  onBlur?: (e?: any) => void;
}
