import { log, measure } from './performance'
import { submit } from './data/submit'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline')

const { year, compiler }: { year: string; compiler: string } = JSON.parse(
  process.env.CONFIG ?? '{"year":2015}'
)
const day = process.env.DAY ?? 'day1'

import(process.cwd() + `/src/${year}/${day}.${compiler}`)
  .then(
    ({
      part1,
      part2,
      input = true
    }: {
      part1: Function
      part2: Function
      input: boolean
    }) => {
      // const data = input
      //   ? JSON.parse(process.env.INPUT ?? '[]') // ??
      //   : JSON.parse(process.env.TEST ?? '[]')
      const data = JSON.parse(process.env.DATA ?? '[]')

      // === Execution ===
      const result1 = measure(part1, data)
      const result2 = measure(part2, data)

      // === Results ===
      // let spaceDiff = ('' + result1.time).length - ('' + result2.time).length
      log('Part One', result1)
      log('Part Two', result2)

      console.log('YOU ARE HERE')
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      })

      rl.on('line', async (line: string) => {
        if (line === '1') {
          if (await submit(JSON.stringify(result1.solution), '1')) {
            console.log('Great success!!! You did it!!!')
          } else {
            console.log('Incorrect...')
          }
        } else if (line === '2') {
          if (await submit(JSON.stringify(result2.solution), '2')) {
            console.log('Great success!!! You did it!!!')
          } else {
            console.log('Incorrect...')
          }
        } else {
          console.log('You gotta type either "1" or "2"')
        }
      })

      rl.prompt()
    }
  )
  .catch((e) => {
    console.error(e)
  })
