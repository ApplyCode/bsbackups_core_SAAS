module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'ActivityController.store').middleware('checkBackupLimit')
    Route.put('/:id', 'ActivityController.update')
    Route.get('/:id', 'ActivityController.show')
    Route.delete('/:id', 'ActivityController.destroy')
    Route.get('/', 'ActivityController.index')
  })
    .prefix('api/v1/activities')
    .middleware(['auth', 'checkExpiration'])
}
