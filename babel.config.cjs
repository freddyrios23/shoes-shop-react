
module.exports = {
  presets: [
    // Transforma JavaScript moderno para el navegador
    ['@babel/preset-env', { targets: { browsers: ['last 2 Chrome versions'] } }],

    // Permite procesar componentes React con JSX
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
