import { AugsLicensesEnum } from "$lib/enums/Enums"
import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum"
import { Type } from "class-transformer"
import { Column, ChildEntity, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { CompetitiveVillain } from "./CompetitiveVillain"
import { CooperativeVillain } from "./CooperativeVillain"
import { Homebrew } from "./Homebrew"
import { Image } from "./Image"
import { Token } from "./Token"
import { User } from "./User"

@ChildEntity()
export class Villain extends Homebrew {
    constructor(userId?: string) {
        super()
        this.augsLicense = AugsLicensesEnum.Homebrew;
        this.theme = ThemeTemplatesEnum.TMNT;
        this.backgroundColor = "#777777";

        if (userId) {
            this.user = new User();
            this.user.id = userId;
        }
        
        this.iconImage = new Image();
        this.image = new Image();
    }
    
    @Column({
        type: "enum",
        enum: ThemeTemplatesEnum,
        default: ThemeTemplatesEnum.TMNT
    })
    theme: ThemeTemplatesEnum

    @Type(() => Token)
    @OneToOne(type => Token, { eager: true, nullable: true, cascade: true })
    @JoinColumn()
    token: Token

    @Type(() => Image)
    @ManyToOne(type => Image, { eager: true, cascade: true })
    iconImage: Image

    @Type(() => Image)
    @OneToOne(type => Image, { eager: true, cascade: true })
    @JoinColumn()
    image: Image

    @Type(() => CompetitiveVillain)
    @OneToOne(type => CompetitiveVillain, { eager: true, cascade: true })
    @JoinColumn()
    competitive: CompetitiveVillain | null

    @Type(() => CooperativeVillain)
    @OneToOne(type => CooperativeVillain, { eager: true, cascade: true })
    @JoinColumn()
    cooperative: CooperativeVillain | null

    @Column("smallint", { nullable: true })
    fontSizeVillainName: number
    
    @Column("smallint", { nullable: true })
    fontSizeKeywords: number

    @Column("varchar", { array: true })
    keywords: string[]

    @Column("varchar")
    backgroundColor: string

    public isValid(): boolean {
        return this.validityErrors().length == 0;
    }

    public validityErrors(): string {
        const errors = [];

        const missingFields = [];

        if (!this.name) {
            missingFields.push('Name');
        }
        if (!this.keywords || this.keywords.length == 0) {
            missingFields.push('Keywords');
        }
        if (!this.image || this.image.url?.length == 0) {
            missingFields.push('Image')
        }
        if (!this.iconImage || this.iconImage.url?.length == 0) {
            missingFields.push('Icon Image')
        }
        missingFields.forEach((field, index) => {
            errors.push(`${field}${index < missingFields.length - 1 ? ', ' : ''}`);
        });
        if (!this.cooperative && !this.competitive) {
            errors.push('</br>Missing Cooperative or Competitive Villain');
        }

        if (this.cooperative && !this.cooperative.isValid()) {
            errors.push('</br>');
            errors.push(`Cooperative Villain ${this.cooperative.validityErrors()}`);
        }
        if (this.competitive && !this.competitive.isValid()) {
            errors.push('</br>');
            errors.push(`Competitive Villain ${this.competitive.validityErrors()}`);
        }
        return errors.join('');
    }
}