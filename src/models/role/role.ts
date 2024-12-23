import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity("roles", {schema:"public"})
export class Role {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_rol"})
    public codRol:number;
    @Column({type:"varchar", length:250, name:"nombre_rol", nullable:false})
    public nombreRol:string;
    @Column({type:"integer", name:"estado_rol", default:1, nullable:false})
    public estadoRol:number;

    @OneToMany(()=>User, (objUser) => objUser.codRoleUser, {
        
    })
    public users?:User[];
   
    constructor(codRol:number, nombreRol:string, estadoRol:number){
        this.codRol = codRol;
        this.nombreRol = nombreRol;
        this.estadoRol = estadoRol;
    }
}