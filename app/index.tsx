import { SafeAreaView, Text, View } from 'react-native';
import { MultiSelect } from '@/components/MultiSelect';

export default function Index() {
  return (
    // <View className='flex-1 justify-center items-center bg-yellow-700'>
    //   <Text className='font-bold text-blue-300'>
    //     Edit app/index.tsx to edit this screen.
    //   </Text>
    // </View>

    <View className="flex-1 p-4">
      <MultiSelect
        onSelect={(characters) => {
          console.log('Selected characters:', characters);
        }}
      />
    </View>

    // <SafeAreaView className='flex-1 bg-black items-center justify-center'>
    //   <Text className='font-bold text-blue-300'>
    //     Edit app/index.tsx to edit this screen.
    //   </Text>
    // </SafeAreaView>
  );
}
