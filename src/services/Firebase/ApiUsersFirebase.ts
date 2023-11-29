import { db } from '~@/services/Firebase/Firebase.ts';
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { UserType } from '@Types/UserType.ts';

export class ApiUsersFirebase {
  static #db: Firestore = db;

  static async getUser(userId: string): Promise<DocumentData | null> {
    const collectionRef = doc(this.#db, 'users', userId);
    const result = await getDoc(collectionRef);
    if (result.exists()) {
      return result.data();
    }
    return null;
  }

  static async createUser(userInfo: UserType): Promise<void> {
    const collectionRef = doc(this.#db, 'users', userInfo.id);
    const info: UserType = {
      id: userInfo.id,
      username: userInfo.username,
      isAdmin: false,
      menu: userInfo.menu,
      cart: userInfo.cart,
    };

    return await setDoc(collectionRef, info);
  }

  static async updateUser(userInfo: UserType): Promise<void> {
    const collectionRef = doc(this.#db, 'users', userInfo.id);
    const info: UserType = {
      id: userInfo.id,
      username: userInfo.username,
      isAdmin: userInfo.isAdmin,
      menu: userInfo.menu,
      cart: userInfo.cart,
    };

    return await setDoc(collectionRef, info);
  }

  static async users(): Promise<DocumentData[]> {
    const collectionRef = collection(this.#db, 'users');
    const result = await getDocs(collectionRef);
    if (result.empty) return [];
    return result.docs.map((doc) => doc.data());
  }

  static async checkIfUserExists(
    username: string,
  ): Promise<DocumentData | null> {
    const q = query(
      collection(this.#db, 'users'),
      where('username', '==', username),
    );
    const result = await getDocs(q);
    if (result.empty) return null;
    return result.docs[0].data();
  }
}
