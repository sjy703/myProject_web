import { Provider } from 'react-redux';
import store from '../../common/store';
import CustomButton from '../../component/custom/CustomButton';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default function MainActivity() {
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.title}>
        <Text style={{ fontSize: 20 }}>식단관리</Text>
      </View>
      <View style={styles.content}></View>
      <View style={styles.footer}>
        <CustomButton
          buttonColor={'#023e71'}
          title={'로그인'}
          onPress={Actions.login}
        />
        <CustomButton
          buttonColor={'#023e71'}
          title={'회원가입'}
          onPress={Actions.signUp}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: '20%',
  },
});
