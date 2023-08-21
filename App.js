import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './store';

import Index from './views/index';
import Main from './views/main';
import Login from './views/login';
import UserInfo from './views/userInfo';
import Setting from './views/setting';
import Add from './views/add';
import Webview from './views/components/webview';
import Check from './views/status/check';
import CheckRecord from './views/status/checkrecord';
import TakeMedicine from './views/status/takemedicine';
import TakeMedicineRecord from './views/status/takemedicinerecord';
import BodyRecord from './views/status/bodyrecord';
import AddItem from './views/additem';
import Continue from './views/continue';
import Privacy from './views/more/privacy';
import About from './views/more/about';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Webview" component={Webview} />
          <Stack.Screen name="Check" component={Check} />
          <Stack.Screen name="CheckRecord" component={CheckRecord} />
          <Stack.Screen name="TakeMedicine" component={TakeMedicine} />
          <Stack.Screen name="TakeMedicineRecord" component={TakeMedicineRecord} />
          <Stack.Screen name="BodyRecord" component={BodyRecord} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="Continue" component={Continue} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
