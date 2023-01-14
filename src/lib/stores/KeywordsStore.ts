import { writable } from 'svelte/store';

const cache = new Map();

export function loadData() {
    const store = writable(new Promise<string[]>(() => []));
    
    const load = async () => {
        const response = await fetch('/api/keywords', { method: 'GET' });
        const keywords: string[] = await response.json();
        const uniqueCapitalizedKeywords = [ ...new Set(keywords.map(keyword => keyword.toLowerCase())) ];
        store.set(Promise.resolve(uniqueCapitalizedKeywords))
    }

    load();
    return store;
}