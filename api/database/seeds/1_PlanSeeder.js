'use strict'

const Plan = use('App/Models/Plan')

class PlanSeeder {
  async run() {
    const plans = [
      {
        name: 'Startup',
        slug: 'startup',
        description: 'Plano inicial',
      },
      {
        name: 'Agency',
        slug: 'agency',
        description: 'Plano Intermediário',
      },
      {
        name: 'Business',
        slug: 'business',
        description: 'Plano Avançado',
      },
      {
        name: 'Personalizado',
        slug: 'personalizado',
        description: 'Plano ',
      },
    ]
    for (let plan of plans) {
      await Plan.findOrCreate({ slug: plan.slug }, plan)
    }
  }
}

module.exports = PlanSeeder
