export type PrivacyPolicy = {
  retentionDays: number;
  piiMaskingEnabled: boolean;
};

export const defaultPrivacyPolicy: PrivacyPolicy = {
  retentionDays: 90,
  piiMaskingEnabled: true,
};
