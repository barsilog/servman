// List of functions to be called in the view page
// 

function getBoDList(){

      var result = "";
      var jql = "PUT YOUR JQL HERE";

      callJira(jql).done(function (data) {

            console.log(data.issues);
            //PROCESS THE LIST HERE

      });      
}

function getLoanStatus() {

      $("#btnSubmit").removeClass("d-block").addClass("d-none");
      $("#spin").removeClass("invisible").addClass("visible");
      
      var result = "";
      var jql = "search?jql=project=po&fields=id,status,resolution,assignee,summary,customfield_10038";

      callJira(jql).done(function (data) {

            // console.log(data.issues); //For debugging purposes
                        
            //Clear table but leave the header
            $('#loan-info').find("tr:gt(0)").remove();       
            
            //For each issue, draw the table row
            $.each(data.issues, function (i, item) {

                  var assignee = (!data.issues[i].fields.assignee ) ?  "Not Assigned": data.issues[i].fields.assignee.displayName;
                  
                  $('#loan-info  > tbody:last-child').append(                        
                        "<tr><td>" + data.issues[i].key +
                        "</td><td>" + data.issues[i].fields.status.name +
                        "</td><td>" +   assignee   +
                        "</td><td>" + data.issues[i].fields.customfield_10038 +
                        "</td><tr>");
            });

            $("#spin").removeClass("visible").addClass("invisible");
            $("#btnSubmit").removeClass("d-none").addClass("d-block");                        

      });
}

function renderCell(field){
      return ret = field || "-";
}
function callJira(jql,method= "GET") {      

      var cors_url = "https://cors-anywhere.herokuapp.com/";
      var jira_url = "https://telescoop.atlassian.net/rest/api/2/";

      // console.log(cors_url + jira_url + jql);

      return $.ajax({
            type: method,
            crossDomain: true,
            dataType: "JSON",

            url: cors_url + jira_url + jql,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic YXBjLmRldmVsb3BtZW50QHRlbGVzY29vcC5jb20ucGg6VGdhMWU0MWtBZmRSZTdIc1pLWlIzREJB',
                  'X-Atlassian-Token': 'Tga1e41kAfdRe7HsZKZR3DBA',
                  'Access-Control-Allow-Origin': '*'

            },
            success: function (result) {
                  console.log("success");
            },
            error: function (error) {
                  console.log(error);                  
            }
      });      

      return null;
}
