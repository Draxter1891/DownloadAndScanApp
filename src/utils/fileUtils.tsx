import { Alert } from 'react-native';
import RNFS from 'react-native-fs';


export const downloadAndParseFile = async (url: string) => {
   

  const tempPath = `${RNFS.DocumentDirectoryPath}/people.txt`;
  let content = '';

  
  const fileExists = await RNFS.exists(tempPath);
  if (!fileExists) {
    const result = await RNFS.downloadFile({ fromUrl: url, toFile: tempPath })
      .promise;
    if (result.statusCode !== 200) {
      throw new Error('Download failed');
    }
  }
  content = await RNFS.readFile(tempPath, 'utf8');
  // const publicPath = `${RNFS.DownloadDirectoryPath}/people.txt`

  // const content = await RNFS.readFile(tempPath, 'utf8');

  // await RNFS.moveFile(tempPath,publicPath);
  // Alert.alert('file moved to downloads',publicPath)

  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  return lines.map(line => {
    const [name, id] = line.split(',');
    return { name: name.trim(), id: id.trim() };
  });
};
