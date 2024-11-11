export interface Game {
  gameId: string;
  name: string;
  date: Date;
  gameStage: string;
  roundStage: string;
  roundNumber: number;
  teams: TeamData[];
  bubbleStakes: number;
  hostActions: HostAction[];
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

export interface HostAction {
  action: Action;
  description: string;
}

export enum Action {
  START_GAME,
  CHOOSE_CATEGORY,
  START_AUCTION,
  FINISH_AUCTION,
  RANDOM_QUESTION,
  SHOW_QUESTION,
  SELL_ANSWERS,
  ANSWER_THE_QUESTION,
  FINISH_ROUND,
  GO_TO_THE_FINAL,
}

export interface CreateGameRequest {
  name: string;
}

export interface PerformActionRequest {
  gameId: string;
  action: Action;
}
