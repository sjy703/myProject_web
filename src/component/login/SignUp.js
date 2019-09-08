import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CustomButton from '../custom/CustomButton';
import { useValidator } from '../../common/util/validation/useValidator';
import { useCallback, useState, useRef } from 'react';
import axiosUtil from '../../common/util/axios/axiosUtil';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
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
  Radio,
  ListItem,
  Right,
  Left,
} from 'native-base';

const SignUp = () => {
  const radio_props = [
    { label: '남', value: 'MALE' },
    { label: '여', value: 'FEMALE' },
  ];

  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [userId, setUserId] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('MALE');
  const [birthDate, setBirthDate] = useState(new Date());

  const [userIdError, setUserIdError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [heightError, setHeightError] = useState(null);
  const [weightError, setWeightError] = useState(null);
  // const [genderError, setGenderError] = useState(null);
  const [passwordSubmittable, setPasswordSubmittable] = useState(false);
  const [userIdSubmittable, setUserIdSubmittable] = useState(false);
  const [heightSubmittable, setHeightSubmittable] = useState(false);
  const [weightSubmittable, setWeightSubmittable] = useState(false);
  // const [genderSubmittable, setGenderSubmittable] = useState(null);

  const passwordValidator = useValidator(
    [passwordError, setPasswordError],
    [passwordSubmittable, setPasswordSubmittable],
    ['require', 'length'],
    {
      length: 8,
    },
    '8자리 이상 입력해 주세요.',
  );

  const userIdValidator = useValidator(
    [userIdError, setUserIdError],
    [userIdSubmittable, setUserIdSubmittable],
    ['require', 'length'],
    {
      length: 5,
    },
  );

  const heightValidator = useValidator(
    [heightError, setHeightError],
    [heightSubmittable, setHeightSubmittable],
    ['require'],
    {},
  );

  const weightValidator = useValidator(
    [weightError, setWeightError],
    [weightSubmittable, setWeightSubmittable],
    ['require'],
    {},
  );

  const checkPasswordConfirm = () => {
    if (password !== passwordConfirm) {
      return false;
    }
    return true;
  };

  const onPress = useCallback(() => {
    if (!checkPasswordConfirm) {
      alert('비밀번호와 비밀번호 확인 값이 다릅니다.');
    } else if (
      userIdSubmittable &&
      passwordSubmittable &&
      heightSubmittable &&
      weightSubmittable
    ) {
      axiosUtil
        .post(
          'http://27.119.123.49:8080/signup',
          {
            userId,
            password,
            height,
            weight,
            birthDate,
            gender,
          },
          {},
        )
        .then(response => {
          if (response === true) {
            alert('회원가입이 완료 되었습니다.');
            Actions.pop();
          }
        });
    } else {
      alert('정보를 올바르게 입력해 주세요.');
    }
  }, [userId, password, passwordConfirm, height, weight, birthDate, gender]);

  return (
    <Container>
      <Header>
        <Body>
          <Title>회원가입</Title>
        </Body>
      </Header>
      <Content style={{ padding: 10 }}>
        <Form>
          <Item floatingLabel>
            <Label>아이디</Label>
            <Input
              onChangeText={userIdValidator}
              onChange={e => setUserId(e.nativeEvent.text)}
            />
          </Item>
          <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
            {userIdError}
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
          <Item floatingLabel>
            <Label>비밀번호 확인</Label>
            <Input
              secureTextEntry={true}
              onChange={e => setPasswordConfirm(e.nativeEvent.text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>키</Label>
            <Input
              onChangeText={heightValidator}
              onChange={e => setHeight(e.nativeEvent.text)}
            />
          </Item>
          <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
            {heightError}
          </Text>
          <Item floatingLabel>
            <Label>몸무게</Label>
            <Input
              onChangeText={weightValidator}
              onChange={e => setWeight(e.nativeEvent.text)}
            />
          </Item>
          <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
            {weightError}
          </Text>
        </Form>
        <Text
          style={{ fontSize: 18, paddingTop: 15, paddingBottom: 20, width: 80 }}
        >
          생년월일
        </Text>
        <DatePicker
          style={{ width: 200 }}
          date={birthDate}
          mode="date"
          androidMode="spinner"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="확인"
          cancelBtnText="취소"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              borderColor: '#aaa',
              width: '70%',
              height: 35,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              marginBottom: 20,
            },
          }}
          onDateChange={date => setBirthDate(date)}
        />
        <Text style={{ fontSize: 18, paddingTop: 15, width: 60 }}>성별</Text>
        <ListItem>
          <Left>
            <Text>남</Text>
          </Left>
          <Right>
            <Radio
              color={'#f0ad4e'}
              selectedColor={'#5cb85c'}
              selected={gender === 'MALE'}
              onPress={() => {
                setGender('MALE');
              }}
            />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>여</Text>
          </Left>
          <Right>
            <Radio
              color={'#f0ad4e'}
              selectedColor={'#5cb85c'}
              selected={gender === 'FEMALE'}
              onPress={() => {
                setGender('FEMALE');
              }}
            />
          </Right>
        </ListItem>
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

export default SignUp;
