import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Town } from "../town/town";

@Entity("departments", {schema:"public"})
export class Department {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_department"})
    public codDepartament: number;
    @Column({type:"varchar", name:"name_department", length: 250, nullable:false})
    public nameDepartment: string;

//Relaciones con Town
    @OneToMany(()=>Town, (town)=> town.codDepartmentoMun)
    public towns ?: Town[];
}