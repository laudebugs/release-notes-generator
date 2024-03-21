import { TProject } from '../models/project'

/**
 * A list of projects to generate release notes for
 * These are hardcoded for now, but in the future, they will be fetched from a backend service
 * or read from the github releases API
 */
export const projects: TProject[] = [
    {
        name: 'Angular',
        releases: [
            {
                version: 'v17.3.1',
                date: '2024-03-20',
                features: [],
                fixes: [
                    `fix - capture data bindings for content projection purposes in blocks: 
                Fixes a regression in the template pipeline where data bindings weren't being captured for content projection purposes. 
                It looks like that the new template pipeline which is enabled by default since version 17.3.0 does not properly handle projected contant which is created dynamically. 
                If the element is statically added as a child of the container element, it is properly projected. However, if the content is dynamically created (e.g. with an if or for), then the container will be empty. 
                It seems to be a rendering/DOM issue only, because the children are properly queried (see the console output).`,
                    `fix - symbol feature detection for the compiler. Use the actual symbol presence in the .d.ts to detect whether two-way binding to writable signals should be template type-checked.  
                Generate release notes and a short blog post  `,
                ],
            },
        ],
    },
    {
        name: 'Qwik',
        releases: [
            {
                version: 'v1.5.1',
                date: '2024-03-12',
                features: [
                    `fix(cloudflare): cache-control ignored by cf (#3679)" by @wmertens in #5952`,
                    `feat(build): only commit changes to artifacts by @wmertens in #5953`,
                    `fix(build): make node:async_hooks external in build by @wmertens in #5960`,
                    `chore(starters): better externals configuration by @wmertens in #5961`,
                    `docs: move npm run build to Dockerfile by @LukeSchlangen in #5956`,
                ],
                fixes: [
                    `fix(build): skip empty commits by @wmertens in #5955`,
                    `fix(build): artifacts build by @wmertens in #5957`,
                    `chore(docs): fix drizzle integration page not showing up by @LazyClicks in #5958`,
                    `fix(qwik-city): spa-shim.ts import scripts from wrong path by @blueagler in #5954`,
                    `docs: fix integration menu by @gioboa in #5962`,
                ],
            },
        ],
    },
    {
        name: 'Kamal',
        releases: [
            {
                version: 'v1.4.0',
                date: '2024-03-21',
                features: [
                    `Allow local builds using a different arch than native by @dhh in #640`,
                    `Supports Passing SSH Agent Socket to Build Options by @rience in #434`,
                    `Allow for Custom Accessory Service Name by @rience in #506`,
                    `Accessory CLI respects --hosts by @nicklozon in #608`,
                    `require missing net/scp dependency by @juan-apa in #645`,
                    `Bump default Traefik image to 2.10 by @igor-alexandrov in #680`,
                    `Config the number of containers to keep by @djmb in #650`,
                    `Mention Sprockets config in deploy template by @aishek in #627`,
                    `Add a simple validation to the service name to prevent setup issues by @nickhammond in #692`,
                    `Ensure kamal remove completes without setup by @djmb in #706`,
                    `Escape the docker registry username and password by @djmb in #704`,
                    `Replace \`service\` by 'service' so it doesn't get executed by bash by @dorianmariecom in #696`,
                    `Ensure a minimum limit of 1 for % boot strategy by @djmb in #707`,
                    `Remove warning for valid service name by @nickhammond in #708`,
                    `Add --skip_push option to setup by @GeNiuS69 in #558`,
                    `Add docker-setup hook by @tsvallender in #585`,
                    `Role specific logging configuration by @nicklozon in #593`,
                    `Install docker with curl or wget by @djmb in #710`,
                    `Allow lines option to be configured when following app logs by @alhafoudh in #634`,
                    `Informative message on lock error by @DanielJackson-Oslo in #656`,
                    `Pass around Roles instead of Strings by @djmb in #715`,
                ],
                fixes: [],
            },
        ],
    },
]
