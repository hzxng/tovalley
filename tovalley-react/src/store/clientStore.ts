import { create } from 'zustand'
import { Client } from '@stomp/stompjs'

interface ClientStore {
  client: Client | null
  setClient: (newClient: Client | null) => void
}

const useClientStore = create<ClientStore>((set) => ({
  client: null,
  setClient: (newClient) => set({ client: newClient }),
}))

export default useClientStore
