import { existsSync, readFileSync, unlink, unlinkSync } from "fs";
import rutasImagenes from '../../../utilities/domains/var_imagenes';
import { Images } from "src/models/images/images";
import AdminImages from "src/utilities/functions/adminImages";

class ImagenVerificar {
    public static consultarBase64(registros: Images[]): Images[] {
        let base64 = "";
        registros.map(objImagen => {
            let rutaUbicacionImagen = rutasImagenes.rutaFotoSitio + objImagen.nombrePrivadoImagen; //Carga la original
            if (existsSync(rutaUbicacionImagen)) {
                /**Recojer los datos */
                let imagenDimensionada = rutasImagenes.rutasFotosTemporal + objImagen.nombrePrivadoImagen; //Carga la temporal
                AdminImages.gestionarTamanoImagen(rutaUbicacionImagen, 500, imagenDimensionada);
                base64 = readFileSync(imagenDimensionada, "base64");
                unlinkSync(imagenDimensionada);
            } else {
                base64 = readFileSync(rutasImagenes.fotoDefecto, "base64");
            }

            objImagen.base64Imagen = base64;
        });

        return registros;
    }
}

export default ImagenVerificar;