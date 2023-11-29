'use strict'

const uuid = require('uuid')

const UuidHook = (exports = module.exports = {})

UuidHook.generate = async (modelInstance) => {
  modelInstance.uuid = uuid.v4()
}
