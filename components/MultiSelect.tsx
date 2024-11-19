import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/useStore';
import { Character } from '../types';

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

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', query],
    queryFn: async () => {
      if (!query) return { results: [] };
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    },
    enabled: query.length > 0,
  });

  const highlightText = (text: string, searchWord: string) => {
    const regex = new RegExp(`(${searchWord})`, 'gi');
    const parts = text.split(regex);

    return (
      <Text className='text-gray-800 text-base'>
        {parts.map((part, i) =>
          part.toLowerCase() === searchWord.toLowerCase() ? (
            <Text key={i} className='font-bold'>
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

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
      <View className='border border-gray-200 rounded-xl px-4 py-2 bg-white'>
        <View className='items-center flex-row flex-wrap gap-2 mb-2'>
          {/* selected characters */}
          {selectedCharacters.map((character) => (
            <View
              key={character.id}
              className='bg-gray-100 rounded-full px-3 py-1.5 flex-row items-center'
            >
              <Text className='text-gray-800'>{character.name}</Text>
              <TouchableOpacity
                onPress={() => removeCharacter(character.id)}
                className='ml-2'
              >
                <Text className='text-gray-500 text-lg'>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Search input */}
          <TextInput
            className='flex-1 min-w-[120px] text-base'
            value={query}
            onChangeText={setQuery}
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
        <View className='mt-1 border border-gray-200 rounded-lg bg-white max-h-80'>
          {isLoading ? (
            <ActivityIndicator className='py-4' />
          ) : error ? (
            <Text className='p-4 text-red-500'>Error loading characters</Text>
          ) : (
            <FlatList
              data={data?.results || []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className='flex-row items-center p-3 border-b border-gray-100'
                >
                  <View className='mr-3'>
                    <Image
                      source={{ uri: item.image }}
                      className='w-12 h-12 rounded-lg'
                    />
                  </View>

                  <View className='flex-1'>
                    {highlightText(item.name, query)}
                    <Text className='text-gray-500 text-sm'>
                      {item.episode.length} Episodes
                    </Text>
                  </View>

                  <View className='w-6 h-6 border border-gray-300 rounded mr-2 justify-center items-center'>
                    {selectedCharacters.find((c) => c.id === item.id) && (
                      <Text className='text-blue-500'>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};
