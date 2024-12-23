import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Access } from 'src/models/access/access';
import { DataTypeNotSupportedError } from 'typeorm';
import { User } from 'src/models/user/user';

@Controller('/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {

    }

    @Post('user')
    public registrarUsuario(@Body() datosRegistro: any): any {
        const objAccess: Access = datosRegistro;
        const objUser: User = datosRegistro;

        return this.registerService.newUser(objAccess, objUser);
    }
}
