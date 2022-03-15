import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { handleError } from "../ts/ErrorHandler";

type Action = { type: 'IS_PENDING', payload: null } | { type: 'ADDED_DOCUMENT', payload: NewDocument } | { type: 'ERROR', payload: string }

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
      return { ...state, document: null, error: null, isPending: true, success: false }
    case 'ERROR':
      return { ...state, document: null, error: action.payload, isPending: false, success: false }
    case 'ADDED_DOCUMENT':
      return { ...state, document: action.payload, error: null, isPending: false, success: true }
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
    await dispatch({ type: 'IS_PENDING', payload: null })

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocumentRef: unknown = await ref.add({ ...doc, createdAt });
      const newDoc = addedDocumentRef as NewDocument // <~~ Makes TS Happy ＜(。_。)＞

      await dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: newDoc })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: handleError(err) })
    }
  }

  const deleteDocument = async (id: string) => {
    await ref.doc(id).delete();
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}