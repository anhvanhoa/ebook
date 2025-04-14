'use client';
import React from 'react';

export type UserContext = {
    user: {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
    setUser: React.Dispatch<React.SetStateAction<UserContext['user']>>;
};

export type UserApp = UserContext['user'];

export const userDefault: UserContext['user'] = {
    id: '',
    name: '',
    email: '',
    avatarUrl: ''
};

export const UserContext = React.createContext<UserContext | null>(null);

const UserProvider = ({
    children,
    init
}: {
    children: React.ReactNode;
    init?: Partial<UserContext['user'] | null>;
}) => {
    const [user, setUser] = React.useState<UserContext['user']>(() => {
        if (init)
            return {
                ...userDefault,
                ...init
            };
        return userDefault;
    });
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export default UserProvider;

export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
export const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return {
        ...context.user,
        isLoggedIn: !!context.user.id
    };
};
export const useSetUser = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useSetUser must be used within a UserProvider');
    }
    return context.setUser;
};

export const useLogin = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useLogin must be used within a UserProvider');
    }
    return (user: UserContext['user']) => {
        context.setUser(user);
    };
};
export const useLogout = () => {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error('useLogout must be used within a UserProvider');
    }
    return () => {
        context.setUser(userDefault);
    };
};
