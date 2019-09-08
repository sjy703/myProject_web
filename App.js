import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/common/store';
import MainActivity from './src/component/main/MainActivity';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './src/component/login/LoginForm';
import SignUp from './src/component/login/SignUp';
import MealSummary from './src/component/mealPlan/MealSummary';
import Meal from './src/component/mealPlan/Meal';
import Nutrient from './src/component/mealPlan/Nutrient';
import TabIcon from './src/component/custom/TabIcon';
import { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App(props) {
  const [isReady, setIsReady] = useState(false);

  async function fetchFont() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true);
  }

  useEffect(() => {
    fetchFont();
  }, []);

  if (isReady) {
    return (
      <StoreProvider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key="tabbar"
              tabs={true}
              hideNavBar
              tabBarStyle={styles.tabBar}
            >
              <Scene key="mealTab" title="식단" icon={TabIcon}>
                <Scene key="mealSummary" component={MealSummary} />
              </Scene>
            </Scene>
            <Scene key="home" component={MainActivity} initial />
            <Scene key="login" component={LoginForm} title="Login" />
            <Scene key="signUp" component={SignUp} title="signUp" />
            <Scene key="meal" component={Meal} />
            <Scene key="nutrient" component={Nutrient} />
          </Scene>
        </Router>
      </StoreProvider>
    );
  } else {
    return <AppLoading></AppLoading>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: 'darkgrey',
    backgroundColor: 'ghostwhite',
    opacity: 0.98,
  },
  navigationBarStyle: {
    backgroundColor: 'red',
  },
  navigationBarTitleStyle: {
    color: 'white',
  },
});
