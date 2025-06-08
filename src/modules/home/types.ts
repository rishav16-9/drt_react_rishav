export type Satellite = {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate?: string | null;
  decayDate?: string | null;
  objectType?: string | null;
  launchSiteCode?: string | null;
  countryCode?: string | null;
  orbitCode?: string | null;
};
