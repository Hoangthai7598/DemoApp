/**
 * @format
 */

if (__DEV__) {
    import('./app/config/ReactotronConfig').then(() =>
        console.log('Reactotron Configured')
    )
}
import App from './App'
import { name as appName } from './app.json'
import { AppRegistry } from 'react-native'
AppRegistry.registerComponent(appName, () => App)
