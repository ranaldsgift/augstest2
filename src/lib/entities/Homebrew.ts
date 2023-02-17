import { AugsLicensesEnum } from "$lib/enums/Enums";
import { Type } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, OneToMany, BeforeUpdate } from "typeorm"
import { AuthoredEntity } from "./AuthoredEntity";
import { UserHomebrewFavorite } from "./UserHomebrewFavorite";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Homebrew extends AuthoredEntity {
    @BeforeUpdate()
    updateTimestamp() {
        this.dateModified = new Date();
        return this;
    }

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar")
    name: string
    
    @Column("text", { nullable: true })
    description: string
    
    @Column("varchar", { nullable: true })
    originalImage: string
    
    @Column({
        type: "enum",
        enum: AugsLicensesEnum,
        default: AugsLicensesEnum.Homebrew
    })
    augsLicense: AugsLicensesEnum

    @Type(() => UserHomebrewFavorite)
    @OneToMany(() => UserHomebrewFavorite, (favorite) => favorite.homebrew)
    public userFavorites: UserHomebrewFavorite[]

    @Column("varchar")
    public type: string
}