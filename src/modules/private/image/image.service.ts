import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import rutasImage from '../../../utilities/domains/var_imagenes';
import AdminImages from 'src/utilities/functions/adminImages';
import { Images } from 'src/models/images/images';
import ImagenVerificar from './imagenVerificar';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { SQL_IMAGE } from './image_sql';

@Injectable()
export class ImageService {
    private imagenRepositorio: Repository<Images>;

    constructor(poolConnection: DataSource) {
        this.imagenRepositorio = poolConnection.getRepository(Images);
    }

    public async registrar(objImagen: Images): Promise<any> {
        try {
            let rutaUbicacionImagen = rutasImage.rutaFotoSitio;
            AdminImages.agregarImagen(objImagen.nombrePrivadoImagen, objImagen.base64Imagen, rutaUbicacionImagen);
            delete objImagen.base64Imagen;
            return await this.imagenRepositorio.save(objImagen)
        } catch (miError) {
            throw new HttpException("Fallo al registrar la imagen", HttpStatus.CONFLICT);
        }
    }

    public async consultar(codigoSitio: number): Promise<any> {
        try {
            const arrImagenes = await this.imagenRepositorio.findBy({ codSitio: codigoSitio });
            /*Traiga las base64 del server*/
            return ImagenVerificar.consultarBase64(arrImagenes);
        } catch (myError) {
            throw new HttpException("Fallo al consultar las imagenes", HttpStatus.BAD_REQUEST);
        }
    }

    public async favorita(codSitio: number, codImagen: number): Promise<any> {
        try {
            await this.imagenRepositorio.update({ codSitio: codSitio }, { favoritaImagen: 2 });
            return await this.imagenRepositorio.update({ codSitio: codSitio, codImagen: codImagen }, { favoritaImagen: 1 });
        } catch (error) {
            throw new HttpException('Fallo al marcar la imagen como favorita', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codImagen: number): Promise<any> {
        try {
            let rutaUbicacionImagen = rutasImage.rutaFotoSistema;
            let imagenEliminar = await this.imagenRepositorio.findOne({ where: { codImagen: codImagen } });
            await this.imagenRepositorio.delete({ codImagen: codImagen });
            AdminImages.removerImagen(imagenEliminar.nombrePrivadoImagen, rutaUbicacionImagen);
            if (imagenEliminar.favoritaImagen == 1) {
                await this.imagenRepositorio.query(SQL_IMAGE.CAMBIAR_FAVORITA, [imagenEliminar.codSitio]);
            }
            return new HttpException('Imagen eliminada satisfactoriamente', HttpStatus.OK);
        } catch (error) {
            throw new HttpException('Fallo al eliminar la imagen', HttpStatus.BAD_REQUEST);
        }
    }
}
