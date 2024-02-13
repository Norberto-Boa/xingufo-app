export interface AdType {
  id: number;
  teamId: number;
  gameDate: string;
  gameTime: string;
  location: string;
  valid: boolean;
  team: {
    name: string;
    badge: string;
    city: string;
    province: string;
    homeField: string;
  };
  createdAt: string;
  updatedAt: string;
}
