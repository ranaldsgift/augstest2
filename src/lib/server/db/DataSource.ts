import { Hero } from '$lib/entities/Hero';
import { HeroAbility } from '$lib/entities/HeroAbility';
import { HeroActionDice } from '$lib/entities/HeroActionDice';
import { HeroAttributes } from '$lib/entities/HeroAttributes';
import { Homebrew } from '$lib/entities/Homebrew';
import { Image } from '$lib/entities/Image';
import { Token } from '$lib/entities/Token';
import { User } from '$lib/entities/User';
import { UserRole } from '$lib/entities/UserRole';
import { DataSource } from 'typeorm';
import { env } from '$env/dynamic/private'
import { AuthoredEntitySubscriber } from '$lib/entities/subscribers/AuthoredEntitySubscriber';
import { EntitySubscriber } from '$lib/entities/subscribers/EntitySubscriber';
import { UserHomebrewFavorite } from '$lib/entities/UserHomebrewFavorite';
import { SkillCard } from '$lib/entities/SkillCard';
import { Villain } from '$lib/entities/Villain';
import { VillainAbilityCard } from '$lib/entities/VillainAbilityCard';
import { CompetitiveVillain } from '$lib/entities/CompetitiveVillain';
import { CompetitiveVillainAbility } from '$lib/entities/CompetitiveVillainAbility';
import { CompetitiveVillainAttributes } from '$lib/entities/CompetitiveVillainAttributes';
import { CooperativeVillain } from '$lib/entities/CooperativeVillain';
import { CooperativeVillainAbility } from '$lib/entities/CooperativeVillainAbility';
import { CooperativeVillainAttributes } from '$lib/entities/CooperativeVillainAttributes';
//import { VillainAbilityCardEffect } from '$lib/entities/VillainAbilityCardEffect';
//import { VillainAbilityCardFigureAction } from '$lib/entities/VillainAbilityCardFigureAction';
//import { VillainAbilityCardFigureActivation } from '$lib/entities/VillainAbilityCardFigureActivation';

let PRIVATE_SUPABASE_HOST = env.PRIVATE_SUPABASE_HOST;
let PRIVATE_SUPABASE_PASSWORD = env.PRIVATE_SUPABASE_PASSWORD;

if (process.env.NODE_ENV === 'production' && process.env.PRIVATE_SUPABASE_HOST && process.env.PRIVATE_SUPABASE_PASSWORD) {
    PRIVATE_SUPABASE_HOST = process.env.PRIVATE_SUPABASE_HOST;
    PRIVATE_SUPABASE_PASSWORD = process.env.PRIVATE_SUPABASE_PASSWORD;
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: PRIVATE_SUPABASE_HOST,
    port: 6543,
    username: "postgres.xrbfqjwtfrohmaudahlh",
    password: PRIVATE_SUPABASE_PASSWORD,
    database: "postgres",
    entities: [ 
        UserHomebrewFavorite, 
        UserRole, 
        User, 
        Homebrew,
        HeroAbility, 
        HeroActionDice, 
        HeroAttributes, 
        CompetitiveVillainAbility,
        CompetitiveVillainAttributes,
        CooperativeVillainAbility,
        CooperativeVillainAttributes,
        Image, 
        Token, 
        Hero, 
        SkillCard, 
        CompetitiveVillain,
        CooperativeVillain,
        Villain, 
        VillainAbilityCard
        //VillainAbilityCardEffect,
        //VillainAbilityCardFigureAction,
        //VillainAbilityCardFigureActivation,
    ],
    subscribers: [ EntitySubscriber, AuthoredEntitySubscriber ],
    // For development only
    //synchronize: true,
    //dropSchema: true
    //logging: true,
})