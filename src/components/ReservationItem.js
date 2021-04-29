import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


const Box = styled.TouchableOpacity`
    background-color: #FFF;
    flex-direction: row;
    border-width: 2px;
    border-color: #E8E9ED;
    border-radius: 15px;
    margin-bottom: 15px;
    padding-bottom: 10px;
`;
const BoxItens = styled.View`
`;
const CoverImage = styled.Image`
    background-color: #fff;
    height: 100px;
    width: 100px;
    border-radius: 15px;
`;
const Title = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
    margin: 10px;
`;
const DateText = styled.Text`
    font-size: 13px;
    font-weight: bold;
    color: #9C9DB9;
    margin: 0 10px;
    text-transform: uppercase;
`;
const DateItem = styled.Text`
    font-size: 15px;
    color: #000;
    margin: 0 10px;
`;

export default ({data}) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('ReservationAddScreen', {data});
    }

    return (
        <Box onPress={handleClick}>
           
            <CoverImage source={require('../assets/avatardemo.png')} resizeMode="cover" />
            
            <BoxItens>
            <Title> ( Nome do Psicólogo ) </Title>
            <DateText>Horários de atendimento:</DateText>
            {data.dates.map((item, index)=>(
                <DateItem key={index}>{item}</DateItem>
            ))}
             </BoxItens>
        </Box>
    );
}