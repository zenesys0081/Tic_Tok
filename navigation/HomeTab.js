/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screen/home/Dashboard';
import Search from '../screen/home/Search';
import Reals from '../screen/home/Reals';
import Notification from '../screen/home/Notification';
import Profile from '../screen/home/Profile';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

export default function HomeTab() {
  const Tab = createBottomTabNavigator();

  const TabButton = ({children, onPress}) => (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <LinearGradient
        colors={['purple', 'white']}
        start={{x: 0.2, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 35,
          justifyContent: 'center',
        }}>
        <View>{children}</View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.tab_icon}>
              <Image
                source={require('../assets/images/dashboard-icon/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'gray',
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'gray',
                  fontSize: height / 70,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      {/* search */}

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Bold',
            fontSize: height / 40,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tab_icon}>
              <Image
                source={require('../assets/images/dashboard-icon/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'gray',
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'gray',
                  fontSize: height / 70,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Search
              </Text>
            </View>
          ),
        }}
      />
      {/* reals */}
      <Tab.Screen
        name="Reals"
        component={Reals}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Bold',
            fontSize: height / 40,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tab_icon}>
              <Image
                source={require('../assets/images/dashboard-icon/add.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#000' : '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          ),
          tabBarButton: props => <TabButton {...props} />,
        }}
      />
      {/* notification */}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Bold',
            fontSize: height / 40,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tab_icon}>
              <Image
                source={require('../assets/images/dashboard-icon/notification.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'gray',
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'gray',
                  fontSize: height / 70,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Notification
              </Text>
            </View>
          ),
        }}
      />
      {/* profile */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'RobotoSlab-Bold',
            fontSize: height / 40,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{marginHorizontal: width * 0.02}}
              onPress={() => alert('comming')}>
              <Image
                source={require('../assets/images/user-image/profilenav.png')}
                style={{color: '#000'}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused}) => (
            <View style={styles.tab_icon}>
              <Image
                source={require('../assets/images/dashboard-icon/account.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'red' : 'gray',
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : 'gray',
                  fontSize: height / 70,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  icon_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//
