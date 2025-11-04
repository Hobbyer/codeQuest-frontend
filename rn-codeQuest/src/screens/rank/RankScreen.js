import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient'; // 필요시 설치: npx expo install expo-linear-gradient
import { lightImpact } from "../../utils/haptic";

const RankScreen = () => {
  const [rankingData, setRankingData] = useState([
    {
      rank: 1,
      name: "이코딩",
      exp: 5840,
      profileImage: "",
      level: 12,
      trend: "up",
    },
    {
      rank: 2,
      name: "박개발",
      exp: 5320,
      profileImage: "",
      level: 11,
      trend: "same",
    },
    {
      rank: 3,
      name: "최프론트",
      exp: 4950,
      profileImage: "",
      level: 11,
      trend: "up",
    },
    {
      rank: 4,
      name: "정백엔드",
      exp: 4680,
      profileImage: "",
      level: 10,
      trend: "down",
    },
    {
      rank: 5,
      name: "김풀스택",
      exp: 4120,
      profileImage: "",
      level: 10,
      trend: "up",
    },
    {
      rank: 6,
      name: "나자바",
      exp: 3850,
      profileImage: "",
      level: 9,
      trend: "same",
    },
    {
      rank: 7,
      name: "김코딩",
      exp: 2450,
      profileImage: "",
      level: 7,
      trend: "up",
      isCurrentUser: true,
    },
    {
      rank: 8,
      name: "조리액트",
      exp: 2120,
      profileImage: "",
      level: 6,
      trend: "up",
    },
  ]);

  const myRank = rankingData.find((user) => user.isCurrentUser);

  const getRankBadgeStyle = (rank) => {
    if (rank === 1) return styles.goldBadge;
    if (rank === 2) return styles.silverBadge;
    if (rank === 3) return styles.bronzeBadge;
    return styles.defaultBadge;
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") return "📈";
    if (trend === "down") return "📉";
    return "➖";
  };

  const RankingItem = ({ user }) => {
    const isTopThree = user.rank <= 3;
    const isCurrentUser = user.isCurrentUser;

    return (
      <TouchableOpacity
        style={[styles.rankCard, isCurrentUser && styles.currentUserCard]}
        onPress={() => lightImpact()}
        activeOpacity={0.7}
      >
        {/* 순위 배지 - 그라데이션 */}
        <View style={[styles.rankBadge, getRankBadgeStyle(user.rank)]}>
          {isTopThree ? (
            <Text style={styles.rankEmoji}>
              {user.rank === 1 ? "👑" : user.rank === 2 ? "🥈" : "🥉"}
            </Text>
          ) : (
            <Text style={styles.rankNumber}>{user.rank}</Text>
          )}
        </View>

        {/* 프로필 이미지 - 네온 테두리 */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: user.profileImage || "https://via.placeholder.com/50",
            }}
            style={styles.profileImage}
          />
          {isCurrentUser && <View style={styles.profileGlow} />}
        </View>

        {/* 사용자 정보 */}
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text
              style={[styles.userName, isCurrentUser && styles.currentUserName]}
            >
              {user.name}
            </Text>
            {isCurrentUser && (
              <View style={styles.meBadge}>
                <Text style={styles.meText}>YOU</Text>
              </View>
            )}
          </View>
          <View style={styles.levelContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv.{user.level}</Text>
            </View>
          </View>
        </View>

        {/* 경험치 - 네온 스타일 */}
        <View style={styles.expContainer}>
          <Text style={styles.trendIcon}>{getTrendIcon(user.trend)}</Text>
          <Text style={[styles.expText, isTopThree && styles.expTextGlow]}>
            {user.exp.toLocaleString()}
          </Text>
          <Text style={styles.expLabel}>XP</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 - 그라데이션 배경 */}
      <View style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerEmoji}>🏆</Text>
            <Text style={styles.headerTitle}>RANKING</Text>
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => lightImpact()}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 내 순위 요약 카드 - 네온 카드 */}
      {myRank && (
        <View style={styles.myRankWrapper}>
          <View style={styles.myRankSummary}>
            <View style={styles.summaryContent}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryLabel}>MY RANK</Text>
                <Text style={styles.summaryRank}>#{myRank.rank}</Text>
                <View style={styles.rankUnderline} />
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRight}>
                <Text style={styles.summaryLabel}>TOTAL EXP</Text>
                <Text style={styles.summaryExp}>
                  {myRank.exp.toLocaleString()}
                </Text>
                <Text style={styles.summaryExpLabel}>XP</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => lightImpact()}
            >
              <Text style={styles.detailButtonText}>VIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 탭 메뉴 - 모던한 스타일 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, styles.activeTab]}
          onPress={() => lightImpact()}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>WEEKLY</Text>
          <View style={styles.tabIndicator} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => lightImpact()}>
          <Text style={styles.tabText}>MONTHLY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => lightImpact()}>
          <Text style={styles.tabText}>ALL TIME</Text>
        </TouchableOpacity>
      </View>

      {/* 랭킹 리스트 */}
      <ScrollView
        style={styles.rankingList}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>🔥 TOP {rankingData.length}</Text>
          <Text style={styles.listHeaderSubtext}>
            Updated every Monday • Week #{Math.ceil(Date.now() / (7 * 24 * 60 * 60 * 1000))}
          </Text>
        </View>

        {rankingData.map((user) => (
          <RankingItem key={user.rank} user={user} />
        ))}

        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={() => lightImpact()}
        >
          <Text style={styles.loadMoreText}>LOAD MORE</Text>
          <Text style={styles.loadMoreIcon}>↓</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F23",
  },
  
  // 헤더 - 그라데이션
  headerGradient: {
    backgroundColor: "#1A1A35",
    borderBottomWidth: 1,
    borderBottomColor: "#8B5CF6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerEmoji: {
    fontSize: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "#8B5CF6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  filterIcon: {
    fontSize: 20,
  },

  // 내 순위 카드 - 네온 효과
  myRankWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  myRankSummary: {
    backgroundColor: "#1A1A35",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 11,
    color: "#A78BFA",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryRank: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    textShadowColor: "#8B5CF6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  rankUnderline: {
    width: 40,
    height: 3,
    backgroundColor: "#8B5CF6",
    marginTop: 5,
    borderRadius: 2,
  },
  summaryDivider: {
    width: 2,
    height: 60,
    backgroundColor: "#8B5CF6",
    marginHorizontal: 20,
    opacity: 0.3,
  },
  summaryRight: {
    flex: 1,
  },
  summaryExp: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  summaryExpLabel: {
    fontSize: 12,
    color: "#A78BFA",
    fontWeight: "700",
    marginTop: 2,
  },
  detailButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1.5,
  },

  // 탭 - 모던 스타일
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1A1A35",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    // 활성 탭 스타일
  },
  tabText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "700",
    letterSpacing: 1,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    height: 3,
    backgroundColor: "#8B5CF6",
    borderRadius: 2,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  // 리스트 헤더
  rankingList: {
    flex: 1,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 5,
    letterSpacing: 1,
  },
  listHeaderSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  // 랭킹 카드 - 다크 모드
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A35",
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2D2D4A",
  },
  currentUserCard: {
    backgroundColor: "#2D1B69",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },

  // 순위 배지 - 그라데이션
  rankBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 2,
  },
  goldBadge: {
    backgroundColor: "#FCD34D",
    borderColor: "#FCD34D",
    shadowColor: "#FCD34D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  silverBadge: {
    backgroundColor: "#E5E7EB",
    borderColor: "#E5E7EB",
    shadowColor: "#E5E7EB",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  bronzeBadge: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  defaultBadge: {
    backgroundColor: "#374151",
    borderColor: "#4B5563",
  },
  rankEmoji: {
    fontSize: 26,
  },
  rankNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  // 프로필 - 네온 효과
  profileImageContainer: {
    position: "relative",
    marginRight: 15,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: "#8B5CF6",
  },
  profileGlow: {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    opacity: 0.3,
  },

  // 사용자 정보
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  currentUserName: {
    color: "#A78BFA",
    textShadowColor: "#8B5CF6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  meBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  meText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  levelContainer: {
    flexDirection: "row",
  },
  levelBadge: {
    backgroundColor: "#374151",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  levelText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "600",
  },

  // 경험치 - 네온
  expContainer: {
    alignItems: "flex-end",
  },
  trendIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  expText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#A78BFA",
  },
  expTextGlow: {
    textShadowColor: "#8B5CF6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  expLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "700",
    marginTop: 2,
  },

  // 더보기
  loadMoreButton: {
    flexDirection: "row",
    backgroundColor: "#1A1A35",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2D2D4A",
    gap: 8,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#8B5CF6",
    letterSpacing: 1,
  },
  loadMoreIcon: {
    fontSize: 16,
    color: "#8B5CF6",
  },

  bottomSpacing: {
    height: 30,
  },
});