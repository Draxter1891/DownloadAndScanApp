# 📱 Download & Scan Demo App

A React Native CLI app demonstrating file download, QR/barcode scanning, and contextual data sharing using Context API.

---

## 🚀 Features

- 🔽 **Download People List:** Download a remote `.txt` file containing name-ID pairs and display it using `FlatList`  
- 📷 **Scan Barcode:** Scan a barcode (QR or standard) containing an ID and instantly match it to a name from the downloaded data  
- 📦 **Context API:** Shared state management for people data between screens  
- ✅ **Clean UI:** Modern, responsive layout using `SafeAreaView` and custom styling  
- 💡 **Permission Handling:** Minimal and smart use of permissions, optimized for user experience

---

## 🧱 Project Structure

/DownloadDemo
│
├── android/ # Android native code
├── ios/ # iOS native code
├── src/
│ ├── context/
│ │ └── PeopleContext.tsx # Context API setup for people data
│ ├── screens/
│ │ ├── Dwnld.tsx # Download screen
│ │ └── ScanID.tsx # Scanner screen
│ └── components/ # Reusable components (if any)
├── App.tsx # Entry point with Drawer Navigation
├── README.md
└── package.json


---

## 🔧 Setup & Run

```bash
# Clone the repo
git clone https://github.com/Draxter1891/DownloadAndScanApp.git
cd DownloadAndScanApp

# Install dependencies
npm install

# Run on Android
npx react-native run-android

# Run on iOS (requires macOS)
npx react-native run-ios
```

## 📦 Dependencies

- @react-native-async-storage/async-storage

- react-native-fs : for file download

- @react-navigation/native, @react-navigation/drawer

- react-native-camera-kit

## 🧠 Learnings

- Context API for global state sharing  
- AsyncStorage for data persistence  
- Permissions handling based on platform  
- Barcode scanning integration in React Native CLI  
- Clean component design with hooks

---

## 🧑‍💻 Author

**Draxter X**  
📫 [trishabh2001@gmail.com](mailto:trishabh2001@gmail.com)  
🌐 [https://rishabhtripathiportfolio.vercel.app/](https://rishabhtripathiportfolio.vercel.app/)

