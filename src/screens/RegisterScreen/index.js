import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { useSafeArea } from 'react-native-safe-area-context';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [terapeutizando, setTerapeutizando] = useState(false);
    const [gestor, setGestor] = useState(false);
    const [psicologo, setPsicologo] = useState(false);
    const [meuPsicologo, setMeuPsicologo] = useState(0);
    const [crp, setCrp] = useState('');

    const [temPsicologo, setTemPsicologo] = useState(false);

    const [photo, setPhoto] = useState({});

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState(new Date());
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [minhaAbordagem, setMinhaAbordagem] = useState('');

    const list = [
        {id: 1, 'nome': 'Tiago Assunção'},
        {id: 2, 'nome': 'Paulo Henrique'},
        {id: 4, 'nome': 'Erica Ribeiro'}
    ]

    const abordagem = [
        {id: 1, 'nome': 'TCC'},
        {id: 2, 'nome': 'Comportamental'}
    ]

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fazer cadastro'
        });
    }, []);

    useEffect(()=>{
        if(!temPsicologo){
            setMeuPsicologo(0);
        }
    }, [temPsicologo]);

    useEffect(()=>{
        setTemPsicologo();
    }, [gestor, psicologo]);

    const handleAddPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280
        }, (response) => {
            if(!response.didCancel) {
                setPhoto(response);
            }
        });
    }

   

    const selectTipoUsuario = (item) => {
        if(item == '1'){
            setTerapeutizando(true);
            setGestor(false);
            setPsicologo(false);
        }else if(item == '2'){
            setTerapeutizando(false);
            setGestor(true);
            setPsicologo(false);
        }else{
            setTerapeutizando(false);
            setGestor(false);
            setPsicologo(true);
        }
    }

    const handleRegisterButton = async () => {
        alert('Servidor em manutenção!');
        exit;
        if(name && email && cpf && password && passwordConfirm) {
            let result = await api.register(name, email, cpf, password, passwordConfirm);
            if(result.error === '') {
                dispatch({type: 'setToken', payload: {token: result.token}});
                dispatch({type: 'setUser', payload: {user: result.user}});

                navigation.reset({
                    index: 1,
                    routes:[{name: 'ChoosePropertyScreen'}]
                });
            } else {
                alert(result.error);
            }
        } else {
            alert("Preencha os campos");
        }
    }

    return (
        <C.Container>
            <C.PhotoArea>
                {!photo.uri &&
                    <C.ButtonAreaFoto onPress={handleAddPhoto}>
                        <C.ButtonTextFoto>Tirar uma foto</C.ButtonTextFoto>
                    </C.ButtonAreaFoto>
                }
                {photo.uri &&
                    <>
                        <C.ButtonAreaFotoImage onPress={handleAddPhoto}>
                        <C.PhotoItem source={{uri: photo.uri}} resizeMode="cover" />
                        </C.ButtonAreaFotoImage>
                        <C.ButtonTextFoto style={{color: '#3795d2'}}>Aperte na imagem para tirar outra foto</C.ButtonTextFoto>
                        
                            
                    </>
                }
            </C.PhotoArea>
            <C.CheckBoxArea>
                <CheckBox
                title='Terapeutizando'
                checked={terapeutizando}
                onPress={()=>selectTipoUsuario('1')}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 160}}
                />
                <CheckBox
                title='Gestor'
                checked={gestor}
                onPress={()=>selectTipoUsuario('2')}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 90}}
                />

                <CheckBox
                title='Psicólogo'
                checked={psicologo}
                onPress={()=>selectTipoUsuario('3')}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 118}}
                />
            </C.CheckBoxArea>
            <C.Field
                placeholder="Digite seu Nome Completo"
                value={name}
                onChangeText={t=>setName(t)}
            />
            <C.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={t=>setEmail(t)}
            />
            <C.Field
                placeholder="Telefone"
                value={telefone}
                onChangeText={t=>setTelefone(t)}
            />
            <C.Field
                placeholder="CEP"
                value={cep}
                onChangeText={t=>setCep(t)}
            />
            <C.Field
                placeholder="Endereço"
                value={endereco}
                onChangeText={t=>setEndereco(t)}
            />
            {psicologo && 
               <C.Field
               placeholder="CRP"
               value={crp}
               onChangeText={t=>setCrp(t)}
           /> 
            }

            {psicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMinhaAbordagem(itemValue)}
                >
                    <C.Picker.Item label="Selecione uma Abordagem" value="Selecione uma Abordagem" />
                
                    {abordagem.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            }
            
            <C.NascimentoBox>
                <C.NascimentoBoxTitle>Data de Nascimento</C.NascimentoBoxTitle>
                <DatePicker
                    style={{width: 200}}
                    date={nascimento}
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancelar"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 210,
                        top: 12,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginTop: 18
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setNascimento(date)}
                />
            </C.NascimentoBox>
            <C.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />
            <C.Field
                placeholder="Digite sua Senha novamente"
                secureTextEntry={true}
                value={passwordConfirm}
                onChangeText={t=>setPasswordConfirm(t)}
            />

            {terapeutizando && 
                <CheckBox
                    title='Já tem um Psicólogo?'
                    checked={temPsicologo}
                    onPress={()=>setTemPsicologo(!temPsicologo)}
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0, width: 220}}
                />
            }
            
           
            {temPsicologo && 
                <C.Picker 
                onValueChange={(itemValue, itemIndex) => setMeuPsicologo(itemValue)}
                >
                    <C.Picker.Item label="Selecione um Psicólogo" value="Selecione um Psicólogo" />
                
                    {list.map((item, index) => (  
                        <C.Picker.Item key={index} label={item.nome} value={item.id} />
                    ))}  
                
                    
                    
                </C.Picker>
            }
            

            <C.ButtonArea style={{marginBottom: 50}} onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR-SE</C.ButtonText>
            </C.ButtonArea>
        </C.Container>
    );
}