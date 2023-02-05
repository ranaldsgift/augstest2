import type { SkillCard } from '$lib/entities/SkillCard';
import { writable } from 'svelte/store';

const cache = new Map();

export function loadData(userId: string) {
    const store = writable(new Promise<SkillCard[]>(() => []));
    
    const load = async () => {
        if (!cache.has('skillcards')) {
            const response = await fetch(`/api/skillcards?userId=${userId}&heroId=null`, { method: 'GET' });
            const skillCards: SkillCard[] = await response.json();
            cache.set('skillcards', skillCards);
            store.set(Promise.resolve(skillCards));
        } else {
            store.set(Promise.resolve(cache.get('skillcards')));
        }
    }

    load();
    return store;
}