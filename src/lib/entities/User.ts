import { Type } from "class-transformer"
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm"
import { Hero } from "./Hero"
import { Homebrew } from "./Homebrew"
import { TimestampedEntity } from "./TimestampedEntity"
import { UserHomebrewFavorite } from "./UserHomebrewFavorite"
import { UserRole } from "./UserRole"

@Entity()
export class User extends TimestampedEntity {
    @PrimaryColumn("uuid")
    public id: string

    @Column("varchar", { unique: true, nullable: true })
    public userName: string
    
    @Type(() => UserRole)
    @ManyToOne(() => UserRole, { eager: true })
    public role: UserRole
    
    @Column("varchar", { nullable: true })
    public avatar: string
    
    @Column("varchar", { nullable: true })
    public discord: string
    
    @Column("varchar", { nullable: true })
    public boardgamegeek: string

    @Type(() => UserHomebrewFavorite)
    @OneToMany(() => UserHomebrewFavorite, (save) => save.user, { eager: true })
    public homebrewFavorites: UserHomebrewFavorite[]

    @Type(() => Homebrew)
    @OneToMany(() => Homebrew, (homebrew) => homebrew.user)
    public homebrews: Homebrew[]

    @Type(() => Hero)
    @OneToMany(() => Hero, (hero) => hero.user)
    public heroes: Hero[]

    getFavorites(): Homebrew[] {
        return this.homebrewFavorites.map((favorite) => favorite.homebrew)
    }

    getFavoriteHeroes(): Hero[] {
        return this.getFavorites().filter((homebrew) => homebrew.type === Hero.name) as Hero[];
    }

    public getBadges(): { icon: string, text: string }[] {
        const badges = [];

        // TODO Replace this date with the release date when out of "beta"
        if (new Date(this.dateCreated).getTime() < new Date().getTime()) {
            badges.push({ icon: "ion:hammer", text: "Founder" });
        }

        switch (this.role.name) {
            case "Admin":
                badges.push({ icon: "eos-icons:admin", text: "Admin" });
                break;
            case "Moderator":
                badges.push({ icon: "mdi:moderator", text: "Moderator" });
                break;
            case "Member":
                badges.push({ icon: "mdi:user", text: "Member" });
                break;
        }

        return badges;
    }
}