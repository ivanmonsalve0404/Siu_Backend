import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

@Injectable()
export class Seguridad implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction){
        if (!req.headers.authorization) {
            res.status(401).json({respuesta: "Peticion negada por el sistema de seguridad"});
        } else {
            try {
                const token = req.headers.authorization;
                const datosSesion = verify(token, 'laClaveSuperSecreta');
                if(req.method != 'PUT'){
                    req.body.datosUsuario = datosSesion;
                }
                next();
            } catch (myError) {
                res.status(401).json({mensaje: "Intento de fraude"});
            }
            
        }
    }

}
