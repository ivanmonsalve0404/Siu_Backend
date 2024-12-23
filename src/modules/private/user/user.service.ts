import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/models/user/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
    private userRepository:Repository<User>

    constructor(private poolConnection:DataSource){
        this.userRepository = poolConnection.getRepository(User);
    }

    public async consultar():Promise<any>{
        try {
            return this.userRepository.find();
        } catch (myError) {
            throw new HttpException('No se ha podido consultar los usuarios', HttpStatus.BAD_REQUEST);
        }
    }

    public async verificarUsuario(nombre:string):Promise<boolean> { //O el objeto completo
        const existeUsuario = await this.userRepository.findBy({nombreUser:nombre}); //Donde el rol sea igual a algo
        return existeUsuario.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objUser:User):Promise<any>{
        try {
            if (await this.verificarUsuario(objUser.nombreUser)) {
                return new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.userRepository.save(objUser);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el usuario', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.userRepository.findBy({codUser:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el usuario', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objUser:User, codigo:number):Promise<any>{
        try {
            if (await this.verificarUsuario(objUser.nombreUser)) {
                return new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
            } else {
                const objActualizado = await this.userRepository.update({codUser: codigo}, objUser);
                return new HttpException('El usuario se actualizó correctamente', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el usuario', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.userRepository.delete({codUser:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el usuario', HttpStatus.BAD_REQUEST);
        }
    }
}
