import { useState } from 'react';
import { Combobox, Select, TextInput, useCombobox } from '@mantine/core';

const groceries = [
  { value: '1', label: '🍎 Apples' },
  { value: '2', label: '🍌 Bananas' },
  { value: '3', label: '🥦 Broccoli' },
  { value: '4', label: '🥕 Carrots' },
  { value: '5', label: '🍫 Chocolate' },
];

function ProjectSelectInput() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some(
    (item) => item.value.toString() === value,
  );
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()),
      )
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.label} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <Select
          label="Project Menu"
          placeholder="Pilih Projects"
          data={groceries}
          value={value}
          onChange={(event) => {
            setValue(event as any);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default ProjectSelectInput;
