import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from 'src/models/site/site';

@Controller('/site')
export class SiteController {
    constructor(private readonly siteService: SiteService) {
        
    }

    @Get('/allData')
    public getSites():any {
        return this.siteService.consultar();
    }

    @Post('/add')
    public registrarSitio(@Body() objSite:Site): any {
        return this.siteService.registrar(objSite);
    }

    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro:any) {
        const codigoSitio:number = Number(parametro.codigo);
        if(!isNaN(codigoSitio)){
            return this.siteService.consultarPorId(codigoSitio);
        } else {
            return new HttpException("El código del usuario debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Put('/update')
    public actualizarSitio(@Body() objSite:Site):any {
        return this.siteService.actualizar(objSite, objSite.codSite);
    }

    @Put('/update/:codigo')
    public actualizarPorId(@Body() objSite:Site, @Param() parametro:any):any {
        const codigoSitio:number = Number(parametro.codigo);
        if(!isNaN(codigoSitio)){
            return this.siteService.actualizar(objSite, codigoSitio);
        } else {
            return new HttpException("El código del sitio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Delete('/delete/:codigo')
    public eliminarSitio(@Param() parametro:any):any {
        const codigoSitio:number = Number(parametro.codigo);
        if(!isNaN(codigoSitio)){
            return this.siteService.eliminar(codigoSitio);
        } else {
            return new HttpException("El código del sitio debe ser un número", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
