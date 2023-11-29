module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'UserController.store')
    Route.put('/:id', 'UserController.update')
    Route.get('/:id', 'UserController.show')
    Route.get('/', 'UserController.index')
    Route.delete('/:id', 'UserController.destroy')
  })
    .prefix('api/v1/users')
    .middleware(['auth', 'adminAuth'])
}
