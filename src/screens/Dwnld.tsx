import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
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

  const handleDownload = async () => {
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
          Download
        </Button>

        {loading ? (
          <View style={styles.loader}>
            <LoaderKitView
              style={{ width: 50, height: 50 }}
              name="BallBeat"
              animationSpeedMultiplier={1.0}
              color="#3B7586"
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
  },
  heading: {
    marginBottom: 20,
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
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
  },
  loader: {
    height:'50%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
