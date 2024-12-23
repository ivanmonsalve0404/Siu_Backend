import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ImageService } from './image.service';
import { Images } from 'src/models/images/images';
import {v4  as uuidv4} from 'uuid'; 

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService){

    }

    @Post("add")
    public crearImagen(@Body() objImagen: Images): any {
        let tipoImagen = objImagen.formatoImagen.split('/')[1];
        let nombrePrivado = objImagen.codSitio + "_IMG" + uuidv4() + '.' + tipoImagen;
        objImagen.nombrePrivadoImagen = nombrePrivado;
        return this.imageService.registrar(objImagen);
    }

    @Get("getAll/:codSitio")
    public obtenerImagenes(@Param() parametros: any){
        const codigo = Number(parametros.codSitio);
        if(!isNaN(codigo)){
            return this.imageService.consultar(codigo);
        } else {
            return new HttpException("El codigo del sitio no es valido", HttpStatus.BAD_REQUEST);
        }
    }

    @Put('favorite/:codSitio/:codImagen')
    public actualizarFavorita(@Param() parametros: any): any {
        const codSitio = Number(parametros.codSitio);
        const codImagen = Number(parametros.codImagen);

        if (!isNaN(codSitio) && !isNaN(codImagen)) {
            return this.imageService.favorita(codSitio, codImagen);
        } else {
            return new HttpException("No se ha podido actualizar la imagen", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('delete/:codImagen')
    public eliminarImagen(@Param() parametro:any):any {
        const codigo = Number(parametro.codImagen);
        if(!isNaN(codigo)){
            return this.imageService.eliminar(codigo);
        } else {
            return new HttpException("El código de la imagen no valido", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
