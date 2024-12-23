import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user/user';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }

    @Get('/allData')
    public getUsers():any {
        return this.userService.consultar();
    }

    @Post('/add')
    public registrarUsuario(@Body() objUser:User): any {
        return this.userService.registrar(objUser);
    }

    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro:any) {
        const codigoUsuario:number = Number(parametro.codigo);
        if(!isNaN(codigoUsuario)){
            return this.userService.consultarPorId(codigoUsuario);
        } else {
            return new HttpException("El código del usuario debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put('/update')
    public actualizarUsuario(@Body() objUser:User):any {
        return this.userService.actualizar(objUser, objUser.codUser);
    }

    @Put('/update/:codigo')
    public actualizarPorId(@Body() objUser:User, @Param() parametro:any):any {
        const codigoUsuario:number = Number(parametro.codigo);
        if(!isNaN(codigoUsuario)){
            return this.userService.actualizar(objUser, codigoUsuario);
        } else {
            return new HttpException("El código del usuario debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('/delete/:codigo')
    public eliminarUsuario(@Param() parametro:any):any {
        const codigoUsuario:number = Number(parametro.codigo);
        if(!isNaN(codigoUsuario)){
            return this.userService.eliminar(codigoUsuario);
        } else {
            return new HttpException("El código del usuario debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
