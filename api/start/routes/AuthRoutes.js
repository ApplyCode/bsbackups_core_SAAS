module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/login', 'AuthController.store').as('login')
    Route.get('/logout', 'AuthController.destroy').as('logout')
    Route.post('/refreshToken', 'AuthController.update').as('refreshToken')
  }).prefix('api/v1/')
}
