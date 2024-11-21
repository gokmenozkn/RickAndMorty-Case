import { View, StatusBar } from 'react-native';
import { MultiSelect } from '@/components/MultiSelect';

export default function Index() {
  return (
    <View className="flex-1 p-4">
      <MultiSelect
        onSelect={(characters) => {
          console.log('Selected characters:', characters);
        }}
      />

      <StatusBar barStyle="dark-content" />
    </View>
  );
}
