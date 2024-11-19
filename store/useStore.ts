import { create } from 'zustand';
import { Character } from '@/types';

interface Store {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (characterId: number) => void;
}

export const useStore = create<Store>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (characterId) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (c) => c.id !== characterId
      ),
    })),
}));
