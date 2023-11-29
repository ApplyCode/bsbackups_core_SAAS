module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'BackupRecordController.store')
    Route.put('/:id', 'BackupRecordController.update')
    Route.get('/:id', 'BackupRecordController.show')
    Route.delete('/:id', 'BackupRecordController.destroy')
    Route.get('/', 'BackupRecordController.index')
  })
    .prefix('api/v1/backup-records')
    .middleware(['auth'])
}
