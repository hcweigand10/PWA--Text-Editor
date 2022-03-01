import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the ase');
  const cardsDb = await openDB('cards', 1);
  const tx = cardsDb.transaction('cards', 'readwrite');
  const store = tx.objectStore('cards');
  const request = store.add({ card: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}
  

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const cardsDb = await openDB('cards', 1);
  const tx = cardsDb.transaction('cards', 'readonly');
  const store = tx.objectStore('cards');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
