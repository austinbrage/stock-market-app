import { Image } from 'expo-image';
import { StoredContext } from './_layout';
import { useState, useContext } from 'react';
import { BarChart } from '@/components/BarChart';
import { Text, Button } from 'react-native-paper';
import { PriceChart } from '@/components/PriceChart';
import { formatCurrency } from '@/utils/formatCurrency';
import { View, SafeAreaView, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectStock, selectStockPrices } from '@/utils/searchStocks';

export default function TickerScreen() {

  const { ticker } = useLocalSearchParams();
  const { likedStocks, updateLikedStocks } = useContext(StoredContext);
  
  const stock = selectStock(ticker as string);
  const stockPrices = selectStockPrices(ticker as string);

  const options = ['Description', 'Historical Metrics'];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  
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
        <Pressable
          onPress={() => {
            likedStocks.includes(ticker as string)
              ? updateLikedStocks(ticker as string, 'del')
              : updateLikedStocks(ticker as string, 'add')
          }}
        >
          <MaterialCommunityIcons 
            name={likedStocks.includes(ticker as string) ? 'star' : 'star-outline'} 
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
            <FlatList
              horizontal
              data={options}
              style={{ marginTop: 80 }}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Button
                  style={{ marginRight: 10 }}
                  onPress={() => setSelectedOption(item)}
                  mode={item === selectedOption ? 'contained' : 'outlined'}  
                  >
                  {item}
                </Button>
              )}
            />
            {selectedOption === 'Description' ? (
              <View style={{ marginTop: 20 }}>
                
                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold' }}
                >
                  CEO
                </Text>
                <Text>{stock.ceo}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  Exchange
                </Text>
                <Text>{stock.exchange}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  Sector
                </Text>
                <Text>{stock.sector}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  Industry
                </Text>
                <Text>{stock.industry}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  Location
                </Text>
                <Text>{stock.city}, {stock.state}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  IPO
                </Text>
                <Text>{stock.ipoDate}</Text>

                <Text 
                  variant='titleMedium' 
                  style={{ fontWeight: 'bold', marginTop: 5 }}
                >
                  Description
                </Text>
                <Text>{stock.description}</Text>

              </View>
            ) : null} 

            {selectedOption == 'Historical Metrics' ? (
              <View style={{ marginTop: 20 }}>
                
                <BarChart
                  label='ROE'
                  color='lightblue'
                  data={stock.returnOnEquity}
                />

                <BarChart
                  label='ROCE'
                  color='lightgreen'
                  data={stock.returnOnCapitalEmployed}
                />
                
                <BarChart
                  label='Revenue'
                  color='dodgerblue'
                  data={stock.revenue}
                />

                <BarChart
                  label='Earnings'
                  color='dodgergreen'
                  data={stock.earnings}
                />

                <BarChart
                  label='FCF'
                  color='maroon'
                  data={stock.freeCashFlow}
                />

                <BarChart
                  label='Cash'
                  color='green'
                  data={stock.cash}
                />

                <BarChart
                  label='Debt'
                  color='purple'
                  data={stock.debt}
                />

                <BarChart
                  label='Gross Profit Margin'
                  color='orange'
                  data={stock.grossProfitMargin}
                />

                <BarChart
                  label='Net Profit Margin'
                  color='cornSilk'
                  data={stock.netProfitMargin}
                />

              </View>
            ) : null}

          </View>
        )}
      />
      ) : (
        <Text>Stock Not Available</Text>
      )}
      
    </SafeAreaView>
  );
}