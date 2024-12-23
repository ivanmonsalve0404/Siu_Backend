import { Body, Controller, Post } from '@nestjs/common';
import { AccessService } from './access.service';
import { Access } from 'src/models/access/access';

@Controller('/access')
export class AccessController {
    constructor(private readonly accesoService: AccessService){
        
    }

    @Post("/signin")
    public inicioSesion(@Body() objAcceso: Access): any {
        return this.accesoService.sesion(objAcceso);
    }
}
