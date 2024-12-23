import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Detail } from 'src/models/detail/detail';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DetailService {
    private detailRepository:Repository<Detail>

    constructor(private poolConnection:DataSource){
        this.detailRepository = poolConnection.getRepository(Detail);
    }

    public async consultar():Promise<any>{
        try {
            return this.detailRepository.find();
        } catch (myError) {
            throw new HttpException('No se ha podido consultar los detalles.', HttpStatus.BAD_REQUEST);
        }
    }

    public async verificarDetalle(nombre:string):Promise<boolean> { //O el objeto completo
        const existeDetalle = await this.detailRepository.findBy({nombreDetalle:nombre}); //Donde el rol sea igual a algo
        return existeDetalle.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objDetalle:Detail):Promise<any>{
        try {
            if (await this.verificarDetalle(objDetalle.nombreDetalle)) {
                return new HttpException('El detalle ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.detailRepository.save(objDetalle);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.detailRepository.findBy({codDetalle:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objDetalle: Detail, codigo:number):Promise<any>{
        try {
            if (await this.verificarDetalle(objDetalle.nombreDetalle)) {
                return new HttpException('El detalle ya existe', HttpStatus.BAD_REQUEST);
            } else {
                const objActualizado = await this.detailRepository.update({codDetalle: codigo}, objDetalle);
                return new HttpException('El detalle se actualizó correctamente', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el detalle', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.detailRepository.delete({codDetalle:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el detalle', HttpStatus.BAD_REQUEST);
        }
    }
}
