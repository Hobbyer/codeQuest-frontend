// Expo Go 환경용 저장소 어댑터
// AsyncStorage 사용 (MMKV, Keychain 대체)

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ExpoAdapter {
  // ===== 보안 저장소 (AsyncStorage로 대체) =====
  
  async setSecure(key, data) {
    try {
      const secureKey = `secure_${key}`;
      await AsyncStorage.setItem(secureKey, JSON.stringify(data));
    } catch (error) {
      console.error(`Expo 보안 저장 실패: ${key}`, error);
      throw error;
    }
  }

  async getSecure(key) {
    try {
      const secureKey = `secure_${key}`;
      const data = await AsyncStorage.getItem(secureKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Expo 보안 조회 실패: ${key}`, error);
      return null;
    }
  }

  async removeSecure(key) {
    try {
      const secureKey = `secure_${key}`;
      await AsyncStorage.removeItem(secureKey);
    } catch (error) {
      console.error(`Expo 보안 삭제 실패: ${key}`, error);
    }
  }

  // ===== 일반 저장소 (AsyncStorage) =====
  
  async setData(key, value) {
    try {
      const processedValue = typeof value === 'object' 
        ? JSON.stringify(value) 
        : value;
      
      await AsyncStorage.setItem(key, processedValue);
    } catch (error) {
      console.error(`Expo 저장 실패: ${key}`, error);
    }
  }

  async getData(key, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return defaultValue;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`Expo 조회 실패: ${key}`, error);
      return defaultValue;
    }
  }

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Expo 삭제 실패: ${key}`, error);
    }
  }
}