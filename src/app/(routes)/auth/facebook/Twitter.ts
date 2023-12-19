import {TwitterApi} from 'twitter-api-v2'
import dotenv from 'dotenv';
import path from "path";
import config from "../../../../../config";

var oauth_consumer_key=process.env.REACT_APP_TWITTER_CONSUMER_KEY;
var oauth_consumer_secret=process.env.REACT_APP_TWITTER_CONSUMER_SECRET;
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });
export const TOKENS = {
    appKey:config.TWITTER_CONSUMER_KEY,
    appSecret: config.TWITTER_CONSUMER_SECRET,
};
export const client = new TwitterApi({...TOKENS});
export async function getApi(){
    var oauth_consumer_key=process.env.REACT_APP_TWITTER_CONSUMER_KEY;
    var oauth_consumer_secret=process.env.REACT_APP_TWITTER_CONSUMER_SECRET;
    
    var CALLBACK_URL='http://localhost:8000/twitter'
        
        const authLink = await client.generateAuthLink(CALLBACK_URL, { linkMode: 'authorize' });
        return authLink;
}