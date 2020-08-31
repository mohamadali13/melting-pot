import React, { Fragment, useState, useEffect } from 'react';

const SettingsItemCheckbox = ({ item, onChange }) => {

  // Component State
  const [checked, setChecked] = useState(item.defaultValue());

  // EventListener for the checkbox
  // Callback from SettingsView -> onItemValueChange
  const onCheckboxChange = (event) => {
    setChecked(event.target.checked);
  }

  // Call onChange after setting the state completed
  useEffect(() => {
    onChange(item.key, checked);
  }, [checked]);

  //TODO: remove disabled
  return(
    <Fragment>
      <label>{item.name}</label>
      <input
        disabled
        type='checkbox'
        defaultChecked={item.defaultValue()}
        onChange={(event) => onCheckboxChange(event)}
      />
    </Fragment>
  );
};

export default SettingsItemCheckbox;