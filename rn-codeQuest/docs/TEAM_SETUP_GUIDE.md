# 팀원 개발 환경 설정 가이드

CodeQuest React Native 앱 개발을 시작하는 팀원을 위한 설정 가이드입니다.

## 📋 사전 준비사항

### 1. 필수 소프트웨어 설치
- **Node.js** (v18 이상): https://nodejs.org/
- **Git**: https://git-scm.com/
- **Java JDK 17**: https://www.microsoft.com/openjdk (Android 빌드용)
- **Android Studio**: https://developer.android.com/studio (Android 개발용)
- **Expo CLI**: npm install -g expo-cli

### 2. Android Studio 설정 (무거움, 비추)
1. Android Studio 설치 후 SDK Manager 실행
2. Android SDK Platform-Tools 설치
3. Android 14 (API 34) SDK 설치
4. ANDROID_HOME 환경변수 설정

## 🚀 프로젝트 설정

### 1단계: 저장소 클론
```bash
git clone https://github.com/Hobbyer/codeQuest-frontend.git
cd codeQuest-frontend/rn-codeQuest
```

### 2단계: 의존성 설치
```bash
npm install
```

### 3단계: 환경변수 설정
```bash
# .env 파일을 열어서 실제 값으로 수정
# 실제 Client ID 값은 팀 리더에게 요청하세요
```

⚠️ **주의**: `.env` 파일은 절대 Git에 커밋하지 마세요!

### 4단계: Java 환경 확인
```bash
java -version
# 출력: openjdk version "17.x.x" 확인
```

## 🧪 개발 모드 실행

### Expo Go로 개발 (추천)
```bash
npm start
```
- QR 코드가 나타나면 Expo Go 앱으로 스캔
- 웹 브라우저에서 테스트: `w` 키 입력
- ⚠️ **제한사항**: Expo Go에서는 OAuth 로그인이 웹에서만 작동합니다

### Android 네이티브 빌드 (OAuth 테스트용)
```bash
npx expo run:android
```
- USB로 Android 기기 연결 필요
- 또는 Android 에뮬레이터 실행 필요
- 네이티브 빌드에서는 OAuth 로그인이 모바일에서도 작동합니다

## 📱 APK 빌드 (EAS Build)

### EAS CLI 설치
```bash
npm install -g eas-cli
```

### EAS 로그인 및 조직 권한
```bash
eas login
```
- **중요**: `@codequest-team` 조직에 초대받아야 합니다
- 팀 리더에게 Expo 계정 초대 요청

### APK 빌드
```bash
# 개발용 빌드 (Development Client)
eas build --profile development --platform android

# 테스트용 빌드 (Standalone APK)
eas build --profile preview --platform android

# 프로덕션 빌드 (Play Store 배포용)
eas build --profile production --platform android
```

빌드는 클라우드에서 진행되며 약 10분 소요됩니다.

## 🔑 OAuth 설정

### Google OAuth (웹 개발 시)
- Expo Go 또는 웹 브라우저에서 테스트 가능
- `.env` 파일의 `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` 사용

### Google/Kakao/Naver OAuth (모바일 개발 시)
- **네이티브 빌드 필수** (Expo Go 불가)
- EAS Build 또는 `npx expo run:android` 사용
- 자세한 설정은 `docs/` 폴더의 각 OAuth 가이드 참고:
  - `docs/GOOGLE_OAUTH_SETUP.md`
  - `docs/KAKAO_OAUTH_SETUP.md`
  - `docs/NAVER_OAUTH_SETUP.md`

## 📂 프로젝트 구조

```
rn-codeQuest/
├── src/
│   ├── screens/          # 화면 컴포넌트
│   ├── navigation/       # 네비게이션 설정
│   ├── context/          # React Context (AuthContext)
│   ├── services/         # API, Storage, DeviceInfo
│   ├── components/       # 재사용 컴포넌트
│   └── utils/            # 유틸리티 함수
├── docs/                 # 개발 문서
├── .env.example          # 환경변수 템플릿
├── app.json             # Expo 앱 설정
├── eas.json             # EAS 빌드 설정
└── package.json         # NPM 의존성
```

## 🐛 문제 해결

### "Metro bundler 오류"
```bash
# 캐시 삭제 후 재시작
npm start -- --clear
```

### "Android 빌드 실패"
```bash
# Gradle 캐시 삭제
cd android
./gradlew clean
cd ..
```

### "의존성 충돌"
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

## 🔒 보안 주의사항

### Git 커밋 전 확인사항
- ✅ `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- ✅ `android/app/release/` 폴더가 제외되어 있는지 확인
- ✅ API 키, 비밀번호 등 민감한 정보가 코드에 없는지 확인

### 환경변수 관리
- **로컬 개발**: `.env` 파일 사용 (Git에 커밋 ❌)
- **EAS 빌드**: EAS Secrets 사용 (팀 리더가 설정)
- **팀원 공유**: `.env.example` 파일로 템플릿 공유

## 📞 도움이 필요하면

- **OAuth 설정**: `docs/` 폴더의 각 가이드 참고
- **네비게이션**: `docs/NAVIGATION_GUIDE.md`
- **API 연동**: `docs/API_GUIDE.md`
- **라이브러리 정보**: `docs/LIBRARIES.md`

## ✨ 개발 워크플로우

1. **빠른 개발**: Expo Go로 UI/기능 개발
2. **OAuth 테스트**: EAS Build로 APK 생성 후 테스트
3. **배포 준비**: Production 프로필로 최종 빌드

---

**중요**: 이 프로젝트는 Expo와 React Native의 혼합 환경입니다. Expo Go로는 OAuth가 제한적이므로, OAuth 기능 테스트 시에는 반드시 EAS Build를 사용하세요.
