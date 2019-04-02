var button=document.getElementById("button");
var input=document.getElementById("input");
var table=document.getElementById("table");

var task_array=[];
var task_completed=[];

/* Remove all childNodes */
function removeAllTableContents()
{
  var childNodes = table.childNodes;
  for (var i = 0; childNodes.length > 0;)
  {
    table.removeChild(childNodes[i]);
  }
}

/* Add input to array */
function addTaskToArray()
{
  var taskValue=input.value;
  if(taskValue=="")
  {
    alert("There must be something you need to do !!\n ERROR : Text box empty.");
  }
  else
  {
    var taskObj=new Object;
    taskObj.Name=taskValue;
    task_array.push(taskObj);
    input.value="";
  }
}

/* create contents of table from array accordingly */
function createTableFromArray()
{
  var tr1=document.createElement("tr");
  var td1=document.createElement("td");
  td1.innerHTML="Sno.";
  tr1.appendChild(td1);
  var td2=document.createElement("td");
  td2.innerHTML="My Tasks";
  tr1.appendChild(td2);
  var td3=document.createElement("td");
  td3.innerHTML="Options";
  tr1.appendChild(td3);
  table.appendChild(tr1);
  for(var i=0;i<task_array.length;i++)
  {
    var tr=document.createElement("tr");
    tr.setAttribute("id",i);

    var srNo_td=document.createElement("td");
    srNo_td.innerHTML=i+1;
    tr.appendChild(srNo_td);

    var taskName_td=document.createElement("td");
    taskName_td.innerHTML=task_array[i].Name;
    tr.appendChild(taskName_td);

    var deleteButton=document.createElement("button");
    deleteButton.innerHTML="Delete";
    deleteButton.addEventListener("click",function(event)
  {
    /* using id given to parentNode as index of array accordingly */
    task_array.splice(event.target.parentNode.id,1);
    removeAllTableContents();
    createTableFromArray();
  });
    tr.appendChild(deleteButton);

    table.appendChild(tr);
  }
}

button.addEventListener("click",function(event)
{
  addTaskToArray();
  removeAllTableContents();
  createTableFromArray();
});
