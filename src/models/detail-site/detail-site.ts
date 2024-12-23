import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Site } from "../site/site";
import { Detail } from "../detail/detail";

@Entity("detail_site", {schema:"public"})
export class DetailSite {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_detalle_sitio"})
    public codDetalleSitio:number;

    @Column({type: "integer", name: "cod_detalle", nullable: false})	
    public codDetalle:number;
    @Column({type: "integer", name: "cod_sitio", nullable: false})	
    public codSitio:number;

    @Column({type:"text", name:"valor_detalle_sitio", nullable:false})
    public valorDetalleSitio:string;

    //Relaciones con Site
    @ManyToOne(()=>Site, (sitios)=> sitios.details, {
        onDelete:"RESTRICT",
        onUpdate:"CASCADE",
    })

    @JoinColumn([{name:"cod_sitio", referencedColumnName:"codSite"}])
    public codSitioDetalle ?:Site;

    //Relaciones son Detail
    @ManyToOne(()=>Detail, (detalle)=> detalle.details, {
        onDelete:"RESTRICT",
        onUpdate:"CASCADE",
    })

    @JoinColumn([{name:"cod_detalle", referencedColumnName:"codDetalle"}])
    public codDetalleDetalle ?:Detail;

    constructor(codDetalleSitio:number, codDetalle:number, codSitio:number, valorDetalleSitio:string){
        this.codDetalleSitio = codDetalleSitio;
        this.codDetalle = codDetalle;
        this.codSitio = codSitio;
        this.valorDetalleSitio = valorDetalleSitio;
    }
}
