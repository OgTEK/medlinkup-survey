/** localStorage can throw (private mode etc.), so every access is guarded. */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};

export function deviceId(): string {
  let id = store.get('ml_device');
  if (!id) {
    id = crypto.randomUUID();
    store.set('ml_device', id);
  }
  return id;
}
