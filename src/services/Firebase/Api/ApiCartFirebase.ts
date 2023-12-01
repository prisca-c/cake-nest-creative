import { Firestore, doc, updateDoc } from 'firebase/firestore';
import { db } from '~@/services/Firebase/Firebase.ts';
import { CartType } from '@Types/CartType.ts';

export class ApiCartFirebase {
  static #db: Firestore = db;

  static async updateCart(cart: CartType, userId: string): Promise<void> {
    const collectionRef = doc(this.#db, 'users', userId);
    return await updateDoc(collectionRef, {
      cart: cart,
    });
  }
}
