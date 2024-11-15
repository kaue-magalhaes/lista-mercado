import { renderRouter, screen, userEvent } from 'expo-router/testing-library';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Login from '@/app/login';
import Home from '@/app/(app)';

import { login } from '@/actions/auth/login';
import { postApi } from '@/actions/api/post';
import { setToken } from '@/actions/auth/token/setToken';
import { fetchUser } from '@/actions/auth/user/fetch';

describe('Login Flow Test Suite', () => {
    const mockCredentials = {
        email: 'test@example.com',
        password: 'password',
        device_name: `${Platform.OS} ${Platform.Version}`,
    };

    const mockToken = { token: 'mock-token' };

    const mockLogin = (isImplementationTest: boolean) => {
        if (isImplementationTest) {
            return jest.spyOn(require('@/actions/auth/login'), login.name);
        }
        return jest.spyOn(require('@/actions/auth/login'), login.name).mockResolvedValue(null);
    }

    const mockPostApi = (isImplementationTest: boolean) => {
        if (isImplementationTest) {
            return jest.spyOn(require('@/actions/api/post'), postApi.name);
        }
        return jest.spyOn(require('@/actions/api/post'), postApi.name).mockResolvedValue(mockToken);
    }

    const mockSetToken = (isImplementationTest: boolean) => {
        if (isImplementationTest) {
            return jest.spyOn(require('@/actions/auth/token/setToken'), setToken.name);
        }
        return jest.spyOn(require('@/actions/auth/token/setToken'), setToken.name).mockResolvedValue(null);
    }

    const mockFetchUser = (isImplementationTest: boolean) => {
        if (isImplementationTest) {
            return jest.spyOn(require('@/actions/auth/user/fetch'), fetchUser.name);
        }
        return jest.spyOn(require('@/actions/auth/user/fetch'), fetchUser.name).mockResolvedValue(null);
    }

    const mockSecureStore = () => {
        jest.spyOn(SecureStore, 'setItemAsync').mockResolvedValue(Promise.resolve());
    }

    const mockLocalStorage = () => {
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
            key: jest.fn(),
            length: 0,
        };
    }

    const fillAndSubmitLoginForm = async (user: UserEventInstance) => {
        await user.type(screen.getByPlaceholderText('Enter your email'), mockCredentials.email);
        await user.type(screen.getByPlaceholderText('Enter your password'), mockCredentials.password);
        await user.press(screen.getByText('Login'));
    };

    beforeEach(() => {
        // Limpa todos os mocks
        jest.clearAllMocks();

        // Mocka as rotas
        renderRouter(
            { login: Login, '/(app)/': Home },
            { initialUrl: '/login' }
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('UI Render', () => {
        it('should render correctly', () => {
            expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
            expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
            expect(screen.getByText('Login')).toBeTruthy();

            expect(screen).toHavePathname('/login');
        });
    });

    describe('Login Action', () => {
        it('should call the login action with the correct data when the form is submitted', async () => {
            const user = userEvent.setup();
            const login = mockLogin(false);

            await fillAndSubmitLoginForm(user);

            expect(login).toHaveBeenCalledTimes(1);
            expect(login).toHaveBeenCalledWith(mockCredentials);
        });

        it('should send a POST request with the correct data', async () => {
            mockPostApi(false);
            mockSetToken(false);
            mockFetchUser(false);
            
            await login(mockCredentials);

            expect(postApi).toHaveBeenCalledWith('/api/login', { body: JSON.stringify(mockCredentials) });
        });

        it('should store the token returned by the backend', async () => {
            mockPostApi(false);
            mockSetToken(true);
            mockFetchUser(false);
            mockSecureStore();
            mockLocalStorage();

            await login(mockCredentials);

            expect(setToken).toHaveBeenCalledWith(mockToken.token);
            if (Platform.OS === 'web') {
                expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken.token);
            } else {
                expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', mockToken.token);
            }
        });

        it('should fetch and store the logged-in user data', async () => {
            mockPostApi(false);
            mockSetToken(false);
            mockFetchUser(false);
            await login(mockCredentials);

            expect(fetchUser).toHaveBeenCalledTimes(1);
        });

        it('should redirect the user to the home page after login', async () => {
            const user = userEvent.setup();
            mockLogin(false);

            await fillAndSubmitLoginForm(user);

            expect(screen).toHavePathname('/(app)');
        });
    });
});
//aldair junior