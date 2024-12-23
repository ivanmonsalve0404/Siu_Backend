import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import { DetailService } from './detail.service';
import { Detail } from 'src/models/detail/detail';

@Controller('/detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {

  }

  @Get('/allData')
  public getDetails(): any {
    return this.detailService.consultar();
  }

  @Post('/add')
  public registrarDetalle(@Body() objDetail: Detail): any {
    return this.detailService.registrar(objDetail);
  }

  @Get('/byId/:codigo') //Otro parametro @Get('/byId/:codigo/:nombre')
  public consultarPorId(@Param() parametro: any) {
    const codigoDetalle: number = Number(parametro.codigo);
    if (!isNaN(codigoDetalle)) {
      return this.detailService.consultarPorId(codigoDetalle);
    } else {
      return new HttpException('El código del detalle debe ser un número', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put('/update')
  public actualizarDetalle(@Body() objDetail: Detail): any {
    return this.detailService.actualizar(objDetail, objDetail.codDetalle);
  }

  @Put('/update/:codigo')
  public actualizarPorId(@Body() objDetail: Detail, @Param() parametro: any): any {
    const codigoDetalle: number = Number(parametro.codigo);
    if (!isNaN(codigoDetalle)) {
      return this.detailService.actualizar(objDetail, codigoDetalle);
    } else {
      return new HttpException('El código del detalle debe ser un número', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('/delete/:codigo')
  public eliminarDetalle(@Param() parametro: any): any {
    const codigoDetalle: number = Number(parametro.codigo);
    if (!isNaN(codigoDetalle)) {
      return this.detailService.eliminar(codigoDetalle);
    } else {
      return new HttpException('El código del detalle debe ser un número', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
