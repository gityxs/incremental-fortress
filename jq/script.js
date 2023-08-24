var version = "0.5";
var savefile_name = "incremental_fortress"+version;

var debug_nosave=0;

var audio_initiated=0;
var audio={
  
};

var diff = 0;
var difftree = 0;
var date = Date.now();
var tower0 = {};
var tower1 = {};
var tower2 = {};
var tower3 = {};
var tower4 = {};
var dragons_tower = {};
var winecellar = {};
var hog = {};
var graveyard = {};
var necromancer = {};
var alchemist = {};
var medallions = {};
var raiders = {};
var champs = {};

//values preserved between prestige cycles
var player = {
  start:0,
  time:0,
  system_frame:0,
  messengers:{},
  notification:{
    active:0,
    title:'',
    body:'',
    class:'',
    left:0,
    top:0
  },
  gandlor:{
    seer:0
  },
  guide:{
    wicked:0,
    hog:0,
    fort:0,
    gc:0,
    museum:0,
    cannibals:0,
    aviary:0,
    raiders:0,
    graveyard:0
  },
  stats:{
    uncles:0,
    coins:0
  }
  
};
var prestige = {
  library:{
    unlocked:0,
    library_switch:0,
    dykt_index:0,
    tome_selected_id:8,
    tome_intro:[],
    tome_weaklings:[],
    tome_dwarves:[],
    tome_darkarts:[],
    tome_inventions:[],
    tome_timedivinations:[],
    tome_alcohol:[],
    tome_alchemy:[],
    tome_fortress:[],
    tome_dead:[]
  },
  temple:{
    unlocked:0,
    rings:[0,0,0,0,0,0,0,0,0],
    upgrades_clicked:0
  },
  items:[],
  multiplier:1,
  all_time_counter:0,
  all_time_mana:0,
  spent_mana:0,
  all_time_souls:0,
  all_time_graveyard_counter:0,
  souls_multiplier:1,
  museum_multiplier:1,
  museum_buff:[0,0,0,0,0],
  museum_waymorethanhalfwaythere:0,
  museum_complete:0,
  blessing:0,
  offline:0,
  grapes:0,
  quests_flag:0,
  quests:[0,0,0,0],
  qclaim:[0,0,0,0],
  qmultiplier:1,
  messenger_distance:1,
  messenger_alert:0,
  alchemist_buymax:0,
  alchemist_packages:{
    weaklings2:0,
    warlocks2:0,
    witches2:0,
    wyverns2:0,
    catapults2:0,
    crossbows2:0,
    cheiroballistras2:0
  },
  flask_unlocked:0,
  flask_knowledge:{
    items_to_ing:[],
    ing_to_items:[]
  },
  aviary:{
    unlocked:0,
    display:[8,19,54,41,56,63,48,58,55,7,59,67,60],
    completed:0
  },
  alchemy_lock:0,
  alchemy_persistence:0,
  alchemy_persistence_item:999,
  alchemist_purse:0,
  timeStayMultiplier:1,
  garden:{
    unlocked:0,
    tree_type:'normal',
    trees:0,
    trees_spent:0,
    fortifications:[0,0,0,0,0,0,0,0,0,0,0,0],
    fort_prices:[1,1,1,1,1,1,1,1,1,1,1,1],
    tree_age:0,
    tree_state:0
  },
  hog:0,
  graveyard:0,
  museum:0,
  necromancer_revenge:0,
  doomed_artifact_auto:0,
  gandlor:0,
  gandlor_win_max:0,
  snail_doubler:1,
  cannibals:0,
  dragons_tower:0,
  raiders_unlocked:0,
  raiders_price_mod:0,
  raiders_locations:[0],
  unlocked_locations:{
    horium:0
  },
  tarvel:1,
  fort_time_mod:0,
  items_price_mod:1,
  champs:{
    unlocked:[0,0,0,0],
    holding:[12,13,14,15]
  },
  frilmir:0,
  historian:0,
  historian_counter:0,
  dice:0
};
var settings = {
  scientific:0,
  audio_mute:0,
  audio_volume:0.5,
  audio_messenger:1,
  navigation:{
    page:'Towers',
    previous_page:''
  },
  sprites:1,
  inspect_width:0,
  dwarf_hammers_warning:1
}

//UI embellishments
var embell ={
  cup_levels:[
    
    'Tea Cup Class I','Tea Cup Class II','Tea Cup Class III','Tea Cup Class IV','Tea Cup Class V','Tea Cup Class VI','Tea Cup Class VII','Tea Cup Class VIII','Tea Cup Class IX','Tea Cup Class X',
    
    'Ale Mug Class I','Ale Mug Class II','Ale Mug Class III','Ale Mug Class IV','Ale Mug Class V','Ale Mug Class VI','Ale Mug Class VII','Ale Mug Class VIII','Ale Mug Class IX','Ale Mug Class X',
    
    'Goblet Class I','Goblet Class II','Goblet Class III','Goblet Class IV','Goblet Class V','Goblet Class VI','Goblet Class VII','Goblet Class VIII','Goblet Class IX','Goblet Class X',
    
    'Junior Tankard I','Junior Tankard II','Junior Tankard III','Junior Tankard IV','Junior Tankard V','Junior Tankard VI','Junior Tankard VII','Junior Tankard VIII','Junior Tankard IX','Junior Tankard X',
    
    'Tankard I','Tankard II','Tankard III','Tankard IV','Tankard V','Tankard VI','Tankard VII','Tankard VIII','Tankard IX','Tankard X',
    
    'Chief\'s Tankard I','Chief\'s Tankard II','Chief\'s Tankard III','Chief\'s Tankard IV','Chief\'s Tankard V','Chief\'s Tankard VI','Chief\'s Tankard VII','Chief\'s Tankard VIII','Chief\'s Tankard IX','Chief\'s Tankard X',
    
    'Ultra Tankard I','Ultra Tankard II','Ultra Tankard III','Ultra Tankard IV','Ultra Tankard V','Ultra Tankard VI','Ultra Tankard VII','Ultra Tankard VIII','Ultra Tankard IX','Ultra Tankard X',
    
    'Tankard of Gods I','Tankard of Gods II','Tankard of Gods III','Tankard of Gods IV','Tankard of Gods V','Tankard of Gods VI','Tankard of Gods VII','Tankard of Gods VIII','Tankard of Gods IX','Tankard of Gods X',
    
    'Jar Class I','Jar Class II','Jar Class III','Jar Class IV','Jar Class V','Jar Class VI','Jar Class VII','Jar Class VIII','Jar Class IX','Jar Class X',
    
    'Massive Jar I','Massive Jar II','Massive Jar III','Massive Jar IV','Massive Jar V','Massive Jar VI','Massive Jar VII','Massive Jar VIII','Massive Jar IX','Massive Jar X',
    
    'Warrior\'s Jar I','Warrior\'s Jar II','Warrior\'s Jar III','Warrior\'s Jar IV','Warrior\'s Jar V','Warrior\'s Jar VI','Warrior\'s Jar VII','Warrior\'s Jar VIII','Warrior\'s Jar IX','Warrior\'s Jar X',
    
    'Champion\'s Jar I','Champion\'s Jar II','Champion\'s Jar III','Champion\'s Jar IV','Champion\'s Jar V','Champion\'s Jar VI','Champion\'s Jar VII','Champion\'s Jar VIII','Champion\'s Jar IX','Champion\'s Jar X',
    
    'Chieftan\'s Jar I','Chieftan\'s Jar II','Chieftan\'s Jar III','Chieftan\'s Jar IV','Chieftan\'s Jar V','Chieftan\'s Jar VI','Chieftan\'s Jar VII','Chieftan\'s Jar VIII','Chieftan\'s Jar IX','Chieftan\'s Jar X',
    
    'Divine Jar I','Divine Jar II','Divine Jar III','Divine Jar IV','Divine Jar V','Divine Jar VI','Divine Jar VII','Divine Jar VIII','Divine Jar IX','Divine Jar X',
    
    'Flagon Class I','Flagon Class II','Flagon Class III','Flagon Class IV','Flagon Class V','Flagon Class VI','Flagon Class VII','Flagon Class VIII','Flagon Class IX','Flagon Class X',
    
    'Volcano Flagon I','Volcano Flagon II','Volcano Flagon III','Volcano Flagon IV','Volcano Flagon V','Volcano Flagon VI','Volcano Flagon VII','Volcano Flagon VIII','Volcano Flagon IX','Volcano Flagon X',
    
    'Junior Barrel I','Junior Barrel II','Junior Barrel III','Junior Barrel IV','Junior Barrel V','Junior Barrel VI','Junior Barrel VII','Junior Barrel VIII','Junior Barrel IX','Junior Barrel X',
    
    'Barrel I','Barrel II','Barrel III','Barrel IV','Barrel V','Barrel VI','Barrel VII','Barrel VIII','Barrel IX','Barrel X',
    
    'Serious Barrel I','Serious Barrel II','Serious Barrel III','Serious Barrel IV','Serious Barrel V','Serious Barrel VI','Serious Barrel VII','Serious Barrel VIII','Serious Barrel IX','Serious Barrel X',
    
    'Volcano Barrel I','Volcano Barrel II','Volcano Barrel III','Volcano Barrel IV','Volcano Barrel V','Volcano Barrel VI','Volcano Barrel VII','Volcano Barrel VIII','Volcano Barrel IX','Volcano Barrel X',
    
    'Jumbo Barrel I','Jumbo Barrel II','Jumbo Barrel III','Jumbo Barrel IV','Jumbo Barrel V','Jumbo Barrel VI','Jumbo Barrel VII','Jumbo Barrel VIII','Jumbo Barrel IX','Jumbo Barrel X',
    
    'Barrel of Gods I','Barrel of Gods II','Barrel of Gods III','Barrel of Gods IV','Barrel of Gods V','Barrel of Gods VI','Barrel of Gods VII','Barrel of Gods VIII','Barrel of Gods IX','Barrel of Gods X',
    
    'Tiny Tub I','Tiny Tub II','Tiny Tub III','Tiny Tub IV','Tiny Tub V','Tiny Tub VI','Tiny Tub VII','Tiny Tub VIII','Tiny Tub IX','Tiny Tub X',
    
    'Tub I','Tub II','Tub III','Tub IV','Tub V','Tub VI','Tub VII','Tub VIII','Tub IX','Tub X',
    
    'Tankard Tub I','Tankard Tub II','Tankard Tub III','Tankard Tub IV','Tankard Tub V','Tankard Tub VI','Tankard Tub VII','Tankard Tub VIII','Tankard Tub IX','Tankard Tub X',
    
    'Divine Vessel I','Divine Vessel II','Divine Vessel III','Divine Vessel IV','Divine Vessel V','Divine Vessel VI','Divine Vessel VII','Divine Vessel VIII','Divine Vessel IX','Divine Vessel X',
    
    'Drinking Ship I','Drinking Ship II','Drinking Ship III','Drinking Ship IV','Drinking Ship V','Drinking Ship VI','Drinking Ship VII','Drinking Ship VIII','Drinking Ship IX','Drinking Ship X',
    
    'Fleet of Wine I','Fleet of Wine II','Fleet of Wine III','Fleet of Wine IV','Fleet of Wine V','Fleet of Wine VI','Fleet of Wine VII','Fleet of Wine VIII','Fleet of Wine IX','Fleet of Wine X',
    
    'Lake of Wine I','Lake of Wine II','Lake of Wine III','Lake of Wine IV','Lake of Wine V','Lake of Wine VI','Lake of Wine VII','Lake of Wine VIII','Lake of Wine IX','Lake of Wine X',
    
    'Sea of Wine I','Sea of Wine II','Sea of Wine III','Sea of Wine IV','Sea of Wine V','Sea of Wine VI','Sea of Wine VII','Sea of Wine VIII','Sea of Wine IX','Sea of Wine X',
    
    'Ocean of Wine I','Ocean of Wine II','Ocean of Wine III','Ocean of Wine IV','Ocean of Wine V','Ocean of Wine VI','Ocean of Wine VII','Ocean of Wine VIII','Ocean of Wine IX','Ocean of Wine X',
    
    'Beverage Planet I','Beverage Planet II','Beverage Planet III','Beverage Planet IV','Beverage Planet V','Beverage Planet VI','Beverage Planet VII','Beverage Planet VIII','Beverage Planet IX','Beverage Planet X'
  ],

  outer_wall:[
    'Does a single stone qualify as a wall?',
    'You gotta start somewhere!',
    'Look, Frilmir! Three stones. Impressive, eh?',
    'A four stone wall is better than a three stone wall, Frilmir',
    'I can <i>literally</i> count the stones on the fingers of one hand',
    'Hey, we\'ve got the first row down!',

    'I hope they aim for our feet',
    'Great job, but I think we\'ll need a bit more',
    'Thank you for this. Now bring the rest of the wall, please',
    'I remember last week I saw some stones on the road. Was more than this',
    'I am glad we are on our way to cover our feet from arrows and boulders',
    'Hey Frilmir! We now have two full rows!',

    'Almost a skyscraper, man',
    'I am pretty sure this is enough to cover my ankles from enemy fire',
    'What worries me is that I heard their soldiers are of normal height',
    'Hey, it\'s beginning to look like a heap!',
    'I give you security - you give me wall',
    'Frilmir. They actually finished the third row!',

    'It\'s beginning to look a lot like something that one day might become a wall!',
    'My knees are finally in the shadows',
    'My ankles are safe',
    'If you count the stones individually, it\'s kinda a lot',
    'Frilmir, it\'s beginning to look like the beginning of a wall!',
    'Well what do you know, four rows!',

    'Am I more optimistic about the future? You bet!',
    'I think I\'m ready to face some archers now. Maybe!',
    'Hey, the more the better!',
    'Our request for more stones was, perhaps, heard?',
    'If you sit, Frilmir, they would only see your head',
    'Fifth row, everybody!!!',

    'I feel a bit safer now',
    'Hey, you can now reliably poop behind here and no one will see you',
    'It\'s at this point that I\'m beginning to feel I\'ve got things to lose',
    'More, more!',
    'One more!',
    'I am glad the sixth row is done. I hope it\'s not the last one!',

    'Frilmir, think of the siege engines: this wall is no sanctuary!',
    'I hope you guys realize that they throw things over walls?',
    'No, no, it\'s good. If I bend, I can hide my whole self and everything',
    'I\'d like assurances regarding stuff thrown over',
    'Make this wall thicker too!',
    'Frilmir, they finished the seventh row!',

    'I\'ll give it to ya, looks more like a wall now',
    'Yes, I like this wall. Yes, you should make it higher',
    'Heard of ballistras? They throw things over',
    'I think a skilled horseback rider can jump it over still',
    'Just one more stone to complete the row!',
    'Eighth row. So far the best one!',

    'Frilmir, did you know they have battle dragons?',
    'A dragon can shoot bolts of fire over the wall, Frilmir. Hits every guard if wall is not high enough!',
    'I mean, it\'s ok. But it could be higher, you know',
    'I want to feel safe. Keep on building',
    'Yes, I am a guard of the wall. But I need a wall to guard, kapish?',
    'Frilmir, they did it! Ninth row!',

    'The wall is too high now. I feel dominated',
    'Yes, you should make it higher... But boy do I feel small',
    'Frilmir, are you thinking what I am thinking?',
    'My imposing figure is overshadowed by this wall',
    'Did you know that: one more stone and you\'ll finish the tenth row!',
    'Tenth row. Incredible. We\'ve gone so far',

    'I thought I was big and strong. But now I am humiliated by this wall',
    'If only the wall was less imposing, eh Frilmir?',
    'My thinking is that the wall should be strong, but not challenge my manliness',
    'This wall now feels like it\'s my rival',
    'I don\'t know, Frilmir. This wall thinks it\'s taller than me',
    'Eleventh row! Impressive. Seriously impressive',

    'Fear of heights? Nah. But the wall is kinda high, yeah',
    'My problem is that I might trip. And down I\'ll go!',
    'Life of a wall guard is tough. You can fall off and stuff',
    'I wouldn\'t say I have a fear of heights. Heights frighten me, yes, but it\'s on them and they should stop!',
    'This wall is a bit too high. What if I fall off?',
    'Twelfth row! As many as a six-fingered man would have fingers',

    'We can now be seen from another country, Frilmir',
    'The greatness of this wall is only matched by the greatness of our bravery',
    'I tell everybody that this wall is higher than the moon',
    'Everyone can see us now, Frilmir',
    'We are now higher than the clouds',
    'Thirteenth row! A bit higher and even the dragons won\'t be able to reach us',

    'You know what bugs me, Frilmir? It takes forever to climb here',
    'I am going to riot, Frilmir. These stairs are taking forever now',
    'Dude, this wall is too high to climb now',
    'My shift is over, but it will take me the next day just to climb down',
    'The climb up here is so long now, we might as well just live here',
    'Fourteenth row! Enough is enough, right Frilmir?',

    'This wall is so high that if you pee they\'ll think it\'s the rain',
    'This wall is so high that if you fall off you\'ll never reach the ground',
    'This wall is so high that it\'s seeing weird things',
    'This wall is so high that if you throw a seed down, it becomes a full tree by the time it reaches the ground',
    'This wall is so high that when you look down, you can see around the planet and examine this wall from the other side',
    'Fifteenth row. Frilmir, thoughts?',

    'Frilmir, that\'s a lot of stones, eh?',
    'There are so many stones now that I forget my own name',
    'I think this wall is seriously stoned. Get it, Frilmir? Stoned!',
    'High wall - happy wall',
    'I ran out of jokes',
    'Sixteenth row. I think 16 is the best age',

    'Someone once told me that it\'s healthy to stand on top of that many stones',
    'Someone once told me that coolness is not defined by the amount of stones in the wall you guard, but it is a little bit',
    'Someone once told me that their dream profession is to be the outer wall guard. I said, "I am the outer wall guard"',
    'Someone once told me that they wake up and look at us, and if we\'re there, the world is right',
    'Someone once told me that the impressiveness of outer walls is the best predictor of the failure of a seige',
    'Row seventeen. Beyond impressive, Frilmir',

    'How come we never speak of those modern arrows that fly higher than seventeen rows?',
    'So, they told me that wizards power the arrows. And they fly right up here - and we\'re all dead!',
    'There is only one method against arrows that fly up to the seventeenth row - build one more row',
    'Aren\'t you worried you\'ll get hit by those advanced arrows, Frilmir?',
    'I have this shield here. If I reflect the sun in it, I can shoot sun arrows! Isn\'t that cool, Frilmir?',
    'Row eighteen. Can they go even higher?',

    'I was asked if I should consider marriage. And I was like - but who\'s gonna guard the wall?',
    'She asked me if I want kids. And I go - but who\'s gonna guard the wall?',
    'They asked me if I plan to take up gardening. And I\'m like - but who\'s gonna guard the wall?',
    'My buddy told me I should work out more. And I said - but who\'s gonna guard the wall?',
    'He goes - you should do more self improvement. And I am like - but who\'s gonna guard the wall?',
    'Nineteenth row. Man, we\'re getting close to twenty!',

    'I have no comment at this time',
    'It\'s the "no comment" phase',
    'It\'s that awkward moment when I have no comment whatsoever',
    'Sorry, no comment from the guards at this time',
    'I must be getting old, since I have literally no comment for you',
    'Row twenty. I mean, did you think we would even live to see this moment?',

    'Outer wall guards myth #1: No, we can\'t actually touch the clouds',
    'Outer wall guards myth #2: No, we don\'t feel safe. A flying dragon can attack at any time! What if we fall down? There are a dozen such things',
    'Outer wall guards myth #3: No, there is no Inner Wall Guard',
    'Outer wall guards myth #4: Yeah, we\'re always grumpy... Wait, does it mean this one is <i>not</i> a myth?',
    'Outer wall guards myth #5: No, this row is not the last one',
    'Twenty first row. Beyond impressive. Definitely beyond twenty!',

    'Top 5 things to throw from a wall. Number 5: empty wine barrels',
    'Top 5 things to throw from a wall. Number 4: full wine barrels',
    'Top 5 things to throw from a wall. Number 3: Frilmir equipped with mechanical wings',
    'Top 5 things to throw from a wall. Number 2: messages with funny insults',
    'Top 5 things to throw from a wall. Number 1: burning hay. Looks neat and nobody gets hurt (come see our hay fireworks show on Sunday!)',
    'Row twenty two. Pretty easy to remember, Frilmir - two and two.',

    'Imagine if we could just live here. Nobody would be able to collect taxes, since it takes too long to get up here',
    'Yesterday we ordered pizza and the delivery guy gave up halfway!',
    'I was reading this book, but then I just stopped, you know',
    'So apparently they consider this wall to be the highest in the world. Did you know that, Frilmir?',
    'They were thinking of building a special lift to get us up here faster. But then someone was like - no pain, no gain!',
    'Row twenty three. One more row and it\'s going to be <i>that</i> row',

    'It\'s a really special row',
    'It\'s like the most special row ever',
    'This could be the most important row so far',
    'Possibly the most significant row',
    'Definitely the most significant row',
    'Row twenty four. I waited so long to tell you this, Frilmir. Did you know that 24 is the highest number?',

    'Remember our skepticism at row one? And look where we are now!',
    'Remember how we were worried about arrows? And now we are the Ultimate Arrow Pointing at the Sky',
    'Remember how we worried about falling down? And now that you can\'t really see the ground, it\'s not so scary',
    'Remember how we counted the stones? And now I have no idea how many there are!',
    'Remember row 17? That was kinda fun',
    'Okay, twenty five is the highest number. I mean, would could top that?',

    'My favorite fruit? Definitely oranges, because they live up to their name. Unlike grapefruit. A complete lie, there are no grapes there at all',
    'I\'d say I prefer dogs to cats, but only because I actually own a parrot',
    'If I had to choose - yeah, 8 bit. 16 bit is lame',
    'I don\'t know, man. I like donkeys more. They have style',
    'Definitely surprise parties, cause that means someone organizes them for you!',
    'I guess twenty six is the highest number. But that\'s it. There\'s nothing else.',

    'My thinking is that our strategy should be to spot the enemy from afar. Then again, by the time we get down to warn people, the battle would be long over. So, let\'s just sit here quietly...',
    'Perhaps the wall is too high. They\'ll just fight down there, kings will change and we will just be sitting here, observing history unfold',
    'I once saw a tiny caterpillar. It was crawling ever so slowly, but then I realized it was the Great Caravan!',
    'As I\'m looking down at the dots that are cities and at spots that are forests, I once again feel the ephemeral nature of our lives!',
    'I must admit, the wall is so high, I don\'t even feel we\'re in the same country anymore',
    'The cool thing about twenty seven is that it has just a 2 and a 7 - and it\'s the <i>only</i> number that has just a 2 and a 7',

    'You know, Frilmir. I can\'t believe I\'m saying this, but I think this should be the final row',
    'The more I think about it, the more I\'m confident that this is the very final row',
    'Definitely no more rows after this one. Otherwise we end up in space!',
    'They were asking if we can touch the clouds. No, because they are too far down!',
    'Almost there. Just one more stone. Just one more stone!',
    'Row twenty eight. Frilmir, <b>the wall is complete!!!</b>',
    'Frilmir, <b>the wall is complete!!!</b>'


]

};

//variables that are constants, unsaved defaults or are derived from saved variables
const MANA_BASE_COST=1e12;
const SOULS_BASE_COST=1e12;
const SYSTEMFRAME_MAX = 1e2;
const FRAME2_MAX = 1e4;
const tree_stages=[9000,19800,57600,86400];
const unit_names=['Weaklings','Dwarves','Humans','Ogres','Wizards','Warlocks','Witches','Wyverns','Catapults','Crossbows','Cheiroballistras','Cannibals'];
const fort_names=['Fortified Weaklings','Fortified Dwarves','Fortified Humans','Fortified Ogres','Fortified Wizards','Fortified Warlocks','Fortified Witches','Fortified Wyverns','Fortified Catapults','Fortified Crossbows','Fortified Cheiroballistras','Fortified Cannibals'];
var nextManaCost=0;
var nextSoulsCost=0;
var current_rate=0;
var metals_rate=0;
var mortals_rate=[0,0,0,0];
var mages_rate=[0,0,0];
var machines_rate=[0,0,0,0];
var alchemist_label_elements=[];
var necromancer_label_elements=[];
var undead_rate=[0,0,0,0,0,0,0,0,0,0,0,0];
var session_data={
  //session data is not saved
  counter:0,
  main_loop:null

};
var messenger = {
  active:0,//if a bonus is currently on
  is:'',
  timeStay:15,
  timeDuration:0,
  isRunning:0,
  missesThreshold:15,
  opacity:1,
  left:0,
  top:0,
  width:0,
  title:'',
  body:'',
  class:'',
  reward:0,
  cost:0,
  hammer_multiplier:1
};
var misc_settings={
  settings_toggle:0,
  guide_toggle:0,
  guide_page:'',
  save_del_confirm_toggle:0,
  hog_setup:0,
  graveyard_setup:0,
  gandlor_display:0,
  fort_unit:[999]
};
var frogs={};
var gandlor={};
var temple={};
var guidebook={

  transmigration:'Transmigration takes you out of spacetime. The transmigration button becomes visible when you mine 1 Mana. You need a minimum of x2 to transmigrate during your first run.<br><br>The recommended amount for first transmigration is 22. The minimum amount which would at all make sense is 4, allowing you to purchase "The Infinite Rulebook" and "Empowerment"',

  wicked:'Each quest requires you to hire exactly 66 of the relevant unit which will trigger the corresponding counter. When the counter reaches 666, the Wicked Multiplier will be incremented by 1.<br><br>Warning: There is no mercy to the challengers! If you hire more creatures midway, the counter will stop. You would be able to try again after transmigration.<br><br>Completing all the quests provides you with a permanent Wicked Multiplier of x5. It can be cruel, but keeps its promises',

  gandlor:'The two closed cards are the deuce. The five open cards are the wrap. Your goal is to match all the cards of the wrap against the deuce. You can click any two cards in the wrap to remove them, at which point the deuce will be rolled.<br><br>You can also spin after removing just a single card. This is called <i>the grand spin</i>. It costs twice as much as the normal spin, but will yield double the time winnings.<br><br>You also win items. Normal spin will offer you some standard items and Cannibals (provided they are unlocked). Grand spin offers a wide variety of advanced items.<br><br>Any spin can also win you the Seer which ensures that the deuce will be randomly generated from the pool of cards already in the wrap. You can use the Seer only before you\'ve eliminated any cards.<br><br>Coins are based on the amount of Alchemist upgrades clicked. You can get coins through other means too.',

  cannibals:'Cannibals are an additional unit that is unlocked through fortifying the ogres. Cannibals cannot be purchased directly, but can only be recruited through items.<br><br>The power of cannibals depends not only on the amount of the unit itself, but also on the amount of units in the towers of Mortals and Mages.',

  aviary:'Aviary allows you to capture items that are birds. It is essentialy a set of permanent item slots.<br><br>You cannot have several birds of the same species, each bird must be unique.<br><br>The Aviary will reset after each transmigration, however if you manage to capture every specie, the Aviary will stay full permanently.',

  fort:'Fortifications provide permanent multipliers to the units. But most importantly many of them unlock new capabilities.<br><br><b class="yellowgreen">Raiders</b> are sent to nearby locations to bring back useful items<br><br><b class="yellow">Gandlor\'s Cave</b> is a gambling establishment where one can win items and production time<br><br><b class="gandlorpink">Treasury</b> provides a boost to the rate based on the amount of seen items<br><br><b class="darkred">Cannibals</b> are a special unit that are stronger than Cheiroballistras, but can only be recruited through items<br><br><b class="orange">Hall of Giants</b> introduces giants and the powergul Giant Multiplier<br><br><b class="blue">Necropolis</b> is an undead part of the Fortress with its own units and upgrades<br><br><b class="mediumseagreen">Aviary</b> introduces permanent item slots for bird items to permanently boost the rate<br><br><b class="purple">Tower of Dragons</b> introduces dragon units that boost the dwarves',

  museum:'Treasury is located under the Hall of Giants and provides a boost to the rate based on two parameters: the amount of items encountered and how many times each item was seen. Special items that can\'t be acquired directly can only be either 1 or 0. For instance, if you\'ve encountered Full Moon, it will become 1 and stay 1 even if you see it again. But for all other items the counter will increment each time it gets added to the Alchemist.<br><br>Transmigrations will reset all counters back to 1, but if an item was encountered it will always stay at least as 1.<br><br>When all items have been encountered, transmigrations will stop resetting item counters, allowing for unlimited growth across runs',

  raiders:'Raiders are sent to various locations in order to acquire useful items. Raids are dangerous and only half of the raiding party will come back from the raid safely.<br><br>You start with a single location. When new locations are unlocked, use the small arrow to switch between them. You won\'t be able to switch while the raid is ongoing.',

  graveyard:'Necropolis is your stronghold in the land of the dead with its separate rate and currency. But it is connected to the main fortress: it provides a Haunted Multiplier which multiplies fortress rate.<br><br>In order to increment the multiplier, you must reach the target in each of the Doomed Artifacts. Use the ">>>" button to switch between artifacts and fill each one up. When done, click "Next target" which will increment the Haunted Multiplier and set the next target.<br><br>Souls are a transmigration currency for the Necropolis, just like Mana is for the Fortress. When you transmigrate, captured souls are going to be converted into Necropolis Levels. Each Necropolis Level provides a permanent +1% upgrade to the rate of Necropolis',

  hog:'Giant Multiplier is comprised of creatures in the towers of Mortals and Mages: every 100 creatures add 1 giant.<br><br>You need to click the "Recast Giants" button if you would like to recalculate the Giant Multiplier when more creatures are hired.<br><br>You may also choose to not recast if you know that the amount of units has fallen below what you previously had.',

  compatibility:'This is <b>version 0.5</b> of the game. It is not compatible with previous versions and has only superficial relation to its previous incarnations.',

  mobile:'Although IF was designed for desktop, the game performs quite decently on mobile. Chrome would be your best bet.<br><br>Tip: if the element has a tooltip, like Alchemist upgrades, a long press on an element will show the tooltip without activating the element.<br><br>The thing you cannot currently do is click on the hammer quickly without activating zooming in, but I am planning to address it at some point.',

  credits:'Unit and item sprites are based on DENZI\'s excellent CC0 sprite collection. I have used Inkscape to convert them to SVGs.<br><br>Gandlor\'s Cave monsters are by <a class="guide_link" href="https://opengameart.org/users/redshrike" target="_blank">Stephen Challener (Redshrike)</a>. A modified Archon based on his work was made by <a class="guide_link" href="https://opengameart.org/content/harlequin-epicycle-mod" target="_blank">Manveru</a>. These have also been converted to SVGs.<br><br>Backgrounds have been made with Midjourney and edited in GIMP.</b><br><br>Special thanks goes to my Discord crew. Their enthusiasm for the game was very inspiring and helped me get through months of development. And then everyone spent weeks play testing and providing detailed feedback and ideas.<br><br>I\'d like to mention <b>Zilvarro, Samantha, Wynzlow, Galactum, RamBunctant, Vampie, Slywinkle, Some Dude Named Kai, Octosaur, Goran </b>and<b> Duncan.'

};
var locations=[
  //id,name,descr,time increment,level label,exploration levels
  
  [0,'Candemnese Forest','The largest forest in the world, it contains an untold amount of mysterious paths and obscure structures',300,1e6,''],
  [1,'Ancient Pyramid','Seen from afar, it stands tall, the grim memorial of a long gone civilization. Its 10 levels are riddled with traps that guard the treasures within',600,10,'levels'],
  [2,'Horium','The legendary metropolis hosts the wealthiest and the poorest of neighborhoods',150,1e6,'neighborhoods'],
  [3,'Volcano','The world of raw energy',600,1e6,'']
];
var rings=[
  [0,'The Ring of Mortals','Doubles the effect of the Outer Wall','brass',1000],
  [1,'','','bronze',1500],
  [2,'','','iron',2000],
  [3,'','','agate',2500],
  [4,'','','copper',3000],
  [5,'','','gold',3500],
  [6,'','','moonstone',4000],
  [7,'','','ruby',4500],
  [8,'','','tourmaline',5000]
];
var chemistry=[
  [0,'Alcohol',2,'Real alchemists don\'t use water','yellow','essentials',0],
  [1,'Bacon',2,'Can\'t go wrong with bacon','brown','everyday organics',3],
  [2,'Shenanigans',2,'They always come without warning','blue','uncharted territory',3],
  [3,'Chili pepper',300,'A bit of a burn','orangered','primary ingredient',1],
  [4,'Tomato',2,'Red and spherical, unless it\'s cut, in which cases it tends to take the shape of circles','darkred','everyday organics',3],
  [5,'Pickles',8,'They look exactly what pickles look like. Taste like them, too','lightgreen','everyday organics',5],
  [6,'Compost',4,'Good for growing pumpkins and other things','green','everyday organics',4],
  [7,'Chicken',100,'Best bird ever','crimson','primary ingredient',1],
  [8,'Fancy magic',8,'If it\'s good, it\'s worth getting several','pink2','spell indivisibles',5],
  [9,'Fancy tail',8,'You can also wear it on your head','purple','accessories',5],
  [10,'Bickering',200,'Refined disagreeableness','purple','primary ingredient',1],
  [11,'Duplicator',0,'It\'s what it sounds','utility','utility',2],
  [12,'Darkness',8,'Darkness to light is same as salt to sugar, but philosphers are still hashing this one out','main_color','physics',5],
  [13,'Magnet',4,'It\'s a rare example of something being both physics and magic','main_color','physics',4],
  [14,'Drops of Lava',4,'Folks find it beautiful, but a bit too warm','orange','volcanology',4],
  [15,'Unicorn cheese',4,'Has that characteristic smell','yellow','moon science',4],
  [16,'Celestial horn',8,'Classy, but requires an angel to play it','yellow','moon science',5],
  [17,'Jar',400,'Could contain a genie, but doesn\'t','orchid','primary ingredient',1],
  [18,'Skull',600,'Normally they store brains here. Well, most of us do','darkred','primary ingredient',1],
  [19,'Unknown substance',8,'Requires more research','gray','uncharted territory',5],
  [20,'Doubler',0,'It\'s what it sounds','utility','utility',2],
  [21,'Steel',500,'Deadly and cold','lightgray','primary ingredient',1],
  [22,'Curse',1,'Gateway to the odd side','devil','spell indivisibles',6],
  [23,'Electricity',8,'Great power, unharnessed for centuries','brightblue','physics',5],
  [24,'Bang',4,'Defend your eardrums!','lightblue','physics',4],
  [25,'Cloner',0,'It\'s what it sounds','utility','utility',2],
  [26,'Vinegar',2,'Best salad dressing? Debate that one','tan','everyday organics',3],
  [27,'Glory',4,'We all want it','pink2','intangibles',4],
  [28,'Bricks',2,'Like legos, only without the pips','darkred','building materials',3],
  [29,'Completely unknown substance',10,'Requires more research','gray','uncharted territory',5],
  [30,'Wood',4,'Like trees, only useful','peru','building materials',4],
  [31,'Naval engineering',8,'10,000 hours of practice','deepskyblue','intangibles',5],
  [32,'Gold paint',4,'Makes everything become fabulous','goldenrod','cosmetics',4],
  [33,'Frog',2,'Croak!','mediumseagreen','everyday organics',3],
  [34,'Fancy engineering',8,'Gears and traps','lightslategray','intangibles',5],
  [35,'Stubborness of a Special Kind',700,'It\'s of the kind that gets everyone killed','devil','primary ingredient',1],
  [36,'Kilometers',4,'They are like meters, only longer','lightslategray','physics',4],
  [37,'Encyclopedia',4,'Like Wikipedia, but on paper and only a handful of dudes editing it','khaki','literature',4],
  [38,'Reading glasses',2,'Nothing like drinking glasses','gandlor_back','accessories',3],
  [39,'Hope',2,'It\'s like false hope, only without the false part. Scholars are still debating this','orchid','intangibles',3],
  [40,'Box',800,'You can build anything out of a box','peru','primary ingredient',1],
  [41,'Keyhole',10000,'Needs a key','blueblink','uncharted territory',6],
  [42,'Key',10000,'Needs a keyhole','blueblink','uncharted territory',6],
  [43,'Magma',4,'Basically the same as lava, only underground','orangered','volcanology',4],
  [44,'Rabbit',2,'Time proven connection to magic and hats','lightslategray','mammals',3],
  [45,'Cloth',2,'Time proven connection to magic and hats','lightblue','fabrics',3],
  [46,'Ice cube',2,'Add them to your cup to make it look fuller','deepskyblue','physics',3],
  [47,'Bro',4,'Like sis, but male','mediumseagreen','mammals',4],
  [48,'Will Power',2,'Slightly more effective than anything that\'s not at all effective','brown','intangibles',3],
  [49,'Lettuce',2,'Creates an illusion of healthy eating','green','everyday organics',3],
  [50,'Havoc',4,'The opposite of a calm morning','green','intangibles',4],
  [51,'Feather',2,'It hovers','green','accessories',3],
  [52,'Pink paint',4,'Makes everything pink','green','cosmetics',4],
  [53,'Bottle',4,'Same as a squirrel, only completely different','green','containers',4],
  [54,'Strangeness',4,'Of a completely normal variety','green','intangibles',4],
  [55,'Some coins',2,'They don\'t add up to much','green','financials',3],
  [56,'Equivocation',2,'All men are mortal. Women are not men. Therefore, women are immortal','green','informal fallacy',3],
  [57,'Leather',4,'Too many things to say about leather','green','materials',4],
  [58,'Carrot',2,'The famous vegetable','green','everyday organics',3],
  [59,'Swashbuckling',8,'Take on the world!','green','intangibles',5],
  [60,'Volcanic ash',4,'A nobler form of ash','green','volcanology',4],
  [61,'Queen',8,'We all are but her minions','green','royalty',5],
  [62,'Pig',4,'Boop the snoot','green','mammals',4],
  [63,'Clock',4,'Measures the passage of time','green','inventions',4],
  [64,'Paddle',2,'The best thing to do on a lake','green','activities',3],
  [65,'Speed',8,'Everyone wants it if in a race','brightblue','physics',5],
  [66,'Huge eyes',4,'Ostriches have the largest eyes of any land vertebrate','brightblue','body parts',4],
  [67,'Long neck',4,'Especially useful if your feet are short','brightblue','body parts',4],
  [68,'Tropical forest',8,'It\'s an alien world','brightblue','ecosystems',5],
  [69,'Danger',4,'Someone\'s middle name','brightblue','intangibles',4],
  [70,'Shell',2,'of one\'s former self','green','everyday organics',3],
  [71,'Kernel',2,'of truth','brightblue','everyday organics',3],
  [72,'Unhelpful substance',4,'It\'s desire to help you is exactly 0','brightblue','uncharted territory',4],
  [73,'Science',900,'Inquiry into the unknown','deepskyblue','primary ingredient',1],
  [74,'King',8,'Someone who wears a special hat','green','royalty',5],
  [75,'Old books',4,'Words by dead authors','green','literature',4],
  [76,'Storytelling',8,'Always in vogue','green','literature',5],
  [77,'Massive bird',8,'It\'s truly massive, folks','green','dinosaurs',5],
  [78,'Oil lamp',4,'Let the darkness retreat into the far corners','green','inventions',4],
  [79,'Flask',2,'A flask within a flask!','green','equipment',3],
  [80,'Random microorganism',3,'It\'s very alien and comes in a saucer','green','extraordinary organics',6],
  [81,'Pills',2,'Some of them are purple','green','medicine',3],
  [82,'Medical bills',8,'They make you want to find a job','green','economics',5],
  [83,'Various things',0,'Used for Hangover Potion ingredients','green','system',0]
];
var items=[
  [0,'Hangover Potion','Adds +900 seconds to drinking time','blue','instant item'],
  [1,'Shadow Attractor','Provides a 50/50 chance that the Great Caravan will be immediately followed by the Shadow Caravan<br><br>Also makes the Great Caravan more likely','brightblue','equippable item'],
  [2,'Lava Fertilizer','Accelerates the growth of a Volcano Breather by 10 minutes','darkred','instant item'],
  [3,'Crescent Moon','Provides a 1 in 3 chance that a growing Flameseed will become enchanted. Raids accelerated by 5%<br><br><b>Instant action:</b> Speeds up an ongoing raid by 5%','yellow','equippable item'],
  [4,'Devil\'s Exhale','Rate is increased by 25%. Wine is turned into water<br><br>Blocks other items from being equipped','devil','equippable item'],
  [5,'Qverin','Reduces rate by 30%, but increases the max amount of items you can win at Gandlor\'s by 2 and makes Gandlor\'s Invitation more likely<br><br><b>Instant action:</b> Adds +10 coins','purple','equippable item'],
  [6,'Full Moon','Feeding volcano with Crescent Moons accelerates growth of volcano breathers by 10 minutes<br><br>Raids accelerated by 15%, including as instant action by Crescent Moons','yellow','special item'],
  [7,'Peacock','Rate is increased by 25%.<br><br><b>Instant action:</b> If it\'s Blaze Season, adds +5% to the rate','purple','equippable item'],
  [8,'Owl','Rate is increased by 5%<br><br>Frog Rain might become more prosperous','green','equippable item'],
  [9,'100 Cannibals','Always hungry','main_color','instant item'],
  [10,'10 Cannibals','Always hungry','main_color','instant item'],
  [11,'250 Cannibals','Always hungry','main_color','instant item'],
  [12,'Plush Punch','Adds +90 temporary units to weaklings<br><br><b>Instant action:</b> Adds +10 permanent units to weaklings','green','equippable item'],
  [13,'Dwarvian Relatives','Adds +90 temporary units to dwarves<br><br><b>Instant action:</b> Adds +10 permanent units to dwarves','purple','equippable item'],
  [14,'Mirror People','Adds +90 temporary units to humans<br><br><b>Instant action:</b> Adds +10 permanent units to humans','orange','equippable item'],
  [15,'Jar of Pickles','Adds +90 temporary units to ogres.<br><br><b>Instant action:</b> Adds +10 permanent units to ogres. If cannibals are unlocked, adds +10 permanent units to cannibals as well','ogres','equippable item'],
  [16,'Suburbs of a Great City','Unlocks Horium as a raid location<br><br>If Horium is unlocked, speeds up an ongoing raid by 600 seconds and a Horium raid by 900 seconds','seagreen','instant item'],
  [17,'Defective Dagger','The effect is uncertain. Use at your own risk!','crimson','equippable item'],
  [18,'Flying Ship','Triggers a messenger','papaya','instant item'],
  [19,'Golden Hen','Gives back all spent coins','darkgoldenrod','instant item'],
  [20,'Frog Rain','Frogs raining from the sky','greenblink','instant item'],
  [21,'Fuller Moon','Feeding volcano with Crescent Moons accelerates growth of volcano breathers by 25 minutes<br><br>Raids accelerated by 20%, including as instant action by Crescent Moons<br><br>Rate is doubled','yellow','special item'],
  [22,'Fullest Moon','Raids accelerated by 25%. Rate is increased by x5, but Crescent Moons cannot be used','yellow','special item'],
  [23,'Minting Machine','Hammer mints coins up to 4 at a slow rate','orchid','equippable item'],
  [24,'Haste','Speeds up an ongoing raid by 600 seconds','khaki','instant item'],
  [25,'Demigod','Adds +100 temporary units to all mortals','darkviolet2','equippable item'],
  [26,'Perfect Knowledge','Resets raid time for selected location<br><br><i>Note: works for locations with unlimited exploration. Cannot be used during the raid</i>','lightgreen_dark','instant item'],
  [27,'Treasure Chest','A bit of money won\'t hurt','treasure','instant item'],
  [28,'Dagger','Reduces the prices of all Alchemist upgrades and items currently on sale by 10%','crimson','instant item'],
  [29,'Blue Rose','Hammer mints coins by 1. Effect lasts for 100 clicks','brightblue','special item'],
  [30,'50 Cannibals','Always hungry','main_color','instant item'],
  [31,'Thunder','Adds 0-5 additional units to mortals','thunder','instant item'],
  [32,'Pack of Thunders','Several thunders just for you','thunder','pack of items'],
  [33,'Weed Pipe','Rate is increased by 7%. Raids accelerated by 10%<br><br><i>Don\'t riot, be happy</i>','devil','special item'],
  [34,'Brutal Honesty','Rate is decreased by 15%','baditem','equippable item'],
  [35,'Drunken Rabbit Banner','Rate is increased by x10','papayablink','equippable item'],
  [36,'Ice Queen','Necropolis rate is increased by 25%','brightblue','instant item'],
  [37,'Magnum Opus','Rate is decreased by 30%','baditem','equippable item'],
  [38,'Blasphemy','Rate is decreased by 2%','baditem','equippable item'],
  [39,'Ancient Kings','Rate is increased by x100, but messengers won\'t arrive','ancientkings','equippable item'],
  [40,'Magma Bro','If the flameseed turned out to be normal, make it retroactively magma-infused','orangered','instant item'],
  [41,'Budgerigar','Rate is increased by 5%. Adds +90 temporary units to dwarves<br><br><b>Instant action:</b> Adds +10 permanent units to dwarves','budgy','equippable item'],
  [42,'Strange Bottle','Rate is decreased by 15%, but the price of new items is halved<br><br><b>Instant action:</b> Reduces the prices of all Alchemist upgrades and items currently on sale by 10%','mediumpurple','equippable item'],
  [43,'Stranger Bottle','Price of new items is halved','mediumpurple','equippable item'],
  [44,'Grimlord\'s Hat','Rate is halved, Necropolis rate is increased by x10','brightblue','equippable item'],
  [45,'Doomed Artifact V','Necropolis rate is increased by x1000','devil','equippable item'],
  [46,'Sword','Reduces the prices of all Alchemist upgrades and items currently on sale by 25%','crimson','instant item'],
  [47,'Volcano Queen','Accelerates the growth of a Volcano Breather by 30 minutes','orangered','instant item'],
  [48,'Flamingo','Rate is increased by 15%. Adds +180 temporary units to dwarves<br><br><b>Instant action:</b> Adds +20 permanent units to dwarves','mediumvioletred','equippable item'],
  [49,'Piggy bank','Adds +30 coins','blacksmiths','instant item'],
  [50,'Time Machine','Adds +30 mins of production at max seen rate','powderblue','instant item'],
  [51,'BLT','Adds +5 mins of production at max seen rate','yellowgreen','instant item'],
  [52,'Spicy BLT','Adds +10 mins of production at max seen rate','tomato','instant item'],
  [53,'Swarm of Mosquitoes','Rate is decreased by x10, but the price of new items is halved<br><br><b>Challenge:</b> 2 in 3 chance that the item equipped over the swarm will be devoured!','crimson2','special item'],
  [54,'Duck','Rate is increased by 5%','mediumaquamarine','equippable item'],
  [55,'Ostrich','Rate is increased by 15%','darkkhaki','equippable item'],
  [56,'Cassowary','Rate is increased by 10%.<br><br><b>Instant action:</b> For each available thunder adds a BLT','indianred','equippable item'],
  [57,'Nut','Rate is increased by 1%','darkkhaki','equippable item'],
  [58,'Caladrius','Rate is increased by 15%','snow','equippable item'],
  [59,'Roc','Rate is increased by 25%','lightslategray','equippable item'],
  [60,'Phoenix','Rate is increased by 50%','phoenix','equippable item'],
  [61,'Genie','Does nothing, but much pazzazz','genie','equippable item'],
  [62,'Odd Almond','Rate is increased by 1%','darkkhaki','instant item'],
  [63,'Devious Puffin','Rate is increased by 13%','lightpink','equippable item'],
  [64,'Unstable Pumpkin','Collapses into a random item','orange','equippable item'],
  [65,'Complete Lie','Rate is increased by 800%','devil','equippable item'],
  [66,'Crooked Knife','Reduces the prices of all Alchemist upgrades and items currently on sale by 90%','crimson','instant item'],
  [67,'Dodo','Rate is increased by 30%','peachpuff','equippable item'],
  [68,'Keymaster','Adds +1 hour of production time','orchid','instant item'],
  [69,'Chemistry','Price of new items is reduced by 90%','mediumseagreen','equippable item'],
  [70,'Marauders\' Guild','Automatically collects loot and launches five more raids to the same location','springgreen2','equippable item'],
  [71,'Astronomy','','darkorchid','pack of items'],
  [72,'Medicine','Restores all weaklings lost in raids','deepskyblue','instant item'],
];
var library={

  library_card_explanation:['<p>You are now outside of spacetime. As you look up, you see a beautiful and odd mural, containing shapes of people, animals, planets and whole galaxies. They are frozen in a fascinating dance of still frames. <i>It is the whole of spacetime spread right in front of your eyes</i>.</p><p>The Mana you\'ve earned will be converted into <b>Library Credits</b> that will allow you to scour the books for useful spells and inventions the likes of which no mortal has ever seen.</p>'],

  greetings:['Welcome to the Infinite Library, mortal!','Behold the infinite shelves of the Infinite Library','You are in the quietest place of the Universe, the Infinite Library','Meet infinity itself at the Infinite Library'],

  dykt:[],

  librarian_warning:['In order to see the books, you need to depart the finite world and enter the Library. This cannot be undone, so consider this carefully!'],

  tome_intro:{
    id:8,
    title:'The Infinite Rulebook',
    author:'Nasty Librarian',
    items:['Infinite Blessing'],
    prices:[1],
    descr:['Each Fortress Level will provide you with a permanent +1% upgrade to your rate']
  },

  tome_weaklings:{
    id:1,
    title:'Song of the Weakling',
    author:'Prosf Halendorflont',
    items:['Empowerment','Raider\'s Grip','Raider\'s Gumption','Raider\'s Breakfast','X Marks the Spot','Tarvel'],
    prices:[3,1e4,1e6,1e9,1e5,1e11],
    descr:['A bundle of additional weakling upgrades','Reduce the amount of weaklings required for a raid by 5','Reduce the amount of weaklings required for a raid by 5','Reduce the amount of weaklings required for a raid by 5','Raiders discover the Ancient Pyramid','Arrange for a heartfelt prayer to the all-seeing multi-dimensional donkey. Her blessings halve the time added to each subsequent raid']
  },

  tome_dwarves:{
    id:2,
    title:'King Under the Mountain',
    author:'Qvass III',
    items:['Royal Stables','Treasure Chest','Snail Machine','Lab Assistants','Sturdy Boxes','Bell Tower'],
    prices:[1e4,1e5,1e7,1e8,1e9,1e10],
    descr:['Messengers arrive 10% more frequently','Buymax for Alchemist upgrades','Doubles the amount Snail Network can retrieve','Reduces the price of items by 25%','Reduces the price of items by 25%','Sound an alert when messengers arrive']
  },

  tome_darkarts:{
    id:3,
    title:'Mysteries of the Dark Arts',
    author:'a cabal of anonymous sorcerers',
    items:['Dark Magic','The Gathering','Wildfire Spells','Wicked Quests'],
    prices:[6,6,6,666],
    descr:['Synergy spells for warlocks','Synergy spells for witches','Synergy spells for wyverns','A set of nasty quests completing which provides you with a permanent multiplier']
  },

  tome_inventions:{
    id:4,
    title:'War Inventions',
    author:'Astalm Bridgewinter',
    items:['Weaponcraft','Combat Contraption','Devious Apparatus'],
    prices:[100,100,100],
    descr:['Synergy spells for catapults','Synergy spells for crossbows','Synergy spells for cheiroballistras']
  },

  tome_timedivinations:{
    id:5,
    title:'Time Divinations',
    author:'Aaron and Abe',
    items:['Time Machine','Cloak of Time','Time Tube','Temporal Displacement','Time Spells','Sacred Clocks'],
    prices:[6,36,216,1296,7776,46656],
    descr:['Offline mining at 5%','Offline mining +10%','+10% for offline mining','+10% for offline mining','+10% for offline mining','+10% for offline mining']
  },

  tome_alcohol:{
    id:6,
    title:'Getting Drunk Properly',
    author:'the Hangover Society',
    items:['Grapes'],
    prices:[9e6],
    descr:['Boosts the power of wine']
  },

  tome_alchemy:{
    id:7,
    title:'Transmute Things Into Gold or Die Trying',
    author:'Crafty Alchemist',
    items:['Philosopher\'s Lock','Mystic Workshop','Persistence in the Wild'],
    prices:[1e6,1e9,1e12],
    descr:['Lock equipped item to prevent accidental removal by another item','Ability to transform items into ingredients to produce other items','Keep the equipped item between transmigrations']
  },

  tome_dead:{
    id:9,
    title:'Tome of the Mostly Deceased',
    author:'Death herself. Or so they say',
    items:['Necromancer\'s Revenge','Necromancer\'s Comeback','Necromancer\'s Joke','Necromancer\'s Stratagem','Necromancer\'s Legacy'],
    prices:[1e6,1e7,1e8,1e9,1e10],
    descr:['Each increment of the Graveyard Multiplier adds +10% to the Graveyard rate','Each increment of the Graveyard Multiplier adds +10% to the Graveyard rate','Each increment of the Graveyard Multiplier adds +10% to the Graveyard rate','Each increment of the Graveyard Multiplier adds +10% to the Graveyard rate','Each increment of the Graveyard Multiplier adds +10% to the Graveyard rate',]
  },

  tome_fortress:{
    id:10,
    title:'Basics of the Royal Household',
    author:'B. Todryk, the unhelpful Housekeeper',
    items:['Fortress Citizenship'],
    prices:[1e15],
    descr:['Learn <b>Five Fun Facts about the Fortress</b> and win a x1M rate multiplier!']
  }
  

};
var strangeUpgrades={

  messenger_milestones:[6,26,66],
  snail_milestones:[2,4,6],
  hammer_milestones:[1e3, 1e5, 1e7, 1e9, 1e11, 1e13, 1e15, 1e17, 1e19, 1e21, 1e23],
  synergy_milestones:[20, 70, 110, 170],
  blacksmiths_milestones:[75, 235, 395],
  medallions_milestones:[5,10,20,30,40,50,60,70,80,90,100,125,150,175,200,250,300],
  counter_milestones:[5e4,25e4,5e5,1e6,5e6,50e6,500e6,1e9,50e9,500e9,1e12,50e12,500e12,1e15,50e15,500e15,1e18,1e21,1e24,1e27],
  weaklings_milestones:[3, 7, 17, 32, 62, 92, 122, 182, 242, 302, 362, 422, 482, 542],
  milestones:[1, 5, 15, 30, 60, 90, 120, 180, 240, 300, 360, 420, 480, 540],

  //milestone, name, description,color,price,upgrade deck

  blacksmiths:[
    [15,'Ancient Bond','Doubles the power of the hammer. Hammer gains +1% per blacksmith','pink',1e6,'folk magic'],
    [1,'Strike the Anvil!','Doubles the power of blacksmiths and hammer','blacksmiths',500],
    [5,'Metal Glows','Doubles the power of blacksmiths and hammer','blacksmiths',1000],
    [30,'Chisel Supply','Doubles the power of blacksmiths and hammer','blacksmiths',1e5],
    [60,'Smithing it Out','Doubles the power of blacksmiths and hammer','blacksmiths',1e7],
    [90,'The Greatest Forge','Doubles the power of blacksmiths and hammer','blacksmiths',1e9],
    [120,'Liquid Swords','Doubles the power of blacksmiths and hammer','blacksmiths',1e11],
    [180,'Ore Inventory','Doubles the power of blacksmiths and hammer','blacksmiths',1e13],
    [240,'Fire it Up!','Doubles the power of blacksmiths and hammer','blacksmiths',1e15],
    [300,'Smelting Philosophy','Doubles the power of blacksmiths and hammer','blacksmiths',1e17],
    [360,'Iron Fists','Doubles the power of blacksmiths and hammer','blacksmiths',1e19],
    [420,'The Iron Revolution','Doubles the power of blacksmiths and hammer','blacksmiths',1e21],
    [480,'Double Strike','Doubles the power of blacksmiths and hammer','blacksmiths',1e23],
    [540,'The Volcanic Standard','Doubles the power of blacksmiths and hammer','blacksmiths',1e25]
  ],

  weaklings:[
    [1,'Weak Force','Doubles the power of weaklings','green',1e3],
    [5,'Be Very Afraid!','Doubles the power of weaklings','green',1e4],
    [30,'Small Fists','Doubles the power of weaklings','green',1e5],
    [60,'Quiet Revolution','Doubles the power of weaklings','green',1e6],
    [90,'Beware of the Weak!','Doubles the power of weaklings','green',1e7],
    [120,'Root for the Underdog','Doubles the power of weaklings','green',1e9],
    [180,'Power of the Weak!','Doubles the power of weaklings','green',1e11],
    [240,'We\'re Getting Stronger','Doubles the power of weaklings','green',1e13],
    [300,'Not So Weak Anymore!','Doubles the power of weaklings','green',1e15],
    [360,'Strength in Numbers','Doubles the power of weaklings','green',1e17],
    [420,'That\'s How They Rise','Doubles the power of weaklings','green',1e19],
    [480,'Powerlings','Doubles the power of weaklings','green',1e21],
    [540,'Impressive Journey','Doubles the power of weaklings','green',1e23]
  ],

  weaklings2:[
    [3,'One Step at a Time','Doubles the power of weaklings','green',1e2,'empowerment'],
    [32,'Handle With Care','Doubles the power of weaklings','green',1e3,'empowerment'],
    [92,'Strong Stuff','Doubles the power of weaklings','green',1e4,'empowerment'],
    [182,'In Frodo\'s Footsteps','Doubles the power of weaklings','green',1e5,'empowerment'],
    [302,'Clandestine Talent','Doubles the power of weaklings','green',1e6,'empowerment'],
    [422,'Additional Supper','Doubles the power of weaklings','green',1e8,'empowerment'],
    [542,'Behold the Weaklings!','Doubles the power of weaklings','green',1e10,'empowerment']
  ],

  dwarves:[
    [15,'The Weakling Alliance','Doubles the power of weaklings. Dwarves gain +1% per weakling','pink',6e5,'folk magic'],
    [1,'The Dwarf Age','Doubles the power of dwarves','purple',12e3],
    [5,'Dwarf Adventure','Doubles the power of dwarves','purple',12e4],
    [30,'Grab Your Shovel!','Doubles the power of dwarves','purple',12e5],
    [60,'Quest for Gold','Doubles the power of dwarves','purple',12e6],
    [90,'Axes Up','Doubles the power of dwarves','purple',12e7],
    [120,'Dwarf Squad','Doubles the power of dwarves','purple',12e9],
    [180,'Dwarf Army','Doubles the power of dwarves','purple',12e11],
    [240,'Short and Tough','Doubles the power of dwarves','purple',12e13],
    [300,'Fire Within','Doubles the power of dwarves','purple',12e15],
    [360,'King Under the Mountain','Doubles the power of dwarves','purple',12e17],
    [420,'The Volcanic Empress','Doubles the power of dwarves','purple',12e19],
    [480,'Yearning for Treasure','Doubles the power of dwarves','purple',12e21],
    [540,'Power of Beards','Doubles the power of dwarves','purple',12e23]
  ],

  humans:[
    [15,'Teamwork','Doubles the power of weaklings. Humans gain +1% per weakling','pink',6e6,'folk magic'],
    [1,'Ambitions of the Mortals','Doubles the power of humans','orange',12e4],
    [5,'Healthy Diet','Doubles the power of humans','orange',12e5],
    [30,'Joggers','Doubles the power of humans','orange',12e6],
    [60,'Tower Burpies','Doubles the power of humans','orange',12e7],
    [90,'Fitness of Mortals','Doubles the power of humans','orange',12e8],
    [120,'Weightlifting Gold','Doubles the power of humans','orange',12e10],
    [180,'Canned Food','Doubles the power of humans','orange',12e12],
    [240,'Superhuman','Doubles the power of humans','orange',12e14],
    [300,'Humanity Outreach','Doubles the power of humans','orange',12e16],
    [360,'Vegetable Salad','Doubles the power of humans','orange',12e18],
    [420,'Healthy Sleep','Doubles the power of humans','orange',12e20],
    [480,'Reaching for the Stars','Doubles the power of humans','orange',12e22],
    [540,'Ordinary Greatness','Doubles the power of humans','orange',12e24]
  ],

  ogres:[
    [15,'Stronger Together','Doubles the power of weaklings. Ogres gain +1% per weakling','pink',72e5,'folk magic'],
    [1,'The Brute Squad','Doubles the power of ogres','ogres',144e3],
    [5,'Stronger Than Most','Doubles the power of ogres','ogres',144e4],
    [30,'Light on Talk','Doubles the power of ogres','ogres',144e5],
    [60,'Beef It Up','Doubles the power of ogres','ogres',144e6],
    [90,'Getting Serious','Doubles the power of ogres','ogres',144e7],
    [120,'Golden Bricks','Doubles the power of ogres','ogres',144e9],
    [180,'Too Strong','Doubles the power of ogres','ogres',144e11],
    [240,'The Real Ogre','Doubles the power of ogres','ogres',144e13],
    [300,'Ogreatness','Doubles the power of ogres','ogres',144e15],
    [360,'Fezzik\'s Fist','Doubles the power of ogres','ogres',144e17],
    [420,'Giant Stomp','Doubles the power of ogres','ogres',144e19],
    [480,'Powerhouse','Doubles the power of ogres','ogres',144e21],
    [540,'Raw Glory','Doubles the power of ogres','ogres',144e23]
  ],

  wizards:[
    [15,'Magic Duet','Doubles the power of weaklings. Wizards gain +1% per weakling','pink',864e6,'folk magic'],
    [20,'Sophisticated Incantations','Weaklings gain +1% per wizard','pink',5728e5,'white magic'],
    [70,'Magic of the Axe','Weaklings gain +2% per wizard','pink',5728e7,'white magic'],
    [110,'Deliberate Chanting','Weaklings gain +4% per wizard','pink',5728e8,'white magic'],
    [170,'Magic Infusion','Weaklings gain +8% per wizard','pink',1728e9,'white magic'],
    [1,'School of Magic','Doubles the power of wizards','purple',1728e4],
    [5,'Invisible Force','Doubles the power of wizards','purple',1728e5],
    [30,'Make it So!','Doubles the power of wizards','purple',1728e6],
    [60,'The Magic Wand','Doubles the power of wizards','purple',1728e7],
    [90,'A Strange Spell','Doubles the power of wizards','purple',1728e8],
    [120,'Works Like a Charm','Doubles the power of wizards','purple',1728e10],
    [180,'Enchanted Kingdom','Doubles the power of wizards','purple',1728e12],
    [240,'Abracadabra!','Doubles the power of wizards','purple',1728e14],
    [300,'A Penchant for Magic','Doubles the power of wizards','purple',1728e16],
    [360,'Wizardry Geek','Doubles the power of wizards','purple',1728e18],
    [420,'Unseen University','Doubles the power of wizards','purple',1728e20],
    [480,'Gandalf\'s Staff','Doubles the power of wizards','purple',1728e22],
    [540,'Runes of Power','Doubles the power of wizards','purple',1728e24]
  ],

  warlocks:[
    [15,'Synergism','Doubles the power of weaklings. Warlocks gain +1% per weakling','pink',10368e6,'folk magic'],
    [1,'The Darkness Within','Doubles the power of warlocks','warlocks',20736e4],
    [5,'Hypnotic Talents','Doubles the power of warlocks','warlocks',20736e5],
    [30,'Exorcism','Doubles the power of warlocks','warlocks',20736e6],
    [60,'Magic of the Shadows','Doubles the power of warlocks','warlocks',20736e7],
    [90,'Sorcerer\'s Wrath','Doubles the power of warlocks','warlocks',20736e8],
    [120,'Evil Eye','Doubles the power of warlocks','warlocks',20736e10],
    [180,'Secrets of Sorcery','Doubles the power of warlocks','warlocks',20736e12],
    [240,'Tome of Spells','Doubles the power of warlocks','warlocks',20736e14],
    [300,'Double Curse','Doubles the power of warlocks','warlocks',20736e16],
    [360,'Tremble, mortals!','Doubles the power of warlocks','warlocks',20736e18],
    [420,'Diabolic Divination','Doubles the power of warlocks','warlocks',20736e20],
    [480,'Dark Tower','Doubles the power of warlocks','warlocks',20736e22],
    [540,'Dark Ritual','Doubles the power of warlocks','warlocks',20736e24]
  ],

  warlocks2:[
    [20,'The Overseer','Every warlock increases the effect wizards have on weaklings','pink',80736e6,'dark magic'],
    [70,'Dark Omen','Every warlock increases the effect wizards have on weaklings','pink',80736e7,'dark magic'],
    [110,'Corrupt Spell','Every warlock increases the effect wizards have on weaklings','pink',20736e9,'dark magic'],
    [170,'Sorcerer\'s Guidance','Every warlock increases the effect wizards have on weaklings','pink',20736e11,'dark magic']
  ],

  witches:[
    [15,'Potion Symbiosis','Doubles the power of weaklings. Witches gain +1% per weakling','pink',124416e6,'folk magic'],
    [1,'Earthly Powers','Doubles the power of witches','witches',248832e4],
    [5,'Superstition','Doubles the power of witches','witches',248832e5],
    [30,'Witchcraft','Doubles the power of witches','witches',248832e6],
    [60,'Health Potion','Doubles the power of witches','witches',248832e7],
    [90,'Forest of Healing','Doubles the power of witches','witches',248832e8],
    [120,'Waters of Mystery','Doubles the power of witches','witches',248832e10],
    [180,'Secret Recipe','Doubles the power of witches','witches',248832e12],
    [240,'Suspicious Cats','Doubles the power of witches','witches',248832e14],
    [300,'Skulls on Shelves','Doubles the power of witches','witches',248832e16],
    [360,'Curses and Blessings','Doubles the power of witches','witches',248832e18],
    [420,'Strange Amulet','Doubles the power of witches','witches',248832e20],
    [480,'Mysterious Sigils','Doubles the power of witches','witches',248832e22],
    [540,'Broomstick Fleet','Doubles the power of witches','witches',248832e24]
  ],

  witches2:[
    [20,'Strange Potion','Every witch increases the effect warlocks have on wizards','pink',848832e6,'the gathering'],
    [70,'Teaching of the Elders','Every witch increases the effect warlocks have on wizards','pink',848832e7,'the gathering'],
    [110,'Map of the Forest','Every witch increases the effect warlocks have on wizards','pink',248832e9,'the gathering'],
    [170,'Relics','Every witch increases the effect warlocks have on wizards','pink',248832e11,'the gathering']
  ],

  wyverns:[
    [15,'Fiery Friendship','Doubles the power of weaklings. Wyverns gain +1% per weakling','pink',15e11,'folk magic'],
    [1,'Fireballs Galore','Doubles the power of wyverns','darkred',3e10],
    [5,'Infernal Blaze','Doubles the power of wyverns','darkred',3e11],
    [30,'Cold Blood','Doubles the power of wyverns','darkred',3e12],
    [60,'Widest of Wings','Doubles the power of wyverns','darkred',3e13],
    [90,'Beast of the Skies','Doubles the power of wyverns','darkred',3e14],
    [120,'The Strongest Reptile','Doubles the power of wyverns','darkred',3e16],
    [180,'Dragon Skin','Doubles the power of wyverns','darkred',3e18],
    [240,'Sudden Fire','Doubles the power of wyverns','darkred',3e20],
    [300,'Trembling Ground','Doubles the power of wyverns','darkred',3e22],
    [360,'Volcanic Dust','Doubles the power of wyverns','darkred',3e24],
    [420,'Breath of Fire','Doubles the power of wyverns','darkred',3e26],
    [480,'The World is Your Stove','Doubles the power of wyverns','darkred',3e28],
    [540,'Land of Ember','Doubles the power of wyverns','darkred',3e30]
  ],

  wyverns2:[
    [20,'Evil Eye','Every wyvern increases the effect witches have on warlocks','pink',9e12,'wildfire spells'],
    [70,'Hiss of the Dragon','Every wyvern increases the effect witches have on warlocks','pink',9e13,'wildfire spells'],
    [110,'Malevolence','Every wyvern increases the effect witches have on warlocks','pink',3e15,'wildfire spells'],
    [170,'Unusual Fires','Every wyvern increases the effect witches have on warlocks','pink',3e17,'wildfire spells']
  ],

  catapults:[
    [15,'The Catapult Conspiracy','Doubles the power of humans. Humans gain +1% per catapult','pink',18e12,'folk craft'],
    [1,'Bombs Away!','Doubles the power of catapults','green',36e10],
    [5,'Heavy Duty','Doubles the power of catapults','green',36e11],
    [30,'War Technology','Doubles the power of catapults','green',36e12],
    [60,'Beyond the Walls','Doubles the power of catapults','green',36e13],
    [90,'Rain of Fire','Doubles the power of catapults','green',36e14],
    [120,'Little Mercy','Doubles the power of catapults','green',36e16],
    [180,'The Great Payload','Doubles the power of catapults','green',36e18],
    [240,'Heavy Wheels','Doubles the power of catapults','green',36e20],
    [300,'Chariot of Death','Doubles the power of catapults','green',36e22],
    [360,'Woosh!','Doubles the power of catapults','green',36e24],
    [420,'Trebuchet Army','Doubles the power of catapults','green',36e26],
    [480,'Newtonian Physics','Doubles the power of catapults','green',36e28],
    [540,'Package From the Sky','Doubles the power of catapults','green',36e30]
  ],

  catapults2:[
    [20,'Payload Support','Humans gain +1% per catapult','pink',96e12,'Weaponcraft'],
    [70,'Engineer\'s Connection','Humans gain +1% per catapult','pink',96e13,'Weaponcraft'],
    [110,'Tools and Brains','Humans gain +1% per catapult','pink',36e15,'Weaponcraft'],
    [170,'Innovation','Humans gain +1% per catapult','pink',36e17,'Weaponcraft']
  ],

  crossbows:[
    [15,'Crossbow Partnership','Doubles the power of humans. Humans gain +10% per crossbow','pink',216e12,'folk craft'],
    [1,'Birds of prey','Doubles the power of crossbows','orange',432e10],
    [5,'Light Arrows','Doubles the power of crossbows','orange',432e11],
    [30,'Swift and Deadly','Doubles the power of crossbows','orange',432e12],
    [60,'Archer\'s Delight','Doubles the power of crossbows','orange',432e13],
    [90,'Flying Knives','Doubles the power of crossbows','orange',432e14],
    [120,'Bronze Arrowhead','Doubles the power of crossbows','orange',432e16],
    [180,'Bow to the Arrow','Doubles the power of crossbows','orange',432e18],
    [240,'Projectiles of Oblivion','Doubles the power of crossbows','orange',432e20],
    [300,'Double Load','Doubles the power of crossbows','orange',432e22],
    [360,'Poetic Speed','Doubles the power of crossbows','orange',432e24],
    [420,'Ancient Gun','Doubles the power of crossbows','orange',432e26],
    [480,'Fly to Kill','Doubles the power of crossbows','orange',432e28],
    [540,'Mechanism of Demise','Doubles the power of crossbows','orange',432e30]
  ],

  crossbows2:[
    [20,'Swift Support','Every crossbow increases the effect catapults have on humans','pink',932e12,'Combat Contraption'],
    [70,'Ingenious Inventions','Every crossbow increases the effect catapults have on humans','pink',932e13,'Combat Contraption'],
    [110,'Speedy Assistance','Every crossbow increases the effect catapults have on humans','pink',432e15,'Combat Contraption'],
    [170,'Shoot Out!','Every crossbow increases the effect catapults have on humans','pink',432e17,'Combat Contraption']
  ],

  cheiroballistras:[
    [15,'The Ballistras League','Doubles the power of humans. Humans gain +100% per cheiroballistra','pink',2592e12,'folk craft'],
    [1,'Deadly Invention','Doubles the power of cheiroballistras','darkred',5184e10],
    [5,'Artillery of Gods','Doubles the power of cheiroballistras','darkred',5184e11],
    [30,'Crush with Might','Doubles the power of cheiroballistras','darkred',5184e12],
    [60,'Machines of Death','Doubles the power of cheiroballistras','darkred',5184e13],
    [90,'Death From the Skies','Doubles the power of cheiroballistras','darkred',5184e14],
    [120,'Hungry to Kill','Doubles the power of cheiroballistras','darkred',5184e16],
    [180,'God of Extinction','Doubles the power of cheiroballistras','darkred',5184e18],
    [240,'Your Siege Will Fail!','Doubles the power of cheiroballistras','darkred',5184e20],
    [300,'Bolts of Pain','Doubles the power of cheiroballistras','darkred',5184e22],
    [360,'Arrow Machine','Doubles the power of cheiroballistras','darkred',5184e24],
    [420,'Death Will Be Quick','Doubles the power of cheiroballistras','darkred',5184e26],
    [480,'Grim Reaper\'s Patron','Doubles the power of cheiroballistras','darkred',5184e28],
    [540,'Swift Annihilation','Doubles the power of cheiroballistras','darkred',5184e30],
  ],

  cheiroballistras2:[
    [20,'Strange Technology','Every cheiroballistra increases the effect crossbows have on catapults','pink',9184e12,'Devious Apparatus'],
    [70,'Modern War','Every cheiroballistra increases the effect crossbows have on catapults','pink',9184e13,'Devious Apparatus'],
    [110,'Strong Defense','Every cheiroballistra increases the effect crossbows have on catapults','pink',5184e15,'Devious Apparatus'],
    [170,'Clever Machinery','Every cheiroballistra increases the effect crossbows have on catapults','pink',5184e17,'Devious Apparatus']
  ],

  cannibals:[
    [1,'Bones Crusher','Doubles the power of cannibals','lightgreen_dark',62208e9],
    [5,'Sharper Teeth','Doubles the power of cannibals','lightgreen_dark',62208e10],
    [30,'Eat Them All!','Doubles the power of cannibals','lightgreen_dark',62208e11],
    [60,'Mighty Hunger','Doubles the power of cannibals','lightgreen_dark',62208e12],
    [90,'Double Stomach','Doubles the power of cannibals','lightgreen_dark',62208e13],
    [120,'Deadly Appetite','Doubles the power of cannibals','lightgreen_dark',62208e15],
    [180,'The Big Swallow','Doubles the power of cannibals','lightgreen_dark',62208e17],
    [240,'Devoured Whole','Doubles the power of cannibals','lightgreen_dark',62208e19],
    [300,'Don\'t Fall Asleep!','Doubles the power of cannibals','lightgreen_dark',62208e21],
    [360,'Dreadful Dinner','Doubles the power of cannibals','lightgreen_dark',62208e23],
    [420,'Dining Out','Doubles the power of cannibals','lightgreen_dark',62208e25],
    [480,'Craving for Flesh','Doubles the power of cannibals','lightgreen_dark',62208e27],
    [540,'Last Meal','Doubles the power of cannibals','lightgreen_dark',62208e29],
  ],

  dragon1:[
    [1,'Falkor\'s Meal','Increases the power of Falkor','dragon1',1e17,'dragon magic'],
    [5,'Falkor\'s Training','Increases the power of Falkor','dragon1',1e18,'dragon magic'],
    [30,'Falkor\'s Armor','Increases the power of Falkor','dragon1',1e19,'dragon magic'],
    [60,'Falkor\'s Enthusiasm','Increases the power of Falkor','dragon1',1e20,'dragon magic'],
    [90,'Falkor\'s Defense','Increases the power of Falkor','dragon1',1e21,'dragon magic'],
    [120,'Falkor\'s Mood','Increases the power of Falkor','dragon1',1e23,'dragon magic'],
    [180,'Falkor\'s Flight','Increases the power of Falkor','dragon1',1e25,'dragon magic'],
    [240,'Falkor\'s Roar','Increases the power of Falkor','dragon1',1e27,'dragon magic'],
    [300,'Falkor\'s Force','Increases the power of Falkor','dragon1',1e29,'dragon magic'],
    [360,'Falkor\'s Inspiration','Increases the power of Falkor','dragon1',1e31,'dragon magic'],
    [420,'Falkor\'s Tailwind','Increases the power of Falkor','dragon1',1e33,'dragon magic'],
    [480,'Falkor\'s Focus','Increases the power of Falkor','dragon1',1e35,'dragon magic'],
    [540,'Falkor\'s Ornament','Increases the power of Falkor','dragon1',1e37,'dragon magic'],
  ],

  dragon2:[
    [1,'Dagahra\'s Meal','Increases the power of Dagahra','dragon2',12e17,'dragon magic'],
    [5,'Dagahra\'s Training','Increases the power of Dagahra','dragon2',12e18,'dragon magic'],
    [30,'Dagahra\'s Armor','Increases the power of Dagahra','dragon2',12e19,'dragon magic'],
    [60,'Dagahra\'s Enthusiasm','Increases the power of Dagahra','dragon2',12e20,'dragon magic'],
    [90,'Dagahra\'s Defense','Increases the power of Dagahra','dragon2',12e21,'dragon magic'],
    [120,'Dagahra\'s Mood','Increases the power of Dagahra','dragon2',12e23,'dragon magic'],
    [180,'Dagahra\'s Flight','Increases the power of Dagahra','dragon2',12e25,'dragon magic'],
    [240,'Dagahra\'s Roar','Increases the power of Dagahra','dragon2',12e27,'dragon magic'],
    [300,'Dagahra\'s Force','Increases the power of Dagahra','dragon2',12e29,'dragon magic'],
    [360,'Dagahra\'s Inspiration','Increases the power of Dagahra','dragon2',12e31,'dragon magic'],
    [420,'Dagahra\'s Tailwind','Increases the power of Dagahra','dragon2',12e33,'dragon magic'],
    [480,'Dagahra\'s Focus','Increases the power of Dagahra','dragon2',12e35,'dragon magic'],
    [540,'Dagahra\'s Ornament','Increases the power of Dagahra','dragon2',12e37,'dragon magic'],
  ],

  dragon3:[
    [1,'Eborsisk\'s Meal','Increases the power of Eborsisk','dragon3',144e17,'dragon magic'],
    [5,'Eborsisk\'s Training','Increases the power of Eborsisk','dragon3',144e18,'dragon magic'],
    [30,'Eborsisk\'s Armor','Increases the power of Eborsisk','dragon3',144e19,'dragon magic'],
    [60,'Eborsisk\'s Enthusiasm','Increases the power of Eborsisk','dragon3',144e20,'dragon magic'],
    [90,'Eborsisk\'s Defense','Increases the power of Eborsisk','dragon3',144e21,'dragon magic'],
    [120,'Eborsisk\'s Mood','Increases the power of Eborsisk','dragon3',144e23,'dragon magic'],
    [180,'Eborsisk\'s Flight','Increases the power of Eborsisk','dragon3',144e25,'dragon magic'],
    [240,'Eborsisk\'s Roar','Increases the power of Eborsisk','dragon3',144e27,'dragon magic'],
    [300,'Eborsisk\'s Force','Increases the power of Eborsisk','dragon3',144e29,'dragon magic'],
    [360,'Eborsisk\'s Inspiration','Increases the power of Eborsisk','dragon3',144e31,'dragon magic'],
    [420,'Eborsisk\'s Tailwind','Increases the power of Eborsisk','dragon3',144e33,'dragon magic'],
    [480,'Eborsisk\'s Focus','Increases the power of Eborsisk','dragon3',144e35,'dragon magic'],
    [540,'Eborsisk\'s Ornament','Increases the power of Eborsisk','dragon3',144e37,'dragon magic'],
  ],

  dragon4:[
    [1,'Smaug\'s Meal','Increases the power of Smaug','dragon4',1728e17,'dragon magic'],
    [5,'Smaug\'s Training','Increases the power of Smaug','dragon4',1728e18,'dragon magic'],
    [30,'Smaug\'s Armor','Increases the power of Smaug','dragon4',1728e19,'dragon magic'],
    [60,'Smaug\'s Enthusiasm','Increases the power of Smaug','dragon4',1728e20,'dragon magic'],
    [90,'Smaug\'s Defense','Increases the power of Smaug','dragon4',1728e21,'dragon magic'],
    [120,'Smaug\'s Mood','Increases the power of Smaug','dragon4',1728e23,'dragon magic'],
    [180,'Smaug\'s Flight','Increases the power of Smaug','dragon4',1728e25,'dragon magic'],
    [240,'Smaug\'s Roar','Increases the power of Smaug','dragon4',1728e27,'dragon magic'],
    [300,'Smaug\'s Force','Increases the power of Smaug','dragon4',1728e29,'dragon magic'],
    [360,'Smaug\'s Inspiration','Increases the power of Smaug','dragon4',1728e31,'dragon magic'],
    [420,'Smaug\'s Tailwind','Increases the power of Smaug','dragon4',1728e33,'dragon magic'],
    [480,'Smaug\'s Focus','Increases the power of Smaug','dragon4',1728e35,'dragon magic'],
    [540,'Smaug\'s Ornament','Increases the power of Smaug','dragon4',1728e37,'dragon magic'],
  ],

  dragon5:[
    [1,'Katla\'s Meal','Increases the power of Katla','dragon5',20736e17,'dragon magic'],
    [5,'Katla\'s Training','Increases the power of Katla','dragon5',20736e18,'dragon magic'],
    [30,'Katla\'s Armor','Increases the power of Katla','dragon5',20736e19,'dragon magic'],
    [60,'Katla\'s Enthusiasm','Increases the power of Katla','dragon5',20736e20,'dragon magic'],
    [90,'Katla\'s Defense','Increases the power of Katla','dragon5',20736e21,'dragon magic'],
    [120,'Katla\'s Mood','Increases the power of Katla','dragon5',20736e23,'dragon magic'],
    [180,'Katla\'s Flight','Increases the power of Katla','dragon5',20736e25,'dragon magic'],
    [240,'Katla\'s Roar','Increases the power of Katla','dragon5',20736e27,'dragon magic'],
    [300,'Katla\'s Force','Increases the power of Katla','dragon5',20736e29,'dragon magic'],
    [360,'Katla\'s Inspiration','Increases the power of Katla','dragon5',20736e31,'dragon magic'],
    [420,'Katla\'s Tailwind','Increases the power of Katla','dragon5',20736e33,'dragon magic'],
    [480,'Katla\'s Focus','Increases the power of Katla','dragon5',20736e35,'dragon magic'],
    [540,'Katla\'s Ornament','Increases the power of Katla','dragon5',20736e37,'dragon magic'],
  ],

  hammer:[
    [1e3,'Hammer\'s Soul','The Tower of Metals gains +1 for every unit of other towers','pink',50e3,'folk magic'],
    [1e5,'Tin Hammer','Doubles the power of the hammer. Hammer gains +10% per blacksmith','pink',5e6,'folk magic'],
    [1e6,'Tin Hammer','Doubles the power of the hammer. Hammer gains +50% per blacksmith','pink',5e7,'folk magic'],
    [1e7,'Bronze Hammer','Doubles the power of the hammer. Hammer gains +100% per blacksmith','pink',5e8,'folk magic'],
    [1e8,'Bronze Hammer','Doubles the power of the hammer. Hammer gains +250% per blacksmith','pink',5e9,'folk magic'],
    [1e9,'Silver Hammer','Doubles the power of the hammer. Hammer gains +250% per blacksmith','pink',5e10,'folk magic'],
    [1e10,'Silver Hammer','Doubles the power of the hammer. Hammer gains +500% per blacksmith','pink',5e11,'folk magic'],
    [1e11,'Golden Hammer','Doubles the power of the hammer. Hammer gains +500% per blacksmith','pink',5e12,'folk magic'],
    [1e13,'Diamond Hammer','Doubles the power of the hammer. Hammer gains +500% per blacksmith','pink',5e14,'folk magic'],
    [1e15,'Ultimate Hammer','Doubles the power of the hammer. Hammer gains +500% per blacksmith','pink',5e16,'folk magic'],
    [1e17,'Divine Force','Doubles the power of the hammer. Hammer gains +1000% per blacksmith','pink',5e18,'folk magic'],
    [1e19,'Hammer of the Gods','Doubles the power of the hammer. Hammer gains +1000% per blacksmith','pink',5e20,'folk magic'],
    [1e21,'Galactic Forge','Doubles the power of the hammer. Hammer gains +1000% per blacksmith','pink',5e22,'folk magic'],
    [1e23,'Beyond Perfection','Doubles the power of the hammer. Hammer gains +1000% per blacksmith','pink',5e24,'folk magic']
  ],

  medallions:[
    [5,'Gold Pebbles','Every stone of the outer wall boosts the rate','yellow',5e7,'Masonry'],
    [10,'Stones of Gold','Every stone of the outer wall boosts the rate even more','yellow',5e10,'Masonry'],
    [20,'Walled Wealth','Every stone of the outer wall boosts the rate even more','yellow',5e13,'Masonry'],
    [30,'Gold Bricks','Every stone of the outer wall boosts the rate even more','yellow',5e16,'Masonry'],
    [40,'Gilded Fortifications','Every stone of the outer wall boosts the rate even more','yellow',5e19,'Masonry'],
    [50,'Gold Shower','Every stone of the outer wall boosts the rate even more','yellow',5e22,'Masonry'],
    [60,'Columns of Gold','Every stone of the outer wall boosts the rate even more','yellow',5e25,'Masonry'],
    [70,'Opulence','Every stone of the outer wall boosts the rate even more','yellow',5e28,'Masonry'],
    [80,'Safety is Profitable','Every stone of the outer wall boosts the rate even more','yellow',5e31,'Masonry'],
    [90,'Gilded Age','Every stone of the outer wall boosts the rate even more','yellow',5e34,'Masonry'],
    [100,'Bathe in Gold','Every stone of the outer wall boosts the rate even more','yellow',5e37,'Masonry'],
    [125,'Higher Standards','Every stone of the outer wall boosts the rate even more','yellow',5e40,'Masonry'],
    [150,'Gold Standard','Every stone of the outer wall boosts the rate even more','yellow',5e43,'Masonry'],
    [175,'Precious Stones','Every stone of the outer wall boosts the rate even more','yellow',5e46,'Masonry'],
    [200,'Pure Gold','Every stone of the outer wall boosts the rate even more','yellow',5e49,'Masonry'],
    [250,'Gold Ingots','Every stone of the outer wall boosts the rate even more','yellow',5e52,'Masonry'],
    [300,'Wall of Gold','Every stone of the outer wall boosts the rate even more','yellow',5e55,'Masonry']
  ],

  counter:[
    [5e4,'Massive Gates','Boosts rate by 1%','fortress',1e6,'fortress'],
    [25e4,'Fortified Bridge','Boosts rate by 1%','fortress',5e6,'fortress'],
    [5e5,'Stone Walls','Boosts rate by 1%','fortress',10e6,'fortress'],
    [25e5,'Deep Moat','Boosts rate by 1%','fortress',50e6,'fortress'],
    [5e6,'Reinforced Wine Cellar','Boosts rate by 2%','fortress',100e6,'fortress'],
    [25e6,'Arrow Supplies','Boosts rate by 2%','fortress',500e6,'fortress'],
    [50e6,'Guards of the Outer Wall','They complain, but still boost rate by 2%','fortress',5e9,'fortress'],
    [25e7,'Earthworks','Boosts rate by 2%','fortress',50e9,'fortress'],
    [50e7,'Bronze Locks','Boosts rate by 3%','fortress',500e9,'fortress'],
    [25e8,'Fierce Hounds','Boosts rate by 3%','fortress',5e12,'fortress'],
    [50e8,'Arrowslits','Boosts rate by 3%','fortress',50e12,'fortress'],
    [25e9,'Monsters in the Moat','Boosts rate by 3%','fortress',500e12,'fortress'],
    [50e9,'Underground Tunnels','Boosts rate by 4%','fortress',5e15,'fortress'],
    [25e10,'Wheat Supplies','Boosts rate by 4%','fortress',50e15,'fortress'],
    [50e10,'Barrels of Wine','Boosts rate by 4%','fortress',500e15,'fortress'],
    [25e11,'Balistraria','Boosts rate by 4%','fortress',5e18,'fortress'],
    [50e11,'Blood Magic Aura','Boosts rate by 5%','fortress',50e18,'fortress'],
    [25e12,'Elite Guard','Boosts rate by 5%','fortress',500e18,'fortress'],
    [50e12,'Dwarf Supremacy','Boosts rate by 5%','fortress',5e21,'fortress'],
    [25e13,'Reinforced Towers','Boosts rate by 5%','fortress',50e21,'fortress']
  ],

  messengers:[
    [6,'Drinks and Gambling','Messengers arrive twice as frequently and stay in town twice as long','blue',650e8,'royal post'],
    [25,'Fresh Horses','Messengers arrive twice as frequently and stay in town twice as long','blue',65e11,'royal post'],
    [66,'Unadulterated Entertainment','Messengers stay in town twice as long','blue',65e14,'royal post'],
  ],

  snails:[
    [2,'Deeper Pockets','Doubles the amount Snail Network is able to retrieve','blue',0,'snail network'],
    [4,'Sharper Sight','Doubles the amount Snail Network is able to retrieve','blue',0,'snail network'],
    [6,'Stickier Fingers','Doubles the amount Snail Network is able to retrieve','blue',0,'snail network'],
  ]

};
var hauntedUpgrades={

  milestones:[10,50,100,150,200,250,300,350,400,450,500,550,600,666],


  skeletons:[
    [10,'Sturdy Bones','Increases the power of skeletons','ogres',1e3],
    [50,'Chests of Void','Increases the power of skeletons','ogres',1e5],
    [100,'Death Grip','Increases the power of skeletons','ogres',1e7],
    [150,'Reinforced Skulls','Increases the power of skeletons','ogres',1e9],
    [200,'Heavy Cloak','Increases the power of skeletons','ogres',1e11],
    [250,'Formidable Staff','Increases the power of skeletons','ogres',1e13],
    [300,'Hollow Eyes','Increases the power of skeletons','ogres',1e15],
    [350,'Swift Reassembly','Increases the power of skeletons','ogres',1e17],
    [400,'Rusty Swords','Increases the power of skeletons','ogres',1e20],
    [450,'Bone Salt','Increases the power of skeletons','ogres',1e23],
    [500,'Gveffermeier','Increases the power of skeletons','ogres',1e26],
    [550,'Menacing Ossein','Increases the power of skeletons','ogres',1e29],
    [600,'Carcass Revolt','Increases the power of skeletons','ogres',1e32],
    [666,'Devil\'s Soldier','Increases the power of skeletons','ogres',1e35]
  ],

  spirits:[
    [10,'Silent Observer','Increases the power of spirits','blue',1e4],
    [50,'Eyes of the Deceased','Increases the power of spirits','blue',1e7],
    [100,'Mystic Whisper','Increases the power of spirits','blue',1e10],
    [150,'Visions From Beyond','Increases the power of spirits','blue',1e13],
    [200,'Animator of the Undead','Increases the power of spirits','blue',1e16],
    [250,'Enigma of the Dead','Increases the power of spirits','blue',1e19],
    [300,'Silent Power','Increases the power of spirits','blue',1e22],
    [350,'Neverseen','Increases the power of spirits','blue',1e25],
    [400,'Door to the Other Side','Increases the power of spirits','blue',1e29],
    [450,'Vivid Impression','Increases the power of spirits','blue',1e33],
    [500,'Ethereal Channel','Increases the power of spirits','blue',1e37],
    [550,'Voices of the Dead','Increases the power of spirits','blue',1e40],
    [600,'Ocean of Terror','Increases the power of spirits','blue',1e43],
    [666,'Devil\'s Advisor','Increases the power of spirits','blue',1e46]
  ],

  specters:[
    [10,'Face in the Mirror','Increases the power of specters','purple',1e8],
    [50,'Glorious Apparition','Increases the power of specters','purple',1e10],
    [100,'Cold Touch','Increases the power of specters','purple',1e12],
    [150,'Telekinesis','Increases the power of specters','purple',1e14],
    [200,'See Through Walls','Increases the power of specters','purple',1e16],
    [250,'Weapons of the Spirits','Increases the power of specters','purple',1e18],
    [300,'Ghostly Daggers','Increases the power of specters','purple',1e20],
    [350,'Visages of the Past','Increases the power of specters','purple',1e22],
    [400,'Animated Shroud','Increases the power of specters','purple',1e24],
    [450,'Illussions Connoisseur','Increases the power of specters','purple',1e26],
    [500,'The Ultimate Lurker','Increases the power of specters','purple',1e28],
    [550,'Shadow Expert','Increases the power of specters','purple',1e30],
    [600,'Treacherous Shapes','Increases the power of specters','purple',1e32],
    [666,'Devil\'s Messenger','Increases the power of specters','purple',1e34]
  ],

  succubi:[
    [10,'An Eye for Evil','Increases the power of succubi','darkred',1e10],
    [50,'Demonic Touch','Increases the power of succubi','darkred',1e12],
    [100,'Earth Wanderer','Increases the power of succubi','darkred',1e14],
    [150,'Seduction Galore','Increases the power of succubi','darkred',1e16],
    [200,'Dreams Invasion','Increases the power of succubi','darkred',1e18],
    [250,'Dark Enchantress','Increases the power of succubi','darkred',1e20],
    [300,'Wicked Mistress','Increases the power of succubi','darkred',1e22],
    [350,'Wielding Passion','Increases the power of succubi','darkred',1e24],
    [400,'Fiery Temptation','Increases the power of succubi','darkred',1e27],
    [450,'Daughter of Mischief','Increases the power of succubi','darkred',1e30],
    [500,'Gaze Lock','Increases the power of succubi','darkred',1e33],
    [550,'Exquisite Deception','Increases the power of succubi','darkred',1e36],
    [600,'Archseductress','Increases the power of succubi','darkred',1e39],
    [666,'Devil\'s Children','Increases the power of succubi','darkred',1e42]
  ],

  ghouls:[
    [10,'Graverobber','Increases the power of ghouls','ghouls',1e12],
    [50,'Flesh Devourer','Increases the power of ghouls','ghouls',1e14],
    [100,'Corpse Collector','Increases the power of ghouls','ghouls',1e16],
    [150,'Coins Stealer','Increases the power of ghouls','ghouls',1e18],
    [200,'Desert Dweller','Increases the power of ghouls','ghouls',1e20],
    [250,'Demonic Pet','Increases the power of ghouls','ghouls',1e22],
    [300,'Night Slayer','Increases the power of ghouls','ghouls',1e24],
    [350,'Shapeshifter','Increases the power of ghouls','ghouls',1e26],
    [400,'Hungry Trespasser','Increases the power of ghouls','ghouls',1e29],
    [450,'Voracious Mouths','Increases the power of ghouls','ghouls',1e32],
    [500,'Hateful Claws','Increases the power of ghouls','ghouls',1e35],
    [550,'Mind Animalistic','Increases the power of ghouls','ghouls',1e38],
    [600,'Deathly Appetite','Increases the power of ghouls','ghouls',1e41],
    [666,'Devil\'s Servant','Increases the power of ghouls','ghouls',1e44]
  ],

  ghasts:[
    [10,'Summon Thunder','Increases the power of ghasts','purple',1e14],
    [50,'Flood Mastery','Increases the power of ghasts','purple',1e16],
    [100,'Vicious Winds','Increases the power of ghasts','purple',1e18],
    [150,'Defying Gravity','Increases the power of ghasts','purple',1e20],
    [200,'Songs of Death','Increases the power of ghasts','purple',1e22],
    [250,'Endless Rain','Increases the power of ghasts','purple',1e24],
    [300,'Poisoned Wells','Increases the power of ghasts','purple',1e26],
    [350,'Drought Century','Increases the power of ghasts','purple',1e28],
    [400,'Seeds of the Plague','Increases the power of ghasts','purple',1e31],
    [450,'Hellish Heatwave','Increases the power of ghasts','purple',1e33],
    [500,'Deep Tremors','Increases the power of ghasts','purple',1e36],
    [550,'Swarms of Mosquitoes','Increases the power of ghasts','purple',1e39],
    [600,'The Great Famine','Increases the power of ghasts','purple',1e42],
    [666,'Devil\'s Captain','Increases the power of ghasts','purple',1e45]
  ],

  grimlords:[
    [10,'Dread Gatekeeper','Increases the power of grimlords','darkred',1e18],
    [50,'Pillager of Worlds','Increases the power of grimlords','darkred',1e20],
    [100,'Gloom Commander','Increases the power of grimlords','darkred',1e22],
    [150,'Consumer of Continents','Increases the power of grimlords','darkred',1e24],
    [200,'Principal Villain','Increases the power of grimlords','darkred',1e26],
    [250,'Dimensions Collider','Increases the power of grimlords','darkred',1e28],
    [300,'Demon Hordes','Increases the power of grimlords','darkred',1e30],
    [350,'Destroyer of Time','Increases the power of grimlords','darkred',1e32],
    [400,'Enemy of Light','Increases the power of grimlords','darkred',1e35],
    [450,'Destruction of Meaning','Increases the power of grimlords','darkred',1e38],
    [500,'Intergalactic Rampage','Increases the power of grimlords','darkred',1e41],
    [550,'Guardian of Evil','Increases the power of grimlords','darkred',1e44],
    [600,'Dark Elemental','Increases the power of grimlords','darkred',1e47],
    [666,'Devil\'s Planner','Increases the power of grimlords','darkred',1e50]
  ],

  grandliches:[
    [10,'Strategy of Death','Increases the power of grandliches','grandliches',1e20],
    [50,'Source of Darkness','Increases the power of grandliches','grandliches',1e22],
    [100,'Demons Architect','Increases the power of grandliches','grandliches',1e24],
    [150,'Garden of Evil','Increases the power of grandliches','grandliches',1e26],
    [200,'Wicked Foundation','Increases the power of grandliches','grandliches',1e28],
    [250,'Grammar of Chaos','Increases the power of grandliches','grandliches',1e30],
    [300,'Fountain of Lies','Increases the power of grandliches','grandliches',1e32],
    [350,'Adversarial Factor','Increases the power of grandliches','grandliches',1e34],
    [400,'Reign of Violence','Increases the power of grandliches','grandliches',1e37],
    [450,'Face of Nothingness','Increases the power of grandliches','grandliches',1e40],
    [500,'Kingpin of Hell','Increases the power of grandliches','grandliches',1e43],
    [550,'Root of Sorcery','Increases the power of grandliches','grandliches',1e46],
    [600,'Unlife Eternal','Increases the power of grandliches','grandliches',1e49],
    [666,'Devil\'s Accomplice','Increases the power of grandliches','grandliches',1e52]
  ],

  areds:[
    [10,'Unkindness Embodied','Increases the power of areds','mediumvioletred',1e22],
    [50,'Nastiness Galore','Increases the power of areds','mediumvioletred',1e24],
    [100,'Mean Team','Increases the power of areds','mediumvioletred',1e26],
    [150,'Unscrupulous and Shameless','Increases the power of areds','mediumvioletred',1e28],
    [200,'Stolen Dignity','Increases the power of areds','mediumvioletred',1e30],
    [250,'Avarice for Malice','Increases the power of areds','mediumvioletred',1e32],
    [300,'Disreputable and Cowardly','Increases the power of areds','mediumvioletred',1e34],
    [350,'Abject Degradation','Increases the power of areds','mediumvioletred',1e36],
    [400,'Death by a Quadrillion Cuts','Increases the power of areds','mediumvioletred',1e39],
    [450,'Tiny Beasts with Attitude','Increases the power of areds','mediumvioletred',1e42],
    [500,'Unworthy Enemy','Increases the power of areds','mediumvioletred',1e45],
    [550,'Annoyance to the Power of a Centillion','Increases the power of areds','mediumvioletred',1e48],
    [600,'Mosquitoes of Hell','Increases the power of areds','mediumvioletred',1e51],
    [666,'Devil\'s Pet','Increases the power of areds','mediumvioletred',1e54]
  ],

  ardemators:[
    [10,'Majorly Demonic','Increases the power of ardemators','goldenrod',1e24],
    [50,'Massive Demons','Increases the power of ardemators','goldenrod',1e26],
    [100,'Seeing From Afar','Increases the power of ardemators','goldenrod',1e28],
    [150,'This Mass is Not Easy to Ignore','Increases the power of ardemators','goldenrod',1e30],
    [200,'Looks Will Kill','Increases the power of ardemators','goldenrod',1e32],
    [250,'Demonic Eye','Increases the power of ardemators','goldenrod',1e34],
    [300,'Armor of Malevolence','Increases the power of ardemators','goldenrod',1e36],
    [350,'Sight as Weapon','Increases the power of ardemators','goldenrod',1e38],
    [400,'Spikes and Metal','Increases the power of ardemators','goldenrod',1e41],
    [450,'Master of Areds','Increases the power of ardemators','goldenrod',1e43],
    [500,'Unusually Bitter','Increases the power of ardemators','goldenrod',1e46],
    [550,'Explosion on Sight','Increases the power of ardemators','goldenrod',1e49],
    [600,'You Want Me on Your Side','Increases the power of ardemators','goldenrod',1e52],
    [666,'Devil\'s Dredger','Increases the power of ardemators','goldenrod',1e55]
  ],

  archsentinels:[
    [10,'Exterminator of Hope','Increases the power of archsentinels','crimson',1e26],
    [50,'Soul Eater','Increases the power of archsentinels','crimson',1e28],
    [100,'Devourer of Dreams','Increases the power of archsentinels','crimson',1e30],
    [150,'Debasement of Hope','Increases the power of archsentinels','crimson',1e32],
    [200,'Death Knell of Promise','Increases the power of archsentinels','crimson',1e34],
    [250,'Wasted Life','Increases the power of archsentinels','crimson',1e36],
    [300,'Thief of Desires','Increases the power of archsentinels','crimson',1e38],
    [350,'Crushing Demotivation','Increases the power of archsentinels','crimson',1e40],
    [400,'Friend of Ardemators','Increases the power of archsentinels','crimson',1e43],
    [450,'No Escape','Increases the power of archsentinels','crimson',1e46],
    [500,'You Shall Not Pass','Increases the power of archsentinels','crimson',1e49],
    [550,'Evil Executioner','Increases the power of archsentinels','crimson',1e52],
    [600,'Baneful Fiend','Increases the power of archsentinels','crimson',1e55],
    [666,'Devil\'s Bodyguard','Increases the power of archsentinels','crimson',1e58]
  ],

  andlyns:[
    [10,'Rolling Bones','Increases the power of andlyns','orchid',1e28],
    [50,'Faster Than Time','Increases the power of andlyns','orchid',1e30],
    [100,'Clocks Are Worthless','Increases the power of andlyns','orchid',1e32],
    [150,'Endless Rotation','Increases the power of andlyns','orchid',1e34],
    [200,'Abominable and Wretched','Increases the power of andlyns','orchid',1e36],
    [250,'Rewriting History','Increases the power of andlyns','orchid',1e38],
    [300,'Backwards in Time','Increases the power of andlyns','orchid',1e40],
    [350,'Marty Must Die!','Increases the power of andlyns','orchid',1e42],
    [400,'Weaponized Time','Increases the power of andlyns','orchid',1e45],
    [450,'Unwinnable Race','Increases the power of andlyns','orchid',1e48],
    [500,'Debt Collector','Increases the power of andlyns','orchid',1e51],
    [550,'Lost in Time','Increases the power of andlyns','orchid',1e54],
    [600,'Grandfather Killed','Increases the power of andlyns','orchid',1e57],
    [666,'Devil\'s Wheels','Increases the power of andlyns','orchid',1e60]
  ],


};





function init(){

  player.start=Date.now();

  prestige.items=[];
  for (const [key, value] of Object.entries(items)) {prestige.items.push(0);}

}
function commonInit(){
  //inits that are relevant to both init() and loadGame()
  Howler.volume(settings.audio_volume);//default volume
}
function setupTowers(){

  tower0 = {
    name:'Tower of Metals',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    hammer_power:1,
    hammer_rate:1,
    clicks:0,
    click_mined:0,
    blacksmiths:0,
    blacksmiths_power:0.1,
    blacksmiths_price:[15,304.55577357079085,117431245.070028],
    blacksmiths_base_price:15,
    blacksmiths_growth_rate:1.15
  };

  tower1 = {
    name:'Tower of Mortals',
    counter:0,
    current_rate_max:0,
    all_reincarnation_counter:0,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    discontent:{
      overpopulation:300,
      is:[0,0,0,0],
      riot_level:1,
      riot_unit:999,
      frame:0,
      FRAME_MAX:666,
      riot:0,
      selected_unit:-1,
      drinking:0
    },
    thunder:[0,0,0,0],
    weaklings:0,
    weaklings_power:1,
    weaklings_price:[100,2030.3718238052725,782874967.13352],
    weaklings_base_price:1e2,
    dwarves:0,
    dwarves_power:8,
    dwarves_price:[1200,24364.461885663266,9394499605.60224],
    dwarves_base_price:1200,
    humans:0,
    humans_power:42,
    humans_price:[12000,243644.61885663267,93944996056.0224],
    humans_base_price:12e3,
    ogres:0,
    ogres_power:210,
    ogres_price:[144000,2923735.4262795923,1127339952672.2688],
    ogres_base_price:144e3,
    weaklings_retired:0,
    dwarves_retired:0,
    humans_retired:0,
    ogres_retired:0,
    weaklings_temp:0,
    dwarves_temp:0,
    humans_temp:0,
    ogres_temp:0
  };

  tower2 = {
    name:'Tower of Mages',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    wizards:0,
    wizards_power:1155,
    wizards_price:[1728000,35084825.115355104,13528079432067.227],
    wizards_base_price:1728e3,
    warlocks:0,
    warlocks_power:6352,
    warlocks_price:[20736000,421017901.38426125,162336953184806.72],
    warlocks_base_price:20736e3,
    witches:0,
    witches_power:34936,
    witches_price:[248832000,5052214816.611135,1948043438217680.2],
    witches_base_price:248832000,
    wyverns:0,
    wyverns_power:192148,
    wyverns_price:[3000000000,60911154714.15817,23486249014005600],
    wyverns_base_price:3e9
  };

  tower3 = {
    name:'Tower of Machines',
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    catapults:0,
    catapults_power:1070000,
    catapults_price:[36000000000,730933856569.898,281834988168067200],
    catapults_base_price:36e9,
    crossbows:0,
    crossbows_power:5885000,
    crossbows_price:[432000000000,8771206278838.776,3382019858016806400],
    crossbows_base_price:432e9,
    cheiroballistras:0,
    cheiroballistras_power:32367500,
    cheiroballistras_price:[5184000000000,105254475346065.33,40584238296201675000],
    cheiroballistras_base_price:5184e9,
    cannibals:0,
    cannibals_power:178021250,//178021250
    cannibals_price:[62208000000000,419430052800000,1263053704152783.8],
    cannibals_base_price:62208e9,
  };

  dragons_tower = {
    name:'Tower of Dragons',
    show:0,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    dragon1:0,
    dragon1_goal:5,
    dragon1_price:[1000000000000000,20303718238052724,7.8287496713352e+21],
    dragon1_base_price:1e15,
    dragon2:0,
    dragon2_goal:5,
    dragon2_price:[12000000000000000,243644618856632670,9.39449960560224e+22],
    dragon2_base_price:12e15,
    dragon3:0,
    dragon3_goal:5,
    dragon3_price:[144000000000000000,2923735426279592000,1.1273399526722689e+24],
    dragon3_base_price:144e15,
    dragon4:0,
    dragon4_goal:5,
    dragon4_price:[1728000000000000000,35084825115355103000,1.3528079432067227e+25],
    dragon4_base_price:1728e15,
    dragon5:0,
    dragon5_goal:5,
    dragon5_price:[20736000000000000000,421017901384261300000,1.623369531848067e+26],
    dragon5_base_price:20736e15,
    dragons_multiplier:1,
    factors:[1e3,2e3,3e3,4e3,5e3]
  };

  winecellar = {
    name:'Wine Cellar',
    multiplier:1,
    wine_multiplier:2,
    wine_frame:0,
    wine_frame_max:60,
    duration:0,
    drunk_index:0,
    drunk:[1,1,1,1,1,1,1,1],
    drinking:0,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount:[1,10,100],
    cupsize:0,
    cupsize_power:2,
    cupsize_price:[1000,20303.718238052723,7828749671.335199],
    cupsize_base_price:1000,
    wineage:0,
    wineage_power:0.01,
    wineage_price:[100000,2030371.823805272,782874967133.52],
    wineage_base_price:100000,
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
    diamonds_price:[248831999999999970000,5.052214816611135e+21,1.9480434382176807e+27],
    diamonds_base_price:248832e15
  };

  alchemist = {
    upgrades_clicked:0,
    coins_spent:0,
    growth_rate:1.5,
    price:[500,500,500],
    base_price:500,
    weaklings_multiplier:1,
    dwarves_multiplier:1,
    humans_multiplier:1,
    ogres_multiplier:1,
    hammer_multiplier:1,
    metals_connection:0,
    blacksmiths_multiplier:1,
    medallions_multiplier:0,
    medallions_multiplier_toggle:0,
    wizards_multiplier:1,
    warlocks_multiplier:1,
    witches_multiplier:1,
    wyverns_multiplier:1,
    catapults_multiplier:1,
    crossbows_multiplier:1,
    cheiroballistras_multiplier:1,
    cannibals_multiplier:1,
    counter_multiplier:1,
    blacksmiths_connection:0,
    wizards_strange_upgrades:0,
    warlocks_strange_upgrades:0,
    witches_strange_upgrades:0,
    wyverns_strange_upgrades:0,
    catapults_strange_upgrades:0,
    crossbows_strange_upgrades:0,
    cheiroballistras_strange_upgrades:0,
    weakling_alliance:[0,0,0,0,0,0,0],
    machines_conspiracy:[0,0,0],
    messengers_arrival_modifier:1,
    messengers_stay_modifier:1,
    snail_reward_modifier:1,
    snails_clicked:0,
    minting_counter:0,
    dragons_factor:[1,1,1,1,1],
    lab:[],
    purse:{
      items:[999,999,999],
      potion_stack:0,
      lock:0,
      duration:0,
      min_upgrades_clicked:10,
      max_upgrades_clicked:50
    },
    flask:{
      result:99999,
      amount:1,
      recipe:[],
      ingredients:[],
      error:[0,0,0],
      incoming:0,
      show:0,
      confirm:0,
      tab:0,
      recipe_slots:{
        slot1:[],
        slot2:[],
        slot3:[],
        slot4:[],
        slot5:[]
      }
    },
    aviary:{
      display:[],
      multiplier:1,
      incoming:0,
      show:0,
      full_length:13
    },
    persistent_factors:0,
    prices_state:0,
    blacksmiths:[],
    weaklings:[],
    weaklings2:[],
    dwarves:[],
    humans:[],
    ogres:[],
    wizards:[],
    warlocks:[],
    warlocks2:[],
    witches:[],
    witches2:[],
    wyverns:[],
    wyverns2:[],
    catapults:[],
    catapults2:[],
    crossbows:[],
    crossbows2:[],
    cheiroballistras:[],
    cheiroballistras2:[],
    cannibals:[],
    cannibals2:[],
    hammer:[],
    medallions:[],
    counter:[],
    messengers:[],
    rate:[],
    snails:[],
    dragon1:[],
    dragon2:[],
    dragon3:[],
    dragon4:[],
    dragon5:[]
  };

  medallions = {
    milestones:[10,50,100,150,200,250,300,350,400,450,500,600,700],
    blacksmiths:[],
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
    cannibals:[],
    reward:0,
    power:12,
    list:[],
    vlist:[]
  };

  raiders = {
    base_price:25,
    price:0,
    active:0,
    loot:[999,999,999,999],
    locations_pointer:0,
    locations_index:0,
    locations_runs:[0,0,0,0,0,0,0],
    time:1800,
    counter:0,
    counter_max:0,
    guild:0
  };

  temple = {
    level:1,
    temple_multiplier:1
  },

  player.messengers = {
    messenger_clicks:0,
    messenger_misses:0,
    consecutive_misses:0,
    messenger_time:0,
    timeMin:300,
    timeMax:900
  };

  setupMedallions();
  buildMedallionsList();

  setupAlchemist();

  raiders.price = raiders.base_price - 5*prestige.raiders_price_mod;

  setupGraveyard();

  rateCalc();

}
function Reincarnate(){

  prestige.multiplier = prestige.all_time_mana;
  prestige.souls_multiplier = prestige.all_time_souls;

  prestige.alchemy_persistence_item=alchemist.purse.items[0];

  setupTowers();

  if(prestige.alchemy_persistence==1){
    alchemist.purse.items[0]=prestige.alchemy_persistence_item;
  }
  

  rmana_label.text(0);//updating this label, otherwise it only gets updated in the normal course of the game if the player reloads or when new mana is mined
  rsouls_label.html('Souls captured: <b>0</b>');
  rsouls_multiplier_label.html('Necropolis Level: <b>' + numT(prestige.souls_multiplier) + '</b>' );

  counter1_label.text(0);//so that the old value doesn't flash after reincarnation

  date=Date.now();//resetting time, so that we don't do what's basically offline processing for the time spent in the Infinite Library

  //resetting messengers
  player.messengers.messenger_clicks=0;
  player.messengers.misses=0;
  player.messengers.consecutive_misses=0;
  recalculateMessengersTime();
  messenger.isRunning=0;
  messenger.active=0;

  //resetting notifications
  player.notification.active=0;

  //resetting Treasury counters
  if(prestige.museum==0){
    for (let i = 0; i < prestige.items.length; i++) {
      if(prestige.items[i]>1){prestige.items[i]=0;}
    }
  }else{

    let completeness_check=[0,0];

    for (let i = 0; i < prestige.items.length; i++) {

      if( items[i][4] != 'pack of items' ){ completeness_check[0]++; }
      if(prestige.items[i]>0){completeness_check[1]++;}

    }

    if(completeness_check[0]==completeness_check[1]){ prestige.museum_complete=1; }

    if(prestige.museum_complete==0){
      for (let i = 0; i < prestige.items.length; i++) {
        if(prestige.items[i]>1){prestige.items[i]=1;}
      }
    }

  }

  

  settings.navigation.page='Towers';
  settings.navigation.previous_page='';
  prestige.library.library_switch=0;
  misc_settings.graveyard_setup=0;
  misc_settings.hog_setup=0;
  misc_settings.gandlor_display=0;
  hideMenus();
  body.css('background-image','url("img/bck/towers_e1.jpg")').css('background-position-y',topmost_header.innerHeight()+'px');

  saveGame();

  if(prestige.library.library_switch==0 && session_data.main_loop==null){
    session_data.main_loop=setInterval(loop, 50);
  }

}

//main loop
function loop() {
    diff = Date.now()-date;
    calc(diff/1000);
    date = Date.now();
}
function calc(dt){

  tower1.counter+=dt*current_rate;
  tower1.all_reincarnation_counter+=dt*current_rate;
  prestige.all_time_counter+=dt*current_rate;
  session_data.counter+=dt*current_rate;

  winecellar.wine_frame+=dt;
  if(tower1.discontent.drinking==1){

    if(tower1.discontent.riot==0){tower1.discontent.is[tower1.discontent.selected_unit]+=dt;}
    else if(tower1.discontent.riot==1){tower1.discontent.frame+=dt;}
    
    if(tower1.discontent.is[tower1.discontent.selected_unit]>=tower1.discontent.FRAME_MAX && tower1.discontent.riot==0){
      tower1.discontent.riot=1;//the riot has started!
      rate1_label.css('color','var(--darkred)');
      tower1.discontent.riot_unit=tower1.discontent.selected_unit;
      tower1.discontent.riot_level=1;
      tower1.discontent.frame=0;
      tower1.discontent.is=[0,0,0,0];
      winecellar.wine_frame=winecellar.duration+1;
      notificationMachen('unit'+tower1.discontent.riot_unit+'stage'+tower1.discontent.riot_level);
    }else if(tower1.discontent.frame>=tower1.discontent.FRAME_MAX && tower1.discontent.riot==1){
      tower1.discontent.riot_level++;//riot levels
      tower1.discontent.frame=0;
      winecellar.wine_frame=winecellar.duration+1;
      notificationMachen('unit'+tower1.discontent.riot_unit+'stage'+tower1.discontent.riot_level);

      if(tower1.discontent.riot_level>=10){
        playAudio(17);
        prestige.champs.unlocked[tower1.discontent.selected_unit]=1;
        alchemist.purse.items[0]=999;
        tower1.discontent.riot_level=0;
        tower1.discontent.drinking=0;
        tower1.discontent.riot=2;//riot completed
        notificationMachen('unit'+tower1.discontent.riot_unit+'riotend');
      }

      rateCalc();
      refreshUI();

    }

  }
  if(winecellar.wine_frame>winecellar.duration){
    winecellar.wine_frame=0;
    winecellar.drunk=[1,1,1,1,1,1,1,1];//resetting drinks
    winecellar.drinking=0;
    tower1.discontent.drinking=0;
    if(alchemist.purse.items[1]==0){alchemist.purse.items[1]=999;alchemist.purse.potion_stack=0;}
    rateCalc();
    refreshUI();
  }
  
  player.messengers.messenger_time+=dt;//+=0.05 gives you a 1/s rate, but dt corrects for browser tab lag
  if (Math.random()<Math.pow(Math.max(0,(player.messengers.messenger_time-player.messengers.timeMin)/(player.messengers.timeMax-player.messengers.timeMin)),5)){
    messengerMachen();
  }

  if(messenger.active==1){

    if(messenger.isRunning==1){

      messenger.timeDuration-=dt;
  
        messenger_button.html('<b>' + messenger.title + '</b><br>');
        messenger_button.append(messenger.body + '<br><br>');
        messenger_button.append('<b>Time: ' + Math.floor(messenger.timeDuration) + '</b>');
  
      if(messenger.timeDuration<1){
        messenger.isRunning=0;
        messenger.active=0;
        refreshUI();
      }
  
    }else{
      if(messenger.is!='snail'){messenger.timeStay-=dt;}
      if(messenger.timeStay<=10){messenger.opacity-=0.1*dt;messenger_button.css('opacity',messenger.opacity); }
      if(messenger.timeStay<=0){
        messenger.active=0;
        player.messengers.misses++;
        player.messengers.consecutive_misses++;
        if(messenger.is=='conartist'){
          alchemist.purse.items[0]=63;
          tower1.counter+=messenger.reward;
          tower1.all_reincarnation_counter+=messenger.reward;
          prestige.all_time_counter+=messenger.reward;
          storeState();
        }
        if(player.messengers.consecutive_misses>messenger.missesThreshold){
          messengerMachen('snail');
        }
        refreshUI();
      }
    }

  }

  if(raiders.active==1){

    raiders.counter-=dt;

    if(raiders.counter<=0){

      raiders.counter=0;

      tower1.weaklings_retired -= Math.floor(raiders.price*0.5);
      raiders.active=2;
      raiders.locations_runs[raiders.locations_index]++;
      generateLoot();

      calcRaidTime();//so that next raid time is calculated

      buildMedallionsList(1);
      buyRecalc(1);

      if(alchemist.purse.items[0]==70){
        if(raiders.locations_runs[raiders.locations_index]<locations[raiders.locations_index][4] && raiders.guild<5){
          raiders.guild++;
          setTimeout(function (){lootCollect();}, 1000);
          setTimeout(function (){raiders_button.trigger("click");}, 5000);
        }else{
          setTimeout(function (){alchemist.purse.items[0]=999;lootCollect();}, 1000);
        }
      }

    }

  }




  prestige.garden.tree_age+=dt;




  if(prestige.quests_flag==1){
    if(tower2.wizards==66 && prestige.quests[0]<666){prestige.quests[0]+=0.5+dt;}
    if(tower2.warlocks==66 && prestige.quests[1]<666){prestige.quests[1]+=0.5+dt;}
    if(tower2.witches==66 && prestige.quests[2]<666){prestige.quests[2]+=0.5+dt;}
    if(tower2.wyverns==66 && prestige.quests[3]<666){prestige.quests[3]+=0.5+dt;}
  }


  if(prestige.graveyard==1){
    
    if(graveyard.artifacts[graveyard.artifact_pointer]>=graveyard.artifacts_target){graveyard.artifacts[graveyard.artifact_pointer]=graveyard.artifacts_target;}else{graveyard.artifacts[graveyard.artifact_pointer]+=dt*graveyard.rate;}

    graveyard.counter+=dt*graveyard.rate;
    prestige.all_time_graveyard_counter+=dt*graveyard.rate;

  }


  player.system_frame+=1;
  if(player.system_frame>SYSTEMFRAME_MAX){
    player.system_frame=0;
    if(debug_nosave==0){saveGame();}
  }


  updateCounter();

}
function updateCounter(){

  if( player.system_frame%5==0 ){storeState();}

  if( player.system_frame%50==0 ){

    buildAlchemistList(strangeUpgrades.counter_milestones,tower1.all_reincarnation_counter,alchemist.counter,strangeUpgrades.counter,'F');

    if(winecellar.drinking==1){document.title = '('+Math.ceil(winecellar.duration - winecellar.wine_frame)+') IF v0.5';}else{
      document.title = 'IF v0.5';
    }
    

  }

  if( player.system_frame%2==0 ){

    all_tower_drinking_buttons.html('&#127863;&#xFE0E;').css('color','var(--main_color)');
    

    if(winecellar.drunk[0]>1){

      weaklings_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){weaklings_drink_button.css('color','var(--blue)');}
      else if(alchemist.purse.items[0]==4){
        if(tower1.discontent.riot==0 || (tower1.discontent.riot==1 && tower1.discontent.riot_unit==0)){
          weaklings_drink_button.css('color','var(--darkred)');
        }
      }

      if(alchemist.purse.items[0]==4){mortalUnitButtons(0);}
      
    }

    else if(winecellar.drunk[1]>1){

      dwarves_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){dwarves_drink_button.css('color','var(--blue)');}
      else if(alchemist.purse.items[0]==4){
        if(tower1.discontent.riot==0 || (tower1.discontent.riot==1 && tower1.discontent.riot_unit==1)){
          dwarves_drink_button.css('color','var(--darkred)');
        }
      }

      if(alchemist.purse.items[0]==4){mortalUnitButtons(1);}

    }

    else if(winecellar.drunk[2]>1){

      humans_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){humans_drink_button.css('color','var(--blue)');}
      else if(alchemist.purse.items[0]==4){
        if(tower1.discontent.riot==0 || (tower1.discontent.riot==1 && tower1.discontent.riot_unit==2)){
          humans_drink_button.css('color','var(--darkred)');
        }
      }

      if(alchemist.purse.items[0]==4){mortalUnitButtons(2);}

    }

    else if(winecellar.drunk[3]>1){

      ogres_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){ogres_drink_button.css('color','var(--blue)');}
      else if(alchemist.purse.items[0]==4){
        if(tower1.discontent.riot==0 || (tower1.discontent.riot==1 && tower1.discontent.riot_unit==3)){
          ogres_drink_button.css('color','var(--darkred)');
        }
      }

      if(alchemist.purse.items[0]==4){mortalUnitButtons(3);}

    }

    else if(winecellar.drunk[4]>1){

      wizards_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){wizards_drink_button.css('color','var(--blue)');}

    }

    else if(winecellar.drunk[5]>1){

      warlocks_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){warlocks_drink_button.css('color','var(--blue)');}

    }

    else if(winecellar.drunk[6]>1){

      witches_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){witches_drink_button.css('color','var(--blue)');}

    }

    else if(winecellar.drunk[7]>1){

      wyverns_drink_button.text(Math.ceil(winecellar.duration - winecellar.wine_frame));
      if(alchemist.purse.items[1]==0 && (winecellar.duration-winecellar.wine_frame)>wineDurationCalc()){wyverns_drink_button.css('color','var(--blue)');}

    }



    if(raiders.active==1){
      raiders_button.html('Raid <i class="tiny">in progress</i><div class="tiny">Time: '+Math.floor(raiders.counter)+' sec&nbsp;<img class="sprite" src="img/raider.svg"></div>');
    }



    if(prestige.quests_flag==1){

      if(tower2.wizards==66){
        if(prestige.quests[0]<666){quest1_label.text(Math.floor(prestige.quests[0])+'/666').css('color','var(--main_color');
        }else{quest1_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower2.warlocks==66){
        if(prestige.quests[1]<666){quest2_label.text(Math.floor(prestige.quests[1])+'/666').css('color','var(--main_color');
        }else{quest2_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower2.witches==66){
        if(prestige.quests[2]<666){quest3_label.text(Math.floor(prestige.quests[2])+'/666').css('color','var(--main_color');
        }else{quest3_label.text('666/666').css('color','var(--gray)');}
      }
      if(tower2.wyverns==66){
        if(prestige.quests[3]<666){quest4_label.text(Math.floor(prestige.quests[3])+'/666').css('color','var(--main_color');
        }else{quest4_label.text('666/666').css('color','var(--gray)');}
      }
    }

    if(prestige.graveyard==1){
      if(graveyard.artifacts[0]+graveyard.artifacts[1]+graveyard.artifacts[2]+graveyard.artifacts[3]>=graveyard.artifacts_target*4){
        next_target_button.prop('disabled', false);
      }else{next_target_button.prop('disabled', true);}
    }

    

  }//if( player.system_frame%2==0 )

  
  if(tower1.counter<1000){
    counter1_label.text( parseFloat(tower1.counter).toFixed(2) );
  }else{counter1_label.text(numT(tower1.counter));}
  

  if(prestige.graveyard==1){

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

    case 1: 
      buildAlchemistList(strangeUpgrades.milestones,tower1.weaklings,alchemist.weaklings,strangeUpgrades.weaklings,'W');
      
      if(prestige.alchemist_packages.weaklings2==1){
        buildAlchemistList(strangeUpgrades.weaklings_milestones,tower1.weaklings,alchemist.weaklings2,strangeUpgrades.weaklings2,'E');
      }

      break;

    case 2: 
      buildAlchemistList(strangeUpgrades.milestones,tower1.dwarves,alchemist.dwarves,strangeUpgrades.dwarves,'D');
      break;

    case 3: 
      buildAlchemistList(strangeUpgrades.milestones,tower1.humans,alchemist.humans,strangeUpgrades.humans,'H');
      break;

    case 4: 
      buildAlchemistList(strangeUpgrades.milestones,tower1.ogres,alchemist.ogres,strangeUpgrades.ogres,'Og');
      break;

    case 5:
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower2.wizards,alchemist.wizards,strangeUpgrades.wizards,'Wz');
      buildAlchemistList(strangeUpgrades.milestones,tower2.wizards,alchemist.wizards,strangeUpgrades.wizards,'Wz');
      break;

    case 6: 
    buildAlchemistList(strangeUpgrades.milestones,tower2.warlocks,alchemist.warlocks,strangeUpgrades.warlocks,'Wr');
    if(prestige.alchemist_packages.warlocks2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower2.warlocks,alchemist.warlocks2,strangeUpgrades.warlocks2,'DM');
    }
    break;

    case 7: 
    buildAlchemistList(strangeUpgrades.milestones,tower2.witches,alchemist.witches,strangeUpgrades.witches,'Wi');
    if(prestige.alchemist_packages.witches2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower2.witches,alchemist.witches2,strangeUpgrades.witches2,'TG');
    }
    break;

    case 8: 
    buildAlchemistList(strangeUpgrades.milestones,tower2.wyverns,alchemist.wyverns,strangeUpgrades.wyverns,'Wy');
    if(prestige.alchemist_packages.wyverns2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower2.wyverns,alchemist.wyverns2,strangeUpgrades.wyverns2,'WS');
    }
    break;

    case 9: 
    buildAlchemistList(strangeUpgrades.milestones,tower3.catapults,alchemist.catapults,strangeUpgrades.catapults,'Ca');
    if(prestige.alchemist_packages.catapults2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower3.catapults,alchemist.catapults2,strangeUpgrades.catapults2,'WF');
    }
    break;

    case 10: 
    buildAlchemistList(strangeUpgrades.milestones,tower3.crossbows,alchemist.crossbows,strangeUpgrades.crossbows,'Cr');
    if(prestige.alchemist_packages.crossbows2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower3.crossbows,alchemist.crossbows2,strangeUpgrades.crossbows2,'CC');
    }
    break;

    case 11: 
    buildAlchemistList(strangeUpgrades.milestones,tower3.cheiroballistras,alchemist.cheiroballistras,strangeUpgrades.cheiroballistras,'Ch');
    if(prestige.alchemist_packages.cheiroballistras2==1){
      buildAlchemistList(strangeUpgrades.synergy_milestones,tower3.cheiroballistras,alchemist.cheiroballistras2,strangeUpgrades.cheiroballistras2,'DA');
    }
    break;

    case 12: 
    buildAlchemistList(strangeUpgrades.milestones,tower0.blacksmiths,alchemist.blacksmiths,strangeUpgrades.blacksmiths,'B');
    break;

    case 13:
    buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
    break;

    case 14:
    buildAlchemistList(strangeUpgrades.milestones,dragons_tower.dragon1,alchemist.dragon1,strangeUpgrades.dragon1,'dF');
    break;

    case 15:
    buildAlchemistList(strangeUpgrades.milestones,dragons_tower.dragon2,alchemist.dragon2,strangeUpgrades.dragon2,'dD');
    break;

    case 16:
    buildAlchemistList(strangeUpgrades.milestones,dragons_tower.dragon3,alchemist.dragon3,strangeUpgrades.dragon3,'dE');
    break;

    case 17:
    buildAlchemistList(strangeUpgrades.milestones,dragons_tower.dragon4,alchemist.dragon4,strangeUpgrades.dragon4,'dS');
    break;

    case 18:
    buildAlchemistList(strangeUpgrades.milestones,dragons_tower.dragon5,alchemist.dragon5,strangeUpgrades.dragon5,'dK');
    break;

  }

  if(alchemist.purse.items[1]==0){ winecellar.duration = 900*alchemist.purse.potion_stack + wineDurationCalc(); }
  else{
    winecellar.duration= wineDurationCalc();
  }

  rateCalc();
  storeState();
  refreshUI();

}
function clickRecalc(){

  hammerRateCalc();
  buildAlchemistList(strangeUpgrades.hammer_milestones,tower0.click_mined,alchemist.hammer,strangeUpgrades.hammer,'Hr');
  storeState();

}
function hammerRateCalc(){
  if(messenger.isRunning==1){

    tower0.hammer_rate = messenger.hammer_multiplier;
  
  }else{

    tower0.hammer_rate = tower0.hammer_power * alchemist.hammer_multiplier;

    if(alchemist.metals_connection==1){tower0.hammer_rate += 1*countAllTowerUnits();}

    if(alchemist.blacksmiths_connection>0){tower0.hammer_rate *= 1 + 0.01*alchemist.blacksmiths_connection*tower0.blacksmiths;}

  }
}
function rateCalc(){

  tower1.weaklings_temp=tower1.thunder[0];
  tower1.dwarves_temp=tower1.thunder[1];
  tower1.humans_temp=tower1.thunder[2];
  tower1.ogres_temp=tower1.thunder[3];

  //tower0.blacksmiths>=10 condition prevents additional units having effect before the tower is unlocked
  if(alchemist.purse.items[0]==12 && tower0.blacksmiths>=10){tower1.weaklings_temp+=90;}
  else if(alchemist.purse.items[0]==13 && tower0.blacksmiths>=10){tower1.dwarves_temp+=90;}
  else if(alchemist.purse.items[0]==41 && tower0.blacksmiths>=10){tower1.dwarves_temp+=90;}
  else if(alchemist.purse.items[0]==48 && tower0.blacksmiths>=10){tower1.dwarves_temp+=180;}
  else if(alchemist.purse.items[0]==14 && tower0.blacksmiths>=10){tower1.humans_temp+=90;}
  else if(alchemist.purse.items[0]==15 && tower0.blacksmiths>=10){tower1.ogres_temp+=90;}
  else if(alchemist.purse.items[0]==25 && tower0.blacksmiths>=10){tower1.weaklings_temp+=100;tower1.dwarves_temp+=100;tower1.humans_temp+=100;tower1.ogres_temp+=100;}

  if(prestige.champs.unlocked[0]==1 && tower0.blacksmiths>=10){tower1.weaklings_temp+=100;}
  if(prestige.champs.unlocked[1]==1 && tower0.blacksmiths>=10){tower1.dwarves_temp+=100;}
  if(prestige.champs.unlocked[2]==1 && tower0.blacksmiths>=10){tower1.humans_temp+=100;}
  if(prestige.champs.unlocked[3]==1 && tower0.blacksmiths>=10){tower1.ogres_temp+=100;}

  var wizards_incantations=1;
  var weaponcraft=1;
  var weaklings=tower1.weaklings+tower1.weaklings_temp-tower1.weaklings_retired;
  var dwarves=tower1.dwarves+tower1.dwarves_temp;
  var humans=tower1.humans+tower1.humans_temp;
  var ogres=tower1.ogres+tower1.ogres_temp;

  if(alchemist.wizards_strange_upgrades>0){
    wizards_incantations=1+0.01*tower2.wizards*(alchemist.wizards_strange_upgrades+tower2.warlocks*(alchemist.warlocks_strange_upgrades+tower2.witches*(alchemist.witches_strange_upgrades+tower2.wyverns*alchemist.wyverns_strange_upgrades)));
  }

  if(alchemist.catapults_strange_upgrades>0){
    weaponcraft=1+0.01*tower3.catapults*(alchemist.catapults_strange_upgrades+tower3.crossbows*(alchemist.crossbows_strange_upgrades+tower3.cheiroballistras*alchemist.cheiroballistras_strange_upgrades));
  }

  winecellar.multiplier=winecellar.wine_multiplier+(winecellar.wineage * (winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power));

  current_rate=0;

  metals_rate = tower0.blacksmiths * ( tower0.blacksmiths_power  ) * alchemist.blacksmiths_multiplier;

  if(alchemist.metals_connection==1){metals_rate += 0.1*countAllTowerUnits();}

  current_rate += metals_rate;



  mortals_rate[0] = weaklings * tower1.weaklings_power * winecellar.drunk[0] * alchemist.weaklings_multiplier * wizards_incantations * Math.pow(2,prestige.garden.fortifications[0]);
  mortals_rate[1] = dwarves * tower1.dwarves_power * winecellar.drunk[1] * dragons_tower.dragons_multiplier * alchemist.dwarves_multiplier * Math.pow(2,prestige.garden.fortifications[1]);
  mortals_rate[2] = humans * tower1.humans_power * winecellar.drunk[2] * alchemist.humans_multiplier * weaponcraft * Math.pow(2,prestige.garden.fortifications[2]);
  mortals_rate[3] = ogres * tower1.ogres_power * winecellar.drunk[3] * alchemist.ogres_multiplier * Math.pow(2,prestige.garden.fortifications[3]);

  //weakling alliance
  if(alchemist.weakling_alliance[0]==1){mortals_rate[1] *= 1 + 0.01*weaklings;}
  if(alchemist.weakling_alliance[1]==1){mortals_rate[2] *= 1 + 0.01*weaklings;}
  if(alchemist.weakling_alliance[2]==1){mortals_rate[3] *= 1 + 0.01*weaklings;}

  //machines conspiracy
  if(alchemist.machines_conspiracy[0]==1){mortals_rate[2] *= 1 + 0.01*tower3.catapults;}
  if(alchemist.machines_conspiracy[1]==1){mortals_rate[2] *= 1 + 0.1*tower3.crossbows;}
  if(alchemist.machines_conspiracy[2]==1){mortals_rate[2] *= 1 + tower3.cheiroballistras;}

  current_rate += mortals_rate[0]+mortals_rate[1]+mortals_rate[2]+mortals_rate[3];



  mages_rate[0] = tower2.wizards * tower2.wizards_power * winecellar.drunk[4] * alchemist.wizards_multiplier * Math.pow(2,prestige.garden.fortifications[4]);
  mages_rate[1] = tower2.warlocks * tower2.warlocks_power * winecellar.drunk[5] * alchemist.warlocks_multiplier * Math.pow(2,prestige.garden.fortifications[5]);
  mages_rate[2] = tower2.witches * tower2.witches_power * winecellar.drunk[6] * alchemist.witches_multiplier * Math.pow(2,prestige.garden.fortifications[6]);
  mages_rate[3] = tower2.wyverns * tower2.wyverns_power * winecellar.drunk[7] * alchemist.wyverns_multiplier * Math.pow(2,prestige.garden.fortifications[7]);

  //weakling alliance
  if(alchemist.weakling_alliance[3]==1){mages_rate[0] *= 1 + 0.01*weaklings;}
  if(alchemist.weakling_alliance[4]==1){mages_rate[1] *= 1 + 0.01*weaklings;}
  if(alchemist.weakling_alliance[5]==1){mages_rate[2] *= 1 + 0.01*weaklings;}
  if(alchemist.weakling_alliance[6]==1){mages_rate[3] *= 1 + 0.01*weaklings;}

  current_rate += mages_rate[0]+mages_rate[1]+mages_rate[2]+mages_rate[3];


  machines_rate[0] = tower3.catapults * tower3.catapults_power * alchemist.catapults_multiplier * Math.pow(2,prestige.garden.fortifications[8]);
  machines_rate[1] = tower3.crossbows * tower3.crossbows_power * alchemist.crossbows_multiplier * Math.pow(2,prestige.garden.fortifications[9]);
  machines_rate[2] = tower3.cheiroballistras * tower3.cheiroballistras_power * alchemist.cheiroballistras_multiplier * Math.pow(2,prestige.garden.fortifications[10]);
  if(tower2.wyverns>=10){//to prevent the effect of cannibals before the tower is unlocked
    machines_rate[3] = tower3.cannibals * tower3.cannibals_power * alchemist.cannibals_multiplier * Math.pow(2,prestige.garden.fortifications[11]) * 0.1 * countAllLivingUnits();
  }else{
    machines_rate[3] = 0;
  }
  

  current_rate += machines_rate[0]+machines_rate[1]+machines_rate[2]+machines_rate[3];



  if(alchemist.medallions_multiplier_toggle==1){
    let ring_of_mortals=1;
    if(prestige.temple.rings[0]==1){ring_of_mortals=2;}//currently not implemented
    current_rate *= 1+alchemist.medallions_multiplier*medallions.vlist.length*ring_of_mortals;
  }

  current_rate *= alchemist.counter_multiplier;//fortress multiplier
  
  if(prestige.multiplier>1 && prestige.blessing==1){
    current_rate *= 1 + 0.01*prestige.multiplier;
  }


  if(alchemist.purse.items[0]==5){current_rate *= 0.7;}//qverin
  else if(alchemist.purse.items[0]==7){current_rate *= 1.25;}//peacock
  else if(alchemist.purse.items[0]==48){current_rate *= 1.15;}//flamingo
  else if(alchemist.purse.items[0]==8){current_rate *= 1.05;}//owl
  else if(alchemist.purse.items[0]==21){current_rate *= 2;}//fuller moon
  else if(alchemist.purse.items[0]==22){current_rate *= 5;}//fullest moon
  else if(alchemist.purse.items[0]==33){current_rate *= 1.07;}//weed pipe
  else if(alchemist.purse.items[0]==34){current_rate *= 0.85;}//brutal honesty
  else if(alchemist.purse.items[0]==35){current_rate *= 10;}//drunken rabbit banner
  else if(alchemist.purse.items[0]==37){current_rate *= 0.7;}//unusual ire
  else if(alchemist.purse.items[0]==38){current_rate *= 0.98;}//blasphemy
  else if(alchemist.purse.items[0]==39){current_rate *= 100;}//ancient kings
  else if(alchemist.purse.items[0]==41){current_rate *= 1.05;}//budgerigar
  else if(alchemist.purse.items[0]==42){current_rate *= 0.85;}//strange bottle
  else if(alchemist.purse.items[0]==44){current_rate *= 0.5;}//grimlord's hat
  else if(alchemist.purse.items[0]==17){current_rate *= 0.7;}//defective dagger
  else if(alchemist.purse.items[0]==53){current_rate *= 0.1;}//swarm of mosquitoes
  else if(alchemist.purse.items[0]==54){current_rate *= 1.05;}//duck
  else if(alchemist.purse.items[0]==55){current_rate *= 1.15;}//ostrich
  else if(alchemist.purse.items[0]==56){current_rate *= 1.10;}//cassowary
  else if(alchemist.purse.items[0]==58){current_rate *= 1.15;}//caladrius
  else if(alchemist.purse.items[0]==59){current_rate *= 1.25;}//roc
  else if(alchemist.purse.items[0]==60){current_rate *= 1.50;}//phoenix
  else if(alchemist.purse.items[0]==63){current_rate *= 1.13;}//devious puffin
  else if(alchemist.purse.items[0]==67){current_rate *= 1.30;}//dodo
  else if(alchemist.purse.items[0]==57){current_rate *= 1.01;}//nut
  
  //aviary

  let aviary_array=[];

  if(prestige.aviary.completed==0){aviary_array=alchemist.aviary.display;}
  else{aviary_array=prestige.aviary.display;}

  if(aviary_array.length>0 && (tower1.ogres+tower1.ogres_temp)>=10){

    alchemist.aviary.multiplier=1;

    for (let i = 0; i < aviary_array.length; i++) {

      if(aviary_array[i]==7){alchemist.aviary.multiplier += 0.25;}//peacock
      else if(aviary_array[i]==48){alchemist.aviary.multiplier += 0.15;}//flamingo
      else if(aviary_array[i]==8){alchemist.aviary.multiplier += 0.05;}//owl
      else if(aviary_array[i]==41){alchemist.aviary.multiplier += 0.05;}//budgerigar
      else if(aviary_array[i]==19){alchemist.aviary.multiplier += 0.05;}//golden hen
      else if(aviary_array[i]==54){alchemist.aviary.multiplier += 0.05;}//duck
      else if(aviary_array[i]==55){alchemist.aviary.multiplier += 0.25;}//ostrich
      else if(aviary_array[i]==56){alchemist.aviary.multiplier += 0.10;}//cassowary
      else if(aviary_array[i]==58){alchemist.aviary.multiplier += 0.15;}//caladrius
      else if(aviary_array[i]==59){alchemist.aviary.multiplier += 0.25;}//roc
      else if(aviary_array[i]==60){alchemist.aviary.multiplier += 0.50;}//phoenix
      else if(aviary_array[i]==63){alchemist.aviary.multiplier += 0.13;}//devious puffin
      else if(aviary_array[i]==67){alchemist.aviary.multiplier += 0.30;}//dodo
      
    }

    current_rate *= alchemist.aviary.multiplier;

  }else{alchemist.aviary.multiplier=1;}
  

  current_rate *= 1+0.01*alchemist.persistent_factors;//cumulative instant item effects like Odd Almond

  current_rate *= prestige.qmultiplier;//wicked quests

  if(prestige.historian==2){
    current_rate *= 1e6;
  }

  current_rate *= hog.multiplier;

  if(prestige.museum==1){

    prestige.museum_multiplier=0;
    
    for (let i = 0; i < prestige.items.length; i++) {
      if(prestige.items[i]>0){prestige.museum_multiplier++;}
    }

    for (let i = 0; i < prestige.items.length; i++) {
      current_rate *= 1+0.001*prestige.museum_multiplier*prestige.items[i];
    }

  }

  

  

  current_rate *= graveyard.multiplier;

  hammerRateCalc();

  if(alchemist.purse.items[0]==4){current_rate *= 1.25;}//devil's exhale
  if(tower1.discontent.riot==1){
    current_rate *= 1 - 0.1*tower1.discontent.riot_level;
  }

  if(current_rate>tower1.current_rate_max){tower1.current_rate_max=current_rate;}

  rate1_label.text(numT(current_rate)+'/s');

}
function wineDurationCalc(){
  return winecellar.wine_frame_max + (winecellar.cupsize*winecellar.cupsize_power);
}
function alchemistUI(){

  alchemist_upgrades.html('');
  alchemist_label_elements=[];
  alchemist.prices_state=0;

  for (let index = 0; index < alchemist.lab.length; index++) {

    if(tower1.counter<alchemist.lab[index].upgrade_prices){

      alchemist_upgrades.append('<button id="' + index + '" class="button6_tiny_disabled">' + alchemist.lab[index].html_disabled + '</button>');

    }else{

      alchemist_upgrades.append('<button id="' + index + '" class="button6_tiny">' + alchemist.lab[index].html + '</button>');

      alchemist.prices_state++;

    }

    alchemist.prices_state+=1000;

    alchemist_label_elements[index]=$("#"+index);

    if((index+1)%5==0){
      alchemist_upgrades.append('<br>');
    }
    
  }

  //filling with dummies 
  if(alchemist.lab.length<5){

    for (let index = 0; index < 5-alchemist.lab.length; index++) {
      alchemist_upgrades.append('<button class="button6_dummy">W</button>');
    }
    
  }

  all_alchemist_upgrades=$(".button6_tiny");
  all_alchemist_upgrades_disabled=$(".button6_tiny_disabled");

  all_alchemist_upgrades_disabled.css('color','#333');

  all_alchemist_upgrades.click(function(){

    playAudio(4);

    alchemistUpgrade($(this).attr('id'));
    
  });
  all_alchemist_upgrades.mouseenter(function(){alchemistInspect($(this));
  }).mouseleave(function(){ alchemist_tooltip.hide();alchemist_tooltip.text('');});
  all_alchemist_upgrades_disabled.mouseenter(function(){alchemistInspect($(this));
  }).mouseleave(function(){ alchemist_tooltip.hide();alchemist_tooltip.text('');});


  if(prestige.alchemist_buymax==0){
    alchemist_buymax_block.hide();
  }else{
    alchemist_buymax_block.show();

    if(alchemist.lab.length>0 && tower1.counter>=alchemist.lab[0].upgrade_prices){
      tower5_buymax.prop('disabled', false);
    }else{
      tower5_buymax.prop('disabled', true);
    }
  }

  if(settings.inspect_width==0){settings.inspect_width=alchemist_upgrades.width();}
  


  //items
  if(prestige.alchemist_purse==0){ items_block.hide(); }
  else{

    items_block.show();

    if(alchemist.purse.items[0]==999){
      items_holder.text('Crescent Boonies').attr( "class", "button6_empty" );
    }else{

      items_holder.html('<span class="'+items[alchemist.purse.items[0]][3]+'">' + items[alchemist.purse.items[0]][1] + '</span>' ).attr( "class", "button6_item" );

    }

    if(prestige.alchemy_lock==0){items_lock.hide();}else{

      items_lock.show();

      if(alchemist.purse.lock==0){items_lock.css('border-color','var(--gray)');}
      else{items_lock.css('border-color','var(--gandlor4_dark)');}

    }

  }

  

}
function mortalUnitButtons(unit_id=999){

  var weaklings_level='';
  var dwarves_level='';
  var humans_level='';
  var ogres_level='';

  var weaklings_discontent='';
  var dwarves_discontent='';
  var humans_discontent='';
  var ogres_discontent='';

  var button_class=['button1','button1','button1','button1'];

  //discontent
  if(alchemist.purse.items[0]==4 && tower1.discontent.riot==0){
    if(tower1.discontent.is[0]>0){ weaklings_discontent='<div class="tiny_black">Discontent: '+Math.floor(tower1.discontent.is[0])+'/666</div>';}
    if(tower1.discontent.is[1]>0){ dwarves_discontent='<div class="tiny_black">Discontent: '+Math.floor(tower1.discontent.is[1])+'/666</div>';}
    if(tower1.discontent.is[2]>0){ humans_discontent='<div class="tiny_black">Discontent: '+Math.floor(tower1.discontent.is[2])+'/666</div>';}
    if(tower1.discontent.is[3]>0){ ogres_discontent='<div class="tiny_black">Discontent: '+Math.floor(tower1.discontent.is[3])+'/666</div>';}
  }

  //riot levels
  if(alchemist.purse.items[0]==4 && tower1.discontent.riot==1){

    button_class[tower1.discontent.riot_unit]='button1_riot';

    if(tower1.discontent.riot_unit==0){
      weaklings_discontent='<div class="darkred">It\'s a riot!</div><div class="tiny_blue">Rate down by <b>'+10*tower1.discontent.riot_level+'%</b></div>';
      weaklings_discontent+='<div class="tiny_blue"><b>'+Math.floor(tower1.discontent.frame)+'/666</b></div>';
    }
    else if(tower1.discontent.riot_unit==1){
      dwarves_discontent='<div class="darkred">It\'s a riot!</div><div class="tiny_blue">Rate down by '+10*tower1.discontent.riot_level+'%</div>';
      dwarves_discontent+='<div class="tiny_blue"><b>'+Math.floor(tower1.discontent.frame)+'/666</b></div>';
    }
    else if(tower1.discontent.riot_unit==2){
      humans_discontent='<div class="darkred">It\'s a riot!</div><div class="tiny_blue">Rate down by '+10*tower1.discontent.riot_level+'%</div>';
      humans_discontent+='<div class="tiny_blue"><b>'+Math.floor(tower1.discontent.frame)+'/666</b></div>';
    }
    else if(tower1.discontent.riot_unit==3){
      ogres_discontent='<div class="darkred">It\'s a riot!</div><div class="tiny_blue">Rate down by '+10*tower1.discontent.riot_level+'%</div>';
      ogres_discontent+='<div class="tiny_blue"><b>'+Math.floor(tower1.discontent.frame)+'/666</b></div>';
    }

  }

  let temp_units=['<span class="tiny">','<span class="tiny">','<span class="tiny">','<span class="tiny">'];

  if(tower1.weaklings_temp>0){temp_units[0]='<br><span class="tiny"><i class="lightgreen_dark">+'+numT(tower1.weaklings_temp)+' units</i>';}
  if(tower1.dwarves_temp>0){temp_units[1]='<br><span class="tiny"><i class="lightgreen_dark">+'+numT(tower1.dwarves_temp)+' units</i>';}
  if(tower1.humans_temp>0){temp_units[2]='<br><span class="tiny"><i class="lightgreen_dark">+'+numT(tower1.humans_temp)+' units</i>';}
  if(tower1.ogres_temp>0){temp_units[3]='<br><span class="tiny"><i class="lightgreen_dark">+'+numT(tower1.ogres_temp)+' units</i>';}
  
  if(unit_id==0 || unit_id==999){
    weaklings_button.attr('class',button_class[0]).html( weaklings_discontent + 'Weaklings'+weaklings_level+': ' + numT(tower1.weaklings-tower1.weaklings_retired) + temp_units[0] + '<br>Power: ' + numT(mortals_rate[0]) + '/s<br>Price: ' + numT(tower1.weaklings_price[tower1.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/weakling.svg">' );
  }
  
  if(unit_id==1 || unit_id==999){
    dwarves_button.html( dwarves_discontent + 'Dwarves: ' + numT(tower1.dwarves) + temp_units[1] + '<br>Power: ' + numT (mortals_rate[1]) + '/s<br>Price: ' + numT(tower1.dwarves_price[tower1.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/dwarf.svg">' ).attr('class',button_class[1]);
  }
  
  if(unit_id==2 || unit_id==999){
    humans_button.html( humans_discontent + 'Humans: ' + numT(tower1.humans) + temp_units[2] + '<br>Power: ' + numT(mortals_rate[2]) + '/s<br>Price: ' + numT(tower1.humans_price[tower1.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/human.svg">' ).attr('class',button_class[2]);
  }
  
  if(unit_id==3 || unit_id==999){
    ogres_button.html( ogres_discontent + 'Ogres: ' + numT(tower1.ogres) + temp_units[3] + '<br>Power: ' + numT(mortals_rate[3]) + '/s<br>Price: ' + numT(tower1.ogres_price[tower1.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/ogre.svg">' ).attr('class',button_class[3]);
  }

}
function alchemistState(){

  let check=0;

  for (let index = 0; index < alchemist.lab.length; index++) {

    if(tower1.counter>=alchemist.lab[index].upgrade_prices){
      check++;
    }

    check+=1000;
    
  }

  if(check!=alchemist.prices_state){ alchemistUI(); }

}
function fortificationState(){

  var funds=prestige.garden.trees-prestige.garden.trees_spent;

  if(funds>=prestige.garden.fort_prices[0] && prestige.garden.fortifications[0]<9){fort_button_weaklings.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_weaklings.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[1] && prestige.garden.fortifications[1]<9){fort_button_dwarves.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_dwarves.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[2] && prestige.garden.fortifications[2]<9){fort_button_humans.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_humans.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[3] && prestige.garden.fortifications[3]<9){fort_button_ogres.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_ogres.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[4] && prestige.garden.fortifications[4]<9){fort_button_wizards.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_wizards.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[5] && prestige.garden.fortifications[5]<9){fort_button_warlocks.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_warlocks.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[6] && prestige.garden.fortifications[6]<9){fort_button_witches.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_witches.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[7] && prestige.garden.fortifications[7]<9){fort_button_wyverns.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_wyverns.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[8] && prestige.garden.fortifications[8]<9){fort_button_catapults.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_catapults.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[9] && prestige.garden.fortifications[9]<9){fort_button_crossbows.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_crossbows.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[10] && prestige.garden.fortifications[10]<9){fort_button_cheiroballistras.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_cheiroballistras.removeClass('fort_button').addClass('fort_button_disabled');}

  if(funds>=prestige.garden.fort_prices[11] && prestige.garden.fortifications[11]<9){fort_button_cannibals.removeClass('fort_button_disabled').addClass('fort_button');}
  else{fort_button_cannibals.removeClass('fort_button').addClass('fort_button_disabled');}

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
  if(prestige.graveyard==1){

    nS();

    if(graveyard.counter<graveyard.skeletons_price[graveyard.buy_amount_index]){skeletons_button.prop('disabled', true);}else{skeletons_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.spirits_price[graveyard.buy_amount_index]){spirits_button.prop('disabled', true);}else{spirits_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.specters_price[graveyard.buy_amount_index]){specters_button.prop('disabled', true);}else{specters_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.succubi_price[graveyard.buy_amount_index]){succubi_button.prop('disabled', true);}else{succubi_button.prop('disabled', false);}

    if(graveyard.counter<graveyard.ghouls_price[graveyard.buy_amount_index_2]){ghouls_button.prop('disabled', true);}else{ghouls_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.ghasts_price[graveyard.buy_amount_index_2]){ghasts_button.prop('disabled', true);}else{ghasts_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.grimlords_price[graveyard.buy_amount_index_2]){grimlords_button.prop('disabled', true);}else{grimlords_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.grandliches_price[graveyard.buy_amount_index_2]){grandliches_button.prop('disabled', true);}else{grandliches_button.prop('disabled', false);}

    if(graveyard.counter<graveyard.areds_price[graveyard.buy_amount_index_3]){areds_button.prop('disabled', true);}else{areds_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.ardemators_price[graveyard.buy_amount_index_3]){ardemators_button.prop('disabled', true);}else{ardemators_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.archsentinels_price[graveyard.buy_amount_index_3]){archsentinels_button.prop('disabled', true);}else{archsentinels_button.prop('disabled', false);}
    if(graveyard.counter<graveyard.andlyns_price[graveyard.buy_amount_index_3]){andlyns_button.prop('disabled', true);}else{andlyns_button.prop('disabled', false);}

  }
  //diamonds
  if(prestige.hog==1 && hog.all_diamonds<72){

    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds1_button.prop('disabled', true);}else{diamonds1_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds2_button.prop('disabled', true);}else{diamonds2_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds3_button.prop('disabled', true);}else{diamonds3_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds4_button.prop('disabled', true);}else{diamonds4_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds5_button.prop('disabled', true);}else{diamonds5_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds6_button.prop('disabled', true);}else{diamonds6_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds7_button.prop('disabled', true);}else{diamonds7_button.prop('disabled', false);}
    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){diamonds8_button.prop('disabled', true);}else{diamonds8_button.prop('disabled', false);}

    if(tower1.counter<hog.diamonds_price[hog.buy_amount_index]){hog_buymax.prop('disabled', true);}else{hog_buymax.prop('disabled', false);}

  }

  //alchemist
  if(alchemist.lab.length>0){ alchemistState(); }

  //necromancer
  if(necromancer.lab.length>0){ necromancerState(); }

  //trees
  if(prestige.garden.unlocked==0 && prestige.all_time_counter>1e9){
    prestige.garden.unlocked=1;
    prestige.garden.tree_age=0;
  }

  
  if(prestige.garden.unlocked==1 && prestige.garden.tree_age>tree_stages[prestige.garden.tree_state]){

    prestige.garden.tree_state++;

    if(prestige.garden.tree_state==1){
      treeSetType();
    }

    if(prestige.garden.tree_state==4){
      treeCollect();
      prestige.garden.tree_age=0;
      prestige.garden.tree_state=0;
      prestige.garden.tree_type='normal';
      refreshUI();
    }
  }

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

  if(prestige.raiders_unlocked==1){
    if(raiders.active==1 || (tower1.weaklings-tower1.weaklings_retired)<raiders.price || raiders.locations_runs[raiders.locations_index]>=locations[raiders.locations_index][4]){raiders_button.prop('disabled', true);}else{raiders_button.prop('disabled', false);}
  }

  //tower0
  if(tower1.counter<tower0.blacksmiths_price[tower0.buy_amount_index]){blacksmiths_button.prop('disabled', true);}else{blacksmiths_button.prop('disabled', false);}

  //winecellar
  if(tower1.counter<winecellar.wineage_price[winecellar.buy_amount_index]){wineage_button.prop('disabled', true);}else{wineage_button.prop('disabled', false);}
  if(tower1.counter<winecellar.cupsize_price[winecellar.buy_amount_index]){cupsize_button.prop('disabled', true);}else{cupsize_button.prop('disabled', false);}
  if(tower1.counter<winecellar.grapes_price[winecellar.buy_amount_index]){grapes_button.prop('disabled', true);}else{grapes_button.prop('disabled', false);}

}
function refreshUI(){

  var position = hammer_button.offset();

  brokensave_block.hide();

  //mana
  let future_multiplier=1;

  if(prestige.all_time_mana<1){
    future_multiplier=1;
    rmana_multiplier_label.hide();
    reincarnate_button.hide();
  }else{
    future_multiplier=prestige.all_time_mana;
    rmana_multiplier_label.show();
    if(prestige.library.library_switch==0){reincarnate_button.show();}
  }

  rmana_multiplier_label.html('Fortress Level: <b class="main_color">' + numT(prestige.multiplier) + '</b><br>Fortress Level after reset: <b class="main_color">' + numT(future_multiplier) + '</b>' );

  if(prestige.multiplier<2){//we force the double ratio on reincarnation before you reach a 2
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

  //footer.......................................

  //guide
  if(misc_settings.guide_toggle>0){
    guide_block.show();

    let guide_classes=[];

    for (const [key, value] of Object.entries(player.guide)) {
      switch(key){
        case 'wicked':
          if(value==0){guide_classes[0]='guide_unread';}else{guide_classes[0]='guide';}
          break;
        case 'hog':
          if(value==0){guide_classes[1]='guide_unread';}else{guide_classes[1]='guide';}
          break;
        case 'fort':
          if(value==0){guide_classes[2]='guide_unread';}else{guide_classes[2]='guide';}
          break;
        case 'gc':
          if(value==0){guide_classes[3]='guide_unread';}else{guide_classes[3]='guide';}
          break;
        case 'museum':
          if(value==0){guide_classes[4]='guide_unread';}else{guide_classes[4]='guide';}
          break;
        case 'cannibals':
          if(value==0){guide_classes[5]='guide_unread';}else{guide_classes[5]='guide';}
          break;
        case 'aviary':
          if(value==0){guide_classes[6]='guide_unread';}else{guide_classes[6]='guide';}
          break;
        case 'raiders':
          if(value==0){guide_classes[7]='guide_unread';}else{guide_classes[7]='guide';}
          break;
        case 'graveyard':
          if(value==0){guide_classes[8]='guide_unread';}else{guide_classes[8]='guide';}
          break;
      }
    }

    

    if(prestige.quests_flag>0){wicked_guide_button.show().attr( "class", guide_classes[0] );} else{wicked_guide_button.hide();}
    if(prestige.hog>0){hog_guide_button.show().attr( "class", guide_classes[1] );} else{hog_guide_button.hide();}
    if(prestige.garden.trees>0){fort_guide_button.show().attr( "class", guide_classes[2] );} else{fort_guide_button.hide();}
    if(prestige.gandlor>0){gc_guide_button.show().attr( "class", guide_classes[3] );} else{gc_guide_button.hide();}
    if(prestige.museum>0){museum_guide_button.show().attr( "class", guide_classes[4] );} else{museum_guide_button.hide();}
    if(prestige.cannibals>0){cannibals_guide_button.show().attr( "class", guide_classes[5] );} else{cannibals_guide_button.hide();}
    if(prestige.aviary.unlocked>0){aviary_guide_button.show().attr( "class", guide_classes[6] );} else{aviary_guide_button.hide();}
    if(prestige.raiders_unlocked>0){raiders_guide_button.show().attr( "class", guide_classes[7] );} else{raiders_guide_button.hide();}
    if(prestige.graveyard>0){graveyard_guide_button.show().attr( "class", guide_classes[8] );} else{graveyard_guide_button.hide();}

      if(misc_settings.guide_page==''){
        guide_page.html('<i>Not really a guide. More like <b>scraps of ancient knowledge</b>...</i><br><br>');
      }else{
        getGuidePage();
      }
    
  }else{
    guide_block.hide();
  }

  if(guideAlertCheck()==true){button_guide.attr("class","system_alert");}
  else{button_guide.attr("class","system");}


  //settings

  if(misc_settings.settings_toggle==0){
    settings_block.hide();
  }else{

    settings_block.show();

    if(misc_settings.save_del_confirm_toggle==0){save_del_confirm_block.hide();}
    else{save_del_confirm_block.show();}
  
    if(settings.audio_mute==1){
      button_audio.text("Turn it back on");
    }else{
      button_audio.text("Turn it off");
    }

    if(prestige.messenger_alert==0){audio_messenger_block.hide();}
    else{
      audio_messenger_block.show();

      if(settings.audio_messenger==0){
        button_audio_messenger.text("Turn it back on");
      }else{
        button_audio_messenger.text("Turn it off");
      }
    }
  
    audio_control_volume.val(settings.audio_volume);

  }

  

  ////////////////////////////
  

  //reincarnation options block
  if(prestige.library.library_switch==0){reincarnation_options_block.hide();showFortress();showCounter();}
  else{

    reincarnation_options_block.show();
    
    showFortress(false);
    showCounter(false);
    navigation_block.hide();
    showGraveyard(false);
    showHoG(false);
    
    reincarnationUI();
    

    return;

  }


  //rate label
  if(winecellar.drinking==0){rate1_label.css('color','var(--main_color)');}else{rate1_label.css('color','var(--green)');}

  if(tower1.discontent.riot==1){rate1_label.css('color','var(--darkred)');}

  if(prestige.temple.unlocked==0){temple_block.hide();}
  else{
    temple_block.show();
  }
  



  //notifications
  if(player.notification.active==0){
    notifications_button.hide();

  }else{

    notifications_button.html('<b>' + player.notification.title + '</b><br><br>');
    notifications_button.append(player.notification.body + '<br><br>');

    notifications_button.show().css('left', player.notification.left +'px').css('top',player.notification.top +'px');

  }

  //Messengers
  if(messenger.active==0){
    messenger_button.hide();

  }else{

    messenger_button.show().css('opacity',messenger.opacity).css('left', messenger.left +'px').css('top',messenger.top +'px');
    
    messenger_button.html('<b>' + messenger.title + '</b><br>');
    messenger_button.append(messenger.body + '<br><br>');

    if(messenger.is=='instructor' || messenger.is=='scholar'){

      messenger_button.append('<b>Time: ' + Math.floor(messenger.timeDuration) + '</b>').attr("class","messenger_dwarf");

    }else if(messenger.is=='gandlor' || messenger.is=='shadow_caravan'){

      messenger_button.append('<b>Collect: ' + numT(messenger.reward) + ' coins</b>').attr("class","messenger_gandlor");

    }else if(messenger.is=='monk'){

      messenger_button.append('<b>Collect: ' + messenger.reward + '</b>').attr("class","messenger");

    }else if(messenger.is=='rabbit'){

      messenger_button.append('<b>Greet the Rabbit!</b>').attr("class","messenger_rabbit");

    }else if(messenger.is=='conartist'){

      messenger_button.append('<b>Collect: ' + numT(messenger.reward) + '</b><br><span class="tinier">I wouldn\'t click it if I were you!</span>').attr("class","messenger_conartist");

    }else if(messenger.is=='historian'){

      messenger_button.append('<b>' + messenger.reward + '</b>').attr("class","messenger_historian");

    }else{
      messenger_button.prepend('<i>Royal Messengers:</i><br><br>');
      messenger_button.attr("class","messenger");

      messenger_button.append('<b>Collect: ' + numT(messenger.reward) + '</b>');

    }

  }

  //alchemist
  alchemistUI();


  //Aviary
  if(prestige.aviary.unlocked==0){aviary_button_block.hide();}else{aviary_button_block.show();}

  if(alchemist.aviary.show==0){
    aviary_block.hide();
    alchemist_upgrades.removeClass( "blinking_green" );
  }else{

    aviary_block.show();

    if(alchemist.aviary.multiplier>1){
      aviary_multiplier_label.html('<span class="gandlor_green">Wing Factor: <b>+'+numT((alchemist.aviary.multiplier-1)*100)+'%</b></span>');
    }else{
      aviary_multiplier_label.html('<span class="gandlor_green">Wing Factor: <b>+0%</b></span>');
    }


    if(prestige.aviary.completed==0){

      aviary_catch_button.prop('disabled', false);

      if(alchemist.aviary.incoming==0){
        aviary_catch_button.attr( "class", "button6_aviary_normal" ).text('Catch birds');
        aviary_display.attr( "class", "display" );
        alchemist_upgrades.removeClass( "blinking_green" );
      }else{
        aviary_catch_button.attr( "class", "button6_aviary_loading" ).text('Finish catching');
        aviary_display.attr( "class", "display_loading" );
        alchemist_upgrades.attr( "class", "blinking_green" );
      }

    }else{
      aviary_catch_button.attr( "class", "button6_aviary_normal" ).text('Catch birds').prop('disabled', true);
      aviary_display.attr( "class", "display" );
      alchemist_upgrades.removeClass( "blinking_green" );
    }

    

    aviary_display.html('');

    for (let i = 0; i < prestige.aviary.display.length; i++) {

      let bird_factor=0;
      let aviary_array=[];
      if(prestige.aviary.completed==0){aviary_array=alchemist.aviary.display;}
      else{aviary_array=prestige.aviary.display;}


      if(prestige.aviary.display[i]==7){bird_factor = 25;}//peacock
      else if(prestige.aviary.display[i]==48){bird_factor = 15;}//flamingo
      else if(prestige.aviary.display[i]==8){bird_factor = 5;}//owl
      else if(prestige.aviary.display[i]==41){bird_factor = 5;}//budgerigar
      else if(prestige.aviary.display[i]==19){bird_factor = 5;}//golden hen
      else if(prestige.aviary.display[i]==54){bird_factor = 5;}//duck
      else if(prestige.aviary.display[i]==55){bird_factor = 15;}//ostrich
      else if(prestige.aviary.display[i]==56){bird_factor = 10;}//cassowary
      else if(prestige.aviary.display[i]==58){bird_factor = 15;}//caladrius
      else if(prestige.aviary.display[i]==59){bird_factor = 25;}//roc
      else if(prestige.aviary.display[i]==60){bird_factor = 50;}//phoenix
      else if(prestige.aviary.display[i]==63){bird_factor = 13;}//devious puffin
      else if(prestige.aviary.display[i]==67){bird_factor = 30;}//dodo


      if(aviary_array.length<prestige.aviary.display.length){

        if(inArray(prestige.aviary.display[i],aviary_array)){
          aviary_display.append('<button class="button6_bird"><span class="'+items[prestige.aviary.display[i]][3]+'">'+items[prestige.aviary.display[i]][1]+'&nbsp;<span class="tinier">('+bird_factor+'%)</span></button>');
        }else{
          if(aviary_array.length>4){
            aviary_display.append('<button class="button6_bird_empty"><span>'+items[prestige.aviary.display[i]][1]+'</span></button>');
          }
          
        }

      }else{
        aviary_display.append('<button class="button6_bird"><span class="'+items[prestige.aviary.display[i]][3]+'">'+items[prestige.aviary.display[i]][1]+'&nbsp;<span class="tinier">('+bird_factor+'%)</span></button>');
      }

      

      

    }

  }


  //FLASK
  if(prestige.flask_unlocked==0){flask_button_block.hide();}else{flask_button_block.show();}

  if(alchemist.flask.show==0){
    flask_block.hide();
    alchemist.flask.incoming=0;
    alchemist.flask.confirm=0;
    alchemist_upgrades.removeClass( "blinking_red" );
  }
  else{

    flask_block.show();

    flaskUI();

  }




  

  //garden
  
  if(prestige.all_time_counter<=1e9){
    garden_block.hide();
  }else{
    garden_block.show();

    if(prestige.garden.trees-prestige.garden.trees_spent>0){
      indicator_tree.show().css('width',button_tree.width()).html('<b>'+numT(prestige.garden.trees-prestige.garden.trees_spent) + '</b>' );
    }else{indicator_tree.hide();}


    if(prestige.garden.trees>0){

      tower1_fortifications.show();
      tower2_fortifications.show();
      tower3_fortifications.show();

      fortificationState();

      $(fort_button).each(function(index) {
        $(this).html('<b>'+(prestige.garden.fortifications[index])+'</b>&#8679;&#xFE0E;');
       });

    }else{

      tower1_fortifications.hide();
      tower2_fortifications.hide();
      tower3_fortifications.hide();

    }

    

  }



  //medallions

  if(medallions.reward>0){

    collect_medallions_button.show().html('Hiring bonus!<br><b>'+numT(medallions.reward)+'</b>').css('left', position.left +'px').css('top',position.top-collect_medallions_button.outerHeight()*2 +'px');
  }else{
    collect_medallions_button.hide();
  }


  if(medallions.vlist.length>0){

    outerwall_block.show();

    if(alchemist.medallions_multiplier_toggle==1){
      outerwall_name_label.html('Outer Wall<br><span class="tinier">Increasing the rate by: x'+ numT(1+alchemist.medallions_multiplier*medallions.vlist.length) +'</span>');
    }else{outerwall_name_label.text('Outer Wall');}

    if(medallions.vlist.length>168){
      guards_of_the_wall.html('<span class="tiny"><b>Guards:</b><br>"' + embell.outer_wall[167] + '"</span>');
    }else{
      guards_of_the_wall.html('<span class="tiny"><b>Guards:</b><br>"' + embell.outer_wall[medallions.vlist.length-1] + '"</span>');
    }
    

    medallions_label.text('');

    for (const [key, value] of Object.entries(medallions.list)) {
      if(key==168){continue;}
      if(medallions.vlist[key]==2){medallions_label.append('<span class="block_achievement2">'+value+'</span>');}
      else{medallions_label.append('<span class="block_achievement1">'+value+'</span>');}
      

      if((parseInt(key)+1)%6==0){
        medallions_label.append('<br>');
      }
    }

  }else{
    outerwall_block.hide();
  }
  
  
  

  


  //gandlor's cave

  if(misc_settings.gandlor_display==0){ gandlor_block.hide();}else{gandlor_block.show();}



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

    if(prestige.hog==0 && prestige.graveyard==0 && prestige.museum==0){
      graveyard_block.hide();
    }else{
      graveyard_block.show();
        if(prestige.graveyard==0){
          graveyard_lock.show();
          graveyard_body.hide();
          necromancer_block.hide();
        }else{
          graveyard_lock.hide();
          graveyard_body.show();
          necromancer_block.show();

          //when first unlocking graveyard or reloading the page, we call its refresh UI function. All the subsequent Graveyard UI refreshes are going to be called from within the Graveyard itself; same for HoG
          if(misc_settings.graveyard_setup==0){
            misc_settings.graveyard_setup=1;
            refreshUIGraveyard();
          }
        
        }

      }


    //hog

    if(prestige.hog==0 && prestige.graveyard==0 && prestige.museum==0){
      hog_block.hide();
      museum_block.hide();
    }else{
      hog_block.show();
      museum_block.show();

        if(prestige.hog==0){
          hog_lock.show();
          hog_body.hide();
        }else{
          hog_lock.hide();
          hog_body.show();
          if(misc_settings.hog_setup==0){
            misc_settings.hog_setup=1;
            refreshUIHoG();
          }
        }
        
        if(prestige.museum==0){
          museum_lock.show();
          museum_body.hide();
        }else{
          museum_lock.hide();
          museum_body.show();
          if(misc_settings.hog_setup==0){
            misc_settings.hog_setup=1;
            refreshUIHoG();
          }
        }




        
    }





  //dragons

  if(prestige.dragons_tower==0){dragonstower_button_block.hide();}else{dragonstower_button_block.show();}

  if(dragons_tower.show==0){
    tower4_block.hide();
  }else{
    tower4_block.show();
      tower4_body.show();


    dragon1_button.html('Falkor<br><span class="tiny"><i>Boosts Fire Multiplier</i><br>Level: '+numT(dragons_tower.dragon1)+'<br>Price: ' + numT(dragons_tower.dragon1_price[dragons_tower.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/falkor.png">');
    dragon2_button.html('Dagahra<br><span class="tiny"><i>Boosts Falkor</i><br>Level: '+numT(dragons_tower.dragon2)+'<br>Price: ' + numT(dragons_tower.dragon2_price[dragons_tower.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/dagahra.png">');
    dragon3_button.html('Eborsisk<br><span class="tiny"><i>Boosts Dagahra</i><br>Level: '+numT(dragons_tower.dragon3)+'<br>Price: ' + numT(dragons_tower.dragon3_price[dragons_tower.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/eborsisk.png">');
    dragon4_button.html('Smaug<br><span class="tiny"><i>Boosts Eborsisk</i><br>Level: '+numT(dragons_tower.dragon4)+'<br>Price: ' + numT(dragons_tower.dragon4_price[dragons_tower.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/smaug.png">');
    dragon5_button.html('Katla<br><span class="tiny"><i>Boosts Smaug</i><br>Level: '+numT(dragons_tower.dragon5)+'<br>Price: ' + numT(dragons_tower.dragon5_price[dragons_tower.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/katla.png">');

    fire_multiplier_label.html('Fire Multiplier: <b>x'+numT(dragons_tower.dragons_multiplier)+'</b>');
      
  }









  //wine cellar


  if((tower1.dwarves+tower1.dwarves_temp)<13){
    winecellar_body.hide();
    winecellar_lock.show();

    all_tower_drinking_buttons.hide();
  }else{
    winecellar_body.show();
    winecellar_lock.hide();

    if(alchemist.purse.items[0]==4){winecellar_title.text('Barelled Water');}
    else{winecellar_title.text(winecellar.name);}

    all_tower_drinking_buttons.show();
  }

  wineage_button.html( 'Wine Age' +  '<br><span class="tiny"><i>Boosts drunken multiplier</i><br>Power: ' + numT((winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power)) + '<br>Price: ' + numT(winecellar.wineage_price[winecellar.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/wineage.svg">' );

  if(winecellar.cupsize>=320){
    cupsize_button.hide();
  }else{
    cupsize_button.show();

    cupsize_button.html( 'Cup Size' + '<br><span class="tiny"><i>Boosts drinking time</i><br>Class: ' + embell.cup_levels[winecellar.cupsize] + '<br>Price: ' + numT(winecellar.cupsize_price[winecellar.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/cup.svg">' );
  }

  if(prestige.grapes==0){
    grapes_button.hide();
  }else{

    grapes_button.show();

    grapes_button.html( 'Grapes' +  '<br><span class="tiny"><i>Boosts wine age</i><br>Power: ' + numT(winecellar.grapes_power) + '<br>Price: ' + numT(winecellar.grapes_price[winecellar.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/grape.svg">' );
  }

  

  drunken_multiplier_label.text( 'Drunken Multiplier: x' + numT( (winecellar.wine_multiplier+(winecellar.wineage*(winecellar.wineage_power+winecellar.grapes*winecellar.grapes_power))) ));



  












  //tower 3

  if(tower2.wyverns<10){
    tower3_lock.show();
    tower3_body.hide();
  }else{
    tower3_lock.hide();
    tower3_body.show();


    catapults_button.html( 'Catapults: ' + numT(tower3.catapults) + '<br><span class="tiny">Power: ' + numT(machines_rate[0]) + '/s<br>Price: ' + numT(tower3.catapults_price[tower3.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/catapult.svg">' );

    crossbows_button.html( 'Crossbows: ' + numT(tower3.crossbows) + '<br><span class="tiny">Power: ' + numT(machines_rate[1]) + '/s<br>Price: ' + numT(tower3.crossbows_price[tower3.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/crossbow.svg">' );

    cheiroballistras_button.html( 'Cheiroballistras: ' + numT(tower3.cheiroballistras) + '<br><span class="tiny">Power: ' + numT(machines_rate[2]) + '/s<br>Price: ' + numT(tower3.cheiroballistras_price[tower3.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/ballistra.svg">' );

    if(prestige.cannibals==0){cannibals_button.hide();}
    else{

      cannibals_button.show();

      cannibals_button.html( 'Cannibals: ' + numT(tower3.cannibals) + '<br><span class="tiny">Power: ' + numT(machines_rate[3]) + '/s</span>&nbsp;<img class="sprite" src="img/cannibal.svg">' );

    }

    if(prestige.garden.trees<=0){tower3_fortifications.hide();}
    else{
      tower3_fortifications.show();

      if(prestige.cannibals==0){fort_button_cannibals.hide();}
      else{fort_button_cannibals.show();}
    }

    if(misc_settings.fort_unit>=8 && misc_settings.fort_unit<12){
      tower3_fortifications_confirm_block.show();
      tower3_fort_confirm.html('Fortify <b>'+unit_names[misc_settings.fort_unit]+'</b>');
    }else{ tower3_fortifications_confirm_block.hide(); }

  }

  



  //tower2

  if((tower1.ogres+tower1.ogres_temp)<10){
    tower2_lock.show();
    tower2_body.hide();

  }else{
    tower2_lock.hide();
    tower2_body.show();

      

    wizards_button.html( 'Wizards: ' + numT(tower2.wizards) + '<br><span class="tiny">Power: ' + numT(mages_rate[0]) + '/s<br>Price: ' + numT(tower2.wizards_price[tower2.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/wizard.svg">' );

    warlocks_button.html( 'Warlocks: ' + numT(tower2.warlocks) + '<br><span class="tiny">Power: ' + numT(mages_rate[1]) + '/s<br>Price: ' + numT(tower2.warlocks_price[tower2.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/warlock.svg">' );

    witches_button.html( 'Witches: ' + numT(tower2.witches) + '<br><span class="tiny">Power: ' + numT(mages_rate[2]) + '/s<br>Price: ' + numT(tower2.witches_price[tower2.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/witch.svg">' );

    wyverns_button.html( 'Wyverns: ' + numT(tower2.wyverns) + '<br><span class="tiny">Power: ' + numT(mages_rate[3]) + '/s<br>Price: ' + numT(tower2.wyverns_price[tower2.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/wyvern.svg">' );

    if(prestige.garden.trees<=0){tower2_fortifications.hide();}
    else{tower2_fortifications.show();}

    if(misc_settings.fort_unit>=4 && misc_settings.fort_unit<8){
      tower2_fortifications_confirm_block.show();
      tower2_fort_confirm.html('Fortify <b>'+unit_names[misc_settings.fort_unit]+'</b>');
    }else{ tower2_fortifications_confirm_block.hide(); }

  }

  //tower1

  if(tower0.blacksmiths<10){
    tower1_lock.show();
    tower1_body.hide();
  }else{
    tower1_lock.hide();
    tower1_body.show();


    mortalUnitButtons();


    if(prestige.garden.trees<=0){tower1_fortifications.hide();}
    else{tower1_fortifications.show();}

    if(misc_settings.fort_unit>=0 && misc_settings.fort_unit<4){
      tower1_fortifications_confirm_block.show();
      tower1_fort_confirm.html('Fortify <b>'+unit_names[misc_settings.fort_unit]+'</b>');
    }else{ tower1_fortifications_confirm_block.hide(); }

    if(prestige.champs.unlocked[0]+prestige.champs.unlocked[1]+prestige.champs.unlocked[2]+prestige.champs.unlocked[3]==0){champs_block.hide();}
    else{

      champs_block.show();

      if(prestige.champs.unlocked[0]==0){champ_weaklings_button.hide();}
      else{champ_weaklings_button.show();}

      if(prestige.champs.unlocked[1]==0){champ_dwarves_button.hide();}
      else{champ_dwarves_button.show();}

      if(prestige.champs.unlocked[2]==0){champ_humans_button.hide();}
      else{champ_humans_button.show();}

      if(prestige.champs.unlocked[3]==0){champ_ogres_button.hide();}
      else{champ_ogres_button.show();}

    }


    if(prestige.raiders_unlocked==0){raiders_block.hide();}
    else{

      raiders_block.show();

      raiders_location_button.text(locations[raiders.locations_index][1]);

      if(raiders.active==0){
        raiders_button.html( 'Send Raiders<br><span class="tiny">Price: ' + numT(raiders.price) + ' weaklings</span>&nbsp;<img class="sprite" src="img/raider.svg">' ).show();
        raiders_button_win.hide();
      }else if(raiders.active==1){
        raiders_button.html( 'Raid <i class="tiny">in progress</i><div class="tiny">Time: '+Math.floor(raiders.counter)+' sec&nbsp;<img class="sprite" src="img/raider.svg"></div>' ).show();
        raiders_button_win.hide();
      }else if(raiders.active==2){

        var loot=raiders.loot;
        var item0='<button id="lt0" class="button6_loot"><span class="'+items[loot[0]][3]+'">I</span></button>';
        var item1='<button id="lt1" class="button6_loot"><span class="'+items[loot[1]][3]+'">I</span></button>';
        var item2='<button id="lt2" class="button6_loot"><span class="'+items[loot[2]][3]+'">I</span></button>';
        var item3='<button id="lt3" class="button6_loot"><span class="'+items[loot[3]][3]+'">I</span></button>';

        raiders_button_win.html( 'Loot<div class="tiny">'+item0+item1+item2+item3+'</div>' ).show();

        raiders_button.hide();


        button6_loot=$(".button6_loot");

        button6_loot.mouseenter(function(){lootInspect($(this));
        }).mouseleave(function(){ loot_tooltip.hide();loot_tooltip.text('');});
        
      }

      

    }


  }



  


  //tower 0

  hammer_button.html('Hammer<br><span class="tiny">Power: ' + numT(tower0.hammer_rate) + '</span>&nbsp;<img class="sprite"" src="img/hammer.svg">');

  blacksmiths_button.html( 'Blacksmiths: ' + numT(tower0.blacksmiths) + '<br><span class="tiny">Power: ' + numT(metals_rate) + '/s<br>Price: ' + numT(tower0.blacksmiths_price[tower0.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/blacksmith.svg">' );

  if(prestige.gandlor==0){gandlor_button_block.hide();}else{gandlor_button_block.show();}




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



  //navigation
  if(prestige.hog==0 && prestige.graveyard==0 && prestige.museum==0){
    navigation_block.hide();
  }else{

    navigation_block.show();

    switch(settings.navigation.page){
      case 'Towers':
        showTowers();
        showHoG(false);
        showGraveyard(false);
        nav_left.show().html('<span class="orange">Hall of Giants</span>');
        nav_right.show().html('<span class="blue">Necropolis</span>');
        body.css('background-image','url("img/bck/towers_e1.jpg")').css('background-position-y',topmost_header.innerHeight()+'px');
        break;
      case 'HoG':
        showTowers(false);
        showHoG();
        showGraveyard(false);
        nav_left.hide();
        nav_right.show().html('<span class="main_color">Towers</span>');
        body.css('background-image','url("img/bck/hog7.jpg")').css('background-position-y',topmost_header.innerHeight()+'px');
        break;
      case 'Necropolis':
        showTowers(false);
        showHoG(false);
        showGraveyard();
        nav_left.show().html('<span class="main_color">Towers</span>');
        nav_right.hide();
        body.css('background-image','url("img/bck/necropolis.jpg")').css('background-position-y',topmost_header.innerHeight()+'px');
        break;
    }



  }

}



function champInspect($button,unit_id){

  var unit='';
  var champ_name='';
  var descr='';
  var item_id=prestige.champs.holding[unit_id];

  switch(unit_id){
    case 0:
      unit='weaklings';
      champ_name='Glen Tenderbeck';
      descr='Defender of the Spirits';
    break;
    case 1:
      unit='dwarves';
      champ_name='Qvass III';
      descr='King of the Dwarves';
      break;
    case 2:
      unit='humans';
      champ_name='Astalm Bridgewinter';
      descr='Master of War Machines';
      break;
    case 3:
      unit='ogres';
      champ_name='Murker';
      descr='Candidate for Governor';
      break;
  }

  champ_tooltip.html('<b>'+champ_name+'</b><br><span class="tiny">'+descr+'</span><br><br>');
  
  champ_tooltip.append('<div class="tiny">'+champ_name+' is holding <b>'+items[item_id][1]+'</b>, which adds +100 '+unit+'</div>');

  champ_tooltip.append('<hr><span class="tinier_right">CHAMPION</span>');

  var position = $button.offset();

  champ_tooltip.show().css('width',settings.inspect_width*1.5).css('left', position.left+$button.outerWidth() +'px').css('top',position.top +'px');

}
function templeInspect($button){

  var rings_html='';

  prestige.temple.rings=[1,1,1,1,1,1,1,1,1];

  temple_tooltip.html('<b class="gandlor_yellow">Moon Temple</b><div class="tiny">Level '+temple.level+'</div>');

  for (let i = 0; i < prestige.temple.rings.length; i++) {

    if(prestige.temple.rings[i]==1){

      rings_html+='<img class="ring_sprite" src="img/temple/'+rings[i][3]+'.svg">';

    }

  }

  temple_tooltip.append(rings_html+'<hr><br>');

  temple_tooltip.append('<div class="tinier"><img class="ring_sprite" src="img/temple/agate.svg"> - increases rate by 2%</div>');

  temple_tooltip.append('<hr><span class="tinier_right">RELIGION</span>');

  position = $button.offset();

  temple_tooltip.show().css('width',settings.inspect_width*1.8).css('left', position.left-temple_tooltip.outerWidth() +'px').css('top',position.top +'px');

}

function insertItem(item_id){

  var upgrade_pack='<hr><span class="tinier_right">'+items[item_id][4].toUpperCase()+'</span>';

  var price=tower1.current_rate_max*900*prestige.items_price_mod;
  if(alchemist.purse.items[0]==42){price*=0.5;}
  else if(alchemist.purse.items[0]==43){price*=0.5;}
  else if(alchemist.purse.items[0]==53){price*=0.5;}
  else if(alchemist.purse.items[0]==69){price*=0.1;}

  alchemist.lab.push({
    labels:'I',
    html:'<span class="'+items[item_id][3]+'">I</span>',
    html_disabled:'<span class="gray">I</span>',
    html_button:'<b>'+items[item_id][1]+'&nbsp;<span class="'+items[item_id][3]+'">(I)</span></b><div class="tiny">'+items[item_id][2]+'</div>',
    upgrade_ids:items[item_id][0],
    upgrade_pack:upgrade_pack,
    upgrade_prices:price
  });

  if(items[item_id][3]!='pack of items'){
    prestige.items[item_id]++;rateCalc();
  }
  

  alchemist.lab.sort((a, b) => parseFloat(a.upgrade_prices) - parseFloat(b.upgrade_prices));

}
function itemInspect($button){

  if(alchemist.purse.items[0]==999){return;}

  var name=items[alchemist.purse.items[0]][1];
  var descr=items[alchemist.purse.items[0]][2];
  var color=items[alchemist.purse.items[0]][3];

  item_tooltip.html('<b class="'+color+'">'+name+'</b><div class="tiny">'+descr+'</div>');

  //Marauder's Guild
  if(alchemist.purse.items[0]==70){
    item_tooltip.append('<br><div class="tiny">Automatic raids left: <b>'+parseInt(5-raiders.guild)+'</b></div>');
  }



  item_tooltip.append('<br><hr><span class="tinier_right">'+items[alchemist.purse.items[0]][4].toUpperCase()+'</span>');

  var position = $button.offset();

  item_tooltip.show().css('width',settings.inspect_width).css('left', position.left-item_tooltip.outerWidth() +'px').css('top',position.top +'px');

}
function bonusInspect($button){

  let item;

  if(gandlor.bet==2){ item = gandlor.tier1_src[gandlor.bonus[2]]; }
  if(gandlor.bet==4){ item = gandlor.tier2_src[gandlor.bonus[2]]; }

  if(item=='empty'){return;}

  let item_id;

  switch(item){

    case 'win_hp': 
      item_id=0;
      break;

    case 'win_sa': 
      item_id=1;
      break;

    case 'win_lf': 
      item_id=2;
      break;

    case 'win_cm': 
      item_id=3;
      break;

    case 'win_de': 
      item_id=4;
      break;

    case 'win_qverin': 
      item_id=5;
      break;

    case 'win_pe': 
      item_id=7;
      break;

    case 'win_gh': 
      item_id=19;
      break;

    case 'win_c5': 
      item_id=9;
      break;

    case 'win_c100': 
      item_id=9;
      break;

    case 'win_c10': 
      item_id=10;
      break;

    case 'win_c250': 
      item_id=11;
      break;

    case 'win_dagger': 
      item_id=28;
      break;

    case 'win_flyingship': 
      item_id=18;
      break;

    case 'win_frograin': 
      item_id=20;
      break;

    case 'win_haste': 
      item_id=24;
      break;

    case 'win_thunder': 
      item_id=31;
      break;

    case 'win_treasure': 
      item_id=27;
      break;

  }

  var name=items[item_id][1];
  var descr=items[item_id][2];
  //var color=items[item_id][3];

  gc_tooltip.html('<b>'+name+'</b><div class="tiny">'+descr+'</div>');

  var position = $button.offset();

  gc_tooltip.show().css('width',settings.inspect_width).css('left', position.left-gc_tooltip.outerWidth() +'px').css('top',position.top +'px');

}
function setupGandlor(){
  gandlor={
    unlocked:1,
    show:0,
    games:0,
    attack_src:['back','staff','poison','axe','fireball','rock','empty'],
    src:['back','archon1','mushroom','orc','dragon','swamp','empty'],
    class:['gandlor_tile_back','gandlor_tile_archon','gandlor_tile_mushroom','gandlor_tile_orc','gandlor_tile_dragon','gandlor_tile_swamp','gandlor_tile_empty','gandlor_tile_purple'],
    bonus_class:[6,6,6],
    class_mod:['','','','',''],
    deuce_class_mod:['',''],
    bonus_src:['empty','win_pick','double','win_05','win_1m','win_2m','win_3m','win_4m','win_5m','seer','win_5m','win_10m','win_1h'],
    bonus2_src:['empty','win_pick','double','win_1m','win_2m','win_4m','win_6m','win_8m','win_10m','seer','','win_20m'],
    tier1_src:[],
    tier2_src:[],
    button_label:'Deal',
    hint_label:'',
    min_bet:2,
    max_bet:4,
    bet:4,
    deuce:[0,0],
    wrap:[6,6,6,6,6],
    bonus:[0,0,0],
    removed:0,
    stage:4,
    loop:null,
    frame:0,
    spin:1,
    spin:2,
    double:0,
    seer_deuce:[0,0],
    wincheck:0
  };

  //items pool

  gandlor.tier1_src=['empty','win_hp','win_hp','win_lf','win_lf','win_cm'];

  //without raiders we prioritize the more necessary items, of which CM is not
  if(prestige.raiders_unlocked==1){gandlor.tier1_src.push('win_cm');}

  if(prestige.cannibals==1 && tower2.wyverns>=10){
    gandlor.tier1_src.push('win_c10','win_c10');
    if(getRandomInt(1,5)==3){ gandlor.tier1_src.push('win_c100','win_c250'); }
  }

  gandlor.tier2_src.push('empty','win_sa','win_dagger','win_flyingship','win_frograin','win_qverin','win_thunder','win_treasure');

  if(prestige.raiders_unlocked==1){gandlor.tier2_src.push('win_haste');}


  if(mortalsOverpopulation()==true && riotsCompleted()==false && tower1.discontent.riot==0){ gandlor.tier2_src.push('win_de'); }
  
  if(prestige.garden.tree_state==3){ gandlor.tier1_src.push('win_pe'); gandlor.tier2_src.push('win_pe'); }


  if(getRandomInt(1,10)==5){ gandlor.tier2_src.push('win_gh'); }



  

  


}
function recalcCoins(){

  let coins=0;
  let gandlor_currency_rate=2.5;

  coins=(alchemist.upgrades_clicked/gandlor_currency_rate) - alchemist.coins_spent;

  return coins;

}
function gandlorLoop(){

  gandlor.frame+=1;

  if(gandlor.frame<=20){playAudio(10);}

  gandlor.spin++;if(gandlor.spin>5){gandlor.spin=1;}
  gandlor.spin2++;if(gandlor.spin2>5){gandlor.spin2=1;}

  if(gandlor.frame<10){gandlor.deuce[0]=gandlor.spin;gandlor.deuce[1]=gandlor.spin2;}
  if(gandlor.frame>10 && gandlor.frame<20){gandlor.deuce[1]=gandlor.spin2;}

  if(gandlor.frame==10){

    gandlor.deuce[0]=getRandomInt(1,5);
    if(gandlor.seer_deuce[0]!=0){gandlor.deuce[0]=gandlor.seer_deuce[0];}

  }else if(gandlor.frame==20){

    gandlor.deuce[1]=getRandomInt(1,5);
    if(gandlor.seer_deuce[0]!=0){gandlor.deuce[1]=gandlor.seer_deuce[1];player.gandlor.seer=0;gandlor.seer_deuce=[0,0];}

  }else if(gandlor.frame==26){

    gandlor.stage=3;

    clearInterval(gandlor.loop);
    gandlor.loop=null;gandlor.frame=0;

    gandlorGame();

  }

  gandlorUI();

}
function gandlorGame(){
  let winsum=0;
  let coins=recalcCoins();
  

  if(gandlor.stage==0){

    setupGandlor();

    gandlor.stage=1;

    gandlor.deuce=[0,0];
    gandlor.bonus=[0,0,0];
    gandlor.wrap=[getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5),getRandomInt(1,5)];
    gandlor.spin=getRandomInt(1,5);
    gandlor.spin2=getRandomInt(1,5);

    gandlor.games++;

    //all five cards are the same
    if(gandlor.wrap[0]==gandlor.wrap[1] && gandlor.wrap[0]==gandlor.wrap[2] && gandlor.wrap[0]==gandlor.wrap[3] && gandlor.wrap[0]==gandlor.wrap[4]){
      setTimeout('alchemist.coins_spent-=10;tower1.counter+=3600*tower1.current_rate_max;gandlor.bonus[0]=12;gandlor.bonus_class[0]=6;gandlorUI();playAudio(16)',200);
    }

    gandlorUI();

  }else if(gandlor.stage==1 && gandlor.removed>0){

    if(gandlor.bonus[0]==12){gandlor.bonus[0]=0;}

    gandlor.button_label='Grand Spin';

    if(gandlor.loop==null && gandlor.removed==2){

      gandlor.button_label='Spin';

      gandlor.stage=2;

      alchemist.coins_spent -= gandlor.bet-gandlor.min_bet;
      gandlor.bet=gandlor.min_bet;
        player.stats.coins-=2;//correcting stats
      
      gandlor.frame=0;
      gandlor.loop=setInterval(gandlorLoop, 100);

    }

    gandlorUI();

  }else if(gandlor.stage==3){//wincheck

    gandlor.button_label='Deal';

    if(gandlor.deuce[0]==gandlor.deuce[1]){gandlor.double=1;}

    for (let i = 0; i < 5; i++) {
      if(gandlor.deuce[0]==gandlor.wrap[i]){ gandlor.class_mod[i]='_dark'; gandlor.deuce_class_mod[0]='_dark'; if(gandlor.double==1){gandlor.deuce_class_mod[1]='_dark';} winsum++; }
      if(gandlor.double==0 && gandlor.deuce[1]==gandlor.wrap[i]){ gandlor.class_mod[i]='_dark'; gandlor.deuce_class_mod[1]='_dark'; winsum++; }
    }

    //if there is partial match and a double
    if(gandlor.double==1 && winsum>0 && winsum<3 && gandlor.bet==2){
      playAudio(9);
      setTimeout('gandlor.double=1;gandlor.bonus[0]=2;gandlor.bonus_class[0]=7;gandlor.bonus[1]=5;gandlor.bonus_class[1]=7;gandlorUI();playAudio(15)',200);
    }
    if(gandlor.double==1 && winsum>0 && winsum<4 && gandlor.bet==4){
      playAudio(9);
      setTimeout('gandlor.double=1;gandlor.bonus[0]=2;gandlor.bonus_class[0]=7;gandlor.bonus[1]=5;gandlor.bonus_class[1]=7;gandlorUI();playAudio(15)',200);
    }

    //if there is partial match and no double
    if(gandlor.double==0 && winsum>0 && winsum<3 && gandlor.bet==2){
      playAudio(9);
      gandlor.stage=4;alchemist.coins_spent-=gandlor.bet/2;
      coins=recalcCoins();
    }
    if(gandlor.double==0 && winsum>0 && winsum<4 && gandlor.bet==4){
      playAudio(9);
      gandlor.stage=4;alchemist.coins_spent-=gandlor.bet/2;
      coins=recalcCoins();
    }



    if(gandlor.bet==2 && winsum==3){
      playAudio(9);
      setTimeout('gandlor.bonus[0]=1;gandlor.bonus_class[0]=7;if(player.gandlor.seer==1){gandlor.bonus[1]=getRandomInt(6,8);}else{gandlor.bonus[1]=getRandomInt(6,9);}if(gandlor.double==1){gandlor.bonus[1]=11;}gandlor.bonus_class[1]=7;gandlor.bonus[2]=getRandomInt(1,gandlor.tier1_src.length-1);gandlor.bonus_class[2]=7;gandlorUI();playAudio(12)',200);
    }

    if(gandlor.bet==4 && winsum==4){
      playAudio(9);
      setTimeout('gandlor.bonus[0]=1;gandlor.bonus_class[0]=7;if(player.gandlor.seer==1){gandlor.bonus[1]=getRandomInt(6,8);}else{gandlor.bonus[1]=getRandomInt(6,9);}if(gandlor.double==1){gandlor.bonus[1]=11;}gandlor.bonus_class[1]=7;gandlor.bonus[2]=getRandomInt(1,gandlor.tier2_src.length-1);gandlor.bonus_class[2]=7;gandlorUI();playAudio(12)',200);
    }

    
      


    if(winsum<=0 && coins>=gandlor.min_bet){playAudio(8);gandlor.stage=4;}
    else if(winsum<=0 && coins<gandlor.min_bet){playAudio(13);gandlor.stage=4;}

  }else if(gandlor.stage==4){

    gandlor.bonus[0]=0;gandlor.bonus_class[0]=6;
    gandlor.bonus[1]=0;gandlor.bonus_class[1]=6;
    gandlor.bonus[2]=0;gandlor.bonus_class[2]=6;

    gandlorUI();

  }


}
function gandlorUI(){

  let coins=recalcCoins();

  gandlor_bet.text('Bet: ' + gandlor.bet);
  gandlor_funds.text('Coins: ' + numT(coins));


  if(gandlor.stage==1 && gandlor.seer_deuce[0]!=0){
    gandlor_deuce1.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.attack_src[gandlor.seer_deuce[0]] + '.svg" alt="'+gandlor.attack_src[gandlor.seer_deuce[0]] + '">').attr( "class", gandlor.class[gandlor.seer_deuce[0]] + gandlor.deuce_class_mod[0] );
    gandlor_deuce2.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.attack_src[gandlor.seer_deuce[1]] + '.svg" alt="'+gandlor.attack_src[gandlor.seer_deuce[1]] + '">').attr( "class", gandlor.class[gandlor.seer_deuce[1]] + gandlor.deuce_class_mod[1] );
  }else{
    gandlor_deuce1.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.attack_src[gandlor.deuce[0]] + '.svg" alt="'+gandlor.attack_src[gandlor.seer_deuce[0]] + '">').attr( "class", gandlor.class[gandlor.deuce[0]] + gandlor.deuce_class_mod[0] );
    gandlor_deuce2.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.attack_src[gandlor.deuce[1]] + '.svg" alt="'+gandlor.attack_src[gandlor.seer_deuce[1]] + '">').attr( "class", gandlor.class[gandlor.deuce[1]] + gandlor.deuce_class_mod[1] );
  }


  if(player.gandlor.seer==1){
    gandlor_bonus0.html('<img class="gandlor_cards" src="img/gandlor/seer.svg" alt="">').attr( "class", gandlor.class[7] );
  }else{
    gandlor_bonus0.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.bonus_src[gandlor.bonus[0]]+'.svg" alt="'+gandlor.bonus_src[gandlor.bonus[0]]+'">').attr( "class", gandlor.class[gandlor.bonus_class[0]] );
  }


  if(gandlor.bet==4){
    gandlor_bonus1.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.bonus2_src[gandlor.bonus[1]]+'.svg" alt="'+gandlor.bonus2_src[gandlor.bonus[1]]+'">').attr( "class", gandlor.class[gandlor.bonus_class[1]] );
  }else{
    gandlor_bonus1.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.bonus_src[gandlor.bonus[1]]+'.svg" alt="'+gandlor.bonus_src[gandlor.bonus[1]]+'">').attr( "class", gandlor.class[gandlor.bonus_class[1]] );
  }
  

  if(gandlor.bet==4){
    gandlor_bonus2.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.tier2_src[gandlor.bonus[2]]+'.svg" alt="'+gandlor.tier2_src[gandlor.bonus[2]]+'">').attr( "class", gandlor.class[gandlor.bonus_class[2]] );
  }else{
    gandlor_bonus2.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.tier1_src[gandlor.bonus[2]]+'.svg" alt="'+gandlor.tier1_src[gandlor.bonus[2]]+'">').attr( "class", gandlor.class[gandlor.bonus_class[2]] );
  }



  

  

  if(gandlor.removed==0){
    gandlor_wrap1.show();
    gandlor_wrap2.show();
    gandlor_wrap3.show();
    gandlor_wrap4.show();
    gandlor_wrap5.show();
  }

  gandlor_wrap1.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.src[gandlor.wrap[0]] + '.svg" alt="'+gandlor.src[gandlor.wrap[0]] + '">').attr( "class", gandlor.class[gandlor.wrap[0]] + gandlor.class_mod[0] );
  gandlor_wrap2.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.src[gandlor.wrap[1]] + '.svg" alt="'+gandlor.src[gandlor.wrap[1]] + '">').attr( "class", gandlor.class[gandlor.wrap[1]] + gandlor.class_mod[1] );
  gandlor_wrap3.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.src[gandlor.wrap[2]] + '.svg" alt="'+gandlor.src[gandlor.wrap[2]] + '">').attr( "class", gandlor.class[gandlor.wrap[2]] + gandlor.class_mod[2] );
  gandlor_wrap4.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.src[gandlor.wrap[3]] + '.svg" alt="'+gandlor.src[gandlor.wrap[3]] + '">').attr( "class", gandlor.class[gandlor.wrap[3]] + gandlor.class_mod[3] );
  gandlor_wrap5.html('<img class="gandlor_cards" src="img/gandlor/'+gandlor.src[gandlor.wrap[4]] + '.svg" alt="'+gandlor.src[gandlor.wrap[4]] + '">').attr( "class", gandlor.class[gandlor.wrap[4]] + gandlor.class_mod[4] );




  gandlor_deal.text(gandlor.button_label);

  if(gandlor.stage==4){

    if(coins>=gandlor.min_bet){
      gandlor_deal.prop('disabled',false);
    }else{
      gandlor_deal.prop('disabled',true);
    }

  }else if(gandlor.stage==1 && gandlor.removed>0 && coins>=0){
    gandlor_deal.prop('disabled',false);
  }
  else{gandlor_deal.prop('disabled',true);}

}

function fortificationInspect($button){

  var name='';
  var special='';
  var price=0;
  var level=0;

  switch($button.attr('id')){
    case 'fort_button_weaklings':
      name=fort_names[0];
      price=prestige.garden.fort_prices[0];
      level=prestige.garden.fortifications[0];
      if(prestige.raiders_unlocked==1){special='<span class="orange">Raiders unlocked</span>';}
      else{special='<i>Fortified weaklings unlocks raiders</i>';}
      special+='<i><br><br>Each subsequent fortification decreases raid time by 3%</i>';
      break;
    case 'fort_button_dwarves':
      name=fort_names[1];
      price=prestige.garden.fort_prices[1];
      level=prestige.garden.fortifications[1];
      if(prestige.gandlor==1){special='<span class="orange">Gandlor\'s Cave unlocked</span>';}
      else{special='<i>Fortified dwarves unlock Gandlor\'s Cave</i>';}
      if(prestige.garden.fortifications[1]>=2){special+='<br><br><span class="orange">Max amount of items you can win increased</span>';}
      else{special+='<i><br><br>Second fortification increases the max amount of items you can win</i>';}
      break;
    case 'fort_button_humans':
      name=fort_names[2];
      price=prestige.garden.fort_prices[2];
      level=prestige.garden.fortifications[2];
      if(prestige.museum==1){special='<span class="orange">Treasury unlocked</span>';}
      else{special='<i>Second fortification unlocks Treasury</i>';}
      break;
    case 'fort_button_ogres':
      name=fort_names[3];
      price=prestige.garden.fort_prices[3];
      level=prestige.garden.fortifications[3];
      if(prestige.cannibals==1){special='<span class="orange">Cannibals unlocked</span>';}
      else{special='<i>Fortified ogres unlock cannibals</i>';}
      
      break;
    case 'fort_button_wizards':
      name=fort_names[4];
      price=prestige.garden.fort_prices[4];
      level=prestige.garden.fortifications[4];
      if(prestige.hog==1){special='<span class="orange">Hall of Giants unlocked</span>';}
      else{special='<i>Second fortification unlocks Hall of Giants</i>';}
      break;
    case 'fort_button_warlocks':
      name=fort_names[5];
      price=prestige.garden.fort_prices[5];
      level=prestige.garden.fortifications[5];
      if(prestige.graveyard==1){special='<span class="orange">Necropolis unlocked</span>';}
      else{special='<i>Second fortification unlocks Necropolis</i>';}
      break;
    case 'fort_button_witches':
      name=fort_names[6];
      price=prestige.garden.fort_prices[6];
      level=prestige.garden.fortifications[6];
      if(prestige.aviary.unlocked==1){special+='<span class="orange">Aviary unlocked</span>';}
      else{special+='<i>Second fortification unlocks Aviary</i>';}
      break;
    case 'fort_button_wyverns':
      name=fort_names[7];
      price=prestige.garden.fort_prices[7];
      level=prestige.garden.fortifications[7];
      if(prestige.dragons_tower==1){special+='<span class="orange">Tower of Dragons unlocked</span>';}
      else{special+='<i>Second fortification unlocks Tower of Dragons</i>';}
      break;
    case 'fort_button_catapults':
      name=fort_names[8];
      price=prestige.garden.fort_prices[8];
      level=prestige.garden.fortifications[8];
      break;
    case 'fort_button_crossbows':
      name=fort_names[9];
      price=prestige.garden.fort_prices[9];
      level=prestige.garden.fortifications[9];
      break;
    case 'fort_button_cheiroballistras':
      name=fort_names[10];
      price=prestige.garden.fort_prices[10];
      level=prestige.garden.fortifications[10];
      break;
    case 'fort_button_cannibals':
      name=fort_names[11];
      price=prestige.garden.fort_prices[11];
      level=prestige.garden.fortifications[11];
      break;
  }


  fort_tooltip.html('<b>'+name+'</b><div class="tiny">Each fortification provides a permanent boost to the unit\'s power</div><br><div class="tinier_blue_bold">'+special+'</div><br><hr>');

  if(level>0){

    if(level<9){
      fort_tooltip.append('<br><div class="tiny">This unit is fortified: <b class="darkred">x'+Math.pow(2,level)+' permanent boost</b><br><br>Next fortification costs <b>'+price+' volcano breathers</b></div>');
    }else{
      fort_tooltip.append('<br><div class="tiny">This unit is fully fortified: <b class="darkred">x'+Math.pow(2,level)+' permanent boost</b></div>');
    }

    

  }else{
    fort_tooltip.append('<br><div class="tiny">Fortification costs <b>1 volcano breather</b></div>');
  }
  

  fort_tooltip.append('<br><hr><span class="tinier_right">FORTIFICATION</span>');

  position = $button.offset();

  fort_tooltip.show().css('width',settings.inspect_width*1.2).css('left', position.left-fort_tooltip.outerWidth()*0.5 +'px').css('top',position.top-fort_tooltip.outerHeight() +'px');

}
function treeInspect(){

  var position;
  var inspect_width;
  var tooltip_title;
  var tooltip_descr;

  switch(prestige.garden.tree_state){

    case 0:
      tooltip_title='Flameseed';
      break;

    case 1:
      tooltip_title='Firesprout';
      break;

    case 2:
      tooltip_title='Heatseedling';
      break;

    case 3:
      tooltip_title='Blazesapling';
      break;

    case 4:
      tooltip_title='Volcano Breather';
      break;

  };


  if(prestige.garden.tree_state>3){
    tooltip_descr='This volcano breather is mature.';
  }else{
    tooltip_descr='This volcano breather will mature in<br><b>'+treeAgeToTime(86400-prestige.garden.tree_age)+'</b>';
  }

  if(prestige.garden.tree_type=='magma'){
    tooltip_descr+='<br><br><span class="tinier_orange_bold">The flameseed was magma-infused! There\'s a 50% chance it will yield 2 breathers</span>';
  }

  if(prestige.garden.tree_type=='enchanted'){
    tooltip_descr+='<br><br><span class="tinier_purple_bold">The flameseed was enchanted! It will yield 2-8 breathers</span>';
  }
    
  garden_tooltip.html('<b>'+tooltip_title+'</b><div class="tiny">'+tooltip_descr+'</div><br><hr>');

  garden_tooltip.append('<ul class="tinier"><li>Flameseed becomes firesprout in '+treeAgeToTime(tree_stages[0])+'</li><li>Firesprout becomes heatseedling in '+treeAgeToTime(tree_stages[1])+'</li><li>Heatseedling becomes blazesapling in '+treeAgeToTime(tree_stages[2]-tree_stages[1]-tree_stages[0])+'</li><li>Blazesapling becomes a volcano breather in '+treeAgeToTime(tree_stages[3]-tree_stages[2])+'</li></ul><hr>');

  if(prestige.garden.tree_state==3){
    garden_tooltip.append('<br><div class="tinier"><i>It\'s Blaze Season!</i> <span class="purple">Peacocks</span> are available at Gandlor\'s Cave and <span class="darkred">Lava Fertilizers</span> are more effective</div>');
  }

  garden_tooltip.append('<br><div class="tinier">A mature volcano breather is used to <i>fortify</i> towers.<br><br>After a mature breather is removed from the volcano, a new breather will begin growing in its place.</div>');

  garden_tooltip.append('<br><hr><span class="tinier_right">VOLCANO</span>');

  position = button_tree.offset();
  inspect_width=alchemist_upgrades.width();
  if(inspect_width<10){inspect_width=settings.inspect_width;}
  else{settings.inspect_width=inspect_width;}

  garden_tooltip.show().css('width',inspect_width*1.2).css('left', position.left-garden_tooltip.outerWidth()+button_tree.outerWidth() +'px').css('top',position.top-garden_tooltip.outerHeight() +'px');

}
function treeSetType(){

  let breather_types=[];

  breather_types.push('normal','normal','normal','magma');
  
  if(alchemist.purse.items[0]==3){//Crescent Moon
    breather_types.push('enchanted','enchanted');//1 in 3 chance
  }

  prestige.garden.tree_type=choose(breather_types);

  if(alchemist.purse.items[0]==21){alchemist.purse.items[0]=22;recalcRaidTime();rateCalc();prestige.items[22]=1;}
  if(alchemist.purse.items[0]==6){alchemist.purse.items[0]=21;recalcRaidTime();rateCalc();prestige.items[21]=1;}

  if(alchemist.purse.items[0]==3 && prestige.garden.tree_type!='enchanted'){ alchemist.purse.items[0]=6; recalcRaidTime(); prestige.items[6]=1;}
  else if(alchemist.purse.items[0]==3 && prestige.garden.tree_type=='enchanted'){ alchemist.purse.items[0]=999; }

  alchemistUI();


}
function treeCollect(){

  if(prestige.garden.tree_type=='normal') {prestige.garden.trees++;}

  if(prestige.garden.tree_type=='magma'){
    prestige.garden.trees+=getRandomInt(1,2);
  }

  if(prestige.garden.tree_type=='enchanted'){
    prestige.garden.trees+=getRandomInt(2,8);
  }

}
function fortificationUpgrade(unit){

  if(prestige.garden.fortifications[unit]>=9){return;}

  prestige.garden.trees_spent+=prestige.garden.fort_prices[unit];
  prestige.garden.fort_prices[unit]++;
  prestige.garden.fortifications[unit]++;

  switch(unit){
    case 0:
      prestige.raiders_unlocked=1;prestige.alchemist_purse=1;
      if(prestige.garden.fortifications[unit]>1){prestige.fort_time_mod++;}
    break;
    case 1:
      if(prestige.garden.fortifications[unit]==1){prestige.alchemist_purse=1;prestige.gandlor=1;}
      if(prestige.garden.fortifications[unit]==2){prestige.gandlor_win_max++;}
    break;
    case 2:
      if(prestige.garden.fortifications[unit]==2){prestige.museum=1;}
    break;
    case 3:
      if(prestige.garden.fortifications[unit]==1){prestige.cannibals=1;}
    break;
    case 4:
      if(prestige.garden.fortifications[unit]==2){prestige.hog=1;}
    break;
    case 5:
      if(prestige.garden.fortifications[unit]==2){prestige.graveyard=1;}
    break;
    case 6:
      if(prestige.garden.fortifications[unit]==2){prestige.aviary.unlocked=1;}
    break;
    case 7:
      if(prestige.garden.fortifications[unit]==2){prestige.dragons_tower=1;}
    break;
    case 8:
    break;
    case 9:
    break;
    case 10:
    break;
    case 11:
    break;
  }

  fort_tooltip.hide();

}

function setupMedallions(){

  for (const [key, value] of Object.entries(medallions.milestones)) {

    medallions.blacksmiths[key]=0;
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
    medallions.cannibals[key]=0;


  }

}
function buildMedallionsList(creature=0){

  medallions.list=[];
  medallions.vlist=[];

  var medallions_multiplier=1;

  for (const [key, value] of Object.entries(medallions.milestones)) {

    
    if(medallions.milestones[key]<100){
      medallions_multiplier=medallions.milestones[key];
    }else{
      medallions_multiplier=50;
    }





    if(tower0.blacksmiths>=value){

      if(medallions.blacksmiths[key]==0){
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;

        medallions.blacksmiths[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;smiths');
      medallions.vlist.push(medallions.blacksmiths[key]);
    }


    if(tower1.weaklings>=value){

      if(medallions.weaklings[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.weaklings[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;weaklings');
      medallions.vlist.push(medallions.weaklings[key]);
    }

    if(tower1.dwarves>=value){

      if(medallions.dwarves[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.dwarves[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;dwarves');
      medallions.vlist.push(medallions.dwarves[key]);
    }

    if(tower1.humans>=value){

      if(medallions.humans[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.humans[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;humans');
      medallions.vlist.push(medallions.humans[key]);
    }

    if(tower1.ogres>=value){

      if(medallions.ogres[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.ogres[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;ogres');
      medallions.vlist.push(medallions.ogres[key]);
    }

    if(tower2.wizards>=value){

      if(medallions.wizards[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.wizards[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;wizards');
      medallions.vlist.push(medallions.wizards[key]);
    }

    if(tower2.warlocks>=value){

      if(medallions.warlocks[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.warlocks[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;warlocks');
      medallions.vlist.push(medallions.warlocks[key]);
    }

    if(tower2.witches>=value){

      if(medallions.witches[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.witches[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;witches');
      medallions.vlist.push(medallions.witches[key]);
    }

    if(tower2.wyverns>=value){

      if(medallions.wyverns[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.wyverns[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;wyverns');
      medallions.vlist.push(medallions.wyverns[key]);
    }

    if(tower3.catapults>=value){

      if(medallions.catapults[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.catapults[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;catapults');
      medallions.vlist.push(medallions.catapults[key]);
    }

    if(tower3.crossbows>=value){

      if(medallions.crossbows[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.crossbows[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;crossbows');
      medallions.vlist.push(medallions.crossbows[key]);
    }

    if(tower3.cheiroballistras>=value){

      if(medallions.cheiroballistras[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.cheiroballistras[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;ballistras');
      medallions.vlist.push(medallions.cheiroballistras[key]);
    }

    if(tower3.cannibals>=value){

      if(medallions.cannibals[key]==0){
        
        medallions.reward+=tower1.current_rate_max*medallions.power*medallions_multiplier;
        
        medallions.cannibals[key]=1;
      }
      
      medallions.list.push(medallions.milestones[key]+'&nbsp;cannibals');
      medallions.vlist.push(medallions.cannibals[key]);
    }

  }




  //alchemist upgrades for medallions
  buildAlchemistList(strangeUpgrades.medallions_milestones,medallions.vlist.length,alchemist.medallions,strangeUpgrades.medallions,'M');


}

function setupAlchemist(){

  for(let i=0;i<strangeUpgrades.blacksmiths.length;i++) {alchemist.blacksmiths[i]=0;}

  for(let i=0;i<strangeUpgrades.weaklings.length;i++) {alchemist.weaklings[i]=0;}
  for(let i=0;i<strangeUpgrades.dwarves.length;i++) {alchemist.dwarves[i]=0;}
  for(let i=0;i<strangeUpgrades.humans.length;i++) {alchemist.humans[i]=0;}
  for(let i=0;i<strangeUpgrades.ogres.length;i++) {alchemist.ogres[i]=0;}

    for(let i=0;i<strangeUpgrades.weaklings2.length;i++) {alchemist.weaklings2[i]=0;}

  for(let i=0;i<strangeUpgrades.wizards.length;i++) {alchemist.wizards[i]=0;}
  for(let i=0;i<strangeUpgrades.warlocks.length;i++) {alchemist.warlocks[i]=0;}
  for(let i=0;i<strangeUpgrades.witches.length;i++) {alchemist.witches[i]=0;}
  for(let i=0;i<strangeUpgrades.wyverns.length;i++) {alchemist.wyverns[i]=0;}

    for(let i=0;i<strangeUpgrades.warlocks2.length;i++) {alchemist.warlocks2[i]=0;}
    for(let i=0;i<strangeUpgrades.witches2.length;i++) {alchemist.witches2[i]=0;}
    for(let i=0;i<strangeUpgrades.wyverns2.length;i++) {alchemist.wyverns2[i]=0;}

  for(let i=0;i<strangeUpgrades.catapults.length;i++) {alchemist.catapults[i]=0;}
  for(let i=0;i<strangeUpgrades.crossbows.length;i++) {alchemist.crossbows[i]=0;}
  for(let i=0;i<strangeUpgrades.cheiroballistras.length;i++) {alchemist.cheiroballistras[i]=0;}
  for(let i=0;i<strangeUpgrades.cannibals.length;i++) {alchemist.cannibals[i]=0;}

    for(let i=0;i<strangeUpgrades.catapults2.length;i++) {alchemist.catapults2[i]=0;}
    for(let i=0;i<strangeUpgrades.crossbows2.length;i++) {alchemist.crossbows2[i]=0;}
    for(let i=0;i<strangeUpgrades.cheiroballistras2.length;i++) {alchemist.cheiroballistras2[i]=0;}

  for(let i=0;i<strangeUpgrades.hammer.length;i++) {alchemist.hammer[i]=0;}
  for(let i=0;i<strangeUpgrades.medallions.length;i++) {alchemist.medallions[i]=0;}
  for(let i=0;i<strangeUpgrades.counter.length;i++) {alchemist.counter[i]=0;}
  for(let i=0;i<strangeUpgrades.messengers.length;i++) {alchemist.messengers[i]=0;}
  for(let i=0;i<strangeUpgrades.snails.length;i++) {alchemist.snails[i]=0;}

  for(let i=0;i<strangeUpgrades.dragon1.length;i++) {alchemist.dragon1[i]=0;}
  for(let i=0;i<strangeUpgrades.dragon2.length;i++) {alchemist.dragon2[i]=0;}
  for(let i=0;i<strangeUpgrades.dragon3.length;i++) {alchemist.dragon3[i]=0;}
  for(let i=0;i<strangeUpgrades.dragon4.length;i++) {alchemist.dragon4[i]=0;}
  for(let i=0;i<strangeUpgrades.dragon5.length;i++) {alchemist.dragon5[i]=0;}

}

function buildAlchemistList(milestones,creatures_amount,alchemist_creatures_array,strangeUpgrades_creatures_array,creature_label){

  for (const [key, value] of Object.entries(milestones)) {
    if(creatures_amount>=value){

      for (let i = 0; i < alchemist_creatures_array.length; i++) {
        
        if(alchemist_creatures_array[i]==0 && creatures_amount>=strangeUpgrades_creatures_array[i][0]){

          alchemist_creatures_array[i]=1;

          let upgrade_pack='';
          if(strangeUpgrades_creatures_array[i][5]){
            upgrade_pack='<hr><span class="tinier_right">'+strangeUpgrades_creatures_array[i][5].toUpperCase()+'</span>';
          }else{
            upgrade_pack='<hr><span class="tinier_right">FUNDAMENTALS</span>';
          }

          let price=0;
          if(strangeUpgrades_creatures_array[i][4]==0){ price=tower1.current_rate_max*1000; }
          else{price=strangeUpgrades_creatures_array[i][4];}

          alchemist.lab.push({
            labels:creature_label,
            html:'<span class="'+strangeUpgrades_creatures_array[i][3]+'">'+creature_label+'</span>',
            html_disabled:'<span class="gray">'+creature_label+'</span>',
            html_button:'<b>'+strangeUpgrades_creatures_array[i][1]+'&nbsp;<span class="'+strangeUpgrades_creatures_array[i][3]+'">('+creature_label+')</span></b><div class="tiny">'+strangeUpgrades_creatures_array[i][2]+'</div>',
            upgrade_ids:i,
            upgrade_pack:upgrade_pack,
            upgrade_prices:price
          });

        }
        
      }

    }
  }

  alchemist.lab.sort((a, b) => parseFloat(a.upgrade_prices) - parseFloat(b.upgrade_prices));

  //console.log('Build alchemist:'+creature_label);

}

function alchemistInspect($button){

  let id=$button.attr('id');
    
  alchemist_tooltip.html(alchemist.lab[id].html_button+'<span class="tiny">Price: <b>'+numT(alchemist.lab[id].upgrade_prices)+'</b><span>'+alchemist.lab[id].upgrade_pack);

  var position = alchemist_label_elements[0].offset();
  var button_position = $button.offset();

  settings.inspect_width=alchemist_upgrades.width();

  alchemist_tooltip.show().css('width',settings.inspect_width*1.2).css('left', ((position.left)-alchemist_tooltip.outerWidth()) +'px').css('top',button_position.top +'px');

}
function alchemistUpgrade(id,ui=true){

  var upgrade_type=0;
  var upgrade_id=alchemist.lab[id].upgrade_ids;
  var upgrade_price=alchemist.lab[id].upgrade_prices;

    switch(alchemist.lab[id].labels){
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
      case 'F':
        upgrade_type=11;break;
      case 'Ca':
        upgrade_type=12;break;
      case 'Cr':
        upgrade_type=13;break;
      case 'Ch':
        upgrade_type=14;break;
      case 'B':
        upgrade_type=15;break;
      case 'E':
        upgrade_type=16;break;
      case 'DM':
        upgrade_type=17;break;
      case 'TG':
        upgrade_type=18;break;
      case 'WS':
        upgrade_type=19;break;
      case 'WF':
        upgrade_type=20;break;
      case 'CC':
        upgrade_type=21;break;
      case 'DA':
        upgrade_type=22;break;
      case 'RM':
        upgrade_type=23;break;
      case 'I':
        upgrade_type=24;break;
      case 'SN':
        upgrade_type=25;break;
      case 'Cb':
        upgrade_type=26;break;
      case 'dF':
        upgrade_type=27;break;
      case 'dD':
        upgrade_type=28;break;
      case 'dE':
        upgrade_type=29;break;
      case 'dS':
        upgrade_type=30;break;
      case 'dK':
        upgrade_type=31;break;
    }

    //aviary
    if(upgrade_type==24 && alchemist.aviary.incoming==1){

      if( aviaryCheck(upgrade_id)==true ){
        tower1.counter -= alchemist.lab[id].upgrade_prices;
        alchemist.lab.splice(id, 1);
  
        alchemist.aviary.display.push(upgrade_id);

        if(alchemist.aviary.display.length==prestige.aviary.display.length){
          prestige.aviary.completed=1;
        }

        alchemist_tooltip.hide();
        buyRecalc();
        return;
      }else{
        return;
      }

    }

    //flask
    if(upgrade_type==24 && alchemist.flask.incoming==1){
      tower1.counter -= alchemist.lab[id].upgrade_prices;
      alchemist.lab.splice(id, 1);

      makeIngredients(upgrade_id);
      alchemist_tooltip.hide();
      refreshUI();
      return;
    }

    //stoppages
    //don't equip item if purse is locked
    if(upgrade_type==24 && alchemist.purse.lock==1 && items[upgrade_id][4]=='equippable item'){
      if(upgrade_id==3 && (alchemist.purse.items[0]==6 || alchemist.purse.items[0]==21)){
        //allow crescent moons to be used even with the lock ON, provided full and fuller moon are equipped
      }else{
        items_lock.css('border-color','var(--yellow)');
        setTimeout(function() { refreshUI(); }, 100);
        return;
      }
      
    }
    //hangover potion is not used if devil's exhale
    if(upgrade_type==24 && upgrade_id==0 && alchemist.purse.items[0]==4){ return; }
    //crescent moon is not used if there is fullest moon
    if(upgrade_type==24 && upgrade_id==3 && alchemist.purse.items[0]==22){ return; }
    //flying ship is not used if there is an active messenger
    if(upgrade_type==24 && upgrade_id==18 && messenger.active==1){ return; }
    //dagger is not used if there are no more items
    if(upgrade_type==24 && upgrade_id==28 && alchemist.lab.length<2){ return; }
    //medicine is not used if there are no weaklings to heal
    if(upgrade_type==24 && upgrade_id==72 && tower1.weaklings_retired==0){ return; }
    //golden hen is not used if there are coins enough for a spin
    if(upgrade_type==24 && upgrade_id==19 && recalcCoins()>2){ return; }
    //haste is not used if there is no ongoing raid
    if(upgrade_type==24 && upgrade_id==24 && raiders.active!=1){ return; }
    //perfect knowledge is not used if there is an ongoing raid
    if(upgrade_type==24 && upgrade_id==26 && raiders.active==1){ return; }
    //Perfect Knowledge cannot remove runs from locations with limited levels
    if(upgrade_type==24 && upgrade_id==26 && locations[raiders.locations_index][4]<100){ return; }
    //Magma Bro only applicable when prestige.garden.tree_state>1 and if type==normal
    if(upgrade_type==24 && upgrade_id==40 && (prestige.garden.tree_state==0 || prestige.garden.tree_state==4 || prestige.garden.tree_type!='normal')){ return; }
    //cannot remove Devil's Exhale until riot is resolved
    if(upgrade_type==24 && alchemist.purse.items[0]==4 && tower1.discontent.riot<2 && items[upgrade_id][4]=='equippable item'){ return; }
    //defective dagger won't allow you to equip an item sometimes
    if(upgrade_type==24 && alchemist.purse.items[0]==17 && items[upgrade_id][4]=='equippable item' && getRandomInt(1,5)!=3){ return; }
    //complete lie blocks other items
    if(upgrade_type==24 && alchemist.purse.items[0]==65 && items[upgrade_id][4]=='equippable item'){ return; }
    //mosquito swarm
    if(upgrade_type==24 && alchemist.purse.items[0]==53 && items[upgrade_id][4]=='equippable item' && getRandomInt(1,3)!=2){
      //the purchased upgrade is eaten by the swarm
      tower1.counter -= alchemist.lab[id].upgrade_prices;
      alchemist.upgrades_clicked++;
      alchemist.lab.splice(id, 1);

      if(ui==true){
        alchemist_tooltip.hide();//if only dummy upgrades left, the tooltip won't get hidden
        if(misc_settings.gandlor_display==1){ recalcCoins();gandlorUI(); }
    
        buyRecalc();
        if(prestige.graveyard==1){buyRecalcGraveyard();}
      }

      return;
    
    }



    tower1.counter -= alchemist.lab[id].upgrade_prices;
    alchemist.upgrades_clicked++;

    //removing the purchased upgrade
    alchemist.lab.splice(id, 1);




    switch(upgrade_type){

      case 1:

        //whatever upgrade it is, we set it to "applied"
        alchemist.weaklings[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.weaklings_multiplier*=2;
            
            break;
          
        }

      break;

      case 2:

        alchemist.dwarves[upgrade_id]=2;
        

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[0]=1;
            break;

          default:
            alchemist.dwarves_multiplier*=2;
            
            break;
          
        }

      break;

      case 3:

        alchemist.humans[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[1]=1;
            break;

          default:
            alchemist.humans_multiplier*=2;
            
            break;
          
        }

      break;

      case 4:

        alchemist.ogres[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[2]=1;
            break;

          default:
            alchemist.ogres_multiplier*=2;
            
            break;
          
        }

      break;

      case 5:

        alchemist.wizards[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[3]=1;
            break;

          case 1:
            alchemist.wizards_strange_upgrades=1;
            break;

          case 2:
            alchemist.wizards_strange_upgrades=2;
            break;

          case 3:
            alchemist.wizards_strange_upgrades=4;
            break;

          case 4:
            alchemist.wizards_strange_upgrades=8;
            break;

          default:
            alchemist.wizards_multiplier*=2;
            
            break;
          
        }

      break;

      case 6:

        alchemist.warlocks[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[4]=1;
            break;

          default:
            alchemist.warlocks_multiplier*=2;
            
            break;
          
        }

      break;

      case 7:

        alchemist.witches[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[5]=1;
            break;

          default:
            alchemist.witches_multiplier*=2;
            
            break;
          
        }

      break;

      case 8:

        alchemist.wyverns[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.weaklings_multiplier*=2;
            alchemist.weakling_alliance[6]=1;
            break;

          default:
            alchemist.wyverns_multiplier*=2;
            
            break;
          
        }

      break;

      case 9:

        alchemist.hammer[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.metals_connection=1;
            break;

          case 1:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=10;
            break;

          case 2:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=50;
            break;

          case 3:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=100;
            break;

          case 4:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=250;
            break;

          case 5:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=250;
            break;

          case 6:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=500;
            break;

          case 7:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=500;
            break;

          case 8:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=500;
            break;

          case 9:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=500;
            break;

          case 10:
          case 11:
          case 12:
          case 13:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=1000;
            break;
          
        }

      break;

      case 10:

        alchemist.medallions[upgrade_id]=2;

        alchemist.medallions_multiplier_toggle=1;

        //effect
        switch(upgrade_id){

          default:
            alchemist.medallions_multiplier+=0.05;
            
            break;
          
        }

      break;

      case 11:

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

      break;

      case 12:

        alchemist.catapults[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.humans_multiplier*=2;
            alchemist.machines_conspiracy[0]=1;
            break;

          default:
            alchemist.catapults_multiplier*=2;
            
            break;
          
        }

      break;

      case 13:

        alchemist.crossbows[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.humans_multiplier*=2;
            alchemist.machines_conspiracy[1]=1;
            break;

          default:
            alchemist.crossbows_multiplier*=2;
            
            break;
          
        }

      break;

      case 14:

        alchemist.cheiroballistras[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.humans_multiplier*=2;
            alchemist.machines_conspiracy[2]=1;
            break;

          default:
            alchemist.cheiroballistras_multiplier*=2;
            
            break;
          
        }

      break;

      case 15:

        alchemist.blacksmiths[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_connection+=1;
            break;

          default:
            alchemist.hammer_multiplier*=2;
            alchemist.blacksmiths_multiplier*=2;
            break;
          
        }

        hammerRateCalc();

      break;

      case 16:

        alchemist.weaklings2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.weaklings_multiplier*=2;
            
            break;
          
        }

      break;

      case 17:

        alchemist.warlocks2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.warlocks_strange_upgrades+=0.1;
            break;
          
        }

      break;

      case 18:

        alchemist.witches2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.witches_strange_upgrades+=0.01;
            break;
          
        }

      break;

      case 19:

        alchemist.wyverns2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.wyverns_strange_upgrades+=0.001;
            break;
          
        }

      break;

      case 20:

        alchemist.catapults2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
            alchemist.catapults_strange_upgrades=1;
            break;

          case 1:
            alchemist.catapults_strange_upgrades=2;
            break;

          case 2:
            alchemist.catapults_strange_upgrades=4;
            break;

          case 3:
            alchemist.catapults_strange_upgrades=8;
            break;
          
        }

      break;

      case 21:

        alchemist.crossbows2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.crossbows_strange_upgrades+=0.1;
            break;
          
        }

      break;

      case 22:

        alchemist.cheiroballistras2[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.cheiroballistras_strange_upgrades+=0.01;
            break;
          
        }

      break;

      case 23:

        alchemist.messengers[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          case 0:
          case 1:
            alchemist.messengers_arrival_modifier*=0.5;
            alchemist.messengers_stay_modifier*=2;
            break;
          
          case 2:
            alchemist.messengers_stay_modifier*=2;
            break;
          
        }

        recalculateMessengersTime();

      break;

      case 24://ITEMS

        //effect
        switch(upgrade_id){

          case 0:

            if(alchemist.purse.items[1]!=0){
              winecellar.wine_frame=0;
            }

            alchemist.purse.potion_stack++;
            alchemist.purse.items[1]=0;
            
            break;

          case 2:
            if(prestige.garden.tree_state==3){prestige.garden.tree_age+=900;}
            else{prestige.garden.tree_age+=600;}
            break;

          case 3:
            if(alchemist.purse.items[0]==6){prestige.garden.tree_age+=600;recalcRaidTime();}
            else if(alchemist.purse.items[0]==21){prestige.garden.tree_age+=1500;recalcRaidTime();}
            else{
              alchemist.purse.items[0]=upgrade_id;
              recalcRaidTime();
            }
            break;

          case 4:

            if(riotsCompleted()==false){
              alchemist.purse.items[0]=upgrade_id;
              if(winecellar.drinking==1){winecellar.wine_frame=winecellar.duration+1;}
            }
            else{
              alchemist.purse.items[0]=33;
              recalcRaidTime();
              prestige.items[33]=1;
            }

            break;
          
          case 5:

            alchemist.purse.items[0]=upgrade_id;

            alchemist.coins_spent-=10;
            if(misc_settings.gandlor_display==1){ recalcCoins();gandlorUI(); }

            break;

          case 6:
          case 21:
          case 22:
              alchemist.purse.items[0]=upgrade_id;
              recalcRaidTime();
            break;

          case 7:
            alchemist.purse.items[0]=upgrade_id;

            if(prestige.garden.tree_state==3){alchemist.persistent_factors+=5;}
            
            break;          

          case 9:

            tower3.cannibals += 100;

            buildMedallionsList(13);
            buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
            break;

          case 10:

            tower3.cannibals += 10;

            buildMedallionsList(13);
            buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
            break;

          case 11:

            tower3.cannibals += 250;

            buildMedallionsList(13);
            buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
            break;
          
          case 30:

            tower3.cannibals += 50;

            buildMedallionsList(13);
            buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
            break;

          case 12:
            alchemist.purse.items[0]=upgrade_id;
            tower1.thunder[0]+=10;
            break;
          case 13:
            alchemist.purse.items[0]=upgrade_id;
            tower1.thunder[1]+=10;
            break;
          case 14:
            alchemist.purse.items[0]=upgrade_id;
            tower1.thunder[2]+=10;
            break;

          case 15:

            alchemist.purse.items[0]=upgrade_id;

            tower1.thunder[3]+=10;

            if(prestige.cannibals==1){
              tower3.cannibals += 10;

              buildMedallionsList(13);
              buildAlchemistList(strangeUpgrades.milestones,tower3.cannibals,alchemist.cannibals,strangeUpgrades.cannibals,'Cb');
            }

            break;
          
          case 16:
            if(prestige.unlocked_locations.horium==0){
              prestige.raiders_locations.push(2);
              prestige.unlocked_locations.horium=1;
            }else{
              if(prestige.raiders_locations[raiders.locations_pointer]==2){raiders.counter-=900;}
              else{raiders.counter-=600;}
            }
            
            break;

          case 18:
            messengerMachen();
            break;

          case 19:
            alchemist.coins_spent=0;
            recalcCoins();
            break;

          case 20:
            startFrogRain();
            break;

          case 24:
            raiders.counter-=600;
            break;

          case 26:
            raiders.locations_runs[raiders.locations_index]=0;
            calcRaidTime();
            break;

          case 27:
            //upgrade_price is added to compensate for the price of the upgrade
            let bounty=choose([90,300,540,720,900])*tower1.current_rate_max+upgrade_price;
            tower1.counter+=bounty;
            tower1.all_reincarnation_counter+=bounty;
            prestige.all_time_counter+=bounty;
            break;

          case 28:

            for (let i = 0; i < alchemist.lab.length; i++) {
              alchemist.lab[i].upgrade_prices*=0.9;
            }
            
            break;

          case 31:

            setTimeout(function (){thunderMachen();}, 500);
            
            break;

          case 36:

            necromancer.persistent_factors+=25;
            
            break;

          case 40:

            prestige.garden.tree_type='magma';
            
            break;

          case 41:

            alchemist.purse.items[0]=upgrade_id;
            tower1.thunder[1]+=10;
            
            break;

          case 42:

            alchemist.purse.items[0]=upgrade_id;

            for (let i = 0; i < alchemist.lab.length; i++) {
              alchemist.lab[i].upgrade_prices*=0.9;
            }
            
            break;

          case 46:

            for (let i = 0; i < alchemist.lab.length; i++) {
              alchemist.lab[i].upgrade_prices*=0.75;
            }
          
            break;

          case 47:

            prestige.garden.tree_age+=1800;
            
            break;

          case 48:

            alchemist.purse.items[0]=upgrade_id;
            tower1.thunder[1]+=20;
            
            break;

          case 49:

            alchemist.coins_spent-=30;
            recalcCoins();
            break;

          case 50:

            tower1.counter+=1800*tower1.current_rate_max+upgrade_price;
            tower1.all_reincarnation_counter+=1800*tower1.current_rate_max+upgrade_price;
            prestige.all_time_counter+=1800*tower1.current_rate_max+upgrade_price;
            break;

          case 51:

            tower1.counter+=300*tower1.current_rate_max+upgrade_price;
            tower1.all_reincarnation_counter+=300*tower1.current_rate_max+upgrade_price;
            prestige.all_time_counter+=300*tower1.current_rate_max+upgrade_price;
            break;

          case 52:

            tower1.counter+=600*tower1.current_rate_max+upgrade_price;
            tower1.all_reincarnation_counter+=600*tower1.current_rate_max+upgrade_price;
            prestige.all_time_counter+=600*tower1.current_rate_max+upgrade_price;
            break;

          case 56:

            alchemist.purse.items[0]=upgrade_id;

            for (let i = 0; i < alchemist.lab.length; i++) {
              if(alchemist.lab[i].upgrade_ids==31){
                insertItem(51);
              }
            }

            break;

          case 62:

            alchemist.persistent_factors++;

            break;

          case 64:

            let bag_of_items=[1,3,5,7,8,12,13,14,15,23,25,34,35,36,38,41,42,43,44,48,54,55,56,57];

            if(riotsCompleted()==true && tower1.discontent.riot==0 && prestige.items[33]==0){
              bag_of_items.push(33,33,33,33,33,33,33,33,33,33);
            }

            alchemist.purse.items[0]=choose(bag_of_items);
            prestige.items[64]++;

            if(alchemist.purse.items[0]==33){
              prestige.items[33]=1;
              recalcRaidTime();
            }

            break;

          case 66:

            for (let i = 0; i < alchemist.lab.length; i++) {
              alchemist.lab[i].upgrade_prices*=0.1;
            }

            break;

          case 68:

            tower1.counter+=3600*tower1.current_rate_max+upgrade_price;
            tower1.all_reincarnation_counter+=3600*tower1.current_rate_max+upgrade_price;
            prestige.all_time_counter+=3600*tower1.current_rate_max+upgrade_price;

            break;

          case 70:

            alchemist.purse.items[0]=upgrade_id;
            raiders.guild=0;

            break;

          case 72:

            tower1.weaklings_retired=0;

            break;




          default:
            alchemist.purse.items[0]=upgrade_id;
            break;
          
        }

      break;










      case 25:

        alchemist.snails[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.snail_reward_modifier*=2;
            break;
          
        }

      break;

      case 26:

        alchemist.cannibals[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            alchemist.cannibals_multiplier*=2;
            
            break;
          
        }

      break;

      case 27:
        alchemist.dragon1[upgrade_id]=2;
        switch(upgrade_id){
          default:
            alchemist.dragons_factor[0]++;
            recalculateFireMultiplier();
            break;
        }
      break;

      case 28:
        alchemist.dragon2[upgrade_id]=2;
        switch(upgrade_id){
          default:
            alchemist.dragons_factor[1]++;
            recalculateFireMultiplier();
            break;
        }
      break;

      case 29:
        alchemist.dragon3[upgrade_id]=2;
        switch(upgrade_id){
          default:
            alchemist.dragons_factor[2]++;
            recalculateFireMultiplier();
            break;
        }
      break;

      case 30:
        alchemist.dragon4[upgrade_id]=2;
        switch(upgrade_id){
          default:
            alchemist.dragons_factor[3]++;
            recalculateFireMultiplier();
            break;
        }
      break;

      case 31:
        alchemist.dragon5[upgrade_id]=2;
        switch(upgrade_id){
          default:
            alchemist.dragons_factor[4]++;
            recalculateFireMultiplier();
            break;
        }
      break;

    }

    if(ui==true){
      alchemist_tooltip.hide();//if only dummy upgrades left, the tooltip won't get hidden
      if(misc_settings.gandlor_display==1){ recalcCoins();gandlorUI(); }
  
      buyRecalc();
      if(prestige.graveyard==1){buyRecalcGraveyard();}
    }

}





function workshopGuideInspect($button){


  item_tooltip.html('<b class="gandlorpurple">Mystic Workshop</div>');
  
  item_tooltip.append('<div class="tiny">Click the "Distill items" button, then click any of the items you want to distill. This will break the item down into its ingredients.<br><i>Note: you will need to buy the item in order to do that</i></div><br>');

  item_tooltip.append('<div class="tiny">Once you get yourself some ingredients, you need to know the <b>Three Principles of Alchemy</b>:</div>');

  item_tooltip.append('<div class="tiny"><ul><li>A recipe should contain more than a single ingredient</li><li>No duplicate ingredients are allowed</li><li>Each recipe <i>must</i> contain alcohol</li></ul></div>');

  item_tooltip.append('<div class="tiny">The rest is up to you! Like any alchemist, you should experiment and see where the mysterious torrents of alchemy lead you!</div>');

  item_tooltip.append('<hr><span class="tinier_right">GUIDE</span>');

  var position = $button.offset();

  item_tooltip.show().css('width',settings.inspect_width*2).css('left', position.left-item_tooltip.outerWidth() +'px').css('top',position.top +'px');
}
function workshopItemInspect($button){

  if(alchemist.flask.result==99999){return;}

  var name=items[alchemist.flask.result][1];
  var descr=items[alchemist.flask.result][2];
  var color=items[alchemist.flask.result][3];

  item_tooltip.html('<b class="'+color+'">'+name+'</b><div class="tiny">'+descr+'</div>');
  

  item_tooltip.append('<hr><span class="tinier_right">'+items[alchemist.flask.result][4].toUpperCase()+'</span>');

  var position = flask_ingredients.offset();

  item_tooltip.show().css('width',settings.inspect_width*1.5).css('left', position.left+flask_ingredients.outerWidth()-5 +'px').css('top',position.top-2 +'px');

}
function ingredientInspect($button){

  if(alchemist.flask.tooltips==0){return;}

  var id = parseInt($button.attr('id').slice(3));

  var name=chemistry[id][1];
  var potency=chemistry[id][2];
      if(potency==0){potency='N/A';}
  var descr=chemistry[id][3];
  var color;
  var deck=chemistry[id][5];
      if(deck=='primary ingredient'){
        potency='';
        color=chemistry[id][4];
      }
      else{
        potency='<div class="tiny"><b>Potency: '+potency+'</b></div>';
        color='potency'+chemistry[id][2];

        if(name=='Alcohol'){color=chemistry[id][4];}

      }

  ingredient_tooltip.html('<b class="'+color+'">'+name+'</b>'+potency);

  ingredient_tooltip.append('<div class="tiny">'+descr+'</div>');

  ingredient_tooltip.append('<hr><span class="tinier_right">'+deck.toUpperCase()+'</span>');

  var position = flask_ingredients.offset();

  ingredient_tooltip.show().css('width',settings.inspect_width*1.5).css('left', position.left+flask_ingredients.outerWidth()-5 +'px').css('top',position.top-2 +'px');

}
function insertIngredient(id){
  alchemist.flask.ingredients.push({
    id:chemistry[id][0],
    name:chemistry[id][1],
    potency:chemistry[id][2],
    color:chemistry[id][4],
    type:chemistry[id][5],
    group:chemistry[id][6]
  });

  alchemist.flask.ingredients.sort((a, b) => {

    if (parseInt(a.group) < parseInt(b.group)) return -1;
    if (parseInt(a.group) > parseInt(b.group)) return 1;

    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
  });


}
function recordIngredients(id,arr){

  for (let i = 0; i < prestige.flask_knowledge.items_to_ing.length; i++) {
    if(id==prestige.flask_knowledge.items_to_ing[i]['item_id']){return false;}
  }

  prestige.flask_knowledge.items_to_ing.push({
    item_id:id,
    ingredients:arr
  });

}
function recordRecipes(id,primary=999,potency){

  for (let i = 0; i < prestige.flask_knowledge.ing_to_items.length; i++) {
    if(id==prestige.flask_knowledge.ing_to_items[i]['item_id']){return false;}
  }

  prestige.flask_knowledge.ing_to_items.push({
    item_id:id,
    primary:primary,
    potency:potency
  });

  prestige.flask_knowledge.ing_to_items.sort((a, b) => {

    if (parseInt(a.primary) < parseInt(b.primary)) return -1;
    if (parseInt(a.primary) > parseInt(b.primary)) return 1;

    if (a.potency < b.potency) return -1;
    if (a.potency > b.potency) return 1;

    return 0;
  });

}
function makeIngredients(id){

  switch(id){

    case 0:
      let ch=choose([1,2,3,4,49]);
      insertIngredient(0);
      insertIngredient(ch);
      recordIngredients(id,[0,83]);
      break;

    case 1:
      insertIngredient(12);
      insertIngredient(13);
      recordIngredients(id,[12,13]);
      break;

    case 2:
      insertIngredient(2);
      insertIngredient(6);
      insertIngredient(14);
      recordIngredients(id,[2,6,14]);
      break;

    case 3:
      insertIngredient(15);
      insertIngredient(16);
      recordIngredients(id,[15,16]);
      break;

    case 4:
      insertIngredient(12);
      insertIngredient(18);
      recordIngredients(id,[12,18]);
      break;

    case 5:
      insertIngredient(19);
      insertIngredient(29);
      insertIngredient(26);
      recordIngredients(id,[19,29,26]);
      break;

    case 7:
      insertIngredient(7);
      insertIngredient(9);
      recordIngredients(id,[7,9]);
      break;

    case 8:
      insertIngredient(7);
      insertIngredient(8);
      recordIngredients(id,[7,8]);
      break;

    case 9:
    case 10:
    case 11:
    case 30:
      insertIngredient(20);
      recordIngredients(id,[20]);
      break;

    case 12:
    case 14:
      insertIngredient(11);
      recordIngredients(id,[11]);
      break;

    case 13:
      insertIngredient(10);
      recordIngredients(id,[10]);
      break;

    case 15:
      insertIngredient(17);
      insertIngredient(5);
      recordIngredients(id,[17,5]);
      break;

    case 16:
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(28);
      insertIngredient(27);
      recordIngredients(id,[28,28,28,28,28,28,28,28,28,27]);
      break;

    case 17:
      insertIngredient(21);
      insertIngredient(22);
      recordIngredients(id,[21,22]);
      break;

    case 18:
      insertIngredient(4);
      insertIngredient(31);
      insertIngredient(8);
      recordIngredients(id,[4,31,8]);
      break;

    case 19:
      insertIngredient(7);
      insertIngredient(32);
      recordIngredients(id,[7,32]);
      break;

    case 20:
      insertIngredient(33);
      insertIngredient(33);
      insertIngredient(33);
      insertIngredient(33);
      insertIngredient(33);
      insertIngredient(33);
      insertIngredient(33);
      recordIngredients(id,[33,33,33,33,33,33,33]);
      break;

    case 23:
      insertIngredient(34);
      insertIngredient(2);
      recordIngredients(id,[34,2]);
      break;

    case 24:
      insertIngredient(8);
      insertIngredient(36);
      recordIngredients(id,[8,36]);
      break;

    case 25:
      insertIngredient(11);
      insertIngredient(20);
      insertIngredient(25);
      recordIngredients(id,[11,20,25]);
      break;

    case 26:
      insertIngredient(37);
      insertIngredient(38);
      recordIngredients(id,[37,38]);
      break;

    case 27:
      insertIngredient(39);
      insertIngredient(40);
      insertIngredient(41);
      recordIngredients(id,[39,40,41]);
      break;

    case 28:
      insertIngredient(21);
      insertIngredient(57);
      insertIngredient(27);
      recordIngredients(id,[21,57,27]);
      break;

    case 31:
      insertIngredient(23);
      insertIngredient(24);
      insertIngredient(25);
      recordIngredients(id,[23,24,25]);
      break;

    case 34:
      insertIngredient(6);
      insertIngredient(8);
      insertIngredient(35);
      recordIngredients(id,[6,8,35]);
      break;

    case 35:
      insertIngredient(0);
      insertIngredient(44);
      insertIngredient(45);
      insertIngredient(30);
      recordIngredients(id,[0,44,45,30]);
      break;

    case 36:
      insertIngredient(61);
      insertIngredient(46);
      insertIngredient(46);
      insertIngredient(46);
      recordIngredients(id,[61,46,46,46]);
      break;

    case 37:
      insertIngredient(3);
      insertIngredient(7);
      insertIngredient(10);
      insertIngredient(17);
      insertIngredient(18);
      insertIngredient(21);
      insertIngredient(35);
      insertIngredient(40);
      insertIngredient(73);
      recordIngredients(id,[3,7,10,17,18,21,35,40,73]);
      break;

    case 38:
      insertIngredient(73);
      recordIngredients(id,[73]);
      break;

    case 39:
      insertIngredient(74);
      insertIngredient(63);
      recordIngredients(id,[74,63]);
      break;

    case 40:
      insertIngredient(14);
      insertIngredient(43);
      insertIngredient(47);
      recordIngredients(id,[14,43,47]);
      break;

    case 41:
      insertIngredient(50);
      insertIngredient(51);
      insertIngredient(51);
      recordIngredients(id,[50,51,51]);
      break;

    case 42:
      insertIngredient(53);
      insertIngredient(54);
      insertIngredient(2);
      recordIngredients(id,[53,54,2]);
      break;

    case 43:
      insertIngredient(53);
      insertIngredient(54);
      insertIngredient(2);
      insertIngredient(56);
      recordIngredients(id,[53,54,2,56]);
      break;

    case 44:
      insertIngredient(45);
      insertIngredient(57);
      insertIngredient(19);
      recordIngredients(id,[45,57,19]);
      break;

    case 45:
      insertIngredient(58);
      recordIngredients(id,[58]);
      break;
    
    case 46:
      insertIngredient(59);
      insertIngredient(59);
      insertIngredient(59);
      recordIngredients(id,[59,59,59]);
      break;
    
    case 47:
      insertIngredient(61);
      insertIngredient(60);
      insertIngredient(43);
      insertIngredient(14);
      recordIngredients(id,[61,60,43,14]);
      break;

    case 48:
      insertIngredient(52);
      insertIngredient(51);
      insertIngredient(51);
      recordIngredients(id,[52,51,51]);
      break;

    case 49:
      insertIngredient(62);
      insertIngredient(55);
      recordIngredients(id,[62,55]);
      break;

    case 50:
      insertIngredient(63);
      insertIngredient(34);
      recordIngredients(id,[63,34]);
      break;

    case 51:
      insertIngredient(1);
      insertIngredient(2);
      insertIngredient(4);
      insertIngredient(49);
      recordIngredients(id,[1,2,4,49]);
      break;

    case 52:
      insertIngredient(1);
      insertIngredient(2);
      insertIngredient(4);
      insertIngredient(49);
      insertIngredient(3);
      recordIngredients(id,[1,2,4,49,3]);
      break;

    case 54:
      insertIngredient(64);
      insertIngredient(64);
      insertIngredient(64);
      insertIngredient(64);
      insertIngredient(64);
      insertIngredient(64);
      insertIngredient(64);
      recordIngredients(id,[64,64,64,64,64,64,64]);
      break;

    case 55:
      insertIngredient(65);
      insertIngredient(36);
      insertIngredient(66);
      insertIngredient(67);
      recordIngredients(id,[65,36,66,67]);
      break;

    case 56:
      insertIngredient(69);
      recordIngredients(id,[69]);
      break;

    case 57:
      insertIngredient(70);
      insertIngredient(71);
      recordIngredients(id,[70,71]);
      break;

    case 58:
      insertIngredient(38);
      insertIngredient(75);
      recordIngredients(id,[38,75]);
      break;

    case 59:
      insertIngredient(76);
      insertIngredient(77);
      recordIngredients(id,[76,77]);
      break;

    case 60:
      insertIngredient(76);
      insertIngredient(77);
      insertIngredient(60);
      recordIngredients(id,[76,77,60]);
      break;

    case 61:
      insertIngredient(39);
      insertIngredient(78);
      recordIngredients(id,[39,78]);
      break;

    case 62:
    case 64:
    case 65:
    case 66:
    case 67:
      insertIngredient(72);
      recordIngredients(id,[72]);
      break;

    case 63:
      insertIngredient(18);
      recordIngredients(id,[18]);
      break;

    case 68:
      insertIngredient(42);
      recordIngredients(id,[42]);
      break;

    case 69:
      insertIngredient(24);
      insertIngredient(79);
      insertIngredient(80);
      recordIngredients(id,[24,79,80]);
      break;

    case 72:
      insertIngredient(81);
      insertIngredient(82);
      recordIngredients(id,[81,82]);
      break;




    default:
      insertIngredient(19);
      insertIngredient(19);
      break;








  }

}
function recipeEval(){

  var mixer=0;
  var non_primary_mix=0;
  var recipe_length=alchemist.flask.recipe.length;
  alchemist.flask.amount=1;
  alchemist.flask.error=[1,1,1];//more than 1,alcohol,no duplicates

  //checking for length
  if(recipe_length>1){alchemist.flask.error[0]=0;}

  for (let i = 0; i < recipe_length; i++) {

    let ing_id=chemistry[alchemist.flask.recipe[i]][0];
    let ing_potency=parseInt(chemistry[alchemist.flask.recipe[i]][2]);
    mixer+=ing_potency;

    if(chemistry[alchemist.flask.recipe[i]][5]!='primary ingredient'){non_primary_mix+=ing_potency;}

    if(ing_potency==0){ alchemist.flask.amount *= 2; }

    //checking for alcohol
    if(ing_id==0){alchemist.flask.error[1]=0;}

  }

  //checking for duplicates (Set can only contain unique values)
  const s = new Set(alchemist.flask.recipe);
    if(recipe_length == s.size){
      alchemist.flask.error[2]=0;
    }
  

  //stop potency from overshooting into the next bucket
  if(non_primary_mix>50){alchemist.flask.error[0]=1;alchemist.flask.result=99999;alchemist.flask.confirm=0; return;}
    
  //checking for when there is more than 1 primary ingredient
  let amount_of_primary_ing=0;
  for (let i = 0; i < alchemist.flask.recipe.length; i++) {
    if(chemistry[alchemist.flask.recipe[i]][5]=='primary ingredient'){amount_of_primary_ing++;}
  }
  if(amount_of_primary_ing>1){alchemist.flask.error[0]=1;alchemist.flask.result=99999;alchemist.flask.confirm=0; return;}



  if(alchemist.flask.error[0]+alchemist.flask.error[1]+alchemist.flask.error[2]>0){alchemist.flask.result=99999;alchemist.flask.confirm=0; return;}



  switch(mixer){

    case 4:
      alchemist.flask.result=57;
      break;

    case 5:
      alchemist.flask.result=62;
      break;

    case 8:
      alchemist.flask.result=51;
      break;

    case 10:
      alchemist.flask.result=3;
      break;

    case 14:
      alchemist.flask.result=24;
      break;

    case 18:
      alchemist.flask.result=20;
      break;

    case 24:
      alchemist.flask.result=52;
      break;

    case 30:
      alchemist.flask.result=0;
      break;



    
    case 105:
      alchemist.flask.result=63;
      break;

    case 106:
      alchemist.flask.result=54;
      break;
    
    case 110:
      alchemist.flask.result=41;
      break;

    case 112:
      alchemist.flask.result=18;
      break;

    case 116:
      alchemist.flask.result=56;
      break;

    case 120:
      alchemist.flask.result=48;
      break;

    case 126:
      alchemist.flask.result=19;
      break;

    case 128:
      alchemist.flask.result=55;
      break;

    case 130:
      alchemist.flask.result=8;
      break;




    
    case 205:
      alchemist.flask.result=64;
      break;
    
    case 208:
      alchemist.flask.result=38;
      break;
    
    case 212:
      alchemist.flask.result=35;
      break;

    case 218:
      alchemist.flask.result=34;
      break;

    case 219:
      alchemist.flask.result=65;
      break;

    case 220:
      alchemist.flask.result=12;
      break;

    case 222:
      alchemist.flask.result=14;
      break;

    case 229:
      alchemist.flask.result=25;
      break;
    
    case 230:
      alchemist.flask.result=13;
      break;




    case 304:
      alchemist.flask.result=2;
      break;

    case 308:
      alchemist.flask.result=40;
      break;
    
    case 318:
      alchemist.flask.result=47;
      break;
    
    case 319:
      alchemist.flask.result=36;
      break;
    
    case 328:
      alchemist.flask.result=32;
      break;






    case 405:
      alchemist.flask.result=61;
      break;

    case 406:
      alchemist.flask.result=42;
      break;


    case 422:
      alchemist.flask.result=43;
      break;




    case 505:
      alchemist.flask.result=66;
      break;

    case 524:
      alchemist.flask.result=46;
      break;

    case 530:
      alchemist.flask.result=28;
      break;





    case 605:
      alchemist.flask.result=67;
      break;

    case 610:
      alchemist.flask.result=58;
      break;

    case 618:
      alchemist.flask.result=59;
      break;

    case 624:
      alchemist.flask.result=60;
      break;






    case 705:
      alchemist.flask.result=68;
      break;

    case 710:
      alchemist.flask.result=44;
      break;

    case 728:
      alchemist.flask.result=70;
      break;




    case 822:
      alchemist.flask.result=23;
      break;

    case 824:
      alchemist.flask.result=49;
      break;

    case 830:
      alchemist.flask.result=50;
      break;




    case 905:
      alchemist.flask.result=69;
      break;

    case 916:
      //alchemist.flask.result=71;
      break;

    case 920:
      alchemist.flask.result=72;
      break;






    case 20005:
      alchemist.flask.result=39;
      break;

    case 20012:
      alchemist.flask.result=45;
      break;

    case 20030:
      alchemist.flask.result=37;
      break;


      




    default:
      alchemist.flask.result=99999;
      alchemist.flask.confirm=0;
      break;

  }

}
function addToRecipe(id){

  id = id.slice(3);
  id = id.split("_");
  var item_id=parseInt(id[0]);
  var element_id=parseInt(id[1]);

  alchemist.flask.recipe.push(item_id);
  alchemist.flask.ingredients.splice(element_id,1);

  alchemist.flask.incoming=0;

}
function returnToIngredients(id){

  id = id.slice(3);
  id = id.split("_");
  var item_id=parseInt(id[0]);
  var element_id=parseInt(id[1]);

  //alchemist.flask.ingredients.push(item_id);
  insertIngredient(item_id);
  alchemist.flask.recipe.splice(element_id,1);

  alchemist.flask.incoming=0;

}

function ingredientsUI(){

  flask_ingredients.html('');
    
  for (let i = 0; i < alchemist.flask.ingredients.length; i++) {

    let ingredient_id=alchemist.flask.ingredients[i]['id'];
    let ingredient_html=chemistry[ingredient_id][1];
    let ingredient_class=chemistry[ingredient_id][4];


    if(chemistry[ingredient_id][5]=='primary ingredient'){
      ingredient_html='<u>'+chemistry[ingredient_id][1]+'</u>';
    }else{
      ingredient_class='potency'+chemistry[ingredient_id][2];
    }
    

    if(chemistry[ingredient_id][0]==0){
      ingredient_class=chemistry[ingredient_id][4];
    }

    flask_ingredients.append('<button id="ing'+ingredient_id+'_'+i+'" class="button6_ingredient"><span class="'+ingredient_class+'">' + ingredient_html + '</span></button>');

    

  }

  all_ingredients=$(".button6_ingredient");

  all_ingredients.mouseenter(function(){ingredientInspect($(this));
  }).mouseleave(function(){ ingredient_tooltip.hide();});


  all_ingredients.click(function(){
  
    playAudio(1);

    addToRecipe($(this).attr('id'));

    ingredient_tooltip.hide();
    flaskUI();
    
  });

}
function flaskUI(){

  if(alchemist.flask.tab==0){flask_tab_flask.attr("class","button8_tabs");}
  else{flask_tab_flask.attr("class","button8_tabs_inactive");}
  if(alchemist.flask.tab==1){flask_tab_ingredients.attr("class","button8_tabs");}
  else{flask_tab_ingredients.attr("class","button8_tabs_inactive");}
  if(alchemist.flask.tab==2){flask_tab_recipes.attr("class","button8_tabs");}
  else{flask_tab_recipes.attr("class","button8_tabs_inactive");}

  if(alchemist.flask.incoming==0){
    flask_load.attr( "class", "button6_flask_normal" ).text('Distill items');
    flask_ingredients.attr( "class", "ing" );
    alchemist_upgrades.removeClass( "blinking_red" );
  }else{
    flask_load.attr( "class", "button6_flask_loading" ).text('Finish distilling');
    flask_ingredients.attr( "class", "ing_loading" );
    alchemist_upgrades.attr( "class", "blinking_red" );
  }

  if(alchemist.flask.tab==0){

    tab_flask_contents.show();

    recipeEval();
  
    if(alchemist.flask.result==99999){
  
      if(alchemist.flask.error[0]==1){
        flask_result.text('nothing interesting').css( "color", "var(--gray)" );
      }else if(alchemist.flask.error[1]==1){
        flask_result.text('mixture unsolved').css( "color", "var(--gray)" );
      }else if(alchemist.flask.error[2]==1){
        flask_result.text('duplicates detected').css( "color", "var(--gray)" );
      }else{
        flask_result.text('nothing interesting').css( "color", "var(--gray)" );
      }
  
      flask_confirm_block.hide();
      
    }else{
  
      let item_amount='';
      if(alchemist.flask.amount>1){item_amount=' x'+alchemist.flask.amount;}
      flask_result.html('<span class="'+items[alchemist.flask.result][3]+'">' + items[alchemist.flask.result][1] + item_amount + '</span>' );
  
      if(alchemist.flask.confirm==0){flask_confirm_block.hide();}
      else{flask_confirm_block.show();}
  
    }
  
  
  
  
  
    if(alchemist.flask.recipe.length==0){
      flask_recipe.text('');
    }else{
  
      let primary_ing='Primary ingredient: none';
      let recipe_potency=0;
    
      flask_recipe.html('');
    
      for (let i = 0; i < alchemist.flask.recipe.length; i++) {
  
        let ingredient_html=chemistry[alchemist.flask.recipe[i]][1];
        let ingredient_class=chemistry[alchemist.flask.recipe[i]][4];
  
        if(chemistry[alchemist.flask.recipe[i]][5]=='primary ingredient'){
          ingredient_html='<u>'+chemistry[alchemist.flask.recipe[i]][1]+'</u>';
          primary_ing='Primary ingredient: ' +chemistry[alchemist.flask.recipe[i]][1];
        }else{//don't count the potency of the primary ingredient
          recipe_potency+=chemistry[alchemist.flask.recipe[i]][2];
          ingredient_class='potency'+chemistry[alchemist.flask.recipe[i]][2];
        }
  
        if(chemistry[alchemist.flask.recipe[i]][0]==0){
          ingredient_class=chemistry[alchemist.flask.recipe[i]][4];
        }
  
        
  
        flask_recipe.append('<button id="flk'+alchemist.flask.recipe[i]+'_'+i+'" class="button6_flask"><span class="'+ingredient_class+'">' + ingredient_html + '</span></button>' );
      }
  
      flask_recipe.prepend( primary_ing + ' | ' + 'Recipe potency: ' + recipe_potency + '<br><br>' );
    
    }
  
  
    
    if(alchemist.flask.ingredients.length==0){
      flask_ingredients.html('<i>distill an item to get ingredients</i>');
    }else{
    
      ingredientsUI();
    
    }
  
  
  
    
    all_recipe_buttons=$(".button6_flask");
  
    all_recipe_buttons.mouseenter(function(){ingredientInspect($(this));
    }).mouseleave(function(){ ingredient_tooltip.hide();ingredient_tooltip.text('');});
    
    all_recipe_buttons.click(function(){
  
      playAudio(6);
  
      returnToIngredients($(this).attr('id'));
  
      ingredient_tooltip.hide();
      flaskUI();
      
    });

  }else{tab_flask_contents.hide();}

  if(alchemist.flask.tab>0){

    tab_info_contents.show();

    if(alchemist.flask.tab==1){

      flask_list.html('');

      for (let i = 0; i < prestige.flask_knowledge.items_to_ing.length; i++) {

        let item_id=prestige.flask_knowledge.items_to_ing[i]['item_id'];
        let item_name=items[item_id][1];
        let item_color=items[item_id][3];

        flask_list.append('<button class="button6_record"><span class="'+item_color+'">' + item_name + '</span></button><button class="button6_record">></button>');

        for (let ii = 0; ii < prestige.flask_knowledge.items_to_ing[i]['ingredients'].length; ii++) {
          let ing_id=prestige.flask_knowledge.items_to_ing[i]['ingredients'][ii];
          let ing_name=chemistry[ing_id][1];
          let ing_color='potency'+ chemistry[ing_id][2];
            if(chemistry[ing_id][5]=='primary ingredient'){
              ing_color=chemistry[ing_id][4];
              ing_name='<u>'+chemistry[ing_id][1]+'</u>';
            }
            if(ing_id==0){ing_color=chemistry[ing_id][4];}
            flask_list.append('<button class="button6_record"><span class="'+ing_color+'">' + ing_name + '</span></button>');
        }

        flask_list.append('<br>');

      }

    }else if(alchemist.flask.tab==2){

      flask_list.html('');

      for (let i = 0; i < prestige.flask_knowledge.ing_to_items.length; i++) {

        let ing_id=prestige.flask_knowledge.ing_to_items[i]['primary'];
        let potency=prestige.flask_knowledge.ing_to_items[i]['potency'];
        let ing_name;
        let ing_color;

        if(ing_id==999){
          ing_name='none';
          ing_color='main_color';
        }else{
          ing_color=chemistry[ing_id][4];
          ing_name='<u>'+chemistry[ing_id][1]+'</u>';
        }

        flask_list.append('<button class="button6_record"><span class="'+ing_color+'">' + ing_name + '</span></button><button class="button6_record"><span class="'+ing_color+'">'+potency+'</span></button><button class="button6_record">></button>');


        let item_id=prestige.flask_knowledge.ing_to_items[i]['item_id'];
        let item_name=items[item_id][1];
        let item_color=items[item_id][3];

        flask_list.append('<button class="button6_record"><span class="'+item_color+'">' + item_name + '</span></button>');





        flask_list.append('<br>');

      }

    }

  }else{tab_info_contents.hide();}


  
}









function messengerMachen(message_type=''){

  if(messenger.active==1){ player.messengers.messenger_time=0; return;}
  if(session_data.counter<=1e4){ player.messengers.messenger_time=0; return;}
  if(alchemist.purse.items[0]==39){ player.messengers.messenger_time=0; return;}
  if(alchemist.purse.items[0]==65){ message_type='conartist'; }

  var position=indicators_table.offset();
  var position_hammer=hammer_button.offset();
  var title;
  var body;
  var rand=0;
  var messages_pool=[];
  var choice='';

  messenger.active=1;
  messenger.opacity=1;
  player.messengers.messenger_time=0;
  
  //setting position
  messenger.top=position.top;
  messenger.left=getRandomInt(0,position.left);

  recalculateMessengersTime();

  if(message_type!=''){

    choice=message_type;

  }else{

    messages_pool.push('gift','gift','tax','tax','instructor','scholar','monk');

    if(player.messengers.messenger_clicks>9){
      messages_pool.push('caravan');
      if(alchemist.purse.items[0]==1){messages_pool.push('caravan','caravan');}
    }

    if(prestige.gandlor==1){
      messages_pool.push('gandlor');
      if(alchemist.purse.items[0]==5){messages_pool.push('gandlor','gandlor');}
    }

    if(alchemist.purse.items[0]==35){messages_pool.push('rabbit','rabbit','rabbit','rabbit','rabbit','rabbit');}

    if(prestige.raiders_unlocked==0 && prestige.gandlor==0 && prestige.cannibals>0){messages_pool.push('cannibals');}

    if(prestige.historian==1){ messages_pool.push('historian','historian'); }
    
    choice=choose(messages_pool);

  }
    



  switch (choice) {
    case 'gift':

      title='A small gift';
      body=['You received a gift from a neighboring country','Small donation from a local monastery','Package from a wealthy relative','A long forgotten debt has been repaid','Payment for providing security services to a local merchant'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title;
      messenger.body=body[rand];
      messenger.reward=tower1.current_rate_max*120;
      messenger.is='gift';
      
      break;

    case 'tax':

      title=['Taxes collected!','Your other uncle was assassinated','Spoils of war!','Gift from the King'];
      body=['Tax collectors had done a good job','Inheritance is significant','One of your generals conquered a neighboring region','You are generously thanked for your service'];
      rand=getRandomInt(0,body.length-1);

      if(rand==1){ player.stats.uncles++; }

      messenger.title=title[rand];
      messenger.body=body[rand];
      messenger.reward=tower1.current_rate_max*360;
      messenger.is='tax';
      
      break;

    case 'instructor':

      messenger.hammer_multiplier=5*tower1.current_rate_max;//20

      title=['Dwarf Instructor'];
      body=['Hammer is at <b class="yellow">x'+numT(messenger.hammer_multiplier)+'</b>'];
      messenger.title=title[0];
      messenger.body=body[0];
      messenger.timeDuration=15;//60

      messenger.is='instructor';

      messenger.left=position_hammer.left+100;

      break;
    
    case 'scholar':

      messenger.hammer_multiplier=15*tower1.current_rate_max;//120

      title=['Dwarf Scholar'];
      body=['Hammer is at <b class="darkred">x'+numT(messenger.hammer_multiplier)+'</b>'];
      messenger.title=title[0];
      messenger.body=body[0];
      messenger.timeDuration=15;//15

      messenger.is='scholar';

      messenger.left=position_hammer.left+100;

      break;
    
    case 'caravan':

      title=['The Great Caravan has arrived'];
      body=['Wealth beyond your dreams!','Wealth beyond imagination','A singular collection of rarities','Beyond what a person might desire','Extensive collection of valuables'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[rand];
      messenger.reward=tower1.current_rate_max*1800;
      messenger.is='caravan';
      
      break;
    
    case 'shadow_caravan':

      title=['The Shadow Caravan has arrived'];
      body=['Remember this most rare event!'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[rand];
      messenger.reward=getRandomInt(50,60);
      messenger.is='shadow_caravan';
      
      break;
    
    case 'gandlor':

      title=['Gandlor\'s Invitation'];
      body=['Please accept this as a token of my friendship','Clobber some enemies, my friend','My establishment welcomes you and your money','Risk is good!'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[rand];
      messenger.reward=getRandomInt(20,35);
      messenger.is='gandlor';
      
      break;
    
    case 'monk':

      title=['You meet a monk','A spiritual leader visits the fortress','An abbot from the Moon Temple'];
      body=['Drinking doesn\'t need to have consequences','It\'s the spiritual way to drink'];
      
      rand=getRandomInt(0,title.length-1);
      messenger.title=title[rand];
      rand=getRandomInt(0,body.length-1);
      messenger.body=body[rand];
      messenger.reward='Hangover Potion';
      messenger.is='monk';
      
      break;

    case 'snail':

      title=['Snail Network'];
      body=['You have missed many messages, but we were able to retrieve some of it!'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[0];
      messenger.reward=tower1.current_rate_max*360*alchemist.snail_reward_modifier*prestige.snail_doubler;
      messenger.is='snail';
      
      break;

    case 'rabbit':

      title=['Spontaneous Rabbit'];
      body=['He\'ll either give you 30 mins of production or rob you of your last penny!'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[0];
      messenger.reward=tower1.current_rate_max*1800;
      messenger.is='rabbit';
      
      break;

    case 'conartist':

      title=['Conartist'];
      body=['I have this awesome offer for you: 1 hour of production!'];
      rand=getRandomInt(0,body.length-1);

      messenger.title=title[0];
      messenger.body=body[0];
      messenger.reward=tower1.current_rate_max*3600;
      messenger.is='conartist';
      
      break;
    
    case 'cannibals':

      title=['Cannibals are at the gate!'];
      body=['We heard you\'re hiring!','We wouldn\'t mind to take a bite at the enemy'];
      rand=getRandomInt(0,body.length-1);
      
      messenger.title=title[0];
      messenger.body=body[rand];
      messenger.reward='10 Cannibals';
      messenger.is='cannibals';
      
      break;
    
    case 'historian':

      title=['Historian is at the gate!'];
      body=['Knowledge is powder. Or something like that','Education breeds confidence. Or was it abstinence?','The only true wisdom is in knowing you know everything','It is during our darkest moments that we must focus to see if there are any more doughnuts left in the cupboard','A fool thinks himself to be wise, but a wise man knows himself to totally not be a fool. Like, that\'s how it is in real life','Education is not preparation for life; education is life itself... That is, until you pass your last exam and finally start living!','In learning you will teach, and in teaching you will learn. Cause in order to pay for your classes you\'ll totally have to do tutoring!'];
      rand=getRandomInt(0,body.length-1);
      
      messenger.title=title[0];
      messenger.body=body[rand];
      messenger.reward='A lesson in history';
      messenger.is='historian';
      
      break;
  

  }

  if(prestige.messenger_alert==1 && settings.audio_messenger==1){playAudio(19);}
  refreshUI();

}
function recalculateMessengersTime(){
  messenger.timeStay=15*prestige.timeStayMultiplier*alchemist.messengers_stay_modifier;
  player.messengers.timeMin=300*alchemist.messengers_arrival_modifier*prestige.messenger_distance;
  player.messengers.timeMax=900*alchemist.messengers_arrival_modifier*prestige.messenger_distance;

  if(alchemist.messengers_arrival_modifier==1){ messenger.missesThreshold=15; }
  else if(alchemist.messengers_arrival_modifier==0.5){ messenger.missesThreshold=20; }
  else if(alchemist.messengers_arrival_modifier==0.25){ messenger.missesThreshold=30; }
}
function restartWine(unit_id){

  winecellar.drunk = [1,1,1,1,1,1,1,1];

    winecellar.drunk_index=unit_id;

    winecellar.drunk[unit_id] = winecellar.multiplier;
    
    //we don't reset when it's Hangover Potion, unless it has reached normal duration territory
    if(alchemist.purse.items[1]!=0 || (winecellar.duration-winecellar.wine_frame)<wineDurationCalc()){
      winecellar.wine_frame=0;
      alchemist.purse.items[1]=999;
      alchemist.purse.potion_stack=0;
      winecellar.duration= wineDurationCalc();
    }

    //Devil's Exhale only affects mortals and only if the unit's champ is not unlocked
    if(alchemist.purse.items[0]==4 && unit_id<4 && tower1.discontent.riot<2 && prestige.champs.unlocked[unit_id]==0){
      tower1.discontent.drinking=1;
      tower1.discontent.selected_unit=unit_id;

      //to prevent other units from contributing to tower1.discontent.frame
      if(tower1.discontent.riot==1 && unit_id!=tower1.discontent.riot_unit){tower1.discontent.drinking=0;}

    }else{tower1.discontent.drinking=0;}

    winecellar.drinking=1;



}
function recalculateFireMultiplier(){

  var factor1 = dragons_tower.factors[0]*alchemist.dragons_factor[0];
  var factor2 = dragons_tower.factors[1]*alchemist.dragons_factor[1];
  var factor3 = dragons_tower.factors[2]*alchemist.dragons_factor[2];
  var factor4 = dragons_tower.factors[3]*alchemist.dragons_factor[3];
  var factor5 = dragons_tower.factors[4]*alchemist.dragons_factor[4];

  dragons_tower.dragons_multiplier = 1 + dragons_tower.dragon1 * (factor1 + dragons_tower.dragon2*factor2 + (dragons_tower.dragon3*factor3 + (dragons_tower.dragon4*factor4 + (dragons_tower.dragon5*factor5) )) );

  dragons_tower.dragons_multiplier *= 20;

  rateCalc();

}
function thunderMachen(){

  playAudio(17);

  for (let i = 0; i < tower1.thunder.length; i++) {
    tower1.thunder[i]+=getRandomInt(0,5);
    buyRecalc(i+1);
  }

}
function notificationMachen(notification_type=''){

  var title='';
  var body='';

  player.notification.active=1;

  let position=tower1_body.offset();
  player.notification.left=position.left;
  player.notification.top=$(window).height()-100;

  switch (notification_type) {

    case 'unit0stage1':

      title="There's a riot in the fortress!";
      body="'Walk no line if no wine!'<br><br>This chant has been echoing within the walls of the Fortress that has seen an unprecedented weakling riot emerge mere hours ago.<br><br>Stay tuned as we bring you a 24/7 report as these events unfold...";
      
      break;
    case 'unit0stage2':

      title="There's a riot in the fortress!";
      body="What the weaklings lack in brute force, they more than make up in numbers. Crowds of rioters have overwhelmed the guards and took over administration headquarters.<br><br>'It's been tough without wine for me too,' says a Fortress inhabitant, father of four";
      
      break;
    case 'unit0stage3':

      title="There's a riot in the fortress!";
      body="'Those impertinent weaklings have gone mad,' says a local ogre.<br><br>'They are on the right side of history,' objects the other. 'No one deserves to go to work sober!'";
      
      break;
    case 'unit0stage4':

      title="There's a riot in the fortress!";
      body="The rioters have flown their flag over the Fortress. It sports a skillfully drawn image of a drunk rabbit beating a dragon";
      
      break;
    case 'unit0stage5':

      title="There's a riot in the fortress!";
      body="The slogan 'I'm with you in spirit' is gaining popularity with the locals.<br><br>'I don't know the taste of my bread if I am gulping it down dry', says bakery regular";
      
      break;
    case 'unit0stage6':

      title="There's a riot in the fortress!";
      body="The King sent messengers demanding to know what's going on.<br><br>'His Highness is unclear on why the Fortress that is supposed to defend the southern border of his kingdom has flown a flag with a drunk rabbit'.<br><br>'It can be seen from the capital', the messengers say";
      
      break;
    case 'unit0stage7':

      title="There's a riot in the fortress!";
      body="'We want to feel like that rabbit, handsome and empowered' says Glen Tenderbeck, a weakling warrior. He has agreed to represent the rioters as everyone eyes a path to normality...";
      
      break;
    case 'unit0stage8':

      title="There's a riot in the fortress!";
      body="'I have just spoken to the administration. We have agreed that wine is imperative for the functioning of this fortress,' Glen Tenderbeck confirmed.<br><br>Tensions are still high, but there's cautious optimism in the air...";
      
      break;
    case 'unit0stage9':

      title="There's a riot in the fortress!";
      body="The administration has just announced an urgent order of several dozen barrels of wine from nearby wineries. Folks are winding down and preparing for a merry night out.<br><br>'We have also sent a messenger to the King informing him of our new flag and motto' says Tenderbeck.<br><br>'I'm with you in spirit,' chant the onlookers enthusiastically...";
      
      break;
    case 'unit0riotend':

      title="The riot has been resolved!";
      body="Glen Tenderbeck has emerged as the champion of the weaklings";
      
      break;



    case 'unit1stage1':

      title="There's a riot in the fortress!";
      body="'All is not well.'<br><br>These were the words of a local dwarf elder, just as he slammed shut the door of the wine cellar in our faces. In about an hour a barrel was thrown through the window and the brutal dwarvian riot has officially begun...";
      
      break;
    case 'unit1stage2':

      title="There's a riot in the fortress!";
      body="'We've been lied to,' says one of the rioters. Then he threw a barrel through the window.<br><br>Follow our 24/7 live report directly from the Fortress as these unprecedented events unfold...";
      
      break;
    case 'unit1stage3':

      title="There's a riot in the fortress!";
      body="The dwarves have completely emptied the wine cellar of barrels and are using them to break windows, as they chant 'We deserve to blink, we deserve to drink!'";
      
      break;
    case 'unit1stage4':

      title="There's a riot in the fortress!";
      body="The dwarves have unlocked the Tower of Dragons.<br><br>'They will let them out, and then they will ride them. You'll see,' say onlookers.";
      
      break;
    case 'unit1stage5':

      title="There's a riot in the fortress!";
      body="The riot has entered a dangerous phase. Piloted by a group of ten dwarves, dragon Katla has rammed through one of the towers, while the dwarves chanted 'Gold under the mountain is waiting for us! Give us the axe, the horse and the wine!'<br><br>Stay tuned for our breaking news coverage (yes, the tower broke)";
      
      break;
    case 'unit1stage6':

      title="There's a riot in the fortress!";
      body="The King sent messengers demanding to know what's going on.<br><br>'His Highness is unclear on why the Fortress that is supposed to defend the southern border of his kingdom has a column out of what looks like empty wine barrels'.<br><br>'It can be seen from the capital', the messengers say";
      
      break;
    case 'unit1stage7':

      title="There's a riot in the fortress!";
      body="As we're entering the third day of the brutal dwarvian riot, the administration has seen a glimpse of hope: Qvass III, the King of the Dwarves and the rightful ruler of Qven-Maeldea has arrived.<br><br>'The role of the monarch in dwarvian society cannot be underestimated,' says a local YouTube essayist";
      
      break;
    case 'unit1stage8':

      title="There's a riot in the fortress!";
      body="Qvass III is currently in talks with Fortress administration.<br><br>'I am pretty sure it's more of a party then a negotiation,' a reliable source suggests";
      
      break;
    case 'unit1stage9':

      title="There's a riot in the fortress!";
      body="It has been a long day and a long night, but finally an agreement is reached. Qvass III has ordered the dwarves to stand down, and in exchange the wine will be supplied immediately from royal wineries.<br><br>'You gotta fight for your right to party', say the dwarves";
      
      break;
    case 'unit1riotend':

      title="The riot has been resolved!";
      body="Qvass III has emerged as the champion of the dwarves";
      
      break;


    case 'unit2stage1':

      title="There's a riot in the fortress!";
      body="The brash humans demand the dignity of staying drunk while on duty!<br><br>They say it's been weeks and they won't take it anymore.<br><br>'The enemy is within!' they chant as they occupy the cellars and search for wine...";
      
      break;
    case 'unit2stage2':

      title="There's a riot in the fortress!";
      body="'We've been lied to,' says one of the rioters.<br><br>Follow our 24/7 live report directly from the Fortress as these unprecedented events unfold...";
      
      break;
    case 'unit2stage3':

      title="There's a riot in the fortress!";
      body="'There's smoke all around. I think the wretched humans just set the wine cellar on fire,' says the local ogre.<br><br>We've spoken to several of the rioters. They are adamant we call them 'concerned citizens' and complain that they are completely sober.<br><br>'In the past we could set things on fire and later claim we were drunk', one of them says...";
      
      break;
    case 'unit2stage4':

      title="There's a riot in the fortress!";
      body="The wine cellar has been completely burned down. As the clean up heads into the night, the rioters are nowhere to be seen. Several brute squads were sent to search them out and security has been beefed up at key locations";
      
      break;
    case 'unit2stage5':

      title="There's a riot in the fortress!";
      body="Humans have just set up barricades at the Outer Wall.<br><br>'I think they plan to climb up and throw things at the authorities. What things? I don't know... Carrots. Empty barrels. Squirrels. Whatever they find up there.'<br><br>Stay tuned for these breaking news straight out of the Fortress!";
      
      break;
    case 'unit2stage6':

      title="There's a riot in the fortress!";
      body="The King sent messengers demanding to know what's going on.<br><br>'His Highness is unclear on why the Fortress that is supposed to defend the southern border of his kingdom has a long stream of smoke over it'.<br><br>'It can be seen from the capital', the messengers say";
      
      break;
    case 'unit2stage7':

      title="There's a riot in the fortress!";
      body="'All we want are decent wages and a bit of wine,' says Astalm Bridgewinter.<br><br>This young catapult engineer claims to be the representative of the rioters. She says they are ready to talk.<br><br>'There's tension in the air, but I think it's time to find a path to normality. Also, everyone is really thirsty up there...'";
      
      break;
    case 'unit2stage8':

      title="There's a riot in the fortress!";
      body="Astalm Bridgewinter holds a decisive meeting with Fortress administration. A deal is struck to resupply the wine cellar with high quality wine from the gardens of Passionpluck. Some rioters will serve shifts on the Outer Wall as punishment, but are promised a barrel of wine.<br><br>'We might be guilty of all this hubbub, but we meant well.'<br><br>'It's the dangers of sobriety,' add onlookers";
      
      break;
    case 'unit2stage9':

      title="There's a riot in the fortress!";
      body="The riot has come to an end, but now everyone is partying. Humans are dead drunk.<br><br>'If anyone would attack us now, the fortress would be overrun in mere hours,' says a local.<br><br>'I think the attackers would just join in and get drunk with us,' says another";
      
      break;
    case 'unit2riotend':

      title="The riot has been resolved!";
      body="Astalm Bridgewinter has emerged as the champion of the humans";
      
      break;



    case 'unit3stage1':

      title="There's a riot in the fortress!";
      body="The ogres went against current fortress order and demanded their share of the booze!<br><br>'We usually have wine after work,' one of them says.<br><br>'We have large arms and massive fists,' says the other";
      
      break;

    case 'unit3stage2':

      title="There's a riot in the fortress!";
      body="What started like a normal night has now turned into a national emergency. The wine cellar and related facilities have been appropriated by the ogres!<br><br>Stay tuned...";
      
      break;

    case 'unit3stage3':

      title="There's a riot in the fortress!";
      body="As we reported earlier, the wine cellar and related facilities have been appropriated by the ogres!<br><br>But the real problem is that 'related facilities' include <i>fortress toilets</i>!<br><br>Tensions are rising...";
      
      break;

    case 'unit3stage4':

      title="There's a riot in the fortress!";
      body="With the toilets being controlled by the rebellious ogres, the population of the fortress has gradually began to see the side of the malcontents.<br><br>'Look, they want wine. We want to pee. Administration should be able to find some middle ground here,' one of the fortress inhabitants says.<br><br>'It all escalated so quickly', says the other.";
      
      break;

    case 'unit3stage5':

      title="There's a riot in the fortress!";
      body="The administration set up temporary toilets in the courtyard and is attempting to lure people in. Some tepidly agree, but most are suspicious.<br><br>'It's a trap!' they say";
      
      break;

    case 'unit3stage6':

      title="There's a riot in the fortress!";
      body="The King sent messengers demanding to know what's going on.<br><br>'His Highness is unclear on why the Fortress that is supposed to defend the southern border of his kingdom has a long line of people waiting to use the toilets!'<br><br>'It can be seen from the capital', the messengers say";
      
      break;

    case 'unit3stage7':

      title="There's a riot in the fortress!";
      body="A local wine expert by the name of Murker emerges as the representative of the rebels. He is an old ogre and a veteran - if not of the battlefield, then at least of the wine cellar.<br><br>'It has always been my favorite spot,' he explains. 'Something about it makes you want to go there with a cup'";
      
      break;

    case 'unit3stage8':

      title="There's a riot in the fortress!";
      body="What started as a fight for booze has grown into an unexpected conversation about wealth inequality and citizen rights. Murker's suggestion to provide every household with a private toilet has been widely seen as fair by the populace.<br><br>'There's dignity in not having to stand in line to pee,' say the inhabitants";
      
      break;

    case 'unit3stage9':

      title="There's a riot in the fortress!";
      body="Fortress administration has just agreed to finance the 'Toilet for Every Home' program. Murker is hailed as the hero of the people and plans to run for Fortress governor.<br><br>'Wine is important, but a proper sewage system is what creates civilizations!'";
      
      break;

    case 'unit3riotend':

      title="The riot has been resolved!";
      body="Murker has emerged as the champion of the ogres";
    
      break;

    case 'historian1':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Fortress Fun Fact "+prestige.historian_counter+":<br><br><i>Many units and entites in the Fortress are letter-coded</i>";
      body="For instance, all main towers start with an 'M': Metals, Mortals, Mages, Machines.<br><br>While mortals are all different, everyone in the Tower of Mages starts with a 'W' and everyone in the Tower of Machines starts with a 'C'.<br><br>They say that the reason dark magic upgrades support weaklings is because weaklings also start with a 'W'! Wicked Quests start with a 'W' as well, so the tower it is connected to is the one where everyone starts with a 'W'!";
      
      break;

    case 'historian2':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Fortress Fun Fact "+prestige.historian_counter+":<br><br><i>Why are Cannibals stationed with the machines?</i>";
      body="So that they don't eat anyone!";

      break;

    case 'historian3':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Fortress Fun Fact "+prestige.historian_counter+":<br><br><i>Why don't the blacksmiths get a drink?</i>";
      body="They do, but as alcohol is then immediately expelled through sweat, Fortress administration made the decisions to not waste wine on them";

      break;

    case 'historian4':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Fortress Fun Fact "+prestige.historian_counter+":<br><br><i>Did you know that...</i>";
      body="Incremental Fortress contains references to all sorts of things. Some of the more obscure ones point to games such as Commander Keen, Broken Sword, Doom II and Warcraft III";

      break;

    case 'historian5':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Fortress Fun Fact "+prestige.historian_counter+":<br><br><i>Did you know that...</i>";
      body="All the birds that one can craft with the 'Skull' ingredient are either mythological or extinct";

      break;
    
    case 'dwarf_hammers_warning':

      position=counter1_label.offset();
      player.notification.left=position.left;
      player.notification.top=$(window).scrollTop()+200;

      title="Balancing changes";
      body="Folks! Based on numerous player feedback I have nerfed the Dwarf Instructor and Scholar, to reduce player focus on active play during early game.<br><br>The game is designed with gradual unfolding of content in mind. If a random bonus is a bit too powerful, it makes many players focused on not skipping the bonus.<br><br>Don't worry, this makes the game closer to how I intended it to be played. There's loads ahead!<br><br>Thank you for your continuous feedback and thank you for playing! <3<br><br>Louigi";

      break;


    default:
      //if there is no notification to show, we just hide it
      player.notification.active=0;
      break;
  }

  player.notification.title=title;
  player.notification.body=body;

}




function locationInspect(){

  var position;

  if(raiders.active==0){calcRaidTime();}

    
  location_tooltip.html('<b>'+locations[raiders.locations_index][1]+'</b><div class="tiny">'+locations[raiders.locations_index][2]+'</div><br><hr>');

  if(locations[raiders.locations_index][4]<100){

    location_tooltip.append('<br><div class="tinier_blue">You have explored <b>'+raiders.locations_runs[raiders.locations_index]+'/'+locations[raiders.locations_index][4]+' '+locations[raiders.locations_index][5]+'</b></div>');

  }else{

    location_tooltip.append('<br><div class="tinier">The amount of raids to this location is <i>unlimited</i></div>');
    
  }

  if(raiders.locations_runs[raiders.locations_index]<locations[raiders.locations_index][4]){
    if(raiders.active==1){
      location_tooltip.append('<br><div class="tinier">Each subsequent raid takes <b>'+numT(locations[raiders.locations_index][3]*prestige.tarvel)+'</b> more seconds. The current raid will take <b>'+Math.floor(raiders.counter_max)+'</b> seconds</div>');
    }else{
      location_tooltip.append('<br><div class="tinier">Each subsequent raid takes <b>'+numT(locations[raiders.locations_index][3]*prestige.tarvel)+'</b> more seconds. Next raid will take <b>'+Math.floor(raiders.counter_max)+'</b> seconds</div>');
    }
  }else{
    location_tooltip.append('<br><div class="tinier">This location has been fully depleted</div>');
  }

  

  

  location_tooltip.append('<br><hr><span class="tinier_right">LOCATION</span>');

  position = raiders_location_button.offset();

  location_tooltip.show().css('width',alchemist_upgrades.width()*1.5).css('left', position.left+raiders_location_button.outerWidth() +'px').css('top',position.top +'px');

}
function lootInspect($button){

  var id=raiders.loot[ parseInt($button.attr('id').slice(2)) ];
  var position;
  var position_raiders;

  var name=items[id][1];
  var descr=items[id][2];
  var color=items[id][3];

  loot_tooltip.html('<b class="'+color+'">'+name+'</b><div class="tiny">'+descr+'</div>');
  

  loot_tooltip.append('<hr><span class="tinier_right">'+items[id][4].toUpperCase()+'</span>');

  position_raiders = raiders_button_win.offset();
  position = $button.offset();

  loot_tooltip.show().css('width',raiders_button_win.width()*1.5).css('left', position_raiders.left+raiders_button_win.outerWidth() +'px').css('top',position.top +'px');

}
function calcRaidTime(){

  raiders.counter_max=raiders.time+(locations[raiders.locations_index][3]*raiders.locations_runs[raiders.locations_index]*prestige.tarvel);

  raiders.counter_max*=1-prestige.fort_time_mod*0.03;

  if(alchemist.purse.items[0]==3){raiders.counter_max*=0.95;}
  if(alchemist.purse.items[0]==6){raiders.counter_max*=0.85;}
  if(alchemist.purse.items[0]==21){raiders.counter_max*=0.8;}
  if(alchemist.purse.items[0]==22){raiders.counter_max*=0.75;}
  if(alchemist.purse.items[0]==33){raiders.counter_max*=0.9;}

  raiders.counter=raiders.counter_max;

}
function recalcRaidTime(){
  //this function is used to apply changes to raid time if the raid is in progress
  if(raiders.active!=1){return;}

  var reduced_max;

  if(alchemist.purse.items[0]==3){reduced_max=raiders.counter_max*0.95;}
  if(alchemist.purse.items[0]==6){reduced_max=raiders.counter_max*0.85;}
  if(alchemist.purse.items[0]==21){reduced_max=raiders.counter_max*0.8;}
  if(alchemist.purse.items[0]==22){reduced_max=raiders.counter_max*0.75;}
  if(alchemist.purse.items[0]==33){reduced_max=raiders.counter_max*0.9;}

  //if you are in the middle of the run, it is intended to remove the time that wasn't supposed to be there had you applied the Moons before starting the run
  raiders.counter-=raiders.counter_max-reduced_max;

}
function generateLoot(){

  var ch=[];

  switch(raiders.locations_index){

    case 0://candemnese
      
      for (let i = 0; i < raiders.loot.length; i++) {

        ch=[];
        ch.push(0,2,2,3,27,27);
        if(Math.random()<0.5){ch.push(18);}
        if(prestige.cannibals==1 && tower2.wyverns>=10){ch.push(9,11,30);}
        if(prestige.gandlor==1){ch.push(1);}

        //last position gets a rare item
        if(i==raiders.loot.length-1){
          ch=[8,12,13,14,15,18,20,32,51];
          if(Math.random()<0.1){ch.push(26);}
          if(prestige.gandlor==1){ch.push(5);ch.push(19);}
          if(mortalsOverpopulation()==true && riotsCompleted()==false && tower1.discontent.riot==0){ ch.push(4); }
        }

        raiders.loot[i]=choose(ch);

      }

    break;

    case 1://ancient pyramid

      switch(raiders.locations_runs[1]){

        case 3:
          raiders.loot=[42,28,28,28];
          break;

        case 5:
          raiders.loot=[24,32,32,32];
          break;

        case 7:
          raiders.loot=[27,27,27,17];
          break;

        case 8:
          if(prestige.gandlor==1){raiders.loot=[8,20,24,23];}
          else{raiders.loot=[8,20,24,28];}
          break;
        
        case 9:
          raiders.loot=[20,20,24,16];
          break;

        case 10:
          raiders.loot=[13,19,24,25];
          break;

        default:

          for (let i = 0; i < raiders.loot.length; i++) {

            ch=[];
            ch.push(24,27,27,28);
            if(prestige.cannibals==1 && tower2.wyverns>=10){ch.push(9,11,30);}
    
            //last position gets a rare item
            if(i==raiders.loot.length-1){
              ch=[8,13,14,15,17,18,20,28,32,51,52];
              if(Math.random()<0.2){ch.push(26);}
              if(prestige.gandlor==1){ch.push(5);ch.push(19);}
              if(mortalsOverpopulation()==true && riotsCompleted()==false && tower1.discontent.riot==0){ ch.push(4); }
            }
    
            raiders.loot[i]=choose(ch);
    
          }

          break;

      }

    break;

    case 2://Horium

    for (let i = 0; i < raiders.loot.length; i++) {

      ch=[];
      ch.push(0,2,3,27,8,12,13,14,15,17,18,20,26,32,51,52);
      if(prestige.cannibals==1 && tower2.wyverns>=10){ch.push(30);}
      if(prestige.gandlor==1){ch.push(1,5,19);}
      if(mortalsOverpopulation()==true && riotsCompleted()==false && tower1.discontent.riot==0){ ch.push(4); }

      raiders.loot[i]=choose(ch);

    }

    break;

  }

}
function lootCollect(){

  var ch=getRandomInt(3,6);

  for (let i = 0; i < raiders.loot.length; i++) {

    if(raiders.loot[i]==32){
      for (let i = 0; i < ch; i++) { insertItem(31); }
    }else{
      insertItem( raiders.loot[i] );
    }

  }

  raiders.loot=[999,999,999,999];
  raiders.active=0;

  loot_tooltip.hide();
  raiders_button_win.hide();

  setTimeout(function (){refreshUI();}, 1000);
  

}
function startFrogRain(){

  var inc_ch=[];

  frogs={
    num:0,
    min:7,
    max:12,
    reward_mult:100,
    inc:0,
    clicked:0,
    reward:0,
    opacity:1,
    timer:null
  };

  frogs.num=getRandomInt(frogs.min,frogs.max);

  frogs.reward=tower1.current_rate_max*frogs.reward_mult;
  inc_ch.push(15,30,60);

  if(alchemist.purse.items[0]==8){inc_ch.push(100,250);}

  frogs.inc=choose(inc_ch);

  if(frogs.timer==null){
    frogs.timer=setInterval(frogTimer, 250);
  }

  frogs_button.show().css('opacity',frogs.opacity).html('Frog!<br><b>'+numT(frogs.reward)+'</b>').css('left', getRandomInt(100,$(window).width()-100)  +'px').css('top', getRandomInt($(window).scrollTop()+100,$(window).scrollTop()+$(window).height()-100) +'px');

}
function frogTimer(){

  frogs.opacity-=0.1;
  frogs_button.css('opacity',frogs.opacity);

  if(frogs.opacity<=0){
    playAudio(6);
    clearInterval(frogs.timer);frogs.timer=null;
  }

}



function buyRecalcHoG(creature=0){

  switch(creature){
    case 0: break;
  }

  recastGiants();
  rateCalc();
  storeState();
  refreshUIHoG();

}
function refreshUIHoG(){

  

  if(hog.all_diamonds>=72){hog_buymax.hide();}
  else{
    hog_buymax.show();

    if(tower1.counter>=hog.diamonds_price[hog.buy_amount_index]){hog_buymax.prop('disabled', false);}
    else{hog_buymax.prop('disabled', true);}

  }

  

  giant1_button.html('Giant Weaklings: '+numT(hog.giants[0])+'<br><span class="tiny">Power: '+numT(hog.power[0]+hog.diamonds[0]*hog.diamonds_power[0])+'</span>&nbsp;<img class="large_sprite" src="img/weakling.svg">');
  giant2_button.html('Giant Dwarves: '+numT(hog.giants[1])+'<br><span class="tiny">Power: '+numT(hog.power[1]+hog.diamonds[1]*hog.diamonds_power[1])+'</span>&nbsp;<img class="large_sprite" src="img/dwarf.svg">');
  giant3_button.html('Giant Humans: '+numT(hog.giants[2])+'<br><span class="tiny">Power: '+numT(hog.power[2]+hog.diamonds[2]*hog.diamonds_power[2])+'</span>&nbsp;<img class="large_sprite" src="img/human.svg">');
  giant4_button.html('Giant Ogres: '+numT(hog.giants[3])+'<br><span class="tiny">Power: '+numT(hog.power[3]+hog.diamonds[3]*hog.diamonds_power[3])+'</span>&nbsp;<img class="large_sprite" src="img/ogre.svg">');

  giant5_button.html('Giant Wizards: '+numT(hog.giants[4])+'<br><span class="tiny">Power: '+numT(hog.power[4]+hog.diamonds[4]*hog.diamonds_power[4])+'</span>&nbsp;<img class="large_sprite" src="img/wizard.svg">');
  giant6_button.html('Giant Warlocks: '+numT(hog.giants[5])+'<br><span class="tiny">Power: '+numT(hog.power[5]+hog.diamonds[5]*hog.diamonds_power[5])+'</span>&nbsp;<img class="large_sprite" src="img/warlock.svg">');
  giant7_button.html('Giant Witches: '+numT(hog.giants[6])+'<br><span class="tiny">Power: '+numT(hog.power[6]+hog.diamonds[6]*hog.diamonds_power[6])+'</span>&nbsp;<img class="large_sprite" src="img/witch.svg">');
  giant8_button.html('Giant Wyverns: '+numT(hog.giants[7])+'<br><span class="tiny">Power: '+numT(hog.power[7]+hog.diamonds[7]*hog.diamonds_power[7])+'</span>&nbsp;<img class="large_sprite" src="img/wyvern.svg">');

  diamonds1_button.html('Dreadshield: ' + numT(hog.diamonds[0]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds2_button.html('Dreadshield: ' + numT(hog.diamonds[1]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds3_button.html('Dreadshield: ' + numT(hog.diamonds[2]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds4_button.html('Dreadshield: ' + numT(hog.diamonds[3]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds5_button.html('Dreadshield: ' + numT(hog.diamonds[4]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds6_button.html('Dreadshield: ' + numT(hog.diamonds[5]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds7_button.html('Dreadshield: ' + numT(hog.diamonds[6]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');
  diamonds8_button.html('Dreadshield: ' + numT(hog.diamonds[7]) + '/9<br><span class="tiny">Price: ' + numT(hog.diamonds_price[hog.buy_amount_index])+'&nbsp;<img class="sprite" src="img/dreadshield.svg">');

  hog_multiplier_label.html('Giant Multiplier: <b>x'+numT(hog.multiplier)+'</b>');

  if(hog.diamonds[0]>=9){diamonds1_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds1_button.attr("class","button4");}
  if(hog.diamonds[1]>=9){diamonds2_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds2_button.attr("class","button4");}
  if(hog.diamonds[2]>=9){diamonds3_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds3_button.attr("class","button4");}
  if(hog.diamonds[3]>=9){diamonds4_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds4_button.attr("class","button4");}
  if(hog.diamonds[4]>=9){diamonds5_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds5_button.attr("class","button4");}
  if(hog.diamonds[5]>=9){diamonds6_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds6_button.attr("class","button4");}
  if(hog.diamonds[6]>=9){diamonds7_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds7_button.attr("class","button4");}
  if(hog.diamonds[7]>=9){diamonds8_button.html('<img class="dreadshield_sprite" src="img/dreadshield.svg">').attr("class","button4_done");}else{diamonds8_button.attr("class","button4");}

  if(prestige.museum==1){

    if(prestige.museum_waymorethanhalfwaythere==0){
      let howmany=0;

      for (let i = 0; i < prestige.items.length; i++) {
        if(prestige.items[i]>0){howmany++;}
      }
  
      if(howmany>=50){prestige.museum_waymorethanhalfwaythere=1;}
    }
    
    let m_multiplier=0;
    let label='';

    museum_list.html('');
    let num=0;
    for (const [key, value] of Object.entries(items)) {

      if(value[4]=='pack of items'){continue;}
  
      let color=value[3];
      
      let id=parseInt(key);
      let eclass='button6_museumitem';
      
      label=prestige.items[id]+'<br>'+value[1]+'<br><span class="tinier_special2">Contribution: '+parseFloat((0.001*prestige.museum_multiplier*prestige.items[id])*100).toFixed(1)+'%</span><br><span class="tinier_special">'+value[4]+'</span>';
  
      num++;
  
      
      if(prestige.items[key]==0){
        color='gray';

        if(prestige.museum_waymorethanhalfwaythere==0){
          label='Exhibit '+ num + '<br><span class="tinier_special">'+value[4]+'</span>';
        }else{
          label=value[1]+'<br><span class="tinier_special">'+value[4]+'</span>';
        }
        
        eclass='button6_museumitem_disabled';
      }else{
        m_multiplier+=(0.001*prestige.museum_multiplier*prestige.items[id])*100;
      }
      
  
      
  
      museum_list.append('<button class="'+eclass+'"><span class="'+color+'">'+label+'</span></button>');
  
      if((num)%5==0){
        museum_list.append('<br>');
      }
      
    }

    museum_multiplier_label.html('<br><div class="gandlorpink">Treasury Factor: <b>+'+Math.floor(m_multiplier)+'%</b></div>');

  }

  



  



}
function recastGiants(){

  hog.giants[0]=Math.floor((tower1.weaklings+tower1.weaklings_temp-tower1.weaklings_retired)/100);
  hog.giants[1]=Math.floor((tower1.dwarves+tower1.dwarves_temp)/100);
  hog.giants[2]=Math.floor((tower1.humans+tower1.humans_temp)/100);
  hog.giants[3]=Math.floor((tower1.ogres+tower1.ogres_temp)/100);

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


function setupGraveyard(){

  graveyard = {
    name:'Necropolis',
    multiplier:1,
    multiplier_increment:1,
    counter:0,
    rate:1,
    growth_rate:1.15,
    buy_amount_index:0,
    buy_amount_index_2:0,
    buy_amount_index_3:0,
    buy_amount:[1,10,100],
    artifacts:[0,0,0,0],
    artifact_pointer:0,
    artifacts_target:1e2,
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
    ghouls:0,
    ghouls_power:1e6,
    ghouls_price:[100000000,2030371823.805272,782874967133520],
    ghouls_base_price:1e8,
    ghasts:0,
    ghasts_power:1e6,
    ghasts_price:[1000000000,20303718238.052723,7828749671335200],
    ghasts_base_price:1e9,
    grimlords:0,
    grimlords_power:1e6,
    grimlords_price:[100000000000,2030371823805.2722,782874967133520000],
    grimlords_base_price:1e11,
    grandliches:0,
    grandliches_power:2e6,
    grandliches_price:[500000000000,10151859119026.361,3914374835667600000],
    grandliches_base_price:5e11,
    areds:0,
    areds_power:1e13,
    areds_price:[1000000000000,20303718238052.723,7828749671335200000],
    areds_base_price:1e12,
    ardemators:0,
    ardemators_power:1e13,
    ardemators_price:[10000000000000,203037182380527.22,78287496713352000000],
    ardemators_base_price:1e13,
    archsentinels:0,
    archsentinels_power:1e13,
    archsentinels_price:[100000000000000,2030371823805272.5,782874967133520000000],
    archsentinels_base_price:1e14,
    andlyns:0,
    andlyns_power:2e13,
    andlyns_price:[500000000000000,10151859119026362,3.9143748356676e+21],
    andlyns_base_price:5e14,
    
  };

  necromancer = {
    upgrades_clicked:0,
    prices_state:0,
    skeletons:[],
    spirits:[],
    specters:[],
    succubi:[],
    ghouls:[],
    ghasts:[],
    grimlords:[],
    grandliches:[],
    areds:[],
    ardemators:[],
    archsentinels:[],
    andlyns:[],
    lab:[],
    persistent_factors:0,
    skeletons_factor:1,
    spirits_factor:1,
    specters_factor:1,
    succubi_factor:1,
    ghouls_factor:1,
    ghasts_factor:1,
    grimlords_factor:1,
    grandliches_factor:1,
    areds_factor:1,
    ardemators_factor:1,
    archsentinels_factor:1,
    andlyns_factor:1
  };

  setupNecromancer();

  rateCalcGraveyard();

}
function buyRecalcGraveyard(creature=0){

  switch(creature){

    case 0: break;
    
    case 1:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.skeletons,necromancer.skeletons,hauntedUpgrades.skeletons,'Sk');
      break;

    case 2:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.spirits,necromancer.spirits,hauntedUpgrades.spirits,'Si');
      break;

    case 3:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.specters,necromancer.specters,hauntedUpgrades.specters,'Sp');
      break;

    case 4:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.succubi,necromancer.succubi,hauntedUpgrades.succubi,'Su');
      break;

    case 5:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.ghouls,necromancer.ghouls,hauntedUpgrades.ghouls,'Go');
      break;

    case 6:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.ghasts,necromancer.ghasts,hauntedUpgrades.ghasts,'Ga');
      break;

    case 7:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.grimlords,necromancer.grimlords,hauntedUpgrades.grimlords,'Gl');
      break;

    case 8:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.grandliches,necromancer.grandliches,hauntedUpgrades.grandliches,'Gr');
      break;

    case 9:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.areds,necromancer.areds,hauntedUpgrades.areds,'Ad');
      break;

    case 10:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.ardemators,necromancer.ardemators,hauntedUpgrades.ardemators,'Am');
      break;

    case 11:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.archsentinels,necromancer.archsentinels,hauntedUpgrades.archsentinels,'As');
      break;

    case 12:
      buildNecromancerList(hauntedUpgrades.milestones,graveyard.andlyns,necromancer.andlyns,hauntedUpgrades.andlyns,'An');
      break;

  }

  rateCalcGraveyard();
  storeState();
  refreshUIGraveyard();

}
function rateCalcGraveyard(){

  graveyard.rate = 1;

  undead_rate[0]=graveyard.skeletons*necromancer.skeletons_factor * ( graveyard.skeletons_power + (graveyard.spirits*necromancer.spirits_factor * (graveyard.spirits_power + graveyard.specters*necromancer.specters_factor * (graveyard.specters_power + graveyard.succubi * graveyard.succubi_power*necromancer.succubi_factor) ) ) );
  undead_rate[1]=graveyard.spirits*necromancer.spirits_factor * (graveyard.spirits_power + graveyard.specters*necromancer.specters_factor * (graveyard.specters_power + graveyard.succubi * graveyard.succubi_power*necromancer.succubi_factor)) ;
  undead_rate[2]=graveyard.specters*necromancer.specters_factor *(graveyard.specters_power + graveyard.succubi * graveyard.succubi_power*necromancer.succubi_factor);
  undead_rate[3]=graveyard.succubi * graveyard.succubi_power*necromancer.succubi_factor;

  graveyard.rate += undead_rate[0];


  undead_rate[4]=graveyard.ghouls*necromancer.ghouls_factor * ( graveyard.ghouls_power + (graveyard.ghasts*necromancer.ghasts_factor * (graveyard.ghasts_power + graveyard.grimlords*necromancer.grimlords_factor * (graveyard.grimlords_power + graveyard.grandliches * graveyard.grandliches_power*necromancer.grandliches_factor) ) ) );
  undead_rate[5]=graveyard.ghasts*necromancer.ghasts_factor * (graveyard.ghasts_power + graveyard.grimlords*necromancer.grimlords_factor * (graveyard.grimlords_power + graveyard.grandliches * graveyard.grandliches_power*necromancer.grandliches_factor) );
  undead_rate[6]=graveyard.grimlords*necromancer.grimlords_factor * (graveyard.grimlords_power + graveyard.grandliches * graveyard.grandliches_power*necromancer.grandliches_factor);
  undead_rate[7]=graveyard.grandliches * graveyard.grandliches_power*necromancer.grandliches_factor;

  graveyard.rate += undead_rate[4];


  undead_rate[8]=graveyard.areds*necromancer.areds_factor * ( graveyard.areds_power + (graveyard.ardemators*necromancer.ardemators_factor * (graveyard.ardemators_power + graveyard.archsentinels*necromancer.archsentinels_factor * (graveyard.archsentinels_power + graveyard.andlyns * graveyard.andlyns_power*necromancer.andlyns_factor) ) ) );
  undead_rate[9]=graveyard.ardemators*necromancer.ardemators_factor * (graveyard.ardemators_power + graveyard.archsentinels*necromancer.archsentinels_factor * (graveyard.archsentinels_power + graveyard.andlyns * graveyard.andlyns_power*necromancer.andlyns_factor) );
  undead_rate[10]=graveyard.archsentinels*necromancer.archsentinels_factor * (graveyard.archsentinels_power + graveyard.andlyns * graveyard.andlyns_power*necromancer.andlyns_factor);
  undead_rate[11]=graveyard.andlyns * graveyard.andlyns_power*necromancer.andlyns_factor;

  graveyard.rate += undead_rate[8];

  graveyard.rate *= 1+0.01*necromancer.persistent_factors;//cumulative instant item effects like Ice Queen

  if(prestige.necromancer_revenge>0){
    graveyard.rate *= 1 + 0.01*prestige.necromancer_revenge*graveyard.multiplier;
  }

  graveyard.rate *= 1 + 0.01*prestige.souls_multiplier;

  if(alchemist.purse.items[0]==36){ graveyard.rate *= 1.05; }//ice queen
  else if(alchemist.purse.items[0]==44){ graveyard.rate *= 10; }//grimlord's hat
  else if(alchemist.purse.items[0]==45){ graveyard.rate *= 1000; }//doomed artifact v


}
function refreshUIGraveyard(){



  necromancerUI();





  graveyard_multiplier_label.html('Haunted Multiplier: <b>x' + numT(graveyard.multiplier)+'<br>&nbsp;');

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

  skeletons_button.html( 'Skeletons: ' + numT(graveyard.skeletons) + '<br><span class="tiny"><i>&nbsp;</i><br>Power: +' + numT(undead_rate[0]) + '/s<br>Price: ' + numT(graveyard.skeletons_price[graveyard.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/skeleton.svg">' );

  spirits_button.html( 'Spirits: ' + numT(graveyard.spirits) + '<br><span class="tiny"><i>Boosts skeletons</i><br>Power: +' + numT(undead_rate[1]) + '/s<br>Price: ' + numT(graveyard.spirits_price[graveyard.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/spirit.svg">' );

  specters_button.html( 'Specters: ' + numT(graveyard.specters) + '<br><span class="tiny"><i>Boosts spirits</i><br>Power: +' + numT(undead_rate[2]) + '/s<br>Price: ' + numT(graveyard.specters_price[graveyard.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/specter.svg">' );

  succubi_button.html( 'Succubi: ' + numT(graveyard.succubi) + '<br><span class="tiny"><i>Boosts specters</i><br>Power: +' + numT(undead_rate[3]) + '/s<br>Price: ' + numT(graveyard.succubi_price[graveyard.buy_amount_index]) + '</span>&nbsp;<img class="sprite" src="img/succubus.svg">' );


  if(graveyard.succubi<50){ necropolis2_block.hide();necropolis2_lock.show(); }
  else{
    necropolis2_block.show();necropolis2_lock.hide();

    ghouls_button.html( 'Ghouls: ' + numT(graveyard.ghouls) + '<br><span class="tiny"><i>&nbsp;</i><br>Power: +' + numT(undead_rate[4]) + '/s<br>Price: ' + numT(graveyard.ghouls_price[graveyard.buy_amount_index_2]) + '</span>&nbsp;<img class="sprite" src="img/ghoul.svg">' );

    ghasts_button.html( 'Ghasts: ' + numT(graveyard.ghasts) + '<br><span class="tiny"><i>Boosts ghouls</i><br>Power: +' + numT(undead_rate[5]) + '/s<br>Price: ' + numT(graveyard.ghasts_price[graveyard.buy_amount_index_2]) + '</span>&nbsp;<img class="sprite" src="img/ghast.svg">' );

    grimlords_button.html( 'Grimlords: ' + numT(graveyard.grimlords) + '<br><span class="tiny"><i>Boosts ghasts</i><br>Power: +' + numT(undead_rate[6]) + '/s<br>Price: ' + numT(graveyard.grimlords_price[graveyard.buy_amount_index_2]) + '</span>&nbsp;<img class="sprite" src="img/grimlord.svg">' );

    grandliches_button.html( 'Grandliches: ' + numT(graveyard.grandliches) + '<br><span class="tiny"><i>Boosts grimlords</i><br>Power: +' + numT(undead_rate[7]) + '/s<br>Price: ' + numT(graveyard.grandliches_price[graveyard.buy_amount_index_2]) + '</span>&nbsp;<img class="sprite" src="img/grandlich.svg">' );


  }


  if(graveyard.grandliches<50){ necropolis3_block.hide();

    if(graveyard.succubi>=50){necropolis3_lock.show();}
    else{necropolis3_lock.hide();}
    
  }
  else{
    necropolis3_block.show();necropolis3_lock.hide();

    areds_button.html( 'Areds: ' + numT(graveyard.areds) + '<br><span class="tiny"><i>&nbsp;</i><br>Power: +' + numT(undead_rate[8]) + '/s<br>Price: ' + numT(graveyard.areds_price[graveyard.buy_amount_index_3]) + '</span>&nbsp;<img class="sprite" src="img/ared.svg">' );

    ardemators_button.html( 'Ardemators: ' + numT(graveyard.ardemators) + '<br><span class="tiny"><i>Boosts areds</i><br>Power: +' + numT(undead_rate[9]) + '/s<br>Price: ' + numT(graveyard.ardemators_price[graveyard.buy_amount_index_3]) + '</span>&nbsp;<img class="sprite" src="img/ardemator.svg">' );

    archsentinels_button.html( 'Archsentinels: ' + numT(graveyard.archsentinels) + '<br><span class="tiny"><i>Boosts ardemators</i><br>Power: +' + numT(undead_rate[10]) + '/s<br>Price: ' + numT(graveyard.archsentinels_price[graveyard.buy_amount_index_3]) + '</span>&nbsp;<img class="sprite" src="img/archsentinel.svg">' );

    andlyns_button.html( 'Andlyns: ' + numT(graveyard.andlyns) + '<br><span class="tiny"><i>Boosts archsentinels</i><br>Power: +' + numT(undead_rate[11]) + '/s<br>Price: ' + numT(graveyard.andlyns_price[graveyard.buy_amount_index_3]) + '</span>&nbsp;<img class="sprite" src="img/andlyn.svg">' );


  }


  


  graveyard_bai.css('background-color','var(--main_background)');
  graveyard2_bai.css('background-color','var(--main_background)');
  graveyard3_bai.css('background-color','var(--main_background)');

  if(graveyard.buy_amount_index==0){graveyard_buy1.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index==1){graveyard_buy10.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index==2){graveyard_buy100.css('background-color','var(--gray)');}

  if(graveyard.buy_amount_index_2==0){graveyard2_buy1.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index_2==1){graveyard2_buy10.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index_2==2){graveyard2_buy100.css('background-color','var(--gray)');}

  if(graveyard.buy_amount_index_3==0){graveyard3_buy1.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index_3==1){graveyard3_buy10.css('background-color','var(--gray)');}
  if(graveyard.buy_amount_index_3==2){graveyard3_buy100.css('background-color','var(--gray)');}




}
function necromancerUI(){

  if(prestige.souls_multiplier>1e6){
    necromancer_buymax_block.show();

    if(necromancer.lab.length>0 && graveyard.counter>=necromancer.lab[0].upgrade_prices){
      necromancer_buymax.prop('disabled', false);
    }else{
      necromancer_buymax.prop('disabled', true);
    }
  }
  else{necromancer_buymax_block.hide();}

  necromancer_upgrades.html('');
  necromancer_label_elements=[];
  necromancer.prices_state=0;

  for (let index = 0; index < necromancer.lab.length; index++) {

    if(graveyard.counter<necromancer.lab[index].upgrade_prices){

      necromancer_upgrades.append('<button id="n' + index + '" class="button66_tiny_disabled">' + necromancer.lab[index].html_disabled + '</button>');

    }else{

      necromancer_upgrades.append('<button id="n' + index + '" class="button66_tiny">' + necromancer.lab[index].html + '</button>');

      necromancer.prices_state++;

    }

    necromancer.prices_state+=1000;

    necromancer_label_elements[index]=$("#n"+index);

    if((index+1)%5==0){
      necromancer_upgrades.append('<br>');
    }
    
  }

  //filling with dummies 
  if(necromancer.lab.length<5){

    for (let index = 0; index < 5-necromancer.lab.length; index++) {
      necromancer_upgrades.append('<button class="button66_dummy">W</button>');
    }
    
  }

  all_necromancer_upgrades=$(".button66_tiny");
  all_necromancer_upgrades_disabled=$(".button66_tiny_disabled");

  all_necromancer_upgrades_disabled.css('color','#333');

  all_necromancer_upgrades.click(function(){

    playAudio(4);

    necromancerUpgrade( parseInt($(this).attr('id').slice(1)) );
    
  });
  all_necromancer_upgrades.mouseenter(function(){necromancerInspect(parseInt($(this).attr('id').slice(1)));
  }).mouseleave(function(){ necromancer_tooltip.hide();necromancer_tooltip.text('');});
  all_necromancer_upgrades_disabled.mouseenter(function(){necromancerInspect(parseInt($(this).attr('id').slice(1)));
  }).mouseleave(function(){ necromancer_tooltip.hide();necromancer_tooltip.text('');});

  

}
function necromancerState(){

  let check=0;

  for (let index = 0; index < necromancer.lab.length; index++) {

    if(graveyard.counter>=necromancer.lab[index].upgrade_prices){
      check++;
    }

    check+=1000;
    
  }

  if(check!=necromancer.prices_state){ necromancerUI(); }

}


function setupNecromancer(){

  for(let i=0;i<hauntedUpgrades.skeletons.length;i++) {necromancer.skeletons[i]=0;}
  for(let i=0;i<hauntedUpgrades.spirits.length;i++) {necromancer.spirits[i]=0;}
  for(let i=0;i<hauntedUpgrades.specters.length;i++) {necromancer.specters[i]=0;}
  for(let i=0;i<hauntedUpgrades.succubi.length;i++) {necromancer.succubi[i]=0;}
  for(let i=0;i<hauntedUpgrades.ghouls.length;i++) {necromancer.ghouls[i]=0;}
  for(let i=0;i<hauntedUpgrades.ghasts.length;i++) {necromancer.ghasts[i]=0;}
  for(let i=0;i<hauntedUpgrades.grimlords.length;i++) {necromancer.grimlords[i]=0;}
  for(let i=0;i<hauntedUpgrades.grandliches.length;i++) {necromancer.grandliches[i]=0;}
  for(let i=0;i<hauntedUpgrades.areds.length;i++) {necromancer.areds[i]=0;}
  for(let i=0;i<hauntedUpgrades.ardemators.length;i++) {necromancer.ardemators[i]=0;}
  for(let i=0;i<hauntedUpgrades.archsentinels.length;i++) {necromancer.archsentinels[i]=0;}
  for(let i=0;i<hauntedUpgrades.andlyns.length;i++) {necromancer.andlyns[i]=0;}

}

function buildNecromancerList(milestones,creatures_amount,necromancer_creatures_array,hauntedUpgrades_creatures_array,creature_label){

  for (const [key, value] of Object.entries(milestones)) {
    if(creatures_amount>=value){

      for (let i = 0; i < necromancer_creatures_array.length; i++) {
        
        if(necromancer_creatures_array[i]==0 && creatures_amount>=hauntedUpgrades_creatures_array[i][0]){

          necromancer_creatures_array[i]=1;

          let upgrade_pack='';
          if(hauntedUpgrades_creatures_array[i][5]){
            upgrade_pack='<hr><span class="tinier_right">'+hauntedUpgrades_creatures_array[i][5].toUpperCase()+'</span>';
          }else{
            upgrade_pack='<hr><span class="tinier_right">HAUNTED PRIMITIVES</span>';
          }

          let price=0;
          if(hauntedUpgrades_creatures_array[i][4]==0){ price=graveyard.rate*1000; }
          else{price=hauntedUpgrades_creatures_array[i][4];}

          necromancer.lab.push({
            labels:creature_label,
            html:'<span class="'+hauntedUpgrades_creatures_array[i][3]+'">'+creature_label+'</span>',
            html_disabled:'<span class="gray">'+creature_label+'</span>',
            html_button:'<b>'+hauntedUpgrades_creatures_array[i][1]+'&nbsp;<span class="'+hauntedUpgrades_creatures_array[i][3]+'">('+creature_label+')</span></b><div class="tiny">'+hauntedUpgrades_creatures_array[i][2]+'</div>',
            upgrade_ids:i,
            upgrade_pack:upgrade_pack,
            upgrade_prices:price
          });

        }
        
      }

    }
  }

  necromancer.lab.sort((a, b) => parseFloat(a.upgrade_prices) - parseFloat(b.upgrade_prices));

}

function necromancerInspect(id){
    
  necromancer_tooltip.html(necromancer.lab[id].html_button+'<span class="tiny">Price: <b>'+numT(necromancer.lab[id].upgrade_prices)+'</b><span>'+necromancer.lab[id].upgrade_pack);

  var position = necromancer_label_elements[0].offset();

  necromancer_tooltip.show().css('width',necromancer_upgrades.width()*1.2).css('left', ((position.left)-necromancer_tooltip.outerWidth()) +'px').css('top',position.top +'px');

}
function necromancerUpgrade(id,ui=true){

  var upgrade_type=0;
  var upgrade_id=necromancer.lab[id].upgrade_ids;

    switch(necromancer.lab[id].labels){
      case 'Sk':
        upgrade_type=1;break;
      case 'Si':
        upgrade_type=2;break;
      case 'Sp':
        upgrade_type=3;break;
      case 'Su':
        upgrade_type=4;break;
      case 'Go':
        upgrade_type=5;break;
      case 'Ga':
        upgrade_type=6;break;
      case 'Gl':
        upgrade_type=7;break;
      case 'Gr':
        upgrade_type=8;break;
      case 'Ad':
        upgrade_type=9;break;
      case 'Am':
        upgrade_type=10;break;
      case 'As':
        upgrade_type=11;break;
      case 'An':
        upgrade_type=12;break;
    }

    //stoppages
    //hangover potion is not used if another one is in effect
    //if(upgrade_type==24 && upgrade_id==0 && alchemist.purse.items[1]==0){ return; }


    graveyard.counter -= necromancer.lab[id].upgrade_prices;
    necromancer.upgrades_clicked++;

    //removing the purchased upgrade
    necromancer.lab.splice(id, 1);


    switch(upgrade_type){

      case 1:

        necromancer.skeletons[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.skeletons_factor+=0.1;
            break;
          
        }

      break;

      case 2:

        necromancer.spirits[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.spirits_factor+=0.1;
            break;
          
        }

      break;

      case 3:

        necromancer.specters[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.specters_factor+=0.1;
            break;
          
        }

      break;

      case 4:

        necromancer.succubi[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.succubi_factor+=1;
            break;
          
        }

      break;

      case 5:

        necromancer.ghouls[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.ghouls_factor+=1;
            break;
          
        }

      break;

      case 6:

        necromancer.ghasts[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.ghasts_factor+=0.1;
            break;
          
        }

      break;

      case 7:

        necromancer.grimlords[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.grimlords_factor+=0.1;
            break;
          
        }

      break;

      case 8:

        necromancer.grandliches[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.grandliches_factor+=1;
            break;
          
        }

      break;

      case 9:

        necromancer.areds[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.areds_factor+=1;
            break;
          
        }

      break;

      case 10:

        necromancer.ardemators[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.ardemators_factor+=0.1;
            break;
          
        }

      break;

      case 11:

        necromancer.archsentinels[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.archsentinels_factor+=0.1;
            break;
          
        }

      break;

      case 12:

        necromancer.andlyns[upgrade_id]=2;

        //effect
        switch(upgrade_id){

          default:
            necromancer.andlyns_factor+=1;
            break;
          
        }

      break;

      

    }




    
    if(ui==true){
      necromancer_tooltip.hide();
      buyRecalcGraveyard();
    }

    


}




function setupLibraryUpgrades(){

  for(let i=0;i<library.tome_intro.items.length;i++) {prestige.library.tome_intro[i]=0;}
  for(let i=0;i<library.tome_weaklings.items.length;i++) {prestige.library.tome_weaklings[i]=0;}
  for(let i=0;i<library.tome_dwarves.items.length;i++) {prestige.library.tome_dwarves[i]=0;}
  for(let i=0;i<library.tome_darkarts.items.length;i++) {prestige.library.tome_darkarts[i]=0;}
  for(let i=0;i<library.tome_inventions.items.length;i++) {prestige.library.tome_inventions[i]=0;}
  for(let i=0;i<library.tome_timedivinations.items.length;i++) {prestige.library.tome_timedivinations[i]=0;}
  for(let i=0;i<library.tome_alcohol.items.length;i++) {prestige.library.tome_alcohol[i]=0;}
  for(let i=0;i<library.tome_alchemy.items.length;i++) {prestige.library.tome_alchemy[i]=0;}
  for(let i=0;i<library.tome_fortress.items.length;i++) {prestige.library.tome_fortress[i]=0;}
  for(let i=0;i<library.tome_dead.items.length;i++) {prestige.library.tome_dead[i]=0;}

  prestige.library.tome_selected_id=8;

}
function showTomePage(tome){

  reincarnation_tome_page.html('<table>');

  for (let i = 0; i < tome.items.length; i++) {

    if(isLibraryUpgradeSold(prestige.library.tome_selected_id,i)==true){
      reincarnation_tome_page.append( '<tr><td>&#x2726;&#xFE0E; <b>' + tome.items[i] + '</b></td><td width="25%"><button disabled="disabled" id="r'+i+'" class="library_upgrade_button">Sold</button></td></tr>' );
    }else{
      if(tome.prices[i]<=(prestige.all_time_mana-prestige.spent_mana)){
        reincarnation_tome_page.append( '<tr><td>&#x2726;&#xFE0E; <b>' + tome.items[i] + '</b></td><td width="25%"><button id="r'+i+'" class="library_upgrade_button">Buy ' + numT(tome.prices[i]) + '</button></td></tr>' );
      }else{
        reincarnation_tome_page.append( '<tr><td>&#x2726;&#xFE0E; <b>' + tome.items[i] + '</b></td><td width="25%"><button disabled="disabled" id="r'+i+'" class="library_upgrade_button">Buy ' + numT(tome.prices[i]) + '</button></td></tr>' );
      }
    }

    

    
    reincarnation_tome_page.append( '<tr><td>'+tome.descr[i]+'</td><td></td></tr>');

    reincarnation_tome_page.append( '<tr><td colspan="2">&nbsp;</td></tr>');

  }

  reincarnation_tome_page.append('</table>');

  library_upgrade_button=$(".library_upgrade_button");

  library_upgrade_button.click(function(){

    playAudio(6);

    libraryUpgrade( parseInt($(this).attr('id').slice(1)) );

  });





}
function isLibraryUpgradeSold(tome=8,upgrade_id){

  switch(tome){

    case 1:
      if(prestige.library.tome_weaklings[upgrade_id]==1){return true;}
      else{return false;}

    case 2:
      if(prestige.library.tome_dwarves[upgrade_id]==1){return true;}
      else{return false;}

    case 3:
      if(prestige.library.tome_darkarts[upgrade_id]==1){return true;}
      else{return false;}

    case 4:
      if(prestige.library.tome_inventions[upgrade_id]==1){return true;}
      else{return false;}

    case 5:
      if(prestige.library.tome_timedivinations[upgrade_id]==1){return true;}
      else{return false;}

    case 6:
      if(prestige.library.tome_alcohol[upgrade_id]==1){return true;}
      else{return false;}

    case 7:
      if(prestige.library.tome_alchemy[upgrade_id]==1){return true;}
      else{return false;}

    case 8:
      if(prestige.library.tome_intro[upgrade_id]==1){return true;}
      else{return false;}

    case 9:
      if(prestige.library.tome_dead[upgrade_id]==1){return true;}
      else{return false;}

    case 10:
      if(prestige.library.tome_fortress[upgrade_id]==1){return true;}
      else{return false;}

  }



}
function getTome(id){

  switch(id){
    case 1:
      return library.tome_weaklings;
    case 2:
      return library.tome_dwarves;
    case 3:
      return library.tome_darkarts;
    case 4:
      return library.tome_inventions;
    case 5:
      return library.tome_timedivinations;
    case 6:
      return library.tome_alcohol;
    case 7:
      return library.tome_alchemy;
    case 8:
      return library.tome_intro;
    case 9:
      return library.tome_dead;
    case 10:
      return library.tome_fortress;
    default:
      return library.tome_intro;
  }

}
function getPrestigeTome(id){

  switch(id){
    case 1:
      return prestige.library.tome_weaklings;
    case 2:
      return prestige.library.tome_dwarves;
    case 3:
      return prestige.library.tome_darkarts;
    case 4:
      return prestige.library.tome_inventions;
    case 5:
      return prestige.library.tome_timedivinations;
    case 6:
      return prestige.library.tome_alcohol;
    case 7:
      return prestige.library.tome_alchemy;
    case 8:
      return prestige.library.tome_intro;
    case 9:
      return prestige.library.tome_dead;
    case 10:
      return prestige.library.tome_fortress;
    default:
      return prestige.library.tome_intro;
  }

}
function isTomeRead(id){

  var tome=getTome(id);
  var prestige_tome=getPrestigeTome(id);
  var count_upgrades=0;

  for (let i = 0; i < tome.items.length; i++) {
    if(prestige_tome[i]==1){count_upgrades++;}
  }

  if(count_upgrades==tome.items.length){return true;}
  else{return false;}

}
function libraryUpgrade(id){

  let tome=getTome(prestige.library.tome_selected_id);

  prestige.spent_mana+=tome.prices[id];



  if(prestige.library.tome_selected_id==1){

    prestige.library.tome_weaklings[id]=1;

    switch(id){

      case 0:
        prestige.alchemist_packages.weaklings2=1;
        break;

      case 1:
      case 2:
      case 3:
        prestige.raiders_price_mod++;
        break;

      case 4:
        prestige.raiders_locations.push(1);
        break;

      case 5:
        prestige.tarvel=0.5;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==2){

    prestige.library.tome_dwarves[id]=1;

    switch(id){

      case 0:
        prestige.messenger_distance=0.9;
        break;

      case 1:
        prestige.alchemist_buymax=1;
        break;

      case 2:
        prestige.snail_doubler=2;
        break;

      case 3:
      case 4:
        prestige.items_price_mod-=0.25;
        break;

      case 5:
        prestige.messenger_alert=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==3){

    prestige.library.tome_darkarts[id]=1;

    switch(id){

      case 0: prestige.alchemist_packages.warlocks2=1;
        break;
      
      case 1: prestige.alchemist_packages.witches2=1;
        break;
      
      case 2: prestige.alchemist_packages.wyverns2=1;
        break;
      
      case 3: prestige.quests_flag=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==4){

    prestige.library.tome_inventions[id]=1;

    switch(id){
      
      case 0: prestige.alchemist_packages.catapults2=1;
        break;
      
      case 1: prestige.alchemist_packages.crossbows2=1;
        break;
      
      case 2: prestige.alchemist_packages.cheiroballistras2=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==5){

    prestige.library.tome_timedivinations[id]=1;

    switch(id){
      
      case 0: prestige.offline+=0.05;
        break;
      
      default: prestige.offline+=0.1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==6){

    prestige.library.tome_alcohol[id]=1;

    switch(id){
      
      case 0: prestige.grapes=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==7){

    prestige.library.tome_alchemy[id]=1;

    switch(id){
      
      case 0: prestige.alchemy_lock=1;
        break;
      
      case 1: prestige.flask_unlocked=1;
        break;
      
      case 2: prestige.alchemy_persistence=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==8){

    prestige.library.tome_intro[id]=1;

    switch(id){
      
      case 0: prestige.blessing=1;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==9){

    prestige.library.tome_dead[id]=1;

    switch(id){
      
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        prestige.necromancer_revenge+=10;
        break;

    }

  }

  else if(prestige.library.tome_selected_id==10){

    prestige.library.tome_fortress[id]=1;

    switch(id){
      
      case 0:
        prestige.historian=1;
        break;

    }

  }


  refreshUI();



}

function reincarnationUI(){

  if(prestige.library.library_switch<2){

      bookshelves_intro.hide();
      library_body.hide();
        reincarnation_cancel.show();
        reincarnation_stay.show();
      librarian_warning.show();
      librarian_warning.html('<b>Nasty Librarian:</b> ' + library.librarian_warning);

      librarian_warning.append('<br><br><br><br><br><br>');

      

      let moneys=prestige.all_time_mana-prestige.spent_mana;
      let affordable_items=[];

      for (const [key, value] of Object.entries(library)) {
        if(value.id){

          for (let i = 0; i < value.prices.length; i++) {
            if(value.prices[i]<=moneys && isLibraryUpgradeSold(value.id,i)==false){
              affordable_items.push('<div class="tiny"><b class="maincolor2">'+value.items[i]+'</b> at '+numT(value.prices[i])+' Mana<br><i>'+value.descr[i]+'</i></div><br>');
            }
          }

        }
      }

      if(affordable_items.length>0){
        librarian_warning.append('<div class="tiny">Here are the items you can afford if you transmigrate now:</div><br><br>');

        for (let i = 0; i < affordable_items.length; i++) {
          librarian_warning.append(affordable_items[i]);
        }

      }else{
        librarian_warning.append('<div class="tiny"><i>Not enough mana to afford any upgrades yet!</i></div><br><br>');
      }

    
    }else{
      
        reincarnation_cancel.hide();
        reincarnation_stay.hide();
      librarian_warning.hide();
      body.css('background-image','url("img/bck/library2.jpg")');

      //hiding notifications and various bonuses leftover from previous reincarnation
      notifications_button.hide();
      messenger_button.hide();
      collect_medallions_button.hide();

      if(prestige.library.unlocked==0){

        library_body.hide();
        bookshelves_intro.show();

        reincarnation_library_card_explanation.html(library.library_card_explanation);

      }else{

        library_body.show();
        bookshelves_intro.hide();

        library_greeting.text(library.greetings[0]);

        if(!library.dykt[0]){buildLibraryFacts();}
        library_dykt.html('<button class="button7" id="dykt_next">Did you know that...</button>&nbsp;&nbsp;&nbsp;'+library.dykt[prestige.library.dykt_index]);

        dykt_next=$("#dykt_next");
        dykt_next.click(function(){
          playAudio(6);
          prestige.library.dykt_index++;
          if(prestige.library.dykt_index>=library.dykt.length){prestige.library.dykt_index=0;}
          refreshUI();
        });

        library_funds.html('<span class="tinier">Your newly acquired Mana was converted into Library Credits</span><br>');
        library_funds.append('Library Credits: <b>'+numT(prestige.all_time_mana-prestige.spent_mana)+'</b>');



        reincarnation_tomes.html('');
        

        for (const [key, value] of Object.entries(library)) {

          if(value.id){

            let tome_class='reincarnation_tome';
            let border_color='var(--gray)';

            if(isTomeRead(value.id)==true){tome_class='reincarnation_tome_read';}
            if(value.id==prestige.library.tome_selected_id){border_color='var(--lightgreen)';}

            reincarnation_tomes.append('<button style="border-color:'+border_color+'" class="'+tome_class+'" id="t'+value.id+'">'+value.title + '<br><i class="tiny">by ' + value.author + '</button><br>');
          }

        }
        

        all_tomes=$(".reincarnation_tome");
        all_read_tomes=$(".reincarnation_tome_read");

        all_tomes.click(function(){

          playAudio(1);

          prestige.library.tome_selected_id=parseInt($(this).attr('id').slice(1));

          refreshUI();

        });
        all_read_tomes.click(function(){

          playAudio(1);

          prestige.library.tome_selected_id=parseInt($(this).attr('id').slice(1));

          refreshUI();

        });


        showTomePage( getTome(prestige.library.tome_selected_id) );

      }

      


    }

}





function buildLibraryFacts(){

  library.dykt=['there is an infinite number of books in the Infinite Library (surprised?)','the Infinite Library holds a world record on the amount of books authored by writers whose name starts with "'+choose('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z')+'" stored in a single place','in order to manage an infinite amount of books and shelves the Infinite Library employes several mathematicians','some scholars question the claim that the Infinite Library has an infinite amount of books. "Have you actually counted them?" they ask','the Nasty Librarian is not an orangutan','only a small portion of books in the Infinite Library are magic spell books. Yet, there is an infinite amount of them','it\'s not clear what the Nasty Librarian looks like as anyone who has ever interfaced with him cannot clearly describe his appearance','the Nasty Librarian refers to himself as a "he", but has been on occasion heard referring to himself with "she" and other pronouns','the Infinite Library has an infinite amount of bookshelves. The amount of bookshelves and the amount of books are infinities of the same order','according to the Nasty Librarian, around 1 in a 1000 books will have a uniquely designed paper bookmark in it. But the amount of such rare bookmarks is still infinite','the amount of knowledge that the Nasty Librarian has about the Infinite Library approaches infinity, but is not actually infinite. In other words, Nasty Librarian admits he might be mistaken or ignorant about some aspects of the Library. "I\'m always learning", he says','some bookshelves have an odd amount of books on them, some have even. According to the Nasty Librarian, "there are more odd bookshelves because the Infinite Library is odd." He then giggles a bit','there is a wizard by the name of Twintlesazzle who manages the Dark Arts category. He himself doesn\'t practice dark magic and has stated that he is decidedly afraid of it','Twintlesazzle, the wizard who manages the Dark Arts category, has once been quoted as "having no qualms with witchcraft because witchcraft is honest about its values"','an inventor by the name of Bartob Drumfall found a book that described a working perpetual motion machine. He got excited and ran over to his wife to tell her about it, but then couldn\'t remember exactly which shelf it was on. He\'s still searching for it. His wife filed for divorce last year','the Infinite Library has an ocean, but very few people know how to get to it. "There are ships traveling across it," one man said','they say that people who reach the Infinite Library are "those with a genuine thirst for knowledge, proper fools or astronauts"','the only time the Nasty Librarian has left the Library was to hunt down a stolen manuscript dedicated to the types of cacti in Bolmeenian deserts. "It was my favorite," he recalls','it\'s still not entirely clear whether each book is represented by a single copy or whether there are many or even infinite copies','it is estimated that the population of the Infinite Library may constitute billions of creatures. Despite this, the halls of the Library feel utterly deserted','the ceiling of the Infinite Library contains what looks like a strange mural. It is known as "the Timepiece" and is a three-dimensional representation of every single point of spacetime. Anyone arriving to the Infinite Library will appear right under the moment in spacetime that they came from','staying at the Library for long periods of time reconfigures one\'s internal clock so that those who come back into the finite world age so slowly that can effectively live for hundreds of years','when an individual finds themselves in the Infinite Library, the emotional connection to their life in the finite world fades very quickly, sometimes within minutes. The only way to retain it is to be holding a <i>grudge relic</i> in one\'s hand. Each universe will have its own grudge relic. For the universe in which the Earth exists, it takes the form of a carrot or a similar pointed vegetable','they say that inside the Infinite Library "time flows, but doesn\'t pass"','one of the most famous empresses of Tarnaria is said to be somewhere in the Infinite Library. She got there a moment before she was about to be assassinated and was allegedely quite mad about the whole thing','the Infinite Library sits outside of all spacetime and can serve as a gateway to the multiverse','one can meet many famous scholars in the Infinite Library','most of the quests that the Infinite Library inhabitants make to the finite world have to do with trying to right a wrong. It rarely goes right','Twintlesazzle, the wizard who manages the Dark Arts category, once had to leave for the finite world in order to retrieve a stolen dark magic book that was causing devastation to half the continent','transmigration is the term used to describe arriving to and leaving from the Infinite Library. Contrary to a common misconception, transmigration does not describe what happens to you when you die: you need to be alive to transmigrate','transmigration is possible because certain causality paths lead to and from the Library. Thus, the amount of paths connecting the Library to a given spacetime period is going to be finite','special telescopes are used to inspect the Timepiece in order to explore history and locate transmigration paths. Even slight movement of the telescope might shift the image years away. It takes a lot of practice to learn to operate the telescope and a lot of time, sometimes months, to find what one is looking for in the Timepiece','all the transmigration paths coming from the Timepiece, as well as the Timepiece itself, have effectively "already happened". But the way it gets translated into Infinite Library time is not trivial. For example, if an unused transmigration path is found in the Timepiece, there is no simple way to understand when will the transmigration actually transpire from the point of view of the Infinite Library inhabitant','some transmigration paths are loops and can bring you into the Timepiece and back. These are essential for the Library inhabitants, since they can be used to transmigrate into the finite world and then come back','even if you find a transmigration path you want to follow, it\'s frequently too time consuming to study what will happen once you\'re there. So, having access to the record of all spacetime in practice won\'t mean that you know your own future','scholars who study the Timepiece are called capilvims and can be hired to locate a transmigration path to a particular time and place'];

  shuffleArray(library.dykt);

}
function getGuidePage(){

  var page_contents;

  switch (misc_settings.guide_page) {

    case 'Messengers':
      page_contents=guidebook.messengers;
      break;

    case 'Transmigration':
      page_contents=guidebook.transmigration;
      break;

    case 'Wicked Quests':
      player.guide.wicked=1;
      wicked_guide_button.attr("class","guide");
      page_contents=guidebook.wicked;
      break;

    case 'Hall of Giants':
      player.guide.hog=1;
      hog_guide_button.attr("class","guide");
      page_contents=guidebook.hog;
      break;

    case 'Fortifications':
      player.guide.fort=1;
      fort_guide_button.attr("class","guide");
      page_contents=guidebook.fort;
      break;

    case 'Gandlor\'s Cave':
      player.guide.gc=1;
      gc_guide_button.attr("class","guide");
      page_contents=guidebook.gandlor;
      break;

    case 'Treasury':
      player.guide.museum=1;
      museum_guide_button.attr("class","guide");
      page_contents=guidebook.museum;
      break;

    case 'Cannibals':
      player.guide.cannibals=1;
      cannibals_guide_button.attr("class","guide");
      page_contents=guidebook.cannibals;
      break;

    case 'Aviary':
      player.guide.aviary=1;
      aviary_guide_button.attr("class","guide");
      page_contents=guidebook.aviary;
      break;

    case 'Raiders':
      player.guide.raiders=1;
      raiders_guide_button.attr("class","guide");
      page_contents=guidebook.raiders;
      break;

    case 'Necropolis':
      player.guide.graveyard=1;
      graveyard_guide_button.attr("class","guide");
      page_contents=guidebook.graveyard;
      break;





    case 'Compatibility':
      page_contents=guidebook.compatibility;
      break;

    case 'Mobile Experience':
      page_contents=guidebook.mobile;
      break;

    case 'Credits':
      page_contents=guidebook.credits;
      break;
  
  
  }

  guide_page.html(page_contents+'<br>');

  if(guideAlertCheck()==true){button_guide.attr("class","system_alert");}
  else{button_guide.attr("class","system");}



}
function hideMenus(){
  misc_settings.guide_toggle=0;
  misc_settings.settings_toggle=0;
}
function showFortificationConfirm(unit){

}
function showFortress(show=true){
  if(show==true){
    fortress_block.show();
  }else{
    fortress_block.hide();
  }
}
function showCounter(show=true){
  if(show==true){
    indicators_table.show();
  }else{
    indicators_table.hide();
  }
}
function showTowers(show=true){
  if(show==true){
    fortress_block.show();
  }else{
    fortress_block.hide();
  }
}
function showHoG(show=true){
  if(show==true){
    hog_block.show();
    museum_block.show();
    refreshUIHoG();
  }else{
    hog_block.hide();
    museum_block.hide();
  }
}
function showGraveyard(show=true){
  if(show==true){
    graveyard_block.show();
  }else{
    graveyard_block.hide();
  }
}



function saveGame(){

  player.time=Date.now();

  let gameData = {
      universal:[player,prestige,settings,medallions,alchemist,necromancer,raiders,temple],
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
    medallions=gameData.universal[3];
    alchemist=gameData.universal[4];
    necromancer=gameData.universal[5];
    raiders=gameData.universal[6];
    temple=gameData.universal[7];

    tower0=gameData.towers[0];
    tower1=gameData.towers[1];
    tower2=gameData.towers[2];
    tower3=gameData.towers[3];
    dragons_tower=gameData.towers[4];
    winecellar=gameData.towers[5];
    hog=gameData.towers[6];
    graveyard=gameData.towers[7];

    //resetting the wine cellar so that the player cannot set up drinks and then have the game multiply offline progress by the Drunken Multiplier
    winecellar.drunk = [1,1,1,1,1,1,1,1];
    winecellar.drinking=0;
    tower1.discontent.drinking=0;
    tower1.discontent.selected_unit=999;
    //alchemist.purse.items[1]=999;//Hangover Potion stays, so the player can actually click and resume their stacked potions, provided time hasn't run out. So, if you reload the page, you can safely restart the wine, having lost maybe a couple of seconds while reloading. But if you've waited longer than the amount of seconds available, it's gonna be gone

    //backwards compatibility for existing players
    if(typeof settings.dwarf_hammers_warning === 'undefined'){
      settings.dwarf_hammers_warning=0;
    }
    if(settings.dwarf_hammers_warning==0){
      setTimeout(function (){notificationMachen('dwarf_hammers_warning');refreshUI();}, 500);
    }
    
    

    buyRecalc();//recalculate rate, call storeState, etc.
    buyRecalcGraveyard();

    //offline progress
    if(player.time>0){

      diff = (Date.now()-player.time)*prestige.offline;

      if(prestige.offline<1){//compensating for the loss of offline progress for breathers
        difftree = (Date.now()-player.time)*(1-prestige.offline);
        prestige.garden.tree_age+=difftree/1000;
      }

      calc(diff/1000);
    }

}
function delSave(){
  localStorage.removeItem(savefile_name);
}


function countAllLivingUnits(){

  return tower1.weaklings+tower1.dwarves+tower1.humans+tower1.ogres+tower2.wizards+tower2.warlocks+tower2.witches+tower2.wyverns;

}
function countAllTowerUnits(){

  return tower1.weaklings+tower1.dwarves+tower1.humans+tower1.ogres+tower2.wizards+tower2.warlocks+tower2.witches+tower2.wyverns+tower3.catapults+tower3.crossbows+tower3.cheiroballistras+tower3.cannibals;

}
function riotsCompleted(){

  if(prestige.champs.unlocked[0]+prestige.champs.unlocked[1]+prestige.champs.unlocked[2]+prestige.champs.unlocked[3]==4 || tower1.discontent.riot==2){return true;}
  else{return false;}

}
function mortalsOverpopulation(){

  var champs_factor = prestige.champs.unlocked[0]+prestige.champs.unlocked[1]+prestige.champs.unlocked[2]+prestige.champs.unlocked[3];

  if(tower1.weaklings>=(tower1.discontent.overpopulation+100*champs_factor) && (tower1.dwarves>=tower1.discontent.overpopulation+100*champs_factor) && (tower1.humans>=tower1.discontent.overpopulation+100*champs_factor) && (tower1.ogres>=tower1.discontent.overpopulation+100*champs_factor)){
    return true;
  }else{
    return false;
  }

  
}
function aviaryCheck(item){

  let check_machen=0;

  if(item==7 || item==8 || item==19 || item==41 || item==48 || item==54 || item==55 || item==56 || item==58 || item==59 || item==60 || item==63 || item==67 ){
    //do nothing, it's a bird!
  }else{
    check_machen++;//not a bird, sound the alarm!!!!!!!!!!!111
  }

  if(inArray(item,alchemist.aviary.display)==true){
    check_machen++;//we've seen this bird before, mate!
  }

  if(check_machen>0){return false;}else{return true;}


}
function guideAlertCheck(){
  var check=0;
  for (const [key, value] of Object.entries(player.guide)) {
    

    switch(key){
      case 'wicked':
        if(prestige.quests_flag>0){check+=value;}else{check++;}
        break;
      case 'hog':
        if(prestige.hog>0){check+=value;}else{check++;}
        break;
      case 'fort':
        if(prestige.garden.trees>0){check+=value;}else{check++;}
        break;
      case 'gc':
        if(prestige.gandlor>0){check+=value;}else{check++;}
        break;
      case 'museum':
        if(prestige.museum>0){check+=value;}else{check++;}
        break;
      case 'cannibals':
        if(prestige.cannibals>0){check+=value;}else{check++;}
        break;
      case 'aviary':
        if(prestige.aviary.unlocked>0){check+=value;}else{check++;}
        break;
      case 'raiders':
        if(prestige.raiders_unlocked>0){check+=value;}else{check++;}
      case 'graveyard':
        if(prestige.graveyard>0){check+=value;}else{check++;}
        break;
    }
  }
  if(check<Object.keys(player.guide).length){return true;}
  else{return false;}
}

function getPrices(base_price,growth_rate,current_amount){

  let all_prices=[0,0,0];

  all_prices[0]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,1)-1) / (growth_rate-1);
  all_prices[1]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,10)-1) / (growth_rate-1);
  all_prices[2]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,100)-1) / (growth_rate-1);

  return all_prices;

}
function getPrices2(base_price,growth_rate,current_amount){

  let all_prices=[0,0,0];

  all_prices[0]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,1)-1) / (growth_rate-1);
  all_prices[1]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,5)-1) / (growth_rate-1);
  all_prices[2]=base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,10)-1) / (growth_rate-1);

  return all_prices;

}
function getPriceMax(base_price,growth_rate,current_amount,desired_amount){

  return base_price * Math.pow(growth_rate,current_amount) * (Math.pow(growth_rate,desired_amount)-1) / (growth_rate-1);

}
function getEffect(base,multiplier,bonus){
  if (!bonus) bonus=0;
  return (base*(Math.pow(2,multiplier))+bonus);
}

function numT(number, decPlaces=2){

  //numTransform

  //my optimization: it used to do abbrev.length in two places, since the length here is not variable, I cache it. Performance boost is likely to be very small, but as this is one of the most used functions in the game, I want to make sure it is ultra-optimized

  if(settings.scientific==0){

  var abbrev_length=74;

          number = Math.round(number*100)/100;//my addition: round any incoming floats first

          // 2 decimal places => 100, 3 => 1000, etc
          decPlaces = Math.pow(10,decPlaces);
          // Enumerate number abbreviations
          var abbrev = [ "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "Qt", "Qd", "Sd", "St", "O", "N", "c", "kc", "d", "kd", "e", "ke", "f", "kf", "h", "kh", "i", "ki", "j", "kj", "L", "kL", "Na", "kNa", "Nb", "kNb", "Nc", "kNc", "Nd", "kNd", "Ne", "kNe", "Nf", "kNf", "Ng", "kNg", "Nh", "kNh", "Ni", "kNi", "Nj", "kNj", "Nk", "kNk", "Nl", "kNl", "Nm", "kNm", "Np", "kNp", "Nq", "kNq", "Nr", "kNr", "Ns", "kNs", "Nt", "kNt", "Nu", "kNu" ];

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
function romanize(number){
  if (!+number)
    return false;
  var	digits = String(+number).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
           "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
           "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}


function choose(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
function chooseMT(arr,seed) {
  var mT = new MersenneTwister(seed);
  return arr[Math.floor(mT.random()*arr.length)];
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum and the minimum are inclusive
}
function getRandomIntMT(min, max, seed) {
  var mT = new MersenneTwister(seed);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(mT.random() * (max - min + 1) + min);
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
function treeAgeToTime(sec) {

  let days = Math.floor(sec / (60 * 60 * 24));
  let hours = Math.floor(sec / (60 * 60));
  let minutes = Math.floor(sec / 60);

  hours = (hours % 24);
  minutes = (minutes % 60);

  if(days<1){ days = ''; }else if(days==1){ days = days + ' day '; }else{ days = days + ' days '; }
  if(hours<1){ hours = ''; }else if(hours==1){ hours = hours + ' hour '; }else{ hours = hours + ' hours '; }
  if(minutes<1){ minutes = ''; }else if(minutes==1){ minutes = minutes + ' minute '; }else{ minutes = minutes + ' minutes '; }

  if(sec<60){return 'less than a minute';}else{
    return days + hours + minutes;
  }

}

function qAdd(num){

  tower1.counter+=num;
  prestige.all_time_counter+=num;
  tower1.all_reincarnation_counter+=num;

  storeState();
  refreshUI();

}
function setGame(amt=1e38,trs=7){
  prestige.garden.trees=trs;
  qAdd(amt);
}

function nM(){//mana

  if(prestige.all_time_counter>=nextManaCost){

    prestige.all_time_mana=Math.floor( Math.cbrt( prestige.all_time_counter/MANA_BASE_COST ) );//recalculating all-time mana

    let rmana=prestige.all_time_mana;
      if(prestige.multiplier>1){rmana_label.text(numT(rmana-prestige.multiplier));}
      else{rmana_label.text(numT(rmana));}

    let future_multiplier=1;

    if(prestige.all_time_mana<1){future_multiplier=1;}else{future_multiplier=prestige.all_time_mana;}

    rmana_multiplier_label.html('Fortress Level: <b class="main_color">' + numT(prestige.multiplier) + '</b><br>Fortress Level after reset: <b class="main_color">' + numT(future_multiplier) + '</b>' );

  }
  nextManaCost=MANA_BASE_COST * Math.pow((prestige.all_time_mana+1),3);

  if(player.system_frame%10==0){
    nextrmana_label.text(numT(nextManaCost - prestige.all_time_counter));
    if( (nextManaCost - prestige.all_time_counter)<0 ){nextrmana_label.text(0);}
  }


}

function nS(){//souls

  if(prestige.all_time_graveyard_counter>=nextSoulsCost){

    prestige.all_time_souls=Math.floor( Math.cbrt( prestige.all_time_graveyard_counter/SOULS_BASE_COST ) );

    let rsouls=prestige.all_time_souls;
      if(prestige.souls_multiplier>1){rsouls_label.html('Souls captured: <b>' +numT(rsouls-prestige.souls_multiplier)+ '</b>');}
      else{rsouls_label.html( 'Souls captured: <b>' + numT(rsouls) + '</b>' );}

    rsouls_multiplier_label.html('Necropolis Level: <b>' + numT(prestige.souls_multiplier) + '</b>' );

  }
  nextSoulsCost=SOULS_BASE_COST * Math.pow((prestige.all_time_souls+1),3);

  /*if(player.system_frame%50==0){
    nextrsouls_label.text(numT(nextSoulsCost - prestige.all_time_graveyard_counter));
  }*/


}


function setupAudio(){

  audio.click1 = new Howl({
    src: ['snd/tab_click.wav']
  });

  audio.hammer = new Howl({
    src: ['snd/hammer.wav'],
    volume: 0.5
  });

  audio.hammer2 = new Howl({
    src: ['snd/hammer2.wav'],
    volume: 0.4
  });

  audio.alchemist_click = new Howl({
    src: ['snd/alchemist_click2.wav'],
    volume: 0.6
  });

  audio.select_click = new Howl({
    src: ['snd/select_click.wav']
  });

  audio.thunder = new Howl({
    src: ['snd/thunder.wav']
  });

  audio.raindrop = new Howl({
    src: ['snd/raindrop.wav']
  });

  audio.messenger = new Howl({
    src: ['snd/messenger.wav'],
    volume: 0.3
  });

  audio.gandlor_lose = new Howl({
    src: ['snd/gandlor/lose.wav'],
    volume: 0.8
  });

  audio.gandlor_pick = new Howl({
    src: ['snd/gandlor/pick.wav'],
    volume: 0.8
  });

  audio.gandlor_win = new Howl({
    src: ['snd/gandlor/win.wav'],
    volume: 0.8
  });

  audio.gandlor_spin = new Howl({
    src: ['snd/gandlor/spin_one.wav'],
    volume: 0.5
  });

  audio.gandlor_shuffle = new Howl({
    src: ['snd/gandlor/shuffle.wav'],
    volume: 0.8
  });

  audio.gandlor_win2 = new Howl({
    src: ['snd/gandlor/win2.wav'],
    volume: 0.8
  });

  audio.gandlor_gameover = new Howl({
    src: ['snd/gandlor/gameover.wav'],
    volume: 0.8
  });

  audio.gandlor_powerup = new Howl({
    src: ['snd/gandlor/small_powerup.wav'],
    volume: 0.8
  });

  audio.gandlor_double = new Howl({
    src: ['snd/gandlor/double.wav'],
    volume: 1
  });

  audio.gandlor_single = new Howl({
    src: ['snd/gandlor/single2e.wav'],
    volume: 1
  });

}
function playAudio(snd){

  if(audio_initiated==0){
    audio_initiated=1;
    setupAudio();
  }

  if(settings.audio_mute==0){
		switch(snd){
			case 1: audio.click1.play(); break;
			case 2: audio.hammer.rate(getRandomInt(1.5,4)); audio.hammer.play(); break;
			case 3: audio.hammer2.play(); break;
			case 4: audio.alchemist_click.play(); break;
			case 5: audio.select_click.play(); break;
			case 6: audio.hammer.rate(2); audio.hammer.play(); break;
			case 7: audio.gandlor_pick.play(); break;
      case 8: audio.gandlor_lose.play(); break;
      case 9: audio.gandlor_win.play(); break;
      case 10: audio.gandlor_spin.play(); break;
      case 11: audio.gandlor_shuffle.play(); break;
      case 12: audio.gandlor_win2.play(); break;
      case 13: audio.gandlor_gameover.play(); break;
      case 14: audio.gandlor_powerup.play(); break;
      case 15: audio.gandlor_double.play(); break;
      case 16: audio.gandlor_single.play(); break;
      case 17: audio.thunder.play(); break;
      case 18: audio.raindrop.play(); break;
      case 19: audio.messenger.play(); break;
			}
	}
}
