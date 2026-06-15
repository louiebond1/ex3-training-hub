export type Step = {
  id: number
  description: string
  screenshot?: string
}

export type Process = {
  id: string
  title: string
  video?: string
  steps: Step[]
}

export type Category = {
  id: string
  title: string
  processes: Process[]
}

export type Module = {
  id: string
  title: string
  description: string
  icon: string
  active: boolean
  categories: Category[]
}
