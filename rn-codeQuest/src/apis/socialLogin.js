/**
 * 소셜 로그인 API (초급자용 - 간결 버전)
 */

// 프론트엔드: "Google로 로그인" 버튼 클릭
//    ↓
// Google SDK: Google 로그인 창 팝업
//    ↓
// 사용자: Google 계정으로 로그인
//    ↓
// Google 서버: 프론트에 Access Token 전달 ← 여기서 받는 건 Google 토큰
//    ↓
// 프론트엔드: Google Access Token을 백엔드로 보냄
//    ↓
// 백엔드: Google에 "이 토큰 진짜야?" 확인
//    ↓
// 백엔드: 사용자 정보 확인 → 우리 DB에 저장/조회
//    ↓
// 백엔드: 우리 앱의 JWT 토큰 생성해서 프론트로 반환 ← 이게 우리 토큰
//    ↓
// 프론트엔드: JWT 토큰 저장 → 로그인 완료

import api from './api';
import { DeviceInfoService } from '../services/DeviceInfo';

// ===================================
// Google 로그인
// ===================================
export const loginWithGoogle = async (googleToken) => {
  console.log('Google 로그인 시작');
  try {
    // 1. 디바이스 정보 가져오기
    const device = await DeviceInfoService.getDeviceInfo();

    // 2. 백엔드에 요청 보내기
    const response = await api.post('/auth/social/login/', {
      provider: 'google',
      access_token: googleToken,
      device_id: device?.deviceId,
      device_name: device?.deviceName,
    });

    // 3. 성공했으면 데이터 반환
    if (response.access && response.user) {
      return {
        success: true,
        accessToken: response.access,
        refreshToken: response.refresh,
        user: response.user,
      };
    }

    // 4. 실패
    return { success: false, error: '로그인 실패' };

  } catch (error) {
    console.error('Google 로그인 에러:', error.message);
    return { success: false, error: error.message };
  }
};

// ===================================
// Kakao 로그인
// ===================================
export const loginWithKakao = async (kakaoToken) => {
  console.log('Kakao 로그인 시작');

  try {
    const device = await DeviceInfoService.getDeviceInfo();

    const response = await api.post('/auth/social/login/', {
      provider: 'kakao',
      access_token: kakaoToken,
      device_id: device?.deviceId,
      device_name: device?.deviceName,
    });

    if (response.access && response.user) {
      return {
        success: true,
        accessToken: response.access,
        refreshToken: response.refresh,
        user: response.user,
      };
    }

    return { success: false, error: '로그인 실패' };

  } catch (error) {
    console.error('💥 Kakao 로그인 에러:', error.message);
    return { success: false, error: error.message };
  }
};

// ===================================
// Naver 로그인
// ===================================
export const loginWithNaver = async (naverToken) => {
  console.log('Naver 로그인 시작');

  try {
    const device = await DeviceInfoService.getDeviceInfo();

    const response = await api.post('/auth/social/login/', {
      provider: 'naver',
      access_token: naverToken,
      device_id: device?.deviceId,
      device_name: device?.deviceName,
    });

    if (response.access && response.user) {
      return {
        success: true,
        accessToken: response.access,
        refreshToken: response.refresh,
        user: response.user,
      };
    }

    return { success: false, error: '로그인 실패' };

  } catch (error) {
    console.error('💥 Naver 로그인 에러:', error.message);
    return { success: false, error: error.message };
  }
};

// ===================================
// Apple 로그인 (나중에 추가)
// ===================================
export const loginWithApple = async (appleToken) => {
  console.log('Apple 로그인 시작');

  try {
    const device = await DeviceInfoService.getDeviceInfo();

    const response = await api.post('/auth/social/login/', {
      provider: 'apple',
      access_token: appleToken,
      device_id: device?.deviceId,
      device_name: device?.deviceName,
    });

    if (response.access && response.user) {
      return {
        success: true,
        accessToken: response.access,
        refreshToken: response.refresh,
        user: response.user,
      };
    }

    return { success: false, error: '로그인 실패' };

  } catch (error) {
    console.error('💥 Apple 로그인 에러:', error.message);
    return { success: false, error: error.message };
  }
};