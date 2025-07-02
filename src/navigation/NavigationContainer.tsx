import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Dwnld from '../screens/Dwnld';
import ScanID from '../screens/ScanID';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Dwnld" 
        
        screenOptions={({route}:{route:any})=>({
          headerShown:false,
          tabBarHideOnKeyboard:true,
          tabBarActiveTintColor:'#9265CE',
          tabBarInactiveTintColor:'#9B9E9C',
          tabBarStyle: {
              backgroundColor: '#0F0D11',
              height: 60,
              borderColor:'#DDD8E2',
              elevation: 10,
            },
          tabBarLabelStyle: {
              fontSize: 12,
              paddingBottom:10
            },
          tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';

              if (route.name === 'Dwnld') {
                iconName = 'cloud-download';
              } else if (route.name === 'ScanID') {
                iconName = 'camera';
              }

              return <Icon name={iconName} size={focused ? 26 : 22} color={color} />;
            },
        
        })}
        >
          <Tab.Screen name="Dwnld" component={Dwnld} />
          <Tab.Screen name="ScanID" component={ScanID} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Navigation;