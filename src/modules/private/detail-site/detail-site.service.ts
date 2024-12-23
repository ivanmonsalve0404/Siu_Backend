import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetailSite } from 'src/models/detail-site/detail-site';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DetailSiteService {
    private detailSiteRepository:Repository<DetailSite>

    constructor(private poolConnection:DataSource){
        this.detailSiteRepository = poolConnection.getRepository(DetailSite);
    }

    public async consultar():Promise<any>{
        try {
            return this.detailSiteRepository.find();
        } catch (myError) {
            throw new HttpException('No se ha podido consultar los detalles del sitio.', HttpStatus.BAD_REQUEST);
        }
    }

    public async verificarDetalleSitio(codigo:number):Promise<boolean> { //O el objeto completo
        const existeDetalleSitio = await this.detailSiteRepository.findBy({codDetalleSitio: codigo}); //Donde el rol sea igual a algo
        return existeDetalleSitio.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objDetalle:DetailSite):Promise<any>{
        try {
            if (await this.verificarDetalleSitio(objDetalle.codDetalleSitio)) {
                return new HttpException('El detalle ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.detailSiteRepository.save(objDetalle);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.detailSiteRepository.findBy({codDetalle:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objDetalle: DetailSite, codigo:number):Promise<any>{
        try {
            if (await this.verificarDetalleSitio(objDetalle.codDetalleSitio)) {
                const objActualizado = await this.detailSiteRepository.update({codDetalleSitio: codigo}, objDetalle);
                return new HttpException('El detalle se actualizó correctamente', HttpStatus.OK);
                
            } else {
                return new HttpException('El detalle ya existe', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.detailSiteRepository.delete({codDetalle:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el detalle', HttpStatus.BAD_REQUEST);
        }
    }
}
