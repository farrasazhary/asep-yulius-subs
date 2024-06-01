const { Firestore } = require("@google-cloud/firestore");

async function getHistories() {
  const db = new Firestore({
    databaseId: "prediction",
  });

  try {
    const snapshot = await db.collection("predictions").get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      history: { ...doc.data() },
    }));
    return data;
  } catch (error) {
    console.error("Error getting histories: ", error);
    throw error;
  }
}

module.exports = getHistories;
