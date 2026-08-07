import styled from "styled-components/native";
import { View, Text, Image, TouchableOpacity, TextInput, Picker} from 'react-native'
import Constants from 'expo-constants'

const StatusBarHeight = Constants.statusBarHeight;

// colors
/*
const Colors = {
    primary: '#708C37',
    secondary: '#A574D5',
    tertiary: '#ffffff',
    text: '#000',
    background: 'EFEBF9',
}
*/

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    lightGrey: '#d3d3d3',
    brand: '#6D28D9',
    back: '#EFEBF9',
    green: '#10B981',
    red: '#EF4444',
    black: '#000'
};

const { black, lightGrey, back, primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 5px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${back};
    padding-bottom: 10px;

    ${(props) => props.welcome && `
        padding-bottom: 40px;
    `}

    ${(props) => props.home && `
        margin-top: 0px;
        padding-top: 0px;
     `}
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled.View`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 130px;
    resize-mode: contain;


    ${(props) => props.search && `
        width: 200px;
        height: 100px;
        resize-mode: contain;
    `}
`;

export const HeaderImage = styled.Image`
    margin-bottom: 20px;
    
    ${(props) => props.readlist && `
        width: 500px;
        height: 170px;
        margin-bottom: 100px;
    `}
`;

export const BookCoverImage = styled.Image`
    width: 250px;
    height: 350px;
    resize-mode: contain;

    ${(props) => props.readlist && `
        width: 60px;
        height: 100px;
        margin-left: 10px;
    `}
`;

export const ScreenImage = styled.Image`
    width: 400px;
    height: 400px;
    margin: auto;
    border-radious: 50px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}


    ${(props) => props.profile && `
        margin-bottom: 10px;
        font-weight: normal;
    `}

    ${(props) => props.author && `
        text-align: center;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    flex: 1;
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    border-color: ${primary};
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};

    ${(props) => props.about && `
        height: 120px;
    `}
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
    margin-top: 30px;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 17px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 35px;
    top:18px;
    position: absolute;
    z-index: 1;

    ${(props) => props.filter == true && `
        top: 20px;
        right: 20px;
        `}

    ${(props) => props.search == true && `
        top: 100px;
        right: 20px;
        `}
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 65px;
    margin-vertical: 15px;
    height: 60px;

    ${(props) => props.wide == true && `
        width: 300px;
        `}

    ${(props) => props.about && `
        width: 90px;
        margin: 20px;
    `}

`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
    ${(props) => props.google == true && `
        padding: 20px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
        justify-content: center;
        flex-direction: row;
        align-items: center;
        padding: 10px;

        
`;

export const ExtraText = styled.Text`
        justify-content: center;
        align-content: center;
        color: ${tertiary};
        font-size: 15px;
        margin: 10px;

        ${(props) => props.bookDesc == true && `
            font-size: 18px;
            lineHeight: 24px;
            letterSpacing: 0.5px;
            text-align: justify;
            padding-horizontal: 15px;
            shadow-color: '#000';
            shadow-offset: {width: 0px; height: 2px;};
            shadow-opacity: 0.2;
            shadow-radius: 5px;
        `}

        ${(props) => props.readlist && `
            margin: 0px;
        `}
`;

export const TextLink = styled.TouchableOpacity`
        justify-content: center;
        align-items: center;
`;

export const TextLinkContent = styled.Text`
        color: ${brand};
        font-size: 15px;
        padding-left: 20px;
`;

export const SearchBar = styled.TextInput`
        height: 60px;
        border-color: '#A574D5';
        border-width: 1px;
        width: '100%';
        padding-horizontal: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        background-color: '#fff';
        font-size: 15px;

        ${(props) => props.search == true && `
            font-size: 20px;
        `}
`;

export const ReviewBox = styled.TouchableOpacity`
    background-color: #fff;            
    padding: 16px;                    
    margin: 8px 0;                    
    border-radius: 8px;                
    shadow-color: #000;               
    shadow-offset: 0px 2px;            
    shadow-opacity: 0.1;               
    shadow-radius: 4px;             
    border-width: 2px;
    border-color: ${brand};
`;

export const ReviewText = styled.Text`
    font-size: 19px;
    color: ${tertiary};
    margin-bottom: 6px;

    ${(props) => props.date == true && `
        font-size: 12px;
        color: #aaa;
        text-align: right;
        margin-top: 0px;
    `}
`;

export const BookText = styled.Text`
        font-size: 18px;
        font-weight: 800;

`;

export const AuthorText = styled.Text`
    font-size: 14px;
    color: ${tertiary};

    ${(props) => props.italic == true && `
        font-style: italic;
    `}
`

export const ModalContainer = styled.View`
        flex: 1;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
`

export const ModalInnerContainer = styled.View`
        width: 80%;
        background-color: ${primary};
        border-radius: 10px;
        padding: 20px;
`

export const SectionTitle = styled.Text`
        font-size: 16px;
        font-weight: bold;
        margin-top: 15px;
`

export const FilterOption = styled.TouchableOpacity`
        padding: 10px;
        background-color: ${lightGrey};
        border-radius: 5px;
        flex: 1;
        margin-horizontal: 5px;

    ${(props) => props.chosen == true && `
        background-color: ${brand};
    `}
`

export const FilterText = styled.Text`
    text-align: center;
    color: ${black};
    ${(props) => props.chosen == true && `
        color: ${primary};
    `} 
`

export const BookContainer = styled.TouchableOpacity`
        flex-direction: row;
        background-color: ${primary};
        margin-bottom: 12px;
        border-radius: 8px;
        overflow: hidden;
        shadow-color: #000;
        shadow-offset: {width: 0px; height: 1px;};
        shadow-opacity: 0.1;
        shadow-radius: 3px;
        elevation: 2;
`

export const BookInfo = styled.View`
        flex: 1;
        padding: 8px;
        justify-content: center;
`

export const DeleteIcon = styled.TouchableOpacity`
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: ${primary};
        border-radius: 12px;
        padding: 4px;
        z-index: 1;
`

export const FlexRowContainer = styled.View`
        flex-direction: row;
`
// New container for the home screen that overrides existing styles
export const HomeScreenContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 10}px;
  padding-bottom: 0px; /* Prevent extra bottom padding */
  background-color: ${back};
  padding-left: 10px;
  padding-right: 10px;
`;

// New header style for the home screen
export const HomeScreenHeader = styled.View`
  padding: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

// Add a book container that overrides existing margin-bottom to prevent extra space
export const HomeBookContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${primary};
  margin-bottom: 0px; /* Ensure no extra bottom margin */
  padding: 10px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: { width: 0px; height: 1px };
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

// Home book image size for home screen (adjust as needed)
export const HomeBookCoverImage = styled.Image`
  width: 100px;
  height: 150px;
  resize-mode: contain;
  margin-right: 10px;
`;

// Adjust home book info with no extra padding
export const HomeBookInfo = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 10px;
`;

// Home screen title (if needed for home page)
export const HomePageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  margin-bottom: 20px;
`;

// Button styles for the home screen (if applicable)
export const HomeButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 65px;
  margin-top: 20px;
  height: 60px;
  width: 200px;
`;

export const HomeButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`;

const RefreshButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #007BFF; /* Primary color */
    align-items: center;
    justify-content: center;
    shadow-color: #000;
    shadow-offset: { width: 0, height: 2 };
    shadow-opacity: 0.25;
    shadow-radius: 3.84px;
    elevation: 5;
`;