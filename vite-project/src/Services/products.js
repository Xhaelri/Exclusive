import { db } from "../Services/UserAuthFirebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const getProductById = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    const snapshot = await getDoc(productDoc);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return { 
        id: snapshot.id, 
        ...data, 
        price: parseFloat(data.price) || 0, // تحويل السعر إلى رقم
        createAt: data.createAt ? data.createAt.toDate().toISOString() : null 
      };
    } else {
      console.error("Product not found with ID:", id);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, orderBy("createAt", "desc"));
    const snapshot = await getDocs(q);

    const products = snapshot.docs.map((doc) => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data, 
        price: parseFloat(data.price) || 0, // تحويل السعر إلى رقم
        createAt: data.createAt ? data.createAt.toDate().toISOString() : null 
      };
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const addProduct = async (product) => {
  try {
    const productsCollection = collection(db, "products");
    const docRef = await addDoc(productsCollection, { 
      ...product, 
      createAt: serverTimestamp(),
      price: parseFloat(product.price) || 0 // تحويل السعر إلى رقم عند الإضافة
    });

    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

const updateProduct = async (id, product) => {
  try {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, { 
      ...product, 
      price: parseFloat(product.price) || 0, // تحويل السعر إلى رقم عند التحديث
      createAt: serverTimestamp()
    });

    return { id, ...product };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    return id;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
