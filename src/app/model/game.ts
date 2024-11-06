export interface Game {
  gameId: string;
  name: string;
  date: Date;
  gameStage: string;
  roundStage: string;
  teams: TeamData[];
  bubbleStakes: number;
}

export interface TeamData {
  teamColor: string;
  bubbleAmount: number;
  bubbleStakesAmount: number;
  active: boolean;
  activeQuestion: QuestionData | null;
  highestStakes: boolean;
}

export interface QuestionData {
  value: string;
  category: string;
  answers: AnsertData[];
}

export interface AnsertData {
  value: string;
  isCorrect: boolean;
}

export interface GetGamesResponse {
  games: SimpleGame[];
}

export interface SimpleGame {
  gameId: string;
  name: string;
  date: Date;
}

export interface ChangeStatusRequest {
  gameId: string;
  team: string;
  bubblesAmount: number;
}
