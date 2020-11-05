var table ;

//THIS WILL BE RESPONSIBLE FOR THE DISPLAY OF BODDOASHBOARDS (or perhaps all other dashboards)
function drawDashboard(issues){

   table = $('#loanLists').DataTable({
      'processing': true,
        'language': {
            'loadingRecords': '&nbsp;',
            'processing': '<div class="spinner"></div>'
      },
      data: issues.issues,
      
      deferRender: true,
      columns: [
         { title: "",                     data: null,      defaultContent:""   },
         { title: "PO#",                   data: "key",
               render: function(data){
                  return "<a href='BODApprovalPage?selectedKey=" + data +  "'>" + data + "</a>" ;
               }
         },
         { title: "Name",                    data: "fields.customfield_10030" },
         { title: "Loan Type",               data: "fields.customfield_10029.value" },
         { title: "Amount",                  data: "fields.customfield_10064",      render: $.fn.dataTable.render.number( ',', '.', 2 ) } ,    
         { title: "BOD<br>Approved",         data: "fields",                        render: function(data){  return (data.customfield_10060 !=null) ?  data.customfield_10060.length +  "/" + data.customfield_10054.length : "" ; }}, 
         { title: "Outstanding<br>Balance",  data: "fields.customfield_10065",      render: $.fn.dataTable.render.number( ',', '.', 2 ) }, 
         { title: "Length of<br>Service",    data: "fields.customfield_10066",      render: function (data) { return (data != null) ? data + " yrs." : "";},},
         { title: "Average<br>Collection",   data: "fields.customfield_10070",      render: $.fn.dataTable.render.number( ',', '.', 2 )},               
         { title: "Semi-Mon<br>Amortization",data: "fields.customfield_10067",      render: $.fn.dataTable.render.number( ',', '.', 2 ) },
         { title: "Deferred",                data: "fields.customfield_10068"},
         { title: "SOA",         data: "fields.attachment.0" ,
               render: function(data){
                  return (data !=null) ? "<a class='btn btn-primary' href='" + data.content +  "'>View</a>" : "" ;
               }
            }
     ],

      columnDefs: [{
               orderable: false,
               className: "select-checkbox",
               targets: 0,
            }, ],
            select: {
               style: "multi",
            },
            order: [
               [1, "asc"]
            ]

   });

}


$(window).resize(function () {
   $("loanLists").resize();
});

function showDisapprovedList(BOD="BOD1"){

   var uri = 'http://localhost/PLDT-Telescoop/onlineforms/BOD/getDeniedList/' + BOD;

   var ret = $.get(uri, function (data, status) {
      var issues = JSON.parse(data);
      drawDashboard(issues);
   });

}

function showForApprovalList(BOD="BOD1") {

   var uri = 'http://localhost/PLDT-Telescoop/onlineforms/BOD/getBODList/' + BOD;

   var ret = $.get(uri, function (data, status) {
      var issues = JSON.parse(data);
      drawDashboard(issues);
   });

}

function hideModal(){

   $('#exampleModal').modal('hide');
   $('body').removeClass('modal-open');
   $('.modal-backdrop').remove();
}

// This function gets all selected rows in the table
function getSelectedRows(){

    var tblData = table.rows({selected:  true}).data();
    var tmpData;
    var strData = [];

    $.each(tblData, function (i) {
        tmpData = tblData[i]['key'];
        strData.push(tmpData);

    });

    return strData;
}

function postUpdate(uri,jsonData){

    jQuery.ajax({
        method: "POST",
        url: uri,
        data: jsonData,
        dataType: 'json',
        success: function (data) {
           location.reload();
           hideModal();
        },
        error: function (data) {
            console.log(data);
            return false;
            
        }
    });    
    return true;
}
