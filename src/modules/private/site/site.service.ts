import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Site } from 'src/models/site/site';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SiteService {
    private siteRepository:Repository<Site>

    constructor(private poolConnection:DataSource){
        this.siteRepository = poolConnection.getRepository(Site);
    }

    public async consultar():Promise<any>{
        try {
            return this.siteRepository.find();
        } catch (myError) {
            throw new HttpException('No se ha podido consultar los sitios', HttpStatus.BAD_REQUEST);
        }
    }

    public async verificarSitio(nombre:string):Promise<boolean> { //O el objeto completo
        const existeSitio = await this.siteRepository.findBy({nombreSitio:nombre}); //Donde el rol sea igual a algo
        return existeSitio.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objSite:Site):Promise<any>{
        try {
            if (await this.verificarSitio(objSite.nombreSitio)) {
                return new HttpException('El sitio ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.siteRepository.save(objSite);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el sitio', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.siteRepository.findBy({codSite:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el sitio', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objSite:Site, codigo:number):Promise<any>{
        try {
            if (await this.verificarSitio(objSite.nombreSitio)) {
                return new HttpException('El sitio ya existe', HttpStatus.BAD_REQUEST);
            } else {
                const objActualizado = await this.siteRepository.update({codSite:codigo}, objSite);
                return new HttpException('El sitio se actualizó correctamente', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el sitio', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.siteRepository.delete({codSite:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el sitio', HttpStatus.BAD_REQUEST);
        }
    }
}
