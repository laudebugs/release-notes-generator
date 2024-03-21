import { Injectable, computed, signal } from "@angular/core";
import { TProject } from "../models/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    _project = signal<TProject>(null as unknown as TProject)
    set project(project: any) {
        console.log('project', project)
        this._project.set(project)
    }
    get project() {
        return this._project()
    }
    projectSelected = computed(() => {
        console.log('projectSelected', !!this._project())
        return !!this._project()
    })

    constructor() {
    }
}