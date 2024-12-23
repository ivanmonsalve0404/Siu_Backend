import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';
import { Access } from 'src/models/access/access';
import { DataSource, Repository } from 'typeorm';
import { acceso_SQL } from '../register/register_sql';
import GenerateToken from 'src/utilities/shared/generateToken';

@Injectable()
export class AccessService {
    private accesoRepository: Repository<Access>;

    constructor(private poolConnection: DataSource){
        this.accesoRepository = poolConnection.getRepository(Access);
    }

    public async sesion(objAcceso: Access): Promise<any>{
        const usuarioExiste = await this.accesoRepository.findBy({nombreAccess: objAcceso.nombreAccess});

        if (usuarioExiste.length != 0) {
            let claveAcceso = usuarioExiste[0].claveAccess;
            if(compareSync(objAcceso.claveAccess, claveAcceso)){
                try {
                    let datosSesion = await this.accesoRepository.query(acceso_SQL.datos_sesion, [usuarioExiste[0].codUser]);
                    let tokenSistema = GenerateToken.procesarRespuesta(datosSesion[0]);

                    if (tokenSistema != "") {
                        return new HttpException({"tokenApp": tokenSistema}, HttpStatus.OK);
                    } else {
                        return new HttpException("Fallo al realizar la autenticación del usuario", HttpStatus.CONFLICT);
                    }
                } catch (myError) {
                    throw new HttpException("Fallo al consultar la información suministrada", HttpStatus.CONFLICT);
                }
            } else {
                return new HttpException("Los datos ingresados no son correctos", HttpStatus.NOT_ACCEPTABLE);
            }
        } else {
            return new HttpException("Usuario no registrado", HttpStatus.BAD_REQUEST);
        }
    }
}
