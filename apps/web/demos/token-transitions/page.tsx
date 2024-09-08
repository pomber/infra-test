import { highlight } from "ch-test-infra/code"
import Content from "./content.mdx"
import { CodeSwitcher } from "./code"
import { Block, CodeBlock, parseRoot } from "ch-test-infra/blocks"
import { z } from "zod"

export default async function Page() {
  const { code } = parseRoot(
    Content,
    Block.extend({ code: z.array(CodeBlock) }),
  )

  const infos = await Promise.all(
    code.map((codeblock: any) => highlight(codeblock, "github-dark")),
  )
  return <CodeSwitcher infos={infos} />
}
