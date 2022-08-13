// YOUR CODE GOES HERE
$(document).ready(function(){
    let data = [];
    fetch('grades.csv')
    .then((resp) => resp.text())
    .then(function(table) {
        generateTable(table);
        
    })
    .catch(function(error) {
        console.log(error);
    });

    function generateTable(Table) {
        var allRows = Table.split(/\r?\n|\r/);
        rows = allRows.length - 1;
        cols = allRows[0].split(",").length - 1;
        var div = document.getElementById("tableContainer");

        var table = document.createElement("table");
        $(table).attr("id", "spreadsheet");

        for (let i = -1; i < rows; i++) {
            var row = document.createElement("tr");
            var dataRow = allRows[i + 1].split(",");
            
            for (let j = -1; j < cols; j++) {
                if (i == -1){//top header row
                    var col = document.createElement("th");
                    $(col).html(dataRow[j + 1]);
                    $(row).attr("class", "columnHeader")
                    
                 }else{
                    if(j == -1){
                        var col = document.createElement("th");
                        $(col).addClass("rowHeader");
                    }
                    else{
                        var col = document.createElement("td");
                        var id = "cell" + (i + 1) +  (j + 1);
                        col.setAttribute("id", id);
                        $(col).addClass("editiable")
                    }
                
                
                    // Multiply assignment marks by 10
                    if (-1 < j && j < 3 && i > -1) {
                        $(col).html(dataRow[j + 1] * 10);
                    } else {
                        $(col).html(dataRow[j + 1]);
                        
                    }

                }
                row.appendChild(col);
            }
            table.appendChild(row);
        }
        div.appendChild(table);

        $('.columnHeader th').click(function(){
            var columnIndex = $(this).index();
            selectColumn(columnIndex);
         });
         $('.rowHeader').click(function(){
             var rowIndex = $(this).parent().index();
             selectRow(rowIndex);
      
          });
     
          $('.editiable').click(function(){
             // console.log($(this).text());
             let td = this;
             let newText;
             $(this).css('backgroundColor', '#e0e0ff')
             let text = $(this).text();
             $(this).text('');
             
             let input = document.createElement('input');
             $(input).attr("type", "text");
             $(input).attr("value", text);
             this.append(input);
             input.focus();
     
             $(input).on('keypress',function(e){
                 if(e.which == 13) {
                     newText = $(input).val();
                     $(td).empty();
                     $(td).css('backgroundColor', 'transparent');
                     $(td).text(newText);
                 }
             });
             
          });
        
        
      
    
         function selectRow(rowIndex){
            deselectAll();
            for(var x = 1; x <= 6; x++){
                $(`#cell${rowIndex}${x}`).css('backgroundColor', '#e0e0ff')
                data.push($(`#cell${rowIndex}${x}`).text());
                
    
            }
            calculateFreq(data);
            // console.log(data);
            data = [];
    
        }
        function selectColumn(columnIndex){
            deselectAll();
            for(var x = 1; x <= 6; x++){
                $(`#cell${x}${columnIndex}`).css('backgroundColor', '#e0e0ff')
                data.push($(`#cell${x}${columnIndex}`).text());
            }
            calculateFreq(data);
            // console.log(data);
            data = [];
    
        }
        function deselectAll(){
            for(var x = 1; x <=6; x++){
                for(var y = 1; y <= 6; y++){
                    // console.log(typeof $(`#cell${x}${y}`).css('backgroundColor'))
                    if($(`#cell${x}${y}`).css('backgroundColor') === "rgb(224, 224, 255)"){
                        // console.log("hi");
                        $(`#cell${x}${y}`).css('backgroundColor', 'transparent');
                    }
        
                }
            }
        }
    
    }
    
   
     
  
});