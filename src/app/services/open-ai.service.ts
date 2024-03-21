import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, map, take } from 'rxjs/operators';
import { OpenAI } from 'openai';
import { env } from "../../env";
import { combineReleaseNotes, generateChatCompletionParams, generateUserMessage } from "../core/helpers";
import { ProjectService } from "./project.service";

@Injectable({
    providedIn: 'root'
})
export class OpenAIService {

    /** OPenAI Base Chat Completions URL */
    #baseUrl = 'https://api.openai.com/v1/chat/completions'

    /** HTTP Client */
    #httpClient = inject(HttpClient)

    projectSvc = inject(ProjectService)

    projectNotes = signal<string>('')

    loadingNotes = signal<boolean>(false)
    getProjectNotes() {
        this.loadingNotes.set(true)
        const request = generateChatCompletionParams(generateUserMessage(this.projectSvc._project().releases.at(0)))
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
        return this.#httpClient.post<Awaited<OpenAI.Chat.ChatCompletion>>(this.#baseUrl, request, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            }
        })
        .pipe(
            map((response) => {
                return response.choices.at(0)?.message.content ?? 'nothing returned'
            }),
            catchError((error) => {
                if (error.error) {
                    throw new Error(error.error?.error?.message);
                }
                throw new Error('Failed to communicate with the ChatGPT API');
            })
        )
    }

}