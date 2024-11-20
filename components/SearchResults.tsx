import { Text, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import { Character } from '@/types';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  data: Character[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  selectedIds: number[];
  onSelect: (character: Character) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  data,
  isLoading,
  error,
  searchQuery,
  selectedIds,
  onSelect,
}) => {
  if (isLoading) return <ActivityIndicator className='py-4' />;
  if (error) {
    return <Text className='p-4 text-red-500'>Error loading characters</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SearchResultItem
          item={item}
          searchQuery={searchQuery}
          isSelected={selectedIds.includes(item.id)}
          onSelect={() => onSelect(item)}
        />
      )}
    />
  );
};

export default SearchResults;
