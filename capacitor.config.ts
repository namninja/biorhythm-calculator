import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.reiterableCoffee.biorhythms',
  appName: 'Biorhythms',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

// const config: CapacitorConfig = {
//   appId: 'com.reiterableCoffee.biorhythms',
//   appName: 'Biorhythms',
//   webDir: 'build',
//   server: {
//     url: 'http://192.168.86.52:3000',
//     cleartext: true
//   },
//   plugins: {
//     PushNotifications: {
//       presentationOptions: ["badge", "sound", "alert"],
//     },
//   },
// };
export default config;
