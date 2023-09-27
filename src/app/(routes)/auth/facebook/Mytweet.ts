import fs from 'fs';
import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import config from "../../../../../config";

export const TOKENS = {
  appKey:config.TWITTER_CONSUMER_KEY,
  appSecret: config.TWITTER_CONSUMER_SECRET,
};

// Create client used to generate auth links only
export const requestClient = new TwitterApi({ ...TOKENS });

export default requestClient;