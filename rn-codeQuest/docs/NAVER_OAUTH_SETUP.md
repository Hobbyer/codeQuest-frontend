# Naver OAuth 설정 가이드 (Android + iOS)

## 🎯 목표
React Native 앱에서 네이버 소셜 로그인을 사용하기 위해 **애플리케이션을 등록**하고 Client ID와 Client Secret을 발급받습니다.

### 중요한 차이점
- **Google**: Expo Go에서 바로 테스트 가능 ✅
- **Kakao, Naver**: **네이티브 빌드**만 지원 ⚠️
  - Expo Go에서는 작동하지 않음
  - `expo prebuild` 후 네이티브 빌드 필요
  - `@react-native-seoul/naver-login` 라이브러리 사용

---

## 📝 Step 1: 네이버 개발자 센터 접속

### 1-1. 네이버 개발자 센터 접속
1. **네이버 개발자 센터** 접속
   - 주소: https://developers.naver.com/
   - 네이버 계정으로 로그인

2. **애플리케이션 등록**
   - 상단 메뉴 "Application" → "애플리케이션 등록" 클릭
   - 또는 https://developers.naver.com/apps/#/register 직접 접속

---

## 🔐 Step 2: 애플리케이션 정보 입력

### 2-1. 애플리케이션 이름
```
CodeQuest
```
> 💡 사용자에게 노출되는 이름입니다.

### 2-2. 사용 API 선택
- ✅ **네이버 로그인** 체크

### 2-3. 제공 정보 선택 (필수)
네이버 로그인 시 받아올 정보를 선택합니다:

- ✅ **회원이름** (필수)
- ✅ **이메일 주소** (필수)
- ✅ **프로필 사진** (선택)
- ✅ **생일** (선택)
- ✅ **연령대** (선택)

> 💡 이메일과 이름은 필수로 선택하세요. 우리 백엔드에서 사용자 정보 저장에 필요합니다.

### 2-4. 로그인 오픈 API 서비스 환경

#### 🌐 PC 웹 (웹 브라우저 테스트용)
```
서비스 URL: http://localhost:8081
네이버아이디로로그인 Callback URL: http://localhost:8081/auth/naver/callback
```

> ⚠️ PC 웹은 **웹 버전 테스트용**입니다. React Native 앱에서는 사용하지 않습니다.

#### 📱 Android 설정 (중요!)

**패키지 이름**:
```
com.anonymous.rncodequest
```
> ⚠️ `app.json`의 `android.package`와 **정확히 일치**해야 합니다!

**Download URL** (선택사항):
```
https://play.google.com/store/apps/details?id=com.anonymous.rncodequest
```
> 💡 아직 Play Store에 등록하지 않았다면 비워두어도 됩니다.

#### 🍎 iOS 설정 (중요!)

**URL Scheme**:
```
rncodequest
```
> ⚠️ `app.json`의 `scheme`과 **정확히 일치**해야 합니다!

**Bundle ID**:
```
com.anonymous.rncodequest
```
> ⚠️ `app.json`의 `ios.bundleIdentifier`와 **정확히 일치**해야 합니다!

**Download URL** (선택사항):
```
https://apps.apple.com/app/idXXXXXXXXXX
```
> 💡 아직 App Store에 등록하지 않았다면 비워두어도 됩니다.

---

## 🔑 Step 3: Client ID & Client Secret 발급

### 3-1. 등록 완료
- 모든 정보 입력 후 하단의 **"등록하기"** 버튼 클릭

### 3-2. Client ID & Client Secret 복사

등록이 완료되면 다음 정보가 표시됩니다:

```
Client ID: aBcD1234eFgH5678
Client Secret: XyZ9876WvU5432
```

> 🔒 **중요**: Client Secret은 절대 공개하면 안 됩니다!
> - Git에 커밋하지 마세요
> - `.env` 파일에 저장하고 `.gitignore`에 추가하세요

### 3-3. .env 파일에 저장

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env
EXPO_PUBLIC_NAVER_CLIENT_ID=aBcD1234eFgH5678
EXPO_PUBLIC_NAVER_CLIENT_SECRET=XyZ9876WvU5432
EXPO_PUBLIC_NAVER_APP_NAME=CodeQuest
```

> 💡 Expo에서 환경 변수를 읽으려면 `EXPO_PUBLIC_` 접두사가 필요합니다.

---

## 📦 Step 4: 네이티브 라이브러리 설치

네이버 로그인은 **네이티브 모듈**이 필요합니다.

### 4-1. 라이브러리 설치
```powershell
npm install @react-native-seoul/naver-login
```

### 4-2. Prebuild (중요!)
```powershell
npx expo prebuild
```

> ⚠️ 이 명령어는 `android/`와 `ios/` 폴더를 생성합니다.
> Expo Go에서는 작동하지 않고, **네이티브 빌드**가 필요합니다!

### 4-3. Android 추가 설정

#### `android/app/build.gradle` 수정

파일 하단에 다음 추가:
```gradle
dependencies {
    // 기존 dependencies...
    
    // Naver Login SDK
    implementation 'com.naver.nid:naveridlogin-android-sdk:5.9.1'
}
```

### 4-4. iOS 추가 설정

#### `ios/Podfile` 수정 후 설치
```powershell
cd ios
pod install
cd ..
```

---

## ✅ Step 5: app.json 설정

네이버 로그인에 필요한 설정을 `app.json`에 추가합니다.

```json
{
  "expo": {
    "name": "rn-codeQuest",
    "slug": "rn-codeQuest",
    "scheme": "rncodequest",
    "ios": {
      "bundleIdentifier": "com.anonymous.rncodequest",
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLSchemes": ["rncodequest"],
            "CFBundleURLName": "com.anonymous.rncodequest"
          }
        ],
        "LSApplicationQueriesSchemes": ["naversearchapp", "naversearchthirdlogin"]
      }
    },
    "android": {
      "package": "com.anonymous.rncodequest"
    }
  }
}
```

### 주요 설정 설명

| 설정 | 값 | 설명 |
|------|-----|------|
| `scheme` | `rncodequest` | URL Scheme (네이버 로그인 콜백용) |
| `android.package` | `com.anonymous.rncodequest` | Android 패키지명 |
| `ios.bundleIdentifier` | `com.anonymous.rncodequest` | iOS 번들 ID |
| `LSApplicationQueriesSchemes` | `naversearchapp`, `naversearchthirdlogin` | 네이버 앱 연동용 |

---

## 🧪 Step 6: 테스트하기

### 6-1. Android에서 테스트
```powershell
npx expo run:android
```

### 6-2. iOS에서 테스트
```powershell
npx expo run:ios
```

> ⚠️ **Expo Go에서는 작동하지 않습니다!**
> 반드시 네이티브 빌드로 실행해야 합니다.

### 6-3. 로그인 플로우 확인

1. 앱 실행 → 로그인 화면
2. "Naver로 로그인" 버튼 클릭
3. **네이버 앱이 설치되어 있으면**: 네이버 앱으로 전환 → 로그인
4. **네이버 앱이 없으면**: 웹 브라우저에서 네이버 로그인 페이지 열림
5. 로그인 성공 → 앱으로 돌아옴
6. 백엔드로 토큰 전송 → JWT 토큰 수신 → 로그인 완료

---

## 🐛 문제 해결

### 1️⃣ "앱 등록이 잘못되었습니다" 에러
**원인**: 패키지명/Bundle ID 불일치
**해결**:
- 네이버 개발자 센터의 패키지명 확인
- `app.json`의 `android.package` 확인
- 두 값이 **정확히 일치**하는지 확인

### 2️⃣ "네이버 앱으로 이동할 수 없습니다" (iOS)
**원인**: URL Scheme 설정 누락
**해결**:
- `app.json`의 `ios.infoPlist.LSApplicationQueriesSchemes` 확인
- `naversearchapp`, `naversearchthirdlogin` 포함되었는지 확인

### 3️⃣ "Client ID/Secret이 유효하지 않습니다"
**원인**: 환경 변수 로딩 실패
**해결**:
- `.env` 파일이 프로젝트 루트에 있는지 확인
- `EXPO_PUBLIC_` 접두사가 있는지 확인
- Metro 번들러 재시작

### 4️⃣ Expo Go에서 작동하지 않음
**원인**: 네이버 로그인은 네이티브 모듈 필요
**해결**:
- Expo Go 사용 불가 ❌
- `npx expo run:android` 또는 `npx expo run:ios` 사용 ✅

---

## 🔒 보안 주의사항

### Client Secret 관리
```bash
# ✅ 올바른 방법
.env 파일에 저장 → .gitignore에 추가 → Git 커밋 안 됨

# ❌ 잘못된 방법
코드에 직접 하드코딩 → Git에 커밋 → GitHub에 공개 → 보안 사고!
```

### .gitignore 확인
```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

---

## 📊 네이버 vs Google vs Kakao 비교

| 특징 | Google | Kakao | Naver |
|------|--------|-------|-------|
| **웹 브라우저 테스트** | ✅ | ❌ | ❌ |
| **Expo Go 지원** | ❌ (IP 주소 문제) | ❌ | ❌ |
| **네이티브 빌드 필요** | ✅ 권장 | ✅ 필수 | ✅ 필수 |
| **설정 복잡도** | 중간 | 쉬움 | 어려움 |
| **앱 설치 시 간편 로그인** | ❌ | ✅ (카카오톡) | ✅ (네이버 앱) |
| **이메일 제공** | ✅ 필수 | ⚠️ 선택 | ✅ 필수 |

> 💡 **현실적인 개발 흐름**:
> - Google: 웹에서 먼저 테스트 → 네이티브 빌드로 모바일 테스트
> - Kakao/Naver: 처음부터 네이티브 빌드 필요

---

## 🎉 완료!

이제 네이버 소셜 로그인 설정이 완료되었습니다!

### 다음 단계
1. NaverLoginButton 컴포넌트 생성
2. 네이버 로그인 API 연동
3. 백엔드 토큰 전송 로직 구현
4. 실제 디바이스에서 테스트

---

## 📚 참고 자료

- [네이버 개발자 센터](https://developers.naver.com/)
- [네이버 로그인 API 가이드](https://developers.naver.com/docs/login/api/)
- [@react-native-seoul/naver-login](https://github.com/react-native-seoul/naver-login)
- [Expo Prebuild 가이드](https://docs.expo.dev/workflow/prebuild/)

---

## 💡 OAuth 로그인 처리 로직 이해하기

### 전체 플로우 (네이버 예시)

```
사용자                앱                  네이버 서버           우리 백엔드
  |                  |                     |                    |
  | 1. 로그인 버튼 클릭 |                     |                    |
  |----------------->|                     |                    |
  |                  | 2. 네이버 로그인 요청  |                    |
  |                  |-------------------->|                    |
  |                  |                     |                    |
  |                  | 3. 로그인 화면 표시  |                    |
  |                  |<--------------------|                    |
  |                  |                     |                    |
  | 4. 네이버 ID/PW 입력                    |                    |
  |------------------------------------>|                    |
  |                  |                     |                    |
  |                  | 5. Access Token 발급 |                    |
  |                  |<--------------------|                    |
  |                  |                     |                    |
  |                  | 6. Access Token 전송 |                    |
  |                  |------------------------------------>|
  |                  |                     |                    |
  |                  |                7. JWT 토큰 발급         |
  |                  |<------------------------------------|
  |                  |                     |                    |
  | 8. 로그인 완료     |                     |                    |
  |<-----------------|                     |                    |
```

### 상세 단계별 설명

#### 1️⃣ 사용자가 "Naver로 로그인" 버튼 클릭
```javascript
// LoginScreen.js
<TouchableOpacity onPress={() => handleNaverLogin()}>
  <Text>🟢 Naver로 로그인</Text>
</TouchableOpacity>
```

#### 2️⃣ 앱이 네이버 로그인 SDK 호출
```javascript
// NaverLogin 라이브러리 사용
import NaverLogin from '@react-native-seoul/naver-login';

const handleNaverLogin = async () => {
  const result = await NaverLogin.login({
    appName: 'CodeQuest',
    consumerKey: NAVER_CLIENT_ID,
    consumerSecret: NAVER_CLIENT_SECRET,
  });
};
```

#### 3️⃣ 네이버 앱/웹 브라우저에서 로그인
- **네이버 앱 설치 O**: 네이버 앱으로 자동 전환 → 간편 로그인
- **네이버 앱 설치 X**: 웹 브라우저에서 ID/PW 입력

#### 4️⃣ 사용자가 네이버 계정으로 로그인
- 네이버 ID와 비밀번호 입력
- 또는 네이버 앱에서 생체인증으로 간편 로그인

#### 5️⃣ 네이버가 Access Token 발급
```javascript
// 네이버 로그인 성공 시 받는 정보
{
  accessToken: "AAAANv1...qCXRxLw",  // 네이버 Access Token
  refreshToken: "c8ceME...v4CkYwM",  // 네이버 Refresh Token
  expiresAt: "2024-01-01T12:00:00",  // 토큰 만료 시간
  tokenType: "Bearer"
}
```

#### 6️⃣ 앱이 Access Token을 우리 백엔드로 전송
```javascript
// src/apis/socialLogin.js
export const loginWithNaver = async (naverAccessToken) => {
  const deviceInfo = await DeviceInfoService.getDeviceInfo();
  
  const response = await api.post('/auth/social/login/', {
    provider: 'naver',
    access_token: naverAccessToken,  // 네이버에서 받은 토큰
    device_id: deviceInfo.deviceId,
    device_name: deviceInfo.deviceName,
  });
  
  return response;
};
```

#### 7️⃣ 백엔드가 네이버 토큰 검증 후 JWT 발급
```python
# Django 백엔드 (예시)
# 1. 네이버 Access Token으로 사용자 정보 조회
naver_user_info = requests.get(
    'https://openapi.naver.com/v1/nid/me',
    headers={'Authorization': f'Bearer {access_token}'}
).json()

# 2. 우리 DB에서 사용자 찾기 또는 생성
user, created = User.objects.get_or_create(
    email=naver_user_info['email'],
    defaults={'nickname': naver_user_info['name']}
)

# 3. JWT 토큰 생성
jwt_token = create_jwt_token(user)

# 4. 응답
return {
    'access': jwt_token,
    'refresh': refresh_token,
    'user': user_data
}
```

#### 8️⃣ 앱이 JWT 토큰 저장 및 로그인 완료
```javascript
// AuthContext.js
const socialLogin = async (provider, token) => {
  const result = await loginWithNaver(token);
  
  if (result.success) {
    // JWT 토큰 저장
    await Storage.setSecure('AUTH_TOKENS', {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    
    // 사용자 정보 저장
    await Storage.setUserInfo(result.user);
    
    // 상태 업데이트
    setUser(result.user);
    setIsAuthenticated(true);
  }
};
```

---

### 핵심 개념 이해

#### Access Token vs JWT Token

| 구분 | Access Token (네이버) | JWT Token (우리 백엔드) |
|------|----------------------|------------------------|
| 발급자 | 네이버 서버 | 우리 Django 백엔드 |
| 용도 | 네이버 API 호출용 | 우리 API 호출용 |
| 유효기간 | 네이버가 정함 (보통 1시간) | 우리가 정함 (예: 7일) |
| 저장 위치 | 백엔드로 즉시 전송 (저장 X) | 앱에 안전하게 저장 |

#### 왜 네이버 토큰을 우리 백엔드로 보내나요?

1. **보안**: 사용자가 정말 네이버로 로그인했는지 백엔드에서 검증
2. **사용자 정보**: 네이버 토큰으로 사용자 프로필 조회
3. **통일성**: 모든 로그인 방식(일반/Google/Kakao/Naver)에 대해 동일한 JWT 토큰 사용
4. **권한 관리**: 우리 서비스의 권한을 JWT 토큰에 포함

---

### 코드로 보는 전체 흐름

```javascript
// 1. 사용자가 버튼 클릭
const handleNaverLogin = async () => {
  try {
    // 2. 네이버 로그인 SDK 호출
    const { accessToken } = await NaverLogin.login({
      appName: 'CodeQuest',
      consumerKey: NAVER_CLIENT_ID,
      consumerSecret: NAVER_CLIENT_SECRET,
    });
    
    // 3. 네이버 Access Token을 백엔드로 전송
    const result = await socialLogin('naver', accessToken);
    
    if (result.success) {
      // 4. JWT 토큰 저장
      await Storage.setSecure('AUTH_TOKENS', {
        accessToken: result.accessToken,  // 우리 JWT 토큰
        refreshToken: result.refreshToken,
      });
      
      // 5. 사용자 정보 저장
      await Storage.setUserInfo(result.user);
      
      // 6. 로그인 상태 업데이트
      setIsAuthenticated(true);
      
      // 7. 로그인 완료!
      Alert.alert('환영합니다!', `${result.user.nickname}님`);
    }
  } catch (error) {
    Alert.alert('로그인 실패', error.message);
  }
};
```

---

### 디버깅 팁

#### 각 단계별 로그 확인
```javascript
const handleNaverLogin = async () => {
  console.log('1️⃣ 네이버 로그인 시작');
  
  const { accessToken } = await NaverLogin.login(...);
  console.log('2️⃣ 네이버 Access Token 받음:', accessToken);
  
  const result = await socialLogin('naver', accessToken);
  console.log('3️⃣ 백엔드 응답:', result);
  
  if (result.success) {
    console.log('4️⃣ JWT 토큰:', result.accessToken);
    console.log('5️⃣ 사용자 정보:', result.user);
    console.log('6️⃣ 로그인 완료!');
  }
};
```

이렇게 하면 어느 단계에서 문제가 발생하는지 쉽게 파악할 수 있습니다!
