module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.put('/:id', 'ChangePlanController.update')
  })
    .prefix('api/v1/change-plan')
    .middleware(['auth'])
}
