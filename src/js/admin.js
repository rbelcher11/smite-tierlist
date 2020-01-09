$(document).ready(function () { 
    tierboxes.forEach(function (entry) { 
        $( entry ).droppable({ 
            drop: function( event, ui ) { 
                if($(entry + " img").length == 0) { 
                    $(entry).html(""); 
                } 
                ui.draggable.appendTo(entry).css("position","relative").css("left","").css("top",""); 
                savePending=true;
                arrangeAlphabetically(entry); 
                resizeTiers(); 
            } 
        }); 
    }); 
}); 
    
function arrangeAlphabetically(tier) { 
    var gods = getGodsInTier(tier); 
    gods.forEach(function(entry) { 
        $("#" + entry).appendTo($(tier)); 
    }); 
} 

function getGodsInTier(tier) { 
    var gods = Array(); 
    $(tier).children().each(function() { 
        gods.push($(this).attr("id")); 
    }); gods.sort(); return gods; 
} 

function getRelativePosition(god) { 
    var godPosition = $("#" + god).offset(); 
    return godPosition; 
} 

function reset() { 
        gods.forEach(function (entry) { 
            $("#" + entry[1] + "-container").appendTo($("#gods")); 
            $("#" + entry[1] + "-container .change").html(" "); 
            $("#" + entry[1]).css("position", "relative"); 
            $("#" + entry[1]).css("top", ""); 
            $("#" + entry[1]).css("left", ""); 
        });  
    showEmpties(); 
    resizeTiers();  
} 

function addEmpty() { 
    var string = "empty" + emptyCount; 
    gods.push(string); 
    emptyCount++; 
    $("#gods").append(""); 
    $("#" + string).draggable( { 
        cursor: 'move', 
        opacity: 0.35, 
        containment: '#overall-container', 
        grid: [3,3], 
        stop: function() { 
            save(); 
        } 
    } ); 
}