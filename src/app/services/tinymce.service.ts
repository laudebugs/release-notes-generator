import { Injectable, computed, inject } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { generateChatCompletionParams } from '../core/helpers'
import { OpenAIService } from './open-ai.service'
import { ProjectService } from './project.service'

@Injectable({
    providedIn: 'root',
})
export class TinymceService {
    #openAI = inject(OpenAIService)
    projectService = inject(ProjectService)

    /**
     * Tinymce initialization options
     */
    initializationOptions = computed(() => {
        return {
            plugins: ['ai', 'aidialog', 'aishortcuts', 'lists', 'link', 'image', 'table', 'code', 'help', 'wordcount'],
            ai_request: (request: any, respondWith: any) => {
                const chatCompletionParams = generateChatCompletionParams(
                    {
                        role: 'user',
                        content: `${request.prompt} ${request.query}`,
                    },
                    {
                        role: 'system',
                        content: `${request.system.join('\n')}`,
                    }
                )
                respondWith.string((signal: any) => firstValueFrom(this.#openAI.getChatCompletion(chatCompletionParams)))
            },
            ai_shortcuts: [
                {
                    title: 'Write Introduction',
                    prompt: 'Add the date and a brief introduction to the document',
                },
                { title: 'For Developers', prompt: 'Make this sound more technical for software Developers', selection: true },
                { title: 'For Media', prompt: 'Make this sound more like a news article', selection: true },
                {
                    title: 'For Academia',
                    prompt: 'Make this sound more like an academic paper',
                    selection: true,
                },
                {
                    title: 'For Creatives',
                    prompt: 'Make this sound more like a creative writing piece or poem',
                    selection: true,
                },
                {
                    title: 'For Social Media',
                    prompt: 'Make this sound more like a social media post and easy to read/understand',
                    selection: true,
                },
                {
                    title: 'For Business',
                    prompt: 'Make this sound more like it\'s targeted at business professionals',
                    selection: true,
                },
                {
                    title: 'For General',
                    prompt: 'Make this sound more like a general piece of writing',
                    selection: true,
                }
              ]
        }
    })
}
