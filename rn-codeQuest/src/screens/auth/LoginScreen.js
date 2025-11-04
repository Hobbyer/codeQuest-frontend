import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, TextInput, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { Alert } from 'react-native';

// Google, Kakao 로그인 컴포넌트 import
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 일반 로그인
  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // 로그인 성공 시 이전 화면으로 돌아가기 (Home으로)
      navigation.goBack();
    } else {
      Alert.alert('로그인 실패', result.error || '아이디와 비밀번호를 확인하세요.');
    }
  };

  // Google 로그인 성공 시 콜백
  const handleGoogleSuccess = (result) => {
    // 성공 시 이전 화면으로 돌아가기
    navigation.goBack();
  };

  // Google 로그인 실패 시 콜백
  const handleGoogleError = (error) => {
    // 에러 처리 (필요하면)
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

          {/* Google 버튼 - 분리된 컴포넌트 사용 */}
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            disabled={isLoading}
          />

          {/* Kakao 버튼 - 분리된 컴포넌트 사용 */}
          <KakaoLoginButton disabled={isLoading} />

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
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
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
  naverButton: {
    backgroundColor: '#03C75A',
  },
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