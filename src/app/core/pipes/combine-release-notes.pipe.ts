import { Pipe, PipeTransform } from "@angular/core";
import { TProject } from "../../models/project";
import { combineReleaseNotes } from "../helpers";

@Pipe({
    standalone: true,
    name: 'combineReleaseNotes'
})
export class CombineReleaseNotesPipe implements PipeTransform {
    transform(value: TProject): string {
        return combineReleaseNotes(value.releases.at(0));
    }
}