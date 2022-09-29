import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export const DropDown = ({ items, setItems, value, setValue, schema }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      schema={schema}
      itemKey="name"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};
