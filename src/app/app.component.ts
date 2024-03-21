import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EditorModule } from '@tinymce/tinymce-angular'
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
@Component({
    standalone: true,
    imports: [EditorModule, RouterModule, MatToolbarModule, FormsModule, CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatCardModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'release-notes-generator'
    init = inject(TinymceService).initializationOptions
    project = inject(ProjectService).project
    env = env
    projects = projects
}
