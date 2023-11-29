'use strict'

//MODELS
const User = use('App/Models/User')

class ChangePasswordController {
  async update({ request, response, auth }) {
    try {
      const { new_password } = request.all()

      const user = await User.find(auth.user.id)

      user.password = new_password
      user.first_access = false

      await user.save()

      return response.json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = ChangePasswordController
