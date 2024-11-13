import React from 'react';
import InputMask from 'react-input-mask';

const CPFInput = ({ value, onChange, name, id }) => {
    return (
        <InputMask
            mask="999.999.999-99" // Máscara para CPF
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            placeholder="000.000.000-00"
            required
        >
            {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>
    );
};

export default CPFInput;
