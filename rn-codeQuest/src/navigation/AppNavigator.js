import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  // AuthContext에서 상태 가져오기
  const { isAuthenticated, isLoading } = useAuth();

  // 1. 로딩 중 (토큰 체크 중)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. 로그인 상태에 따른 완전히 분리된 네비게이터
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // 로그인 상태 - 앱 화면들만 접근 가능
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* 추후 추가 화면들 (설정, 내 정보 수정 등) */}
        </>
      ) : (
        // 비로그인 상태 - 인증 화면들만 접근 가능
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ title: '로그인' }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ title: '회원가입' }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})