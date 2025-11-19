export const storageKey = 'ckb-user';

export function getStoredUser() {
  try {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn('Unable to read auth state from storage', error);
    return null;
  }
}

export function persistUser(value) {
  try {
    if (value) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } else {
      localStorage.removeItem(storageKey);
    }
  } catch (error) {
    console.warn('Unable to persist auth state', error);
  }
}

