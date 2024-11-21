import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Character } from '@/types';
import { HighlightedText } from './HighlightedText';
import { SelectionCheckbox } from './SelectionCheckBox';

interface SearchResultItemProps {
  item: Character;
  searchQuery: string;
  isSelected: boolean;
  onSelect: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  searchQuery,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      className='flex-row items-center p-3 border-b border-gray-400'
    >
      <View className='mr-3'>
        <Image source={{ uri: item.image }} className='w-12 h-12 rounded-lg' />
      </View>
      <View className='flex-1'>
        <HighlightedText text={item.name} searchWord={searchQuery} />
        <Text className='text-gray-500 text-sm'>
          {item.episode.length} Episodes
        </Text>
      </View>
      <SelectionCheckbox isSelected={isSelected} />
    </TouchableOpacity>
  );
};

export default SearchResultItem;
