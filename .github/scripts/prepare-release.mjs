import { exec } from "@actions/exec"
import readChangesets from "@changesets/read"
import {
  checkout,
  commitAll,
  forcePush,
  resetBranch,
  setupUser,
} from "./git-utils.mjs"
import fs from "fs"
import { getChangelogEntry } from "./md-utils.mjs"
import { Octokit } from "@octokit/action"
import github from "@actions/github"

const VERSION_COMMAND = "pnpm version-packages"
const RELEASE_BRANCH = "release"
const BASE_BRANCH = "next"
const PACKAGE_NAME = "ch-test-infra"
const PACKAGE_DIR = `packages/${PACKAGE_NAME}`
const cwd = process.cwd()

const octokit = new Octokit({})

console.log("Reading changesets")
const changesets = await readChangesets(cwd)
if (changesets.length === 0) {
  console.log("No changesets found")
  process.exit(0)
}

console.log("Setting up user")
await setupUser()

console.log("Checking out release branch")
await checkout(RELEASE_BRANCH)
await resetBranch()

console.log("Running version command")
const [versionCommand, ...versionArgs] = VERSION_COMMAND.split(/\s+/)
await exec(versionCommand, versionArgs, { cwd })

console.log("Reading package files")
const pkg = JSON.parse(
  await fs.promises.readFile(`${PACKAGE_DIR}/package.json`, "utf8"),
)
const changelog = await fs.promises.readFile(
  `${PACKAGE_DIR}/CHANGELOG.md`,
  "utf8",
)

console.log("Committing changes")
await commitAll(`Version ${pkg.version}`)
console.log("Pushing changes")
await forcePush(RELEASE_BRANCH)

console.log("Find existing release PR")
const { data: prs } = await octokit.pulls.list({
  ...github.context.repo,
  state: "open",
  base: BASE_BRANCH,
  head: `${github.context.repo.owner}:${RELEASE_BRANCH}`,
})
console.log("Existing PRs", prs)

const entry = getChangelogEntry(changelog, pkg.version)
const title = `Release ${pkg.name}@${pkg.version}`
const body = entry.content

if (prs.length === 0) {
  console.log("Creating new release PR")
  await octokit.rest.pulls.create({
    ...github.context.repo,
    base: BASE_BRANCH,
    head: RELEASE_BRANCH,
    title,
    body,
  })
} else {
  console.log("Updating existing release PR")
  const { number } = prs[0]
  await octokit.rest.pulls.update({
    ...github.context.repo,
    pull_number: number,
    title,
    body,
  })
}
