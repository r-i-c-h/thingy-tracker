import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";
import { IReturnedData } from "../ts/interfaces";


export const useCollection = (collection: string) => {

  const [documents, setDocuments] = useState<null | IReturnedData[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => { // useEffect means this will fire as soon as it mounts to the DOM
    let ref = projectFirestore.collection(collection);

    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results: IReturnedData[] = [];

      snapshot.docs.forEach(doc => {
        const docData = { ...doc.data(), id: doc.id } as IReturnedData
        results.push(docData)
      })

      // Update State:
      setDocuments(results)
      setError(null);
    }, (err) => {
      setError(handleError(err));
      console.log(err.message);
    })

    //  Unsub on unmoun:t
    return () => unsubscribe()
  }, [collection])

  return { documents, error }

}