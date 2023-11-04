import {emailActions} from './emailSlice';

export const getInboxData =  (mail) => {
    return async(dispatch)=>{
     const fetchInbox = async ()=>{
     let res = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com//${mail}/inbox.json`

      );
      const  data = await res.json();
      return data;
      }
    
    try{
        const data =   await fetchInbox();
        let arr = [];
        let unreadMsg = 0;
  
        for (let key in data) {
          if (data[key].read === true) {
            unreadMsg++;
          }
          const id = key;
          arr = [{ id: id, ...data[key] }, ...arr];
           let total = arr.length;
          dispatch(emailActions.recievedMail([...arr]));
          dispatch(emailActions.unreadMessage(unreadMsg));
          dispatch(emailActions.totalMessage(total));
        }
    }
     catch (err) {
      console.log(err);
    }
  }
};

export const getSentData =  (mail) => {
    return async(dispatch)=>{
     const fetchSentBox = async ()=>{
     let res = await fetch(
        `https://mailbox2-baef0-default-rtdb.firebaseio.com//${mail}/sentMailbox.json`

      );
      const  data = await res.json();
      return data;
      }
    
    try{
        const data =   await fetchSentBox();
        let arr = [];

        for (let key in data) {
          const id = key;
          arr = [{ id: id, ...data[key] }, ...arr];
  
          dispatch(emailActions.sendMail([...arr]));
      
        }
      } catch (err) {
        console.log(err);
  
      }
    
  }
};