	        	        	        //var gods = ["agni", "ahmuzencab", "ahpuch", "anhur", "anubis", "aokuang", "aphrodite", "apollo", "arachne", "ares", "artemis", "athena", "awilix", "bacchus", "bakasura", "bastet", "bellona", "cabrakan", "chaac", "change", "chronos", "cupid", "fenrir", "freya", "geb", "guanyu", "hades", "hebo", "hel", "hercules", "houyi", "hunbatz", "isis", "janus", "kali", "khepri", "kukulkan", "kumbakharna", "loki", "medusa", "mercury", "neith", "nemesis", "nezha", "nox", "nuwa", "odin", "osiris", "poseidon", "ra", "rama", "ratatoskr", "ravana", "scylla", "serqet", "sobek", "sunwukong", "sylvanus", "thanatos", "thor", "tyr", "ullr", "vamana", "vulcan", "xbalanque", "xingtian", "ymir", "zeus", "zhongqui"];
                                    var emptyCount = 0;
                                    var zindex = 0;
                                    var ad = 1;
                                    var ads = [	        		
                                        ["http://www.smitetierlist.com/images/diemtwitch.jpg","http://www.twitch.tv/dmbrandon","Twitch"],
                                        ["http://www.smitetierlist.com/images/diemcrunchyroll.jpg","http://www.crunchyroll.com/dmbrandon/","CrunchyRoll"],
                                        ["http://www.smitetierlist.com/images/diemyoutube.jpg","https://www.youtube.com/user/dmbrandon","YouTube"]
                                    ];
                                    var godPositions = teamList;
                                    var filterButton = document.getElementsByClassName('filter_button');
                                    var godImage = document.getElementsByClassName('godimage');
                                    var saveButton = document.getElementById('save_button');
                                    var resetButton = document.getElementById('reset_button');
                                    var arrayTextSection = document.getElementById('array_text_section');
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
                                        var cycle = self.setInterval(adCycle,10000);                                        
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
                        
                                    function preloadAds() {
                                        ads.forEach(function (entry) {
                                            $('<img/>')[0].src = entry[0];
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
                        
                        /*
                                           console.log(entry);
                                            console.log("Images in entry: " + imagesinentry);
                                            console.log("Entry width: " + entrywidth);
                                            console.log("Images per row: " + imagesperrow);
                                            console.log("Rows needed: " + rowsneeded);
                                            console.log("Required height: " + requiredheight);
                                            console.log("");
                        */		            
                        //		            $("#tierlist ." + entry.substring(1)).css("min-height",requiredheight + "px");
                                            $("#tierlist ." + entry.substring(1)).css("line-height",requiredheight + "px");
                                        });
                        
                                    }
                        
                                    function showTab(tab) {
                                        if(tab == "blog") {
                                            $("#legend").hide();
                                            $("#blog").show();
                                            tab = "blog";
                                            $("#tabimage").attr("src","http://www.smitetierlist.com/images/blog.png");
                                            $("#tabimage").attr("usemap","#tabmap-blog");
                                        } else {
                                            $("#legend").show();
                                            $("#blog").hide();
                                            tab = "legend";
                                            $("#tabimage").attr("src","http://www.smitetierlist.com/images/legend.png");
                                            $("#tabimage").attr("usemap","#tabmap-legend");
                                        }
                                    }	        
                                    
                                    function getParentComparison(id) {
                        
                                        var parameters = {};
                                        parameters["id"] = id;
                        
                                        var jsonUrl = "http://www.smitetierlist.com/json/getparentcomparison/";
                                        var jsonString = JSON.stringify(parameters);
                        
                                        $.ajax({
                                            url: jsonUrl,
                                            contentType: 'application/json',
                                            dataType: 'json',
                                            data: jsonString,
                                            type: 'POST',
                                            success: function(result) {
                                                console.log(result);
                                                godChanges = JSON.parse(result["comparison"]);
                                                //console.log("------------------  COMPARISON ----------------------------------");
                                                //console.log(godChanges);
                                                godChanges.forEach(function (entry) {
                        
                                                    var change = "";
                                                    var output = false;
                                                    var image = "";
                                                    if(entry[1] > 0) {
                                                        image = "http://www.smitetierlist.com/images/up_arrow.png";
                                                        output = true;
                                                    } else if (entry[1] < 0) {
                                                        image = "http://www.smitetierlist.com/images/down_arrow.png";
                                                        output = true;
                                                    }
                        
                                                    if(output)
                                                        $("#" + entry[0] + " div.change").html("<img src='" + image + "' style='max-width: 10px; padding-top: 12px;'>");
                                                    else
                                                        $("#" + entry[0] + " div.change").html("&nbsp;");
                                                });
                        
                                            },
                                            error: function(result) {
                                                //console.log("ERROR. RUNNING ANYWAY FROM COMPARISON");
                                                response = JSON.parse(result.responseText);
                        
                                                godChanges = JSON.parse(response.comparison);
                                                
                                                //console.log("------------------  COMPARISON ----------------------------------");
                                                //console.log(godChanges);
                                                godChanges.forEach(function (entry) {
                        
                                                    var change = "";
                                                    var output = false;
                                                    var image = "";
                                                    if(entry[1] > 0) {
                                                        image = "http://www.smitetierlist.com/images/up_arrow.png";
                                                        output = true;
                                                    } else if (entry[1] < 0) {
                                                        image = "http://www.smitetierlist.com/images/down_arrow.png";
                                                        output = true;
                                                    }
                        
                                                    if(output)
                                                        $("#" + entry[0] + " div.change").html("<img src='" + image + "' style='max-width: 10px; padding-top: 12px;'>");
                                                    else
                                                        $("#" + entry[0] + " div.change").html("&nbsp;");
                                                });
                                            }});
                        
                                    }
                        
                                    // function getList(id) {
                        
                                    //     var parameters = {};
                                    //     parameters["id"] = id;
                        
                                    //     var jsonUrl = "json/getlist.js";
                                    //     var jsonString = JSON.stringify(parameters);
                        
                                    //     $.ajax({
                                    //         url: jsonUrl,
                                    //         contentType: 'application/json',
                                    //         dataType: 'json',
                                    //         data: jsonString,
                                    //         type: 'POST',
                                    //         success: function(result) {
                                    //             console.log(result);
                                    //             godPositions = JSON.parse(result["list"]);
                                    //             loadGods();
                                    //             displayList();
                                    //             resizeTiers();
                                    //         },
                                    //         error: function(result) {
                                    //             console.log("ERROR");
                                    //             //console.log("ERROR. RUNNING ANYWAY");
                                    //             /*response = JSON.parse(result.responseText);
                        
                                    //             //console.log(response.list);
                        
                                    //             godPositions = JSON.parse(response.list);
                                    //             emptyCount = godPositions["emptyCount"];
                                    //             for(var i = 0; i < emptyCount; i++) {
                                    //                 gods.push("empty" + i);
                                    //             }
                                    //             loadGods();
                                    //             displayList();
                                    //             resizeTiers();*/
                                    //         }});	
                        
                                    // }

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
                                        //getParentComparison(tierListId);
                                        /*if( !draggable ) {
                                            hideUnranked();
                                        }*/
                                    }
                                    
                                    function hideUnranked() {
                                        $("#gods").hide();
                                    }
                        
                                    function adCycle() {
                                        $("#adimage2").fadeOut(1000);
                                        $("#adimage1").fadeOut(1000,function() {
                                            var max = ads.length-1;
                        
                                            $("#adimage1").attr("src",ads[ad][0]);
                                            $("#adimage1").attr("alt",ads[ad][2]);
                                            $("#adlink1").attr("href",ads[ad][1]);
                                            $("#adimage1").fadeIn(500);
                        
                                            ad++;
                                            if(ad > max)
                                                ad = 0;
                        
                                            $("#adimage2").attr("src",ads[ad][0]);
                                            $("#adimage2").attr("alt",ads[ad][2]);
                                            $("#adlink2").attr("href",ads[ad][1]);
                                            $("#adimage2").fadeIn(500);
                        
                                            
                                            ad++;
                                            if(ad > max)
                                                ad = 0;
                                        });     	
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
                                                    stop: function() {
                                                        save();
                                                        if(loggedIn) {
                                                            console.log("TRIGGERED");
                                                            getParentComparison(tierListId);
                                                        }
                                                    }
                                                }
                                            );
                                          });
                                    }

                                    function saveTierlist() {
                                        var submitArray = {}; 
                                        var newBreak = 0;
                                        let arrayCount = 0;
                                        for (let i=0;i<11;i++) {
                                            document.getElementById('array_' + i + "").textContent = '"' + tierboxes[i] + '": [';
                                        }
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

                                    // function createListTitle() {
                                    //     let listTitle = document.getElementById('list_title');
                                    //     listTitle.textContent = "var " + currentList + " = { ";
                                    // }

                                    function copyTierList() {
                                        let copyText = document.getElementById('tierlist_text');
                                        copyText.value = savedText;
                                        copyText.classList.remove('hide_text');
                                        copyText.select();
                                        document.execCommand("copy");
                                        copyText.classList.add('hide_text');
                                        alert('Tierlist data copied to your keyboard. Simply access your file, ctrl+a, ctrl+v, and save.');
                                    }

                                    saveButton.addEventListener('click', function() {
                                        savedText = "var " + currentList + " = { ";
                                        saveTierlist();
                                        // createListTitle();
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

                                    // function resetGods() {
                                    //     var moveGods = getGodsInTier(tier); 
                                    //     moveGods.forEach(function(entry) { 
                                    //         $("#" + entry).appendTo($"#gods"); 
                                    //     }); 
                                    // }

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
