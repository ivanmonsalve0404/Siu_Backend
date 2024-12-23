import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Site } from "../site/site";

@Entity("images", {schema: "public"})
export class Images {
    @PrimaryGeneratedColumn({type: "integer", name: "cod_imagen"})
    public codImagen: number;

    @Column({type: "integer", name: "cod_sitio", nullable: false})
    public codSitio: number;

    @Column({type: "integer", name: "tamanio_imagen", nullable: false})
    public tamanioImagen: number;

    @Column({type: "varchar", name: "formato_imagen", length: 250, nullable: false})
    public formatoImagen: string;

    @Column({type: "integer", name: "favorita_imagen", nullable: false, default: 2})
    public favoritaImagen: number;

    @Column({type: "varchar", name: "nombre_publico_imagen", length: 250, nullable: false})
    public nombrePublicoImagen: string;

    @Column({type: "varchar", name: "nombre_privado_imagen", length: 250, nullable: false})
    public nombrePrivadoImagen: string;

    @ManyToOne(() => Site, (objSite: Site) => objSite.imagenes, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    })

    @JoinColumn({name: "cod_sitio", referencedColumnName: "codSite"})
    public codSitioImagen?: Site;

    public base64Imagen: string;
    constructor(cod: number, codS: number, tam: number, formato: string, favorite: number, nombrePublico: string, nombrePrivado: string){
        this.codImagen = cod;
        this.codSitio = codS;
        this.tamanioImagen = tam;
        this.formatoImagen = formato;
        this.favoritaImagen = favorite;
        this.nombrePublicoImagen = nombrePublico;
        this.nombrePrivadoImagen = nombrePrivado;
    }
}
