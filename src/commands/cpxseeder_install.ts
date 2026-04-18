import fs from 'node:fs'
import path from 'node:path'

import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'


export default class CpxSeederInstallCommand extends BaseCommand {
  static commandName = 'cpx-seeder:install'
  static description = 'Create database table to track seeders'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
  }

  async run() {
    //Get template
    const template = new URL('../stubs/seeder_install.stub', import.meta.url)
    const fileContent = fs.readFileSync(template, 'utf8')

    //Create migration file
    const dir = this.app.makePath('database', 'migrations')
    const fileName = Date.now().toString() + '_create_cpx_seeders_table.ts'
    const filePath = path.join(dir, fileName)
    await fs.promises.writeFile(filePath, fileContent)
    this.logger.info('Seeder table created successfully.')
  }
}
