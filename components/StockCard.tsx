import { View, Pressable, useWindowDimensions } from 'react-native';
import { formatCurrency } from '@/utils/formatCurrency';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { type SearchableStock } from '@/data';

export function StockCard({ item }: { item: SearchableStock }) {

    const { width } = useWindowDimensions()

    return (
        <Pressable
            onPress={() => router.push({ 
              pathname: '/[ticker]', 
              params: { 
                ticker: item.ticker 
              } 
            })}
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: 80
            }}
          >
            <Image 
              contentFit='contain'
              source={item.image} 
              style={{ width: 50, height: 50 }}
            />
            <View
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                width: width - 75,
                paddingLeft: 15 
              }}
            >
              <View>
                <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>
                  {item.ticker}
                </Text>
                <Text variant='labelMedium'>{item.companyName}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant='titleMedium' style={{ fontWeight: 'bold' }}>
                  {formatCurrency(item.price)}
                </Text>
                <Text 
                  variant='labelMedium'
                  style={{
                    color:
                      item.priceChange < 0
                        ? 'red'
                        : item.priceChange > 0
                        ? 'lightgreen'
                        : 'auto'
                  }}
                >
                  {formatCurrency(item.priceChange)} 
                  {item.priceChangePercentage.toFixed(2)}
                </Text>
              </View>
            </View>
        </Pressable>    
    )
}