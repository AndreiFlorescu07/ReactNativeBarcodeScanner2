import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { insertProduct } from './dbConnection';
import { getAllProducts } from './dbConnection';

export default function AddProduct() {
  const [product, setProduct] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [category, setCategory] = useState('');


  const handleInsertProduct = () => {
    if (product && barcode && price && currency && category ) {
      const newProduct = {
        product: product,
        barcode: barcode,
        price: price,
        currency: currency,
        category: category,
        
      };

      insertProduct(newProduct)
        .then(() => {
          alert('Produsul a fost inserat în baza de date!');
          setProduct('');
          setBarcode('');
          setPrice('');
          setCurrency('');
          setCategory('');
          
        })
        .catch((error) => {
          console.error(error);
          alert('Eroare la inserarea produsului în baza de date!');
        });
    } else {
      alert('Te rugăm să completezi toate câmpurile!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nume produs"
        value={product}
        onChangeText={(text) => setProduct(text)}
        placeholderTextColor="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Cod de bare"
        value={barcode}
        onChangeText={(text) => setBarcode(text)}
        keyboardType="numeric"
        placeholderTextColor="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Preț"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
        placeholderTextColor="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Monedă"
        value={currency}
        onChangeText={(text) => setCurrency(text)}
        placeholderTextColor="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Categorie"
        value={category}
        onChangeText={(text) => setCategory(text)}
        placeholderTextColor="#FFFFFF"
      />
    
      <TouchableOpacity style={styles.button} onPress={handleInsertProduct}>
        <Text style={styles.buttonText}>Inserare produs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#983dd9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
