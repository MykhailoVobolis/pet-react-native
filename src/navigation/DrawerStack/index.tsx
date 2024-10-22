import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenNames} from '../../constants/screenNames';
import TabBarStack from '../TabBarStack';
import {DrawerStackType} from '../types';
import Header from '../../common/components/Header';
import DrawerContent from '../../common/components/DrawerContent';
import {Dimensions} from 'react-native';

const Drawer = createDrawerNavigator<DrawerStackType>();

const renderDrawerContent = () => <DrawerContent />;
const renderHeader = () => <Header />;

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      drawerContent={renderDrawerContent}
      screenOptions={{
        header: renderHeader,
        drawerPosition: 'right',
        drawerStyle: {width: Dimensions.get('window').width},
      }}>
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
