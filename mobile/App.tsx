import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const WEB_URL = process.env.EXPO_PUBLIC_WEB_APP_URL?.trim() ?? "";

const PLACEHOLDER = "https://YOUR_VERCEL_DEPLOYMENT.vercel.app";

export default function App() {
  const url = WEB_URL;
  const missing = !url || url === PLACEHOLDER;

  if (missing) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
          <StatusBar style="dark" />
          <View style={styles.warn}>
            <Text style={styles.warnTitle}>Set your web app URL</Text>
            <Text style={styles.warnBody}>
              Copy <Text style={styles.mono}>mobile/.env.example</Text> to{" "}
              <Text style={styles.mono}>mobile/.env</Text> and set{" "}
              <Text style={styles.mono}>EXPO_PUBLIC_WEB_APP_URL</Text> to your deployed Next.js
              site (HTTPS), then restart Expo.
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />
        <View style={styles.webWrap}>
          <WebView
            source={{ uri: url }}
            style={styles.web}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            allowsBackForwardNavigationGestures
            setSupportMultipleWindows={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff7f7" },
  webWrap: { flex: 1 },
  web: { flex: 1, backgroundColor: "#ffffff" },
  warn: { flex: 1, padding: 24, justifyContent: "center" },
  warnTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#881337" },
  warnBody: { fontSize: 16, lineHeight: 24, color: "#4c0519" },
  mono: { fontFamily: "Courier", fontSize: 14, color: "#9f1239" },
});
