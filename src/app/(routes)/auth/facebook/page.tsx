import { Login } from './Login'
import TwitterApi from 'twitter-api-v2';
import {requestClient} from './Mytweet';
export default async function Home() {
  var CALLBACK_URL='https://authserver-one.vercel.app/twitter';
  
  return (
    <>
      <h1>3-legged Twitter Oauth</h1>
      <Login />
    </>
  )
}
