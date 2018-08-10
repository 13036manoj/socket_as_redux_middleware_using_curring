import {combineReducers} from 'redux';
import { stat } from 'fs';
let initialState={   
                    }
  function run_timer (state ='', action) {
    console.log('in run_timer',action)
   switch (action.type) {
     case 'START_TIMER':
       return {...state,timer_status:'running'}
     case 'STOP_TIMER':
       return {...state,timer_status:'stoped'}
     default:
       return state
   }
 }

function init_sheet_data (state=[] , action) {
  console.log('in SET_SHEET_DATA',action)
 switch (action.type) {
   case 'SET_SHEET_DATA':
     return action.data;
    case 'TIMER_TICK':
      const stage_key=action.stage_index;
      const task_key=action.task_index;
  console.log('in ticking timer',action)
      
      // const updateTimerCount=state[timer_id]+1;
      // console.log('reducer TIMER_TICK',state,action,updateTimerCount,state[timer_id])
     const ticking_statge=state[stage_key];
     const ticking_task=ticking_statge.task;
     const updated_value=ticking_task[task_key].timer+1;
    const increment_task={...ticking_task[task_key],['timer']:updated_value}
    const update_ticking_task=[...ticking_task.slice(0,task_key),{...increment_task},...ticking_task.slice(task_key+1)];
     const updated_stage_index={...ticking_statge,task:update_ticking_task}

    // console.log('in ticking_statge ++++== ',update_ticking_task,updated_stage_index)
      // action.ws.send([...state.slice(0,stage_key),{...updated_stage_index},...state.slice(stage_key+1)])
      return [...state.slice(0,stage_key),{...updated_stage_index},...state.slice(stage_key+1)];
      case 'CHANGE_FIELD':
      const stg_key=action.stage_key;
      const tsk_key=action.task_key;
      const temp_key_val=action.key_val
      const changing_statge=state[stg_key];
      console.log('tsk_keytsk_key',tsk_key)
      if(tsk_key==null){
        const updated_stage_field={...changing_statge,...temp_key_val}
        // console.log("changing_field",stg_key,temp_key_val,changing_statge,updated_stage_field)
         return [...state.slice(0,stg_key),{...updated_stage_field},...state.slice(stg_key+1)];
      }
       const changing_statge_task=changing_statge.task;
       const peticular_changing_task=changing_statge_task[tsk_key];
       const updated_peticular_changing_task={...peticular_changing_task,...temp_key_val}
       const update_changing_stage_task=[...changing_statge_task.slice(0,tsk_key),{...updated_peticular_changing_task},...changing_statge_task.slice(tsk_key+1)]
       const updating_changing_stage={...changing_statge,task:update_changing_stage_task}
       const update_state=[...state.slice(0,stg_key),{...updating_changing_stage},...state.slice(stg_key+1)];
      // console.log("changing_field",update_changing_stage_task,update_state)
        // return [...state.slice(0,stg_key),{...update_changing_stage_task},...state.slice(stg_key+1)];
      return update_state
    //   case 'ADD_TASK_TO_STATE':
    //  const stg_key=action.stage_key;
    //  const addiacle_task_Stage=state[stg_key]
    //  const added_task_statge=addiacle_task_Stage.task.concat({name:'new added task'})
    //   return [...state.slice(0,stg_key),{...updating_changing_stage},...state.slice(stg_key+1)]
   default:
     return state
 }
} 
function web_socket (state={data:[]} , action) {
  console.log('in SET_SHEET_DATA',action)
 switch (action.type) {
   case 'SOCKET_CONNECTED':
     return {...state,status:'connected'};
    case 'SOCKET_DISCONNECTED':
    return {...state,status:'disconnected'};
    case 'SOCKET_MESSAGE_RECIEVED':
    // let updated_data=[...state.data,...action.msg]
    // return {...state,data:[...updated_data]};
    return {...state,data:[...action.msg]}
   default:
     return state
 }
} 

function net_status (state={} , action) {
  console.log('in SET_SHEET_DATA',action)
 switch (action.type) {
   case 'CHECK_INTERNET_STATUS':
     return {...state,net_status:action.internetStatus};
   default:
     return state
 }
} 





 
 
  export default combineReducers({
    run_timer,
    init_sheet_data,
    web_socket,
    net_status
});