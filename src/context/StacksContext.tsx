import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface StacksContextValue {
    userSession: UserSession;
    authenticate: () => void;
    userData: any;
}

const StacksContext = createContext<StacksContextValue | undefined>(undefined);

export const StacksProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    const userSession = new UserSession({ appConfig });
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then(userData => {
                setUserData(userData);
            });
        } else if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    const authenticate = () => {
        showConnect({
            appDetails: {
                name: 'Clarity xBTC Send Plus',
                icon: window.location.origin + '/vite.svg',
            },
            redirectTo: '/',
            onFinish: () => {
                setUserData(userSession.loadUserData());
            },
            userSession,
        });
    };

    return (
        <StacksContext.Provider value={{ userSession, authenticate, userData }}>
            {children}
        </StacksContext.Provider>
    );
};

export const useStacks = () => {
    const context = useContext(StacksContext);
    if (context === undefined) {
        throw new Error('useStacks must be used within a StacksProvider');
    }
    return context;
};