import { StockCard } from '@/components/StockCard';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { stocks } from '@/data';

export default function HomeScreen() {

  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text 
        variant='titleLarge'
        style={{ fontWeight: 'bold', marginLeft: 5, marginBottom: 5 }}
      >
        Available Stocks
      </Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard item={item}/>
        )}
      />
    </View>
  );
}