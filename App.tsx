import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native'

import { Home, Landing } from './src/screens'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: Landing
      // search address screen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },
  homeStack: createBottomTabNavigator({
    // home tab icon
    home: {
      screen: createStackNavigator({
        HomePage: Home
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true 
          ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    // Home tab Icon
    Offer: {
      screen: createStackNavigator({
        OfferPage: Home
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true 
          ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

     // Home tab Icon
    Cart: {
      screen: createStackNavigator({
        CartPage: Home,
        LoginPage: Home
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true 
          ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
     // Home tab Icon
    Account: {
      screen: createStackNavigator({
        AccountPage: Home,
        LoginPage: Home
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true 
          ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    }
  })
})

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30
  }
})
