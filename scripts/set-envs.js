const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

// Direccion
const targetPath = './src/environments/environments.ts';

// Contenido
const envFileContent = `
export const environment = {
    mapbox_key: "${ process.env['MAPBOX_KEY'] }",
}
`;

// Creacion de la carpeta 
mkdirSync('./src/environments', { recursive: true });

// Creacion del archivo con su contenido
writeFileSync(targetPath, envFileContent);