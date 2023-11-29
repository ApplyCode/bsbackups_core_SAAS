module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'RecoverPasswordController.store') //SOLICITAR RECUPERA O EMAIL
    Route.get('/:id', 'RecoverPasswordController.index') //VERIFICAR TOKEN E-MAIL
    Route.put('/:id', 'RecoverPasswordController.update') //ALTERAR SENHA
  }).prefix('api/v1/recover-password')
}
