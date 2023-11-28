import SQLite from 'react-native-sqlite-storage';

export default instance = SQLite.openDatabase({
  name: 'database.db',
  location: 'default',
});

SQLite.enablePromise(true);