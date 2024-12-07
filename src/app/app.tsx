"use client";
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../lib/redux/store';
import { socket } from '../components/socket/socket';

const App = ({ children }: { children: React.ReactNode }) => {
    const store: AppStore = makeStore();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }
        console.log("HELLO THIS IS RUNNING")
        socket.on('connect ', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, [])
    return (
        <Provider store={store}>
            <div className='h-[calc(100vh-80px)] flex justify-center'>
                {children}
            </div>
        </Provider>
    );
}

export default App;

