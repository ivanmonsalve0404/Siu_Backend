import {mkdirSync, readdir, unlink, writeFile} from "fs";
import * as sharp from "sharp";

class AdminImages {
    public static agregarImagen(nombrePrivadoImagen: string, base64: string, rutaAlmacenamiento: string): void {
        let decodificacion = base64.replace(/^data:image\/\w+;base64,/, "");
        readdir(rutaAlmacenamiento, (myError)=> {  //Si existe la carpeta continua
            if (myError) {
                mkdirSync(rutaAlmacenamiento, {recursive: true}) //Si no, la crea
            }
        });
        writeFile(rutaAlmacenamiento + nombrePrivadoImagen, decodificacion, {encoding: "base64"}, ()=>{}); //Crea la imagen o la almacena
    }

    public static removerImagen(nombrePrivadoImagen: string, rutaAlmacenamiento: string): void {
        unlink(rutaAlmacenamiento + nombrePrivadoImagen, (noEncontrada)=> {
            if(noEncontrada){
                console.log("Fallo al eliminar la imagen");
                
            }
        })
    }

    public static gestionarTamanoImagen(nombrePrivadoImagen: string, tamanoImagen: number, imagenModificada: string): any {
        let esperarTmp = true;
        const dataSharp = sharp(nombrePrivadoImagen).resize({width:tamanoImagen}).toFile(imagenModificada, (myError)=>{
            if (myError) {
                console.log(myError);
            } else {
                esperarTmp = false;
            }
        });

        while (esperarTmp){
            require("deasync").sleep(250);
        }

        return dataSharp;
        
    }
}

export default AdminImages;