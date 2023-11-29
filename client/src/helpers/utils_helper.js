import moment from "moment"

const convertToDaysWeek = (
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday
) => {
  const dias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ]
  const days = []

  if (sunday) days.push(dias[0])
  if (monday) days.push(dias[1])
  if (tuesday) days.push(dias[2])
  if (wednesday) days.push(dias[3])
  if (thursday) days.push(dias[4])
  if (friday) days.push(dias[5])
  if (saturday) days.push(dias[6])

  return days.join(", ")
}

const convertNumberToFrequency = number => {
  switch (number) {
    case "1":
      return "Mensalmente"
    case "2":
      return "Semanalmente"
    case "3":
      return "Diariamente"
    default:
      return ""
  }
}

const convertToDays = (mode, frequency, day_month, days_week) => {
  if (mode == false) return ""
  if (frequency === "1") return day_month
  if (frequency == "2") {
    var days = JSON.parse(days_week)
    return convertToDaysWeek(
      days[0],
      days[1],
      days[2],
      days[3],
      days[4],
      days[5],
      days[6]
    )
  }
  if (frequency == "3") {
    return "Todos"
  }
}

const formatTimestamp = timestamp => {
  let date = new Date(+timestamp)
  return moment(date).format("DD/MM/YYYY HH:mm")
}

const bytesToSize = bytes => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 Byte"
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
}

const formatFileName = string => {
  const lastIndex = string.lastIndexOf("/")
  if (lastIndex !== -1) {
    return string.substring(lastIndex + 1)
  }
  return string
}

const convertToCurrencyBRL = value => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return formatter.format(value)
}
export {
  convertToDaysWeek,
  convertNumberToFrequency,
  convertToDays,
  formatTimestamp,
  bytesToSize,
  formatFileName,
  convertToCurrencyBRL,
}
