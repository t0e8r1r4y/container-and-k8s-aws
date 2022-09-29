import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({default:null})
    title: string;

    @Column({default:null})
    year: number;

    // @Column({default:null})
    genres: string[]
}
