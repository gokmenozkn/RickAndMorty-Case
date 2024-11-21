import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';
import { Character } from '../types';
import { useCharacterSearch } from '@/hooks/useCharacterSearch';
import SearchResults from './SearchResults';
import { SearchInput } from './SearchInput';
import { SelectedItems } from './SelectedItems';

export interface MultiSelectProps {
  placeholder?: string;
  onSelect: (items: Character[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder = 'Search characters...',
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCharacters, addCharacter, removeCharacter } = useStore();

  const { data, isLoading, error } = useCharacterSearch(query);

  const handleSelect = (character: Character) => {
    if (selectedCharacters.find((c) => c.id === character.id)) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
    onSelect(selectedCharacters);
  };

  return (
    <View className='w-full'>
      <View className='border border-gray-400 rounded-xl px-4 py-2 bg-white'>
        <View className='items-center flex-row flex-wrap gap-2 mb-2'>
          {/* selected characters */}
          <SelectedItems
            items={selectedCharacters}
            onRemove={removeCharacter}
          />

          {/* Search input */}
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)}
          />

          {/* Dropdown icon */}
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Text className='text-gray-500 text-xl'>{isOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isOpen && (
        <View className='mt-1 border border-gray-400 rounded-lg bg-white max-h-80'>
          <SearchResults
            data={data?.results || []}
            isLoading={isLoading}
            error={error}
            searchQuery={query}
            selectedIds={selectedCharacters.map((c) => c.id)}
            onSelect={handleSelect}
          />
        </View>
      )}
    </View>
  );
};
