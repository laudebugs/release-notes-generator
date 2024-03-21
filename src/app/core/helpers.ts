import OpenAI from 'openai'
import { TRelease } from '../models/project'

/**
 * The System Message to Use
 */
export const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
    role: 'system',
    content:
        'You are a technical writer who writes release notes for a popular software product. Your work involves getting releases from github, including the features added, issues fixed and summarizing them in two formats: A Release Notes for the release and a blog post format.',
}

/**
 * Generates a user message to send to the OpenAI Chat Completions API
 * @param releasedItems - The items that were released
 * @returns A user message to send to the OpenAI Chat Completions API
 */
export const generateUserMessage = (release?: TRelease): OpenAI.Chat.ChatCompletionMessageParam => ({
    role: 'user',
    content: `Given the following list of features and issues, write a release note for the release and a blog post format:
${combineReleaseNotes(release)}
`,
})

/**
 * Generates the chat completion parameters to send to the OpenAI Chat Completions API
 * @param releasedItems The items that were released
 * @returns The chat completion parameters to send to the OpenAI Chat Completions API
 */
export const generateChatCompletionParams = (release?: TRelease): OpenAI.Chat.ChatCompletionCreateParams => {
    return {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 800,
        messages: [systemMessage, generateUserMessage(release)],
    }
}

export const combineReleaseNotes = (release?: TRelease) => {
    if (!release) return ''
    return `## ${release.version} - ${release.date}
### Features
${release.features.map((feature) => `- ${feature}`).join('\n')}
### Fixes
${release.fixes.map((fix) => `- ${fix}`).join('\n')}
`
}