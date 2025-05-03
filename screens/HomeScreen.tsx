"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import AccountCard from "../components/AccountCard"
import ActionButton from "../components/ActionButton"
import NotificationBar from "../components/NotificationBar"

export default function HomeScreen() {
  const navigation = useNavigation()
  const [userName, setUserName] = useState("John Smith")
  const [hasNotification, setHasNotification] = useState(true)

  const handleScanPress = () => {
    navigation.navigate("Scan")
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <ScrollView>
        {/* User Profile Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={require("../assets/avatar-placeholder.png")} style={styles.avatar} />
              {hasNotification && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>1</Text>
                </View>
              )}
            </View>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#8e44ad" />
          </TouchableOpacity>
        </View>

        {/* Awaiting Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awaiting Events</Text>
          <TouchableOpacity style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Ionicons name="document-text" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Update on the status of your tax document</Text>
              <Text style={styles.notificationSubtitle}>Check here to see if any action is required.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* User Name Section with Dropdown */}
        <TouchableOpacity style={styles.userSection}>
          <Text style={styles.userName}>{userName}</Text>
          <Ionicons name="chevron-down" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Account Cards */}
        <View style={styles.accountsContainer}>
          <AccountCard title="Total Balance" amount="$0.00" icon="wallet" color="#8e44ad" />
          <AccountCard title="Tax Savings" amount="$0.00" icon="cash" color="#d35400" />
          <AccountCard title="Tax Documents" status="Pending" icon="document-text" color="#333333" />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <ActionButton icon="arrow-up" label="Pay" color="#d35400" onPress={() => Alert.alert("Pay taxes")} />
        <ActionButton
          icon="arrow-down"
          label="Request"
          color="#2980b9"
          onPress={() => Alert.alert("Request documents")}
        />
        <ActionButton icon="add" label="Add" color="#8e44ad" onPress={handleScanPress} />
      </View>

      {/* Notification Bar */}
      <NotificationBar message="We need a bit more information to verify your account" icon="document-text" />

      {/* Bottom Navigation is handled by Tab Navigator */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  profileButton: {
    padding: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  notificationCard: {
    backgroundColor: "#222222",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2980b9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  notificationSubtitle: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  accountsContainer: {
    paddingHorizontal: 20,
    marginBottom: 100, // Space for action buttons
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
  },
})
