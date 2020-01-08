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
    $("#saveblog").click(function ( event ) { 
        event.preventDefault(); 
        CKEDITOR.instances.blogtext.updateElement(); 
        $.post("http://www.smitetierlist.com/",$("#blogform").serialize()).success( function (event) { 
            console.log(event); 
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

function getRandomPassword() { 
    var password = Math.random().toString(36).slice(-12); 
    if( $("input[name='password']").length ) { 
        $("input[name='password']").val(password); 
    } 
    if( $("input[name='confirmpassword']").length ) { 
        $("input[name='confirmpassword']").val(password); 
    } 
    if( $("#displayrandompassword").length ) { 
        $("#displayrandompassword").show() 
        $("#displayrandompasswordbox").html(password); 
    } 
} 

function confirmDelete(listId) { 
    var agree = confirm("Are you sure you want to delete this tierlist?"); 
    if(agree) { 
        window.location.href = "http://www.smitetierlist.com/delete/" + listId + "/"; 
    } 
} 

function setDefaultConfirm(listId) { 
    var agree = confirm("Are you sure you want to set this list as the default?"); 
    if(agree) { 
        window.location.href = "http://www.smitetierlist.com/setdefault/" + listId + "/"; 
    } 
} 

function save() { 
    if(editListId != null) { 
        var submitarray = {}; 
        tierboxes.forEach(function(entry) { 
            var gods = getGodsInTier(entry); 
            submitarray[entry] = gods; 
        }); 
        submitarray["emptyCount"] = emptyCount; 
        console.log(submitarray); 
        var jsonUrl = "http://www.smitetierlist.com/json/savelist/" + editListId + "/"; 
        var jsonString = JSON.stringify(submitarray); 
        $.ajax({ 
            url: jsonUrl, 
            contentType: 'application/json', 
            dataType: 'json', 
            data: jsonString, 
            type: 'POST', 
            success: function(result) { 
                console.log(result); 
            }, 
            error: function(result) { 
                console.log("FAILURE"); 
                console.log(result); 
            }
        }); 
    } 
} 

function setLink(url) { 
    $("#link").html("" + url + ""); 
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
        // for(i = 0;i -1;) { 
        //     $("#" + element).remove(); 
        //     gods.splice(index,1); 
        // }  
    showEmpties(); 
    resizeTiers();  
} 
showEmpties(); 
resizeTiers();  

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