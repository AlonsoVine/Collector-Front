
export class Carta {
  id: number;
  name: string;
  manaCost: string;
  convertedManaCost: number;
  colors: string;
  rarity: string;
  scryfallId: string;
  scryfallIllustrationId: string;
  scryfallOracleId: string;

  imagenesCarta: Map<string, string>;
}
