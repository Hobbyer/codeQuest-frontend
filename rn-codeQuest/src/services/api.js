import axios from 'axios';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';
import { API_BASE_URL } from '../utils/constants';
import { Storage } from './storages'; // storages/index.js

// 환경별 Base URL 설정
const getBaseURL = () => {
  // 개발 환경에서만 에뮬레이터 특수 처리, 나머지는 모두 API_BASE_URL
  if (__DEV__) {
    if (Platform.OS === 'android' && Constants.isDevice === false) {
      return 'http://10.0.2.2:8000'; // Android 에뮬레이터
    }
    if (Platform.OS === 'ios' && Constants.isDevice === false) {
      return 'http://localhost:8000'; // iOS 시뮬레이터
    }
  }
  
  return API_BASE_URL; // 실제 기기, 프로덕션
};

// API 기본 설정
const baseURL = getBaseURL();

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  async (config) => {
    const token = await Storage.getSecure('AUTH_TOKENS');
    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('💥 API 응답 에러:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      // 인증 만료
      console.log('🚪 인증 만료 - 로그아웃 처리');
      Alert.alert('인증 만료', '다시 로그인해주세요.');
      Storage.clearAllData();
    }
    return Promise.reject(error);
  }
);

// 기본 API 함수들 (GET, POST, PUT, DELETE)
export const api = {
  // GET 요청
  get: (url, params = {}) => {
    return apiClient.get(url, { params });
  },

  // POST 요청
  post: (url, data = {}) => {
    return apiClient.post(url, data);
  },

  // PUT 요청
  put: (url, data = {}) => {
    return apiClient.put(url, data);
  },

  // DELETE 요청
  delete: (url) => {
    return apiClient.delete(url);
  },
};


// 예시 API 함수들
export const userAPI = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;