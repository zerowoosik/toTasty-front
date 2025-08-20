export enum DrinkType {
  coffee = 'COFFEE',
  whisky = 'WHISKY',
  wine = 'WINE',
  end = 'END',
}

export interface LocationInfo {
  sido: string;
  address: string;
  detail: string;
}

export interface TastingInfo {
  drinkId?: number;
  drinkName?: string;
  drinkTaste?: string; // 음료 맛
  drinkFlavor?: string; // 음료 향
  drinkColor?: string; // 음료 색
  drinkImgUrl?: string;
  drinkImageUrl?: string;
  drinkType?: DrinkType;
}
