"use client";
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../lib/redux/store';

import Listener from './listener';
const App = ({ children }: { children: React.ReactNode }) => {
    const store: AppStore = makeStore();

    return (
        <Provider store={store}>
            <Listener>
                {children}
            </Listener>
        </Provider>
    );
}

export default App;

