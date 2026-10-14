/** localStorage that never throws (private windows, blocked storage, etc.). */
export const store = {
  get(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch { /* ignore */ }
  },
  remove(key: string) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};

export function getDeviceId(): string {
  let id = store.get('mlu_device');
  if (!id) {
    id = crypto.randomUUID();
    store.set('mlu_device', id);
  }
  return id;
}

export function captureRef(): string {
  const fromUrl = new URLSearchParams(window.location.search).get('ref')?.toUpperCase().trim() ?? '';
  if (/^[A-Z0-9]{4,12}$/.test(fromUrl)) {
    store.set('mlu_ref', fromUrl);
    return fromUrl;
  }
  return store.get('mlu_ref') ?? '';
}
