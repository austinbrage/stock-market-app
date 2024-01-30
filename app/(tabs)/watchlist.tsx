import { StyleSheet, FlatList, View } from 'react-native';
import { StockCard } from '@/components/StockCard';
import { StoredContext } from '../_layout';
import { Text } from 'react-native-paper';
import { useContext } from 'react';
import { stocks } from '@/data';

export default function WatchlistScreen() {

  const { likedStocks } = useContext(StoredContext);

  if(likedStocks.length === 0) return (
    <View style={styles.container}>
      <Text>No Stocks On Watchlist</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stocks.filter((i) => likedStocks.includes(i.ticker))}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard item={item} />
        )}
      />
    </View>
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
