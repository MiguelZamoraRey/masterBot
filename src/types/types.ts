export interface TeamNames {
  name: string;
  rosterId: number;
}

export interface Player {
  lineUpMasterId: number;
  canPlayNextGame: boolean;
  cost: number;
  iconClass: string;
  id: number;
  isActive: boolean;
  isAvailableForStarPoints: boolean;
  name: string;
  number: number;
  position: string;
  starPlayerPoints: number;
  totalStarPlayerPoints: number;
  state: number;
  nigglingInjuries: number;
  level: number;
}
