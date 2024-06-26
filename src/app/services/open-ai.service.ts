import { HttpClient } from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core'
import { OpenAI } from 'openai'
import { catchError, map, take } from 'rxjs/operators'
import { env } from '../../env'
import { generateChatCompletionParams, generateUserMessage } from '../core/helpers'
import { ProjectService } from './project.service'

@Injectable({
    providedIn: 'root',
})
export class OpenAIService {
    /** OPenAI Base Chat Completions URL */
    #baseUrl = 'https://api.openai.com/v1/chat/completions'

    /** HTTP Client */
    #httpClient = inject(HttpClient)

    projectSvc = inject(ProjectService)

    /** Holds the project notes */
    projectNotes = signal<string>('')

    /** Holds the loading state for the notes */
    loadingNotes = signal<boolean>(false)

    getProjectNotes() {
        this.loadingNotes.set(true)
        const request = generateChatCompletionParams(generateUserMessage(this.projectSvc.project().releases.at(0)))
        return this.getChatCompletion(request)
            .pipe(
                map((response) => {
                    this.loadingNotes.set(false)
                    this.projectNotes.set(response)
                    return response
                }),
                take(1)
            )
            .subscribe()
    }
    /**
     * Generates a chat completion request for the OpenAI Chat Completions API
     *
     * @param request The request to send to the OpenAI Chat Completions API
     * @returns A promise that resolves to the chat completions
     */
    getChatCompletion(request: OpenAI.Chat.ChatCompletionCreateParams) {
        return this.#httpClient
            .post<Awaited<OpenAI.Chat.ChatCompletion>>(this.#baseUrl, request, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${env.OPENAI_API_KEY}`,
                },
            })
            .pipe(
                map((response) => {
                    return response.choices.at(0)?.message.content ?? 'nothing returned'
                }),
                catchError((error) => {
                    if (error.error) {
                        throw new Error(error.error?.error?.message)
                    }
                    throw new Error('Failed to communicate with the ChatGPT API')
                })
            )
    }
}
