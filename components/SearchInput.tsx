import { TextInput } from 'react-native';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  placeholder,
}) => (
  <TextInput
    className='flex-1 min-w-[120px] text-base'
    value={value}
    onChangeText={onChange}
    placeholder={placeholder}
    onFocus={onFocus}
  />
);
