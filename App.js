import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './store';

import Index from './views/index';
import Main from './views/main/index';
import Login from './views/login/login';
import UserInfo from './views/main/userInfo';
import Setting from './views/main/setting';
import Webview from './views/components/webview';
import Check from './views/record/check';
import Record from './views/record/record';
import CheckRecord from './views/record/checkrecord';
import TakeMedicine from './views/record/takemedicine';
import TakeMedicineRecord from './views/record/takemedicinerecord';
import BodyRecord from './views/record/bodyrecord';
import Add from './views/add/index';
import AddItem from './views/add/additem';
import AddItemFromIndex from './views/add/additemfromindex';
import Continue from './views/add/continue';
import Privacy from './views/main/setting/privacy';
import About from './views/main/about';
import Help from './views/main/help';

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
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="AddItemFromIndex" component={AddItemFromIndex} />
          <Stack.Screen name="Continue" component={Continue} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
