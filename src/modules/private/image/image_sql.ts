export const SQL_IMAGE = {
    CAMBIAR_FAVORITA: 'UPDATE images SET favorita_imagen = 1 \
        WHERE cod_sitio = $1 AND cod_imagen = \
        (SELECT cod_imagen FROM images WHERE cod_sitio = $1 ORDER BY cod_imagen DESC LIMIT 1)'
}