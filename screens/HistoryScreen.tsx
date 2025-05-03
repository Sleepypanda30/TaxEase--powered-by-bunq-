import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const historyData = [
  {
    id: "1",
    date: "2023-04-15",
    type: "W-2 Form",
    status: "Processed",
    savings: 1250,
  },
  {
    id: "2",
    date: "2023-03-10",
    type: "1099-MISC",
    status: "Processed",
    savings: 750,
  },
  {
    id: "3",
    date: "2023-02-22",
    type: "Tax Transcript",
    status: "Processed",
    savings: 2100,
  },
]

export default function HistoryScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === "Processed" ? "#27ae60" : "#f39c12" }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemType}>{item.type}</Text>
          <Text style={styles.itemSavings}>Potential Savings: ${item.savings}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document History</Text>
      </View>

      {historyData.length > 0 ? (
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="#555555" />
          <Text style={styles.emptyText}>No document history yet</Text>
          <Text style={styles.emptySubtext}>Your processed tax documents will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listContent: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: "#222222",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemDate: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemType: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemSavings: {
    color: "#8e44ad",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptySubtext: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 10,
  },
})
