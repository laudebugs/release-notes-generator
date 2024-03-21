export type TProject = {
    name: string,
    releases: TRelease[]
}

export type TRelease = {
    version: string,
    date: string,
    features: string[],
    fixes: string[]
}