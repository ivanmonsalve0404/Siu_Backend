import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from 'src/models/department/department';

@Controller('/department')
export class DepartmentController {

    constructor(private readonly departmentService: DepartmentService) {

    }

    @Get("/allData")
    public getDepartments():any {
        return this.departmentService.consultar();
    }

    @Post('/add')
    public registrarMunicipio(@Body() objDepartamento:Department): any {
        return this.departmentService.registrar(objDepartamento);
    }

    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro:any) {
        const codigo:number = Number(parametro.codigo);
        if(!isNaN(codigo)){
            return this.departmentService.consultarPorId(codigo);
        } else {
            return new HttpException("El código del municipio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put('/update')
    public actualizar(@Body() objDepartamento:Department):any {
        return this.departmentService.actualizar(objDepartamento, objDepartamento.codDepartament);
    }

    @Put('/update/:codigo')
    public actualizarPorId(@Body() objDepartamento:Department, @Param() parametro:any):any {
        const codigo:number = Number(parametro.codigo);
        if(!isNaN(codigo)){
            return this.departmentService.actualizar(objDepartamento, codigo);
        } else {
            return new HttpException("El código del departamento debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('/delete/:codigo')
    public eliminar(@Param() parametro:any):any {
        const codigo:number = Number(parametro.codigo);
        if(!isNaN(codigo)){
            return this.departmentService.eliminar(codigo);
        } else {
            return new HttpException("El código del departamento debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
