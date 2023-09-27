export const calculateTotals = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.13; // 13% tax rate
    const tax = subtotal * taxRate;
    const totalWithTaxes = subtotal + tax;
  
    return {
      subtotal,
      tax,
      totalWithTaxes,
    };
  };
  
  export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  

  export function pluralize(name, count) {
    if (count === 1) {
      return name;
    }
    return name + 's';
  }
  
  export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('shop-shop', 1);
      let db, tx, store;
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore('items', { keyPath: '_id' });
        db.createObjectStore('categories', { keyPath: '_id' });
        db.createObjectStore('cart', { keyPath: '_id' });
      };
  
      request.onerror = function(e) {
        console.log('There was an error');
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log('error', e);
        };
  
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
  
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }