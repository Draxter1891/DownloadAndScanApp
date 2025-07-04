import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  View,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Vibration,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePeople } from '../context/PeopleContext';
import { useFocusEffect } from '@react-navigation/native';

const ScanID = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [torch, setTorch] = useState<'on' | 'off'>('off');
  const lastScannedIDRef = useRef<string | null>(null);
  const [zoomed, setZoomed] = useState<1 | 2.5>(1);
  const { people } = usePeople();

  //Toast box
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notice', message);
    }
  };

  //bug resolved: scanning again after downloading the people.txt file but not showing the result.
  useFocusEffect(
    React.useCallback(() => {
      lastScannedIDRef.current = null;
    }, []),
  );

  //Haptic Feedback
  const triggerHaptic = () => {
    // this is milliseconds
    Vibration.vibrate(1000);
  };

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
    if (!people || people.length === 0) {
      showToast('⚠️ No data loaded. Please download first.');

      return;
    }
    const person = people.find(p => p.id === id);
    if (person) {
      triggerHaptic();

      showToast(`✅ Match: ${person.name}`);
    } else {
      showToast(`❌ No match for ID: ${id}\nHave you downloaded the list?`);
    }
  };

  const onReadCode = (event: { nativeEvent: { codeStringValue: string } }) => {
    const scannedID = event.nativeEvent.codeStringValue?.trim();

    if (!scannedID || scannedID === lastScannedIDRef.current) return;

    lastScannedIDRef.current = scannedID;

    checkIDAndShowName(scannedID);

    setTimeout(() => {
      lastScannedIDRef.current = null;
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
        focusMode="on"
        zoomMode="on"
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
            name={torch === 'on' ? 'flashlight-on' : 'flashlight-off'}
            size={32}
            color="#fff"
            style={[
              styles.torch,
              { backgroundColor: torch === 'on' ? '#9265CE' : '#9B9E9C' },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setZoomed(prev => (prev === 1 ? 2.5 : 1));
          }}
        >
          <Icon
            name={zoomed === 2.5 ? 'center-focus-strong' : 'center-focus-weak'}
            size={30}
            color="#fff"
            style={[
              styles.torch,
              { backgroundColor: zoomed === 2.5 ? '#9265CE' : '#9B9E9C' },
            ]}
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
