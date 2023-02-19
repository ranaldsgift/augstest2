import type { Hero } from "$lib/entities/Hero";
import type { SkillCard } from "$lib/entities/SkillCard";
import { AsyncStore } from "./AsyncStore";

export const SkillCards = new AsyncStore<SkillCard>('/api/skills');
export const Keywords = new AsyncStore<string>('/api/keywords');
export const Heroes = new AsyncStore<Hero>('/api/heroes');