import Swippeable from 'react-native-gesture-handler/Swipeable';
import { StyleSheet, Pressable, FlatList, View, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StockCard } from '@/components/StockCard';
import { StoredContext } from '../_layout';
import { Text } from 'react-native-paper';
import { useContext } from 'react';
import { stocks } from '@/data';

type RightActionsProps = {
  progress: Animated.AnimatedInterpolation<string | number>;
  dragx: Animated.AnimatedInterpolation<string | number>;
  onPress: () => void;
}

function RightActions({ progress, dragx, onPress }: RightActionsProps) {

  const scale = dragx.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0]
  });

  const trans = dragx.interpolate({
    inputRange: [20, 43, 100, 101],
    outputRange: [-20, 0, 0, 1],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateX: trans }],
        position: 'relative',
        right: '160%',
        top: 0,
        zIndex: -100
      }}
    >
      <Pressable 
        onPress={onPress}
        style={{
          width: 100,
          height: 55,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red'
        }}
      >
        <MaterialCommunityIcons 
          name="delete-outline" 
          color="white" 
          size={24} 
          style={{ marginStart: 3 }}
        />
        <Animated.Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            transform: [{ scale }]
          }}
        >
          Delete
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export default function WatchlistScreen() {

  const { likedStocks, updateLikedStocks } = useContext(StoredContext);

  if(likedStocks.length === 0) return (
    <View style={styles.container}>
      <Text 
        variant='titleLarge' 
        style={{ fontWeight: 'bold' }}
      >
        No Stocks On Watchlist
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stocks.filter((i) => likedStocks.includes(i.ticker))}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <Swippeable
            renderRightActions={(progress, dragx) => (
              <RightActions 
                progress={progress} 
                dragx={dragx} 
                onPress={() => updateLikedStocks(item.ticker, 'del')}
              />
            )}
          >
            <StockCard item={item} />
          </Swippeable>
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
  }
});
