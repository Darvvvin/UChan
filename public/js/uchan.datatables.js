$(document).ready( function () {
    var reportTable = $('#reportTable').DataTable();
    var moderatorTable = $('#moderatorTable').DataTable();
    var keysTable = $('#keysTable').DataTable();
    var bannedTable = $('#bannedTable').DataTable();

    //ON OPEN
    $('#reportTable tbody').on('click', 'tr', function () {
      var data = reportTable.row( this ).data();
      //alert( 'You clicked on '+data[0]+'\'s row' );

      $('#reportDataModal-Title').text("Post @" + data[0]);

      $('#reportDataModal-PostN').text(data[0]);
      $('#reportDataModal-Board').text(data[1]);
      $('#reportDataModal-Law').text(data[2]);
      $('#reportDataModal-Off').text(data[3]);
      $('#reportDataModal-Spam').text(data[4]);

      $('#reportDataModal').modal('show');

      $('#ban-post-number').val(data[0]);
    });

    $('#moderatorTable tbody').on('click', 'tr', function () {
      var data = moderatorTable.row( this ).data();

      $('#modManageUsername').val(data[0]);

      if(data[1] != ''){
        $('#modManageModal-Boards').text(data[1]);
        var boardArray = data[1].split(" ");
        for(let i = 0; i < boardArray.length; i++) {
          console.log(boardArray[i]);
          document.getElementById("removeBoardArea").innerHTML +=
          "<h3>This is the text which has been inserted by JS</h3>";
        }

      } else {
        $('#modManageModal-Boards').text("Managing No Boards");
      }

      $('#modManageModal').modal('show');
    } );

    $('#bannedTable tbody').on('click', 'tr', function () {
      var data = bannedTable.row( this ).data();
      alert( 'You clicked on '+data[0]+'\'s row' );
    } );
} );
