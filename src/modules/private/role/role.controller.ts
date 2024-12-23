import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/models/role/role';

@Controller('/role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
        
    }

    @Get('/allData')
    public getRoles():any {
        return this.roleService.consultar();
    }

    @Post('/add')
    public registrarRol(@Body() objRol:Role): any {
        return this.roleService.registrar(objRol);
    }

    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro:any) {
        const codigoRol:number = Number(parametro.codigo);
        if(!isNaN(codigoRol)){
            return this.roleService.consultarPorId(codigoRol);
        } else {
            return new HttpException("El código del rol debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put("/update")
    public actualizarRol(@Body() objActualizar: Role): any{
        return this.roleService.actualizar(objActualizar, objActualizar.codRol);
    }

    @Put("/update/:codRol")
    public actualizarRolParametro(@Body() objActualizar: Role, @Param() parametro:any): any{
        const codigo:number = Number(parametro.codRol);
        if (!isNaN(codigo)) {
            return this.roleService.actualizar(objActualizar, codigo);
        } else {
            return new HttpException('Codigo de rol no válido', HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('/delete/:codigo')
    public eliminarRol(@Param() parametro:any):any {
        const codigoRol:number = Number(parametro.codigo);
        if(!isNaN(codigoRol)){
            return this.roleService.eliminar(codigoRol);
        } else {
            return new HttpException("El código del rol debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
