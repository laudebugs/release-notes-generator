import { Injectable, signal } from "@angular/core";
import { TProject } from "../models/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    _project = signal<TProject>({} as TProject)
    set project(project: any) {
        this._project.set(project)
    }
    get project() {
        return this._project()
    }
    constructor() {
    }
}