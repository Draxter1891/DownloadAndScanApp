import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Person = {
  name: string;
  id: string;
};
console.log('Camera: ', Camera);

const ScanID = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [torch, setTorch] = useState<'on' | 'off'>('off');
  const [scanned, setScanned] = useState<boolean>(false);
  const [zoomed, setZoomed] = useState<1| 2.5>(1);

  const data: Person[] = [
    { name: 'raju', id: '1001' },
    { name: 'taju', id: '1002' },
    { name: 'kaju', id: '1003' },
    { name: 'paju', id: '1004' },
  ];

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    };

    requestPermissions();
  }, []);

  const checkIDAndShowName = (id: string) => {
    const person = data.find(p => p.id === id);
    if (person) {
      Alert.alert('Match Found', `Name: ${person.name}`);
    } else {
      Alert.alert('No Match', `No match found for ID: ${id}`);
    }
  };

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    if (scanned) return;

    const scannedID = event.nativeEvent.codeStringValue;
    setScanned(true);
    checkIDAndShowName(scannedID);
    // console.log(scannedID);

    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  if (!hasPermission) {
    return <Text style={styles.text}>No camera permission granted</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        scanBarcode={true}
        onReadCode={onReadCode}
        showFrame={true}
        laserColor="#9265CE"
        frameColor="#9B9E9C"
        style={styles.cam}
        focusMode='on'
        zoomMode='on'
        zoom={zoomed}
        torchMode={torch}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            setTorch(prev => (prev === 'on' ? 'off' : 'on'));
          }}
        >
            <Icon
              name= {torch==='on' ? "flashlight-on" : "flashlight-off"}
              size={32}
              color='#fff'
              style={[styles.torch, {backgroundColor: torch==="on"? "#9265CE":"#9B9E9C"}]}
            />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setZoomed(prev => (prev === 1 ? 2.5 : 1));
          }}
        >
          <Icon
            name= {zoomed === 2.5? "center-focus-strong":"center-focus-weak"}
            size={30}
            color='#fff'
            style={[styles.torch, { backgroundColor: zoomed===2.5? "#9265CE":"#9B9E9C" }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanID;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#0F0D11' },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  cam: {
    alignSelf: 'center',
    width: '70%',
    height: '50%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 100,
    marginTop: 20,
  },
  torch: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
