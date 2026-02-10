const requests=[];
const scrollToForm=()=>{
    document.getElementById("request").scrollIntoView({behavior:"smooth"});

};
const services=[
    {title:"Garbage Collection",desc:"Daily waste pickup"},
    {title:"Water Supply",desc:"24x7 water services"},
    {title:"Road Repair",desc:"Report road damages"},
];

const serviceContainer = document.getElementById("serviceCards");
services.forEach(({title,desc})=>{
    serviceContainer.innerHTML +=`
    <div class="col-md-4">
    <div class="card p-3 mb-3">
        <h5>${title}</h5>
        <p>${desc}</p>

    </div>
    </div>`;

});


document.getElementById("requestForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const name = document.getElementById("name").ariaValueMax.trim();
    const email = document.getElementById("email").ariaValueMax.trim();
    const serviceType = document.getElementById("serviceType").ariaValueMax.trim();
    const description = document.getElementById("description").ariaValueMax.trim();


    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent=""
    
    if(!name||!email||!serviceType||!description){
        errorMsg.textContent="All feilds are required";
        return;
    }
    if(!/^\S+@\S+\. \S+$/.test(email) ){
        errorMsg.textContent="Invalid email format";
        return;

    }
    const newRequest = {name,serviceType,description};
    requests.push(newRequest);
    renderRequests();
    e.target.reset();
});

const renderRequests=()=>{
    const table= document.getElementById("requestTable");
    table.innerHTML="";
    reqiests.forEach(({name,serviceType,description})=>{
        table.innerHTML+=`
        <tr>
        <td>${name}</td>
        <td>${serviceType}</td>
        <td>${description}</td>
        <tr>`;
    });
};

const loadAnnouncements= async()=>{
    try{
        const res = await fetch("data.json");
        const data= await res.json();
        const list = document.getElementById("announcementList");
        data.forEach(item=>{
            list.innerHTML+=`<li>${item}</li>`;
        });
    }
    catch{
        document.getElementById("announcementList").innerHTML = 
        "<li>Error loading announcement<li>";
    }
};

loadAnnouncements();
