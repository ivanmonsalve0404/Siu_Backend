import { Module } from '@nestjs/common';
import { DepartmentModule } from './department/department.module';
import { TownModule } from './town/town.module';
import { RoleModule } from './role/role.module';
import { RouterModule, Routes } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { DetailModule } from './detail/detail.module';
import { DetailSiteModule } from './detail-site/detail-site.module';
import { ImageModule } from './image/image.module';

const routes:Routes = [
    {
        path:"private",
        children:[
            DepartmentModule,
            TownModule,
            RoleModule,
            UserModule,
            SiteModule,
            DetailModule,
            DetailSiteModule,
            ImageModule
        ]
    }
]

@Module({
    imports:[
        DepartmentModule,
        TownModule,
        RoleModule,
        RouterModule.register(routes),
        UserModule,
        SiteModule,
        DetailModule,
        DetailSiteModule,
        ImageModule
    ],
    exports:[RoleModule],
    controllers: []
})
export class PrivateModule {}
