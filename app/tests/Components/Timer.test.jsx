var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');
describe("Timer component", ()=>{
    it('Timer component 存在與否', ()=> {
       expect(Timer).toExist();
    });

    it("Timer component在狀態為started時會開始計時", (done)=>{
        let timer = TestUtils.renderIntoDocument(<Timer />);

        timer.handleStatusChange('start');
        expect(timer.state.count).toBe(0);

        setTimeout(
           ()=>{
               expect(timer.state.timerStatus).toBe('start');
               expect(timer.state.count).toBe(1);
               //call back
               done();
           },1001);
      });

      it("Timer component在狀態為pause時會暫停計時", (done)=>{
        let timer = TestUtils.renderIntoDocument(<Timer />);
        timer.setState({count:10})
        timer.handleStatusChange('start');
        timer.handleStatusChange('paused');

        setTimeout(
           ()=>{
               expect(timer.state.timerStatus).toBe('paused');
               expect(timer.state.count).toBe(10);
               //call back
               done();
           },1001);
         });

         it("Timer component在狀態為stopped時會重置時間", (done)=>{
        let timer = TestUtils.renderIntoDocument(<Timer />);

        timer.setState({count:10})
        timer.handleStatusChange('start');
        timer.handleStatusChange('stopped');

        setTimeout(
           ()=>{
               expect(timer.state.timerStatus).toBe('stopped');
               expect(timer.state.count).toBe(0);
               //call back
               done();
           },1001);
         });


//-----------結束  Timer測試  
});
