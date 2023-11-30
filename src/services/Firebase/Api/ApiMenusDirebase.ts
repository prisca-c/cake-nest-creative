import { Firestore, doc, updateDoc } from 'firebase/firestore';
import { db } from '~@/services/Firebase/Firebase.ts';
import { MenuType } from '@Types/MenuType.ts';

export class ApiMenusFirebase {
  static #db: Firestore = db;

  static async updateMenus(menus: MenuType[], userId: string): Promise<void> {
    const collectionRef = doc(this.#db, 'users', userId);
    return await updateDoc(collectionRef, {
      menus: menus,
    });
  }
}
