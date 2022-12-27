import React from 'react';
import IdeaPlatform from "./containers/IdeaPlatform";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <Provider store={store}>
            <IdeaPlatform />
        </Provider>
    );
}

export default App;
