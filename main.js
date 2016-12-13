function getAllWorkflows(key){
	$("#loading").css("display","block")
	$.ajax({
		url: "https://cors.now.sh/https://api.hubapi.com/automation/v3/workflows/",
		type: "GET",
		data: {hapikey: key}, //parse through api key
		success: function(data) {
			$("#loading").css("display","none")
			var workflows = data["workflows"]; //get workflow json
			for (var i=0;i<workflows.length; i++){
				appendWorkflow(workflows[i]) //show them in table
			}
			$("#workflows tr td").on("click",".pick-workflow",function(e){ //pick button onclick
				id = $(this).attr("wid"); //id
				getWorkflow(key, id, function(d){
					createWorkflow(prompt("Target: "),JSON.stringify(d)) //prompt a target api key and pass data
				});
			});
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

function getWorkflow(key, id, callback){ //has callback so it's not asynchronous 
	$("#loading").css("display","block")
	$.ajax({
		url: "https://cors.now.sh/https://api.hubapi.com/automation/v3/workflows/" + id,
		type: "GET",
		data: {hapikey: key}, //parse api key
		success: function(data) {
			$("#loading").css("display","none");
			callback(data)
		},
		error: function(e) {
			console.log(e.message);
		}
	});	
}

function createWorkflow(key, data){
	//console.log(data) //debug
	$("#loading").css("display","block")
	$.ajax({
		url: "createworkflow.php?hapikey="+key+"&data="+data, //pass in key and data to local php script which curls url to avoid cors
		type: "GET",
		contentType: "application/json",
		success: function(d) {
			//console.log(d) //for testing purposes
			$("#loading").css("display","none");
		},
		error: function (errMsg) {
			console.log(JSON.stringify(errMsg));
		}
	});
}

function appendWorkflow(workflow){
	$("#workflows").append("<tr><td>"+workflow["name"]+"</td><td>"+workflow["id"]+"</td><td>"+workflow["type"]+"</td><td>"+workflow["enabled"]+"</td><td>"+Date(workflow["insertedAt"])+"</td><td>"+Date(workflow["updatedAt"])+"</td><td>"+(workflow["originalAuthorUserId"] || "none")+"</td><td>"+(workflow["personaTagIds"][0] || "none")+"</td><td> enrolled:"+workflow["contactListIds"]["enrolled"]+" active:"+workflow["contactListIds"]["active"]+" steps:"+(workflow["contactListIds"]["steps"][0] || "none")+"</td><td> enrolled:"+workflow["contactCounts"]["enrolled"]+" active:"+workflow["contactCounts"]["active"]+"</td><td><button class='pick-workflow' wid="+workflow["id"]+">pick</button></td></tr>");
} //this just creates a row in a table to show the workflow
$(function(){
var hapikey = prompt("API key: ") //prompts for api key
getAllWorkflows(hapikey) //..and uses it
});