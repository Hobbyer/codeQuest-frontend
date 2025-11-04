# Google OAuth 설정 가이드 (Web + iOS + Android)

## 🎯 목표
React Native 앱에서 Google 소셜 로그인을 사용하기 위해 **3개의 클라이언트 ID**를 발급받습니다.

## ⚠️ 중요: 네이티브 빌드 권장!

### 실제 작동 환경

| 환경 | 작동 여부 | 이유 |
|------|----------|------|
| **Web 브라우저** | ✅ 완벽 작동 | localhost redirect URI 지원 |
| **Expo Go (Android)** | ❌ 작동 안 됨 | redirect URI가 `exp://192.168.0.24:8081` (IP 주소) 형태로 생성되어 Google이 거부 |
| **Expo Go (iOS)** | ❌ 작동 안 됨 | 동일한 문제 |
| **네이티브 빌드** | ✅ 완벽 작동 | 올바른 redirect URI 사용 |

> 💡 **권장**: 웹에서 먼저 테스트하고, 모바일은 **네이티브 빌드**로 테스트하세요!
> 
> ```powershell
> npx expo run:android  # Android 네이티브 빌드
> npx expo run:ios      # iOS 네이티브 빌드
> ```

### 왜 3개가 필요한가?
- **Web Client ID**: 웹 브라우저에서 실행할 때
- **iOS Client ID**: iOS 네이티브 빌드에서 실행할 때
- **Android Client ID**: Android 네이티브 빌드에서 실행할 때

---

## 📝 Step 1: Google Cloud Console 접속

1. **Google Cloud Console** 접속
   - 주소: https://console.cloud.google.com/
   - Google 계정으로 로그인

2. **프로젝트 선택 또는 생성**
   - 상단의 프로젝트 드롭다운 클릭
   - "새 프로젝트" 클릭
   - 프로젝트 이름: `CodeQuest` (원하는 이름 입력)
   - "만들기" 클릭

---

## 🔐 Step 2: OAuth 동의 화면 설정

클라이언트 ID를 만들기 전에 **OAuth 동의 화면**을 먼저 설정해야 합니다!

### 2-1. OAuth 동의 화면으로 이동
1. 왼쪽 메뉴 → "API 및 서비스" → "OAuth 동의 화면" 클릭
2. **처음 방문 시**:
   - "User Type" 선택 화면이 나오면 → ✅ **외부(External)** 선택
   - "만들기" 또는 "구성" 버튼 클릭
   - 이미 설정되어 있다면 바로 앱 정보 입력 화면이 나옵니다

### 2-2. 앱 정보 입력
다음 정보를 입력하세요:

| 항목 | 입력 내용 |
|------|----------|
| 앱 이름 | `CodeQuest` |
| 사용자 지원 이메일 | (본인 Gmail 주소) |
| 앱 로고 | (선택사항, 나중에 추가 가능) |
| 앱 도메인 | (선택사항, 나중에 추가) |
| 개발자 연락처 정보 | (본인 Gmail 주소) |

### 2-3. 범위(Scopes) 설정
1. "범위 추가 또는 삭제" 클릭
2. 다음 범위 선택:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
3. "업데이트" → "저장 후 계속" 클릭

### 2-4. 테스트 사용자 추가 (개발 단계에서 필요)
1. "테스트 사용자" 섹션에서 "ADD USERS" 클릭
2. 개발에 사용할 Gmail 주소 입력
3. "저장 후 계속" 클릭

### 2-5. 요약 확인
- 모든 정보 확인 후 "대시보드로 돌아가기" 클릭

---

## 🔑 Step 3: 클라이언트 ID 3개 생성

이제 **3개의 클라이언트 ID**를 생성합니다!

### 3-1. 사용자 인증 정보 페이지로 이동
1. 왼쪽 메뉴 → "API 및 서비스" → "사용자 인증 정보" 클릭
2. 상단의 "+ 사용자 인증 정보 만들기" 클릭
3. "OAuth 클라이언트 ID" 선택

---

### 3-2. Web Client ID 생성 (1/3)

**애플리케이션 유형**: `웹 애플리케이션` 선택

**이름**: `CodeQuest Web Client`

**승인된 자바스크립트 원본**:
```
https://auth.expo.io
```

**승인된 리디렉션 URI**:
```
https://auth.expo.io/@YOUR_EXPO_USERNAME/rn-codeQuest
```
> ⚠️ `YOUR_EXPO_USERNAME`을 본인의 Expo 계정 이름으로 교체하세요!
> 
> Expo 계정이 없다면:
> - 터미널에서 `npx expo whoami` 실행
> - 로그인 안 되어 있으면 `npx expo login` 실행

**"만들기" 클릭** → 생성된 클라이언트 ID 복사 (나중에 사용)

---

### 3-3. iOS Client ID 생성 (2/3)

다시 "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID" 클릭

**애플리케이션 유형**: `iOS` 선택

**이름**: `CodeQuest iOS Client`

**번들 ID**:
```
com.yourcompany.rncodequest
```
> ⚠️ 나중에 `app.json`의 `ios.bundleIdentifier`와 **정확히 일치**해야 합니다!
> 
> 권장: `com.{본인이름}.codequest` 형식 (예: `com.hobbyer.codequest`)

**"만들기" 클릭** → 생성된 클라이언트 ID 복사

---

### 3-4. Android Client ID 생성 (3/3)

다시 "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID" 클릭

**애플리케이션 유형**: `Android` 선택

**이름**: `CodeQuest Android Client`

**패키지 이름**:
```
com.yourcompany.rncodequest
```
> ⚠️ 나중에 `app.json`의 `android.package`와 **정확히 일치**해야 합니다!
> 
> 권장: `com.{본인이름}.codequest` 형식

**SHA-1 인증서 지문** (개발용):

Expo 개발 환경에서는 다음 값을 사용하세요:
```
E9:63:7E:89:B5:4E:B4:58:F7:29:D4:65:61:5F:3F:F1:5C:7B:62:8D
```
> 💡 이것은 Expo의 기본 개발 인증서 지문입니다.
> 실제 배포 시에는 본인의 Keystore 지문으로 교체해야 합니다!

**"만들기" 클릭** → 생성된 클라이언트 ID 복사

---

## ✅ Step 4: 코드에 클라이언트 ID 적용

3개의 클라이언트 ID를 모두 받았다면, `LoginScreen.js`에 입력하세요!

### 파일 위치
```
src/screens/auth/LoginScreen.js
```

### 수정할 부분
```javascript
const [request, response, promptAsync] = Google.useAuthRequest({
  webClientId: '여기에_Web_Client_ID_붙여넣기',
  iosClientId: '여기에_iOS_Client_ID_붙여넣기',
  androidClientId: '여기에_Android_Client_ID_붙여넣기',
});
```
---

## 🧪 Step 5: 테스트하기

### 5-1. Expo Go에서 테스트 (Web Client ID 사용)
```powershell
npm start
```
- QR 코드 스캔 또는 Android Emulator/iOS Simulator 실행
- 로그인 화면에서 "Google로 로그인" 버튼 클릭
- Google 계정 선택 → 로그인 성공 확인

### 5-2. 문제 해결
**에러 발생 시 확인 사항**:

1. ❌ `redirect_uri_mismatch` 에러
   - Web Client ID의 **승인된 리디렉션 URI**가 정확한지 확인
   - `https://auth.expo.io/@YOUR_EXPO_USERNAME/rn-codeQuest`
   - Expo 사용자명이 정확한지 확인 (`npx expo whoami`)

2. ❌ `invalid_client` 에러
   - 클라이언트 ID를 복사할 때 공백이 포함되지 않았는지 확인
   - `.apps.googleusercontent.com`까지 전체 복사했는지 확인

3. ❌ 로그인 팝업이 안 뜨는 경우
   - `expo-auth-session`, `expo-crypto` 설치 확인
   - Metro 번들러 재시작 (`r` 입력)

---

## 📱 Step 6: app.json 설정 (나중에 필요)

실제 앱 빌드 시 `app.json`에 번들 ID와 패키지명을 추가해야 합니다.

```json
{
  "expo": {
    "name": "rn-codeQuest",
    "slug": "rn-codeQuest",
    "ios": {
      "bundleIdentifier": "com.yourcompany.rncodequest"
    },
    "android": {
      "package": "com.yourcompany.rncodequest"
    }
  }
}
```

---

## 🎉 완료!

이제 Google 소셜 로그인이 작동합니다!

### 다음 단계
- [ ] Kakao 로그인 구현
- [ ] Naver 로그인 구현
- [ ] Apple 로그인 구현 (iOS만 해당)

---

## 📚 참고 자료

- [Expo Auth Session 공식 문서](https://docs.expo.dev/guides/authentication/#google)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 설명](https://developers.google.com/identity/protocols/oauth2)

---

## 💡 OAuth 로그인 처리 로직 이해하기

### 전체 플로우 (Google 예시)

```
사용자                앱                  Google 서버          우리 백엔드
  |                  |                     |                    |
  | 1. 로그인 버튼 클릭 |                     |                    |
  |----------------->|                     |                    |
  |                  | 2. Google 로그인 요청 |                    |
  |                  |-------------------->|                    |
  |                  |                     |                    |
  |                  | 3. 로그인 화면 표시  |                    |
  |                  |<--------------------|                    |
  |                  |                     |                    |
  | 4. Google 계정 선택                     |                    |
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

#### 1️⃣ 사용자가 "Google로 로그인" 버튼 클릭
```javascript
// LoginScreen.js
<TouchableOpacity onPress={() => promptAsync()}>
  <Text>🔵 Google로 로그인</Text>
</TouchableOpacity>
```

#### 2️⃣ 앱이 Google OAuth 화면 열기
```javascript
// expo-auth-session 사용
import * as Google from 'expo-auth-session/providers/google';

const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: GOOGLE_WEB_CLIENT_ID,
  iosClientId: GOOGLE_IOS_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
});

// promptAsync() 호출 시 Google 로그인 웹뷰 열림
```

#### 3️⃣ Google 로그인 페이지 표시
- **웹**: 팝업 창으로 Google 로그인 페이지
- **모바일**: 인앱 브라우저(WebView)로 Google 로그인 페이지
- Google 계정 목록이 표시됨

#### 4️⃣ 사용자가 Google 계정 선택 및 권한 승인
- Google 계정 선택
- 앱이 요청하는 권한(이메일, 프로필) 확인 및 승인

#### 5️⃣ Google이 Access Token 발급
```javascript
// Google 로그인 성공 시 받는 정보
{
  type: 'success',
  authentication: {
    accessToken: "ya29.a0AfH6SMB...",  // Google Access Token
    refreshToken: "1//0e...",           // Google Refresh Token
    expiresIn: 3599,                    // 만료 시간 (초)
    tokenType: "Bearer"
  }
}
```

#### 6️⃣ 앱이 Access Token을 우리 백엔드로 전송
```javascript
// src/apis/socialLogin.js
export const loginWithGoogle = async (googleAccessToken) => {
  const deviceInfo = await DeviceInfoService.getDeviceInfo();
  
  const response = await api.post('/auth/social/login/', {
    provider: 'google',
    access_token: googleAccessToken,  // Google에서 받은 토큰
    device_id: deviceInfo.deviceId,
    device_name: deviceInfo.deviceName,
  });
  
  return response;
};
```

#### 7️⃣ 백엔드가 Google 토큰 검증 후 JWT 발급
```python
# Django 백엔드 (예시)
# 1. Google Access Token으로 사용자 정보 조회
google_user_info = requests.get(
    'https://www.googleapis.com/oauth2/v1/userinfo',
    headers={'Authorization': f'Bearer {access_token}'}
).json()

# 2. 우리 DB에서 사용자 찾기 또는 생성
user, created = User.objects.get_or_create(
    email=google_user_info['email'],
    defaults={
        'nickname': google_user_info['name'],
        'profile_image': google_user_info['picture']
    }
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
  const result = await loginWithGoogle(token);
  
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

| 구분 | Access Token (Google) | JWT Token (우리 백엔드) |
|------|----------------------|------------------------|
| 발급자 | Google 서버 | 우리 Django 백엔드 |
| 용도 | Google API 호출용 | 우리 API 호출용 |
| 유효기간 | Google이 정함 (보통 1시간) | 우리가 정함 (예: 7일) |
| 저장 위치 | 백엔드로 즉시 전송 (저장 X) | 앱에 안전하게 저장 |

#### 왜 Google 토큰을 우리 백엔드로 보내나요?

1. **보안**: 사용자가 정말 Google로 로그인했는지 백엔드에서 검증
2. **사용자 정보**: Google 토큰으로 사용자 프로필 조회
3. **통일성**: 모든 로그인 방식(일반/Google/Kakao/Naver)에 대해 동일한 JWT 토큰 사용
4. **권한 관리**: 우리 서비스의 권한을 JWT 토큰에 포함

---

### 코드로 보는 전체 흐름

```javascript
// LoginScreen.js 전체 흐름

// 1. OAuth 설정
const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
});

// 2. 응답 처리
useEffect(() => {
  if (response?.type === 'success') {
    const { authentication } = response;
    handleGoogleLogin(authentication.accessToken);
  }
}, [response]);

// 3. 백엔드로 토큰 전송
const handleGoogleLogin = async (googleAccessToken) => {
  console.log('🔑 Google Access Token 받음:', googleAccessToken);
  
  const result = await socialLogin('google', googleAccessToken);
  
  if (result.success) {
    console.log('✅ 로그인 성공!');
    // AppNavigator가 자동으로 ProfileScreen으로 전환
  }
};
```

---

### 개발 환경별 작동 여부

| 특징 | Web 브라우저 | Expo Go | 네이티브 빌드 |
|------|-------------|---------|---------------|
| Google 로그인 | ✅ 완벽 작동 | ❌ redirect URI 문제 | ✅ 완벽 작동 |
| 설정 난이도 | 쉬움 | 쉬움 | 중간 |
| 테스트 속도 | 빠름 | 빠름 | 느림 (빌드 필요) |
| Client ID | Web Client ID | Web Client ID | iOS/Android Client ID |
| redirect URI | `localhost:8081` | `exp://IP주소:8081` ❌ | 앱 scheme 사용 ✅ |

> ⚠️ **주의**: Expo Go의 redirect URI는 IP 주소 형태(`exp://192.168.0.24:8081`)로 생성되어 Google이 거부합니다.
> 
> **권장 개발 흐름**:
> 1. 웹 브라우저에서 먼저 테스트 ✅
> 2. 모바일은 네이티브 빌드로 테스트 ✅
> 3. Expo Go는 Google 로그인 제외하고 다른 기능 테스트

---

### 디버깅 팁

#### 각 단계별 로그 확인
```javascript
const handleGoogleLogin = async (googleAccessToken) => {
  console.log('1️⃣ Google 로그인 시작');
  console.log('2️⃣ Google Access Token:', googleAccessToken);
  
  const result = await socialLogin('google', googleAccessToken);
  console.log('3️⃣ 백엔드 응답:', result);
  
  if (result.success) {
    console.log('4️⃣ JWT 토큰:', result.accessToken);
    console.log('5️⃣ 사용자 정보:', result.user);
    console.log('6️⃣ 로그인 완료!');
  }
};
```

#### 자주 발생하는 에러와 해결

**1. `redirect_uri_mismatch`**
```
원인: Redirect URI가 Google Cloud Console에 등록되지 않음
해결: https://auth.expo.io/@YOUR_EXPO_USERNAME/rn-codeQuest 등록
확인: npx expo whoami로 Expo 사용자명 확인
```

**2. `invalid_client`**
```
원인: Client ID가 잘못되었거나 복사 중 공백 포함
해결: Client ID 전체(.apps.googleusercontent.com 포함) 복사
```

**3. 로그인 후 화면 전환 안 됨**
```
원인: isAuthenticated 상태가 업데이트되지 않음
해결: AuthContext의 setIsAuthenticated(true) 호출 확인
디버그: console.log로 상태 변화 추적
```

---

### 보안 모범 사례

#### 1. Client ID는 공개해도 괜찮습니다
```javascript
// ✅ OK: Client ID는 공개 정보
const clientId = "123456789-abc123.apps.googleusercontent.com";
```

#### 2. 하지만 환경 변수 사용 권장
```javascript
// ✅ 더 좋음: .env 파일 사용
const clientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
```

#### 3. Access Token은 즉시 백엔드로 전송
```javascript
// ✅ OK: 받자마자 백엔드로 전송
const { accessToken } = response.authentication;
await socialLogin('google', accessToken);

// ❌ NO: 앱에 저장하지 마세요
await Storage.set('google_token', accessToken); // 이렇게 하지 마세요!
```

#### 4. JWT Token만 안전하게 저장
```javascript
// ✅ OK: 우리 JWT 토큰만 저장
await Storage.setSecure('AUTH_TOKENS', {
  accessToken: result.accessToken,  // 우리 백엔드의 JWT
  refreshToken: result.refreshToken,
});
```

---

이제 Google OAuth의 모든 것을 이해하셨을 겁니다! 🎓
다음은 Naver와 Kakao 로그인도 같은 방식으로 구현하면 됩니다.

