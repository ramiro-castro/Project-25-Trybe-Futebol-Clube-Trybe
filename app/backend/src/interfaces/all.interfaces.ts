export interface TeamInterface {
  id: number // id e orderId são opcionais aqui na interface, pois sao preenchidos automaticamente no BD
  teamName: string
}

export interface UserInterface {
  id?: number
  username: string
  role: string
  email: string
  password: string
}

export interface UserConfidentialInterface extends UserInterface {
  password: string
}

export interface LoginInterface {
  email: string
}

export interface MatchesInterface {
  id?: number
  homeTeamId: number
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean
}

export interface ExtendsMatchesInterface extends MatchesInterface {
  homeTeam: { teamName: string }
  awayTeam: { teamName: string }
}
