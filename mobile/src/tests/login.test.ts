import { renderRouter, screen, userEvent } from 'expo-router/testing-library';
import { login } from '@/actions/auth/login';
import Login from '@/app/login';
import Home from '@/app/(app)';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { postApi } from '@/actions/api/post';
import { setToken } from '@/actions/auth/token';
import { fetchUser } from '@/actions/auth/user';

describe('Login Flow Test Suite', () => {
    const mockCredentials = {
        email: 'test@example.com',
        password: 'password',
        device_name: `${Platform.OS} ${Platform.Version}`
    }

    const mockToken = { token: 'mock-token' };

    beforeEach(() => {
        jest.clearAllMocks();
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
        it('should call the login action with the correct data when the form is submitted', async() => {
            // arrange
            const user = userEvent.setup();
            jest.spyOn(
                    require('@/actions/auth/login'), 
                    login.name
                )
                .mockImplementation(() => Promise.resolve());
            // act
            await user.type(screen.getByPlaceholderText('Enter your email'), mockCredentials.email);
            await user.type(screen.getByPlaceholderText('Enter your password'), mockCredentials.password);
            await user.press(screen.getByText('Login'));
            // assert
            expect(login).toHaveBeenCalledTimes(1);
            expect(login).toHaveBeenCalledWith(mockCredentials);
        });
    
        test('when calling the login action, a POST request must be made to the backend passing the data correctly', async() => {
            // arrange
            // mock postApi
            jest.spyOn(
                    require('@/actions/api/post'),
                    postApi.name
                )
                .mockResolvedValue(mockToken);

            // mock setToken
            jest.spyOn(
                    require('@/actions/auth/token/setToken'),
                    setToken.name,
                )
                .mockResolvedValue(null);
                
            // mock fetchUser
            jest.spyOn(
                    require('@/actions/auth/user/fetch'),
                    fetchUser.name
                )
                .mockResolvedValue(null);
    
            // act
            await login(mockCredentials);
    
            // assert
            expect(postApi).toHaveBeenCalledWith(
                '/api/login',
                { body: JSON.stringify(mockCredentials) }
            );
        });
    
        it('should receive and store the token returned by the backend', async() => {
            // arrange
            // mock postApi
            jest.spyOn(
                    require('@/actions/api/post'),
                    postApi.name
                )
                .mockResolvedValue(mockToken);
    
            // mock setToken
            jest.spyOn(
                    require('@/actions/auth/token/setToken'),
                    setToken.name,
                );

            // mock fetchUser
            jest.spyOn(
                    require('@/actions/auth/user/fetch'),
                    fetchUser.name
                )
                .mockResolvedValue(null);

            jest.spyOn(
                    SecureStore,
                    'setItemAsync'
                )
                .mockResolvedValue(Promise.resolve());
        
            global.localStorage = {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
                key: jest.fn(),
                length: 0
            };
    
            // act
            await login(mockCredentials);
    
            // assert
            expect(setToken).toHaveBeenCalledWith(mockToken.token);
            if (Platform.OS === 'web') {
                expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken.token);
            } else {
                expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', mockToken.token);
            }
        });
    
        it('should send a request to receive and store the logged in user data', async() => {
            // arrange
            // mock postApi
            jest.spyOn(
                    require('@/actions/api/post'),
                    postApi.name
                )
                .mockResolvedValue(mockToken);
    
            // mock setToken
            jest.spyOn(
                    require('@/actions/auth/token/setToken'),
                    setToken.name,
                )
                .mockResolvedValue(null);

            // mock fetchUser
            jest.spyOn(
                    require('@/actions/auth/user/fetch'),
                    fetchUser.name
                )
                .mockResolvedValue(null);
    
            // act
            await login(mockCredentials);
    
            // assert
            expect(fetchUser).toHaveBeenCalledTimes(1);
        });
    
        it('should redirect the user to the home page', async() => {
            // arrange
            const user = userEvent.setup();
            jest.spyOn(
                require('@/actions/auth/login'), 
                login.name
            )
            .mockImplementation(() => Promise.resolve());
           
            // act
            await user.type(screen.getByPlaceholderText('Enter your email'), mockCredentials.email);
            await user.type(screen.getByPlaceholderText('Enter your password'), mockCredentials.password);
            await user.press(screen.getByText('Login'));
    
            // assert
            expect(screen).toHavePathname('/(app)');
        });
    });
});