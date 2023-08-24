$(document).ready(function(){



  document.title = "IF v"+version;
    console.log("Incremental Fortress v"+version);
    console.log("created by Louigi Verona");
    console.log("https://louigiverona.com/?page=about");


  //init functions

  if(localStorage.getItem(savefile_name)){loadGame();}else{
    setupLibraryUpgrades();
    setupTowers();
    init();
  }

  commonInit();
  storeState();
  refreshUI();

  if(prestige.library.library_switch==0 && session_data.main_loop==null){
    session_data.main_loop=setInterval(loop, 50);
  }
  

  ////////////////

  $("html").keydown(function( event ) {
    switch (event.key){
      case "s":
        saveGame();
        break;
    }

  });

  button_settings.click(function(){

    playAudio(1);

    misc_settings.guide_toggle=0;

    if(misc_settings.settings_toggle==0){
      misc_settings.settings_toggle=1;
    }else{
      misc_settings.settings_toggle=0;
      misc_settings.save_del_confirm_toggle=0;
    }

    refreshUI();
  });
  button_scientific.click(function(){
    playAudio(1);

    if(settings.scientific==0){
      settings.scientific=1;
    }else{settings.scientific=0;}

    refreshUI();
  });
  button_sprites.click(function(){
    playAudio(1);

    if(settings.sprites==0){
      settings.sprites=1;
    }else{settings.sprites=0;}

    refreshUI();
  });
  button_save.click(function(){
    playAudio(1);

    button_save.text("Saved").prop("disabled",true);

    saveGame();

    setTimeout(function() { button_save.text("Save Game").prop("disabled",false); }, 1000);

  });
  button_delsave.click(function(){

    playAudio(1);
    if(misc_settings.save_del_confirm_toggle==0){misc_settings.save_del_confirm_toggle=1;}
    else{misc_settings.save_del_confirm_toggle=0;}
    refreshUI();

  });
  save_del_confirm.click(function(){

    delSave();
    location.reload();

  });
  save_del_cancel.click(function(){

    playAudio(1);
    misc_settings.save_del_confirm_toggle=0;
    refreshUI();

  });
  button_copysave.click(function(){
    playAudio(1);

    let gameData=localStorage.getItem(savefile_name);
    navigator.clipboard.writeText(gameData);

    button_copysave.text("Copied").prop("disabled",true);

    setTimeout(function() { button_copysave.text("Copy").prop("disabled",false); }, 1000);

  });
  button_importsave.click(function(){

    if(import_save_dump.text().length<=0){return;}

    player.notification.active=0;
    messenger.active=0;

    clearInterval(gandlor.loop);
    gandlor.loop=null;gandlor.frame=0;


    playAudio(1);

    localStorage.setItem(savefile_name, import_save_dump.text());
    import_save_dump.text('');

    misc_settings.settings_toggle=0;
    misc_settings.graveyard_setup=0;
    misc_settings.hog_setup=0;

    misc_settings.gandlor_display=0;
    alchemist.aviary.incoming=0;
    alchemist.flask.incoming=0;

    loadGame();
    refreshUI();

    if(prestige.library.library_switch==0 && session_data.main_loop==null){
      session_data.main_loop=setInterval(loop, 50);
    }

  });
  button_audio.click(function(){

    playAudio(1);

    if(settings.audio_mute==0){
      settings.audio_mute=1;
    }else{
      settings.audio_mute=0;
      playAudio(1);
    }

    refreshUI();

  });
  button_audio_messenger.click(function(){

    playAudio(1);

    if(settings.audio_messenger==0){
      settings.audio_messenger=1;
    }else{
      settings.audio_messenger=0;
    }

    refreshUI();

  });
  audio_control_volume.mousemove(function(){
        settings.audio_volume=audio_control_volume.val();
        Howler.volume(settings.audio_volume);
  });
  button_guide.click(function(){

    playAudio(1);

    misc_settings.settings_toggle=0;

    if(misc_settings.guide_toggle==0){
      misc_settings.guide_toggle=1;
    }else{misc_settings.guide_toggle=0;misc_settings.guide_page='';}

    refreshUI();
  });
  all_guide_buttons.click(function(){

    playAudio(1);

    misc_settings.guide_page=$(this).text();

    getGuidePage();
    
  });




  messenger_button.click(function(){

    playAudio(1);

    if(messenger.is!='instructor' && messenger.is!='scholar'){player.messengers.consecutive_misses=0;}

    if(messenger.is=='instructor' || messenger.is=='scholar'){
      
    }else if(messenger.is=='gandlor' || messenger.is=='shadow_caravan'){

      player.messengers.messenger_clicks++;
      buildAlchemistList(strangeUpgrades.messenger_milestones,player.messengers.messenger_clicks,alchemist.messengers,strangeUpgrades.messengers,'RM');

      alchemist.coins_spent-=messenger.reward;
      if(misc_settings.gandlor_display==1){ recalcCoins();gandlorUI(); }
      messenger.active=0;

      buyRecalc();

    }else if(messenger.is=='monk'){

      player.messengers.messenger_clicks++;
      insertItem(0);
      messenger.active=0;
      buyRecalc();

    }else if(messenger.is=='cannibals'){

      player.messengers.messenger_clicks++;
      insertItem(10);
      messenger.active=0;
      buyRecalc();

    }else if(messenger.is=='rabbit'){

      player.messengers.messenger_clicks++;
      messenger.active=0;

      if(getRandomInt(1,2)==2){
        tower1.counter=0;
        if(getRandomInt(1,5)==3){alchemist.purse.items[0]=53;prestige.items[53]=1;}
      }else{
        tower1.counter+=messenger.reward;
        tower1.all_reincarnation_counter+=messenger.reward;
        prestige.all_time_counter+=messenger.reward;
      }

      buyRecalc();

    }else if(messenger.is=='conartist'){

      player.messengers.messenger_clicks++;
      tower1.counter+=tower1.current_rate_max*120;
      tower1.all_reincarnation_counter+=tower1.current_rate_max*120;
      prestige.all_time_counter+=tower1.current_rate_max*120;
      messenger.active=0;

      

      buyRecalc();

    }else if(messenger.is=='historian'){

      player.messengers.messenger_clicks++;

      prestige.historian_counter++;

      if(prestige.historian_counter>=5){ prestige.historian=2; rateCalc(); }
        
      notificationMachen('historian'+prestige.historian_counter);

      messenger.active=0;
      refreshUI();
      

    }else{

      player.messengers.messenger_clicks++;
      buildAlchemistList(strangeUpgrades.messenger_milestones,player.messengers.messenger_clicks,alchemist.messengers,strangeUpgrades.messengers,'RM');

      tower1.counter+=messenger.reward;
      tower1.all_reincarnation_counter+=messenger.reward;
      prestige.all_time_counter+=messenger.reward;
      messenger.active=0;

      if(messenger.is=='caravan' && alchemist.purse.items[0]==1 && getRandomInt(1,2)==2){
        messengerMachen('shadow_caravan');
        alchemist.purse.items[0]==0;//use up the attractor
      }

      if(messenger.is=='snail'){
        alchemist.snails_clicked++;
        buildAlchemistList(strangeUpgrades.snail_milestones,alchemist.snails_clicked,alchemist.snails,strangeUpgrades.snails,'SN');
        player.messengers.messenger_time=0;//for snail we reset time
      }

      buyRecalc();

    }

  });
  collect_medallions_button.click(function(){

    playAudio(4);

    tower1.counter+=medallions.reward;
    tower1.all_reincarnation_counter+=medallions.reward;
    prestige.all_time_counter+=medallions.reward;
    medallions.reward=0;

    for (const [key, value] of Object.entries(medallions.milestones)) {
      if(medallions.blacksmiths[key]==1){medallions.blacksmiths[key]=2;}
      if(medallions.weaklings[key]==1){medallions.weaklings[key]=2;}
      if(medallions.dwarves[key]==1){medallions.dwarves[key]=2;}
      if(medallions.humans[key]==1){medallions.humans[key]=2;}
      if(medallions.ogres[key]==1){medallions.ogres[key]=2;}
      if(medallions.wizards[key]==1){medallions.wizards[key]=2;}
      if(medallions.warlocks[key]==1){medallions.warlocks[key]=2;}
      if(medallions.witches[key]==1){medallions.witches[key]=2;}
      if(medallions.wyverns[key]==1){medallions.wyverns[key]=2;}
      if(medallions.catapults[key]==1){medallions.catapults[key]=2;}
      if(medallions.crossbows[key]==1){medallions.crossbows[key]=2;}
      if(medallions.cheiroballistras[key]==1){medallions.cheiroballistras[key]=2;}
      if(medallions.cannibals[key]==1){medallions.cannibals[key]=2;}
    }

    buildMedallionsList();
    buyRecalc();

  });
  notifications_button.click(function(){
    playAudio(1);

    player.notification.active=0;

    //backwards compatibility message
    if(settings.dwarf_hammers_warning==0){settings.dwarf_hammers_warning=1;}

    
    refreshUI();
  });
  frogs_button.click(function(){

    tower1.counter+=frogs.reward;

    frogs.clicked++;

    if(frogs.num-frogs.clicked>0){

      playAudio(18);

      frogs.reward=tower1.current_rate_max*(frogs.reward_mult+frogs.inc*frogs.clicked);

      frogs.opacity=1;

      frogs_button.show().css('opacity',frogs.opacity).html('Frog!<br><b>'+numT(frogs.reward)+'</b>').css('left', getRandomInt(100,$(window).width()-100)  +'px').css('top',getRandomInt($(window).scrollTop()+100,$(window).scrollTop()+$(window).height()-100) +'px');

    }else{
      
      playAudio(6);

      clearInterval(frogs.timer);frogs.timer=null;
      frogs_button.hide();

    }



    buyRecalc();

  });
  nav_left.click(function(){

    var ch='';

    playAudio(6);

    if(settings.navigation.page=='Towers'){ch='HoG';}
    if(settings.navigation.page=='Necropolis'){ch='Towers';}

    settings.navigation.page=ch;

    refreshUI();

  });
  nav_right.click(function(){

    var ch='';

    playAudio(6);

    if(settings.navigation.page=='Towers'){ch='Necropolis';}
    if(settings.navigation.page=='HoG'){ch='Towers';}

    settings.navigation.page=ch;

    refreshUI();

  });


  hammer_button.mousedown(function(){

    playAudio(2);

    hammer_button.blur();

    if( (messenger.is=='instructor' || messenger.is=='scholar') && messenger.isRunning==0 && messenger.active==1){
      player.messengers.messenger_clicks++;
      buildAlchemistList(strangeUpgrades.messenger_milestones,player.messengers.messenger_clicks,alchemist.messengers,strangeUpgrades.messengers,'RM');

      player.messengers.consecutive_misses=0;

      messenger.isRunning=1;messenger.opacity=1;
      messenger_button.css('opacity',messenger.opacity);
    }

    tower0.clicks++;

    tower1.counter += tower0.hammer_rate;
    tower1.all_reincarnation_counter += tower0.hammer_rate;
    prestige.all_time_counter += tower0.hammer_rate;
    session_data.counter += tower0.hammer_rate;
    if(messenger.isRunning==0){tower0.click_mined += tower0.hammer_rate;}//don't take into account for instructor or scholar

    //minting machine
    if(alchemist.purse.items[0]==23){
      let coins=recalcCoins();
      if(coins<4){

        alchemist.coins_spent-=0.01;
        alchemist.minting_counter+=0.01;

        if(alchemist.minting_counter>=16){
          alchemist.minting_counter=0;
          alchemist.purse.items[0]=29;prestige.items[29]=1;
          playAudio(17);
          refreshUI();
        }

        coins=recalcCoins();

        gandlor_funds.text('Coins: ' + numT(coins));

        if(gandlor.stage==4 || gandlor.stage==1){

          if(coins>=gandlor.min_bet){
            gandlor_deal.prop('disabled',false);
          }else{
            gandlor_deal.prop('disabled',true);
          }
      
        }
      }
    }

    //blue rose
    if(alchemist.purse.items[0]==29){
      let coins=0;

      alchemist.coins_spent-=1;

      alchemist.minting_counter+=1;

      if(alchemist.minting_counter>=100){
        playAudio(17);
        alchemist.minting_counter=0;
        alchemist.purse.items[0]=999;
        refreshUI();
      }

      coins=recalcCoins();

      gandlor_funds.text('Coins: ' + numT(coins));

      if(gandlor.stage==4){

        if(coins>=gandlor.min_bet){
          gandlor_deal.prop('disabled',false);
        }else{
          gandlor_deal.prop('disabled',true);
        }
    
      }
    }

    clickRecalc();

    hammer_button.html('Hammer<br><span class="tiny">Power: ' + numT(tower0.hammer_rate) + '</span>&nbsp;<img class="sprite" src="img/hammer.svg">');

  });
  hammer_button.mouseup(function(){

    playAudio(2);

    hammer_button.blur();

  });
  blacksmiths_button.click(function(){

    playAudio(1);

    tower1.counter -= tower0.blacksmiths_price[tower0.buy_amount_index];
    tower0.blacksmiths += tower0.buy_amount[tower0.buy_amount_index];
    tower0.blacksmiths_price=getPrices(tower0.blacksmiths_base_price,tower0.blacksmiths_growth_rate,tower0.blacksmiths);

    buildMedallionsList(12);
    hammerRateCalc();//has to be here, so that refreshUI is triggered later
    buyRecalc(12);

  });



  


  raiders_location_button.click(function(){

    playAudio(6);

  });
  raiders_location_button.mouseenter(function(){locationInspect($(this));
  }).mouseleave(function(){ location_tooltip.hide();location_tooltip.text('');});
  raiders_location_next.click(function(){

    if(raiders.active==1){return;}

    playAudio(1);

    raiders.locations_pointer++;
    if(raiders.locations_pointer>=prestige.raiders_locations.length){
      raiders.locations_pointer=0;
    }

    raiders.locations_index=prestige.raiders_locations[raiders.locations_pointer];

    calcRaidTime();

    storeState();
    refreshUI();

  });
  raiders_button.click(function(){

    if(prestige.raiders_unlocked==0){return;}
    if(raiders.locations_runs[raiders.locations_index]>=locations[raiders.locations_index][4]){return;}
    if((tower1.weaklings-tower1.weaklings_retired)<raiders.price){return;}

    if(raiders.active==0){

    playAudio(1);

    //defaults
    raiders.counter=0;
    raiders.counter_max=0;

    tower1.weaklings_retired += raiders.price;
    raiders.active = 1;

    calcRaidTime();

    buyRecalc(1);

    }

  });
  raiders_button_win.click(function(){

    playAudio(4);
    lootCollect(); 

  });

  button_champ.click(function(){playAudio(6);});
  champ_weaklings_button.mouseenter(function(){champInspect($(this),0);
  }).mouseleave(function(){ champ_tooltip.hide();champ_tooltip.text('');});
  champ_dwarves_button.mouseenter(function(){champInspect($(this),1);
  }).mouseleave(function(){ champ_tooltip.hide();champ_tooltip.text('');});
  champ_humans_button.mouseenter(function(){champInspect($(this),2);
  }).mouseleave(function(){ champ_tooltip.hide();champ_tooltip.text('');});
  champ_ogres_button.mouseenter(function(){champInspect($(this),3);
  }).mouseleave(function(){ champ_tooltip.hide();champ_tooltip.text('');});

  weaklings_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.weaklings_price[tower1.buy_amount_index];
    tower1.weaklings += tower1.buy_amount[tower1.buy_amount_index];
    tower1.weaklings_price=getPrices(tower1.weaklings_base_price,tower1.growth_rate,tower1.weaklings);

    buildMedallionsList(1);
    buyRecalc(1);

  });
  dwarves_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.dwarves_price[tower1.buy_amount_index];
    tower1.dwarves += tower1.buy_amount[tower1.buy_amount_index];
    tower1.dwarves_price=getPrices(tower1.dwarves_base_price,tower1.growth_rate,tower1.dwarves);

    buildMedallionsList(2);
    buyRecalc(2);

  });
  humans_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.humans_price[tower1.buy_amount_index];
    tower1.humans += tower1.buy_amount[tower1.buy_amount_index];
    tower1.humans_price=getPrices(tower1.humans_base_price,tower1.growth_rate,tower1.humans);

    buildMedallionsList(3);
    buyRecalc(3);

  });
  ogres_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.ogres_price[tower1.buy_amount_index];
    tower1.ogres += tower1.buy_amount[tower1.buy_amount_index];
    tower1.ogres_price=getPrices(tower1.ogres_base_price,tower1.growth_rate,tower1.ogres);

    buildMedallionsList(4);
    buyRecalc(4);

  });

  wizards_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.wizards_price[tower2.buy_amount_index];
    tower2.wizards += tower2.buy_amount[tower2.buy_amount_index];
    tower2.wizards_price=getPrices(tower2.wizards_base_price,tower2.growth_rate,tower2.wizards);

    buildMedallionsList(5);
    buyRecalc(5);

  });
  warlocks_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.warlocks_price[tower2.buy_amount_index];
    tower2.warlocks += tower2.buy_amount[tower2.buy_amount_index];
    tower2.warlocks_price=getPrices(tower2.warlocks_base_price,tower2.growth_rate,tower2.warlocks);

    buildMedallionsList(6);
    buyRecalc(6);

  });
  witches_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.witches_price[tower2.buy_amount_index];
    tower2.witches += tower2.buy_amount[tower2.buy_amount_index];
    tower2.witches_price=getPrices(tower2.witches_base_price,tower2.growth_rate,tower2.witches);

    buildMedallionsList(7);
    buyRecalc(7);

  });
  wyverns_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.wyverns_price[tower2.buy_amount_index];
    tower2.wyverns += tower2.buy_amount[tower2.buy_amount_index];
    tower2.wyverns_price=getPrices(tower2.wyverns_base_price,tower2.growth_rate,tower2.wyverns);

    buildMedallionsList(8);
    buyRecalc(8);

  });

  catapults_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.catapults_price[tower3.buy_amount_index];
    tower3.catapults += tower3.buy_amount[tower3.buy_amount_index];
    tower3.catapults_price=getPrices(tower3.catapults_base_price,tower3.growth_rate,tower3.catapults);

    buildMedallionsList(9);
    buyRecalc(9);

  });
  crossbows_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.crossbows_price[tower3.buy_amount_index];
    tower3.crossbows += tower3.buy_amount[tower3.buy_amount_index];
    tower3.crossbows_price=getPrices(tower3.crossbows_base_price,tower3.growth_rate,tower3.crossbows);

    buildMedallionsList(10);
    buyRecalc(10);

  });
  cheiroballistras_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.cheiroballistras_price[tower3.buy_amount_index];
    tower3.cheiroballistras += tower3.buy_amount[tower3.buy_amount_index];
    tower3.cheiroballistras_price=getPrices(tower3.cheiroballistras_base_price,tower3.growth_rate,tower3.cheiroballistras);

    buildMedallionsList(11);
    buyRecalc(11);

  });
  cannibals_button.click(function(){

    //playAudio(1);

    //tower1.counter -= tower3.cannibals_price[tower3.buy_amount_index];
    //tower3.cannibals += tower3.buy_amount[tower3.buy_amount_index];
    //tower3.cannibals_price=getPrices(tower3.cannibals_base_price,tower3.growth_rate,tower3.cannibals);

    //buildMedallionsList(12);
    //buyRecalc(12);

  });

  tower4_name_label.click(function(){

    playAudio(1);

    if(dragons_tower.show==0){dragons_tower.show=1;}
    else{dragons_tower.show=0;}

    refreshUI();

  });
  dragonstower_button.click(function(){

    playAudio(1);

    if(dragons_tower.show==0){dragons_tower.show=1;}
    else{dragons_tower.show=0;}

    refreshUI();

  });
  dragon1_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon1_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon1 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon1_price=getPrices(dragons_tower.dragon1_base_price,dragons_tower.growth_rate,dragons_tower.dragon1);

    recalculateFireMultiplier();

    buyRecalc(14);

  });
  dragon2_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon2_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon2 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon2_price=getPrices(dragons_tower.dragon2_base_price,dragons_tower.growth_rate,dragons_tower.dragon2);

    recalculateFireMultiplier();

    buyRecalc(15);

  });
  dragon3_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon3_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon3 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon3_price=getPrices(dragons_tower.dragon3_base_price,dragons_tower.growth_rate,dragons_tower.dragon3);

    recalculateFireMultiplier();

    buyRecalc(16);

  });
  dragon4_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon4_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon4 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon4_price=getPrices(dragons_tower.dragon4_base_price,dragons_tower.growth_rate,dragons_tower.dragon4);

    recalculateFireMultiplier();

    buyRecalc(17);

  });
  dragon5_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon5_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon5 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon5_price=getPrices(dragons_tower.dragon5_base_price,dragons_tower.growth_rate,dragons_tower.dragon5);

    recalculateFireMultiplier();

    buyRecalc(18);

  });

  diamonds1_button.click(function(){

    if(hog.diamonds[0]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[0] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds2_button.click(function(){

    if(hog.diamonds[1]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[1] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds3_button.click(function(){

    if(hog.diamonds[2]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[2] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds4_button.click(function(){

    if(hog.diamonds[3]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[3] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds5_button.click(function(){

    if(hog.diamonds[4]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[4] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds6_button.click(function(){

    if(hog.diamonds[5]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[5] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds7_button.click(function(){

    if(hog.diamonds[6]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[6] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });
  diamonds8_button.click(function(){

    if(hog.diamonds[7]>=9){playAudio(6);return;}

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[7] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    buyRecalcHoG();

  });

  recast_button.click(function(){

    playAudio(1);

    buyRecalcHoG();
    rateCalc();

  });



  wineage_button.click(function(){

    playAudio(1);

    tower1.counter -= winecellar.wineage_price[winecellar.buy_amount_index];
    winecellar.wineage += winecellar.buy_amount[winecellar.buy_amount_index];
    winecellar.wineage_price=getPrices(winecellar.wineage_base_price,winecellar.growth_rate,winecellar.wineage);

    //applying to wine in case it is currently being drunk
    if(winecellar.drunk[winecellar.drunk_index]>1){
      winecellar.drunk[winecellar.drunk_index] = winecellar.wine_multiplier+(winecellar.wineage * (winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power) );
    }

    buyRecalc();

  });
  cupsize_button.click(function(){

    playAudio(1);

    tower1.counter -= winecellar.cupsize_price[winecellar.buy_amount_index];

    winecellar.cupsize += winecellar.buy_amount[winecellar.buy_amount_index];

    if(winecellar.cupsize>320){winecellar.cupsize=320;}

    winecellar.cupsize_price=getPrices(winecellar.cupsize_base_price,winecellar.growth_rate,winecellar.cupsize);

    buyRecalc();

  });
  grapes_button.click(function(){

    playAudio(1);

    tower1.counter -= winecellar.grapes_price[winecellar.buy_amount_index];

    winecellar.grapes += winecellar.buy_amount[winecellar.buy_amount_index];

    winecellar.grapes_price=getPrices(winecellar.grapes_base_price,winecellar.grapes_growth_rate,winecellar.grapes);

    if(winecellar.drunk[winecellar.drunk_index]>1){
      winecellar.drunk[winecellar.drunk_index] = winecellar.wine_multiplier+(winecellar.wineage * (winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power) );
    }

    buyRecalc();

  });



  weaklings_drink_button.click(function(){

    playAudio(5);

    restartWine(0);

    buyRecalc();

  });
  dwarves_drink_button.click(function(){

    playAudio(5);

    restartWine(1);

    buyRecalc();

  });
  humans_drink_button.click(function(){

    playAudio(5);

    restartWine(2);

    buyRecalc();

  });
  ogres_drink_button.click(function(){

    playAudio(5);

    restartWine(3);

    buyRecalc();

  });
  wizards_drink_button.click(function(){

    playAudio(5);

    restartWine(4);

    buyRecalc();

  });
  warlocks_drink_button.click(function(){

    playAudio(5);

    restartWine(5);

    buyRecalc();

  });
  witches_drink_button.click(function(){

    playAudio(5);

    restartWine(6);

    buyRecalc();

  });
  wyverns_drink_button.click(function(){

    playAudio(5);

    restartWine(7);

    buyRecalc();

  });






  gc_button.click(function(){

    if(gandlor.stage && gandlor.stage!=4){return;}

    playAudio(1);

    if(misc_settings.gandlor_display==0){
      misc_settings.gandlor_display=1;
    }else{misc_settings.gandlor_display=0;}

    refreshUI();

    clearInterval(gandlor.loop);
    gandlor.loop=null;gandlor.frame=0;

    setupGandlor();
    gandlorGame();

  });
  gandlor_deal.click(function(){

    

    if(gandlor.stage==1 && gandlor.removed>0){//spin

      playAudio(7);

      gandlor.stage=2;
      
      gandlor.frame=0;
      gandlor.loop=setInterval(gandlorLoop, 100);

     }else if(gandlor.stage==4){//deal

      playAudio(11);

      alchemist.coins_spent+=4;
      player.stats.coins+=4;

      gandlor.stage=0;

     }

    

    gandlorGame();

  });
  gandlor_wrap1.click(function(){

    if(gandlor.stage!=1){return;}

    var id = parseInt($(this).attr('id').slice(12));

    //to prevent double click
    if(gandlor.wrap[id-1]==0){return;}

    gandlor.wrap[id-1]=0;
    gandlor.removed++;

    playAudio(7);
    $(this).hide("slow");

    gandlorGame();

  });
  gandlor_wrap2.click(function(){

    if(gandlor.stage!=1){return;}

    var id = parseInt($(this).attr('id').slice(12));

    if(gandlor.wrap[id-1]==0){return;}

    gandlor.wrap[id-1]=0;
    gandlor.removed++;

    playAudio(7);
    $(this).hide("slow");

    gandlorGame();

  });
  gandlor_wrap3.click(function(){

    if(gandlor.stage!=1){return;}

    var id = parseInt($(this).attr('id').slice(12));

    if(gandlor.wrap[id-1]==0){return;}

    gandlor.wrap[id-1]=0;
    gandlor.removed++;

    playAudio(7);
    $(this).hide("slow");

    gandlorGame();

  });
  gandlor_wrap4.click(function(){

    if(gandlor.stage!=1){return;}

    var id = parseInt($(this).attr('id').slice(12));

    if(gandlor.wrap[id-1]==0){return;}

    gandlor.wrap[id-1]=0;
    gandlor.removed++;

    playAudio(7);
    $(this).hide("slow");

    gandlorGame();

  });
  gandlor_wrap5.click(function(){

    if(gandlor.stage!=1){return;}

    var id = parseInt($(this).attr('id').slice(12));

    if(gandlor.wrap[id-1]==0){return;}

    gandlor.wrap[id-1]=0;
    gandlor.removed++;

    playAudio(7);
    $(this).hide("slow");

    gandlorGame();

  });
  gandlor_bonus0.click(function(){

    if(gandlor.stage==1 && gandlor.removed==0 && player.gandlor.seer==1 && gandlor.seer_deuce[0]==0){

      playAudio(14);

      player.gandlor.seer=0;
      //gandlor.seer_deuce[0]=getRandomInt(1,5);
      //gandlor.seer_deuce[1]=getRandomInt(1,5);
      gandlor.seer_deuce[0]=choose(gandlor.wrap);
      gandlor.seer_deuce[1]=choose(gandlor.wrap);

    }

    gandlorUI();


  });
  gandlor_bonus1.click(function(){

    if(gandlor.bet==4 && gandlor.bonus[1]==10){
      playAudio(14);
      tower1.counter+=3600*tower1.current_rate_max;
      gandlor.bonus[1]==0;
      gandlorUI();
    }

    if(gandlor.stage!=3){return;}


    let coins=0;
    let grandspin_mult=1;

    if(gandlor.bet==4){grandspin_mult=2;}

    switch(gandlor.bonus[1]){

      case 4: 
        tower1.counter+=60*grandspin_mult*tower1.current_rate_max;
        break;

      case 5: 
        tower1.counter+=120*grandspin_mult*tower1.current_rate_max;
        break;

      case 6: 
        tower1.counter+=180*grandspin_mult*tower1.current_rate_max;
        break;

      case 7: 
        tower1.counter+=240*grandspin_mult*tower1.current_rate_max;
        break;

      case 8:
      case 10: 
        tower1.counter+=300*grandspin_mult*tower1.current_rate_max;
        break;

      case 11:
        tower1.counter+=600*grandspin_mult*tower1.current_rate_max;
        break;

      case 12:
        tower1.counter+=3600*tower1.current_rate_max;
        break;

      case 9:
        player.gandlor.seer=1;
        break;

      

    }

    coins=recalcCoins();

    playAudio(14);

    gandlor.stage=4;
    

    gandlorGame();

  });
  gandlor_bonus2.click(function(){

    if(gandlor.stage!=3){return;}

    let coins=0;
    let item='';
    let upper_limit=3;
      if(alchemist.purse.items[0]==5){upper_limit+=2;}
    let item_amount=getRandomInt(1,upper_limit+prestige.gandlor_win_max);

    if(gandlor.bet==2){ item = gandlor.tier1_src[gandlor.bonus[2]]; }
    if(gandlor.bet==4){ item = gandlor.tier2_src[gandlor.bonus[2]]; }

    switch(item){

      case 'win_hp': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(0);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_sa': 
        setTimeout('insertItem(1);alchemistUI();playAudio(16)',500);
        break;

      case 'win_lf':
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(2);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_cm': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(3);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_de': 
        setTimeout('insertItem(4);alchemistUI();playAudio(16)',500);
        break;

      case 'win_pe': 
        setTimeout('insertItem(7);alchemistUI();playAudio(16)',500);
        break;

      case 'win_c100':
        setTimeout('insertItem(9);alchemistUI();playAudio(16)',500);
        break;

      case 'win_c250':
        setTimeout('insertItem(11);alchemistUI();playAudio(16)',500);
        break;

      case 'win_c10': 
      for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(10);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_gh': 
        setTimeout('insertItem(19);alchemistUI();playAudio(16)',500);
        break;

      case 'win_dagger': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(28);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_flyingship': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(18);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_frograin': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(20);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_haste': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(24);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_qverin': 
        setTimeout('insertItem(5);alchemistUI();playAudio(16)',500);
        break;

      case 'win_thunder': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(31);alchemistUI();playAudio(16)',500+350*i);}
        break;

      case 'win_treasure': 
        for (let i = 0; i < item_amount; i++) {setTimeout('insertItem(27);alchemistUI();playAudio(16)',500+350*i);}
        break;

    }

    coins=recalcCoins();

    playAudio(14);

    gandlor.stage=4;
    

    gc_tooltip.hide();
    gandlorGame();

  });
  gandlor_bonus2.mouseenter(function(){bonusInspect($(this));
  }).mouseleave(function(){ gc_tooltip.hide();gc_tooltip.text('');});
  items_holder.mouseenter(function(){itemInspect($(this));
  }).mouseleave(function(){ item_tooltip.hide();item_tooltip.text('');});



  quest1_button.click(function(){

    playAudio(1);

    prestige.qclaim[0]=1;
    prestige.qmultiplier+=1;

    if(prestige.qmultiplier>=5){prestige.quests_flag=2;}

    buyRecalc();

  });
  quest2_button.click(function(){

    playAudio(1);

    prestige.qclaim[1]=1;
    prestige.qmultiplier+=1;

    if(prestige.qmultiplier>=5){prestige.quests_flag=2;}

    buyRecalc();

  });
  quest3_button.click(function(){

    playAudio(1);

    prestige.qclaim[2]=1;
    prestige.qmultiplier+=1;

    if(prestige.qmultiplier>=5){prestige.quests_flag=2;}

    buyRecalc();

  });
  quest4_button.click(function(){

    playAudio(1);

    prestige.qclaim[3]=1;
    prestige.qmultiplier+=1;

    if(prestige.qmultiplier>=5){prestige.quests_flag=2;}

    buyRecalc();

  });

  temple_button.click(function(){

    playAudio(6);

  });
  temple_button.mouseenter(function(){templeInspect($(this));
  }).mouseleave(function(){ temple_tooltip.hide();temple_tooltip.text('');});

  items_holder.click(function(){playAudio(6);});
  items_lock.click(function(){
    playAudio(6);
    if(alchemist.purse.lock==0){alchemist.purse.lock=1;}
    else{alchemist.purse.lock=0;}
    alchemistUI();
  });
  flask_title.click(function(){

    playAudio(1);

    if(alchemist.flask.show==0){alchemist.flask.show=1;}
    else{alchemist.flask.show=0;alchemist.flask.incoming=0;}

    refreshUI();

  });
  fl_button.click(function(){

    playAudio(1);

    if(alchemist.flask.show==0){alchemist.flask.show=1;}
    else{alchemist.flask.show=0;alchemist.flask.incoming=0;}

    refreshUI();

  });
  fl_button.mouseenter(function(){workshopGuideInspect($(this));
  }).mouseleave(function(){ item_tooltip.hide();item_tooltip.text('');});

  flask_load.click(function(){

    playAudio(1);

    if(alchemist.flask.incoming==0){
      alchemist.flask.incoming=1;

      alchemist.aviary.incoming=0;
    }
    else{alchemist.flask.incoming=0;}

    refreshUI();

  });
  flask_result.mouseenter(function(){workshopItemInspect($(this));
  }).mouseleave(function(){ item_tooltip.hide();item_tooltip.text('');});
  flask_confirm_button.click(function(){

    if(alchemist.flask.result!=9999){

      playAudio(4);

      let primary=999;
      let potency=0;
      for (let i = 0; i < alchemist.flask.recipe.length; i++) {
        if(chemistry[alchemist.flask.recipe[i]][5]=='primary ingredient'){primary=alchemist.flask.recipe[i];}
        else{potency+=parseInt(chemistry[alchemist.flask.recipe[i]][2]);}
      }

      recordRecipes(alchemist.flask.result,primary,potency);

      for (let i = 0; i < alchemist.flask.amount; i++) {

        if(alchemist.flask.result==32){
          for (let i = 0; i < 6; i++) { insertItem(31); }
        }else{
          insertItem(alchemist.flask.result);
        }
          
      }

      alchemist.flask.recipe=[];
      alchemist.flask.result=9999;
      alchemist.flask.confirm=0;
      
    }

    refreshUI();

  });
  flask_cancel_button.click(function(){

    playAudio(6);

    alchemist.flask.confirm=0;

    flaskUI();

  });
  flask_result.click(function(){

    playAudio(6);

    if(alchemist.flask.confirm==0){alchemist.flask.confirm=1;}
    else{alchemist.flask.confirm=0;}

    flaskUI();

  });

  flask_tab_flask.click(function(){

    playAudio(6);

    alchemist.flask.tab=0;

    flaskUI();

  });
  flask_tab_ingredients.click(function(){

    playAudio(6);

    alchemist.flask.tab=1;
    alchemist.flask.incoming=0;

    flaskUI();

  });
  flask_tab_recipes.click(function(){

    playAudio(6);

    alchemist.flask.tab=2;
    alchemist.flask.incoming=0;

    flaskUI();

  });


  aviary_title.click(function(){

    playAudio(1);

    if(alchemist.aviary.show==0){alchemist.aviary.show=1;}
    else{alchemist.aviary.show=0;alchemist.aviary.incoming=0;}

    refreshUI();

  });
  aviary_button.click(function(){

    playAudio(1);

    if(alchemist.aviary.show==0){alchemist.aviary.show=1;}
    else{alchemist.aviary.show=0;alchemist.aviary.incoming=0;}

    refreshUI();

  });
  aviary_catch_button.click(function(){

    playAudio(1);

    if(alchemist.aviary.incoming==0){
      alchemist.aviary.incoming=1;

      alchemist.flask.incoming=0;
    }
    else{alchemist.aviary.incoming=0;}

    refreshUI();

  });









  skeletons_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.skeletons_price[graveyard.buy_amount_index];
    graveyard.skeletons += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.skeletons_price=getPrices(graveyard.skeletons_base_price,graveyard.growth_rate,graveyard.skeletons);

    buyRecalcGraveyard(1);

  });
  spirits_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.spirits_price[graveyard.buy_amount_index];
    graveyard.spirits += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.spirits_price=getPrices(graveyard.spirits_base_price,graveyard.growth_rate,graveyard.spirits);

    buyRecalcGraveyard(2);

  });
  specters_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.specters_price[graveyard.buy_amount_index];
    graveyard.specters += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.specters_price=getPrices(graveyard.specters_base_price,graveyard.growth_rate,graveyard.specters);

    buyRecalcGraveyard(3);

  });
  succubi_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.succubi_price[graveyard.buy_amount_index];
    graveyard.succubi += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.succubi_price=getPrices(graveyard.succubi_base_price,graveyard.growth_rate,graveyard.succubi);

    buyRecalcGraveyard(4);

  });

  ghouls_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.ghouls_price[graveyard.buy_amount_index_2];
    graveyard.ghouls += graveyard.buy_amount[graveyard.buy_amount_index_2];
    graveyard.ghouls_price=getPrices(graveyard.ghouls_base_price,graveyard.growth_rate,graveyard.ghouls);

    buyRecalcGraveyard(5);

  });
  ghasts_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.ghasts_price[graveyard.buy_amount_index_2];
    graveyard.ghasts += graveyard.buy_amount[graveyard.buy_amount_index_2];
    graveyard.ghasts_price=getPrices(graveyard.ghasts_base_price,graveyard.growth_rate,graveyard.ghasts);

    buyRecalcGraveyard(6);

  });
  grimlords_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.grimlords_price[graveyard.buy_amount_index_2];
    graveyard.grimlords += graveyard.buy_amount[graveyard.buy_amount_index_2];
    graveyard.grimlords_price=getPrices(graveyard.grimlords_base_price,graveyard.growth_rate,graveyard.grimlords);

    buyRecalcGraveyard(7);

  });
  grandliches_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.grandliches_price[graveyard.buy_amount_index_2];
    graveyard.grandliches += graveyard.buy_amount[graveyard.buy_amount_index_2];
    graveyard.grandliches_price=getPrices(graveyard.grandliches_base_price,graveyard.growth_rate,graveyard.grandliches);

    buyRecalcGraveyard(8);

  });

  areds_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.areds_price[graveyard.buy_amount_index_3];
    graveyard.areds += graveyard.buy_amount[graveyard.buy_amount_index_3];
    graveyard.areds_price=getPrices(graveyard.areds_base_price,graveyard.growth_rate,graveyard.areds);

    buyRecalcGraveyard(9);

  });
  ardemators_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.ardemators_price[graveyard.buy_amount_index_3];
    graveyard.ardemators += graveyard.buy_amount[graveyard.buy_amount_index_3];
    graveyard.ardemators_price=getPrices(graveyard.ardemators_base_price,graveyard.growth_rate,graveyard.ardemators);

    buyRecalcGraveyard(10);

  });
  archsentinels_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.archsentinels_price[graveyard.buy_amount_index_3];
    graveyard.archsentinels += graveyard.buy_amount[graveyard.buy_amount_index_3];
    graveyard.archsentinels_price=getPrices(graveyard.archsentinels_base_price,graveyard.growth_rate,graveyard.archsentinels);

    buyRecalcGraveyard(11);

  });
  andlyns_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.andlyns_price[graveyard.buy_amount_index_3];
    graveyard.andlyns += graveyard.buy_amount[graveyard.buy_amount_index_3];
    graveyard.andlyns_price=getPrices(graveyard.andlyns_base_price,graveyard.growth_rate,graveyard.andlyns);

    buyRecalcGraveyard(12);

  });


  next_da_button.click(function(){

    playAudio(1);

    graveyard.artifact_pointer++;

    if(graveyard.artifact_pointer>3){graveyard.artifact_pointer=0;}
    
    refreshUIGraveyard();

  });
  next_target_button.click(function(){

    playAudio(1);

    graveyard.artifact_pointer=0;
    graveyard.artifacts_target*=10;
    graveyard.multiplier+=graveyard.multiplier_increment;

    //a rare mixing of UI; this is because there is no storeState() for this and the refresh rate in updateCounter is slow enough that a double click is possible. So we disable the button immediately
    next_target_button.prop('disabled', true);

    buyRecalcGraveyard();
    buyRecalc();

  });


  button_tree.click(function(){

    playAudio(6);

  });
  button_tree.mouseenter(function(){treeInspect();
  }).mouseleave(function(){ garden_tooltip.hide();});

  fort_button.mouseenter(function(){fortificationInspect($(this));
  }).mouseleave(function(){ fort_tooltip.hide();fort_tooltip.text('');});
  fort_button_disabled.mouseenter(function(){fortificationInspect($(this));
  }).mouseleave(function(){ fort_tooltip.hide();fort_tooltip.text('');});

  fort_button_weaklings.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[0]){return;}
    if(prestige.garden.fortifications[0]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=0;

    refreshUI();

  });
  fort_button_dwarves.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[1]){return;}
    if(prestige.garden.fortifications[1]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=1;

    refreshUI();

  });
  fort_button_humans.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[2]){return;}
    if(prestige.garden.fortifications[2]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=2;

    refreshUI();

  });
  fort_button_ogres.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[3]){return;}
    if(prestige.garden.fortifications[3]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=3;

    refreshUI();

  });
  fort_button_wizards.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[4]){return;}
    if(prestige.garden.fortifications[4]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=4;

    refreshUI();

  });
  fort_button_warlocks.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[5]){return;}
    if(prestige.garden.fortifications[5]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=5;

    refreshUI();

  });
  fort_button_witches.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[6]){return;}
    if(prestige.garden.fortifications[6]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=6;

    refreshUI();

  });
  fort_button_wyverns.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[7]){return;}
    if(prestige.garden.fortifications[7]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=7;

    refreshUI();

  });
  fort_button_catapults.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[8]){return;}
    if(prestige.garden.fortifications[9]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=8;

    refreshUI();

  });
  fort_button_crossbows.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[9]){return;}
    if(prestige.garden.fortifications[9]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=9;

    refreshUI();

  });
  fort_button_cheiroballistras.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[10]){return;}
    if(prestige.garden.fortifications[10]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=10;

    refreshUI();

  });
  fort_button_cannibals.click(function(){

    if(prestige.garden.trees-prestige.garden.trees_spent<prestige.garden.fort_prices[11]){return;}
    if(prestige.garden.fortifications[11]>=9){return;}

    playAudio(1);

    misc_settings.fort_unit=11;

    refreshUI();

  });

  tower1_fort_confirm.click(function(){
    playAudio(1);
    fortificationUpgrade(misc_settings.fort_unit);
    misc_settings.fort_unit=999;
    buyRecalc();
  });
  tower1_fort_cancel.click(function(){
    playAudio(1);
    misc_settings.fort_unit=999;
    refreshUI();
  });

  tower2_fort_confirm.click(function(){
    playAudio(1);
    fortificationUpgrade(misc_settings.fort_unit);
    misc_settings.fort_unit=999;
    buyRecalc();
  });
  tower2_fort_cancel.click(function(){
    playAudio(1);
    misc_settings.fort_unit=999;
    refreshUI();
  });

  tower3_fort_confirm.click(function(){
    playAudio(1);
    fortificationUpgrade(misc_settings.fort_unit);
    misc_settings.fort_unit=999;
    buyRecalc();
  });
  tower3_fort_cancel.click(function(){
    playAudio(1);
    misc_settings.fort_unit=999;
    refreshUI();
  });





  tower0_buy1.click(function(){

    playAudio(1);

    tower0.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  tower0_buy10.click(function(){

    playAudio(1);

    tower0.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  tower0_buy100.click(function(){

    playAudio(1);

    tower0.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  tower1_buy1.click(function(){

    playAudio(1);

    tower1.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  tower1_buy10.click(function(){

    playAudio(1);

    tower1.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  tower1_buy100.click(function(){

    playAudio(1);

    tower1.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  tower2_buy1.click(function(){

    playAudio(1);

    tower2.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  tower2_buy10.click(function(){

    playAudio(1);

    tower2.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  tower2_buy100.click(function(){

    playAudio(1);

    tower2.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  tower3_buy1.click(function(){

    playAudio(1);

    tower3.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  tower3_buy10.click(function(){

    playAudio(1);

    tower3.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  tower3_buy100.click(function(){

    playAudio(1);

    tower3.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  tower4_buy1.click(function(){

    playAudio(1);

    dragons_tower.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  tower4_buy10.click(function(){

    playAudio(1);

    dragons_tower.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  tower4_buy100.click(function(){

    playAudio(1);

    dragons_tower.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  tower5_buymax.click(function(){

    var ulength=alchemist.lab.length;
    var uid=0;

    if(tower1.counter>=alchemist.lab[uid].upgrade_prices){playAudio(4);}
    else return;
    

    for (let index = 0; index < ulength; index++) {

      if(tower1.counter>=alchemist.lab[uid].upgrade_prices){

        if(alchemist.lab[uid].labels=="I"){uid++;}
        else{alchemistUpgrade(uid,false);}
        
      }else{
        break;
      }
      
    }

    alchemist_tooltip.hide();
    if(misc_settings.gandlor_display==1){ recalcCoins();gandlorUI(); }
    buyRecalc();


    

  });

  necromancer_buymax.click(function(){

    var ulength=necromancer.lab.length;
    var uid=0;

    if(graveyard.counter>=necromancer.lab[uid].upgrade_prices){playAudio(4);}
    else return;
    

    for (let index = 0; index < ulength; index++) {

      if(graveyard.counter>=necromancer.lab[uid].upgrade_prices){

        necromancerUpgrade(uid,false);
        
      }else{
        break;
      }
      
    }

    necromancer_tooltip.hide();
    buyRecalcGraveyard();


    

  });

  hog_buymax.click(function(){

    playAudio(1);

    for (let index = 0; index < hog.diamonds.length; index++) {

      if(hog.diamonds[index]<9 && tower1.counter>=hog.diamonds_price[hog.buy_amount_index]){
        tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
        hog.diamonds[index] += hog.buy_amount[hog.buy_amount_index];
        hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];
    
        hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);
      }

    }

    buyRecalcHoG();


  });

  winecellar_buy1.click(function(){

    playAudio(1);

    winecellar.buy_amount_index=0;

    storeState();
    refreshUI();

  });
  winecellar_buy10.click(function(){

    playAudio(1);

    winecellar.buy_amount_index=1;

    storeState();
    refreshUI();

  });
  winecellar_buy100.click(function(){

    playAudio(1);

    winecellar.buy_amount_index=2;

    storeState();
    refreshUI();

  });

  graveyard_buy1.click(function(){

    playAudio(1);

    graveyard.buy_amount_index=0;

    storeState();
    refreshUIGraveyard();

  });
  graveyard_buy10.click(function(){

    playAudio(1);

    graveyard.buy_amount_index=1;

    storeState();
    refreshUIGraveyard();

  });
  graveyard_buy100.click(function(){

    playAudio(1);

    graveyard.buy_amount_index=2;

    storeState();
    refreshUIGraveyard();

  });

  graveyard2_buy1.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_2=0;

    storeState();
    refreshUIGraveyard();

  });
  graveyard2_buy10.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_2=1;

    storeState();
    refreshUIGraveyard();

  });
  graveyard2_buy100.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_2=2;

    storeState();
    refreshUIGraveyard();

  });

  graveyard3_buy1.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_3=0;

    storeState();
    refreshUIGraveyard();

  });
  graveyard3_buy10.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_3=1;

    storeState();
    refreshUIGraveyard();

  });
  graveyard3_buy100.click(function(){

    playAudio(1);

    graveyard.buy_amount_index_3=2;

    storeState();
    refreshUIGraveyard();

  });

  reincarnate_button.click(function(){

    if(prestige.library.library_switch!=0){return;}

    playAudio(1);

    prestige.library.library_switch=1;


    refreshUI();

  });
  reincarnation_stay.click(function(){

    playAudio(1);

    prestige.library.library_switch=2;

    //clearing loops
    clearInterval(session_data.main_loop);session_data.main_loop=null;

    clearInterval(gandlor.loop);
    gandlor.loop=null;gandlor.frame=0;

    saveGame();

    refreshUI();

  });
  reincarnation_unlock.click(function(){

    playAudio(1);

    prestige.library.unlocked=1;

    saveGame();

    refreshUI();

  });
  reincarnation_cancel.click(function(){

    playAudio(1);

    prestige.library.library_switch=0;

    refreshUI();

  });
  reincarnation_quests.click(function(){

    playAudio(1);

    prestige.quests_flag=1;


  });
  reincarnation_noupgrades.click(function(){

    playAudio(1);

    Reincarnate();

    buyRecalc();

  });


});//document.ready