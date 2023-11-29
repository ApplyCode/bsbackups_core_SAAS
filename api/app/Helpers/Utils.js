'use strict'

const generateRandomPassword = (length) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

const formatPath = (path) => {
  // Substitui as barras invertidas "\" por barras simples "/"
  path = path.replace(/\\/g, '/')

  // Substitui as barras duplas "\\" por barras simples "/"
  path = path.replace(/\\\\/g, '/')

  // Substitui as barras duplas "//" por barras simples "/"
  path = path.replace(/\/\//g, '/')

  return path
}

const convertToCronExpressionMonthly = (day, hour, minutes) => {
  // Validação dos parâmetros
  if (
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return 'Parâmetros inválidos.'
  }

  // Montagem da expressão cron
  const cronExpression = `${minutes} ${hour} ${day} * *`

  return cronExpression
}

const convertToCronExpressionDaily = (hour, minutes) => {
  // Validação dos parâmetros
  if (hour < 0 || hour > 23 || minutes < 0 || minutes > 59) {
    return 'Parâmetros inválidos.'
  }

  // Montagem da expressão cron
  const cronExpression = `${minutes} ${hour} * * *`

  return cronExpression
}

function convertToCronExpressionWeekly(days_week, hour, minutes) {
  // Validação dos parâmetros
  if (
    hour < 0 ||
    hour > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    !Array.isArray(days_week) ||
    days_week.length !== 7
  ) {
    return 'Parâmetros inválidos.'
  }

  // Mapeia os dias da semana selecionados para números de 0 a 6
  const selectedDaysOfWeek = days_week.reduce(
    (selectedDays, isDaySelected, index) => {
      if (isDaySelected) {
        selectedDays.push(index)
      }
      return selectedDays
    },
    []
  )

  // Montagem da expressão cron para os dias da semana selecionados
  const cronDaysOfWeek =
    selectedDaysOfWeek.length > 0 ? selectedDaysOfWeek.join(',') : '*'

  // Montagem final da expressão cron
  const cronExpression = `${minutes} ${hour} * * ${cronDaysOfWeek}`

  return cronExpression
}

module.exports = {
  formatPath,
  convertToCronExpressionMonthly,
  convertToCronExpressionDaily,
  convertToCronExpressionWeekly,
  generateRandomPassword,
}
