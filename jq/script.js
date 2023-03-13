var version = "0.4";
var savefile_name = "incremental_fortress"+version;

var debug_nosave=0;

var audio_initiated=0;

var diff = 0;
var date = Date.now();
var player = {};
var tower0 = {};
var tower1 = {};
var tower2 = {};
var tower3 = {};
var tower4 = {};
var dragons_tower = {};
var winecellar = {};
var hog = {};
var graveyard = {};
var messenger = {
  active:0,//if event is currently messenger
  title:'',
  body:'',
  reward:0,
  cost:0,
  fresh_horses:0,
  hammer_multiplier:1,
  hammer_time:0
};
var alchemist = {};
var medallions = {};

//values preserved between prestige cycles
player = {
  start:0,
  time:0,
  frame1:0,
  frame2:0,
  messenger_index:1
};
var prestige = {
  multiplier:1,
  all_time_counter:0,
  all_time_mana:0,
  spent_mana:0,//currently not used
  messenger_speed:1,
  messenger_speed_level:0,
  quests_flag:0,
  quests:[0,0,0,0],
  qclaim:[0,0,0,0],
  qmultiplier:1,
  fhp:1e4,//fresh horses probability
  dwarf_university_multiplier:1
};
var garden = {
  trees:0,
  apples:0,
  tree_multiplier:[1,1,1,1,1,1,1,1,1,1,1],
  tree_multiplier_price:[1,1,1,1,1,1,1,1,1,1,1],
  starting_time:0,
  tree_age:0,
  tree_state:0
}
var notifications = {
  winecellar_unlocked:0
};
var settings = {
  scientific:0,
  audio_mute:0,
  audio_volume:0.5
}


//variables that are constants, unsaved defaults or are derived from saved variables
const MANA_BASE_COST=1e9;
const MESSENGER_DISTANCE = 1e4;
var nextManaCost=0;
var current_rate=0;
var mortals_rate=[0,0,0,0];
var mages_rate=[0,0,0];
var machines_rate=[0,0,0];
var hammer_rate=1;
var misc_settings={
  settings_toggle:0,
  guide_toggle:0,
  guide_page:'',
  reincarnation_options_toggle:0,
  graveyard_setup:0
}
var gardenMetadata={
  tree_stages:['Seed','Sprout','Seedling','Sapling','Mature']
};
var guidebook={
  messengers:'The gifts brought by the Royal Messengers are not random and are set at a x100 or x1,000 the current rate. Health points of the enemies are not random either and are set at x100 the current rate.<br><br>Therefore, it makes sense to maximize your rate when you see that the Messengers are about to arrive.',
  reincarnation:'Mana multiplier is a powerful upgrade and is applied to the rate after all of the other upgrades.<br><br><i class="tiny">Note: Reincarnation button becomes visible when you mine 1 Mana. You need a minimum of x2 to reincarnate during your first run.</i>',
  winecellar:'Wine Cellar applies the Drunken Multiplier to one of either races in the Towers of Mortals and Mages. Depending on the situation, it might be beneficial to provide drinks to a specific race.<br><br>Keep in mind that when the Royal Messengers arrive, applying the Drunken Multiplier at that moment will increase those gifts accordingly. This also applies to things like Hiring Rewards and other upgrades that are dependent on current rate.<br><br><i class="tiny">Note: you can tell when someone is drinking by the <span class="green">color</span> of the rate indicator</i>',
  wicked:'Each quest requires you to hire 66 of the relevant mortal which will trigger the corresponding counter in the Wicked Quests box. When the counter reaches 666, the Wicked Multiplier will be incremented by 1.<br><br>If you hire more creatures midway, the counter will stop. Its progress will not be reset, but that would mean you\'ve botched the challenge for this run and would need to wait for a reincarnation to finish it.<br><br>Completing all the quests provides you with a permanent Wicked Multiplier of x5, which is applied to the current rate after all of the other upgrades.',
  fire:'Fire Multiplier boosts Dwarves. It\'s not a permanent multiplier and is reset every reincarnation. It might make sense to check out the Wine Cellar when the Fire Multiplier is high, since at some point the dwarves might be the strongest race.',
  giant:'Giant Multiplier is a poweful upgrade that is applied to the current rate after all of the other upgrades.<br><br>It is comprised from the creatures in the Tower of Mortals and the Tower of Mages: every 100 creatures add 1 giant. You need to click the "Recast Giants" button if you would like to recalculate the Giant Multiplier when more creatures are hired.',
  diamonds:'Diamonds increase the power of giants. Keep in mind that the price is the same for all diamonds and will grow with every purchase. Therefore, think carefully which giants to upgrade first!',
  graveyard:'Graveyard Multiplier is a poweful upgrade that is applied to the current rate after all of the other upgrades.<br><br>In order to increment the multiplier, you must reach the target in each of the Doomed Artifacts. Use the ">>>" button to switch between artifacts and fill each one up. When done, click the "Next target" button which will increment the Graveyard Multiplier and set the next target.<br><br>There are currently no prestige upgrades for the Graveyard, but it has a dependency on Smaug, so be sure to read the section on Smaug.',
  smaug:'Apart from being an awesome dragon that boosts his sister Eborsisk, Smaug also boosts the Graveyard. Every 50 levels of Smaug increment a special multiplier. Because of that if Smaug\'s level is under 50, the Graveyard won\'t function.<br><br>When Smaug\'s level is 50, this special multiplier is x1. When it\'s a 100 the multiplier is x2, and so on.',
  medallions:'Medallions are achievements that are awarded when you reach certain hiring milestones, such as 10 Weaklings, 50 Weaklings, 100 Weaklings and so on for every creature and machine. Each milestone gives the player a hiring reward. This reward depends on the current rate, so ensuring that the Drunken Multiplier in the Wine Cellar is active when reaching the milestone will make the reward higher.<br><br>There are also powerful Medallion Alchemist Upgrades that are unlocked at 10, 20 and 30 medallions.',
  alchemist:'Alchemist provides upgrades that are unlocked based on a variety of conditions, mostly around the amount of creatures or machines in the towers. In order to buy the upgrade, you must first select its label. Hovering over the labels allows you to see the description of each upgrade.',
  garden:'The Garden is unlocked when your total amount mined reaches 1 billion. Planting a seed allows you to start growing an oak tree. The growth of the tree is dependent on the passage of time and will grow at the same rate both online and offline.<br><br>When the tree has grown, it will produce oak apples.',

  offline:'Incremental Fortress supports offline mining by default. Offline mining runs at 10% efficiency.',
  eoc:'One of the most common questions about an incremental game - which stage is the end of content?<br><br>The current IF release ends when you unlock the Graveyard. Obviously, there\'s a lot for the player to do there, but there is currently nothing beyond that.',
  compatibility:'This is <b>version 0.4</b> of the game - a very early release. Therefore, keep in mind that there is little guarantee that your save is going to be compatible with future versions. Instead, consider this version as a standalone experience.',
  known_issues:'Currently you cannot see which Alchemist Upgrade you can afford unless you actually click on its label. Hovering over the labels does allow you to see the price, but it would be nice if the labels become active or inactive depending on whether you can afford them. Unfortunately, I haven\'t yet been able to implement a reliable solution.<br><br>There\'s also quite a bit of scrolling involved. While the need for it has been reduced slightly in this version, the issue remains. I already have ideas on how to address it, but suffice to say, I am aware of it.',
  future:'Incremental Fortress is the kind of game that benefits from having a variety of fun upgrades and supplemental mechanics to be interesting.<br><br>I am fairly satisfied with the current version, but I also view it as just the beginning.<br><br>Another important bit is balance and pacing. It\'s one of those things that require lots of testing and tweaking and will improve over time.<br><br>Finally, Reincarnation upgrades right now are very basic. I will probably come up with a more interesting prestige system for the next version. Stay tuned!'
}
var strangeUpgrades={

  hammer_milestones:[1000, 2500, 4000, 5500, 7000, 8500, 1e4, 11500, 13000, 14500],
  wizard_milestones:[20, 70, 110, 170],
  medallions_milestones:[10,30,50,100],
  counter_milestones:[5e4,25e4,5e5,1e6,5e6,50e6,500e6,1e9,50e9,500e9,1e12,50e12,500e12,1e15,50e15,500e15,1e18,1e21,1e24,1e27],
  milestones:[1, 5, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600],

  //milestone, name, description

  weaklings:[
    [1,'Weak Force','Doubles the power of weaklings'],
    [5,'Be Very Afraid!','Doubles the power of weaklings'],
    [15,'Small Fists','Doubles the power of weaklings'],
    [30,'Quiet Revolution','Doubles the power of weaklings'],
    [45,'Beware of the Weak!','Doubles the power of weaklings'],
    [60,'Root for the Underdog','Doubles the power of weaklings'],
    [75,'Power of the Weak!','Doubles the power of weaklings'],
    [90,'We\'re Getting Stronger','Doubles the power of weaklings'],
    [105,'Not So Weak Anymore!','Doubles the power of weaklings'],
    [120,'Strength in Numbers','Doubles the power of weaklings']
  ],

  dwarves:[
    [1,'The Dwarf Age','Doubles the power of dwarves'],
    [5,'Dwarf Adventure','Doubles the power of dwarves'],
    [15,'Grab Your Shovel!','Doubles the power of dwarves'],
    [30,'Quest for Gold','Doubles the power of dwarves'],
    [45,'Axes Up','Doubles the power of dwarves'],
    [60,'Dwarf Squad','Doubles the power of dwarves'],
    [75,'Dwarf Army','Doubles the power of dwarves'],
    [90,'Short and Tough','Doubles the power of dwarves'],
    [105,'Fire Within','Doubles the power of dwarves'],
    [120,'King Under the Mountain','Doubles the power of dwarves']
  ],

  humans:[
    [1,'Ordinary but Ambitious','Doubles the power of humans'],
    [5,'Healthy Diet','Doubles the power of humans'],
    [15,'Joggers','Doubles the power of humans'],
    [30,'Tower Burpies','Doubles the power of humans'],
    [45,'Fitness of Mortals','Doubles the power of humans'],
    [60,'Weightlifting Gold','Doubles the power of humans'],
    [75,'Canned Food','Doubles the power of humans'],
    [90,'Superhuman','Doubles the power of humans'],
    [105,'Humanity Outreach','Doubles the power of humans'],
    [120,'Reaching for the Stars','Doubles the power of humans']
  ],

  ogres:[
    [1,'The Brute Squad','Doubles the power of ogres'],
    [5,'Stronger Than Most','Doubles the power of ogres'],
    [15,'Meat and Beer','Doubles the power of ogres'],
    [30,'Beef It Up','Doubles the power of ogres'],
    [45,'Getting Serious','Doubles the power of ogres'],
    [60,'Golden Bricks','Doubles the power of ogres'],
    [75,'Too Strong','Doubles the power of ogres'],
    [90,'The Real Ogre','Doubles the power of ogres'],
    [105,'Ogreatness','Doubles the power of ogres'],
    [120,'Fezzik\'s Fist','Doubles the power of ogres']
  ],

  wizards:[
    [15,'School of Magic','Doubles the power of wizards'],
    [30,'The Magic Wand','Doubles the power of wizards'],
    [45,'A Strange Spell','Doubles the power of wizards'],
    [60,'Works Like a Charm','Doubles the power of wizards'],
    [75,'Enchanted Kingdom','Doubles the power of wizards'],
    [90,'Abracadabra!','Doubles the power of wizards'],
    [105,'A Penchant for Magic','Doubles the power of wizards'],
    [120,'Wizardry Geek','Doubles the power of wizards'],
    [20,'Sophisticated Incantations','Weaklings\' power boosted by 0.1 per wizard'],
    [70,'Magic of the Axe','Dwarves\' power boosted by 0.1 per wizard'],
    [110,'Deliberate Chanting','Humans\' power boosted by 0.1 per wizard'],
    [170,'Magic Infusion','Ogres\' power boosted by 0.1 per wizard']
  ],

  warlocks:[
    [15,'The Darkness Within','Doubles the power of warlocks'],
    [30,'Magic of the Shadows','Doubles the power of warlocks'],
    [45,'Sorcerer\'s Wrath','Doubles the power of warlocks'],
    [60,'Evil Eye','Doubles the power of warlocks'],
    [75,'Secrets of Sorcery','Doubles the power of warlocks'],
    [90,'Tome of Spells','Doubles the power of warlocks'],
    [105,'Double Curse','Doubles the power of warlocks'],
    [120,'Tremble, mortals!','Doubles the power of warlocks']
  ],

  witches:[
    [15,'Earthly Powers','Doubles the power of witches'],
    [30,'Health Potion','Doubles the power of witches'],
    [45,'Forest of Healing','Doubles the power of witches'],
    [60,'Waters of Mystery','Doubles the power of witches'],
    [75,'Secret Recipe','Doubles the power of witches'],
    [90,'Suspicious Cats','Doubles the power of witches'],
    [105,'Skulls on Shelves','Doubles the power of witches'],
    [120,'Curses and Blessings','Doubles the power of witches']
  ],

  wyverns:[
    [15,'Fireballs Galore','Doubles the power of wyverns'],
    [30,'Widest of Wings','Doubles the power of wyverns'],
    [45,'Beast of the Skies','Doubles the power of wyverns'],
    [60,'The Strongest Reptile','Doubles the power of wyverns'],
    [75,'Dragon Skin','Doubles the power of wyverns'],
    [90,'Sudden Fire','Doubles the power of wyverns'],
    [105,'Trembling Ground','Doubles the power of wyverns'],
    [120,'Wave of Heat','Doubles the power of wyverns']
  ],

  catapults:[
    [15,'Bombs Away!','Doubles the power of catapults'],
    [30,'Beyond the Walls','Doubles the power of catapults'],
    [45,'Rain of Fire','Doubles the power of catapults'],
    [60,'Little Mercy','Doubles the power of catapults'],
    [75,'The Great Payload','Doubles the power of catapults'],
    [90,'Heavy Wheels','Doubles the power of catapults'],
    [105,'Chariot of Death','Doubles the power of catapults'],
    [120,'Woosh!','Doubles the power of catapults']
  ],

  crossbows:[
    [15,'Light Arrows','Doubles the power of crossbows'],
    [30,'Archer\'s Delight','Doubles the power of crossbows'],
    [45,'Flying Knives','Doubles the power of crossbows'],
    [60,'Bronze Arrowhead','Doubles the power of crossbows'],
    [75,'Bow to the Arrow','Doubles the power of crossbows'],
    [90,'Projectiles of Oblivion','Doubles the power of crossbows'],
    [105,'Double Load','Doubles the power of crossbows'],
    [120,'Poetic Speed','Doubles the power of crossbows']
  ],

  cheiroballistras:[
    [15,'Deadly Invention','Doubles the power of cheiroballistras'],
    [30,'Machines of Death','Doubles the power of cheiroballistras'],
    [45,'Death From the Skies','Doubles the power of cheiroballistras'],
    [60,'Hungry to Kill','Doubles the power of cheiroballistras'],
    [75,'God of Extinction','Doubles the power of cheiroballistras'],
    [90,'You Siege Will Fail!','Doubles the power of cheiroballistras'],
    [105,'Bolts of Pain','Doubles the power of cheiroballistras'],
    [120,'Arrow Machine','Doubles the power of cheiroballistras']
  ],

  hammer:[
    [1000,'Tin Hammer','Doubles the power of the hammer'],
    [2500,'Bronze Hammer','Doubles the power of the hammer'],
    [4000,'Silver Hammer','Doubles the power of the hammer'],
    [5500,'Golden Hammer','Doubles the power of the hammer'],
    [7000,'Diamond Hammer','Doubles the power of the hammer'],
    [8500,'Ultimate Hammer','Doubles the power of the hammer'],
    [1e4,'Divine Force','Doubles the power of the hammer'],
    [11500,'Hammer of the Gods','Doubles the power of the hammer'],
    [13000,'Galactic Forge','Doubles the power of the hammer'],
    [14500,'Beyond Perfection','Doubles the power of the hammer']
  ],

  medallions:[
    [10,'Cup of Gold','Every medallion boosts the rate'],
    [30,'Golden Jar','Every medallion boosts the rate even more'],
    [50,'Gold Shower','Every medallion boosts the rate even more'],
    [100,'Bathe in Gold','Every medallion boosts the rate even more'],
  ],

  counter:[
    [5e4,'Massive Gates','Fortress Multiplier +1%'],
    [25e4,'Fortified Bridge','Fortress Multiplier +1%'],
    [5e5,'Stone Walls','Fortress Multiplier +1%'],
    [1e6,'Deep Moat','Fortress Multiplier +1%'],
    [5e6,'Reinforced Wine Cellar','Fortress Multiplier +2%'],
    [50e6,'Arrow Supplies','Fortress Multiplier +2%'],
    [500e6,'Guards of the Outer Wall','Fortress Multiplier +2%'],
    [1e9,'Earthworks','Fortress Multiplier +2%'],
    [50e9,'Bronze Locks','Fortress Multiplier +3%'],
    [500e9,'Fierce Hounds','Fortress Multiplier +3%'],
    [1e12,'Arrow Loops','Fortress Multiplier +3%'],
    [50e12,'Monsters in the Moat','Fortress Multiplier +3%'],
    [500e12,'Underground Tunnels','Fortress Multiplier +4%'],
    [1e15,'Wheat Supplies','Fortress Multiplier +4%'],
    [50e15,'Barrels of Wine','Fortress Multiplier +4%'],
    [500e15,'Balistraria','Fortress Multiplier +4%'],
    [1e18,'Blood Magic Aura','Fortress Multiplier +5%'],
    [1e21,'Elite Guard','Fortress Multiplier +5%'],
    [1e24,'Dwarf Supremacy','Fortress Multiplier +5%'],
    [1e27,'Reinforced Towers','Fortress Multiplier +5%']
  ]

};



$(document).ready(function(){



  //document.title = "Incremental Fortress v"+version;
    console.log("Incremental Fortress v"+version);
    console.log("created by Louigi Verona");
    console.log("https://louigiverona.com/?page=about");


  //init functions

  setupTowers();
  init();

  if(localStorage.getItem(savefile_name)){loadGame();}

  commonInit();
  refreshUI();

  setInterval(loop, 50);

  ////////////////

  $("html").keydown(function( event ) {
    switch (event.key){
      case "q":

        //qAdd(1e4);
        //qWicked();

        

      break;
      case "w":
        //for testing

        player.frame2+=100;
        


      break;
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
    }else{misc_settings.settings_toggle=0;}

    refreshUI();
  });
  button_scientific.click(function(){
    playAudio(1);

    if(settings.scientific==0){
      settings.scientific=1;
    }else{settings.scientific=0;}

    refreshUI();
  });
  button_save.click(function(){
    playAudio(1);

    button_save.text("Saved").prop("disabled",true);

    saveGame();

    setTimeout(function() { button_save.text("Save Game").prop("disabled",false); }, 1000);

  });
  button_delsave.click(function(){

    delSave();
    location.reload();

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


    playAudio(1);

    localStorage.setItem(savefile_name, import_save_dump.text());
    import_save_dump.text('');

    misc_settings.settings_toggle=0;

    loadGame();
    refreshUI();

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

    if(player.messenger_index==1 || player.messenger_index==5){return;}

    if(player.messenger_index==3 || player.messenger_index==7){//attack!

      if(messenger.cost>=tower1.counter){
        messenger.cost-=tower1.counter;
        tower1.counter=0;
      }else{
        tower1.counter-=messenger.cost;
        messenger.cost=0;
      }

      //victory!
      if(messenger.cost<=0){
        player.messenger_index=0;//resetting the index
        messenger.active=0;
        player.frame2=0;
        tower1.counter+=messenger.reward;
        prestige.all_time_counter+=messenger.reward;
      }

    }else{
      tower1.counter+=messenger.reward;
      prestige.all_time_counter+=messenger.reward;
      messenger.active=0;
      player.frame2=0;
    }

    next_messenger_label.html('Messengers are on their way:<br>' + numT(player.frame2 / 10000 * 100).toFixed(0) + '%' );

    buyRecalc();

  });
  messenger_bonus_button.click(function(){

    playAudio(3);

    player.frame2=MESSENGER_DISTANCE*prestige.messenger_speed*0.95;
    messenger.fresh_horses=0;

    refreshUI();

  });
  courtyard_info_button.click(function(){

    playAudio(3);

    for (const [key, value] of Object.entries(notifications)) {

      switch(key){
        case 'winecellar_unlocked':
          if(value==1){notifications.winecellar_unlocked=2;}
          break;
      }

    }

    refreshUI();

  });
  collect_medallions_button.click(function(){

    playAudio(1);

    tower1.counter+=medallions.reward;
    medallions.reward=0;

    for (const [key, value] of Object.entries(medallions.milestones)) {
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
    }

    buildMedallionsList();
    buyRecalc();

  });
  tree_button.click(function(){

    var half_a_day=43200;
    garden.starting_time=Date.now();

    if(garden.tree_state==0){
      garden.tree_state=1;
    }

    if(garden.tree_state==1 && garden.tree_age>=half_a_day){
      garden.tree_state=2;
    }

    if(garden.tree_state==2 && garden.tree_age>=half_a_day*2){
      garden.tree_state=3;
    }

    if(garden.tree_state==3 && garden.tree_age>=half_a_day*4){
      garden.tree_state=4;
    }

  });


  hammer_button.mousedown(function(){

    playAudio(2);

    hammer_button.blur();

  });
  hammer_button.mouseup(function(){

    playAudio(2);

    hammer_button.blur();

    tower0.clicks++;

    hammer_rate = (tower0.hammer_power + (tower0.ore* (tower0.ore_power+tower0.mine*tower0.mine_power) )) * alchemist.hammer_multiplier * messenger.hammer_multiplier;

    tower1.counter += hammer_rate;
    tower1.all_reincarnation_counter += hammer_rate;
    prestige.all_time_counter += hammer_rate;

    clickRecalc();

  });
  ore_button.click(function(){

    playAudio(1);

    tower1.counter -= tower0.ore_price[tower0.buy_amount_index];
    tower0.ore += tower0.buy_amount[tower0.buy_amount_index];
    tower0.ore_price=getPrices(tower0.ore_base_price,tower0.growth_rate,tower0.ore);

    buyRecalc();

  });
  mine_button.click(function(){

    playAudio(1);

    tower1.counter -= tower0.mine_price[tower0.buy_amount_index];
    tower0.mine += tower0.buy_amount[tower0.buy_amount_index];
    tower0.mine_price=getPrices(tower0.mine_base_price,tower0.growth_rate,tower0.mine);

    buyRecalc();

  });


  alchemist_upgrade_button.click(function(){

    if(alchemist.upgrade_ids.length<=0){return;}

    alchemistUpgrade();

  });
  



  weaklings_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.weaklings_price[tower1.buy_amount_index];
    tower1.weaklings += tower1.buy_amount[tower1.buy_amount_index];
    tower1.weaklings_price=getPrices(tower1.weaklings_base_price,tower1.weaklings_growth_rate,tower1.weaklings);

    //winecellar notification
    if(notifications.winecellar_unlocked==0 && tower1.weaklings>=5){
      notifications.winecellar_unlocked=1;
    }

    buildMedallionsList();
    buyRecalc(1);

  });
  dwarves_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.dwarves_price[tower1.buy_amount_index];
    tower1.dwarves += tower1.buy_amount[tower1.buy_amount_index];
    tower1.dwarves_price=getPrices(tower1.dwarves_base_price,tower1.growth_rate,tower1.dwarves);

    buildMedallionsList();
    buyRecalc(2);

  });
  humans_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.humans_price[tower1.buy_amount_index];
    tower1.humans += tower1.buy_amount[tower1.buy_amount_index];
    tower1.humans_price=getPrices(tower1.humans_base_price,tower1.growth_rate,tower1.humans);

    buildMedallionsList();
    buyRecalc(3);

  });
  ogres_button.click(function(){

    playAudio(1);

    tower1.counter -= tower1.ogres_price[tower1.buy_amount_index];
    tower1.ogres += tower1.buy_amount[tower1.buy_amount_index];
    tower1.ogres_price=getPrices(tower1.ogres_base_price,tower1.growth_rate,tower1.ogres);

    buildMedallionsList();
    buyRecalc(4);

  });

  wizards_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.wizards_price[tower2.buy_amount_index];
    tower2.wizards += tower2.buy_amount[tower2.buy_amount_index];
    tower2.wizards_price=getPrices(tower2.wizards_base_price,tower2.growth_rate,tower2.wizards);

    buildMedallionsList();
    buyRecalc(5);

  });
  warlocks_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.warlocks_price[tower2.buy_amount_index];
    tower2.warlocks += tower2.buy_amount[tower2.buy_amount_index];
    tower2.warlocks_price=getPrices(tower2.warlocks_base_price,tower2.growth_rate,tower2.warlocks);

    buildMedallionsList();
    buyRecalc(6);

  });
  witches_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.witches_price[tower2.buy_amount_index];
    tower2.witches += tower2.buy_amount[tower2.buy_amount_index];
    tower2.witches_price=getPrices(tower2.witches_base_price,tower2.growth_rate,tower2.witches);

    buildMedallionsList();
    buyRecalc(7);

  });
  wyverns_button.click(function(){

    playAudio(1);

    tower1.counter -= tower2.wyverns_price[tower2.buy_amount_index];
    tower2.wyverns += tower2.buy_amount[tower2.buy_amount_index];
    tower2.wyverns_price=getPrices(tower2.wyverns_base_price,tower2.growth_rate,tower2.wyverns);

    buildMedallionsList();
    buyRecalc(8);

  });

  catapults_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.catapults_price[tower3.buy_amount_index];
    tower3.catapults += tower3.buy_amount[tower3.buy_amount_index];
    tower3.catapults_price=getPrices(tower3.catapults_base_price,tower3.growth_rate,tower3.catapults);

    buildMedallionsList();
    buyRecalc(9);

  });
  crossbows_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.crossbows_price[tower3.buy_amount_index];
    tower3.crossbows += tower3.buy_amount[tower3.buy_amount_index];
    tower3.crossbows_price=getPrices(tower3.crossbows_base_price,tower3.growth_rate,tower3.crossbows);

    buildMedallionsList();
    buyRecalc(10);

  });
  cheiroballistras_button.click(function(){

    playAudio(1);

    tower1.counter -= tower3.cheiroballistras_price[tower3.buy_amount_index];
    tower3.cheiroballistras += tower3.buy_amount[tower3.buy_amount_index];
    tower3.cheiroballistras_price=getPrices(tower3.cheiroballistras_base_price,tower3.growth_rate,tower3.cheiroballistras);

    buildMedallionsList();
    buyRecalc(11);

  });

  dragon1_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon1_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon1 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon1_price=getPrices(dragons_tower.dragon1_base_price,dragons_tower.growth_rate,dragons_tower.dragon1);

    recalculateFireMultiplier();

    buyRecalc();

  });
  dragon2_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon2_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon2 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon2_price=getPrices(dragons_tower.dragon2_base_price,dragons_tower.growth_rate,dragons_tower.dragon2);

    recalculateFireMultiplier();

    buyRecalc();

  });
  dragon3_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon3_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon3 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon3_price=getPrices(dragons_tower.dragon3_base_price,dragons_tower.growth_rate,dragons_tower.dragon3);

    recalculateFireMultiplier();

    buyRecalc();

  });
  dragon4_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon4_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon4 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon4_price=getPrices(dragons_tower.dragon4_base_price,dragons_tower.growth_rate,dragons_tower.dragon4);

    recalculateFireMultiplier();

    buyRecalc();
    buyRecalcGraveyard();

  });
  dragon5_button.click(function(){

    playAudio(1);

    tower1.counter -= dragons_tower.dragon5_price[dragons_tower.buy_amount_index];
    dragons_tower.dragon5 += dragons_tower.buy_amount[dragons_tower.buy_amount_index];
    dragons_tower.dragon5_price=getPrices(dragons_tower.dragon5_base_price,dragons_tower.growth_rate,dragons_tower.dragon5);

    recalculateFireMultiplier();

    buyRecalc();

  });

  diamonds1_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[0] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds2_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[1] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds3_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[2] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds4_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[3] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds5_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[4] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds6_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[5] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds7_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[6] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });
  diamonds8_button.click(function(){

    playAudio(1);

    tower1.counter -= hog.diamonds_price[hog.buy_amount_index];
    hog.diamonds[7] += hog.buy_amount[hog.buy_amount_index];
    hog.all_diamonds += hog.buy_amount[hog.buy_amount_index];

    hog.diamonds_price=getPrices(hog.diamonds_base_price,hog.growth_rate,hog.all_diamonds);

    recastGiants();

    buyRecalc();

  });

  recast_button.click(function(){

    playAudio(1);

    recastGiants();

    buyRecalc();

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

    playAudio(1);

    winecellar.drunk = [1,1,1,1,1,1,1,1];

    winecellar.drunk_index=0;

    winecellar.drunk[0] = winecellar.wine_multiplier+(winecellar.wineage * (winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power) );
    
    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_weaklings.click(function(){

    playAudio(1);

    winecellar.drunk_index=0;

    winecellar.drunk = [(winecellar.wine_multiplier+(winecellar.wineage * (winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power) )),1,1,1,1,1,1,1];
    
    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  dwarves_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=1;

    winecellar.drunk = [1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_dwarves.click(function(){

    playAudio(1);

    winecellar.drunk_index=1;

    winecellar.drunk = [1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  humans_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=2;

    winecellar.drunk = [1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_humans.click(function(){

    playAudio(1);

    winecellar.drunk_index=2;

    winecellar.drunk = [1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  ogres_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=3;

    winecellar.drunk = [1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_ogres.click(function(){

    playAudio(1);

    winecellar.drunk_index=3;

    winecellar.drunk = [1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  wizards_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=4;

    winecellar.drunk = [1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_wizards.click(function(){

    playAudio(1);

    winecellar.drunk_index=4;

    winecellar.drunk = [1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  warlocks_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=5;

    winecellar.drunk = [1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_warlocks.click(function(){

    playAudio(1);

    winecellar.drunk_index=5;

    winecellar.drunk = [1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1,1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  witches_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=6;

    winecellar.drunk = [1,1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_witches.click(function(){

    playAudio(1);

    winecellar.drunk_index=6;

    winecellar.drunk = [1,1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))),1];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });

  wyverns_drink_button.click(function(){

    playAudio(1);

    winecellar.drunk_index=7;

    winecellar.drunk = [1,1,1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power)))];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });
  drink_wyverns.click(function(){

    playAudio(1);

    winecellar.drunk_index=7;

    winecellar.drunk = [1,1,1,1,1,1,1,(winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power)))];

    winecellar.wine_frame=0;
    winecellar.drinking=1;

    buyRecalc();

  });




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


  skeletons_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.skeletons_price[graveyard.buy_amount_index];
    graveyard.skeletons += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.skeletons_price=getPrices(graveyard.skeletons_base_price,graveyard.growth_rate,graveyard.skeletons);

    buyRecalcGraveyard();

  });
  spirits_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.spirits_price[graveyard.buy_amount_index];
    graveyard.spirits += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.spirits_price=getPrices(graveyard.spirits_base_price,graveyard.growth_rate,graveyard.spirits);

    buyRecalcGraveyard();

  });
  specters_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.specters_price[graveyard.buy_amount_index];
    graveyard.specters += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.specters_price=getPrices(graveyard.specters_base_price,graveyard.growth_rate,graveyard.specters);

    buyRecalcGraveyard();

  });
  succubi_button.click(function(){

    playAudio(1);

    graveyard.counter -= graveyard.succubi_price[graveyard.buy_amount_index];
    graveyard.succubi += graveyard.buy_amount[graveyard.buy_amount_index];
    graveyard.succubi_price=getPrices(graveyard.succubi_base_price,graveyard.growth_rate,graveyard.succubi);

    buyRecalcGraveyard();

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

  reincarnate_button.click(function(){

    playAudio(1);

    misc_settings.reincarnation_options_toggle=1;

    refreshUI();

  });
  reincarnation_cancel.click(function(){

    playAudio(1);

    misc_settings.reincarnation_options_toggle=0;

    refreshUI();

  });
  reincarnation_winecellar.click(function(){

    if(prestige.winecellar==1){return;}

    playAudio(1);

    prestige.winecellar=1;

    Reincarnate();

    buyRecalc();

  });
  reincarnation_messengers.click(function(){

    playAudio(1);

    prestige.messenger_speed*=0.9;
    prestige.messenger_speed_level++;

    Reincarnate();

    buyRecalc();

  });
  reincarnation_dwarves.click(function(){

    playAudio(1);

    prestige.dwarf_university_multiplier=10;

    Reincarnate();

    buyRecalc();

  });
  reincarnation_quests.click(function(){

    playAudio(1);

    prestige.quests_flag=1;

    Reincarnate();

    buyRecalc();

  });
  reincarnation_noupgrades.click(function(){

    playAudio(1);

    Reincarnate();

    buyRecalc();

  });


});//document.ready


function init(){

  player.start=Date.now();



}
function commonInit(){
  //inits that are relevant to both init() and loadGame()
  Howler.volume(settings.audio_volume);//default volume
}
function setupTowers(){

  tower0 = {
    name:'Tower of Metals',
    growth_rate:1.75,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    hammer_power:1,
    ore:0,
    ore_power:1,
    ore_price:[500,178926.25999450684,1.3418797823518567e+27],
    ore_base_price:500,
    mine:0,
    mine_power:0.1,
    mine_price:[10000,3578525.1998901367,2.6837595647037135e+28],
    mine_base_price:1e4,
    clicks:0
  };

  tower1 = {
    name:'Tower of Mortals',
    counter:0,
    all_reincarnation_counter:0,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    weaklings:0,
    weaklings_power:0.01,
    weaklings_price:[10,159.3742460100001,1377961.233982237],
    weaklings_base_price:10,
    weaklings_growth_rate:1.1,
    dwarves:0,
    dwarves_power:0.1,
    dwarves_price:[100,2030.3718238052725,782874967.13352],
    dwarves_base_price:100,
    humans:0,
    humans_power:1,
    humans_price:[1000,20303.718238052723,7828749671.335199],
    humans_base_price:1000,
    ogres:0,
    ogres_power:10,
    ogres_price:[10000,203037.18238052723,78287496713.35199],
    ogres_base_price:10000
  };

  tower2 = {
    name:'Tower of Mages',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    wizards:0,
    wizards_power:100,
    wizards_price:[1000000,20303718.238052722,7828749671335.2],
    wizards_base_price:1e6,
    warlocks:0,
    warlocks_power:1000,
    warlocks_price:[10000000,203037182.38052723,78287496713352],
    warlocks_base_price:1e7,
    witches:0,
    witches_power:10000,
    witches_price:[100000000,2030371823.805272,782874967133520],
    witches_base_price:1e8,
    wyverns:0,
    wyverns_power:1e5,
    wyverns_price:[1000000000,15937424601.00001,137796123398223.7],
    wyverns_base_price:1e9
  };

  tower3 = {
    name:'Tower of Machines',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    catapults:0,
    catapults_power:1e6,
    catapults_price:[100000000000,2030371823805.2722,782874967133520000],
    catapults_base_price:1e11,
    crossbows:0,
    crossbows_power:1e7,
    crossbows_price:[1000000000000,20303718238052.723,7828749671335200000],
    crossbows_base_price:1e12,
    cheiroballistras:0,
    cheiroballistras_power:1e8,
    cheiroballistras_price:[10000000000000,203037182380527.22,78287496713352000000],
    cheiroballistras_base_price:1e13
  };

  dragons_tower = {
    name:'Tower of Dragons',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    dragon1:0,
    dragon1_goal:5,
    dragon1_price:[1000000000000000,20303718238052724,7.8287496713352e+21],
    dragon1_base_price:1e15,
    dragon2:0,
    dragon2_goal:5,
    dragon2_price:[10000000000000000,203037182380527230,7.8287496713352e+22],
    dragon2_base_price:1e16,
    dragon3:0,
    dragon3_goal:5,
    dragon3_price:[100000000000000000,2030371823805272300,7.828749671335199e+23],
    dragon3_base_price:1e17,
    dragon4:0,
    dragon4_goal:5,
    dragon4_price:[1000000000000000000,20303718238052720000,7.8287496713352e+24],
    dragon4_base_price:1e18,
    dragon5:0,
    dragon5_goal:5,
    dragon5_price:[10000000000000000000,203037182380527260000,7.828749671335201e+25],
    dragon5_base_price:1e19,
    dragons_multiplier:1
  };

  winecellar = {
    name:'Wine Cellar',
    wine_multiplier:2,
    wine_frame:0,
    wine_frame_max:1000,
    drunk_index:0,
    drunk:[1,1,1,1,1,1,1,1],
    drinking:0,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    wineage:0,
    wineage_power:0.01,
    wineage_price:[100000,2030371.823805272,782874967133.52],
    wineage_base_price:100000,
    cupsize:0,
    cupsize_power:20,
    cupsize_price:[100000,2030371.823805272,782874967133.52],
    cupsize_base_price:100000,
    grapes:0,
    grapes_power:0.01,
    grapes_price:[1000000000000,1023000000000000,1.2676506002282294e+42],
    grapes_base_price:1000000000000,
    grapes_growth_rate:2
  };

  hog = {
    name:'Hall of Giants',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    multiplier:1,
    giants:[0,0,0,0,0,0,0,0],
    power:[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1],
    diamonds:[0,0,0,0,0,0,0,0],
    diamonds_power:[0.1,0.1,0.1,0.1,0.1,0.1,0.1,0.1],
    all_diamonds:0,
    diamonds_price:[100000000000000000000,2.0303718238052722e+21,7.8287496713352e+26],
    diamonds_base_price:1e20
  };

  graveyard = {
    name:'Graveyard',
    multiplier:1,
    multiplier_increment:5,
    counter:0,
    rate:1,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    skeletons:0,
    skeletons_power:0.01,
    skeletons_price:[10,203.0371823805272,78287496.713352],
    skeletons_base_price:10,
    spirits:0,
    spirits_power:0.1,
    spirits_price:[100,2030.3718238052725,782874967.13352],
    spirits_base_price:100,
    specters:0,
    specters_power:0.1,
    specters_price:[10000,203037.18238052723,78287496713.35199],
    specters_base_price:10000,
    succubi:0,
    succubi_power:0.2,
    succubi_price:[50000,1015185.911902636,391437483566.76],
    succubi_base_price:50000,
    artifacts:[0,0,0,0],
    artifact_pointer:0,
    artifacts_target:1e2
  };

  alchemist={
    items:0,
    growth_rate:1.5,
    price:[500,500,500],
    base_price:500,
    weaklings_multiplier:1,
    dwarves_multiplier:1,
    humans_multiplier:1,
    ogres_multiplier:1,
    hammer_multiplier:1,
    medallions_multiplier:0,
    medallions_multiplier_toggle:0,
    wizards_multiplier:1,
    warlocks_multiplier:1,
    witches_multiplier:1,
    wyverns_multiplier:1,
    catapults_multiplier:1,
    crossbows_multiplier:1,
    cheiroballistras_multiplier:1,
    counter_multiplier:1,
    wizards_strange_upgrades:[0,0,0,0],
    sel_id:0,
    sel_label:'',
    labels:[],
    html:[],
    html_button:[],
    upgrade_ids:[],
    upgrade_prices:[],
    weaklings:[],
    dwarves:[],
    humans:[],
    ogres:[],
    wizards:[],
    warlocks:[],
    witches:[],
    wyverns:[],
    catapults:[],
    crossbows:[],
    cheiroballistras:[],
    hammer:[],
    medallions:[],
    counter:[],
    rate:[]
  };

  medallions = {
    milestones:[10,50,100,150,200,250,300,350,400,450,500,750,1000],
    weaklings:[],
    dwarves:[],
    humans:[],
    ogres:[],
    wizards:[],
    warlocks:[],
    witches:[],
    wyverns:[],
    catapults:[],
    crossbows:[],
    cheiroballistras:[],
    reward:0,
    power:10,
    list:[],
    vlist:[]
  };

  //medallions
  setupMedallions();
  buildMedallionsList();

  //alchemist
  setupAlchemist();

  rateCalc();

}
function Reincarnate(){

  setupTowers();

  prestige.multiplier = prestige.all_time_mana;

  rmana_label.text(0);//updating this label, otherwise it only gets updated in the normal course of the game if the player reloads or when a new mana is mined

  //resetting messengers
  player.messenger_index=0;
  player.frame2=0;
  messenger.active=0;

  misc_settings.reincarnation_options_toggle=0;
  misc_settings.graveyard_setup=0;
  hideMenus();

}

//main loop
function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    date = Date.now();
}
function calc(dt){

  


  if(prestige.quests_flag==1){
    if(tower1.weaklings==66 && prestige.quests[0]<666){prestige.quests[0]+=0.5+dt;}
    if(tower1.dwarves==66 && prestige.quests[1]<666){prestige.quests[1]+=0.5+dt;}
    if(tower1.humans==66 && prestige.quests[2]<666){prestige.quests[2]+=0.5+dt;}
    if(tower1.ogres==66 && prestige.quests[3]<666){prestige.quests[3]+=0.5+dt;}
  }

  if(hog.all_diamonds>=72){
    
    if(graveyard.artifacts[graveyard.artifact_pointer]>=graveyard.artifacts_target){graveyard.artifacts[graveyard.artifact_pointer]=graveyard.artifacts_target;}else{graveyard.artifacts[graveyard.artifact_pointer]+=dt*graveyard.rate;}

    graveyard.counter+=dt*graveyard.rate;

  }



  tower1.counter+=dt*current_rate;
  tower1.all_reincarnation_counter+=dt*current_rate;
  prestige.all_time_counter+=dt*current_rate;

  player.frame1+=1;
  if(player.frame1>100){
    player.frame1=0;
    if(debug_nosave==0){saveGame();}
  }
  player.frame2+=1+dt;
  if(player.frame2>MESSENGER_DISTANCE*prestige.messenger_speed){
    player.frame2=0;
    messengerMachen();
  }

  winecellar.wine_frame+=1+dt;
  if(winecellar.wine_frame>( winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power) ) ){
    winecellar.wine_frame=0;
    winecellar.drunk=[1,1,1,1,1,1,1,1];//resetting drinks
    winecellar.drinking=0;
    rateCalc();
    refreshUI();
  }

  updateCounter();

}
function updateCounter(){

  storeState();

  if( player.frame1%30 ){

    let pmsg=numT(player.frame2 / (MESSENGER_DISTANCE*prestige.messenger_speed) * 100).toFixed(0);

    if(messenger.fresh_horses==1 && pmsg>=90){
      messenger.fresh_horses=0;refreshUI();
    }

    if(messenger.hammer_multiplier>1 && (player.messenger_index==1 || player.messenger_index==5) ){
      messenger.hammer_time--;
        messenger_button.html('<b>' + messenger.title + '</b><br>');
        messenger_button.append(messenger.body + '<br><br>');
        messenger_button.append('<b>Time: ' + numT(messenger.hammer_time) + '</b>');
      if(messenger.hammer_time<=0){
        messenger.hammer_multiplier=1;
        messenger.active=0;
        player.frame2=0;
        refreshUI();
      }
    }


    if(player.messenger_index==6 || player.messenger_index==2){next_messenger_label.html('<b class="darkred">Enemies</b> are on their way:<br>' + pmsg + '%' );}
    else{

      //we don't want fresh horses when enemies are attacking
      if(pmsg>=5 && pmsg<=85 && messenger.fresh_horses==0 && messenger.active==0){
        if(getRandomInt(0,prestige.fhp)==999){
          horsesMachen();
          refreshUI();
        }
      }
      
      next_messenger_label.html('Messengers are on their way:<br>' + pmsg + '%' );
    
    }

    document.title = '('+pmsg+'%) Incremental Fortress';
    all_tower_drinking_buttons.hide();

    if(winecellar.drunk[0]>1){

      weaklings_drink_button.show();

      weaklings_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_weaklings.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      
    }else{drink_weaklings.text('wine');}

    if(winecellar.drunk[1]>1){

      dwarves_drink_button.show();

      dwarves_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_dwarves.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_dwarves.text('wine');}

    if(winecellar.drunk[2]>1){

      humans_drink_button.show();

      humans_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_humans.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_humans.text('wine');}

    if(winecellar.drunk[3]>1){

      ogres_drink_button.show();

      ogres_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_ogres.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_ogres.text('wine');}

    if(winecellar.drunk[4]>1){

      wizards_drink_button.show();

      wizards_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_wizards.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_wizards.text('wine');}

    if(winecellar.drunk[5]>1){

      warlocks_drink_button.show();

      warlocks_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_warlocks.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_warlocks.text('wine');}

    if(winecellar.drunk[6]>1){

      witches_drink_button.show();

      witches_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_witches.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_witches.text('wine');}

    if(winecellar.drunk[7]>1){

      wyverns_drink_button.show();

      wyverns_drink_button.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');
      drink_wyverns.text(numT(100-(winecellar.wine_frame / (winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power)) * 100)).toFixed(0) + '%');

    }else{drink_wyverns.text('wine');}







    if(prestige.quests_flag==1){

      if(tower1.weaklings==66){
        if(prestige.quests[0]<666){quest1_label.text(Math.floor(prestige.quests[0])+'/666').css('color','var(--main_color');
        }else{quest1_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower1.dwarves==66){
        if(prestige.quests[1]<666){quest2_label.text(Math.floor(prestige.quests[1])+'/666').css('color','var(--main_color');
        }else{quest2_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower1.humans==66){
        if(prestige.quests[2]<666){quest3_label.text(Math.floor(prestige.quests[2])+'/666').css('color','var(--main_color');
        }else{quest3_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower1.ogres==66){
        if(prestige.quests[3]<666){quest4_label.text(Math.floor(prestige.quests[3])+'/666').css('color','var(--main_color');
        }else{quest4_label.text('666/666').css('color','var(--gray)');}
      }
    }

    if(hog.all_diamonds>=72){
      if(graveyard.artifacts[0]+graveyard.artifacts[1]+graveyard.artifacts[2]+graveyard.artifacts[3]>=graveyard.artifacts_target*4){
        next_target_button.prop('disabled', false);
      }else{next_target_button.prop('disabled', true);}
    }



    //alchemist upgrades for counter

    for (const [key, value] of Object.entries(strangeUpgrades.counter_milestones)) {

      if(tower1.all_reincarnation_counter>=value){

        for (let i = 0; i < alchemist.counter.length; i++) {
          
          if(alchemist.counter[i]==0 && tower1.all_reincarnation_counter>=strangeUpgrades.counter[i][0]){

            alchemist.counter[i]=1;

            alchemist.labels.push('Fm');
            alchemist.html.push('<span class="blue">Fm</span>');
            alchemist.html_button.push('<b>'+strangeUpgrades.counter[i][1]+'</b><div class="tiny">'+strangeUpgrades.counter[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
            alchemist.upgrade_ids.push(i);

            alchemist.upgrade_prices.push(alchemist.price[0]);
            alchemist.items += 1;
            alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

          }
          
        }

      }

    }

    /*if(garden.tree_state>0 && garden.tree_state<4){

      garden.tree_age=Date.now()-garden.starting_time;

      tree_button.html('<b class="small">Oak Tree</b><br>Status: <b class="green">Seedling</b><br>Age: <b class="pink">'+numT(garden.tree_age*0.001)+' sec</b><br>');

    }*/


  }//if( player.frame1%30 ){ 

  if(tower1.counter<1000){
    counter1_label.text( parseFloat(tower1.counter).toFixed(2) );
  }else{counter1_label.text(numT(tower1.counter));}

  rate1_label.text(numT(current_rate)+'/s');

  if(hog.all_diamonds>=72){
    graveyard_counter_label.text(numT(graveyard.counter));
    graveyard_rate_label.text(numT(graveyard.rate)+'/s');

    

    if(graveyard.artifact_pointer==0){ da1_block.html( 'Doomed Artifact I<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[0])+'</span>' ); }
    else if(graveyard.artifact_pointer==1){ da2_block.html( 'Doomed Artifact II<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[1])+'</span>' ); }
    else if(graveyard.artifact_pointer==2){ da3_block.html( 'Doomed Artifact III<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[2])+'</span>' ); }
    else if(graveyard.artifact_pointer==3){ da4_block.html( 'Doomed Artifact IV<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[3])+'</span>' ); }
  }

}



function buyRecalc(creature=0){

  switch(creature){
    case 0: break;
    case 1: buildWeaklingsAlchemistList(); break;
    case 2: buildDwarvesAlchemistList(); break;
    case 3: buildHumansAlchemistList(); break;
    case 4: buildOgresAlchemistList(); break;
    case 5: buildWizardsAlchemistList(); break;
    case 6: buildWarlocksAlchemistList(); break;
    case 7: buildWitchesAlchemistList(); break;
    case 8: buildWyvernsAlchemistList(); break;
    case 9: buildCatapultsAlchemistList(); break;
    case 10: buildCrossbowsAlchemistList(); break;
    case 11: buildCheiroballistrasAlchemistList(); break;
  }

  rateCalc();
  storeState();
  refreshUI();

}
function clickRecalc(){

  buildHammerAlchemistList();
  storeState();

}
function rateCalc(){

  var previous_rate=current_rate*0.01;
  var wizards_incantation=[1,1,1,1];

  if(alchemist.wizards_strange_upgrades[0]==1){wizards_incantation[0]=1+100*tower2.wizards;}
  if(alchemist.wizards_strange_upgrades[1]==1){wizards_incantation[1]=1+0.1*tower2.wizards;}
  if(alchemist.wizards_strange_upgrades[2]==1){wizards_incantation[2]=1+0.1*tower2.wizards;}
  if(alchemist.wizards_strange_upgrades[3]==1){wizards_incantation[3]=1+0.1*tower2.wizards;}

  current_rate=0.1;

  mortals_rate[0] = tower1.weaklings * tower1.weaklings_power * winecellar.drunk[0] * alchemist.weaklings_multiplier * wizards_incantation[0];
  mortals_rate[1] = tower1.dwarves * tower1.dwarves_power * winecellar.drunk[1] * dragons_tower.dragons_multiplier * alchemist.dwarves_multiplier * wizards_incantation[1];
  mortals_rate[2] = tower1.humans * tower1.humans_power * winecellar.drunk[2] * alchemist.humans_multiplier * wizards_incantation[2];
  mortals_rate[3] = tower1.ogres * tower1.ogres_power * winecellar.drunk[3] * alchemist.ogres_multiplier * wizards_incantation[3];

  current_rate += mortals_rate[0]+mortals_rate[1]+mortals_rate[2]+mortals_rate[3];


  mages_rate[0] = tower2.wizards * tower2.wizards_power * winecellar.drunk[4] * alchemist.wizards_multiplier;
  mages_rate[1] = tower2.warlocks * tower2.warlocks_power * winecellar.drunk[5] * alchemist.warlocks_multiplier;
  mages_rate[2] = tower2.witches * tower2.witches_power * winecellar.drunk[6] * alchemist.witches_multiplier;
  mages_rate[3] = tower2.wyverns * tower2.wyverns_power * winecellar.drunk[7] * alchemist.wyverns_multiplier;

  current_rate += mages_rate[0]+mages_rate[1]+mages_rate[2]+mages_rate[3];


  machines_rate[0] = tower3.catapults * tower3.catapults_power * alchemist.catapults_multiplier;
  machines_rate[1] = tower3.crossbows * tower3.crossbows_power * alchemist.crossbows_multiplier;
  machines_rate[2] = tower3.cheiroballistras * tower3.cheiroballistras_power * alchemist.cheiroballistras_multiplier;

  current_rate += machines_rate[0]+machines_rate[1]+machines_rate[2];





  if(alchemist.medallions_multiplier_toggle==1){
    current_rate *= alchemist.medallions_multiplier*medallions.vlist.length;
  }

  current_rate *= alchemist.counter_multiplier;//fortress multiplier
  

  current_rate *= prestige.multiplier;

  current_rate *= prestige.qmultiplier;//wicked quests

  current_rate *= hog.multiplier;

  current_rate *= graveyard.multiplier;

}
function storeState(){

  nM();

  //quests

  if(prestige.quests_flag==1){
    if(prestige.quests[0]<666){quest1_button.prop('disabled', true);}else{quest1_button.prop('disabled', false);}
    if(prestige.quests[1]<666){quest2_button.prop('disabled', true);}else{quest2_button.prop('disabled', false);}
    if(prestige.quests[2]<666){quest3_button.prop('disabled', true);}else{quest3_button.prop('disabled', false);}
    if(prestige.quests[3]<666){quest4_button.prop('disabled', true);}else{quest4_button.prop('disabled', false);}
  }

  //graveyard
  if(hog.all_diamonds>=72){

    if(graveyard.counter<graveyard.skeletons_price[graveyard.buy_amount_index]){skeletons_button.prop('disabled', true);}else{skeletons_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.spirits_price[graveyard.buy_amount_index]){spirits_button.prop('disabled', true);}else{spirits_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.specters_price[graveyard.buy_amount_index]){specters_button.prop('disabled', true);}else{specters_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.succubi_price[graveyard.buy_amount_index]){succubi_button.prop('disabled', true);}else{succubi_button.prop('disabled', false);}

  }
  //diamonds
  if(dragons_tower.dragon1>=50){

    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds1_button.prop('disabled', true);}else{diamonds1_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds2_button.prop('disabled', true);}else{diamonds2_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds3_button.prop('disabled', true);}else{diamonds3_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds4_button.prop('disabled', true);}else{diamonds4_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds5_button.prop('disabled', true);}else{diamonds5_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds6_button.prop('disabled', true);}else{diamonds6_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds7_button.prop('disabled', true);}else{diamonds7_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds8_button.prop('disabled', true);}else{diamonds8_button.prop('disabled', false);}

  }

  //alchemist

  
  if(tower1.counter<alchemist.upgrade_prices[alchemist.sel_id]){
    alchemist_upgrade_button.prop('disabled', true);
  }else{
    alchemist_upgrade_button.prop('disabled', false);
  }

  /*
  if(alchemist_label_elements.length>0){
    for (let index = 0; index < alchemist.upgrade_ids.length; index++) {

      if(tower1.counter<alchemist.upgrade_prices[index]){
        alchemist_label_elements[index].prop('disabled', true);
      }else{
        alchemist_label_elements[index].prop('disabled', false);
      }
  
    }
  }*/
  
  


  //dragons_tower

  if(tower1.counter<dragons_tower.dragon1_price[dragons_tower.buy_amount_index]){dragon1_button.prop('disabled', true);}else{dragon1_button.prop('disabled', false);}
  if(tower1.counter<dragons_tower.dragon2_price[dragons_tower.buy_amount_index]){dragon2_button.prop('disabled', true);}else{dragon2_button.prop('disabled', false);}
  if(tower1.counter<dragons_tower.dragon3_price[dragons_tower.buy_amount_index]){dragon3_button.prop('disabled', true);}else{dragon3_button.prop('disabled', false);}
  if(tower1.counter<dragons_tower.dragon4_price[dragons_tower.buy_amount_index]){dragon4_button.prop('disabled', true);}else{dragon4_button.prop('disabled', false);}
  if(tower1.counter<dragons_tower.dragon5_price[dragons_tower.buy_amount_index]){dragon5_button.prop('disabled', true);}else{dragon5_button.prop('disabled', false);}

  //tower3

  if(tower1.counter<tower3.catapults_price[tower3.buy_amount_index]){catapults_button.prop('disabled', true);}else{catapults_button.prop('disabled', false);}
  if(tower1.counter<tower3.crossbows_price[tower3.buy_amount_index]){crossbows_button.prop('disabled', true);}else{crossbows_button.prop('disabled', false);}
  if(tower1.counter<tower3.cheiroballistras_price[tower3.buy_amount_index]){cheiroballistras_button.prop('disabled', true);}else{cheiroballistras_button.prop('disabled', false);}




  //tower2

  if(tower1.counter<tower2.wizards_price[tower2.buy_amount_index]){wizards_button.prop('disabled', true);}else{wizards_button.prop('disabled', false);}
  if(tower1.counter<tower2.warlocks_price[tower2.buy_amount_index]){warlocks_button.prop('disabled', true);}else{warlocks_button.prop('disabled', false);}
  if(tower1.counter<tower2.witches_price[tower2.buy_amount_index]){witches_button.prop('disabled', true);}else{witches_button.prop('disabled', false);}
  if(tower1.counter<tower2.wyverns_price[tower2.buy_amount_index]){wyverns_button.prop('disabled', true);}else{wyverns_button.prop('disabled', false);}



  //tower1

  if(tower1.counter<tower1.weaklings_price[tower1.buy_amount_index]){weaklings_button.prop('disabled', true);}else{weaklings_button.prop('disabled', false);}
  if(tower1.counter<tower1.dwarves_price[tower1.buy_amount_index]){dwarves_button.prop('disabled', true);}else{dwarves_button.prop('disabled', false);}
  if(tower1.counter<tower1.humans_price[tower1.buy_amount_index]){humans_button.prop('disabled', true);}else{humans_button.prop('disabled', false);}
  if(tower1.counter<tower1.ogres_price[tower1.buy_amount_index]){ogres_button.prop('disabled', true);}else{ogres_button.prop('disabled', false);}

  //tower0

  if(tower1.counter<tower0.ore_price[tower0.buy_amount_index]){ore_button.prop('disabled', true);}else{ore_button.prop('disabled', false);}
  if(tower1.counter<tower0.mine_price[tower0.buy_amount_index]){mine_button.prop('disabled', true);}else{mine_button.prop('disabled', false);}

  //winecellar

  if(tower1.counter<winecellar.wineage_price[winecellar.buy_amount_index]){wineage_button.prop('disabled', true);}else{wineage_button.prop('disabled', false);}
  if(tower1.counter<winecellar.cupsize_price[winecellar.buy_amount_index]){cupsize_button.prop('disabled', true);}else{cupsize_button.prop('disabled', false);}
  if(tower1.counter<winecellar.grapes_price[winecellar.buy_amount_index]){grapes_button.prop('disabled', true);}else{grapes_button.prop('disabled', false);}

}
function refreshUI(){

  //mana
  let future_multiplier=1;

  if(prestige.all_time_mana<1){
    future_multiplier=1;
    rmana_multiplier_label.hide();
    reincarnate_button.hide();
  }else{
    future_multiplier=prestige.all_time_mana;
    rmana_multiplier_label.show();
    reincarnate_button.show();
  }

  rmana_multiplier_label.html('current mana multiplier: <b class="main_color">x' + numT(prestige.multiplier) + '</b><br>mana multiplier after reset: <b class="main_color">x' + numT(future_multiplier) + '</b>' );

  if(prestige.multiplier<100){//we force the double ratio on reincarnation before you reach a 100
    if(future_multiplier-prestige.multiplier<prestige.multiplier){
      reincarnate_button.prop('disabled', true);
    }else{
      reincarnate_button.prop('disabled', false);
    }
  }else{//then it's just as soon as you reach +1 to the current one
    if(future_multiplier<=prestige.multiplier){
      reincarnate_button.prop('disabled', true);
    }else{
      reincarnate_button.prop('disabled', false);
    }
  }

  

  //reincarnation options block
  if(misc_settings.reincarnation_options_toggle==0){reincarnation_options_block.hide();}
  else{
    reincarnation_options_block.show();

    if(prestige.winecellar==1){
      reincarnation_winecellar.prop('disabled', true);
    }else{
      reincarnation_winecellar.prop('disabled', false);
    }

    if(prestige.dwarf_university_multiplier>1){
      reincarnation_dwarves.prop('disabled', true);
    }else{
      reincarnation_dwarves.prop('disabled', false);
    }

    reincarnation_messengers.text('Messengers speed: ' + prestige.messenger_speed_level + '/5');

    if(prestige.messenger_speed_level<5){
      reincarnation_messengers.prop('disabled', false);
    }else{
      reincarnation_messengers.prop('disabled', true);
    }

    if(prestige.quests_flag>0){
      reincarnation_quests.prop('disabled', true);
    }else{
      reincarnation_quests.prop('disabled', false);
    }



  }


  //rate label
  if(winecellar.drinking==0){rate1_label.css('color','var(--main_color)');}else{rate1_label.css('color','var(--green)');}



  //COURTYARD

  //alchemist

  if(medallions.vlist.length<2){
    alchemist_body.hide();
    alchemist_lock.show();
  }else{
    alchemist_body.show();
    alchemist_lock.hide();

    alchemist_upgrades.text('');
    alchemist_label_elements=[];

    if(alchemist.upgrade_ids.length>0){
      alchemist_upgrade_button.css("visibility", "visible");
      alchemist_upgrades.css("visibility", "visible");
      alchemist_upgrade_button.html(alchemist.html_button[alchemist.sel_id]);
    }else{
      //alchemist_upgrade_button.hide();
      alchemist_upgrade_button.html('<b>&nbsp;</b><div class="tiny">&nbsp;</div><span class="tiny">&nbsp;</span>').css("visibility", "hidden");
      alchemist_upgrades.html('<button class="button6_tiny">&nbsp;</button>').css("visibility", "hidden");
    }

    



    for (let index = 0; index < alchemist.upgrade_ids.length; index++) {

      if(index!=alchemist.sel_id){
        alchemist_upgrades.append('<button id="' + index + '" class="button6_tiny">' + alchemist.html[index] + '</button>');
      }else{
        alchemist_upgrades.append('<button id="' + index + '" class="button6_tiny_selected">' + alchemist.html[index] + '</button>');
      }

      alchemist_label_elements[index]=$("#"+index);
      
    }

    all_alchemist_upgrades=$(".button6_tiny");
    all_alchemist_upgrades_selected=$(".button6_tiny_selected");

    all_alchemist_upgrades_selected.click(function(){ playAudio(3); });

    all_alchemist_upgrades.click(function(){
      alchemistInspect($(this).attr('id'),$(this).text());
    });
    all_alchemist_upgrades.mouseenter(function(){
      alchemist_upgrade_button.html(alchemist.html_button[$(this).attr('id')]).removeClass('button6').addClass('button6_info');

    }).mouseleave(function(){
      alchemist_upgrade_button.html(alchemist.html_button[alchemist.sel_id]).removeClass('button6_info').addClass('button6');
      
    });




  }

  //garden
  /*
  if(prestige.all_time_counter<1e9){
    garden_block.hide()
  }else{
    garden_block.show();

  }*/



  //medallions

  if(medallions.reward>0){
    collect_medallions_button.show().html('Hiring reward<br><b>'+numT(medallions.reward)+'</b>');
  }else{
    collect_medallions_button.hide();
  }

  medallions_label.text('');

  for (const [key, value] of Object.entries(medallions.list)) {
    if(medallions.vlist[key]==2){medallions_label.append('<span class="block_achievement2">'+value+'</span>');}
    else{medallions_label.append('<span class="block_achievement1">'+value+'</span>');}
    

    if((parseInt(key)+1)%8==0){
      medallions_label.append('<br>');
    }
  }

  






  //quests
  if(prestige.quests_flag==0){quests_block.hide();}
  else{
    quests_block.show();

    if(prestige.quests_flag==1){

      quests_body.show();

      quest1_label.text(Math.floor(prestige.quests[0])+'/666').css('color','var(--gray)');
      quest2_label.text(Math.floor(prestige.quests[1])+'/666').css('color','var(--gray)');
      quest3_label.text(Math.floor(prestige.quests[2])+'/666').css('color','var(--gray)');
      quest4_label.text(Math.floor(prestige.quests[3])+'/666').css('color','var(--gray)');

      if(prestige.qclaim[0]==0){quest1_button.show();}else{quest1_button.hide();}
      if(prestige.qclaim[1]==0){quest2_button.show();}else{quest2_button.hide();}
      if(prestige.qclaim[2]==0){quest3_button.show();}else{quest3_button.hide();}
      if(prestige.qclaim[3]==0){quest4_button.show();}else{quest4_button.hide();}
  
      quests_multiplier_label.text('Wicked Multiplier: x' + prestige.qmultiplier);
    }else{

      quests_body.hide();

      quests_multiplier_label.text('Wicked Multiplier: x' + prestige.qmultiplier);

    }

    

  }


    //graveyard

    if(dragons_tower.dragon1<50){
      graveyard_block.hide();
    }else{
      graveyard_block.show();
        if(hog.all_diamonds<72){
          graveyard_lock.show();
          graveyard_body.hide();
        }else{
          graveyard_lock.hide();
          graveyard_body.show();

          //when first unlocking graveyard or reloading the page, we call its own refreshUI function. All the subsequent Graveyard UI refreshes are going to be called from within the Graveyard itself
          if(misc_settings.graveyard_setup==0){
            misc_settings.graveyard_setup=1;
            refreshUIGraveyard();
          }
        
        }

      }


    //hog

    if(tower3.crossbows<100){
      hog_block.hide();
    }else{
      hog_block.show();
        if(dragons_tower.dragon1<50){
          hog_lock.show();
          hog_body.hide();
        }else{
          hog_lock.hide();
          hog_body.show();
  
  
          giant1_button.html('Giant Weaklings: '+numT(hog.giants[0])+'<br><span class="tiny">Power: +'+numT(hog.power[0]+hog.diamonds[0]*hog.diamonds_power[0])+'</span>');
          giant2_button.html('Giant Dwarves: '+numT(hog.giants[1])+'<br><span class="tiny">Power: +'+numT(hog.power[1]+hog.diamonds[1]*hog.diamonds_power[1])+'</span>');
          giant3_button.html('Giant Humans: '+numT(hog.giants[2])+'<br><span class="tiny">Power: +'+numT(hog.power[2]+hog.diamonds[2]*hog.diamonds_power[2])+'</span>');
          giant4_button.html('Giant Ogres: '+numT(hog.giants[3])+'<br><span class="tiny">Power: +'+numT(hog.power[3]+hog.diamonds[3]*hog.diamonds_power[3])+'</span>');
  
          giant5_button.html('Giant Wizards: '+numT(hog.giants[4])+'<br><span class="tiny">Power: +'+numT(hog.power[4]+hog.diamonds[4]*hog.diamonds_power[4])+'</span>');
          giant6_button.html('Giant Warlocks: '+numT(hog.giants[5])+'<br><span class="tiny">Power: +'+numT(hog.power[5]+hog.diamonds[5]*hog.diamonds_power[5])+'</span>');
          giant7_button.html('Giant Witches: '+numT(hog.giants[6])+'<br><span class="tiny">Power: +'+numT(hog.power[6]+hog.diamonds[6]*hog.diamonds_power[6])+'</span>');
          giant8_button.html('Giant Wyverns: '+numT(hog.giants[7])+'<br><span class="tiny">Power: +'+numT(hog.power[7]+hog.diamonds[7]*hog.diamonds_power[7])+'</span>');

          diamonds1_button.html('Diamonds: ' + numT(hog.diamonds[0]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds2_button.html('Diamonds: ' + numT(hog.diamonds[1]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds3_button.html('Diamonds: ' + numT(hog.diamonds[2]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds4_button.html('Diamonds: ' + numT(hog.diamonds[3]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds5_button.html('Diamonds: ' + numT(hog.diamonds[4]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds6_button.html('Diamonds: ' + numT(hog.diamonds[5]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds7_button.html('Diamonds: ' + numT(hog.diamonds[6]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
          diamonds8_button.html('Diamonds: ' + numT(hog.diamonds[7]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index]));
  
          hog_multiplier_label.html('Giant Multiplier: <b>x'+numT(hog.multiplier)+'</b>');

          if(hog.diamonds[0]>=9){diamonds1_button.hide();}else{diamonds1_button.show();}
          if(hog.diamonds[1]>=9){diamonds2_button.hide();}else{diamonds2_button.show();}
          if(hog.diamonds[2]>=9){diamonds3_button.hide();}else{diamonds3_button.show();}
          if(hog.diamonds[3]>=9){diamonds4_button.hide();}else{diamonds4_button.show();}
          if(hog.diamonds[4]>=9){diamonds5_button.hide();}else{diamonds5_button.show();}
          if(hog.diamonds[5]>=9){diamonds6_button.hide();}else{diamonds6_button.show();}
          if(hog.diamonds[6]>=9){diamonds7_button.hide();}else{diamonds7_button.show();}
          if(hog.diamonds[7]>=9){diamonds8_button.hide();}else{diamonds8_button.show();}




        }
    }





  //dragons

  if(tower2.wizards<100){
    tower4_block.hide();
  }else{
    tower4_block.show();
      if(tower3.crossbows<100){
        tower4_lock.show();
        tower4_body.hide();
      }else{
        tower4_lock.hide();
        tower4_body.show();


        dragon1_button.html('Falkor<br><span class="tiny"><i>Boosts Fire Multiplier</i><br>Level: '+numT(dragons_tower.dragon1)+'<br>Price: ' + numT(dragons_tower.dragon1_price[dragons_tower.buy_amount_index]) + '</span>');
        dragon2_button.html('Dagahra<br><span class="tiny"><i>Boosts Falkor</i><br>Level: '+numT(dragons_tower.dragon2)+'<br>Price: ' + numT(dragons_tower.dragon2_price[dragons_tower.buy_amount_index]) + '</span>');
        dragon3_button.html('Eborsisk<br><span class="tiny"><i>Boosts Dagahra</i><br>Level: '+numT(dragons_tower.dragon3)+'<br>Price: ' + numT(dragons_tower.dragon3_price[dragons_tower.buy_amount_index]) + '</span>');
        dragon4_button.html('Smaug<br><span class="tiny"><i>Boosts Eborsisk</i><br>Level: '+numT(dragons_tower.dragon4)+'<br>Price: ' + numT(dragons_tower.dragon4_price[dragons_tower.buy_amount_index]) + '</span>');
        dragon5_button.html('Katla<br><span class="tiny"><i>Boosts Smaug</i><br>Level: '+numT(dragons_tower.dragon5)+'<br>Price: ' + numT(dragons_tower.dragon5_price[dragons_tower.buy_amount_index]) + '</span>');

        fire_multiplier_label.html('Fire Multiplier: <b>x'+numT(dragons_tower.dragons_multiplier)+'</b>');
      }
  }









  //wine cellar


  if(tower1.weaklings<5){
    winecellar_body.hide();
    winecellar_lock.show();
  }else{
    winecellar_body.show();
    winecellar_lock.hide();
  }

  drink_weaklings.css('background-color','var(--main_background)');
  drink_dwarves.css('background-color','var(--main_background)');
  drink_humans.css('background-color','var(--main_background)');
  drink_ogres.css('background-color','var(--main_background)');
  drink_wizards.css('background-color','var(--main_background)');
  drink_warlocks.css('background-color','var(--main_background)');
  drink_witches.css('background-color','var(--main_background)');
  drink_wyverns.css('background-color','var(--main_background)');

  if(winecellar.drunk[0]>1){drink_weaklings.css('background-color','var(--gray)');}
  if(winecellar.drunk[1]>1){drink_dwarves.css('background-color','var(--gray)');}
  if(winecellar.drunk[2]>1){drink_humans.css('background-color','var(--gray)');}
  if(winecellar.drunk[3]>1){drink_ogres.css('background-color','var(--gray)');}

  if(winecellar.drunk[4]>1){drink_wizards.css('background-color','var(--gray)');}
  if(winecellar.drunk[5]>1){drink_warlocks.css('background-color','var(--gray)');}
  if(winecellar.drunk[6]>1){drink_witches.css('background-color','var(--gray)');}
  if(winecellar.drunk[7]>1){drink_wyverns.css('background-color','var(--gray)');}

  wineage_button.html( 'Wine Age' +  '<br><span class="tiny"><i>Boosts drunken multiplier</i><br>Power: ' + numT((winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power)) + '<br>Price: ' + numT(winecellar.wineage_price[winecellar.buy_amount_index]) + '</span>' );

  cupsize_button.html( 'Cup Size' + '<br><span class="tiny"><i>Boosts drinking time</i><br>Size: ' + numT(winecellar.cupsize) + '<br>Price: ' + numT(winecellar.cupsize_price[winecellar.buy_amount_index]) + '</span>' );

  grapes_button.html( 'Grapes' +  '<br><span class="tiny"><i>Boosts wine age</i><br>Power: ' + numT(winecellar.grapes_power) + '<br>Price: ' + numT(winecellar.grapes_price[winecellar.buy_amount_index]) + '</span>' );

  drunken_multiplier_label.text( 'Drunken Multiplier: x' + numT( (winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))) ));



  


  //messenger
  if(messenger.active==0){
    messenger_button.hide();
    next_messenger_label.show();

  }else{
    messenger_button.show();
    next_messenger_label.hide();
    

    messenger_button.html('<b>' + messenger.title + '</b><br>');
    messenger_button.append(messenger.body + '<br><br>');

    if(player.messenger_index==3 || player.messenger_index==7){
      messenger_button.css('background-color','var(--darkred)');
      messenger_button.append('<b class="main_background">Enemy HP: ' + numT(messenger.cost) + '</b><br><br><b>Loot: ' + numT(messenger.reward) + '</b>');
    }else if(player.messenger_index==1 || player.messenger_index==5){
      messenger_button.css('background-color','var(--main_background)');
      messenger_button.append('<b>Time: ' + numT(messenger.hammer_time) + '</b>');
    }else{
      messenger_button.css('background-color','var(--gray)');
      messenger_button.append('<b>Collect: ' + numT(messenger.reward) + '</b>');
    }

  }

  if(messenger.fresh_horses==0){messenger_bonus_button.hide();
  }else{messenger_bonus_button.show();}









  //tower 3

  //tower3_name_label.text(tower3.name);

  catapults_button.html( 'Catapults: ' + numT(tower3.catapults) + '<br><span class="tiny">Power: +' + numT(machines_rate[0]) + '/s<br>Price: ' + numT(tower3.catapults_price[tower3.buy_amount_index]) + '</span>' );

  crossbows_button.html( 'Crossbows: ' + numT(tower3.crossbows) + '<br><span class="tiny">Power: +' + numT(machines_rate[1]) + '/s<br>Price: ' + numT(tower3.crossbows_price[tower3.buy_amount_index]) + '</span>' );

  cheiroballistras_button.html( 'Cheiroballistras: ' + numT(tower3.cheiroballistras) + '<br><span class="tiny">Power: +' + numT(machines_rate[2]) + '/s<br>Price: ' + numT(tower3.cheiroballistras_price[tower3.buy_amount_index]) + '</span>' );



  //tower2

  //tower2_name_label.text(tower2.name);

  if(tower1.weaklings<100){
    tower2_lock.show();
    tower2_body.hide();
    winecellar_mages_block.hide();
      //tower3_block.hide();
      tower3_block.css("visibility", "hidden");
  }else{
    tower2_lock.hide();
    tower2_body.show();
    winecellar_mages_block.show();
      //tower3_block.show();
      tower3_block.css("visibility", "visible");
      if(tower2.wizards<100){
        tower3_lock.show();
        tower3_body.hide();
      }else{
        tower3_lock.hide();
        tower3_body.show();
      }

    wizards_button.html( 'Wizards: ' + numT(tower2.wizards) + '<br><span class="tiny">Power: +' + numT(mages_rate[0]) + '/s<br>Price: ' + numT(tower2.wizards_price[tower2.buy_amount_index]) + '</span>' );

    warlocks_button.html( 'Warlocks: ' + numT(tower2.warlocks) + '<br><span class="tiny">Power: +' + numT(mages_rate[1]) + '/s<br>Price: ' + numT(tower2.warlocks_price[tower2.buy_amount_index]) + '</span>' );

    witches_button.html( 'Witches: ' + numT(tower2.witches) + '<br><span class="tiny">Power: +' + numT(mages_rate[2]) + '/s<br>Price: ' + numT(tower2.witches_price[tower2.buy_amount_index]) + '</span>' );

    wyverns_button.html( 'Wyverns: ' + numT(tower2.wyverns) + '<br><span class="tiny">Power: +' + numT(mages_rate[3]) + '/s<br>Price: ' + numT(tower2.wyverns_price[tower2.buy_amount_index]) + '</span>' );

  }

  //tower1

  //tower1_name_label.text(tower1.name);

  weaklings_button.html( 'Weaklings: ' + numT(tower1.weaklings) + '<br><span class="tiny">Power: +' + numT(mortals_rate[0]) + '/s<br>Price: ' + numT(tower1.weaklings_price[tower1.buy_amount_index]) + '</span>' );

  dwarves_button.html( 'Dwarves: ' + numT(tower1.dwarves) + '<br><span class="tiny">Power: +' + numT (mortals_rate[1]) + '/s<br>Price: ' + numT(tower1.dwarves_price[tower1.buy_amount_index]) + '</span>' );

  humans_button.html( 'Humans: ' + numT(tower1.humans) + '<br><span class="tiny">Power: +' + numT(mortals_rate[2]) + '/s<br>Price: ' + numT(tower1.humans_price[tower1.buy_amount_index]) + '</span>' );

  ogres_button.html( 'Ogres: ' + numT(tower1.ogres) + '<br><span class="tiny">Power: +' + numT(mortals_rate[3]) + '/s<br>Price: ' + numT(tower1.ogres_price[tower1.buy_amount_index]) + '</span>' );


  //tower 0

  hammer_button.html('Hammer<br><span class="tiny">Power: +' + numT((tower0.hammer_power + (tower0.ore* (tower0.ore_power+tower0.mine*tower0.mine_power) )) * alchemist.hammer_multiplier * messenger.hammer_multiplier) + '</span>');

  ore_button.html('Ore: '+ numT(tower0.ore) +'<br><span class="tiny"><i>Boosts hammer</i><br>Power: +' + numT(tower0.ore*(tower0.ore_power+tower0.mine*tower0.mine_power)) + '<br>Price: '+numT(tower0.ore_price[tower0.buy_amount_index])+'</span>');

  mine_button.html('Ore Mines: '+ numT(tower0.mine) +'<br><span class="tiny"><i>Boosts ore</i><br>Power: +' + numT(tower0.mine*tower0.mine_power) + '<br>Price: '+numT(tower0.mine_price[tower0.buy_amount_index])+'</span>');




  //buy_amount_index
  tower0_bai.css('background-color','var(--main_background)');
  tower1_bai.css('background-color','var(--main_background)');
  tower2_bai.css('background-color','var(--main_background)');
  tower3_bai.css('background-color','var(--main_background)');
  tower4_bai.css('background-color','var(--main_background)');
  winecellar_bai.css('background-color','var(--main_background)');
  


  if(tower0.buy_amount_index==0){tower0_buy1.css('background-color','var(--gray)');}
  if(tower0.buy_amount_index==1){tower0_buy10.css('background-color','var(--gray)');}
  if(tower0.buy_amount_index==2){tower0_buy100.css('background-color','var(--gray)');}

  if(tower1.buy_amount_index==0){tower1_buy1.css('background-color','var(--gray)');}
  if(tower1.buy_amount_index==1){tower1_buy10.css('background-color','var(--gray)');}
  if(tower1.buy_amount_index==2){tower1_buy100.css('background-color','var(--gray)');}

  if(tower2.buy_amount_index==0){tower2_buy1.css('background-color','var(--gray)');}
  if(tower2.buy_amount_index==1){tower2_buy10.css('background-color','var(--gray)');}
  if(tower2.buy_amount_index==2){tower2_buy100.css('background-color','var(--gray)');}

  if(tower3.buy_amount_index==0){tower3_buy1.css('background-color','var(--gray)');}
  if(tower3.buy_amount_index==1){tower3_buy10.css('background-color','var(--gray)');}
  if(tower3.buy_amount_index==2){tower3_buy100.css('background-color','var(--gray)');}

  if(dragons_tower.buy_amount_index==0){tower4_buy1.css('background-color','var(--gray)');}
  if(dragons_tower.buy_amount_index==1){tower4_buy10.css('background-color','var(--gray)');}
  if(dragons_tower.buy_amount_index==2){tower4_buy100.css('background-color','var(--gray)');}

  if(winecellar.buy_amount_index==0){winecellar_buy1.css('background-color','var(--gray)');}
  if(winecellar.buy_amount_index==1){winecellar_buy10.css('background-color','var(--gray)');}
  if(winecellar.buy_amount_index==2){winecellar_buy100.css('background-color','var(--gray)');}





  //notifications

  if(notifications.winecellar_unlocked==1){
    courtyard_info_button.show().html('<b class="green">Wine cellar unlocked!</b><div>Scroll down and get your people a drink!</div><br><button class="button2">Close</button>');
  }else{
    courtyard_info_button.hide();
  }




  //footer.......................................

  //guide
  if(misc_settings.guide_toggle>0){
    guide_block.show();
      if(misc_settings.guide_page==''){
        guide_page.html('<i>Pick a topic...</i><br><br>');
      }else{
        getGuidePage();
      }
    
  }else{
    guide_block.hide();
    
  }


  //settings

  if(misc_settings.settings_toggle==1){
    settings_block.show();
  }else{
    settings_block.hide();
  }

  if(settings.audio_mute==1){
    button_audio.text("Turn it back on");
  }else{
    button_audio.text("Turn it off");
  }

  audio_control_volume.val(settings.audio_volume);


}







function setupMedallions(){

  for (const [key, value] of Object.entries(medallions.milestones)) {

    medallions.weaklings[key]=0;
    medallions.dwarves[key]=0;
    medallions.humans[key]=0;
    medallions.ogres[key]=0;
    medallions.wizards[key]=0;
    medallions.warlocks[key]=0;
    medallions.witches[key]=0;
    medallions.wyverns[key]=0;
    medallions.catapults[key]=0;
    medallions.crossbows[key]=0;
    medallions.cheiroballistras[key]=0;


  }

}
function buildMedallionsList(){

  medallions.list=[];
  medallions.vlist=[];
  medallions.reward=0;

  var medallions_multiplier=1;

  for (const [key, value] of Object.entries(medallions.milestones)) {

    
    if(medallions.milestones[key]<100){
      medallions_multiplier=medallions.milestones[key];
    }else{
      medallions_multiplier=50;
    }





    if(tower1.weaklings>=value){

      if(medallions.weaklings[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.weaklings[key]==0){medallions.weaklings[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' weaklings');
      medallions.vlist.push(medallions.weaklings[key]);
    }

    if(tower1.dwarves>=value){

      if(medallions.dwarves[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.dwarves[key]==0){medallions.dwarves[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' dwarves');
      medallions.vlist.push(medallions.dwarves[key]);
    }

    if(tower1.humans>=value){

      if(medallions.humans[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.humans[key]==0){medallions.humans[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' humans');
      medallions.vlist.push(medallions.humans[key]);
    }

    if(tower1.ogres>=value){

      if(medallions.ogres[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.ogres[key]==0){medallions.ogres[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' ogres');
      medallions.vlist.push(medallions.ogres[key]);
    }

    if(tower2.wizards>=value){

      if(medallions.wizards[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.wizards[key]==0){medallions.wizards[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' wizards');
      medallions.vlist.push(medallions.wizards[key]);
    }

    if(tower2.warlocks>=value){

      if(medallions.warlocks[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.warlocks[key]==0){medallions.warlocks[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' warlocks');
      medallions.vlist.push(medallions.warlocks[key]);
    }

    if(tower2.witches>=value){

      if(medallions.witches[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.witches[key]==0){medallions.witches[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' witches');
      medallions.vlist.push(medallions.witches[key]);
    }

    if(tower2.wyverns>=value){

      if(medallions.wyverns[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.wyverns[key]==0){medallions.wyverns[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' wyverns');
      medallions.vlist.push(medallions.wyverns[key]);
    }

    if(tower3.catapults>=value){

      if(medallions.catapults[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.catapults[key]==0){medallions.catapults[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' catapults');
      medallions.vlist.push(medallions.catapults[key]);
    }

    if(tower3.crossbows>=value){

      if(medallions.crossbows[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.crossbows[key]==0){medallions.crossbows[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' crossbows');
      medallions.vlist.push(medallions.crossbows[key]);
    }

    if(tower3.cheiroballistras>=value){

      if(medallions.cheiroballistras[key]<2){medallions.reward+=current_rate*medallions.power*medallions_multiplier;}

      if(medallions.cheiroballistras[key]==0){medallions.cheiroballistras[key]=1;}
      
      medallions.list.push(medallions.milestones[key]+' ballistras');
      medallions.vlist.push(medallions.cheiroballistras[key]);
    }

  }




  //alchemist upgrades for medallions

  for (const [key, value] of Object.entries(strangeUpgrades.medallions_milestones)) {

    if(medallions.vlist.length>=value){

      for (let i = 0; i < alchemist.medallions.length; i++) {
        
        if(alchemist.medallions[i]==0 && medallions.vlist.length>=strangeUpgrades.medallions[i][0]){

          alchemist.medallions[i]=1;

          alchemist.labels.push('M');
          alchemist.html.push('<span class="yellow">M</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.medallions[i][1]+'</b><div class="tiny">'+strangeUpgrades.medallions[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }

  }


}
function setupAlchemist(){

  for(let i=0;i<strangeUpgrades.weaklings.length;i++) {alchemist.weaklings[i]=0;}
  for(let i=0;i<strangeUpgrades.dwarves.length;i++) {alchemist.dwarves[i]=0;}
  for(let i=0;i<strangeUpgrades.humans.length;i++) {alchemist.humans[i]=0;}
  for(let i=0;i<strangeUpgrades.ogres.length;i++) {alchemist.ogres[i]=0;}

  for(let i=0;i<strangeUpgrades.wizards.length;i++) {alchemist.wizards[i]=0;}
  for(let i=0;i<strangeUpgrades.warlocks.length;i++) {alchemist.warlocks[i]=0;}
  for(let i=0;i<strangeUpgrades.witches.length;i++) {alchemist.witches[i]=0;}
  for(let i=0;i<strangeUpgrades.wyverns.length;i++) {alchemist.wyverns[i]=0;}

  for(let i=0;i<strangeUpgrades.catapults.length;i++) {alchemist.catapults[i]=0;}
  for(let i=0;i<strangeUpgrades.crossbows.length;i++) {alchemist.crossbows[i]=0;}
  for(let i=0;i<strangeUpgrades.cheiroballistras.length;i++) {alchemist.cheiroballistras[i]=0;}

  for(let i=0;i<strangeUpgrades.hammer.length;i++) {alchemist.hammer[i]=0;}
  for(let i=0;i<strangeUpgrades.medallions.length;i++) {alchemist.medallions[i]=0;}
  for(let i=0;i<strangeUpgrades.counter.length;i++) {alchemist.counter[i]=0;}

}

function buildWeaklingsAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower1.weaklings>=value){

      for (let i = 0; i < alchemist.weaklings.length; i++) {
        
        if(alchemist.weaklings[i]==0 && tower1.weaklings>=strangeUpgrades.weaklings[i][0]){

          alchemist.weaklings[i]=1;

          alchemist.labels.push('W');
          alchemist.html.push('<span class="green">W</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.weaklings[i][1]+'</b><div class="tiny">'+strangeUpgrades.weaklings[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);
            

        }
        
      }

    }
  }

}
function buildDwarvesAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower1.dwarves>=value){

      for (let i = 0; i < alchemist.dwarves.length; i++) {
        
        if(alchemist.dwarves[i]==0 && tower1.dwarves>=strangeUpgrades.dwarves[i][0]){

          alchemist.dwarves[i]=1;

          alchemist.labels.push('D');
          alchemist.html.push('<span class="purple">D</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.dwarves[i][1]+'</b><div class="tiny">'+strangeUpgrades.dwarves[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildHumansAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower1.humans>=value){

      for (let i = 0; i < alchemist.humans.length; i++) {
        
        if(alchemist.humans[i]==0 && tower1.humans>=strangeUpgrades.humans[i][0]){

          alchemist.humans[i]=1;

          alchemist.labels.push('H');
          alchemist.html.push('<span class="orange">H</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.humans[i][1]+'</b><div class="tiny">'+strangeUpgrades.humans[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildOgresAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower1.ogres>=value){

      for (let i = 0; i < alchemist.ogres.length; i++) {
        
        if(alchemist.ogres[i]==0 && tower1.ogres>=strangeUpgrades.ogres[i][0]){

          alchemist.ogres[i]=1;

          alchemist.labels.push('Og');
          alchemist.html.push('<span class="main_color">Og</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.ogres[i][1]+'</b><div class="tiny">'+strangeUpgrades.ogres[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}

function buildWizardsAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower2.wizards>=value){

      for (let i = 0; i < alchemist.wizards.length; i++) {
        
        if(alchemist.wizards[i]==0 && tower2.wizards>=strangeUpgrades.wizards[i][0]){

          alchemist.wizards[i]=1;

          alchemist.labels.push('Wz');

          if(inArray(strangeUpgrades.wizards[i][0],strangeUpgrades.wizard_milestones)){
            alchemist.html.push('<span class="pink">Wz</span>');
          }else{
            alchemist.html.push('<span class="purple">Wz</span>');
          }

          
          alchemist.html_button.push('<b>'+strangeUpgrades.wizards[i][1]+'</b><div class="tiny">'+strangeUpgrades.wizards[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }



}
function buildWarlocksAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower2.warlocks>=value){

      for (let i = 0; i < alchemist.warlocks.length; i++) {
        
        if(alchemist.warlocks[i]==0 && tower2.warlocks>=strangeUpgrades.warlocks[i][0]){

          alchemist.warlocks[i]=1;

          alchemist.labels.push('Wr');
          alchemist.html.push('<span class="green">Wr</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.warlocks[i][1]+'</b><div class="tiny">'+strangeUpgrades.warlocks[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildWitchesAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower2.witches>=value){

      for (let i = 0; i < alchemist.witches.length; i++) {
        
        if(alchemist.witches[i]==0 && tower2.witches>=strangeUpgrades.witches[i][0]){

          alchemist.witches[i]=1;

          alchemist.labels.push('Wi');
          alchemist.html.push('<span class="orange">Wi</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.witches[i][1]+'</b><div class="tiny">'+strangeUpgrades.witches[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildWyvernsAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower2.wyverns>=value){

      for (let i = 0; i < alchemist.wyverns.length; i++) {
        
        if(alchemist.wyverns[i]==0 && tower2.wyverns>=strangeUpgrades.wyverns[i][0]){

          alchemist.wyverns[i]=1;

          alchemist.labels.push('Wy');
          alchemist.html.push('<span class="darkred">Wy</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.wyverns[i][1]+'</b><div class="tiny">'+strangeUpgrades.wyverns[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}

function buildCatapultsAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower3.catapults>=value){

      for (let i = 0; i < alchemist.catapults.length; i++) {
        
        if(alchemist.catapults[i]==0 && tower3.catapults>=strangeUpgrades.catapults[i][0]){

          alchemist.catapults[i]=1;

          alchemist.labels.push('Ca');
          alchemist.html.push('<span class="green">Ca</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.catapults[i][1]+'</b><div class="tiny">'+strangeUpgrades.catapults[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildCrossbowsAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower3.crossbows>=value){

      for (let i = 0; i < alchemist.crossbows.length; i++) {
        
        if(alchemist.crossbows[i]==0 && tower3.crossbows>=strangeUpgrades.crossbows[i][0]){

          alchemist.crossbows[i]=1;

          alchemist.labels.push('Cr');
          alchemist.html.push('<span class="orange">Cr</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.crossbows[i][1]+'</b><div class="tiny">'+strangeUpgrades.crossbows[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}
function buildCheiroballistrasAlchemistList(){

  for (const [key, value] of Object.entries(strangeUpgrades.milestones)) {
    if(tower3.cheiroballistras>=value){

      for (let i = 0; i < alchemist.cheiroballistras.length; i++) {
        
        if(alchemist.cheiroballistras[i]==0 && tower3.cheiroballistras>=strangeUpgrades.cheiroballistras[i][0]){

          alchemist.cheiroballistras[i]=1;

          alchemist.labels.push('Ch');
          alchemist.html.push('<span class="darkred">Ch</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.cheiroballistras[i][1]+'</b><div class="tiny">'+strangeUpgrades.cheiroballistras[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

        }
        
      }

    }
  }

}

function buildHammerAlchemistList(){

  var check1=getRandomInt(10000,99999);
  var check2=check1;


  for (const [key, value] of Object.entries(strangeUpgrades.hammer_milestones)) {

    if(tower0.clicks>=value){

      for (let i = 0; i < alchemist.hammer.length; i++) {
        
        if(alchemist.hammer[i]==0 && tower0.clicks>=strangeUpgrades.hammer[i][0]){

          alchemist.hammer[i]=1;

          alchemist.labels.push('Hr');
          alchemist.html.push('<span class="darkred">Hr</span>');
          alchemist.html_button.push('<b>'+strangeUpgrades.hammer[i][1]+'</b><div class="tiny">'+strangeUpgrades.hammer[i][2]+'</div><span class="tiny">Price: <b>'+numT(alchemist.price[0])+'</b><span>');
          alchemist.upgrade_ids.push(i);

          alchemist.upgrade_prices.push(alchemist.price[0]);
          alchemist.items += 1;
          alchemist.price=getPrices(alchemist.base_price,alchemist.growth_rate,alchemist.items);

          check2=getRandomInt(10000,99999);

        }
        
      }

    }

    if(check1!=check2){refreshUI();}

  }



}



function alchemistInspect(id,label){

  playAudio(3);

  alchemist.sel_id=id;
  alchemist.sel_label=label;

  alchemist_upgrade_button.html(alchemist.html_button[alchemist.sel_id]).removeClass('button6_info').addClass('button6');

  if(tower1.counter<alchemist.upgrade_prices[alchemist.sel_id]){
    alchemist_upgrade_button.prop('disabled', true);
  }else{
    alchemist_upgrade_button.prop('disabled', false);
  }

  refreshUI();

}
function alchemistButtonCheck(id){
  if(tower1.counter<alchemist.upgrade_prices[id]){
    alchemist_upgrade_button.prop('disabled', true);
  }else{
    alchemist_upgrade_button.prop('disabled', false);
  }
}
function alchemistUpgrade(){

  var upgrade_type=0;
  var upgrade_id=alchemist.upgrade_ids[alchemist.sel_id];

    playAudio(1);

    switch(alchemist.labels[alchemist.sel_id]){
      case 'W':
        upgrade_type=1;break;
      case 'D':
        upgrade_type=2;break;
      case 'H':
        upgrade_type=3;break;
      case 'Og':
        upgrade_type=4;break;
      case 'Wz':
        upgrade_type=5;break;
      case 'Wr':
        upgrade_type=6;break;
      case 'Wi':
        upgrade_type=7;break;
      case 'Wy':
        upgrade_type=8;break;
      case 'Hr':
        upgrade_type=9;break;
      case 'M':
        upgrade_type=10;break;
      case 'Fm':
        upgrade_type=11;break;
      case 'Ca':
        upgrade_type=12;break;
      case 'Cr':
        upgrade_type=13;break;
      case 'Ch':
        upgrade_type=14;break;
    }



    
    if(upgrade_type==1){

      //whatever upgrade it is, we set it to "applied"
      alchemist.weaklings[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.weaklings_multiplier*=2;
          
          break;
        
      }

    }

    
    if(upgrade_type==2){

      alchemist.dwarves[upgrade_id]=2;
      

      //effect
      switch(upgrade_id){

        default:
          alchemist.dwarves_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==3){

      alchemist.humans[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.humans_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==4){

      alchemist.ogres[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.ogres_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==5){

      alchemist.wizards[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        case 8:
          alchemist.wizards_strange_upgrades[0]=1;
          break;

        case 9:
          alchemist.wizards_strange_upgrades[1]=1;
          break;

        case 10:
          alchemist.wizards_strange_upgrades[2]=1;
          break;

        case 11:
          alchemist.wizards_strange_upgrades[3]=1;
          break;

        default:
          alchemist.wizards_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==6){

      alchemist.warlocks[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.warlocks_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==7){

      alchemist.witches[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.witches_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==8){

      alchemist.wyverns[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.wyverns_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==9){

      alchemist.hammer[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.hammer_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==10){

      alchemist.medallions[upgrade_id]=2;

      alchemist.medallions_multiplier_toggle=1;

      //effect
      switch(upgrade_id){

        default:
          alchemist.medallions_multiplier+=0.2;
          
          break;
        
      }

    }


    if(upgrade_type==11){

      alchemist.counter[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        case 0:
        case 1:
        case 2:
        case 3:
          alchemist.counter_multiplier+=0.01;
          break;
        case 4:
        case 5:
        case 6:
        case 7:
          alchemist.counter_multiplier+=0.02;
          break;
        case 8:
        case 9:
        case 10:
        case 11:
          alchemist.counter_multiplier+=0.03;
          break;
        case 12:
        case 13:
        case 14:
        case 15:
          alchemist.counter_multiplier+=0.04;
          break;
        case 16:
        case 17:
        case 18:
        case 19:
          alchemist.counter_multiplier+=0.05;
          break;
        
      }

    }


    if(upgrade_type==12){

      alchemist.catapults[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.catapults_multiplier*=2;
          
          break;
        
      }

    }


    if(upgrade_type==13){

      alchemist.crossbows[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.crossbows_multiplier*=2;
          
          break;
        
      }


    }

    if(upgrade_type==14){

      alchemist.cheiroballistras[upgrade_id]=2;

      //effect
      switch(upgrade_id){

        default:
          alchemist.cheiroballistras_multiplier*=2;
          
          break;
        
      }

    }




    tower1.counter -= alchemist.upgrade_prices[alchemist.sel_id];


    //removing the purchased upgrade from the relevant arrays
    alchemist.upgrade_ids.splice(alchemist.sel_id, 1);
    alchemist.labels.splice(alchemist.sel_id, 1);
    alchemist.html.splice(alchemist.sel_id, 1);
    alchemist.html_button.splice(alchemist.sel_id, 1);
    alchemist.upgrade_prices.splice(alchemist.sel_id, 1);

    alchemist.sel_id=0;
    alchemist.sel_label='';
    //alchemistButtonCheck(alchemist.sel_id);


    

    buyRecalc();


}


function messengerMachen(){

  if(messenger.active==1){return;}

  playAudio(1);

  var title;
  var body;
  var ch;

  messenger.active=1;
  messenger.fresh_horses=0;//resetting fresh horses, just in case

  player.messenger_index++;

  //console.log(player.messenger_index);

  switch (player.messenger_index) {
    case 0:
    case 4:

      title='A small gift';
      body=['You received a gift from a neighboring country','Small donation from a local monastery','Package from a wealthy relative','A long forgotten debt has been repaid','Payment for providing security services to a local merchant'];
      ch=getRandomInt(0,body.length-1);

      messenger.title=title;
      messenger.body=body[ch];
      messenger.reward=current_rate*100;
      messenger.cost=0;
      
      break;
    
    case 1:

      messenger.hammer_multiplier=100 * prestige.dwarf_university_multiplier;
      messenger.hammer_time=100;

      title=['Dwarf Scholar'];
      body=['Hammer is <b class="darkred">x'+messenger.hammer_multiplier+'</b> times more powerful!'];

      messenger.title=title[0];
      messenger.body=body[0];

      break;

    case 5:

      messenger.hammer_multiplier=10 * prestige.dwarf_university_multiplier;
      messenger.hammer_time=500;

      title=['Dwarf Instructor'];
      body=['Hammer is <b class="blue">x'+messenger.hammer_multiplier+'</b> times more powerful!'];

      messenger.title=title[0];
      messenger.body=body[0];

      break;
    
    case 2:
    case 6:

      title=['Taxes collected!','Your other uncle has died','Spoils of war!','Gift from the King'];
      body=['Tax collectors had done a good job','Inheritance is significant','One of your generals conquered a neighboring region','You are generously thanked for your service'];
      ch=getRandomInt(0,body.length-1);

      messenger.title=title[ch];
      messenger.body=body[ch];
      messenger.reward=current_rate*1000;
      messenger.cost=0;
      
      break;
    
    case 3:

      title=['We are under attack!'];
      body=['A '+ choose(['small regiment','small group','humble squad','pair','local company']) +' of '+choose(['unsavory giants','treacherous humans','dishonorable wizards','inglorious ogres','duplicitous dwarves','smelly wyverns','deceitful witches'])+' is attacking one of our towers!'];
      //ch=getRandomInt(0,title.length-1);

      messenger.title=title[0];
      messenger.body=body[0];
      messenger.reward=current_rate*1000;
      messenger.cost=current_rate*100;


      break;
    
    case 7:

      title=['Siege!','We are under attack!','This is war!','The fortress is besieged!'];
      body=['An army of '+choose(['unsavory giants','treacherous humans','dishonorable wizards','inglorious ogres','duplicitous dwarves','smelly wyverns','deceitful witches'])+' is charging at our gates!'];
      ch=getRandomInt(0,title.length-1);

      messenger.title=title[ch];
      messenger.body=body[0];
      messenger.reward=current_rate*10000;
      messenger.cost=current_rate*100;

      break;
  

  }

  refreshUI();

}
function horsesMachen(){

  messenger.fresh_horses=1;

}
function recalculateFireMultiplier(){

  dragons_tower.dragons_multiplier = 1 + dragons_tower.dragon1 * (10 + dragons_tower.dragon2*20 + (dragons_tower.dragon3*50 + (dragons_tower.dragon4*50 + (dragons_tower.dragon5*100) )) );

  rateCalc();

}
function recastGiants(){

  hog.giants[0]=Math.floor(tower1.weaklings/100);
  hog.giants[1]=Math.floor(tower1.dwarves/100);
  hog.giants[2]=Math.floor(tower1.humans/100);
  hog.giants[3]=Math.floor(tower1.ogres/100);

  hog.giants[4]=Math.floor(tower2.wizards/100);
  hog.giants[5]=Math.floor(tower2.warlocks/100);
  hog.giants[6]=Math.floor(tower2.witches/100);
  hog.giants[7]=Math.floor(tower2.wyverns/100);

  hog.multiplier = 1 + hog.giants[0]*(hog.power[0]+hog.diamonds[0]*hog.diamonds_power[0]);
  hog.multiplier += hog.giants[1]*(hog.power[1]+hog.diamonds[1]*hog.diamonds_power[1]);
  hog.multiplier += hog.giants[2]*(hog.power[2]+hog.diamonds[2]*hog.diamonds_power[2]);
  hog.multiplier += hog.giants[3]*(hog.power[3]+hog.diamonds[3]*hog.diamonds_power[3]);
  hog.multiplier += hog.giants[4]*(hog.power[4]+hog.diamonds[4]*hog.diamonds_power[4]);
  hog.multiplier += hog.giants[5]*(hog.power[5]+hog.diamonds[5]*hog.diamonds_power[5]);
  hog.multiplier += hog.giants[6]*(hog.power[6]+hog.diamonds[6]*hog.diamonds_power[6]);
  hog.multiplier += hog.giants[7]*(hog.power[7]+hog.diamonds[7]*hog.diamonds_power[7]);

}






function buyRecalcGraveyard(creature=0){

  switch(creature){
    case 0: break;
    //case 1: buildWeaklingsAlchemistList(); break;
  }

  rateCalcGraveyard();
  storeState();
  refreshUIGraveyard();

}
function rateCalcGraveyard(){

  graveyard.rate = 1 + graveyard.skeletons * ( graveyard.skeletons_power + (graveyard.spirits * (graveyard.spirits_power + graveyard.specters * (graveyard.specters_power + graveyard.succubi * graveyard.succubi_power) ) ) );

  graveyard.rate *= Math.floor(dragons_tower.dragon4/50);

}
function refreshUIGraveyard(){

  graveyard_multiplier_label.html('Graveyard Multiplier: <b>x' + numT(graveyard.multiplier)+'<br>&nbsp;');

  next_target_button.text('Next target: '+numT(graveyard.artifacts_target*10));

  da1_block.html( 'Doomed Artifact I<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[0])+'</span>' );
  da2_block.html( 'Doomed Artifact II<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[1])+'</span>' );
  da3_block.html( 'Doomed Artifact III<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[2])+'</span>' );
  da4_block.html( 'Doomed Artifact IV<br><span class="tiny">Target: '+numT(graveyard.artifacts_target)+'</span><br><span class="small_red">'+numT( graveyard.artifacts[3])+'</span>' );

  da1_block.css('border-color','var(--gray)');
  da2_block.css('border-color','var(--gray)');
  da3_block.css('border-color','var(--gray)');
  da4_block.css('border-color','var(--gray)');

  if(graveyard.artifact_pointer==0){da1_block.css('border-color','var(--blue)');}
  if(graveyard.artifact_pointer==1){da2_block.css('border-color','var(--blue)');}
  if(graveyard.artifact_pointer==2){da3_block.css('border-color','var(--blue)');}
  if(graveyard.artifact_pointer==3){da4_block.css('border-color','var(--blue)');}

  skeletons_button.html( 'Skeletons: ' + numT(graveyard.skeletons) + '<br><span class="tiny"><i>&nbsp;</i><br>Power: +' + numT(graveyard.skeletons_power + (graveyard.spirits * (graveyard.spirits_power + graveyard.specters * (graveyard.specters_power + graveyard.succubi * graveyard.succubi_power) ) ) ) + '/s<br>Price: ' + numT(graveyard.skeletons_price[graveyard.buy_amount_index]) + '</span>' );

  spirits_button.html( 'Spirits: ' + numT(graveyard.spirits) + '<br><span class="tiny"><i>Boosts skeletons</i><br>Power: +' + numT( graveyard.spirits_power + graveyard.specters * (graveyard.specters_power + graveyard.succubi * graveyard.succubi_power)  ) + '/s<br>Price: ' + numT(graveyard.spirits_price[graveyard.buy_amount_index]) + '</span>' );

  specters_button.html( 'Specters: ' + numT(graveyard.specters) + '<br><span class="tiny"><i>Boosts spirits</i><br>Power: +' + numT( graveyard.specters_power + graveyard.succubi * graveyard.succubi_power ) + '/s<br>Price: ' + numT(graveyard.specters_price[graveyard.buy_amount_index]) + '</span>' );

  succubi_button.html( 'Succubi: ' + numT(graveyard.succubi) + '<br><span class="tiny"><i>Boosts specters</i><br>Power: +' + numT(  graveyard.succubi_power ) + '/s<br>Price: ' + numT(graveyard.succubi_price[graveyard.buy_amount_index]) + '</span>' );






  graveyard_bai.css('background-color','var(--main_background)');

  if(graveyard.buy_amount_index==0){graveyard_buy1.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index==1){graveyard_buy10.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index==2){graveyard_buy100.css('background-color','var(--gray)');}



}





function getGuidePage(){

  var page_contents;

  switch (misc_settings.guide_page) {

    case 'Messengers':
      page_contents=guidebook.messengers;
      break;

    case 'Reincarnation':
      page_contents=guidebook.reincarnation;
      break;

    case 'Wine Cellar':
      page_contents=guidebook.winecellar;
      break;

    case 'Wicked Quests':
      page_contents=guidebook.wicked;
      break;

    case 'Fire Multiplier':
      page_contents=guidebook.fire;
      break;

    case 'Giant Multiplier':
      page_contents=guidebook.giant;
      break;

    case 'Diamonds':
      page_contents=guidebook.diamonds;
      break;

    case 'Graveyard':
      page_contents=guidebook.graveyard;
      break;

    case 'Smaug':
      page_contents=guidebook.smaug;
      break;

    case 'Medallions':
      page_contents=guidebook.medallions;
      break;

    case 'Alchemist':
      page_contents=guidebook.alchemist;
      break;

    case 'Garden':
      page_contents=guidebook.garden;
      break;





    case 'Offline mining':
      page_contents=guidebook.offline;
      break;

    case 'End of content':
      page_contents=guidebook.eoc;
      break;

    case 'Compatibility':
      page_contents=guidebook.compatibility;
      break;

    case 'Known issues':
      page_contents=guidebook.known_issues;
      break;

    case 'Future plans':
      page_contents=guidebook.future;
      break;
  
  
  }

  guide_page.html(page_contents+'<br>');



}
function hideMenus(){
  misc_settings.guide_toggle=0;
  misc_settings.settings_toggle=0;
}




function saveGame(){

  player.time=Date.now();

  let gameData = {
      universal:[player,prestige,settings,messenger,medallions,alchemist,notifications,garden],
      towers:[tower0,tower1,tower2,tower3,dragons_tower,winecellar,hog,graveyard]
    };

    gameData=LZString.compressToBase64(JSON.stringify(gameData));
    localStorage.setItem(savefile_name, gameData);
}
function loadGame(){
  let gameData=localStorage.getItem(savefile_name);
  gameData = JSON.parse(LZString.decompressFromBase64(gameData));

    player=gameData.universal[0];
    prestige=gameData.universal[1];
    settings=gameData.universal[2];
    messenger=gameData.universal[3];
    medallions=gameData.universal[4];
    alchemist=gameData.universal[5];
    notifications=gameData.universal[6];
    garden=gameData.universal[7];

    tower0=gameData.towers[0];
    tower1=gameData.towers[1];
    tower2=gameData.towers[2];
    tower3=gameData.towers[3];
    dragons_tower=gameData.towers[4];
    winecellar=gameData.towers[5];
    hog=gameData.towers[6];
    graveyard=gameData.towers[7];

    //temp fix for 0.4
    if(alchemist.base_price>500){alchemist.base_price=500;}

    //resetting the wine cellar so that the player cannot set up drinks and then have the game multiply offline progress by the Drunken Multiplier
    winecellar.drunk = [1,1,1,1,1,1,1,1];
    winecellar.drinking=0;

    buyRecalc();//recalculate rate, call storeState, etc.

    //offline progress
    if(player.time>0){
      diff = (Date.now()-player.time)*0.1;
      calc(diff/1000);
    }





}
function delSave(){
  localStorage.removeItem(savefile_name);
}


function getPrices(base_price,growth_rate,current_amount){

  let all_prices=[0,0,0];

  all_prices[0]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,1)-1) / (growth_rate-1);
  all_prices[1]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,10)-1) / (growth_rate-1);
  all_prices[2]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,100)-1) / (growth_rate-1);

  //let result=base_price*Math.pow(growth_rate,9);
  return all_prices;

}
function getPrices2(base_price,growth_rate,current_amount,desired_amount){

  return base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,desired_amount)-1) / (growth_rate-1);

}

function numT(number, decPlaces=2) {

  //numTransform

  //my optimization: it used to do abbrev.length in two places, since the length here is not variable, I cache it. Performance boost is likely to be very small, but as this is one of the most used functions in the game, I want to make sure it is ultra-optimized

  if(settings.scientific==0){

  var abbrev_length=64;

          number = Math.round(number*100)/100;//my addition: round any incoming floats first

          // 2 decimal places => 100, 3 => 1000, etc
          decPlaces = Math.pow(10,decPlaces);
          // Enumerate number abbreviations
          var abbrev = [ "k", "M", "B", "T", "Q", "kQ", "S", "kS", "c", "kc", "d", "kd", "e", "ke", "f", "kf", "F", "kF", "h", "kh", "j", "kj", "L", "kL", "Na", "kNa", "Nb", "kNb", "Nc", "kNc", "Nd", "kNd", "Ne", "kNe", "Nf", "kNf", "Ng", "kNg", "Nh", "kNh", "Ni", "kNi", "Nj", "kNj", "Nk", "kNk", "Nl", "kNl", "Nm", "kNm", "Np", "kNp", "Nq", "kNq", "Nr", "kNr", "Ns", "kNs", "Nt", "kNt", "Nu", "kNu", "Nv", "inf" ];

          // Go through the array backwards, so we do the largest first
          for (var i=abbrev_length-1; i>=0; i--) {
              // Convert array index to "1000", "1000000", etc
              var size = Math.pow(10,(i+1)*3);
              // If the number is bigger or equal do the abbreviation
              if(size <= number) {
                   // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                   // This gives us nice rounding to a particular decimal place.
                   number = Math.round(number*decPlaces/size)/decPlaces;
                   // Handle special case where we round up to the next abbreviation
                   if((number == 1000) && (i < abbrev_length - 1)) {
                       number = 1;
                       i++;
                   }
                   // Add the letter for the abbreviation
                   number += ""+abbrev[i];
                   // We are done... stop
                   break;
              }
          }

        }else{
          if(number>=1000){return Number(number).toExponential(2).replace(/\+/g, "");}
          else{number = Math.round(number*100)/100;}
        }

          return number;
}
function numT2(number){
  if(number>1000){return Number(number).toExponential(3);}
  else{number = Math.round(number*1000)/1000;}
  return number;
}


function choose(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
function inArray(value,array){

  for (let i = 0; i < array.length; i++) {
    if(value==array[i]){return true;}
  }
  return false;
}

function nM(){//mana

  if(prestige.all_time_counter>=nextManaCost){

    prestige.all_time_mana=Math.floor( Math.cbrt( prestige.all_time_counter/MANA_BASE_COST ) );//recalculating all-time mana

    let rmana=prestige.all_time_mana-prestige.spent_mana;
      if(prestige.multiplier>1){rmana_label.text(numT(rmana-prestige.multiplier));}
      else{rmana_label.text(numT(rmana));}


    let future_multiplier=1;

    if(prestige.all_time_mana<1){future_multiplier=1;}else{future_multiplier=prestige.all_time_mana;}

    rmana_multiplier_label.html('current mana multiplier: <b class="main_color">x' + numT(prestige.multiplier) + '</b><br>mana multiplier after reset: <b class="main_color">x' + numT(future_multiplier) + '</b>' );

  }
  nextManaCost=MANA_BASE_COST * Math.pow((prestige.all_time_mana+1),3);

  if(player.frame1%10==0){
    nextrmana_label.text(numT(nextManaCost - prestige.all_time_counter));
  }


}


function qAdd(num){

  tower1.counter+=num;
  prestige.all_time_counter+=num;
  tower1.all_reincarnation_counter+=num;

  storeState();
  refreshUI();

}
function qWicked(){

  prestige.qclaim=[1,1,1,1,1,1,1,1];
  prestige.qmultiplier=5;

  prestige.quests_flag=2;

  storeState();
  refreshUI();

}




function setupAudio(){

  click1 = new Howl({
    src: ['snd/tab_click.wav']
  });

  hammer = new Howl({
    src: ['snd/hammer.wav'],
    volume: 0.5
  });

  hammer2 = new Howl({
    src: ['snd/hammer2.wav'],
    volume: 0.4
  });

}
function playAudio(snd){

  if(audio_initiated==0){
    audio_initiated=1;
    setupAudio();
  }

  if(settings.audio_mute==0){
		switch(snd){
			case 1: click1.play(); break;
			case 2: hammer.rate(getRandomInt(1.5,4)); hammer.play(); break;
			case 3: hammer2.play(); break;
			}
	}
}
