import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('barcodeapp.db');

export const checkDatabaseConnection = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT 1 FROM sqlite_master LIMIT 1',
        [],
        () => {
          resolve('Conectat la baza de date SQLite!');
        },
        (_, error) => {
          reject(new Error('Eroare la conectarea la baza de date SQLite: ' + error));
        }
      );
    });
  });
};

export const createTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product TEXT,
          barcode TEXT,
          price TEXT,
          currency TEXT,
          category TEXT
        );`,
        [],
        () => {
          resolve('Tabela a fost creată sau există deja');
        },
        (_, error) => {
          reject(new Error('Eroare la crearea tabelei: ' + error));
        }
      );
    });
  });
};

export const getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error('Eroare la preluarea produselor: ' + error));
        }
      );
    });
  });
};

export const insertProduct = async (product) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO products (product, barcode, price, currency, category) VALUES (?, ?, ?, ?, ?)`,
        [product.product, product.barcode, product.price, product.currency, product.category],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error('Eroare la inserarea produsului: ' + error));
        }
      );
    });
  });
};
export const deleteAllProducts = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM products',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(new Error('Eroare la ștergerea produselor: ' + error));
        }
      );
    });
  });
};
export const checkProductByBarcode = async (barcode) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM products WHERE barcode = ?',
        [barcode],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(new Error('Eroare la verificarea produsului după codul de bare: ' + error));
        }
      );
    });
  });
};