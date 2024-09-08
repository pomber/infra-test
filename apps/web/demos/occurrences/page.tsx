import { RawCode, Pre, highlight } from "ch-test-infra/code"
import Content from "./content.md"
import { CodeWithOccurrences } from "./code"

export default function Page() {
  return <Content components={{ Code }} />
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const info = await highlight(codeblock, "github-dark")
  return <CodeWithOccurrences code={info} />
}
