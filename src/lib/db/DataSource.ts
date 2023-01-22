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

let PRIVATE_SUPABASE_HOST = env.PRIVATE_SUPABASE_HOST;
let PRIVATE_SUPABASE_PASSWORD = env.PRIVATE_SUPABASE_PASSWORD;

if (process.env.NODE_ENV === 'production' && process.env.PRIVATE_SUPABASE_HOST && process.env.PRIVATE_SUPABASE_PASSWORD) {
    PRIVATE_SUPABASE_HOST = process.env.PRIVATE_SUPABASE_HOST;
    PRIVATE_SUPABASE_PASSWORD = process.env.PRIVATE_SUPABASE_PASSWORD;
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: PRIVATE_SUPABASE_HOST,
    port: 5432,
    username: "postgres",
    password: PRIVATE_SUPABASE_PASSWORD,
    database: "postgres",
    entities: [ UserHomebrewFavorite, UserRole, User, Homebrew, HeroAbility, HeroActionDice, HeroAttributes, Image, Token, Hero ],
    subscribers: [ EntitySubscriber, AuthoredEntitySubscriber ],
    // For development only
    //synchronize: true,
    //dropSchema: true
    //logging: true,
})