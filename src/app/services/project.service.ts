import { Injectable, computed, signal } from "@angular/core";
import { TProject } from "../models/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    project = signal<TProject>(null as unknown as TProject)
}