import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CustomButton from '../custom/CustomButton';
import { useEffect, useState, useCallback, useRef } from 'react';
import axiosUtil from '../../common/util/axios/axiosUtil';
import { Actions } from 'react-native-router-flux';
import useFetch from '../../common/util/axios/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import dateFormat from 'dateformat';
import { addMeal } from '../../reducer/meal/state';
import DatePicker from 'react-native-datepicker';
import { withTheme } from 'react-native-paper';
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
} from 'native-base';

function MealSummary() {
  const user = useSelector(state => state.user).user;
  const dispatch = useDispatch();

  [date, setDate] = useState(dateFormat(new Date(), 'yyyy-mm-dd'));
  [updateFlag, setUpdateFlag] = useState(false);

  const [response, error, isLoading] = useFetch(
    `http://27.119.123.49:8080/meal/summary/day?id=${user.userId}&date=${date}`,
    [date, updateFlag],
  );

  const onPress = (meal, category) => {
    if (meal.id) {
      dispatch(addMeal(meal));
      Actions.meal({
        new: false,
        category,
        changeUpdateFlag: () => setUpdateFlag(!updateFlag),
      });
    } else {
      const newMeal = {
        mealCategory: category,
        remark: '',
        createDate: date,
        createTime: dateFormat(new Date(), 'isoTime'),
        userId: user.userId,
        totalCalories: 0,
        totalFat: 0,
        totalProtein: 0,
        totalCarbohydrate: 0,
      };
      dispatch(addMeal(newMeal));
      Actions.meal({
        new: true,
        category,
        changeUpdateFlag: () => setUpdateFlag(!updateFlag),
      });
    }
  };

  if (response) {
    let num = 0;
    noshList = response.nosh.map(nosh => {
      num++;
      return (
        <Button
          iconLeft
          rounded
          key={nosh.id}
          time={nosh.createTime}
          onPress={() => onPress(!isLoading ? nosh : null, 'NOSH')}
          style={styles.meal}
        >
          <Icon name="ice-cream" />
          <Text style={styles.buttonFont}>{`간식${num}`}</Text>
        </Button>
      );
    });

    mealList = [
      <Button
        rounded
        iconLeft
        key="BREAKFAST"
        title="아침"
        time={
          response.breakfast.createTime
            ? response.breakfast.createTime
            : dateFormat(new Date().setHours(8, 0, 0), 'HH:MM:ss')
        }
        onPress={() =>
          onPress(!isLoading ? response.breakfast : null, 'BREAKFAST')
        }
        style={styles.meal}
      >
        <Icon name="egg" />
        <Text style={styles.buttonFont}>아침</Text>
      </Button>,
      <Button
        iconLeft
        rounded
        key="LUNCH"
        title="점심"
        time={
          response.lunch.createTime
            ? response.lunch.createTime
            : dateFormat(new Date().setHours(12, 0, 0), 'HH:MM:ss')
        }
        onPress={() => onPress(!isLoading ? response.lunch : null, 'LUNCH')}
        style={styles.meal}
      >
        <Icon name="pizza" />
        <Text style={styles.buttonFont}>점심</Text>
      </Button>,
      <Button
        iconLeft
        rounded
        key="DINNER"
        title="저녁"
        time={
          response.dinner.createTime
            ? response.dinner.createTime
            : dateFormat(new Date().setHours(18, 0, 0), 'HH:MM:ss')
        }
        onPress={() => onPress(!isLoading ? response.dinner : null, 'DINNER')}
        style={styles.meal}
      >
        <Icon name="nutrition" />
        <Text style={styles.buttonFont}>저녁</Text>
      </Button>,
    ];
    mealList.push(...noshList);
    mealList.sort(function(a, b) {
      return a.props.time >= b.props.time ? 1 : -1;
    });
  }

  if (isLoading)
    return (
      <Text style={{ fontSize: 15, paddingBottom: 20, width: 60 }}>
        is Loading...
      </Text>
    );
  if (response) {
    return (
      <Container>
        <Header>
          <Body>
            <Title>식단</Title>
          </Body>
        </Header>
        <Content style={{ padding: 10, width: '100%' }}>
          <Grid>
            <Col>
              <DatePicker
                style={{ paddingTop: 10, width: 100, paddingLeft: 10 }}
                date={date}
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
                onDateChange={date => setDate(date)}
              />
              <ListItem>
                <Left>
                  <Text style={styles.textFont}>총 칼로리</Text>
                </Left>
                <Right>
                  <Text style={styles.textFont}>
                    {response && response.totalCalories}
                  </Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={styles.textFont}>총 탄수화물</Text>
                </Left>
                <Right>
                  <Text style={styles.textFont}>
                    {response && response.totalCarbohydrate}
                  </Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={styles.textFont}>총 단백질</Text>
                </Left>
                <Right>
                  <Text style={styles.textFont}>
                    {response && response.totalProtein}
                  </Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text style={styles.textFont}>총 지방</Text>
                </Left>
                <Right>
                  <Text style={styles.textFont}>
                    {response && response.totalFat}
                  </Text>
                </Right>
              </ListItem>
            </Col>
          </Grid>
          <Grid style={{ paddingTop: 20 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
              }}
            >
              {mealList}
              <Button
                rounded
                warning
                onPress={() => onPress({}, 'NOSH')}
                style={styles.meal}
              >
                <Text style={styles.buttonFont}>간식 추가</Text>
              </Button>
            </View>
          </Grid>
        </Content>
        <Footer style={{ backgroundColor: '#FFF' }}></Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  meal: {
    flexBasis: 85,
    margin: 5,
  },
  textFont: {
    fontSize: 13,
  },
  buttonFont: {
    fontSize: 13,
  },
});
export default MealSummary;
