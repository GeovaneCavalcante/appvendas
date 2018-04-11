import LoginScreen from '../../components/Login/Login';
import  HomeScreen  from '../../components/home/Home';
 
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddIcon = ({navigation}) => {
    return(
      <Ionicons
            name="md-add"
            size={28}
            color= "blue"
            style={{ paddingRight: 20 }}
            onPress={() => navigation.navigate('Add')}
          />
   
    );
}

const LoginStack = StackNavigator(
  {
      Login: { 
          screen: LoginScreen,
          navigationOptions: (props) => ({
            headerMode: 'none',
              title: 'Login',
              
            
          })
      },
      
  },
    
);
  const DrawerNavigation = StackNavigator({
    DrawerStack: { 
      screen: HomeScreen, 
      navigationOptions: (props) => ({
      title: 'Home',
      headerMode: 'none',
    }) }
   });
  
  const DrawerStack = DrawerNavigator({
    Home: {
      screen: DrawerNavigation ,
      navigationOptions: {
        drawerLabel: 'Home'
      },
    }
  });






const PrimaryNav = StackNavigator(
    {
        loginStack: { screen: LoginStack },
        drawerStack: { screen: DrawerStack }
        
    },
    {
        headerMode: 'none',
        title: 'Main',
        initialRouteName: 'loginStack'
    }
);

export default PrimaryNav
  