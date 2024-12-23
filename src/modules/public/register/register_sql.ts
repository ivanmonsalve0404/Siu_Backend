export const acceso_SQL = {
    datos_sesion: "SELECT u.cod_user, u.nombre_user, u.telefono_user, \
    (SELECT nombre_rol FROM roles WHERE cod_rol = u.cod_role) as nombre_rol, a.nombre_access \
    FROM access a INNER JOIN users u ON u.cod_user = a.cod_user WHERE a.cod_user =$1", 
}