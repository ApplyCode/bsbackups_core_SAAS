module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'BackupController.store')
    Route.put('/:id', 'BackupController.update')
    Route.get('/:id', 'BackupController.show')
    Route.delete('/:id', 'BackupController.destroy')
    Route.get('/', 'BackupController.index')
  })
    .prefix('api/v1/backups')
    .middleware(['auth', 'checkExpiration'])
}
