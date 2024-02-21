export interface gameDTO {
  id: number;
  location: string;
  homeTeamId: number;
  awayTeamId: number;
  gameDate: Date;
  gameTime: Date;
  home: {
    id: number;
    name: string;
    badge: string;
    foundedAt: Date;
    homeField: string;
    city: string;
    province: string;
    userId: 23;
  };
  away: {
    id: number;
    name: string;
    badge: string;
    foundedAt: Date;
    homeField: string;
    city: string;
    province: string;
    userId: number;
  };
}
