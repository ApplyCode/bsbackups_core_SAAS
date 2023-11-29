module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/:id', 'RetentionController.store')
  })
    .prefix('api/v1/retention')
    .middleware(['auth'])
}
