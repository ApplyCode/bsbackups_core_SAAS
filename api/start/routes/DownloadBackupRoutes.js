module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/:id/:fileId', 'DownloadBackupController.show').as(
      'download.backup'
    )
    Route.post('/recordfile/:id/:filename', 'DownloadBackupController.store')
  })
    .prefix('api/v1/download-backup')
    .middleware(['auth'])
}
