'use strict'

//MODELS
const Activity = use('App/Models/Activity')

class ReportService {
  /* OBTER QUANTIDADE DE ATIVIDADES PELO STATUS */
  static async getReportActivityByStatus(user_id) {
    const success = await Activity.query()
      .with('backup')
      .whereHas('backup', (builder) => {
        builder.where('user_id', user_id)
      })
      .where('status', 'success')
      .getCount()

    const running = await Activity.query()
      .with('backup')
      .whereHas('backup', (builder) => {
        builder.where('user_id', user_id)
      })
      .where('status', 'running')
      .getCount()

    const error = await Activity.query()
      .with('backup')
      .whereHas('backup', (builder) => {
        builder.where('user_id', user_id)
      })
      .where('status', 'error')
      .getCount()

    const total = success + running + error
    // Calcular a porcentagem para cada status
    const successPercentage = (success / total) * 100
    const runningPercentage = (running / total) * 100
    const errorPercentage = (error / total) * 100

    return {
      count: [success, running, error],
      percentage: [
        successPercentage.toFixed(2),
        runningPercentage.toFixed(2),
        errorPercentage.toFixed(2),
      ],
    }
  }
}

module.exports = ReportService
