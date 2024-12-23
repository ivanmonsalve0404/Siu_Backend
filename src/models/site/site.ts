import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Town } from "../town/town";
import { DetailSite } from "../detail-site/detail-site";
import { User } from "../user/user";
import { Images } from "../images/images";

@Entity("sites", {schema:"public"})
export class Site {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_sitio"})
    public codSite:number;

    @Column({type: "integer", name: "cod_usuario", nullable: false})	
    public codUser:number;

    @Column({type: "integer", name: "cod_municipio", nullable: false})	
    public codTown:number;

    @Column({type:"varchar", length:250, name:"nombre_sitio", nullable:false})
    public nombreSitio:string;
    
    @Column({type:"json", name:"ubicacion_sitio", nullable:false})
    public ubicacionSitio:JSON;

    @Column({type:"text", name:"descripcion_sitio"})
    public areaSitio:string;

    //Relaciones con Town
    @ManyToOne(()=>Town, (municipio)=> municipio.sites, {
        onDelete:"RESTRICT",
        onUpdate:"CASCADE",
    })
    @JoinColumn([{name:"cod_municipio", referencedColumnName:"codMunicipio"}])
    public codMunicipioSitio ?:Town;

    //Relaciones con User
    @ManyToOne(()=>User, (user)=> user.sitios, {
        onDelete:"RESTRICT",
        onUpdate:"CASCADE",
    })
    @JoinColumn([{name: "cod_user", referencedColumnName: "codUser"}])
    public codUsuarioSitio ?: User;

    //Relaciones con DetailSite
    @OneToMany(()=>DetailSite, (detailSite)=> detailSite.codDetalle)
    public details ?: DetailSite[];

    //Relaciones con Image
    @OneToMany(()=>Images, (image)=> image.codSitioImagen)
    public imagenes ?: Images[];

    @OneToMany(()=>Town, (town)=> town.codDepartmentoMun)
    public towns ?: Town[];

    constructor(cod:number, codUser:number, codTown:number, nombreSitio:string, ubicacionSitio:JSON, areaSitio:string){
        this.codSite = cod;
        this.codUser = codUser;
        this.codTown = codTown;
        this.nombreSitio = nombreSitio;
        this.ubicacionSitio = ubicacionSitio;
        this.areaSitio = areaSitio;
    }
}
