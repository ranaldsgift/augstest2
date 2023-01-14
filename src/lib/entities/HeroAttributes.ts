import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class HeroAttributes extends BaseEntity {
    constructor(move: number, attack: number, defend: number, skill: number, focus: number, life: number, awakening: number) {
        super();
        this.move = move;
        this.attack = attack;
        this.defend = defend;
        this.skill = skill;
        this.focus = focus;
        this.life = life;
        this.awakening = awakening;
    }

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("smallint")
    move: number

    @Column("smallint")
    attack: number
    
    @Column("smallint")
    defend: number
    
    @Column("smallint")
    skill: number
    
    @Column("smallint")
    focus: number
    
    @Column("smallint")
    life: number
    
    @Column("smallint")
    awakening: number
}