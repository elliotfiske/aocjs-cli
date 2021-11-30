import fetch from 'node-fetch'

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

  console.log(
    `https://adventofcode.com/${year}/day/${day}/answer    ${session}`
  )

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
    return true
  }

  throw new Error(`Error when trying to submit... ${JSON.stringify(response)}`)
}
