import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { Access } from 'src/models/access/access';
import { User } from 'src/models/user/user';
import { DataSource, Repository } from 'typeorm';
import { acceso_SQL } from './register_sql';
import GenerateToken from 'src/utilities/shared/generateToken';

@Injectable()
export class RegisterService {
    private usuarioRepository:Repository<User>;
    private accesoRepository:Repository<Access>;

    constructor(private poolConnection:DataSource){
        this.usuarioRepository = poolConnection.getRepository(User);
        this.accesoRepository = poolConnection.getRepository(Access);
    }

    public async newUser (objAccess:Access, objUser:User):Promise<any>{
        let codUser = 0;
        try {
            const usuarioExiste = await this.accesoRepository.findBy({nombreAccess: objAccess.nombreAccess});
            console.log(usuarioExiste);
            
            if (usuarioExiste.length == 0) {
                codUser = (await this.usuarioRepository.save(objUser)).codUser;

                const claveCifrada = hashSync(objAccess.claveAccess, 10);
                objAccess.codUser = codUser;
                objAccess.claveAccess = claveCifrada;
                await this.accesoRepository.save(objAccess);

                let datosSesion = await this.accesoRepository.query(acceso_SQL.datos_sesion, [codUser]);
                const token = GenerateToken.procesarRespuesta(datosSesion);
                if (token !== '') {
                    return new HttpException({'tokenApp': token}, HttpStatus.OK);
                } else {
                    return new HttpException("Fallo al realizar la autenticación", HttpStatus.METHOD_NOT_ALLOWED);
                }
            } else {
                return new HttpException("El usuario ya existe", HttpStatus.CONFLICT);
            }
        } catch (myError) {
            throw new HttpException("Error al registrar el usuario", HttpStatus.NOT_ACCEPTABLE);
        }
        
    }
}
