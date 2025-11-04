// 모바일 환경용 보안 저장소 어댑터
// Keychain : 민감한 정보 저장에 사용
// MMKV    : 일반 정보 저장에 사용

let Keychain, MMKV, storage;

try {
  Keychain = require('react-native-keychain');
} catch (error) {
  console.warn('Keychain 모듈 없음');
}

try {
  const MMKVModule = require('react-native-mmkv');
  MMKV = MMKVModule.MMKV;
  storage = new MMKV();
  console.log('✅ MMKV 인스턴스 생성 성공');
} catch (error) {
  // Expo Go 환경에서는 MMKV 사용 불가 (NitroModules 미지원)
  console.log('📱 Expo Go 환경: MMKV 사용 불가 - 이는 정상적인 동작입니다');
}

export default class MobileAdapter {
  // ===== 보안 저장소 =====
  
  async setSecure(key, data) {
    if (!Keychain) {  // undefined 체크
      throw new Error('Keychain을 사용할 수 없습니다');
    }
    
    await Keychain.setInternetCredentials(key, 'data', JSON.stringify(data));
  }

  async getSecure(key) {
    if (!Keychain) return null;  // 안전한 처리
    
    try {
      const credentials = await Keychain.getInternetCredentials(key);
      return credentials ? JSON.parse(credentials.password) : null;

    } catch (error) {
      console.error(`Keychain 조회 실패: ${key}`, error);
      return null;
    }
  }

  async removeSecure(key) {
    if (!Keychain) return;
    
    try {
      await Keychain.resetInternetCredentials(key);
    } catch (error) {
      console.error(`Keychain 삭제 실패: ${key}`, error);
    }
  }

  // ===== 일반 저장소 =====
  
  setData(key, value) {
    if (!storage) {
      // Expo Go 환경에서는 MMKV 사용 불가 - 이는 정상
      return;
    }
    
    try {
      const processedValue = typeof value === 'object' 
        ? JSON.stringify(value) 
        : String(value);
      
      storage.set(key, processedValue);
    } catch (error) {
      console.error(`MMKV 저장 실패: ${key}`, error);
    }
  }

  getData(key, defaultValue = null) {
    if (!storage) return defaultValue;  // ✅ MMKV storage 인스턴스 체크
    
    try {
      const value = storage.getString(key);
      if (value === undefined || value === null) return defaultValue;

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }

    } catch (error) {
      console.error(`MMKV 조회 실패: ${key}`, error);
      return defaultValue;
    }
  }

  removeData(key) {
    if (!storage) return;
    
    try {
      storage.delete(key);
    } catch (error) {
      console.error(`MMKV 삭제 실패: ${key}`, error);
    }
  }
}