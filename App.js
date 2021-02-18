import React from 'react'
import NavigationStack  from './src/Navigation/NavigationStack'
import {Provider} from 'react-redux'
import store from './src/Redux/store'

const App = () => {
    return(
      <Provider store = {store}>
        <NavigationStack  />
      </Provider>
    );
};

export default App 