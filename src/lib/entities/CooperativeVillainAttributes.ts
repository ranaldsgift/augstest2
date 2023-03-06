import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class CooperativeVillainAttributes extends BaseEntity {
    constructor(move: number, hits: number, blocks: number, life: number) {
        super();
        this.move = move;
        this.hits = hits;
        this.blocks = blocks;
        this.life = life;
    }

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("smallint")
    move: number

    @Column("smallint")
    hits: number
    
    @Column("smallint")
    blocks: number
    
    @Column("smallint")
    life: number
}