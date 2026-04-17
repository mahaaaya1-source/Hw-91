import 'dotenv/config';

const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '415423549718-viauit5dtjelmd41i4g4d39r1dgcso56.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
  },
};

export default config;