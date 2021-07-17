var emptyCount = 0;
var zindex = 0;
var godPositions = teamList;
var filterButton = document.getElementsByClassName('filter_button');
var godImage = document.getElementsByClassName('godimage');
var saveButton = document.getElementById('save_button');
var resetButton = document.getElementById('reset_button');
var tabButton = document.getElementsByClassName('tab');
var legendTab = document.getElementById('legend-tab');
var savePending = false;
var currentList = "teamList";
var saveText = document.getElementsByClassName('save_text');
var savedText = "var teamList = { ";
var godsLoaded = false;
var legendActive = false;


$(document).ready(function () {
    displayList();                                  
});

$(window).resize(function() {
    resizeTiers();
});

function loadGods() {
    gods.forEach(function (entry) {
        if(entry.length == 5&&!godsLoaded) {
            loadGod(entry);
        } 
    });
    if(draggable) {
        draggableGods();
    }
    godsLoaded=true;
}

function clearEmpties() {
    tierboxes.forEach(function(entry) {
        if(entry != "#gods") {
            $(entry).html("");
        }                                       
    });
}

function showEmpties() {
    tierboxes.forEach(function(entry) {
        if($(entry + " img").length == 0) {
            if(entry != "#gods") {
                $(entry).html("Empty");
            }
        }                                           
    });
}

function loadGod(entry) {
    var tooltip = "<span><strong>" + entry[0] + "</strong></span>";
    $("#gods").append("<div id='" + entry[1] + "-container' style='width: 67px; height: 65px; margin-top: 2px; margin-bottom: 2px;'><div class='change'>&nbsp;</div><img src='js/images/gods/" + entry[1] + ".jpg' id='" + entry[1] + "' class='godimage " + entry[3] + " " + entry[4] + "' data-name='" + entry[0] + "' data-class='" + entry[2] + "'></div>");
    $('#' + entry[1]).tooltipster({
        content: $('<span><strong>' + entry[0] + '</strong></span>')
    });
}

function resizeTiers() {

    tierboxes.forEach(function(entry) {
        var imagesinentry = $(entry + " .godimage").length;
        var entrywidth = $(entry).width();
        var imagesperrow = Math.floor(entrywidth/60);
        var rowsneeded = Math.ceil(imagesinentry/imagesperrow);
        var requiredheight = rowsneeded*70;
        if(requiredheight == 0) { requiredheight = 70; }
        showEmpties();
        $("#tierlist ." + entry.substring(1)).css("line-height",requiredheight + "px");
    });

}	        

function displayList() {
    reset();
    clearEmpties();
    loadGods();
    tierboxes.forEach(function (tierentry) {

        if(godPositions[tierentry] !== undefined) {

            godPositions[tierentry].forEach(function(entry) { 

                $("#" + entry).appendTo($(tierentry));

            });

        }
        
    });
    showEmpties()
    resizeTiers();
}

function hideUnranked() {
    $("#gods").hide();
}

function filterGods(x) {
    for (let i=0; i<godImage.length; i++) {
        godImage[i].classList.add('hidden_god');
    }
    for (let i=0; i<godImage.length; i++) {
        if(godImage[i].classList.contains(x)) {
            godImage[i].classList.remove('hidden_god');
        }
    }
}

function unfilterGods() {
    for (let i=0; i<godImage.length; i++) {
        godImage[i].classList.remove('hidden_god');
    }
}

function draggableGods() {
    gods.forEach(function (entry) {
        $("#" + entry[1] + "-container").draggable(
            {
                cursor: 'move',
                opacity: 0.35,
                grid: [3,3],
                stack: "div",
            }
        );
        });
}

function saveTierlist() {
    var submitArray = {}; 
    var newBreak = 0;
    let arrayCount = 0;
    tierboxes.forEach(function(entry) { 
        var currentGods = getGodsInTier(entry); 
        submitArray[entry] = currentGods; 
        for(let i=0;i<submitArray[entry].length;i++) {
            submitArray[entry][i]= "'" + submitArray[entry][i] + "'";
        }
        if (arrayCount<10) {
            savedText += '"' + entry + '": [ ' + submitArray[entry] + ' ], '
        } else {
            savedText += '"' + entry + '": [ ' + submitArray[entry] + ' ]};'
        }
        arrayCount++;
    }); 
    submitArray["emptyCount"] = emptyCount; 
}

function selectTab(x) {
    for(let i=0; i<tabButton.length;i++) {
        tabButton[i].classList.remove('selected');
        x.classList.add('selected');
    }
}

function selectList() {  
    let x = 0;
    for(let i=0;i<tabButton.length;i++) {
        if (tabButton[i].classList.contains('selected')) {
            x=i;
        }
    }
    if (x===0) {
        godPositions = teamList;
        currentList = "teamList";
    } else if (x===1) {
        godPositions = soloList;
        currentList = "soloList";
    } else if (x===2) {
        godPositions = jungleList;
        currentList = "jungleList";
    } else if (x===3) {
        godPositions = midList;
        currentList = "midList";
    } else if (x===4) {
        godPositions = supportList;
        currentList = "supportList";
    } else if (x===5) {
        godPositions = adcList;
        currentList = "adcList";
    }
}

function copyTierList() {
    let copyText = document.getElementById('tierlist_text');
    copyText.value = savedText;
    copyText.classList.remove('hide_text');
    copyText.select();
    document.execCommand("copy");
    copyText.classList.add('hide_text');
    alert('Save feature coming soon!');
}

saveButton.addEventListener('click', function() {
    savedText = "var " + currentList + " = { ";
    saveTierlist();
    copyTierList();
})

resetButton.addEventListener('click', function() {
    var confirmReset = confirm("Are you sure you want to reset?"); 
    if (confirmReset) {
        reset();
    }
})

function selectLegend(x) {
    for(let i=0; i<tabButton.length;i++) {
        tabButton[i].classList.remove('selected');
        x.classList.add('selected');
    }
}

function revealTabs() {
    for(let i=0; i<tabButton.length-1;i++) {
        if (tabButton[i].classList.contains("hidden_tab")) {
            tabButton[i].classList.remove("hidden_tab");
        } else {
            tabButton[i].classList.remove("active_legend_tab");
        }
    }
}

function hideTabs() {
    for(let i=0; i<tabButton.length-1;i++) {
        if (!tabButton[i].classList.contains("selected")) {
            tabButton[i].classList.add("hidden_tab");
        } else {
            tabButton[i].classList.add("active_legend_tab");
        }
    }
}

function selectFilterButton() {
    for(let i=0; i<filterButton.length;i++) {
        filterButton[i].classList.remove('filter_selected')
    }
}

for(let i=0; i<tabButton.length-1;i++) {
    tabButton[i].addEventListener('click', function(){
        if (savePending&&!legendActive) {
            let confirmTab = confirm("All unsaved changes will be lost. Are you sure?"); 
            if (confirmTab) {
                selectTab(this);
                selectList();
                displayList();
                savePending=false;
            }
        } else if (!legendActive) {
            selectTab(this);
            selectList();
            displayList();
        } else if (legendActive) {
            $("#legend").hide();
            $("#tierlist").show();
            legendTab.classList.remove('selected');
            revealTabs();
            legendActive=false;
        }
    })   
}

legendTab.addEventListener('click', function() {
    legendActive=true;
    $("#legend").show();
    $("#tierlist").hide();
    legendTab.classList.add('selected');
    hideTabs();
})

for(let i=0; i<filterButton.length;i++) {
    filterButton[i].addEventListener('click', function(){     
        if (filterButton[i].classList.contains('filter_selected')) {
            filterButton[i].classList.remove('filter_selected');  
            unfilterGods();                                   
        } else {
            selectFilterButton();
            filterButton[i].classList.add('filter_selected');
            filterGods(this.value);
        }
    })                                        
}
