import { Hero } from "$lib/entities/Hero";
import { SkillCard } from "$lib/entities/SkillCard";
import { Villain } from "$lib/entities/Villain";
import { writable, type Writable } from "svelte/store";

export const SkillCardCreateStore: Writable<SkillCard> = writable(new SkillCard())
export const SkillCardEditStore: Writable<Map<number, SkillCard>> = writable(new Map())
export const HeroCreateStore: Writable<Hero> = writable(new Hero())
export const HeroEditStore: Writable<Map<number, Hero>> = writable(new Map())
export const VillainEditStore: Writable<Map<number, Villain>> = writable(new Map())
export const VillainCreateStore: Writable<Villain> = writable(new Villain())

export const HeroesPageStore: Writable<any> = writable()
export const SkillCardsPageStore: Writable<any> = writable()
export const VillainsPageStore: Writable<any> = writable()