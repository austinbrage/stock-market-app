import { Image } from 'expo-image'
import { Text } from 'react-native-paper';
import { PriceChart } from '@/components/PriceChart';
import { formatCurrency } from '@/utils/formatCurrency';
import { View, SafeAreaView, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectStock, selectStockPrices } from '@/utils/searchStocks';

export default function TickerScreen() {

  const { ticker } = useLocalSearchParams();

  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);
  
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
      <View 
        style={{
          flexDirection: 'row',
          paddingVertical: 25,
          justifyContent: 'space-between'
        }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons 
            name='chevron-left' 
            color={'white'} 
            size={40}
          />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons 
            name='star-outline' 
            color={'white'} 
            size={40} 
          />
        </Pressable>
      </View>

      {stock ? (
        <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image 
                source={stock.image} 
                contentFit='contain'
                style={{ width: 50, height: 50 }}
                />
              <View style={{ paddingLeft: 20 }}>
                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold' }}
                >
                  {stock.ticker}
                </Text>
                <Text
                  variant='labelMedium'
                >
                  {stock.companyName}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text variant='headlineLarge' style={{ fontWeight: 'bold' }}>
                {formatCurrency(stock.price)}
              </Text>
              <Text 
                variant='labelLarge'
                style={{
                  color:
                    stock.priceChange < 0
                      ? 'red'
                      : stock.priceChange > 0
                      ? 'lightgreen'
                      : 'auto'
                }}
              >
                {formatCurrency(stock.priceChange)} 
                {stock.priceChangePercentage.toFixed(2)}
              </Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <PriceChart stockPrices={stockPrices}/>
            </View>
          </View>
        )}
      />
      ) : (
        <Text>Stock Not Available</Text>
      )}
      
    </SafeAreaView>
  );
}