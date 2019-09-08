import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CustomButton from '../custom/CustomButton';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNutrient,
  addCalories,
  removeCalories,
} from '../../reducer/meal/state';
import axiosUtil from '../../common/util/axios/axiosUtil';
import { Actions } from 'react-native-router-flux';
import dateFormat from 'dateformat';
import { useValidator } from '../../common/util/validation/useValidator';
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
  Grid,
  Col,
  Row,
  ListItem,
  Left,
  Right,
  Icon,
  Textarea,
  List,
} from 'native-base';

function Nutrient(props) {
  const [calorie, setCalorie] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [protein, setProtein] = useState(0);
  const [foodName, setFoodName] = useState(0);

  const [calorieError, setCalorieError] = useState(null);
  const [calorieSubmittable, setCalorieSubmittable] = useState(false);
  const [fatError, setFatError] = useState(null);
  const [fatSubmittable, setFatSubmittable] = useState(false);
  const [carbohydrateError, setCarbohydrateError] = useState(null);
  const [carbohydrateSubmittable, setCarbohydrateSubmittable] = useState(false);
  const [proteinError, setProteinError] = useState(null);
  const [proteinSubmittable, setProteinSubmittable] = useState(false);
  const [foodNameError, setFoodNameError] = useState(null);
  const [foodNameSubmittable, setFoodNameSubmittable] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user).user.userId;

  const foodNameValidator = useValidator(
    [foodNameError, setFoodNameError],
    [foodNameSubmittable, setFoodNameSubmittable],
    ['require'],
    {},
  );
  const calorieValidator = useValidator(
    [calorieError, setCalorieError],
    [calorieSubmittable, setCalorieSubmittable],
    ['require', 'regex'],
    {
      pattern: /\d*\.?\d+/,
    },
    '입력 양식이 맞지 않습니다.',
  );
  const carbohydrateValidator = useValidator(
    [carbohydrateError, setCarbohydrateError],
    [carbohydrateSubmittable, setCarbohydrateSubmittable],
    ['require', 'regex'],
    {
      pattern: /\d*\.?\d+/,
    },
    '입력 양식이 맞지 않습니다.',
  );
  const fatValidator = useValidator(
    [fatError, setFatError],
    [fatSubmittable, setFatSubmittable],
    ['require', 'regex'],
    {
      pattern: /\d*\.?\d+/,
    },
    '입력 양식이 맞지 않습니다.',
  );
  const proteinValidator = useValidator(
    [proteinError, setProteinError],
    [proteinSubmittable, setProteinSubmittable],
    ['require', 'regex'],
    {
      pattern: /\d*\.?\d+/,
    },
    '입력 양식이 맞지 않습니다.',
  );

  onPress = () => {
    if (
      proteinSubmittable &&
      fatSubmittable &&
      carbohydrateSubmittable &&
      calorieSubmittable &&
      foodNameSubmittable
    ) {
      const body = {
        foodName,
        calorie,
        fat,
        carbohydrate,
        protein,
        userId,
        createDate: dateFormat(props.date, 'yyyy-mm-dd'),
        mealCategory: props.mealCategory,
        newId: dateFormat(new Date(), 'isoTime'),
      };
      dispatch(addNutrient(body));
      dispatch(addCalories(body));
      props.setAddList([...props.addList, body.newId]);
      Actions.pop();
    } else {
      alert('정보를 올바르게 입력해 주세요.');
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>영양 성분</Title>
        </Body>
      </Header>
      <Content style={{ padding: 10, width: '100%' }}>
        <Form>
          <View>
            <Item stackedLabel style={{}}>
              <Label>음식명</Label>
              <Input
                onChange={e => setFoodName(e.nativeEvent.text)}
                onChangeText={foodNameValidator}
              />
            </Item>
            <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
              {foodNameError}
            </Text>
          </View>
          <View>
            <Item stackedLabel>
              <Label>칼로리</Label>
              <Input
                onChange={e => setCalorie(parseFloat(e.nativeEvent.text))}
                onChangeText={calorieValidator}
              />
            </Item>
            <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
              {calorieError}
            </Text>
          </View>
          <View>
            <Item stackedLabel>
              <Label>탄수화물</Label>
              <Input
                onChange={e => setCarbohydrate(parseFloat(e.nativeEvent.text))}
                onChangeText={carbohydrateValidator}
              />
            </Item>
            <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
              {carbohydrateError}
            </Text>
          </View>
          <View>
            <Item stackedLabel>
              <Label>단백질</Label>
              <Input
                onChange={e => setProtein(parseFloat(e.nativeEvent.text))}
                onChangeText={proteinValidator}
              />
            </Item>
            <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
              {proteinError}
            </Text>
          </View>
          <View>
            <Item stackedLabel>
              <Label>지방</Label>
              <Input
                onChange={e => setFat(parseFloat(e.nativeEvent.text))}
                onChangeText={fatValidator}
              />
            </Item>
            <Text style={{ fontSize: 15, color: 'red', paddingLeft: 10 }}>
              {fatError}
            </Text>
          </View>
        </Form>
        <FooterTab style={{ backgroundColor: '#FFF', marginBottom: 15 }}>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={() => Actions.pop()}
          >
            <Text style={styles.textFont}>취소</Text>
          </Button>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={onPress}
          >
            <Text style={styles.textFont}>생성</Text>
          </Button>
        </FooterTab>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  font: {
    fontSize: 15,
  },
  item: {
    paddingBottom: 10,
  },
});

export default Nutrient;
