import { Injectable, computed, inject } from '@angular/core'
import { firstValueFrom, take } from 'rxjs'
import { OpenAIService } from './open-ai.service'
import { ProjectService } from './project.service'
import { generateChatCompletionParams } from '../core/helpers'

@Injectable({
    providedIn: 'root',
})
export class TinymceService {
    #openAI = inject(OpenAIService)
    projectService = inject(ProjectService)

    initializationOptions = computed(() => {
        return {
        plugins: ['ai', 'aidialog', 'aishortcuts', 'lists', 'link', 'image', 'table', 'code', 'help', 'wordcount'],
        ai_request: (request: any, respondWith: any) => {
            const chatCompletionParams = generateChatCompletionParams({
                role: 'user',
                content: `${request.prompt} ${request.query}`,
            },
            {
                role: 'system',
                content: `${request.system.join('\n')}`
            }
            )
            respondWith.string((signal: any) => firstValueFrom(this.#openAI.getChatCompletion(chatCompletionParams)))
        },
    }
})
}
