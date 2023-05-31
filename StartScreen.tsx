import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface ScreenRouterProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export const StartScreen: React.FC<ScreenRouterProps> = ({navigation}) => {
  const onPressHandle = () => navigation.navigate('CardsList');

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Button onPress={onPressHandle} title="Go to card list" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollWrapper: {
    flex: 1,
  },
});
