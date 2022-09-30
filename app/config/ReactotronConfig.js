import ReactTron from 'reactotron-react-native'

import { reactotronRedux } from 'reactotron-redux'
import { NativeModules } from 'react-native'
import DebugConfig from './DebugConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { name } from '../../app.json'
let scriptHostname = 'localhost'

if (DebugConfig.reactotron) {
  const scriptURL = NativeModules.SourceCode.scriptURL
  scriptHostname = scriptURL?.split('://') ? scriptURL.split('://')[1].split(':')[0] : 'localhost'
}

let reactotron = ReactTron.configure({ host: scriptHostname })
  .configure(name)
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect()

export default reactotron
