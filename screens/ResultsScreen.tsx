"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Share } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useTaxDocument } from "../context/TaxDocumentContext"
import { Ionicons } from "@expo/vector-icons"
import AdviceCard from "../components/AdviceCard"
import TaxSummary from "../components/TaxSummary"

export default function ResultsScreen() {
  const navigation = useNavigation()
  const { document } = useTaxDocument()
  const [loading, setLoading] = useState(true)
  const [taxData, setTaxData] = useState(null)

  useEffect(() => {
    // Check if we have a document
    if (!document) {
      navigation.navigate("Home")
      return
    }

    // Simulate fetching processed data from AWS/NVIDIA backend
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from your backend
      setTaxData({
        income: 75000,
        filingStatus: "Single",
        deductions: 12950,
        taxableIncome: 62050,
        federalTax: 9605,
        stateTax: 3102,
        advice: [
          {
            id: "1",
            title: "Retirement Contributions",
            description: "Increasing your 401(k) contribution could save you approximately $1,320 in taxes.",
            potentialSavings: 1320,
            priority: "high",
          },
          {
            id: "2",
            title: "Home Office Deduction",
            description: "You may qualify for a home office deduction of up to $1,500 based on your work situation.",
            potentialSavings: 1500,
            priority: "medium",
          },
          {
            id: "3",
            title: "Education Credits",
            description: "Consider the Lifetime Learning Credit for your continuing education expenses.",
            potentialSavings: 800,
            priority: "medium",
          },
          {
            id: "4",
            title: "Charitable Contributions",
            description: "Your charitable donations could be itemized for additional tax benefits.",
            potentialSavings: 450,
            priority: "low",
          },
        ],
      })
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [document, navigation])

  const shareResults = async () => {
    try {
      await Share.share({
        message: "Check out my tax advice from TaxEase! I could save up to $4,070 on my taxes.",
        title: "My TaxEase Results",
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8e44ad" />
        <Text style={styles.loadingText}>Analyzing your tax document...</Text>
        <Text style={styles.processingText}>
          Our AI is processing your information and generating personalized advice
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Your Tax Analysis</Text>
          <TouchableOpacity style={styles.shareButton} onPress={shareResults}>
            <Ionicons name="share-social" size={24} color="#8e44ad" />
          </TouchableOpacity>
        </View>

        <TaxSummary taxData={taxData} />

        <View style={styles.savingsContainer}>
          <Text style={styles.savingsTitle}>Potential Tax Savings</Text>
          <Text style={styles.savingsAmount}>
            ${taxData.advice.reduce((total, item) => total + item.potentialSavings, 0).toLocaleString()}
          </Text>
          <Text style={styles.savingsSubtitle}>Based on our analysis of your tax situation</Text>
        </View>

        <View style={styles.adviceContainer}>
          <Text style={styles.adviceTitle}>Personalized Tax Advice</Text>

          {taxData.advice.map((item) => (
            <AdviceCard key={item.id} advice={item} />
          ))}
        </View>

        <View style={styles.disclaimerContainer}>
          <Ionicons name="information-circle" size={20} color="#AAAAAA" />
          <Text style={styles.disclaimerText}>
            This advice is for informational purposes only and does not constitute professional tax advice. Please
            consult with a tax professional before making financial decisions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#FFFFFF",
  },
  processingText: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 10,
    maxWidth: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  shareButton: {
    padding: 10,
  },
  savingsContainer: {
    backgroundColor: "#8e44ad",
    padding: 20,
    margin: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  savingsTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  savingsAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
  },
  savingsSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  adviceContainer: {
    padding: 20,
  },
  adviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  disclaimerContainer: {
    flexDirection: "row",
    backgroundColor: "#222222",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#AAAAAA",
    marginLeft: 10,
    flex: 1,
  },
})
