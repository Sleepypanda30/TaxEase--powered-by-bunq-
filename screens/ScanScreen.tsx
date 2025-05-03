"use client"

import { useState, useRef } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import * as DocumentPicker from "expo-document-picker"
import { Camera } from "expo-camera"
import { useTaxDocument } from "../context/TaxDocumentContext"
import { Ionicons } from "@expo/vector-icons"

export default function ScanScreen() {
  const navigation = useNavigation()
  const { setDocument } = useTaxDocument()
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraVisible, setCameraVisible] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const cameraRef = useRef(null)

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === "granted")
    if (status === "granted") {
      setCameraVisible(true)
    } else {
      Alert.alert("Camera permission is required to scan documents")
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync()
        setCameraVisible(false)
        setPreviewImage(photo.uri)
      } catch (error) {
        Alert.alert("Error taking picture", error.message)
      }
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri)
    }
  }

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      })

      if (result.type === "success") {
        // For PDFs we don't have a preview, so we'll use a placeholder
        setPreviewImage("pdf")
      }
    } catch (error) {
      Alert.alert("Error picking document", error.message)
    }
  }

  const processDocument = async () => {
    if (!previewImage) {
      Alert.alert("Please select or capture a document first")
      return
    }

    setUploading(true)

    // Simulate uploading and processing with AWS/NVIDIA
    setTimeout(() => {
      setUploading(false)

      // In a real app, you would upload the document to your AWS backend
      // and get the processed results back

      // For the MVP, we'll simulate a successful upload and processing
      setDocument({
        id: "doc-" + Date.now(),
        type: previewImage === "pdf" ? "pdf" : "image",
        uri: previewImage,
        processed: true,
      })

      navigation.navigate("Results")
    }, 3000)
  }

  if (cameraVisible) {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Ionicons name="camera" size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setCameraVisible(false)}>
              <Ionicons name="close" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Upload Your Tax Document</Text>
        <Text style={styles.subtitle}>We accept tax transcripts, W-2s, 1099s, and other tax forms</Text>

        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.uploadOption} onPress={requestCameraPermission}>
            <Ionicons name="camera" size={40} color="#8e44ad" />
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadOption} onPress={pickImage}>
            <Ionicons name="image" size={40} color="#8e44ad" />
            <Text style={styles.optionText}>Choose Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadOption} onPress={pickDocument}>
            <Ionicons name="document-text" size={40} color="#8e44ad" />
            <Text style={styles.optionText}>Select PDF</Text>
          </TouchableOpacity>
        </View>

        {previewImage && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Document Preview</Text>

            {previewImage === "pdf" ? (
              <View style={styles.pdfPreview}>
                <Ionicons name="document" size={60} color="#e74c3c" />
                <Text style={styles.pdfText}>PDF Document</Text>
              </View>
            ) : (
              <Image source={{ uri: previewImage }} style={styles.preview} resizeMode="contain" />
            )}

            <TouchableOpacity style={styles.processButton} onPress={processDocument} disabled={uploading}>
              {uploading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.processButtonText}>Process Document</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={24} color="#8e44ad" />
          <Text style={styles.securityText}>Your documents are securely processed and never stored permanently</Text>
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
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#AAAAAA",
    marginBottom: 30,
    textAlign: "center",
  },
  uploadOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  uploadOption: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#222222",
    borderRadius: 10,
    width: "30%",
  },
  optionText: {
    marginTop: 10,
    color: "#FFFFFF",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  preview: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  pdfPreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pdfText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFFFFF",
  },
  processButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  processButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222222",
    padding: 15,
    borderRadius: 10,
  },
  securityText: {
    marginLeft: 10,
    color: "#FFFFFF",
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  cameraButton: {
    backgroundColor: "#8e44ad",
    borderRadius: 50,
    padding: 15,
    margin: 20,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 50,
    padding: 15,
    margin: 20,
  },
})
