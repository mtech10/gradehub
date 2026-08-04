export const adminSettingsData = {
  profile: {},

  notifications: {
    resultUploads: true,
    studentRegistrations: true,
    departmentUpdates: true,
    courseUpdates: true,
    failedLogins: true,
    systemMaintenance: false,
  },

  security: {
    twoFactorAuth: true,
    loginNotifications: true,
    apiAccess: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
  },

  appearance: {
    darkMode: false,
    useSystemTheme: true,
    theme: "system",
    density: "comfortable",
  },

  backup: {
    autoBackup: true,
    frequency: "weekly",
  },

  userManagement: {
    selfRegistration: false,
    emailVerification: true,
    adminApproval: true,
  },

  system: {
    maintenanceMode: false,
    debugMode: false,
    autoUpdates: true,
  },
};
