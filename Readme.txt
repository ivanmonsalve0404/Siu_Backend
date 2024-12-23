#***********************************************************************
# Crear proyecto nest 

    nest new back_siu

#***********************************************************************
# Instalacion de paquetes

    npm i sharp
    npm i express
    npm i typeorm
    npm i @nestjs/config
    npm i @nestjs/typeorm
    npm i typeorm-naming-strategies
    npm i bcryptjs
    npm i formidable
    npm i jsonwebtoken

    npm i @types/express --save-dev
    npm i @types/bcryptjs --save-dev
    npm i @types/formidable --save-dev
    npm i @types/jsonwebtoken --save-dev
#***********************************************************************
Creación de los modelos
#***********************************************************************
nest g cl models/department
nest g cl models/town

#***********************************************************************
Creación modulo departamento
#***********************************************************************
nest g mo modules/private/department
nest g s modules/private/department --no-spec
nest g co modules/private/department --no-spec
#***********************************************************************
Creación modulo municipio
#***********************************************************************
nest g mo modules/private/town
nest g s modules/private/town --no-spec
nest g co modules/private/town --no-spec
#
