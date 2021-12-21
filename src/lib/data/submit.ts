import fetch from 'node-fetch'
import { mkdir, writeFile } from 'fs/promises'
import { resolve, dirname } from 'path'

export const submit = async (
  str: string,
  part: '1' | '2'
): Promise<boolean> => {
  const { year }: { year: string } = JSON.parse(
    process.env.CONFIG ?? '{"year":2015}'
  )
  const matchExp = (process.env.DAY ?? 'day1').match(/\d+/)
  const day: string = matchExp !== null ? matchExp[0] : '1'

  const { session }: { session: string } = JSON.parse(process.env.CONFIG ?? '')

  const urlencoded = new URLSearchParams()
  urlencoded.append('level', part)
  urlencoded.append('answer', str)

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/answer`,
    {
      method: 'POST',
      body: urlencoded as unknown as string,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie: `session=${session}`
      }
    }
  )

  if (response.ok) {
    const result = await response.text()
    console.log(result)

    const filePath = resolve(
      process.cwd(),
      `./src/${year}/attempts/day${day}/part${part}/${str}.html`
    )

    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, result, 'utf8')

    return result.includes("That's the right answer")
  }

  throw new Error(`Error when trying to submit... ${JSON.stringify(response)}`)
}
