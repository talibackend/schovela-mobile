import SQLite from 'react-native-sqlite-storage';

// Open a database
export default instance = SQLite.openDatabase({
  name: 'database.db',
  location: 'default',
});