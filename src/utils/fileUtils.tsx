import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

export const downloadAndParseFile = async (url: string) => {
  const tempPath = `${RNFS.DocumentDirectoryPath}/people.txt`;
  const publicPath = `${RNFS.DownloadDirectoryPath}/people.txt`

  const result = await RNFS.downloadFile({ fromUrl: url, toFile: publicPath })
    .promise;

  if (result.statusCode !== 200) {
    throw new Error('Download failed');
  }

  // await RNFS.moveFile(tempPath,publicPath);
  // Alert.alert('file moved to downloads',publicPath)

  const content = await RNFS.readFile(publicPath, 'utf8');


  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  return lines.map(line => {
    const [name, id] = line.split(',');
    return { name: name.trim(), id: id.trim() };
  });
};
