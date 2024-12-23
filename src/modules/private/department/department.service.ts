import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Department } from 'src/models/department/department';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    private departmentRepository:Repository<Department>;

    constructor(private poolConnection:DataSource){
        this.departmentRepository = poolConnection.getRepository(Department);
    }

    public async consultar():Promise<any>{ //Le llega algo, sea lo que sea, y devuelve una promesa de cualquier cosa
        try {
            return this.departmentRepository.find(); //Busca todos los departamentos
        } catch (myError) {
            console.log(myError);
            throw myError; //Devuelve el error a la promesa
        }
    }

    public async verificar(nombre:string):Promise<boolean> { //O el objeto completo
        const existe = await this.departmentRepository.findBy({nameDepartment:nombre}); //Donde el rol sea igual a algo
        return existe.length>0; //Si es verdadero es porque si existe
    }

    public async registrar(objDepartamento:Department):Promise<any>{
        try {
            if (await this.verificar(objDepartamento.nameDepartment)) {
                return new HttpException('El departamento ya existe', HttpStatus.BAD_REQUEST);
            } else {
                return await this.departmentRepository.save(objDepartamento);
            }
        } catch (myError) {
            throw new HttpException('No se ha podido registrar el departamento', HttpStatus.BAD_REQUEST);
        }
    }

    public async consultarPorId(codigo:number):Promise<any>{
        try {
            return this.departmentRepository.findBy({codDepartament:codigo});
        } catch (myError) {
            throw new HttpException('No se ha podido consultar el departamento', HttpStatus.BAD_REQUEST);
        }
    }

    public async actualizar(objDepartamento:Department, codigo:number):Promise<any>{
        try {
            if (await this.verificar(objDepartamento.nameDepartment)) {
                return new HttpException('El departamento ya existe', HttpStatus.BAD_REQUEST);
            } else {
                const objActualizado = await this.departmentRepository.update({codDepartament: codigo}, objDepartamento);
                return new HttpException('El departamento se actualizó correctamente', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException('No se ha podido actualizar el departamento', HttpStatus.BAD_REQUEST);
        }
    }

    public async eliminar(codigo:number):Promise<any>{
        try {
            return this.departmentRepository.delete({codDepartament:codigo});
        } catch (error) {
            throw new HttpException('No se ha podido eliminar el departamento', HttpStatus.BAD_REQUEST);
        }
    }
}
