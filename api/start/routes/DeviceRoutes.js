module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'DeviceController.store')
    Route.put('/:id', 'DeviceController.update')
    Route.get('/:id', 'DeviceController.show')
    Route.get('/', 'DeviceController.index')
    Route.delete('/:id', 'DeviceController.destroy')
  })
    .prefix('api/v1/devices')
    .middleware(['auth', 'checkExpiration'])
}
