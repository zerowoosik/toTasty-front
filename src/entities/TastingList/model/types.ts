interface TastingInfo {
  drinkId: number;
  drinkName: string;
  dringImgUrl: string;
}

export default interface TastingList {
  tastingList: TastingInfo[];
}
