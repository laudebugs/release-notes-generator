import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatOptionModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router'
import { MatButtonLoading } from '@ng-matero/extensions/button'
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular'
import { MarkdownComponent } from 'ngx-markdown'
import { env } from '../env'
import { projects } from './core/data'
import { CombineReleaseNotesPipe } from './core/pipes/combine-release-notes.pipe'
import { OpenAIService } from './services/open-ai.service'
import { ProjectService } from './services/project.service'
import { TinymceService } from './services/tinymce.service'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { icons } from './core/constants'

@Component({
    standalone: true,
    imports: [
        EditorModule,
        RouterModule,
        MatToolbarModule,
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatButton,
        MatButtonLoading,
        CombineReleaseNotesPipe,
        MarkdownComponent,
        MatIconModule
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
    tinyMCESvc = inject(TinymceService)
    openAISvc = inject(OpenAIService)
    projectSvc = inject(ProjectService)

    env = env
    projects = projects

    /**
     * Query the editor component from the view
     */
    editor = viewChild.required<EditorComponent>(EditorComponent)

    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        /**
         * Run an effect to write the value of the editor when the project notes are loaded from the OpenAI service
         */
        effect(() => {
            if (this.openAISvc.projectNotes().length > 0) {
                this.editor().writeValue(this.openAISvc.projectNotes())
            }
        })

        /**
         * Register the icons
         */
        icons.map((icon) => {
            this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`))
        })
    }
}
