import { existsSync, readFileSync } from 'fs'

const validFiles = ['.aocrc', '.aocrc.json']

export class Config {
  public year: number =
  new Date().getMonth() === 12
    ? new Date().getFullYear()
    : new Date().getFullYear() - 1

  public compiler: 'js' | 'ts' = 'js'
  public session: string | null = null

  public constructor (init?: Partial<Config>) {
    Object.assign(this, init)
  }
}

export default (): Config => {
  const file = validFiles.find(f => existsSync(f))

  const json = file === undefined
    ? {}
    : JSON.parse(readFileSync(file).toString())

  return new Config(json)
}
