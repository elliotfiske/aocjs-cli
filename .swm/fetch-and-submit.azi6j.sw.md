---
id: azi6j
name: Fetch and Submit
file_version: 1.0.2
app_version: 0.7.1-1
file_blobs:
  package.json: 840a5d30b1d15e438adc87742c04df4c0c06f16a
  src/lib/data/fetch.ts: 28f53e6c50892bb8fb9d4df8d42aeeb1a12843fc
  src/lib/data/submit.ts: b274f5952c596745f41041746ba777a0b9f1addc
---

Here we will discuss how we access the Advent of Code API endpoints for getting the puzzle input and submitting answers.

# fetch.ts

<br/>

`scripts`[<sup id="Z10AiCf">↓</sup>](#f-Z10AiCf) is something
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 package.json
```json
⬜ 5        "bin": {
⬜ 6          "aoc": "dist/src/bin/cli.js"
⬜ 7        },
🟩 8        "scripts": {
🟩 9          "build": "tsc",
🟩 10         "lint": "eslint . --fix",
🟩 11         "preversion": "npm run lint",
🟩 12         "version": "git add -A .",
🟩 13         "postversion": "git push && git push --tags",
🟩 14         "prepare": "npm run build"
🟩 15       },
⬜ 16       "keywords": [
⬜ 17         "advent of code",
⬜ 18         "aoc",
```

<br/>

This is the only exported function from this file. It calls `load`[<sup id="Z1i1CgX">↓</sup>](#f-Z1i1CgX) to get the puzzle input as a string, then returns it trimmed and split into an array of lines.

So if you had a file like

`100\n200\nabc`

you would end up with an array like `["100", "200", "abc"]`
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/data/fetch.ts
```typescript
⬜ 12     
🟩 13       const text = await load(year, day)
🟩 14       return text.trim().split(/\r?\n/)
⬜ 15     }
⬜ 16     
```

<br/>

Here we check to see if the file already exists locally, or if we need to pull it from the website. We don't hit the website if we already have the input, in order to be a good citizen and not cost Eric extra money.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/data/fetch.ts
```typescript
⬜ 17     async function load(year: string, day: string): Promise<string> {
⬜ 18       const filePath = resolve(process.cwd(), `./data/${year}/day${day}.txt`)
⬜ 19     
🟩 20       if (existsSync(filePath)) {
🟩 21         return await readFile(filePath, 'utf8')
🟩 22       } else {
🟩 23         const { session }: { session: string } = JSON.parse(
🟩 24           process.env.CONFIG ?? ''
🟩 25         )
🟩 26         const content = await loadFromRemote(year, day, session)
🟩 27         await mkdir(dirname(filePath), { recursive: true })
🟩 28         await writeFile(filePath, content, 'utf8')
🟩 29         return content
🟩 30       }
⬜ 31     }
⬜ 32     
⬜ 33     async function loadFromRemote(
```

<br/>

# submit.ts

<br/>

This is the only exported function from this file. It executes a POST request with the native `fetch` function. Note that if you don't specify `application/x-www-form-urlencoded`, or if you don't use the method below to URL encode the search params, the endpoint will silently fail (it returns 200, but doesn't actually submit anything and just returns the HTML of the problem again).
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/data/submit.ts
```typescript
⬜ 15       const { session }: { session: string } = JSON.parse(process.env.CONFIG ?? '')
⬜ 16     
🟩 17       const urlencoded = new URLSearchParams()
🟩 18       urlencoded.append('level', part)
🟩 19       urlencoded.append('answer', str)
🟩 20     
🟩 21       const response = await fetch(
🟩 22         `https://adventofcode.com/${year}/day/${day}/answer`,
🟩 23         {
🟩 24           method: 'POST',
🟩 25           body: urlencoded as unknown as string,
🟩 26           headers: {
🟩 27             'content-type': 'application/x-www-form-urlencoded',
🟩 28             cookie: `session=${session}`
🟩 29           }
🟩 30         }
🟩 31       )
⬜ 32     
⬜ 33       if (response.ok) {
⬜ 34         const result = await response.text()
```

<br/>

We want to remember what input we've already sent to the puzzle, because if we send the same wrong answer it just wastes time.

For instance, if we submit `100` and get HTML back with "That's not the right answer, your answer is too high", we save that as a file `100.html` in the folder for the puzzle we're solving.
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/lib/data/submit.ts
```typescript
⬜ 31       )
⬜ 32     
⬜ 33       if (response.ok) {
🟩 34         const result = await response.text()
🟩 35         console.log(result)
🟩 36     
🟩 37         const filePath = resolve(
🟩 38           process.cwd(),
🟩 39           `./src/${year}/attempts/day${day}/part${part}/${str}.html`
🟩 40         )
🟩 41     
🟩 42         await mkdir(dirname(filePath), { recursive: true })
🟩 43         await writeFile(filePath, result, 'utf8')
🟩 44     
🟩 45         return result.includes("That's the right answer")
⬜ 46       }
⬜ 47     
⬜ 48       throw new Error(`Error when trying to submit... ${JSON.stringify(response)}`)
```

<br/>

<!-- THIS IS AN AUTOGENERATED SECTION. DO NOT EDIT THIS SECTION DIRECTLY -->
### Swimm Note

<span id="f-Z1i1CgX">load</span>[^](#Z1i1CgX) - "src/lib/data/fetch.ts" L13
```typescript
  const text = await load(year, day)
```

<span id="f-Z10AiCf">scripts</span>[^](#Z10AiCf) - "package.json" L8
```json
  "scripts": {
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBYW9janMtY2xpJTNBJTNBZWxsaW90Zmlza2U=/docs/azi6j).