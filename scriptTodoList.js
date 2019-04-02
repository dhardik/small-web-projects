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

function checkCompletedTasks(key)
{
  for(var i=0;i<task_completed.length;i++)
  {
    if(key==task_completed[i])
    {
      return 1;
    }
  }
  return 0;
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
    if(checkCompletedTasks(i))
    {
      taskName_td.innerHTML="<strike>"+task_array[i].Name+"</strike>";
    }
    else
    {
      taskName_td.innerHTML=task_array[i].Name;
    }
    tr.appendChild(taskName_td);

    var deleteButton=document.createElement("button");
    deleteButton.innerHTML="Delete";
    deleteButton.addEventListener("click",function(event)
  {
    /* using id given to parentNode as index of array accordingly */
    var targetID=event.target.parentNode.id;
    task_array.splice(targetID,1);
    for(var k=targetID;k<task_completed.length;k++)
    {
      task_completed[k]-=1;
    }
    removeAllTableContents();
    createTableFromArray();
  });
    tr.appendChild(deleteButton);

    var doneButton=document.createElement("button");
    doneButton.innerHTML="Done";
    doneButton.addEventListener("click",function(event)
  {
    task_completed.push(event.target.parentNode.id);
    removeAllTableContents();
    createTableFromArray();
  });
  tr.appendChild(doneButton);

    table.appendChild(tr);
  }
}

button.addEventListener("click",function(event)
{
  addTaskToArray();
  removeAllTableContents();
  createTableFromArray();
});
