(function ($) {
  "use strict";

  /*==================================================================
    [ Focus ]*/
  $(".input1").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input1");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input1").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
        .val()
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

function showMoreFields() {
  if (
    document.getElementById("company").value == "PLDT" ||
    document.getElementById("company").value == "TELES" ||
    document.getElementById("company").value == "PECCI"
  ) {
    document.getElementById("cmfn4").style.display = "none";
    document.getElementById("cmfn5").style.display = "none";
    document.getElementById("cmfn6").style.display = "none";
    document.getElementById("cmfn7").style.display = "none";
    document.getElementById("cme4").style.display = "none";
    document.getElementById("cme5").style.display = "none";
    document.getElementById("cme6").style.display = "none";
    document.getElementById("cme7").style.display = "none";
  } else {
    document.getElementById("cmfn4").style.display = "block";
    document.getElementById("cmfn5").style.display = "block";
    document.getElementById("cmfn6").style.display = "block";
    document.getElementById("cmfn7").style.display = "block";
    document.getElementById("cme4").style.display = "block";
    document.getElementById("cme5").style.display = "block";
    document.getElementById("cme6").style.display = "block";
    document.getElementById("cme7").style.display = "block";
  }
}

function createIssue() {
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "JSON",
    username: "apc.development@telescoop.com.ph",
    password: "Tga1e41kAfdRe7HsZKZR3DBA",
    url: "http://cors-anywhere.herokuapp.com/" +
      "https://telescoop.atlassian.net/rest/api/2/issue/",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "Authorization": "Basic YXBjLmRldmVsb3BtZW50QHRlbGVzY29vcC5jb20ucGg6VGdhMWU0MWtBZmRSZTdIc1pLWlIzREJB",
      "X-Atlassian-Token": "Tga1e41kAfdRe7HsZKZR3DBA",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT"
    },
    data: {
      "fields": {
        "project": {
          "key": "PO"
        },
        "summary": "test from ajax",
        "description": "Testing POST from my localhost using heroku",
        "customfield_10029": {
          "value": "Financial Loan"
        },
        "issuetype": {
          "id": "10003"
        }
      }
    },
    success: function (result) {
      console.log(result);
    },
    error: function (error) {
      console.log(error);
    }
  });
}