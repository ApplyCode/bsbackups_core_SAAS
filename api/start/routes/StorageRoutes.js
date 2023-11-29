module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'StorageController.store')
    Route.put('/', 'StorageController.update')
    Route.get('/:id', 'StorageController.show')
    Route.delete('/:id', 'StorageController.destroy')
  })
    .prefix('api/v1/storages')
    .middleware(['adminAuth'])
}
