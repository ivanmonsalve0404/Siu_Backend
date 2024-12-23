import { Module } from '@nestjs/common';
import { access } from 'fs';
import { AccessModule } from './access/access.module';
import { RegisterModule } from './register/register.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes:Routes = [
    {
        path:"public",
        children:[
            AccessModule,
            RegisterModule
        ]
    }
]
@Module({
    imports:[
        AccessModule,
        RegisterModule,
        RouterModule.register(routes)
    ],
    exports:[RouterModule]
})
export class PublicModule {}
