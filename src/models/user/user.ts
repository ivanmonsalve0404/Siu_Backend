import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/role";
import { Access } from "../access/access";
import { Site } from "../site/site";

@Entity("users", { schema: "public" })
export class User {
    @PrimaryGeneratedColumn({type: "integer", name: "cod_user"})
    public codUser:number;

    @Column({type: "integer", name: "cod_role", nullable: false, default: 1})	
    public codRol:number;

    @Column({type: "varchar", length: 250, name: "nombre_user", nullable: false})
    public nombreUser:string;

    @Column({type: "date", name: "fecha_nacimiento_user", nullable: false, default: new Date(Date.now())})
    public fechaNacimientoUser:Date;

    @Column({type: "varchar", length: 20, name: "telefono_user", nullable: false})
    public telefonoUser:string;

    @Column({type: "integer", name: "genero_user", nullable: false})
    public generoUser:number;

    //Relaciones con Role
    @ManyToOne(()=> Role, (objRole : Role) => objRole.users, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    })
    @JoinColumn({name: "cod_role", referencedColumnName: "codRol"})
    public codRoleUser?: Role;

    //Relaciones con Access
    @OneToOne(() => Access, (objAccess : Access) => objAccess.codUserAccess)
    public acceso?: Access[];


    //Relaciones con Site
    @OneToMany(() => Site, (sitio) => sitio.codUsuarioSitio)
    public sitios?: Site[];

    constructor(codUser:number, codRole:number, nombreUser:string, fechaNacimientoUser:Date, telefonoUser:string, generoUser:number){
        this.codUser = codUser;
        this.codRol = codRole;
        this.nombreUser = nombreUser;
        this.fechaNacimientoUser = fechaNacimientoUser;
        this.telefonoUser = telefonoUser;
        this.generoUser = generoUser;
    }
}
