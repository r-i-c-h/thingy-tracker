import { useEffect, useReducer, useState } from "react";
import { firebase, projectFirestore, timestamp } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";

type Action =
  | { type: 'IS_PENDING' }
  | { type: 'ADDED_DOCUMENT', payload: NewDocument }
  | { type: 'ERROR', payload: string }

type NewDocument = {
  amount: string | number;
  createdAt?: Date
  name: string;
  uid: string;
}

type State = {
  document: null | NewDocument;
  error: null | string; //** Skipping unknown because `handleError()` will return a string */
  isPending: boolean;
  success: null | boolean;
}

let initialState: State = {
  document: null,
  error: null,
  isPending: false,
  success: null,
}

const firestoreReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        ...state,
        isPending: true,
        document: null, success: false, error: null // <~~ Resets
      }
    case 'ADDED_DOCUMENT':
      return {
        ...state,
        isPending: false, document: action.payload, success: true, error: null
      }
    case 'ERROR':
      return {
        ...state,
        isPending: false, document: null, success: false, error: action.payload
      }
    default:
      return state
  }
}
export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Fbase Collection:
  const ref = projectFirestore.collection(collection);

  // Util checks that component is still mounted and hasn't left the DOM
  const dispatchIfNotCancelled = (action: Action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  const addDocument = async (doc: NewDocument) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const createdAt = timestamp.fromDate(new Date());
      const res = await ref.add({ ...doc, createdAt }); // doc is {name,amount}

      if (res) {
        dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: doc })
      }
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  const deleteDocument = async (id: string) => {
    await ref.doc(id).delete();
  }

  useEffect(() => {
    return () => setIsCancelled(true) //
  }, [])

  return { addDocument, deleteDocument, response }
}