import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Character } from '@/types';

interface SelectedItemProps {
  item: Character;
  onRemove: (id: number) => void;
}

export const SelectedItem: React.FC<SelectedItemProps> = ({
  item,
  onRemove,
}) => {
  return (
    <View className='bg-gray-100 rounded-full px-3 py-1.5 flex-row items-center'>
      <Text className='text-gray-800'>{item.name}</Text>
      <TouchableOpacity onPress={() => onRemove(item.id)} className='ml-2'>
        <Text className='text-gray-500 text-lg'>×</Text>
      </TouchableOpacity>
    </View>
  );
};
