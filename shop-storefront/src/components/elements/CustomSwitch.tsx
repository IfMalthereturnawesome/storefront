import React from 'react';

const CustomSwitch = ({ isSelected, onChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isSelected} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    );
};

export default CustomSwitch;
