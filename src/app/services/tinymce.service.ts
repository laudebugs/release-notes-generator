import { Injectable, inject, signal } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { RawEditorOptions } from 'tinymce'
import { generateChatCompletionParams } from '../core/helpers'
import { OpenAIService } from './open-ai.service'
import { TProject } from '../models/project'

@Injectable({
    providedIn: 'root',
})
export class TinymceService {
    #openAI = inject(OpenAIService)

    initializationOptions: RawEditorOptions = {
        plugins: ['ai', 'aidialog', 'aishortcuts', 'lists', 'link', 'image', 'table', 'code', 'help', 'wordcount'],
        ai_request: (request: any, respondWith: any) => {
            respondWith.string((signal: any) => firstValueFrom(
                this.#openAI.getProjectNotes()
            ))
        },
    }
}
