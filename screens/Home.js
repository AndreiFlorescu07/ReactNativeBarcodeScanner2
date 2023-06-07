import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ScrollView, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { checkDatabaseConnection, getAllProducts, deleteAllProducts } from './dbConnection';

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.rows._array);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);

    return unsubscribe;
  }, [navigation, loadProducts]);

  const handleScanPress = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('Scanner');
    } else {
      alert('Camera permission denied');
    }
  };

  const handleDBConnectionPress = async () => {
    try {
      await checkDatabaseConnection();
      alert('Conectat la baza de date SQLite!');
    } catch (error) {
      alert('Eroare la conectarea la baza de date SQLite!');
      console.error(error);
    }
  };

  const handleAddProductPress = () => {
    navigation.navigate('AddProduct');
  };

  const handleDeleteAllProducts = () => {
    deleteAllProducts()
      .then(() => {
        alert('Toate produsele au fost șterse din tabelă!');
        loadProducts(); // Reîncarcă produsele după ștergerea lor
      })
      .catch((error) => {
        console.error(error);
        alert('Eroare la ștergerea produselor din tabelă!');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.scanButton}
        onPress={handleScanPress}
        underlayColor="#FFD700"
      >
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.addButton}
        onPress={handleAddProductPress}
        underlayColor="#FFD700"
      >
        <Text style={styles.addButtonText}>Adaugă produs</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.deleteButton}
        onPress={handleDeleteAllProducts}
        underlayColor="#FFD700"
      >
        <Text style={styles.deleteButtonText}>Șterge toate produsele(!)</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.scanButton}
        onPress={handleDBConnectionPress}
        underlayColor="#FFD700"
      >
        <Text style={styles.scanButtonText}>Verifica conexiunea cu DB!</Text>
      </TouchableHighlight>

      <ScrollView style={styles.productListContainer}>
        <View style={styles.productList}>
          {products.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Text style={[styles.productText, styles.column]}>{product.id}</Text>
              <Text style={[styles.productText, styles.column]}>{product.product}</Text>
              <Text style={[styles.productText, styles.column]}>{product.barcode}</Text>
            
              <Text style={[styles.productText, styles.column]}>{product.price}</Text>

              <Text style={[styles.productText, styles.column]}>{product.currency}</Text>
              <Text style={[styles.productText, styles.column]}>{product.category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#983dd9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  productList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  productText: {
    flex: 1,
    fontSize: 16,
  },
  column: {
    width: windowWidth / 6,
    textAlign: 'center',
  },
});
