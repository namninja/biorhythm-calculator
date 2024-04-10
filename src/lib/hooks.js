import { useState } from 'react'

export function useStoredState(storageKey, defaultState) {
  function getInitialState() {
    const storedState = localStorage.getItem(storageKey)
    return storedState ?? defaultState
  }
  const [state, setState] = useState(getInitialState)
  function setAndStoreState(state) {
    setState(state);
    localStorage.setItem(storageKey, state)
  }
  return [state, setAndStoreState]
}