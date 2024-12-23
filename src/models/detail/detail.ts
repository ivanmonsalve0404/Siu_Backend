import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailSite } from "../detail-site/detail-site";

@Entity("detail", {schema:"public"})
export class Detail {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_detalle"})
    public codDetalle:number;
    @Column({type:"varchar", length:250, name:"nombre_detalle", nullable:false})
    public nombreDetalle:string;
    @Column({type:"text", name:"descripcion_detalle", nullable:false})
    public descripcionDetalle:string;

    //Relaciones con DetailSite
    @OneToMany(()=>DetailSite, (detailSite)=> detailSite.codDetalle)
    public details ?: DetailSite[];
    
    constructor(codDetalle:number, nombreDetalle:string, descripcionDetalle:string){
        this.codDetalle = codDetalle;
        this.nombreDetalle = nombreDetalle;
        this.descripcionDetalle = descripcionDetalle;
    }
}
