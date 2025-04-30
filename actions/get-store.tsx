import { Store } from '@/types';

async function getStore() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/stores/username/${process.env.STORE_USERNAME}`, { cache: "no-store" });
      if (!res.ok) {
        return null;
      }
      return res.json();
    } catch (error) {
      return null;
    }
  }

export default getStore;