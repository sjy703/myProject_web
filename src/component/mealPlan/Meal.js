import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNutrient, removeCalories } from '../../reducer/meal/state';
import axiosUtil from '../../common/util/axios/axiosUtil';
import CustomButton from '../custom/CustomButton';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
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

function Meal(props) {
  const meal = useSelector(state => state.meal).meal;
  const [remark, setRemark] = useState(meal.remark);
  const [removeList, setRemoveList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [createTime, setCreateTime] = useState(meal.createTime);

  const prevCreateTime = useRef(meal.createTime);
  const prevRemark = useRef(meal.remark);

  let nutrientList = null;
  const dispatch = useDispatch();
  const changeUpdateFlag = props.changeUpdateFlag;

  nutrientList = meal.nutrient.map(mealInfo => {
    return (
      <ListItem key={mealInfo.id || mealInfo.newId} style={styles.list}>
        <Body>
          <Text style={{ width: '80%', fontSize: 12 }}>
            {mealInfo.foodName}
          </Text>
          <Text
            note
            style={styles.memoFont}
          >{`칼로리: ${mealInfo.calorie}   탄수화물: ${mealInfo.carbohydrate}   단백질: ${mealInfo.protein}   지방: ${mealInfo.fat}`}</Text>
        </Body>
        <Right>
          <Icon name="close-circle" onPress={() => deleteItem(mealInfo)} />
        </Right>
      </ListItem>
      // </View>
    );
  });

  const onPress = () => {
    Actions.nutrient({
      date: meal.createDate,
      mealCategory: meal.mealCategory,
      addList,
      setAddList,
    });
  };

  const onSubmit = () => {
    const url = 'http://27.119.123.49:8080/meal/plan';
    meal.remark = remark;
    meal.removeList = removeList;
    const body = {
      ...meal,
      createTime,
      remark,
      removeList,
    };

    const updateFlag =
      removeList.length > 0 ||
      addList.length > 0 ||
      prevCreateTime.current !== createTime ||
      prevRemark !== remark;
    if (updateFlag) {
      changeUpdateFlag();
      if (props.new) {
        axiosUtil
          .post(url, body)
          .then(() => {
            Actions.pop();
          })
          .catch(err => {
            alert(err.message);
          });
      } else {
        axiosUtil
          .put(url, body)
          .then(() => {
            Actions.pop();
          })
          .catch(err => {
            alert(err.message);
          });
      }
    } else {
      Actions.pop();
    }
  };

  const deleteItem = meal => {
    dispatch(removeCalories(meal));
    if (meal.id) {
      setRemoveList([...removeList, meal.id]);
      dispatch(removeNutrient(meal.id));
    } else {
      dispatch(removeNutrient(meal.newId));
      const index = addList.findIndex(list => list === meal.newId);
      const newAddList = [...addList];
      newAddList.splice(index, 1);
      setAddList([...newAddList]);
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>{meal.mealCategory}</Title>
        </Body>
      </Header>
      <Content style={{ padding: 10, width: '100%' }}>
        <Grid>
          <Col>
            <DatePicker
              style={{ paddingTop: 10, width: 100, paddingLeft: 10 }}
              date={createTime}
              mode="time"
              androidMode="spinner"
              placeholder="select"
              format="HH:mm:ss"
              confirmBtnText="확인"
              cancelBtnText="취소"
              is24Hour={true}
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
              onDateChange={createTime => setCreateTime(createTime)}
            />
            <ListItem>
              <Left>
                <Text style={styles.textFont}>총 칼로리</Text>
              </Left>
              <Right>
                <Text style={styles.textFont}>{meal.totalCalories}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.textFont}>총 단백질</Text>
              </Left>
              <Right>
                <Text style={styles.textFont}>{meal.totalProtein}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.textFont}>총 탄수화물</Text>
              </Left>
              <Right>
                <Text style={styles.textFont}>{meal.totalCarbohydrate}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.textFont}>총 지방</Text>
              </Left>
              <Right>
                <Text style={styles.textFont}>{meal.totalFat}</Text>
              </Right>
            </ListItem>
            <Form style={{ padding: 10 }}>
              <Text style={styles.textFont}>특이사항</Text>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="특이사항"
                onChangeText={text => setRemark(text)}
                value={remark}
              />
            </Form>
            <List>{nutrientList}</List>
          </Col>
        </Grid>
      </Content>
      <Footer>
        <FooterTab style={{ backgroundColor: '#FFF' }}>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={onPress}
          >
            <Text style={styles.textFont}>생성</Text>
          </Button>
          <Button
            bordered
            style={{ paddingLeft: 0, paddingRight: 0 }}
            onPress={onSubmit}
          >
            <Text style={styles.textFont}>완료</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
const styles = StyleSheet.create({
  textFont: {
    fontSize: 13,
  },
  buttonFont: {
    fontSize: 13,
  },
  button: {
    height: 20,
  },
  memoFont: {
    fontSize: 11,
  },
  list: {
    height: 40,
  },
});
export default Meal;
