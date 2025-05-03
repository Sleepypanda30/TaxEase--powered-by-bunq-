import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { TaxDocumentProvider } from "./context/TaxDocumentContext"
import HomeScreen from "./screens/HomeScreen"
import ScanScreen from "./screens/ScanScreen"
import ResultsScreen from "./screens/ResultsScreen"
import HistoryScreen from "./screens/HistoryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import { Ionicons } from "@expo/vector-icons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#333333",
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#888888",
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="time" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <TaxDocumentProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#000000",
              },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              contentStyle: {
                backgroundColor: "#000000",
              },
            }}
          >
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Scan" component={ScanScreen} options={{ title: "Scan Document" }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ title: "Your Tax Advice" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TaxDocumentProvider>
    </SafeAreaProvider>
  )
}
