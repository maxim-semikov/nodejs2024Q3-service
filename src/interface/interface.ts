export const FavoriteTypeValues = ['artist', 'album', 'track'] as const;
export type FavoriteTypes = typeof FavoriteTypeValues[number];
