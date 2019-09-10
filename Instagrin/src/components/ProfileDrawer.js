import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from './Profile';
import Settings from './Settings';
import EditProfile from './EditProfile';

const DrawerNavigator = createAppContainer(createDrawerNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                drawerLabel: () => null
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                drawerLabel: 'Settings',
                drawerIcon: ({ tintColor }) => (
                    <Icon name={'cog'} type='font-awesome' size={25} color={tintColor} />
                )
            }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                drawerLabel: () => null
            }
        }
    },
    {
       drawerBackgroundColor: '#fff',
       drawerPosition: 'right',
       drawerType: 'slide',
       overlayColor: 0,
       style: {
           borderColor: '#cfcfcf',
           borderWidth: 1,
       }
    }
));

export default DrawerNavigator;