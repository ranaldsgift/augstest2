import { Hero } from '$lib/entities/Hero';
import { plainToInstance } from 'class-transformer';
import { writable, type Writable } from 'svelte/store';

const cache = new Map();

export function loadData() {
    const store = writable(new Promise<Hero[]>(() => []));
    
    const load = async () => {
        const response = await fetch('/api/heroes', { method: 'GET' });
        const data = await response.json();

        const heroes = plainToInstance(Hero, data as Hero[]);

        store.set(Promise.resolve(heroes))
    }

    load();
    return store;
}