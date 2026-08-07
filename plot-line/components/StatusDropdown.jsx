import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const StatusDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Just Started', value: 'Just Started' },
    { label: 'Halfway', value: 'Halfway' },
    { label: 'Nearly Done', value: 'Nearly Done' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(val) => {
        setValue(val);
        onSelect(val);
      }}
      setItems={setItems}
    />
  );
};

export default StatusDropdown;
