import fs from 'node:fs'
import path from 'node:path'

import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'


export default class CpxSeederCreateCommand extends BaseCommand {
  static commandName = 'make:cpx-seeder'
  static description = 'Make a new seeder file. Params: {name : Seeder name in snake_case (Example: "user_plan").}'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
  }

  @args.string({ description: 'Seeder name in snake_case (Example: "user_plan").' })
  declare name: string

  async run() {
    //Create directory database/cpx_seeders if not exists
    const dir = this.app.makePath('database', 'cpx_seeders')
    await fs.promises.mkdir(dir, { recursive: true })

    //Create seeder file
    const fileName = Date.now().toString() + '_' + this.name + '_seeder.ts'
    const template = new URL('../stubs/seeder.stub', import.meta.url)
    const fileContent = fs.readFileSync(template, 'utf8')
    await fs.promises.writeFile(path.join(dir, fileName), fileContent)

    this.logger.info('Seeder created successfully.')
  }
}
