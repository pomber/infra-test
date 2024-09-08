import Content from "./content.md"
import { Code } from "@/components/code"

export default function Page() {
  return (
    <div className="m-4 prose">
      <Content components={{ Code }} />
    </div>
  )
}
