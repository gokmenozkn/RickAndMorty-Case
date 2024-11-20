import { View, Text } from 'react-native';
import React from 'react';

interface SelectionCheckboxProps {
  isSelected: boolean;
}

export const SelectionCheckbox: React.FC<SelectionCheckboxProps> = ({
  isSelected,
}) => (
  <View className='w-6 h-6 border border-gray-300 rounded mr-2 justify-center items-center'>
    {isSelected && <Text className='text-blue-500'>✓</Text>}
  </View>
);
