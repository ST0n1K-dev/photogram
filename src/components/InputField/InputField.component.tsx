import React from 'react';
import { InputType } from './InputField.config';

import './InputField.style.scss';

export const InputField: React.FC<InputType> = (props) => {
    const {
        id, name, value, onChange, onBlur, placeholder, error, type
    } = props;

  return (
    <div className="InputField--container">
        <input
            className="InputField"
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
        />
        { error && <span className="Formik--error">{error}</span> }
    </div>
  );
};

export default InputField;
