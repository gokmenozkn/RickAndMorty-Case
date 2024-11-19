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

export function MultiSelect({
  placeholder = 'Search characters...',
  onSelect,
}: MultiSelectProps) {
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

  // inputa girilen harfler sonuçlarda varsa o harfleri bold şekilde göster
  const highlightText = (text: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={i} className='font-bold'>
              {part}
            </Text>
          ) : (
            part
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
      {/* Selected Items */}
      <View className='flex-row flex-wrap gap-2 mb-2'>
        {selectedCharacters.map((character) => (
          <TouchableOpacity
            key={character.id}
            className='bg-blue-100 rounded-full px-3 py-1 flex-row items-center'
            onPress={() => removeCharacter(character.id)}
          >
            <Text className='mr-2'>{character.name}</Text>
            <Text className='text-blue-500'>×</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input */}
      <TextInput
        className='border border-gray-300 rounded-lg px-4 py-2'
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />

      {/* Dropdown */}
      {isOpen && (
        <View className='border border-gray-300 rounded-lg mt-1 max-h-80'>
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
                  className='flex-row items-center p-2 border-b border-gray-200'
                  onPress={() => handleSelect(item)}
                >
                  <Image
                    source={{ uri: item.image }}
                    className='w-12 h-12 rounded-full'
                  />
                  <View className='ml-3 flex-1'>
                    {highlightText(item.name)}
                    <Text className='text-gray-500'>
                      Episodes: {item.episode.length}
                    </Text>
                  </View>
                  {selectedCharacters.find((c) => c.id === item.id) && (
                    <Text className='text-blue-500 mr-2'>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
