import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CustomButton from '../custom/CustomButton';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useValidator } from '../../common/util/validation/useValidator';
import axiosUtil from '../../common/util/axios/axiosUtil';
import { Actions } from 'react-native-router-flux';
import { addUser } from '../../reducer/userInfo/state';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';

const LoginForm = () => {
  const [password, setPassword] = useState(null);
  const [userId, setUserId] = useState(null);

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [idSubmittable, setIdSubmittable] = useState(false);
  const [passwordSubmittable, setPasswwordSubmittable] = useState(false);

  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    if (idSubmittable && passwordSubmittable) {
      axiosUtil
        .login('http://27.119.123.49:8080/login', { userId, password })
        .then(response => {
          if (response) {
            dispatch(addUser(response));
            Actions.replace('mealSummary');
          }
        })

        .catch(err => {
          alert(err.message);
        });
    } else {
      alert('정보를 올바르게 입력해 주세요.');
    }
  }, [userId, password]);

  const passwordValidator = useValidator(
    [passwordError, setPasswordError],
    [passwordSubmittable, setPasswwordSubmittable],
    ['require', 'length'],
    {
      length: 8,
      //pattern: /^.*(?=^.{8,15}$)(?=.*d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
    },
    '8자리 이상 입력해 주세요.',
  );

  const idValidator = useValidator(
    [idError, setIdError],
    [idSubmittable, setIdSubmittable],
    ['require', 'length'],
    {
      length: 5,
    },
  );
  return (
    <Container>
      <Header>
        <Body>
          <Title>로그인</Title>
        </Body>
      </Header>
      <Content style={{ padding: 10 }}>
        <Form>
          <Item floatingLabel>
            <Label>아이디</Label>
            <Input
              onChangeText={idValidator}
              onChange={e => setUserId(e.nativeEvent.text)}
            />
          </Item>
          <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
            {idError}
          </Text>
          <Item floatingLabel>
            <Label>비밀번호</Label>
            <Input
              onChangeText={passwordValidator}
              onChange={e => setPassword(e.nativeEvent.text)}
              secureTextEntry={true}
            />
          </Item>
          <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
            {passwordError}
          </Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab style={{ backgroundColor: '#FFF' }}>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={() => Actions.pop()}
          >
            <Text style={{ fontSize: 12 }}>취소</Text>
          </Button>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={onPress}
          >
            <Text style={{ fontSize: 12 }}>확인</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default LoginForm;
