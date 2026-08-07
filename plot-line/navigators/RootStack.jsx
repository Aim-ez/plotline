import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CredentialsContext } from '../components/CredentialsContext';

// screens
import Login from '../app/screens/Login';
import Signup from '../app/screens/Signup';
import Welcome from '../app/screens/Welcome';
import TabLayout from '../app/(tabs)/_layout';
import UserReviews from '../app/screens/UserReviews';
import OthersReviews from '../app/screens/OthersReviews';
import BookDetails from '../app/screens/BookDetails';
import ReviewGoogleBook from '../app/screens/ReviewGoogleBook';
import ReviewPlotlineBook from '../app/screens/ReviewPlotlineBook';
import PlotlineBookReviews from '../app/screens/PlotlineBookReviews';
import GoogleBookReviews from '../app/screens/GoogleBookReviews';
import AddManualBook from '../app/screens/addManualBook';
import OthersProfile from '../app/screens/OthersProfile';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <CredentialsContext.Consumer> 
            {({ storedCredentials }) => (
                <NavigationContainer independent={true}>
                    <Stack.Navigator                
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName="Welcome"
                    >
                    {storedCredentials ? 
                        <>
                            <Stack.Screen name="TabLayout" component={TabLayout}/>
                            <Stack.Screen name="UserReviews" component={UserReviews} options={{title: 'Back to Profile', headerShown: true}}/>
                            <Stack.Screen name="OthersReviews" component={OthersReviews} options={{title: 'Back to Home', headerShown: true}}/>
                            <Stack.Screen name="PlotlineBookReviews" component={PlotlineBookReviews} options={{title: '', headerShown: true}}/>
                            <Stack.Screen name="GoogleBookReviews" component={GoogleBookReviews} options={{title: '', headerShown: true}}/>
                            <Stack.Screen name="ReviewGoogleBook" component={ReviewGoogleBook} options={{title: 'Back to Search', headerShown: true}}/>
                            <Stack.Screen name="ReviewPlotlineBook" component={ReviewPlotlineBook} options={{title: '', headerShown: true}}/>
                            <Stack.Screen name="OthersProfile" component={OthersProfile} options={{title: '', headerShown: true}}/>

                            <Stack.Screen 
                                    name="BookDetails" 
                                    component={BookDetails} 
                                    options={{
                                        headerShown: true, // Show header for BookDetails
                                        title: '', // Optional: Set header title
                                        headerBackTitleVisible: false, // Optional: Hide back title
                                    }} 
                                />
                            <Stack.Screen
                                name="addManualBook"
                                component={AddManualBook}
                                options={{
                                    headerShown: true, // Show header for BookDetails
                                    title: '', // Optional: Set header title
                                    headerBackTitleVisible: false, // Optional: Hide back title
                                }} 
                            />
                        </>
                        : 
                        <>
                            <Stack.Screen name="Welcome" component={Welcome}/>
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                        </>
                    }
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    );
}

export default RootStack;