import { StyleSheet, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StoredContext } from './_layout';
import { useContext } from 'react';
import { searchStocks } from '@/utils/searchStocks';
import { StockCard } from '@/components/StockCard';

export default function SearchScreen() {

  const { searchQuery, searchedStocks } = useContext(StoredContext);
  
  if(!searchQuery && searchStocks.length === 0) return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Search Stocks
      </Text>
    </View>
  );
  
  if(searchQuery && searchStocks.length === 0) return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        No Stocks Found
      </Text>
    </View>
  );

  return (
    <FlatList
      data={searchedStocks}
      keyExtractor={(item) => item.ticker}
      renderItem={({ item }) => <StockCard item={item}/>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
