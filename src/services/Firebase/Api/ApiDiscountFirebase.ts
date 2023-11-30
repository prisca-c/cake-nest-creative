import { Firestore, doc, updateDoc } from 'firebase/firestore';
import { db } from '~@/services/Firebase/Firebase.ts';
import { DiscountType } from '@Types/DiscountType.ts';

export class ApiDiscountFirebase {
  static #db: Firestore = db;

  static async updateDiscount(
    discounts: DiscountType[],
    userId: string,
  ): Promise<void> {
    const collectionRef = doc(this.#db, 'users', userId);
    return await updateDoc(collectionRef, {
      discounts: discounts,
    });
  }
}
