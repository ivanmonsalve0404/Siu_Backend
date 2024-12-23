import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Role } from 'src/models/role/role';
import { DataSource, Not, Repository } from 'typeorm';

@Injectable()
export class RoleService {
    private rolRepository:Repository<Role>

    constructor(private poolConnection:DataSource){
        this.rolRepository = poolConnection.getRepository(Role);
    }

    public async consultar():Promise<any>{
        try {
            return this.rolRepository.find();
        } catch (myError) {
            throw new HttpException('No se ha podido consultar los roles', HttpStatus.BAD_REQUEST);
        }
    }

    public async verificarRol(nombre:string):Promise<boolean> { //O el objeto completo
        const existeRol = await this.rolRepository.findBy({nombreRol:nombre}); //Donde el rol sea igual a algo
        return existeRol.length>0; //Si es mayor a 0, es porque si existe
    }

    public async verificarRolPorCodigo(codigo:number):Promise<boolean> { //O el objeto completo
        const existeRol = await this.rolRepository.findBy({codRol:codigo}); //Donde el rol sea igual a algo
        console.log(existeRol);
        console.log(existeRol.length);
        
        return existeRol.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objRol:Role):Promise<any>{
        try {
            if (await this.verificarRol(objRol.nombreRol)) {
                return new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.rolRepository.save(objRol);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el rol', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.rolRepository.findBy({codRol:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el rol', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar (objRol:Role, codigo:number): Promise<any>{
        try {
            if (await this.verificarRol(objRol.nombreRol)) {
                return new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST);
            }else{
                const objActualizado = await this.rolRepository.update({codRol: codigo}, objRol);
                return new HttpException({mensaje: "Rol actualizado", objeto: objRol}, HttpStatus.OK); 
            }
        } catch (miError) {
            throw new HttpException('Fallo al actualizar el rol', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizarPorId(objRol:Role, codigo:number):Promise<any>{
        try {
            if (await this.verificarRolPorCodigo(objRol.codRol)) {
                const objActualizado = await this.rolRepository.update({codRol: codigo}, objRol);
                console.log("Entro al actualizar");
                return new HttpException({mensaje: "El Rol ha sido actualizado", objeto: objRol}, HttpStatus.OK);
            } else {
                return new HttpException('El rol no existe', HttpStatus.BAD_REQUEST);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido actualizar el rol', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.rolRepository.delete({codRol:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el rol', HttpStatus.BAD_REQUEST);
        }
    }
}
