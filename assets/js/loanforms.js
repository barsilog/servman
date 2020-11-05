$(document).ready(function() {

    var btnFinish = $('<button></button>').text('Submit')
        .addClass('btn btn-info sw-btn-group-extra d-none')
    $(btnFinish).attr('id', 'submit')
        .on('click', function() {});




    //hide specify input - step2
    $('#others').click(function() {

        if ($('#others').prop('checked')) {
            $('.invisible').removeClass('invisible');
        } else {
            $('.invisible').addClass('invisible');
        }
    })

    // SmartWizard initialize
    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        darkMode: false,
        justified: true,
        autoAdjustHeight: true,
        enableURLhash: true,
        transition: {
            animation: 'fade', // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
            speed: '2000', // Transion animation speed
            easing: '' // Transition animation easing. Not supported without a jQuery easing plugin
        },
        toolbarSettings: {
            toolbarPosition: 'bottom', // none, top, bottom, both
            toolbarButtonPosition: 'right', // left, right, center
            showNextButton: true, // show/hide a Next button
            showPreviousButton: true, // show/hide a Previous button
            toolbarExtraButtons: [btnFinish] // Extra buttons to show on toolbar, array of jQuery input/buttons elements

        },
        anchorSettings: {
            anchorClickable: true, // Enable/Disable anchor navigation
            enableAllAnchors: false, // Activates all anchors clickable all times
            markDoneStep: true, // Add done state on navigation
            markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
            removeDoneStepOnNavigateBack: false, // While navigate back done step after active step will be cleared
            enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
        },
    });


    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        if (stepDirection == "3") {
            $('#agree').click(function() {

                if ($('#agree').prop('checked')) {
                    $('.sw-btn-group-extra').removeClass('d-none');
                } else {
                    $('.sw-btn-group-extra').addClass('d-none');
                }
            });
        }
    });




    // if ($('#submit').click(function() {
    //     alert("alert");
    //         var strData = [];
    //         strData = generatePayload();

    //         jQuery.ajax({
    //             method: "POST",
    //             url: "http://localhost/PLDT-Telescoop/onlineforms/Issue/newIssue",
    //             data: { dataArray: strData },
    //             dataType: 'json',

    //             success: function(data) {
    //                 location.reload();
    //                 console.log(data);
    //             },
    //             error: function(data) {
    //                 console.log(data);
    //             }
    //         });
    // }));

    $("#smartwizard").on("leaveStep", function(e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
        return validate(currentStepIndex, nextStepIndex);

        /* return confirm("Do you want to leave the step " + currentStepIndex + "?"); */
    });

    //onSelect loanforms
    $('[name^=loanforms').click(function() {
        $('[id^=FORM-]').removeClass("form visible").addClass("form");
        var inputValue = "#FORM-" + $(this).attr("value");
        $(inputValue).removeClass("form").addClass("form visible");
    });

    //Calculate Loan item
    $('input[name="loanitem"]').click(function() {
        calculate();
    });

    /*Start add/delete in table step-3 */
    $("#add-row").click(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var email = $("#email").val();
        var isContains = false;

        var tds = $("#table-step3").find("#step3email");
        var isContains = false;
        for (var i = 0; i < tds.length; i++) {
            var td = tds[i];
            if (td.innerText == email) {
                isContains = true;
                break;
            }
        }


        if (firstname != "" && lastname != "" && email != "") {
            if (!isContains) {
                var markup = "<tr><td><input type='checkbox' name='record'></td><td id='step3first'>" + firstname + "</td><td id='step3last'>" + lastname + "</td><td id='step3email'>" + email + "</td> </tr>";
                $("#thead-step3, #tbody-step3").append(markup);

                var markup = "<tr><td id='step3first'>" + firstname + "</td><td id='step3last'>" + lastname + "</td><td id='step3email'>" + email + "</td> </tr>";
                $("#thead-step4, #tbody-step4").append(markup);
                $('#tbody-step3').table().data("table").refresh();
            } else {
                alert('E-Mail already exist.');
            }
        }

    });

    // Find and remove selected table rows
    $("#delete-row").click(function() {

        $("#thead-step3, #tbody-step3, #thead-step4, #tbody-step4").find('input[name="record"]').each(function() {

            if ($(this).is(":checked")) {
                $(this).parents("tr").remove();
            }
        });
    });
    /* End add/delete in table step-3   */

    /*  Start Validate onSubmit */
    $('#add-row').click(function(e) {
        var isValid = true;
        $('#firstname,#lastname,#email').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;

                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            } else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
        if (isValid == false)
            e.preventDefault;
    }); /* End Validate onSubmit */

    $("#submit").on("click", function(e) {
        var strData = [];
            strData = generatePayload();
    
            jQuery.ajax({
                method: "POST",
                url: "http://localhost/PLDT-Telescoop/onlineforms/Issue/newIssue",
                data: { dataArray: strData },
                dataType: 'json',
    
                success: function(data) {
                    alert("Created Issue with "+data.key);
                    window.location.href = "MemberListofLoanApplication"
                    console.log(data);
                },
                error: function(data) {
                    console.log(data);
                }
            });
        //alert(strData);
    });

});

function validate(curStep, nextStep) {

    if (nextStep > curStep) {

        switch (curStep) {
            case 0:
            case 1:
                return financial_loan_validation(curStep);
        }
    }

}

function financial_loan_validation(step) {
    step++;

    var loantype = $('input[name="loanforms"]:checked').val();

    if (step == 1 && loantype == null) {
        alert('No selected loan!');
        return false;
    }
    if (step == 2) {


        if (loantype == 'DS') {

        } else {

            var loanitem = $('input[name="loanitem"]:checked').val();

            if (loanitem == null) {
                alert('Please Select a Loan Item!')
                $('input[name="loanitem"]').focus();
                return false;
            } else if (loantype == 'FL' && $('#payment-terms-FL').val() == "") {
                alert('Please select a Payment Term!');
                $('#payment-terms-FL').focus();
                return false;
            } else if (loantype == 'FSD' && $('#payment-terms-FSD').val() == "") {
                alert('Please select a Payment Term!');
                $('#payment-terms-FSD').focus();
                return false;
            }
        }


    }
}


function calculate() {

    var specialComputation = [];

    // EXTRACT VALUES HERE
    var date = new Date();
    var loantypetext = $('input[name="loanforms"]:checked').parent().text();
    var loantype = $('input[name="loanforms"]:checked').val();
    var loanamount = $('input[name="loanitem"]:checked').val();
    var loanterms = $('#payment-terms-FL').val();
    var loantermsFSD = $('#payment-terms-FSD').val();
    var tableId = '#computation' + loantype;

    // PERFORM SPECIFIC COMPUTATION 
    if (loantype == 'FL') {
        specialComputation.push({ 'title': 'Number of Terms', 'value': loanterms + " Months" }, { 'title': 'Monthly Amortization', 'value': "PHP " + loanamount }, );
    } else if (loantype == 'MPL') {
        //special computation here
        specialComputation.push({ 'title': 'Monthly Amortization', 'value': "PHP " + loanamount }, );

    } else if (loantype == 'FSD') {
        specialComputation.push({ 'title': 'Number of Terms', 'value': loantermsFSD + " Months" }, { 'title': 'Deduction - SCS', 'value': "PHP " + loanamount }, { 'title': 'Deduction - Outstanding Loan', 'value': "PHP " + loanamount }, );
    } else {}

    // ALL THE COMMON FIELDS IN THE COMPUTATION TABLE
    var commonComputation = [

        { 'title': 'Loan Type', 'value': loantypetext },
        { 'title': 'Loan Amount', 'value': "PHP " + loanamount },
        { 'title': 'Interest Rate', 'value': 0.02 * loanamount },
        { 'title': 'Service Charge', 'value': loanterms * 100 },
        { 'title': 'Gross Loan', 'value': "PHP " + loanamount },
        { 'title': 'Net Proceeds', 'value': "PHP " + loanamount },

    ];

    commonComputation = commonComputation.concat(specialComputation);

    // ADD REMAINING ENTRIES
    commonComputation.push(


    );


    // Draw table if tableId is not empty
    if (tableId) {
        drawCompTable(tableId, commonComputation);
    }



    var status = "Pending";
    //Step 4 - Review Loan Details
    var loandetails = "<table class='table table-striped m-4'>";
    loandetails += "<tr><td>Status</td><td>" + status + "</td></tr>";
    loandetails += "<tr><td>Application Date</td><td>" + date + "</td></tr>";
    loandetails += "<tr><td>Loan Type</td><td>" + loantypetext + "</td></tr>";
    loandetails += "<tr><td>Company Name</td><td>Company #1</td></tr>";
    loandetails += "<tr><td>Loan Amount</td><td>" + "PHP " + loanamount + "</td></tr>";
    loandetails += "<tr><td>No. of Months Payable</td><td>" + loanterms + " Months" + "</td></tr>";
    loandetails += "<tr><td>Monthly Amortization</td><td>" + "PHP " + loanamount + "</td></tr>";
    loandetails += "<tr><td>Gross Loan</td><td>" + "PHP " + loanamount + "</td></tr>";
    loandetails += "<tr><td>Net Proceeds</td><td>" + "PHP " + loanamount + "</td></tr>";
    loandetails += "<tr><td>Monthly Amortization</td><td>" + "PHP " + loanamount + "</td></tr></table>";
    $("#computationFINAL").html(loandetails);

}

function drawCompTable(selector, rows) {

    //Clear the table first
    $(selector).children().remove()

    //Iterate to each value
    $.each(rows, function(key, row) {
        var val = `<tr><td><b>${row.title}</b></td><td>${(row.value) ? row.value : "-"}</td></tr>`;
        $(selector).append(val);
    });
}

function generatePayload() {

    var loantype = $('input[name="loanforms"]:checked').val();
    var loanamount = $('input[name="loanitem"]:checked').val();
    var loanterms = $('#payment-terms-FL').val();
    var loantermsFSD = $('#payment-terms-FSD').val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var email = $("#email").val();
    var startDate;
    var loanTypeID;
    if (loantype == "FL") {
        loanTypeID = "10064";
    } else if (loantype == "MPL") {
        loanTypeID = "10066";
    } else if (loantype == "FSDL") {
        loanTypeID = "10068";
    }
    // array(
    //     'fields' => array(//fields, add here
    //         'project' => array('id' => '10000'),
    //         'summary' => 'Issue from REST API',
    //         'customfield_10029' => array('id' => '10020'),
    //         'resolution' => array('id' => '10003'),
    //         'issuetype' => array('id' => '10003')
    //     )
    // );

    var issueFields = {
        'project': { 'id': '10000' },
        'issuetype': { 'id': '10003' },
        'summary': 'New Issue',
        'customfield_10029': { 'id': '10064' },
        'customfield_10061': { 'id': '10063' }
        // 'customfield_10038':'',
        // 'customfield_10039':''
        // 'customfield_10063':{'id':'10064'},
        // 'loanterms':'',
        // 'customfield_10065':{'id':'10066'},
        // 'loantermsFSD':'',
        // 'customfield_10067':{'id':'10068'},
        // 'firstname':'',
        // 'customfield_10069':{'id':'10070'},
        // 'lastname':'',
        // 'customfield_10071':{'id':'10072'},
        // 'email':'',
        // 'customfield_10073':{'id':'10074'},
    };

    issueFields.customfield_10029.id = loanTypeID;
    // issueFields.customfield_10038 = loanamount;
    // issueFields.customfield_10039 = loanterms;

    return issueFields;
}

//Modal Trigger event - step 4 Terms & Conditions
$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').trigger('focus')
})