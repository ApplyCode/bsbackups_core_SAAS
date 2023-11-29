'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Para carregar todas rotas nas subpastas /routes só aceita arquivos .js que exportam functions
require('require-all')({
  dirname: __dirname + '/routes',
  filter: /(.*Routes)\.js$/,
  recursive: true,
  /**
   * @param  {typeof import('./routes/')} routeLoadFunction
   */
  resolve: function (routeLoadFunction) {
    return routeLoadFunction(Route)
  },
})
