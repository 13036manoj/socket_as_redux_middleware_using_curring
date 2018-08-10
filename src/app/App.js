import React, { Component } from 'react';
import '../App.css';
var counting=0;
class App extends Component {
  constructor(props) {
		super(props);
    this.props.actions.connecting();

		this.state = {
			messages:[],
			myMessage: 0,
			error: undefined
		}

		// this.handleChange = this.handleChange.bind(this);
		// this.sendMyMessage = this.sendMyMessage.bind(this);
	}
  componentWillMount(){
    // this.props.actions.checkInternetConnectivity();
// let data={Planning_user_servey:0,Planning_report:0,Planning_user_interView:0,UX_user_servey:0,UX_report:0,UX_user_interView:0}
    //  this.props.actions.readyAllTimer(data)
     window.addEventListener("beforeunload", (ev)=>{
          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close?';
       }
    )
  } 
  componentWillReceiveProps(nextProps){
    if(nextProps.internet_status=='ofline'){
      // alert('you have no internet connection')
      console.log('no internet connection')
    }
    else{
      console.log('have internet connection')
    }
  }
  startTimerNow=(statg_index,task_index,stage_key,task_key)=>{
    // console.log('function task_id ',stage_key)
    if(this.props.istimer_running!=='running'){
      this.props.actions.startTimer(statg_index,task_index,stage_key,task_key)
    }
    else{
      this.props.actions.stopTimer()
    }
  }
  stopedTimerNow=()=>{
    if(this.props.istimer_running=='running'){
        this.props.actions.stopTimer()
    }
  }
  directClose=()=>{
    // this.props.actions.tabCloseStatus()
    
  }
  handleTest=(e,stage_id,task_id,key_val,change_type)=>{
    console.log("handleTest",e,e.target.value)
    if (e.charCode == 13) {
      alert('Enter... (KeyPress, use charCode)');

    }
    if (e.keyCode == 13||e.keyCode == 9) {
      this.props.actions.sendSocketMsg(stage_id,task_id,key_val,change_type)
      alert('Enter... (KeyDown, use keyCode)');
    }
  }
  addTaskToStage=(stage_index,stage_id)=>{
    // this.props.actions.addTaskToState(stage_index);
    this.props.actions.addTaskToSocket(stage_id);


  }
  addNewStage=()=>{
    // this.props.actions.addTaskToState(stage_index);
    this.props.actions.addStageToSocket();


  }
  
  renderWhloleSheet=()=>{
    let sys_width=window.innerWidth
     
  return this.props.sheet_data.map((val,key)=>{ 
let stage_id=val._id;
// console.log('sys_width',sys_width)
  return(  
  <div key ={key}>
    <div className='stage_header'>
      <div style={{width:sys_width/12,}}>Stage</div>
      <div  style={{width:2*sys_width/12}}>Stage details</div>
      <div  style={{width:sys_width/12}}>Expected Hours</div>
      <div style={{width:2*sys_width/12}}>Actual hours consumed</div>
      <div style={{width:sys_width/12}}>Status</div>
      <div style={{width:sys_width/12}}>Add a tag</div>
      <div style={{width:sys_width/12}}>Timeline</div>
      <div style={{width:2*sys_width/12}}>Deliverables</div>
      <div style={{width:sys_width/12}}>action</div>
   </div>
  <div className='stage_value'>
     <input type="text" name="statge" value={val.name} onKeyDown={(e)=>this.handleTest(e,val._id,null,{name:e.target.value},'stage_change')} onChange={(e)=>this.props.actions.changeField(key,null,{name:e.target.value})}/>
      {/* <div style={{width:sys_width/12,}}>{val.name}</div> */}
      <div  style={{width:2*sys_width/12}}>{val.stage_details}</div>
      <div  style={{width:sys_width/12}}>{val.Expected_Hours}</div>
      <div style={{width:2*sys_width/12}}>{val.Actual_hours_consumed}</div>
      <div style={{width:sys_width/12}}>{val.Status}</div>
      <div style={{width:sys_width/12}}>{val.Add_a_tag}</div>
      <div style={{width:sys_width/12}}>{val.Timeline}</div>
      <div style={{width:2*sys_width/12,borderWidth:1}}>{val.Deliverables}</div>
      <div style={{width:sys_width/12}}>del and edit</div>
   </div>
      {  val.task.map((val1,key1)=>{
         let task_id=val1._id;
         console.log('for key1',key1)
         if(key1===0){
         return (
          <div>
            <div className='task_header'>
              <div style={{width:sys_width/14,}}>Task</div>
              <div  style={{width:2*sys_width/14}}>Task details</div>
              <div  style={{width:sys_width/14,}}>Expected Hours</div>
              <div style={{width:1.5*sys_width/14}}>Actual hours consumed</div>
              <div style={{width:1.5*sys_width/14}}>Assigned to</div>
              <div style={{width:sys_width/14}}>Status</div>
              <div style={{width:1.5*sys_width/14}}>Add a tag</div>
              <div style={{width:sys_width/14}}>Timeline</div>
              <div style={{width:1.5*sys_width/14}}>Deliverables</div>
              <div style={{width:sys_width/14}}>Comments</div>
              <div style={{width:sys_width/14}}>action</div>
              
          </div>
          <div className='task_value' >
    
          <input type="text" name="statge" value={val1.name} onKeyDown={(e)=>this.handleTest(e,val._id,val1._id,{name:e.target.value},'task_change')} onChange={(e)=>this.props.actions.changeField(key,key1,{name:e.target.value})}/>
          
             {/* <div style={{width:sys_width/14,}}>{val1.name}</div> */}
              <div  style={{width:2*sys_width/14}}>{val1.task_details}</div>
              <div  style={{width:sys_width/14,}}>{val1.expected_hours}</div>
              <div style={{width:1.5*sys_width/14}}>{val1.timer} 
                   <input type='button' name='on/of' value='on/off' onClick={()=>this.startTimerNow(key,key1,val._id,val1._id)}/>
              </div>
              <div style={{width:1.5*sys_width/14}}> {val1.assigned_to}</div>
              <div style={{width:sys_width/14}}>{val1.status}</div>
              <div style={{width:1.5*sys_width/14}}>{val1.add_a_tag}</div>
              <div style={{width:sys_width/14}}>{val1.time_line}</div>
              <div style={{width:1.5*sys_width/14}}>{val1.deliverables}</div>
              <div style={{width:sys_width/14}}>{val1.comment}</div>
              <div style={{width:sys_width/14}}>del and edit</div>
          </div>
        </div>   
             )
         }
       else{
        return <div className='task_value' >
                <div style={{width:sys_width/14,}}>{val1.name}</div>
                <div  style={{width:2*sys_width/14}}>{val1.task_details}</div>
                <div  style={{width:sys_width/14}}>{val1.expected_hours}</div>
                <div style={{width:1.5*sys_width/14}}>{val1.timer} 
                      <input type='button' name='on/of' value='on/off' onClick={()=>this.startTimerNow(key,key1,val._id,val1._id)}/>
                </div>
                <div style={{width:1.5*sys_width/14}}> {val1.assigned_to}</div>
                <div style={{width:sys_width/14}}>{val1.status}</div>
                <div style={{width:1.5*sys_width/14}}>{val1.add_a_tag}</div>
                <div style={{width:sys_width/14}}>{val1.time_line}</div>
                <div style={{width:1.5*sys_width/14}}>{val1.deliverables}</div>
                <div style={{width:sys_width/14}}>{val1.comment}</div>
                <div style={{width:sys_width/14}}>del and edit</div>
        </div>
              }
             } 
            )}
          <input type='button' name='add task' value='add task' onClick={()=>this.addTaskToStage(key,val._id)} />
      </div>
      )
    })
  }
 
  render() {
    // if(this.props.internet_status==='ofline'){
    //   return <div>  please connect to internet</div>
    // }
    return (
      <div className="App">
        <div>
              {this.renderWhloleSheet()} 
              <input type='button' name='add stage' value='add statge' onClick={()=>this.addNewStage()} />
             <input type='button' name='sen to socket' value='sen_to_socket' onClick={this.directClose} />
          </div>
      </div>
    );
  }
}

export default App;
