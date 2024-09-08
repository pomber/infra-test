import { Block, parseRoot } from "ch-test-infra/blocks"
import React from "react"
import { z } from "zod"
import { Demo } from "@/components/demo"
import { Pre, RawCode, highlight } from "ch-test-infra/code"
import { CopyButton } from "@/components/copy-button"

const ContentSchema = Block.extend({
  demo: Block,
  implementation: Block,
})

export function PreviewImplementation({ MDX }: { MDX: any }) {
  const { demo, implementation } = parseRoot(MDX, ContentSchema, {
    components: { Demo },
  })

  return (
    <>
      {demo.children}
      <h2>Implementation</h2>
      {implementation.children}
    </>
  )
}
