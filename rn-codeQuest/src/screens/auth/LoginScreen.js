import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Button, Card, TextInput, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext.js'
import { useState } from 'react';
import { Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// OAuth 완료 후 브라우저 자동 닫기 설정
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { login, socialLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ===================================
  // Google OAuth 설정 (Expo Go용)
  // ===================================

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });

  // 디버깅: 실제 request 정보 출력
  useEffect(() => {
    if (request) {
      console.log('✅ Google OAuth 준비 완료');
      console.log('   Client ID:', request.clientId);
      console.log('   Redirect URI:', request.redirectUri);
      console.log('   Request URL:', request.url);
    }
  }, [request]);

  // ===================================
  // Google 로그인 응답 처리
  // ===================================
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

  // 일반 로그인
  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // 홈탭으로 자동 이동
      navigation.navigate('Home');
    } else {
      console.log('아이디와 비밀번호를 확인하세요.');
      Alert.alert('실패', '아이디와 비밀번호를 확인하세요.');
    }
  };

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

  // Kakao, Naver 로그인 (나중에 구현)
  const handleSocialLogin = async (provider) => {
    Alert.alert('준비 중', `${provider} 로그인은 다음 단계에서 구현할게요!`);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Card.Title title="로그인" />
        <Card.Content>
          {/* 이메일/비밀번호 입력 */}
          <TextInput
            label="email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            label="비밀번호"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
          
          {/* 일반 로그인 버튼 */}
          <Button
            mode="contained" 
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            로그인
          </Button>

          {/* 구분선 */}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>또는</Text>
            <Divider style={styles.divider} />
          </View>

          {/* 소셜 로그인 버튼들 */}
          <Text style={styles.socialTitle}>소셜 로그인</Text>

          {/* Google 버튼 */}
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => promptAsync()} // Google OAuth 팝업 열기
            disabled={isLoading || !request} // request 준비 안 되면 비활성화
          >
            <Text style={styles.socialButtonText}>🔵 Google로 로그인</Text>
          </TouchableOpacity>

          {/* Kakao 버튼 */}
          <TouchableOpacity
            style={[styles.socialButton, styles.kakaoButton]}
            onPress={() => handleSocialLogin('Kakao')}
            disabled={isLoading}
          >
            <Text style={[styles.socialButtonText, styles.kakaoText]}>💬 Kakao로 로그인</Text>
          </TouchableOpacity>

          {/* Naver 버튼 */}
          <TouchableOpacity
            style={[styles.socialButton, styles.naverButton]}
            onPress={() => handleSocialLogin('Naver')}
            disabled={isLoading}
          >
            <Text style={styles.socialButtonText}>🟢 Naver로 로그인</Text>
          </TouchableOpacity>

          {/* 회원가입 링크 */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>아직 계정이 없으신가요? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};


export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  // 구분선 스타일
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  // 소셜 로그인 제목
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  // 소셜 버튼 공통 스타일
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Google 버튼
  googleButton: {
    backgroundColor: '#4285F4',
  },
  // Kakao 버튼
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoText: {
    color: '#3C1E1E', // Kakao는 노란 배경에 검정 글씨
  },
  // Naver 버튼
  naverButton: {
    backgroundColor: '#03C75A',
  },
  // 회원가입 링크
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '600',
  },
});