import { Text } from 'react-native';
import React from 'react';

interface HighlightedTextProps {
  text: string;
  searchWord: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchWord,
}) => {
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
