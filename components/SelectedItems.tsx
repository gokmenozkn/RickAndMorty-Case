import { View, Text } from 'react-native';
import React from 'react';
import { Character } from '@/types';
import { SelectedItem } from './SelectedItem';

interface SelectedItemsProps {
  items: Character[];
  onRemove: (id: number) => void;
}

export const SelectedItems: React.FC<SelectedItemsProps> = ({
  items,
  onRemove,
}) => (
  <View className='flex-row flex-wrap gap-2'>
    {items.map((item) => (
      <SelectedItem key={item.id} item={item} onRemove={onRemove} />
    ))}
  </View>
);
