import { Column, ChildEntity } from "typeorm"
import { Homebrew } from "./Homebrew"

@ChildEntity()
export class Token extends Homebrew {
    @Column("varchar")
    image: string

    @Column("smallint")
    gridSizeX: number

    @Column("smallint")
    gridSizeY: number
}