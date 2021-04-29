import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = async () => {
        if(cpf && password) {
            let result = await api.login(cpf, password);
            if(result.error === '') {
                dispatch({type: 'setToken', payload: {token: result.token}});
                dispatch({type: 'setUser', payload: {user: result.user}});

                await AsyncStorage.setItem('property', JSON.stringify({"id": 87, "name": "APT 860"}));

                

                navigation.reset({
                    index: 1,
                    routes:[{name: 'MainDrawer'}]
                });
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha os campos");
        }
    }

    const handleRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <C.Container>
            <C.Box>
                <C.BoxFix>
                    {/* <C.Logo
                        source={require('../../assets/undraw_home.png')}
                        resizeMode="contain"
                    /> */}
                    <C.Info1>Bem Vindo(a)!</C.Info1>

                    <C.Field
                        placeholder="Digite seu CPF"
                        keyboardType="numeric"
                        placeholderTextColor='white'
                        value={cpf}
                        onChangeText={t=>setCpf(t)}
                    />
                    <C.Field
                        placeholder="Digite sua Senha"
                        secureTextEntry={true}
                        placeholderTextColor='white'

                        value={password}
                        onChangeText={t=>setPassword(t)}
                    />

                    <C.ButtonArea onPress={handleLoginButton}>
                        <C.ButtonText>ENTRAR</C.ButtonText>
                    </C.ButtonArea>

                    {/* <C.ButtonArea onPress={handleRegisterButton}>
                        <C.ButtonText>CADASTRAR-SE</C.ButtonText>
                    </C.ButtonArea> */}
                    <C.InfoBox onPress={handleRegisterButton}>
                        <C.Info2>Ainda não se registrou? </C.Info2><C.Info2Subli>Clique aqui</C.Info2Subli>
                    </C.InfoBox>
                </C.BoxFix>
            </C.Box>
            <C.LogoContainer>
            <C.Logo
                    source={require('../../assets/iconeclinica.png')}
                    resizeMode="contain"
                    width={50}
                />
                </C.LogoContainer>
        </C.Container>
    );
}