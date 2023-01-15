import { writable } from 'svelte/store';

const cache = new Map();

export function loadData() {
    const store = writable(new Promise<string[]>(() => []));
    
    const load = async () => {
        if (!cache.has('keywords')) {
            console.log('Loading keywords');
            const response = await fetch('/api/keywords', { method: 'GET' });
            const keywords: string[] = await response.json();
            const uniqueCapitalizedKeywords = [ ...new Set(keywords.map(keyword => keyword.toLowerCase())) ];
            cache.set('keywords', uniqueCapitalizedKeywords);
            store.set(Promise.resolve(uniqueCapitalizedKeywords));
        } else {
            store.set(Promise.resolve(cache.get('keywords')));
        }
    }

    load();
    return store;
}