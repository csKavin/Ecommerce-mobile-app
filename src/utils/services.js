import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collections, db, storageBucket } from "../firebase-config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import moment from "moment";
import { removeNullKeys } from "./helpers";
import { query, where, } from "firebase/firestore";

export const getFileURL = async (file, folder, name) => {
  try {
    const uniqueID = Date.now() + Math.floor(Math.random()).toString();
    const fileRef = ref(storageBucket, `/${folder}/${uniqueID}-${name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (err) {
    return `Failed to Generate URL and ${err}`;
  }
};

export const getDataById = async (table, documentId) => {
  const documentRef = doc(db, table, documentId);

  try {
    const document = await getDoc(documentRef);

    if (document.exists()) {
      return { ...document.data(), info: { id: document.id, table } };
    } else {
      throw new Error(`No document found with ID: ${documentId}`);
    }
  } catch (err) {
    return err;
  }
};

export const getDataByDateRange = async (table, startDate, endDate) => {
  let collectionRef = collection(db, table);

  try {
    // Fetch data from Firestore
    const data = await getDocs(collectionRef);
    const actualData = data.docs;
    const newData = [];

    for (let i = 0; i < actualData.length; i++) {
      const doc = actualData[i];
      let datas = { ...doc.data() };

      newData.push({ ...datas, info: { id: doc.id, table } });
    }

    // Apply date filtering if both startDate and endDate are provided
    if (startDate && endDate) {
      // Convert startDate & endDate to timestamps
      const start = new Date(startDate + "T00:00:00Z").getTime(); // Start of the day
      const end = new Date(endDate + "T23:59:59Z").getTime(); // End of the day

      return newData.filter((item) => {
        // Convert createdAt string to timestamp
        const itemDate = item?.createdAt ? new Date(item.createdAt).getTime() : null;
        return itemDate && itemDate >= start && itemDate <= end;
      });
    }

    return newData;
  } catch (err) {
    return err;
  }
};



export const getDataByUserId = async (table, userId) => {
  const tableRef = collection(db, table); // Dynamic table name
  const q = query(tableRef, where("user", "==", userId)); // Query for the 'user' field

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id }); // Include the document ID in the results
      });
      return data;
    } else {
      throw new Error(`No records found in table "${table}" for user: ${userId}`);
    }
  } catch (err) {
    return err.message;
  }
};

export const getData = async (table, userId) => {
  let collectionRef = collection(db, table);

  try {
    const data = await getDocs(collectionRef);

    const actualData = data.docs;
    const newData = [];
    for (let i = 0; i < actualData.length; i++) {
      const doc = actualData[i];
      const hasUser = doc.data()?.user;
      let datas = { ...doc.data() };
      if (hasUser) {
        const userData = await getData(collections.USERS)

        datas["user"] = userData?.find((users) => {
          return users.info.id === hasUser
        })
      }
      newData.push({ ...datas, info: { id: doc.id, table: table } })
    }

    if (userId) {
      return newData.filter((items) => {
        return items?.user?.info?.id === userId;
      });
    } else {
      return newData;
    }
  } catch (err) {
    return err;
  }
};

export const addData = async (table, data, userId) => {
  let dataRef = collection(db, table);

  try {
    const response = await addDoc(
      dataRef,
      removeNullKeys({
        ...data,
        createdAt: moment().utc().format(),
        user: userId,
      })
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateData = async (table, data, docId) => {
  let dataRef = doc(db, table, docId);

  try {
    await updateDoc(dataRef, { ...data, lastUpdated: moment().utc().format() });
  } catch (err) {
    return err;
  }
};

export const deleteData = async (table, docId) => {
  let dataRef = doc(db, table, docId);

  try {
    await deleteDoc(dataRef);
  } catch (err) {
    return err;
  }
};

export const getDocument = async (table, documentId, userId) => {
  let documentRef = doc(db, table, documentId);

  try {
    const data = await getDoc(documentRef);
    const newData = data.data() ? { ...data.data(), info: { id: data.id, table: table } } : [];

    if (userId) {
      return newData.filter((items) => {
        return items?.user === userId;
      });
    } else {
      return newData;
    }
  } catch (err) {
    return err;
  }
}




