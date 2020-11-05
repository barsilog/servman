
$(document).ready(function() {

// APPROVE THE LOAN
$("#appYes").on("click", function (e) {
    
    jQuery.ajax({
        method: "POST",
        url: "http://localhost/PLDT-Telescoop/onlineforms/BOD/updateBOD/approve",
        data: { poNum: strData },
        dataType: 'json',

        success: function (data) {
            location.reload();
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    
});

// DISAPPROVE THE LOAN
$("#disYes").on("click", function (e) {
    
    var payLoad = {poNum: getSelectedRows()};    
    var result = postUpdate(  "http://localhost/PLDT-Telescoop/onlineforms/BOD/updateBOD/disapprove", payLoad);
                      
});

$("#penYes").on("click", function (e) {

    var payLoad = {poNum: getSelectedRows()};    
    var result = postUpdate( "http://localhost/PLDT-Telescoop/onlineforms/BOD/updateBOD/pending", payLoad);
          
});

$("#appYesDet").on("click", function (e) {
    var tmpData = document.getElementById('poNum').innerHTML;
    var strData = [];
    tmpData = tmpData.slice(11);
    strData.push(tmpData);

    jQuery.ajax({
        method: "POST",
        url: "http://localhost/PLDT-Telescoop/onlineforms/Issue/updateBOD/approve",
        data: { poNum: strData },
        dataType: 'json',

        success: function (data) {
            window.location.href = "BODDashboard"
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    // alert("Approved "+strData);
});
$("#disYesDet").on("click", function (e) {
    var tmpData = document.getElementById('poNum').innerHTML;
    var strData = [];
    tmpData = tmpData.slice(11);
    strData.push(tmpData);

    jQuery.ajax({
        method: "POST",
        url: "http://localhost/PLDT-Telescoop/onlineforms/Issue/updateBOD/disapprove",
        data: { poNum: strData },
        dataType: 'json',

        success: function (data) {
            window.location.href = "BODDashboard"
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
    
});


$("#approve,#disapprove,#undoDisapprovalBtn").on("click", function (e) {
    
    if (table.rows(".selected").any()) {
        $("#myInput").trigger("focus");
    } else {
        $("#exampleModal3").modal();
        return e.stopPropagation();
    }
});


$('#approve,#disapprove').on('click', function (e) {
    if (table.rows('.selected').any()) {
       $('#myInput').trigger('focus')
    } else {
       $("#exampleModal3").modal();
       return e.stopPropagation();
    }
 
 });
 
 $('#appYes').on('click', function (e) {
    alert("You just submittted");
 
 });
 
});