const { initializeApp } = require("firebase/app");
const { getFirestore, doc, runTransaction, getDocs, collection } = require("firebase/firestore");
const { firebaseConfig } = require('./config.json');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addChips(chips, userID) {
  const userRef = doc(db, "users", userID);

  try {
    const res = await runTransaction(db, async (transaction) => {
      const user = await transaction.get(userRef);
      if (!user.exists()) {
        transaction.set(userRef, { chips: chips });
        console.log("add user");
      }
      else{
        transaction.update(userRef, {
          chips: Math.round((user.data().chips + chips + Number.EPSILON) * 100000000) / 100000000
        });
        console.log("update user");
        return user.data().chips + chips;
      }
    });
    console.log("Transaction successfully committed!");
    return res;
  } catch (error) {
    console.log("Transaction failed: ", error);
  }
};

async function removeChips(chips, userID) {
  const userRef = doc(db, "users", userID);

  try {
    const res = await runTransaction(db, async (transaction) => {
      const user = await transaction.get(userRef);
      if (!user.exists()) {
        console.log("user not found");
        return -1;
      }
      else{
        if (user.data().chips < chips){
          console.log("not enough chips");
          return -1;
        }
        transaction.update(userRef, {
          chips: user.data().chips - chips
        });
        console.log("update user");
        return user.data().chips - chips;
      }
    });
    return res;
  } catch (error) {
    console.log("Transaction failed: ", error);
  }
}

async function getAllBalances() {
  const balances = [];
  const snapshot = await getDocs(collection(db, 'users'));
  snapshot.forEach(doc => {
    balances.push({ id: `<@${doc.id}>`, chips: doc.data().chips });
  });
  return balances;
}

async function getAdmins() {
  const admins = [];
  const snapshot = await db.collection('admins').get();
  snapshot.forEach(doc => {
    admins.push(doc.id);
  });
  return admins;
}

module.exports = { addChips, removeChips, getAllBalances, getAdmins };
