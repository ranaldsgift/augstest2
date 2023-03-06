import type { Hero } from "$lib/entities/Hero";
import type { SkillCard } from "$lib/entities/SkillCard";
import type { Villain } from "$lib/entities/Villain";
import { AsyncStore } from "./AsyncStore";

export const SkillCards = new AsyncStore<SkillCard>('/api/skills');
export const Keywords = new AsyncStore<string>('/api/keywords');
export const Heroes = new AsyncStore<Hero>('/api/heroes');
export const Villains = new AsyncStore<Villain>('/api/villains');