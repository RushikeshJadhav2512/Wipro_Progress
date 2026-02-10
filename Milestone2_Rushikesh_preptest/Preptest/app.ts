interface ServiceRequest{
    name:string;
    serviceType:string;
    description:string;
}

let requestList:ServiceRequest[]=[];
const addRequest= (request:ServiceRequest):void=>{
    requestList=[...requestList,request];
};