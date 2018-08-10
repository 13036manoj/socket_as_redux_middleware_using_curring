var timer='';
var hitSocketApi='';
var connectivity_interval='';
var hit_google_interval='';
var internetStatus='';
export function startTimer(stage_index,task_index,stage_key,task_key) {
    return async (dispatch, getState) => {
        let temp_state=getState();
        let change_type='timer_tick';
        console.log('temp_statetemp_state',temp_state)
        // let current_timer_val=temp_state.init_sheet_data[stage_index].task[task_index].timer;
        let sheet_data=temp_state.init_sheet_data;
        timer =  setInterval(() => dispatch({ type: 'TIMER_TICK',stage_index,task_index}), 1000);
        hitSocketApi = setInterval(() =>dispatch({ type: 'SEND_TIMER_TOSOCKET',stage_index,task_index,stage_key,task_key,getState,change_type}),4*1000)
          dispatch({ type: 'START_TIMER'});
          dispatch({ type: 'TIMER_TICK',stage_index,task_index});
    };
}
export function stopTimer() {
    return async (dispatch, getState) => {
        clearInterval(timer);
        clearInterval(hitSocketApi);
        dispatch({ type: 'STOP_TIMER' });
    };
}
export function initSheetData(data) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SET_SHEET_DATA',
            data,
        });
    };
}
export function socketConnected() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SOCKET_CONNECTED',
        });
    };
}
export function socketDisconnected() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SOCKET_DISCONNECTED',
        });
    };
}
export function socketMsgReceived(msg) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SOCKET_MESSAGE_RECIEVED',
            msg,
        });
    };
}
export function sendSocketMsg(stage_key,task_key,key_val,change_type) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SEND_CHAT_MESSAGE',
            stage_key,
            task_key,
            key_val,
            change_type
        });
    };
}
export function connecting() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'CONNECT',
           
        });
    };
}
export function changeField(stage_key,task_key,key_val) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'CHANGE_FIELD',
            stage_key,
            task_key,
            key_val
           
        });
    };
}

export function addTaskToSocket(stage_key) {
    return async (dispatch, getState) => {
        dispatch({
            type: 'ADD_TASK_TO_SOCKET',
            stage_key,
            change_type:'add_new_task',

        });
    };
}

export function addStageToSocket() {
    return async (dispatch, getState) => {
        dispatch({
            type: 'ADD_STAGE_TO_SOCKET',
            change_type:'add_new_stage',

        });
    };
}
export function checkInternetConnectivity() {
       hit_google_interval = setInterval(() => isInternetConnected(), 4000)
    return async (dispatch, getState) => {
        connectivity_interval =  setInterval(() => dispatch({ type: 'CHECK_INTERNET_STATUS',internetStatus}), 5000);
    };
}
export function isInternetConnected()
{
    fetch('http://www.google.com')
    // .then(res => res.json())
    .then(json => {console.log('fetch json',json)
                   internetStatus='online'
                })
    .catch(err=> {console.log('fetch err',err)
                 internetStatus='ofline'
               });

}


export default {
    startTimer,
    stopTimer,
    initSheetData,
    socketConnected,
    socketDisconnected,
    socketMsgReceived,
    sendSocketMsg,
    connecting,
    changeField,
    addStageToSocket,
    addTaskToSocket
    
};