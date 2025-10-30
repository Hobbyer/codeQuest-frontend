import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../../context/AuthContext';

// OAuth 완료 후 브라우저 자동 닫기 설정
WebBrowser.maybeCompleteAuthSession();

const GoogleLoginButton = ({ onSuccess, onError, disabled = false }) => {
  const { socialLogin, isLoading } = useAuth();

  // Google OAuth 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  // 디버깅: OAuth 준비 상태 출력
  useEffect(() => {
    if (request) {
      console.log('   Google OAuth 준비 완료');
      console.log('   Client ID:', request.clientId);
      console.log('   Redirect URI:', request.redirectUri);
    }
  }, [request]);

  // Google 로그인 응답 처리
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      
      // 받은 토큰으로 우리 백엔드에 로그인
      handleGoogleLogin(authentication.accessToken);

    } else if (response?.type === 'error') {
      console.error('Google 로그인 에러:', response.error);
      Alert.alert('로그인 실패', 'Google 로그인 중 오류가 발생했습니다.');
    }
  }, [response]);

  // Google 로그인 처리
  const handleGoogleLogin = async (googleAccessToken) => {
      
    const result = await socialLogin('google', googleAccessToken);
    
    if (result.success) {
      // 성공하면 AuthContext에서 자동으로 상태 업데이트됨
      navigation.navigate('Home');
    } else {
      console.error('Google 로그인 실패:', result.error);
      Alert.alert('로그인 실패', result.error || 'Google 로그인에 실패했습니다.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.googleButton, disabled && styles.disabled]}
      onPress={() => promptAsync()}
      disabled={disabled || isLoading || !request}
    >
      <Text style={styles.buttonText}>🔵 Google로 로그인</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});