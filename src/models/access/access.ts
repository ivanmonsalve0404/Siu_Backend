import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/user";

@Entity("access", {schema:"public"})
export class Access {
    @PrimaryColumn({type:"integer", name:"cod_user", nullable:false})
    public codUser:number;
    @Column({type:"varchar", length:250, name:"nombre_access", nullable:false})	
    public nombreAccess:string;
    @Column({type:"varchar", length:250, name:"clave_access", nullable:false})
    public claveAccess:string;

    @OneToOne(() => User, (objUser) => objUser.acceso, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    })

    @JoinColumn({name: "cod_user", referencedColumnName: "codUser"})
    public codUserAccess: User;

    constructor(cod:number, nombre:string, clave:string){
        this.codUser = cod;
        this.nombreAccess = nombre;
        this.claveAccess = clave;
    }
}
