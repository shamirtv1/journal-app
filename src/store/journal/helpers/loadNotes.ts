import {collection, getDocs} from "firebase/firestore/lite";
import {FirebaseDB} from "../../../firebase/config.ts";

export const loadNotesData = async (uid: string = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes: any[] = [];
    docs.forEach(doc => {
        notes.push({ ...doc.data(), id: doc.id });
    })

    return notes;

}