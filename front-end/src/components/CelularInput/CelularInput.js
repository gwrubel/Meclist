import React from 'react';
import InputMask from 'react-input-mask';

const CelularInput = ({ value, onChange, name, id }) => {
    return (
        <InputMask
            mask="(99) 99999-9999" // Defina a máscara desejada
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            placeholder="(99) 99999-9999"
            required
        >
            {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>
    );
};

export default CelularInput;
