import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular'
import { MatToolbarModule } from '@angular/material/toolbar'
import { TinymceService } from './services/tinymce.service'
import { env } from '../env'
import { projects } from './core/data'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { ProjectService } from './services/project.service'
import { OpenAIService } from './services/open-ai.service'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatButtonLoading } from '@ng-matero/extensions/button';
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
        MatButtonLoading
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
    title = 'release-notes-generator'
    tinyMCESvc = inject(TinymceService)
    openAISvc = inject(OpenAIService)
    projectSvc = inject(ProjectService)
    env = env
    projects = projects
    editor = viewChild.required<EditorComponent>(EditorComponent)

    constructor() {
        effect(() => {
            console.log(this.openAISvc.projectNotes())
            if (this.openAISvc.projectNotes().length > 0) {
                this.editor().writeValue(this.openAISvc.projectNotes())
            }
        })
    }
}
