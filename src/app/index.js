// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {startTimer,stopTimer,tabCloseStatus,initSheetData,connecting,changeField,sendSocketMsg,addStageToSocket,addTaskToSocket,checkInternetConnectivity} from '../actions'

import App from './App.js';

function mapStateToProps(state) {
   console.log('state_state',state)

    return {
       istimer_running:state.run_timer.timer_status,
       sheet_data:state.init_sheet_data,
       internet_status:state.net_status.net_status
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            startTimer,
            stopTimer,
            initSheetData,
            connecting,
            changeField,
            sendSocketMsg,
            addTaskToSocket,
            addStageToSocket,
            checkInternetConnectivity
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);