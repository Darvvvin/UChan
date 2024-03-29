$(document).ready( function () {
    var reportTable = $('#reportTable').DataTable();
    var moderatorTable = $('#moderatorTable').DataTable();
    var keysTable = $('#keysTable').DataTable();
    var bannedTable = $('#bannedTable').DataTable();

    //ON OPEN
    $('#reportTable tbody').on('click', 'tr', function () {
      var data = reportTable.row( this ).data();
      //alert( 'You clicked on '+data[0]+'\'s row' );

      $.ajax({
        type: "get",
        url: "/admin/getreport",
        data: {postNumber: data[0]},
        success: (response) => {
          //response.text
          //response.file     /admin/reportedimgs/<image>
          console.log(response.text, response.file);
          $("#simulatedText").text(response.text);
          $("#simulatedImg").attr("src", "/postimgs/" + response.file);

          $("#banIpButton").attr("onclick", "banStatus('" + data[5] + "')");

          $('#reportDataModal-Title').text("Post @" + data[0]);

          $('#reportDataModal-PostN').text(data[0]);
          $('#reportDataModal-Board').text(data[1]);
          $('#reportDataModal-Law').text(data[2]);
          $('#reportDataModal-Off').text(data[3]);
          $('#reportDataModal-Spam').text(data[4]);

          $('#reportDataModal').modal('show');

          $('#ban-post-number').val(data[0]);

        },

        error: () => {
          alert('ajax error');
        }
      });


    });

    $('#moderatorTable tbody').on('click', 'tr', function () {
      var data = moderatorTable.row( this ).data();

      $("#deleteModeratorButton").attr("onclick", "deleteModerator('" + data[0] + "')");
      $('#modManageUsername').val(data[0]);

      if(data[1] != ''){
        $('#modManageModal-Boards').text(data[1]);
        var boardArray = data[1].split(",");
        document.getElementById("removeBoardArea").innerHTML = '';
        for(let i = 0; i < boardArray.length; i++) {
          document.getElementById("removeBoardArea").innerHTML +=
          "<input type='checkbox' class='form-check-input' id='tempId' name='checkboxBoards'> " + boardArray[i] + "<br>";
          $('#tempId').attr("value", boardArray[i]);
          $('#tempId').attr("id", boardArray[i]);
        }
      } else {
        $('#modManageModal-Boards').text("Managing No Boards");
        document.getElementById("removeBoardArea").innerHTML = '';
      }

      $('#modManageModal').modal('show');
    } );
} );

function addBoardToMod() {
  var board = $("#toAddBoard").find(":selected").text();
  let username = $('#modManageUsername').val();

  $.ajax({
    type: "post",
    url: "/admin/addboard",
    data: {board: board, username: username}
  }).done((response) => {
    $('#deletedModeratorMessage').modal('show');
    $('#moderatorDeletedMessage').text(response.message);
  }).fail(() => {
    alert('error');
  });

}

function removeBoardFromMod() {
  var val = [];
  let username = $('#modManageUsername').val();
  $('input[name="checkboxBoards"]:checked').each(function(i) {
     val[i] = $(this).val();
  })

  $.ajax({
    type: "post",
    url: "/removeboards",
    data: {boards: val, username: username}
  }).done((response) => {
    $('#deletedModeratorMessage').modal('show');
    $('#moderatorDeletedMessage').text(response.message);
  }).fail(() => {
    alert('error');
  });

}

function ipToBan(ip) {
  $('#ipToBanPlacement').val(ip);
  console.log(ip);
}

function banStatus(value) {
  if (value == 'true') {
    $('#alreadyBannedModal').modal('show');
    return;
  }


  $('#ban-report-form').submit();
}

function deleteModerator(value) {
  let username = value.trim();

  $.ajax({
    type: "post",
    url: "/deletemoderator",
    data: {username: username}
  }).done((response) => {
    //response.result: (boolean) success in deleting or not
    //response.message: message associated with the operation
    $('#deletedModeratorMessage').modal('show');
    $('#moderatorDeletedMessage').text(response.message);

  }).fail(() => {
    alert('DELETE MODERATOR ERROR');
  })
}
