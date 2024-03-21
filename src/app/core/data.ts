import { TProject } from "../models/project";

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
            version: 'v18.0.0-next.0',
            date: '2023-07-01',
            features: [
                
            ],
            fixes: [
                `fix - capture data bindings for content projection purposes in blocks: 
                Fixes a regression in the template pipeline where data bindings weren't being captured for content projection purposes. 
                It looks like that the new template pipeline which is enabled by default since version 17.3.0 does not properly handle projected contant which is created dynamically. 
                If the element is statically added as a child of the container element, it is properly projected. However, if the content is dynamically created (e.g. with an if or for), then the container will be empty. 
                It seems to be a rendering/DOM issue only, because the children are properly queried (see the console output).`,
                `fix - symbol feature detection for the compiler. Use the actual symbol presence in the .d.ts to detect whether two-way binding to writable signals should be template type-checked.  
                Generate release notes and a short blog post  `
            ]
        }
    ]
}

]