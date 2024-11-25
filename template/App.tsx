import { useContext, useEffect, useRef, useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContextProvider } from '@config/ThemeContext';
import BottomSheet from '@components/bottomSheet';
import Toast from 'react-native-toast-message';
import Snackbar from '@components/snackBar';
import Swipeable from '@components/swipeable';
import { FabBorderRadius, FabSize, IconFamily, SwipeDirection } from '@constants';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContextProvider>
        <GestureHandlerRootView>
          <Main />
          <Toast />
          <BottomSheet />
          <Snackbar />
        </GestureHandlerRootView>
      </ThemeContextProvider>
    </SafeAreaProvider>
  );
};

const SwipeableList = () => {
  const [dismissedItems, setDismissedItems] = useState<any[]>([]);

  const data = Array.from({ length: 3 }, (_, index) => ({
    id: index.toString(),
    text: `Item ${index + 1}`,
  }));

  const handleDismiss = (id: any) => {
    setDismissedItems((prev) => [...prev, id]);
    Snackbar.show({
      text: 'Dismissed',
      indefinite: true,
      action: (
        <Button
          title="Un Dismiss"
          onPress={() => {
            undoDismiss(id);
          }}
        />
      ),
    });
  };

  const undoDismiss = (id: any) => {
    setDismissedItems((prev) => prev.filter((itemId) => itemId !== id));
    Snackbar.show({ text: 'Undismissed' });
  };

  const renderItem = ({ item }: any) => {
    if (dismissedItems.includes(item.id)) return null;

    return (
      <Swipeable
        leftChild={
          <View
            style={{
              flex: 1,
              backgroundColor: 'cyan',
            }}
          />
        }
        rightChild={
          <View
            style={{
              flex: 1,
              backgroundColor: 'red',
            }}
          />
        }
        dismissDirection={SwipeDirection.right}
        onDismiss={() => handleDismiss(item.id)}
      >
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      scrollEnabled={false}
    />
  );
};

const Main = () => {
  return (
    <SafeAreaView style={{ height: '100%', width: '100%', flex: 1 }}>
      {/* <View style={styles.container} />
       */}
      <SwipeableList />
      {/* <ScrollView onScroll={handleScroll}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View
            key={i}
            style={styles.box}
          />
        ))}
      </ScrollView>

      {isFabVisible && (
        <Animated.View style={styles.fabContainer}>
          <Button title="FAB" />
        </Animated.View>
      )} */}
      {/* </View> */}
      {/* <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: theme.colors.primaryBackground,
        }}
      >
        <ScrollView
          onScrollBeginDrag={() => setVisible(true)}
          onMomentumScrollEnd={() => setVisible(false)}
          scrollEventThrottle={20}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: theme.colors.primaryBackground,
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <Text
              key={i}
              style={{ marginBottom: 30 }}
            >
              {i}
            </Text>
          ))}
        </ScrollView>
        <FloatingActionButtonAutoHide
          icon={{ family: IconFamily.materialIcons, name: 'add' }}
          visible={false}
          // borderRadius={FabBorderRadius.round}
          size={FabSize.mini}
        />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  content: {
    height: 1000, // Example height to allow scrolling
    justifyContent: 'space-around',
  },
  box: {
    height: 100,
    width: '100%',
    backgroundColor: 'lightblue',
    marginVertical: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
  },
});

export default App;
