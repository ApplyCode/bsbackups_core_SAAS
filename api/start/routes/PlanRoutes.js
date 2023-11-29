module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'PlanController.store')
    Route.put('/:id', 'PlanController.update')
    Route.get('/:id', 'PlanController.show')
    Route.get('/', 'PlanController.index')
  })
    .prefix('api/v1/plans')
    .middleware(['auth', 'adminAuth'])
}
