module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/:type/:id', 'BackupMailController.store')
  })
    .prefix('api/v1/backup-mail')
    .middleware(['auth'])
}
