import React from 'react';
import { ScrollView } from 'react-native';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledButton,
    ButtonText,
    WelcomeContainer,
    ScreenImage,
} from '../../components/styles';

const Welcome = ({navigation}) => {
    const handlePress = () => {
        navigation.navigate('Login');
    }

    return (
        <ScrollView>
            <StyledContainer welcome={true}>
                    <InnerContainer>
                        <PageLogo testID="PageLogo" source={require('../../assets/images/PlotLogo.png')}/>
                        <PageTitle welcome={true}>Welcome to PlotLine</PageTitle>
                        <SubTitle>Insert Witty Subtitle</SubTitle>

                        <WelcomeContainer>
                                <ScreenImage testID="ScreenImage" source={require('../../assets/images/books.png')}/>
                                <StyledButton wide={true} onPress={handlePress}>
                                    <ButtonText>Get Started</ButtonText>
                                </StyledButton>                            
                        </WelcomeContainer>
                    </InnerContainer>
            </StyledContainer>
        </ScrollView>
    );
}

export default Welcome;