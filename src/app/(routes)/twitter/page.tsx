'use client'
import React, {useState,useEffect} from 'react'
const currentDate = new Date().toISOString().substr(0, 10)

// const uri = 'mongodb://127.0.0.1:27017';
// const databasename = "GFG";
// const collectionname="twitterler";
function renderSwitch(param) {
  switch(param) {
    case 0:
      return 'Scheduled';
  case 1:
       return 'Executed';
    default:
      return 'Some Error Occured';
  }
}

function Twitter() {
  const [tweets, setTweets] = useState([])
  const [tweet, setTweet] = useState('')
  const [link, setLink] = useState('')
  const [date, setDate] = useState(currentDate)
  var contentType= ''
  const [time, setTime] = useState(
    new Date().getHours() + ':' + new Date().getMinutes()
  )
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    fetch('https://authserver-one.vercel.app/tweet').then((response) => response.json())
    .then((data) => {
        console.log(data);
        setTweets(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  },[])
    
  var xhr = new XMLHttpRequest();
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      xhr.open('HEAD', link, true);

      xhr.onload = function() {
      contentType = xhr.getResponseHeader('Content-Type');
    };
    let res = await fetch("https://authserver-one.vercel.app/tweet",
    {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweet: tweet,
        time: new Date(`${date} ${time}`).getTime(),
        date: `${date} ${time}`,
        mediaurl: link,
        tweeturl:'',
        contentType: contentType,
        status: 0
    }),
    
  })
 await res.json();
      if (res.status === 201) {
        setTweet("");
        setTime("");
        setLink("");
        fetch('https://authserver-one.vercel.app/tweet').then((response) => response.json())
        .then((data) => {
           setTweets(data);
        })
        .catch((err) => {
           console.log(err.message);
        })
        setMessage("Tweet Scheduled Successfully");
      } else {
        setMessage("Some error occured");
      }}
catch (err) {
  console.log(err);
}}
  // const sendTweet =
  //   async (event) => {
  //     event.preventDefault()

  //     console.log(new Date(`${date} ${time}`).getTime())
  //     console.log(new Date(`${date} ${time}`))

  //     try {
  //       // faunadbClient.query(
  //       //   q.Create(q.Collection('tweets'), {
  //       //     data: {
  //       //       tweet,
  //       //       date: new Date(`${date} ${time}`).getTime(),
  //       //     },
  //       //   })
  //       // )
  //       // useEffect(() => {
  //       //   fetch('http://localhost:3000/'),{
  //       //     method: "POST",
  //       //     body: JSON.stringify({
  //       //       tweet: tweet,
  //       //       time: time,
  //       //       status: 0
  //       //   }),
           
  //       //   // Adding headers to the request
  //       //   headers: {
  //       //       "Content-type": "application/json; charset=UTF-8"
  //       //   }
  //       // }});
  //       // MongoClient.connect(url).then((client) => {
  
  //       //   const connect = client.db(databasename);
        
  //       //   var doc={tweet:tweet,date:new Date(`${date} ${time}`),status:0}
  //       //   // New Collection
  //       //    connect.collection(collectionname).insertOne(doc, function(err, res) {
  //       //     if (err) throw err;
  //       //     console.log("Document inserted");
  //       //     // close the connection to db when you are done with it
  //       //     connect.close();
        
  //       // }).catch((err) => {
        
  //       //   // Handling the error 
  //       //   console.log(err.Message);
  //       // })});
        

  //       setTweet('')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
      function deletetweet(id){
        try {
          const response =  fetch(`https://authserver-one.vercel.app/tweet/${id}`, {
                  method: "DELETE",
                });
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
      
          const result = response.json();
      
          console.log('result is: ', JSON.stringify(result, null, 4));
      
        } catch (err) {
         console.log(err)
        } 
      }

   
  
  return (
    <div className='flex flex-col'>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-lg m-auto min-h-screen justify-center"
    >
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Your Tweet
      </h2>
      <textarea
        required
        maxLength="280"
        rows="5"
        className="mb-6 focus:ring-indigo-500 focus:border-indigo-500 border-2 w-full p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="I don't understand pineapple pizza"
        value={tweet}
        onChange={(event) => setTweet(event.target.value)}
      />
      <div className="flex items-center mb-8">
        <input
          required
          type="date"
          min={currentDate}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="focus:ring-indigo-500 focus:border-indigo-500 border-2 w-full p-4 sm:text-sm border-gray-300 rounded-md mx-4"
        />
        <input
          required
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="focus:ring-indigo-500 focus:border-indigo-500 border-2 w-full p-4 sm:text-sm border-gray-300 rounded-md mx-4"
        />
      </div>
      <div class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
    <input
      type="url"
      value={link}
      className="content-center focus:ring-indigo-500 focus:border-indigo-500 border-2 w-full p-4 sm:text-sm border-gray-300 rounded-md"
      onChange={(event) => setLink(event.target.value)}
      placeholder="Media Link" />
  </div>
      <button
        type="submit"
        className=" p-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Schedule Tweet
      </button>
        {message ? <p className='pt-2'><div className='flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3'>
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
        <p className="font-bold">{message}</p></div>
        </p> : null}
      
    </form>
    <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900">
       Your Scheduled Tweets
      </h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2">
<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="px-6 py-3">
                Number
            </th>
            <th scope="col" className="px-6 py-3">
                Tweet
            </th>
            <th scope="col" className="px-6 py-3">
                Date
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Link
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    
   {tweets.length>0 && (
        <tbody>
            
            {tweets.map((twt,i) => (  
            <tr key={i} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {i+1}</th>
                <td className="px-6 py-4">
                       {twt.tweet}
                    </td><td className="px-6 py-4">
                       { twt.date}
                    </td><td className="px-6 py-4">
                        {renderSwitch(twt.status)}
                    </td><td className="px-6 py-4 ">
                        <a  href={twt.tweeturl} className="text-blue-600">{twt.tweeturl}</a>
                    </td><td className="px-6 py-4">
                     <button onClick={()=>deletetweet(twt._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Delete
                    </button>
                    </td></tr>
            ))}
            </tbody>
        )} 
</table>
</div> 
    </div>
  )
}

export default Twitter