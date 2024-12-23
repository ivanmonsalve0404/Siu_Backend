import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../department/department";
import { Site } from "../site/site";

@Entity("towns", {schema:"public"})
export class Town {
    @PrimaryGeneratedColumn({type:"integer", name:"cod_municipio"})
    public codMunicipio:number;
    @Column({type:"varchar", length:250, name:"nombre_municipio", nullable:false})
    public nombreMunicipio:string;
    @Column({type:"varchar", length:250, name:"capital_municipio", nullable:true})
    public capitalMunicipio:string;
    @Column({type:"integer", name:"cod_department", nullable:false})
    public codDepartament:number;

    //Relaciones con Department
    @ManyToOne(()=>Department, (departamento)=> departamento.towns, {
        onDelete:"RESTRICT",
        onUpdate:"CASCADE",
    })

    @JoinColumn([{name:"cod_department", referencedColumnName:"codDepartament"}])
    public codDepartmentoMun ?:Department;

    //Relaciones con Site
    @OneToMany(()=>Site, (site)=> site.codMunicipioSitio)
    public sites ?: Site[];

    constructor(codMuni:number, nombreMuni:string, capitalMuni:string, codDep:number){
        this.codMunicipio = codMuni;
        this.nombreMunicipio = nombreMuni;
        this.capitalMunicipio = capitalMuni;
        this.codDepartament = codDep;
    }
}
