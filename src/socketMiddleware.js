import {socketConnected,socketDisconnected,socketMsgReceived,initSheetData} from './actions'
var heartbeat_msg = '--heartbeat--', heartbeat_interval = null, missed_heartbeats = 0;
// const WebSocket = require('ws');



//  websocket as promis code below 

// const WebSocketAsPromised = require('websocket-as-promised');
// const wsp = new WebSocketAsPromised('ws://localhost:3000',{
//   packMessage: data => JSON.stringify(data),
//   unpackMessage: message => message,
//   attachRequestId: (data, requestId) => Object.assign({id: requestId}, data), // attach requestId to message as `id` field
//   extractRequestId: data => data && data.id,                                  // read requestId from message `id` field
// });



const socketMiddleware = (function(){ 
  var socket = null;

  const onOpen = (ws,store,token) => evt => {
    console.log('onopen')
    //Send a handshake, or authenticate with remote end

    //Tell the store we're connected
    if (heartbeat_interval === null) {
      missed_heartbeats = 0;
      heartbeat_interval = setInterval(function() {
          try {
              missed_heartbeats++;
              if (missed_heartbeats >= 3)
                  throw new Error("Too many missed heartbeats at cliient.");
              ws.send(heartbeat_msg);
          } catch(e) {
              clearInterval(heartbeat_interval);
              heartbeat_interval = null;
              console.log("Closing connection. Reason: " + e.message);
              ws.close();
          }
      }, 5000);
  }
   // console.log('on open',ws)
    // store.dispatch(socketConnected());
    //  ws.send(JSON.stringify({change_type:'startProject',projectId:'5ae84ccaeb62994139fb1494sf',userId:'ygbnqkuzbpgctrezhx1nb3c4jr',activityId:"5ae84d07eb62994139fb149e"}))
 
}
   
  const onClose = (ws,store) => evt => {
    console.log('onCloseonClose',ws)
    //Tell the store we've disconnected
    // store.dispatch(socketDisconnected());
    ws.close()
  }

  const onMessage = (ws,store) => evt => {
      // console.log('onmesagerecieved', evt )
    
   var msg = JSON.parse(evt.data);
      // var msg = {type:'unkwon'};
      if (msg === heartbeat_msg) {
        // reset the counter for missed heartbeats
        missed_heartbeats = 0;
        console.log('onmesagerecieved',msg,missed_heartbeats)
        return;
    }
     if(msg.type=='initial___________'){
        console.log('onmesagerecieved', msg )
        store.dispatch(initSheetData(msg.iniData))
        store.dispatch(socketMsgReceived(msg));

     }else if(msg.type=='utf8______'){
        console.log('onmesagerecieved',JSON.parse( msg.utf8Data) )
        store.dispatch(socketMsgReceived(JSON.parse( msg.utf8Data)));
     }
    
  }
  const onError = (ws,store) => evt => {
    console.log('on error', evt )
//  var msg = JSON.parse(evt.data);
    // var msg = {type:'unkwon'};
  
  //  if(msg.type=='initial'){
  //     console.log('onmesagerecieved', msg )
  //     store.dispatch(initSheetData(msg.iniData))
  //     store.dispatch(socketMsgReceived(msg));

  //  }else if(msg.type=='utf8'){
  //     console.log('onmesagerecieved',JSON.parse( msg.utf8Data) )
  //     store.dispatch(socketMsgReceived(JSON.parse( msg.utf8Data)));
  //  }
  
}
  

  return store => next => action => {
    switch(action.type) {

      //The user wants us to connect
      case 'CONNECT':
       
        //Send an action that shows a "connecting..." status for now



  //  websocket as promise code 

  //  wsp.open()
  // .then(() => console.log('Connected.')) 
  // // send data and expect response message from server
  // .then(() => wsp.send(JSON.stringify({change_type:'startProject',projectId:'5ae84ccaeb62994139fb1494',userId:'ygbnqkuzbpgctrezhx1nb3c4jr',activityId:"5ae84d07eb62994139fb149e"})))
  // .then(response => console.log('Response promise received', response))
  // // disconnect
  // // .then(() => wsp.close())
  // // .then(() => console.log('Disconnected.'))
  // .catch((err)=>{
  //   console.log('some error',err)
  // });
  // wsp.onMessage.addListener(message => console.log('on_message_message',message));
  // wsp.onClose.addListener(() => console.log('closing'));
  // wsp.onResponse.addListener(data => console.log('on_message_response',data));
  




// ws web socket implemented
        // socket = new WebSocket('ws://localhost:8080');
        // socket.on('open', function open() {
        //   console.log('connected');
        //   socket.send('on open');
        // });
         
        // socket.on('close', function close() {
        //   console.log('disconnected');
        // });
         
        // socket.on('message', function incoming(data) {
        //   console.log(`Roundtrip time:`);
         
        // });





    // 
     //Start a new connection to the server
     if(socket != null) {
        socket.close();
      }
    
    //  socket = new WebSocket('ws://139.59.38.134:8065');
      socket = new WebSocket('ws://localhost:8080','echo-protocol');
        
        // store.dispatch(socketConnected());
        socket.onmessage = onMessage(socket,store);
        socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket,store,action.token);
        socket.onerror=onError(socket,store);

        break;

      //The user wants us to disconnect
      case 'DISCONNECT':
        if(socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        store.dispatch(socketDisconnected());
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case 'SEND_CHAT_MESSAGE':
      console.log('SEND_CHAT_MESSAGE========',action)
      //  socket.send('request_callback','tobi', function (data) {
      //  console.log('request_callback',data)
      // })
      socket.send('request_callback')
      //  socket.send(JSON.stringify(action),function ack(error) {
      //   // If error is not defined, the send has been completed, otherwise the error
      //   // object will indicate what failed.
      //   console.log('error in send socket middleware',error)
      // });
        break;
      case 'SEND_TIMER_TOSOCKET':
        let updated_timer_value=action.getState().init_sheet_data[action.stage_index].task[action.task_index].timer;
        let key_val={'timer':updated_timer_value}

        console.log('SEND_TIMER_TOSOCKET========',action,updated_timer_value,key_val)
        socket.send(JSON.stringify({...action,key_val}));
        break;
       case 'ADD_TASK_TO_SOCKET':
        console.log('ADD_TASK_TO_SOCKET========',action)
         socket.send(JSON.stringify(action));
          break;
        case 'ADD_STAGE_TO_SOCKET':
           console.log('ADD_STAGE_TO_SOCKET========',action)
           socket.send(JSON.stringify(action));
          break;
        

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware