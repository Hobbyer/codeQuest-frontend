// src/screens/home/HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Title, Card, ActivityIndicator, Text, ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import * as haptic from '../utils/haptic';

export default function HomeScreen({ navigation }) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [coins, setCoins] = useState(1250);
  const [xp, setXp] = useState(5430);
  const [currentGoalXP, setCurrentGoalXP] = useState(65);
  const [streak, setStreak] = useState(23);

  // 레슨 데이터 - 빈 배열로 테스트 가능
  const lessons = [
    {
      id: 1,
      icon: '🎯',
      title: 'Python 기초 - 변수와 자료형',
      description: '변수 선언과 기본 자료형 이해하기',
      progress: 0.75,
      xp: 15,
      active: true,
    },
    {
      id: 2,
      icon: '🎨',
      title: '프론트엔드 - HTML & CSS',
      description: '웹 페이지 레이아웃 디자인',
      progress: 0.30,
      xp: 15,
      active: false,
    },
    {
      id: 4,
      icon: '⚙️',
      title: 'Django REST API 개발',
      description: 'RESTful API 설계와 구현',
      progress: 0.60,
      xp: 25,
      active: false,
    },
  ];
  
  // 테스트용: 빈 배열로 바꿔서 테스트
  // const lessons = [];

  const leaderboard = [
    { rank: 1, name: '김코딩', xp: 8520, avatar: '👨‍💻', color: '#FFD700' },
    { rank: 2, name: '박개발', xp: 7345, avatar: '👩‍💻', color: '#C0C0C0' },
    { rank: 3, name: '이프로', xp: 6890, avatar: '🧑‍💻', color: '#CD7F32' },
    { rank: 8, name: user?.nickname || '나', xp: 5430, avatar: '🎓', isMe: true },
  ];

  const startLesson = (lesson) => {
    haptic.successFeedback();
    setXp(xp + lesson.xp);
    setCoins(coins + 5);
    const newGoalXP = Math.min(currentGoalXP + lesson.xp, 100);
    setCurrentGoalXP(newGoalXP);
  };

  const completeGoal = () => {
    if (currentGoalXP >= 100) {
      haptic.heavyImpact();
      setCoins(coins + 50);
      setTimeout(() => {
        setCurrentGoalXP(0);
      }, 1000);
    } else {
      haptic.lightImpact();
    }
  };

  const handleLogout = () => {
    haptic.mediumImpact();
    logout();
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 16, fontSize: 16 }}>
          로그인 상태 확인 중...
        </Text>
      </View>
    );
  }

  return (
    <>
      {user && isAuthenticated ? (
        <ScrollView style={styles.scrollContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradientBackground}
          >
            {/* 헤더 */}
            <View style={styles.header}> 
              <View style={styles.logoSection}>
                <View style={styles.logoIcon}>
                  <Text style={styles.logoEmoji}>💻</Text>
                </View>
                <Text style={styles.logoText}>CodeQuest</Text>
              </View>

              <View style={styles.statsSection}>
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>🪙</Text>
                  <Text style={styles.statValue}>{coins.toLocaleString()}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>⚡</Text>
                  <Text style={styles.statValue}>{xp.toLocaleString()}</Text>
                </View>
                <TouchableOpacity 
                  onPress={handleLogout} 
                  style={styles.statItem}
                >
                  <Text style={styles.statEmoji}>👤</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 메인 컨텐츠 */}
            <View style={styles.mainContent}>
              {/* 학습 경로 카드 */}
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.pathHeader}>
                    <Text style={styles.pathTitle}>학습 경로</Text>
                    <LinearGradient
                      colors={['#ffd700', '#ffed4e']}
                      style={styles.levelBadge}
                    >
                      <Text style={styles.levelText}>레벨 12</Text>
                    </LinearGradient>
                  </View>

                  {/* 레슨 목록 또는 빈 상태 */}
                  {lessons.length > 0 ? (
                    // 레슨이 있을 때
                    lessons.map((lesson) => (
                      <TouchableOpacity
                        key={lesson.id}
                        onPress={() => startLesson(lesson)}
                        activeOpacity={0.7}
                      >
                        <LinearGradient
                          colors={lesson.active ? ['#667eea', '#764ba2'] : ['#f8f9fa', '#f8f9fa']}
                          style={styles.lessonItem}
                        >
                          <View style={styles.lessonIcon}>
                            <Text style={styles.lessonEmoji}>{lesson.icon}</Text>
                          </View>
                          <View style={styles.lessonInfo}>
                            <Text style={[
                              styles.lessonTitle,
                              lesson.active && styles.lessonTitleActive
                            ]}>
                              {lesson.title}
                            </Text>
                            <Text style={[
                              styles.lessonDescription,
                              lesson.active && styles.lessonDescriptionActive
                            ]}>
                              {lesson.description}
                            </Text>
                          </View>
                          <View style={styles.lessonProgress}>
                            <View style={styles.progressBarContainer}>
                              <ProgressBar
                                progress={lesson.progress}
                                color={lesson.active ? "#fff" : "#58cc02"}
                                style={styles.progressBar}
                              />
                            </View>
                            <Text style={[
                              styles.lessonXP,
                              lesson.active && styles.lessonXPActive
                            ]}>
                              +{lesson.xp} XP
                            </Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    ))
                  ) : (
                    // 레슨이 없을 때 - 빈 상태 표시
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyStateEmoji}>📚</Text>
                      <Text style={styles.emptyStateTitle}>진행중인 코스가 없습니다</Text>
                      <Text style={styles.emptyStateDescription}>
                        새로운 코스를 시작해보세요!
                      </Text>
                      <Button
                        mode="contained"
                        onPress={() => {
                          haptic.lightImpact();
                          // navigation.navigate('CourseCatalog'); // 코스 목록 화면으로 이동
                          alert('코스 목록 화면으로 이동 (구현 예정)');
                        }}
                        style={styles.emptyStateButton}
                        buttonColor="#667eea"
                      >
                        코스 둘러보기
                      </Button>
                    </View>
                  )}
                </Card.Content>
              </Card>

              {/* 오늘의 목표 */}
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.goalHeader}>
                    <Text style={styles.goalEmoji}>🎯</Text>
                    <Text style={styles.goalTitle}>오늘의 목표</Text>
                  </View>
                  <View style={styles.goalProgressContainer}>
                    <ProgressBar
                      progress={currentGoalXP / 100}
                      color="#58cc02"
                      style={styles.goalProgressBar}
                    />
                  </View>
                  <Text style={styles.goalText}>
                    <Text style={styles.goalTextBold}>{currentGoalXP}</Text> / 100 XP 달성
                  </Text>
                  <Button
                    mode="contained"
                    onPress={completeGoal}
                    style={styles.startButton}
                    labelStyle={styles.startButtonLabel}
                    buttonColor="#58cc02"
                  >
                    학습 계속하기 🚀
                  </Button>
                </Card.Content>
              </Card>

              {/* 스트릭 카드 */}
              <LinearGradient
                colors={['#ff6b6b', '#ee5a6f']}
                style={styles.streakCard}
              >
                <Text style={styles.streakNumber}>{streak}</Text>
                <Text style={styles.streakText}>일 연속 학습 🔥</Text>
                <View style={styles.streakCalendar}>
                  {['월', '화', '✓', '✓', '✓', '✓', '✓'].map((day, index) => (
                    <View
                      key={index}
                      style={[
                        styles.calendarDay,
                        day === '✓' && styles.calendarDayActive
                      ]}
                    >
                      <Text style={styles.calendarDayText}>{day}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>

              {/* 리더보드 */}
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.leaderboardHeader}>
                    <Text style={styles.leaderboardEmoji}>🏆</Text>
                    <Text style={styles.leaderboardTitle}>주간 랭킹</Text>
                  </View>
                  
                  {leaderboard.map((player) => (
                    <View
                      key={player.rank}
                      style={[
                        styles.leaderboardItem,
                        player.isMe && styles.leaderboardItemMe
                      ]}
                    >
                      <View style={[
                        styles.leaderboardRank,
                        { backgroundColor: player.color || '#e9ecef' }
                      ]}>
                        <Text style={styles.leaderboardRankText}>
                          {player.rank}
                        </Text>
                      </View>
                      <View style={styles.leaderboardAvatar}>
                        <Text style={styles.leaderboardAvatarText}>
                          {player.avatar}
                        </Text>
                      </View>
                      <View style={styles.leaderboardUser}>
                        <Text style={[
                          styles.leaderboardName,
                          player.isMe && styles.leaderboardNameMe
                        ]}>
                          {player.name}
                        </Text>
                        <Text style={[
                          styles.leaderboardXP,
                          player.isMe && styles.leaderboardXPMe
                        ]}>
                          {player.xp.toLocaleString()} XP
                        </Text>
                      </View>
                    </View>
                  ))}
                </Card.Content>
              </Card>
            </View>
          </LinearGradient>
        </ScrollView>
      ) : (
        // 로그인 안 된 경우
        <View style={styles.container}>
          <Card>
            <Card.Content>
              <Title style={styles.title}>CodeQuest에 오신 것을 환영합니다! 🚀</Title>
              <Button 
                mode="contained" 
                onPress={() => {
                  haptic.lightImpact();
                  navigation.navigate('Login');
                }}
                style={styles.button}
              >
                로그인
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => {
                  haptic.lightImpact();
                  navigation.navigate('Register');
                }}
                style={styles.button}
              >
                회원가입
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientBackground: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#667eea',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 30,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    gap: 8,
  },
  statEmoji: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  // 메인 컨텐츠
  mainContent: {
    gap: 20,
  },
  card: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  // 학습 경로
  pathHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pathTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  levelBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    fontWeight: 'bold',
    color: '#333',
  },

  // 빈 상태 (Empty State)
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  emptyStateButton: {
    borderRadius: 15,
    paddingHorizontal: 20,
  },

  // 레슨 아이템
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  lessonIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  lessonEmoji: {
    fontSize: 28,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  lessonTitleActive: {
    color: 'white',
  },
  lessonDescription: {
    fontSize: 13,
    color: '#666',
  },
  lessonDescriptionActive: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  lessonProgress: {
    alignItems: 'flex-end',
    gap: 8,
  },
  progressBarContainer: {
    width: 80,
  },
  progressBar: {
    height: 6,
    borderRadius: 10,
    backgroundColor: '#e9ecef',
  },
  lessonXP: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#58cc02',
  },
  lessonXPActive: {
    color: 'white',
  },

  // 오늘의 목표
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  goalEmoji: {
    fontSize: 30,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  goalProgressContainer: {
    marginBottom: 10,
  },
  goalProgressBar: {
    height: 20,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  goalText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  goalTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#58cc02',
  },
  startButton: {
    borderRadius: 15,
    paddingVertical: 8,
  },
  startButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // 스트릭 카드
  streakCard: {
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  streakNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  streakText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    marginBottom: 15,
  },
  streakCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  calendarDayText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },

  // 리더보드
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  leaderboardEmoji: {
    fontSize: 30,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginBottom: 10,
  },
  leaderboardItemMe: {
    backgroundColor: '#667eea',
  },
  leaderboardRank: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardRankText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
  },
  leaderboardAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  leaderboardAvatarText: {
    fontSize: 22,
  },
  leaderboardUser: {
    flex: 1,
  },
  leaderboardName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  leaderboardNameMe: {
    color: 'white',
  },
  leaderboardXP: {
    fontSize: 13,
    color: '#666',
  },
  leaderboardXPMe: {
    color: 'rgba(255, 255, 255, 0.9)',
  },

  // 비로그인 상태
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});