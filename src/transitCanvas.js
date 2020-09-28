import React from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import './transitCanvas.css'

class TransitCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state={
            totalCountOfYears:0,
            totalDataset: {},
            busDataset: {},
            railDataset: {},
            paratransitDataset: {},
            labels: [],
            chartData:{
            }//end of chartData obj
        }//end of this.state
    }//end of transit canvas constructor

    componentDidMount(){
        //variables
        var total = [];
        var colorAr = [];
        var borderColorAr = [];
        var totalCount =0;
        var randCounter =0;
        var x;
        //call
        axios.get("https://data.cityofchicago.org/resource/w8km-9pzd.json")
        .then((response)=>{
            console.log(response);
            //build the total dataset
            for (x in response.data){
                total.push(response.data[randCounter].total);
                colorAr.push('rgb(40, 226, 15, 0.2)');
                borderColorAr.push('rgb(40, 226, 15, 1)');
                randCounter = randCounter+ 1;
            }
            this.setState({
                    totalDataset:{
                        label:'Total',
                        data: total,
                        backgroundColor: colorAr,
                        borderColor: borderColorAr
                    } //end of dataset_total
            });//end of setState


            var bus =[];
            randCounter = 0;
            colorAr=[];
            borderColorAr=[];
            //build the bus dataset
            for (x in response.data){
                bus.push(response.data[randCounter].bus);
                colorAr.push('rgb(119, 26, 131, 0.2)');
                borderColorAr.push('rgb(119, 26, 131, 1)');
                randCounter = randCounter+ 1;
            }
            this.setState({
                    busDataset:{
                        label:'Bus',
                        data: bus,
                        backgroundColor: colorAr,
                        borderColor: borderColorAr
                    } //end of dataset_bus
            });//end of setState

            var rail =[];
            randCounter = 0;
            colorAr=[];
            borderColorAr=[];
            //build the rail dataset
            for (x in response.data){
                rail.push(response.data[randCounter].rail);
                colorAr.push('rgb(206, 81, 81, 0.2)');
                borderColorAr.push('rgb(206, 81, 81, 1)');
                randCounter = randCounter+ 1;
            }
            this.setState({
                    railDataset:{
                        label:'Rail',
                        data: rail,
                        backgroundColor: colorAr,
                        borderColor: borderColorAr
                    } //end of dataset_rail
            });//end of setState

            var paratransit =[];
            randCounter = 0;
            colorAr=[];
            borderColorAr=[];
            //build the paratransit dataset
            for (x in response.data){
                paratransit.push(response.data[randCounter].paratransit);
                colorAr.push('rgb(231, 255, 94, 0.2)');
                borderColorAr.push('rgb(231, 255, 94, 1)');
                randCounter = randCounter+ 1;
            }
            this.setState({
                paratransitDataset:{
                        label:'Paratransit',
                        data: paratransit,
                        backgroundColor: colorAr,
                        borderColor: borderColorAr
                    } //end of dataset_rail
            });//end of setState

            //build the year labels dataset
            var label = [];
            for (x in response.data){
                label.push(response.data[totalCount].year);
                totalCount = totalCount + 1;
            }
            this.setState({
                totalCountOfYears: totalCount,
                chartData:{
                    labels: label
                },
                labels: label
            });

            //the final set state!
            this.setState({
                chartData: {
                    labels: this.state.labels,
                    datasets: [
                        this.state.paratransitDataset,
                        this.state.railDataset, 
                        this.state.busDataset,
                        this.state.totalDataset, 
                    ], 
                    xAxisID: "Years",
                    yAxisID: "Boardings"
                }
            });    
        });

        
        
    }//end of component did mount


    placeColorLabels(totalCount, type){
        //depending on the type choose the color
        //loop through totalCount number of times to create an array that repeats color
        //set the state
    }

    render(){
       return(<div className="chart">
           <Bar
            data={this.state.chartData}
            options={{ 
                 maintainAspectRatio: true,
                title:{
                    display:true,
                    text: 'Chicago Transit Authority Ridership Visualization',
                    fontSize: 25,
                    fontColor: '#ffffff'
                },scales:{
                    yAxes:[{
                        display: true,
                        type: 'logarithmic',
                        scaleLabel: {
                            display: true,
                            labelString: "Boardings",
                            fontSize: 15,
                            fontColor: '#ffffff'
                        },
                        ticks:{
                            callback: function (tick, index, ticks) {
                                return tick.toLocaleString();
                            },
                        }
                    }],
                    xAxes:[{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Years",
                            fontSize: 15,
                            fontColor: '#ffffff'
                        },
                    }]
                }
            }}
        />
       </div>); 
    }//end of render

}//end of transit canvas class
export default TransitCanvas;
