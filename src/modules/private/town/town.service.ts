import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Town } from 'src/models/town/town';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TownService {
    private townRepository:Repository<Town>;

    constructor(private poolConnection:DataSource){
        this.townRepository = poolConnection.getRepository(Town);
    }

    public async consultar():Promise<any>{ //Le llega algo, sea lo que sea, y devuelve una promesa de cualquier cosa
        try {
            return this.townRepository.find({
                relations:{
                    codDepartmentoMun:true
                }
            }); //Busca todos los departamentos
        } catch (myError) {
            console.log(myError);
            throw myError; //Devuelve el error a la promesa
        }
    }

    public async verificarMunicipio(nombre:string):Promise<boolean> { //O el objeto completo
        const existeMunicipio = await this.townRepository.findBy({nombreMunicipio:nombre}); //Donde el rol sea igual a algo
        return existeMunicipio.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objMunicipio:Town):Promise<any>{
        try {
            if (await this.verificarMunicipio(objMunicipio.nombreMunicipio)) {
                return new HttpException('El municipio ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.townRepository.save(objMunicipio);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el municipio', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.townRepository.findBy({codMunicipio:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el municipio', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objMunicipio:Town, codigo:number):Promise<any>{
        try {
            if (await this.verificarMunicipio(objMunicipio.nombreMunicipio)) {
                return new HttpException('El municipio ya existe', HttpStatus.BAD_REQUEST);
            } else {
                const objActualizado = await this.townRepository.update({codMunicipio: codigo}, objMunicipio);
                return new HttpException('El municipio se actualizó correctamente', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el municipio', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo: number): Promise<any> {
        try {
            const result = await this.townRepository.delete({ codMunicipio: codigo });
            console.log('Resultado de eliminación:', result); // Registro más descriptivo
            if (result.affected === 0) {
                throw new HttpException('Municipio no encontrado', HttpStatus.NOT_FOUND);
            }
            return result;
        } catch (error) {
            console.error('Error durante la eliminación:', error); // Registro más descriptivo
            throw new HttpException('No se ha podido eliminar el municipio', HttpStatus.BAD_REQUEST);
        }
    }
}
