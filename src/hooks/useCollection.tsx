import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { IReturnedData } from "../ts/interfaces";

import firebase from 'firebase/app'; // <~~ Need this for the proper typing ¯\_(ツ)_/¯

type TQueryOptions = [string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, string]
type TFlexibleRef = firebase.firestore.CollectionReference | firebase.firestore.Query; // if query has options it changes the type

export const useCollection = (collection: string, options?: TQueryOptions) => {
  const [documents, setDocuments] = useState<null | IReturnedData[]>(null);
  const [error, setError] = useState<null | string>(null);

  // useRef Stops infinite update 🔄 when setting options[] as a useEffect() dependency
  const query = options ? useRef(options).current : null;


  useEffect(() => { // useEffect will fire as soon as this mounts to the DOM
    let ref: TFlexibleRef = projectFirestore.collection(collection); // if the 🎣 *does* have options, it changes the typing, so...

    if (query) {
      const [fieldPath, opStr, value] = [...query]
      ref = ref.where(fieldPath, opStr, value);
    }
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results: IReturnedData[] = [];

      snapshot.docs.forEach(doc => {
        const docData = { ...doc.data(), id: doc.id } as IReturnedData
        results.push(docData)
      })

      // ...Update State:
      setDocuments(results)
      setError(null);
    }, (err) => {
      setError(handleError(err));
      console.error(err.message);
    })

    //  Unsub on unmount
    return () => unsubscribe()
  }, [collection, query])

  return { documents, error }
}