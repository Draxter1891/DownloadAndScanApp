import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Provider as PaperProvider,
  Button,
  Text,
  Card,
} from 'react-native-paper';
import { downloadAndParseFile } from '../utils/fileUtils';
import CustomModal from '../components/CustomModal';
import { LoaderKitView } from 'react-native-loader-kit';

type Data = {
  name: string;
  id: string;
};

const FILE_URL =
  'https://drive.google.com/uc?export=download&id=1VdkI79qV29X4nMnfAvgx6nL55EYw17Nk';

const Dwnld = () => {
  const [pressed, setPressed] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasPermission, setHasPermission] = useState(false);



  const handleDownload = async () => {
  // Ask for permission only when button is pressed
  if (Platform.OS === 'android') {
    let granted;
    try {
      if (Platform.Version >= 33) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setErrorMessage('Storage permission denied.');
        setVisible(true);
        return;
      }
    } catch (err) {
      console.warn('Permission error:', err);
      setErrorMessage('Permission request failed.');
      setVisible(true);
      return;
    }
  }

  // Proceed with download if permission granted or iOS
  setLoading(true);
  try {
    const result = await downloadAndParseFile(FILE_URL);
    setData(result);
  } catch (err: any) {
    setErrorMessage(err?.message || 'Something went wrong.');
    setVisible(true);
  } finally {
    setLoading(false);
  }
};


  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.heading}>
          Download Page
        </Text>

        <Button
          mode="contained-tonal"
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={[
            styles.btn,
            {
              padding: pressed ? 2 : 0,
              borderRadius: pressed ? 25 : 20,
            },
          ]}
          onPress={handleDownload}
        >
          <Text style={{color:'#9265CE',fontWeight:'bold'}}>Download</Text>
        </Button>

        {loading ? (
          <View style={styles.loader}>
            <LoaderKitView
              style={{ width: 50, height: 50 }}
              name="BallBeat"
              animationSpeedMultiplier={1.0}
              color="#D5CEDB"
            />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium">Name: {item.name}</Text>
                  <Text variant="bodyMedium">ID: {item.id}</Text>
                </Card.Content>
              </Card>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>No data downloaded</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        {visible && (
          <CustomModal
            visible={visible}
            title="Please Retry"
            message={errorMessage}
            onCancel={() => setVisible(false)}
            onConfirm={() => setVisible(false)}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Dwnld;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#0F0D11'
  },
  heading: {
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: '#EFC3F9',
    alignSelf: 'center',
    elevation: 4,
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    width: '100%',
    shadowColor: '#fff',
    elevation: 2,
    shadowOffset:{width:0,height:2},
    shadowRadius:2,
    shadowOpacity:0.7
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  loader: {
    height:'50%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
