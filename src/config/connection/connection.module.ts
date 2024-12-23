import { Global, Module } from '@nestjs/common';
import { Access } from 'src/models/access/access';
import { Department } from 'src/models/department/department';
import { DetailSite } from 'src/models/detail-site/detail-site';
import { Detail } from 'src/models/detail/detail';
import { Images } from 'src/models/images/images';
import { Role } from 'src/models/role/role';
import { Site } from 'src/models/site/site';
import { Town } from 'src/models/town/town';
import { User } from 'src/models/user/user';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Global()
@Module({
    imports: [],
    providers: [
        {provide:DataSource,
            inject:[],
            useFactory:async() => {
                try{
                    const poolConnection = new DataSource({
                        type:"postgres",
                        host:String(process.env.HOST),
                        port:Number(process.env.PORT),
                        username:String(process.env.USER),
                        password:String(process.env.PASSWORD),
                        database:String(process.env.DATABASE),
                        synchronize:true,
                        logging:true,
                        namingStrategy:new SnakeNamingStrategy(),
                        entities:[Department, Town, Role, Site, Access, User, Detail, DetailSite, Images]
                    });
                    await poolConnection.initialize();
                    console.log("Conexión establecida con: " + String(process.env.DATABASE));
                    return poolConnection;
                } catch(myError){
                    console.log("Fallo al realizar la coneción con la Base de Datos");
                    throw myError;
                }
            }
        }
    ],
    exports: [DataSource]
})
export class ConnectionModule {}
