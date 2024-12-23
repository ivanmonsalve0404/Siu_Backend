import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DetailSiteService } from './detail-site.service';
import { DetailSite } from 'src/models/detail-site/detail-site';

@Controller('detail-site')
export class DetailSiteController {
    constructor(private readonly detailSiteService: DetailSiteService) {

    }
  
    @Get('/allData')
    public getDetailsSite(): any {
      return this.detailSiteService.consultar();
    }
  
    @Post('/add')
    public registrarDetalleSitio(@Body() objDetail: DetailSite): any {
      return this.detailSiteService.registrar(objDetail);
    }
  
    @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
    public consultarPorId(@Param() parametro: any) {
      const codigoDetalle: number = Number(parametro.codigo);
      if (!isNaN(codigoDetalle)) {
        return this.detailSiteService.consultarPorId(codigoDetalle);
      } else {
        return new HttpException('El código del detalle debe ser un número', HttpStatus.NOT_ACCEPTABLE);
      }
    }
  
    @Put('/update')
    public actualizarDetalle(@Body() objDetail: DetailSite): any {
      return this.detailSiteService.actualizar(objDetail, objDetail.codDetalle);
    }
  
  
}
