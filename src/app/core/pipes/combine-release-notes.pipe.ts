import { Pipe, PipeTransform } from "@angular/core";
import { combineReleaseNotes } from "../helpers";
import { TProject, TRelease } from "../../models/project";

@Pipe({
    standalone: true,
    name: 'combineReleaseNotes'
})
export class CombineReleaseNotesPipe implements PipeTransform {
    transform(value: TProject): string {
        return combineReleaseNotes(value.releases.at(0));
    }
}