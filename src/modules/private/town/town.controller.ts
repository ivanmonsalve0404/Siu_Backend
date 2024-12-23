import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TownService } from './town.service';
import { Town } from 'src/models/town/town';

@Controller('/town')
export class TownController {

    constructor(private readonly townService: TownService) {

    }

    @Get("/allData")
    public getTowns():any {
        return this.townService.consultar();
    }

    @Post('/add')
    public registrarMunicipio(@Body() objTown:Town): any {
        return this.townService.registrar(objTown);
    }

    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro:any) {
        const codigoMunicipio:number = Number(parametro.codigo);
        if(!isNaN(codigoMunicipio)){
            return this.townService.consultarPorId(codigoMunicipio);
        } else {
            return new HttpException("El código del municipio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put('/update')
    public actualizarMunicipio(@Body() objTown:Town):any {
        return this.townService.actualizar(objTown, objTown.codMunicipio);
    }

    @Put('/update/:codigo')
    public actualizarPorId(@Body() objTown:Town, @Param() parametro:any):any {
        const codigoMunicipio:number = Number(parametro.codigo);
        if(!isNaN(codigoMunicipio)){
            return this.townService.actualizar(objTown, codigoMunicipio);
        } else {
            return new HttpException("El código del municipio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('/delete/:codigo')
    public async eliminarMunicipio(@Param() parametro: any): Promise<any> {
        const codigoMunicipio: number = Number(parametro.codigo);
        if (!isNaN(codigoMunicipio)) {
            return this.townService.eliminar(codigoMunicipio);
        } else {
            throw new HttpException("El código del municipio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
