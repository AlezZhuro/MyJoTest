import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CardDTO, CardResponseType} from './models';
import {addCard, getFilteredTasks} from './cardUtils';

const data = require('./data.json');

export const CardsScreen = () => {
  const [cards, setCards] = useState<[] | CardDTO[]>([]);

  useEffect(() => {
    let timerID;

    try {
      Promise.resolve<CardResponseType>(data).then(res => {
        console.log('first call');
        if (res.success) {
          setCards(res.result);
          if (!timerID) {
            timerID = setInterval(async () => {
              console.log('call in timeout');
              const {success, result} = await Promise.resolve<CardResponseType>(
                data,
              );

              success && setCards(result);
            }, 10000);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      console.log('exit');
      clearInterval(timerID);
    };
  }, []);

  const filteredTasks = useMemo(() => getFilteredTasks(cards), [cards]);

  const onCardPress = useCallback((item: CardDTO) => {
    console.log('renderOnCardP');
    Alert.alert(item.name, item?.description ?? 'Some description', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
      },
      {text: 'OK', onPress: () => addCard(item)},
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.screenTitle}>Hi Card</Text>
      <View style={styles.listWrapper}>
        {!!cards.length && (
          <FlatList
            data={filteredTasks}
            renderItem={({item}) => {
              return (
                <Card cardInfo={item} onCardPress={onCardPress}>
                  <View key={item.card_id} style={styles.item}>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({card_id}) => `${card_id}`}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
  },
  screenTitle: {
    paddingHorizontal: 16,
  },
  listWrapper: {flex: 1},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: '#000000',
  },
});

/* 
При рендере item, используйте условный компонент карточки
товара (дочерний компонент, например, будет Card, его писать не нужно, его
props соответствуют полям из result).

Не совсем понял что имеется ввиду(
 */

type CardProps = {
  onCardPress: (item: CardDTO) => void;
  cardInfo: CardDTO;
};

const Card: React.FC<CardProps & PropsWithChildren> = ({
  children,
  onCardPress,
  cardInfo,
}) => {
  const cardPressHandle = () => {
    onCardPress(cardInfo);
  };

  return (
    <TouchableOpacity onPress={cardPressHandle}>{children}</TouchableOpacity>
  );
};
