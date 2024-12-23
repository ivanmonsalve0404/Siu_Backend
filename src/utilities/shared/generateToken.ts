import * as jwt from 'jsonwebtoken';

class GenerateToken {
  public static procesarRespuesta(datosSesion: any): string {
    let token: string = '';
    token = jwt.sign(
      {
        id: datosSesion.cod_user,
        nombre: datosSesion.nombre_user,
        rol: datosSesion.nombre_rol,
        telefono: datosSesion.telefono_user,
        acceso: datosSesion.nombre_access,
      },
      'laClaveSuperSecreta', { expiresIn: '8h' },
    ); //Cambiarla para producción por un cifrado

    return token;
  }
}

export default GenerateToken;
