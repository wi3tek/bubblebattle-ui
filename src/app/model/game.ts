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
  questionList: QuestionData[];
  categoryList: CategoryData[];
  highestBidAmount: number;
  auctionWinner: TeamData;
  currentCategory: string;
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
  answers: AnswerData[];
  answeredCorrect: boolean;
}

export interface CategoryData {
  value: string;
  count: number;
}

export interface AnswerData {
  value: string;
  correct: boolean;
}

export interface GetGamesResponse {
  games: SimpleGame[];
}

export interface SimpleGame {
  gameId: string;
  name: string;
  date: Date;
  roundDescription: string;
}

export interface RaiseStakesRequest {
  gameId: string;
  teamColor: string;
  bubblesAmount: number;
  finalBid: boolean;
}

export interface HostAction {
  action: Action;
  description: string;
}

export enum Action {
  START_GAME = 'START_GAME',
  CHOOSE_CATEGORY = 'CHOOSE_CATEGORY',
  START_AUCTION = 'START_AUCTION',
  FINISH_AUCTION = 'FINISH_AUCTION',
  RANDOM_QUESTION = 'RANDOM_QUESTION',
  SHOW_QUESTION = 'SHOW_QUESTION',
  SELL_ANSWERS = 'SELL_ANSWERS',
  ANSWER_THE_QUESTION = 'ANSWER_THE_QUESTION',
  FINISH_ROUND = 'FINISH_ROUND',
  GO_TO_THE_FINAL = 'GO_TO_THE_FINAL',
}

export interface CreateGameRequest {
  name: string;
}

export interface PerformActionRequest {
  gameId: string;
  action: Action;
  category: string | null;
  price: number | null;
  teamColor: string | null;
  answer: string | null;
}

export interface ChangeBubblesAmountRequest {
  gameId: string;
  teamColor: string;
  bubblesAmount: number;
}
