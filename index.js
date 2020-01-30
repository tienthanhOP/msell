if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Splash from './components/Splash';

AppRegistry.registerComponent(appName, () => Splash);