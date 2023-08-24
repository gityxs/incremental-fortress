//CACHE

var settings_block;
var button_settings;
var button_save;
var button_delsave;
var button_scientific;
var button_copysave;
var button_importsave;
var import_save_dump;
var button_audio;
var audio_control_volume;

var counter1_label;
var counter2_label;
var counter3_label;
var counter4_label;

var rate1_label;
var rate2_label;
var rate3_label;
var rate4_label;

var weaklings_button;
var dwarves_button;
var humans_button;
var ogres_button;

var tower0_bai;
var tower1_bai;
var tower2_bai;
var tower3_bai;
var tower4_bai;
var graveyard_bai;
var graveyard2_bai;
var graveyard3_bai;
var winecellar_bai;
var hog_bai;

var tower0_buy1;
var tower0_buy10;
var tower0_buy100;

var tower1_buy1;
var tower1_buy10;
var tower1_buy100;

var tower2_buy1;
var tower2_buy10;
var tower2_buy100;

var tower3_buy1;
var tower3_buy10;
var tower3_buy100;

var tower4_buy1;
var tower4_buy10;
var tower4_buy100;

var tower5_buymax;

var winecellar_buy1;
var winecellar_buy10;
var winecellar_buy100;

var tower1_lock;
var tower1_body;

var tower2_block;
var tower2_lock;
var tower2_body;

var tower3_block;
var tower3_lock;
var tower3_body;

var wizards_button;
var warlocks_button;
var witches_button;
var wyverns_button;

var cheiroballistras_button;
var crossbows_button;
var catapults_button;

var messenger_button;

var rmana_label;
var nextrmana_label;
var rmana_multiplier_label;

var reincarnate_button;

var dragon1_button;
var dragon2_button;
var dragon3_button;
var dragon4_button;
var dragon5_button;
var fire_multiplier_label;
var tower4_block;
var tower4_body;
var tower4_name_label;

var wineage_button;
var cupsize_button;
var grapes_button;
var drunken_multiplier_label;
var winecellar_block;
var winecellar_body;
var winecellar_lock;

var reincarnation_options_block;
var reincarnation_winecellar;
var reincarnation_messengers;
var reincarnation_quests;
var reincarnation_noupgrades;
var reincarnation_cancel;

var quests_block;
var quests_multiplier_label;
var quest1_label;
var quest2_label;
var quest3_label;
var quest4_label;
var quest5_label;
var quest6_label;
var quest7_label;
var quest8_label;

var quest1_button;
var quest2_button;
var quest3_button;
var quest4_button;
var quests_body;

var guide_block;
var guide_page;
var button_guide;
var all_guide_buttons;

var graveyard_buy1;
var graveyard_buy10;
var graveyard_buy100;

var graveyard2_buy1;
var graveyard2_buy10;
var graveyard2_buy100;

var graveyard3_buy1;
var graveyard3_buy10;
var graveyard3_buy100;

var giant1_button;
var giant2_button;
var giant3_button;
var giant4_button;
var giant5_button;
var giant6_button;
var giant7_button;
var giant8_button;
var hog_body;
var hog_lock;
var hog_multiplier_label;
var hog_block;
var recast_button;

var diamonds1_button;
var diamonds2_button;
var diamonds3_button;
var diamonds4_button;
var diamonds5_button;
var diamonds6_button;
var diamonds7_button;
var diamonds8_button;

var graveyard_block;
var graveyard_body;
var graveyard_lock;

var skeletons_button;
var spirits_button;
var specters_button;
var succubi_button;

var graveyard_counter_label;
var graveyard_rate_label;
var graveyard_multiplier_label;
var next_da_button;
var next_target_button;
var da1_block;
var da2_block;
var da3_block;
var da4_block;

var collect_medallions_button;
var medallions_label;
var hammer_button;
var ore_button;

var alchemist_upgrades;
var all_alchemist_upgrades;
var all_alchemist_upgrades_disabled;
var alchemist_tooltip;

var weaklings_drink_button;
var dwarves_drink_button;
var humans_drink_button;
var ogres_drink_button;
var wizards_drink_button;
var warlocks_drink_button;
var witches_drink_button;
var wyverns_drink_button;
var all_tower_drinking_buttons;

var alchemist_label_elements=[];
var reincarnation_dwarves;
var garden_block;
var button_tree;
var blacksmiths_button;

var indicators_table;

var outerwall_block;
var fortress_block;
var library_body;
var librarian_warning;
var library_greeting;
var library_dykt;
var dykt_next;

var reincarnation_stay;

var reincarnation_tome_page;

var library_upgrade_button;

var library_funds;
var guards_of_the_wall;
var garden_tooltip;
var reincarnation_unlock;
var bookshelves_intro;
var reincarnation_library_card_explanation;

var tower1_fortifications;
var tower2_fortifications;
var tower3_fortifications;

var fort_button_weaklings;
var fort_button_dwarves;
var fort_button_humans;
var fort_button_ogres;
var fort_button_wizards;
var fort_button_warlocks;
var fort_button_witches;
var fort_button_wyverns;
var fort_button_catapults;
var fort_button_crossbows;
var fort_button_cheiroballistras;
var fort_button;
var fort_button_disabled;
var fort_tooltip;

var indicator_tree;
var outerwall_name_label;

var nav_right;
var nav_left;
var navigation_block;
var maintowers_block;
var items_block;
var items_holder;
var gc_button;

var gandlor_block;
var gandlor_deuce1;
var gandlor_deuce2;
var gandlor_wrap1;
var gandlor_wrap2;
var gandlor_wrap3;
var gandlor_wrap4;
var gandlor_wrap5;
var gandlor_deal;
var gandlor_funds;
var gandlor_bonus0;
var gandlor_bonus1;
var gandlor_bonus2;
var gandlor_bet;

var item_tooltip;
var gc_tooltip;

var all_sprites;
var button_sprites;
var reincarnation_tomes;
var all_tomes;
var temple_button;
var temple_tooltip;
var temple_block;
var cannibals_button;
var fort_button_cannibals;
var raiders_button;
var raiders_block;
var raiders_location_button;
var raiders_location_next;
var location_tooltip;
var flask_block;
var flask1;
var flask2;
var flask3;

var button6_loot;
var loot_tooltip;
var raiders_button_win;
var frogs_button;

var necromancer_upgrades;
var necromancer_tooltip;
var all_necromancer_upgrades;
var all_necromancer_upgrades_disabled;
var necromancer_block;

var ghouls_button;
var ghasts_button;
var grimlords_button;
var grandliches_button;
var necropolis2_block;
var necropolis2_lock;

var champ_weaklings_button;
var champ_dwarves_button;
var champ_humans_button;
var champ_ogres_button;
var champs_block;
var champ_tooltip;
var button_champ;

var hog_buymax;
var notifications_button;
var winecellar_title;

var body;
var topmost_header;

var flask_result;
var flask_recipe;
var flask_ingredients;
var items_lock;
var gandlor_button_block;
var dragonstower_button_block;
var dragonstower_button;
var flask_button_block;
var fl_button;
var flask_load;
var all_ingredients;
var all_recipe_buttons;
var ingredient_tooltip;
var flask_confirm_block;
var flask_confirm_button;
var flask_cancel_button;
var save_del_confirm_block;
var save_del_cancel;
var save_del_confirm;

var aviary_block;
var aviary_multiplier_label;
var aviary_display;
var aviary_catch_button;
var aviary_button_block;
var aviary_button;

var flask_title;
var aviary_title;

var rsouls_label;
var rsouls_multiplier_label;

var museum_block;
var museum_list;
var museum_body;
var museum_lock;
var museum_multiplier_label;

var alchemist_buymax_block;

var wicked_guide_button;
var hog_guide_button;
var fort_guide_button;
var gc_guide_button;
var museum_guide_button;
var cannibals_guide_button;
var aviary_guide_button;
var raiders_guide_button;

var flask_tab_flask;
var flask_tab_ingredients;
var flask_tab_recipes;
var tab_flask_contents;
var tab_info_contents;
var flask_list;

var tower1_fortifications_confirm_block;
var tower1_fort_confirm;
var tower1_fort_cancel;
var tower2_fortifications_confirm_block;
var tower2_fort_confirm;
var tower2_fort_cancel;
var tower3_fortifications_confirm_block;
var tower3_fort_confirm;
var tower3_fort_cancel;

var necropolis3_block;
var necropolis3_lock;
var areds_button;
var ardemators_button;
var archsentinels_button;
var andlyns_button;

var brokensave_block;

var graveyard_guide_button;

var necromancer_buymax_block;
var necromancer_buymax;

var audio_messenger_block;
var button_audio_messenger;

$(document).ready(function(){

  //CACHE

  button_audio_messenger=$("#button_audio_messenger");
  audio_messenger_block=$("#audio_messenger_block");

  necromancer_buymax=$("#necromancer_buymax");
  necromancer_buymax_block=$("#necromancer_buymax_block");

  graveyard_guide_button=$("#graveyard_guide_button");

  brokensave_block=$("#brokensave_block");

  areds_button=$("#areds_button");
  ardemators_button=$("#ardemators_button");
  archsentinels_button=$("#archsentinels_button");
  andlyns_button=$("#andlyns_button");
  necropolis3_block=$("#necropolis3_block");
  necropolis3_lock=$("#necropolis3_lock");

  tower1_fort_cancel=$("#tower1_fort_cancel");
  tower1_fort_confirm=$("#tower1_fort_confirm");
  tower1_fortifications_confirm_block=$("#tower1_fortifications_confirm_block");
  tower2_fort_cancel=$("#tower2_fort_cancel");
  tower2_fort_confirm=$("#tower2_fort_confirm");
  tower2_fortifications_confirm_block=$("#tower2_fortifications_confirm_block");
  tower3_fort_cancel=$("#tower3_fort_cancel");
  tower3_fort_confirm=$("#tower3_fort_confirm");
  tower3_fortifications_confirm_block=$("#tower3_fortifications_confirm_block");
  
  flask_list=$("#flask_list");
  tab_info_contents=$("#tab_info_contents");
  tab_flask_contents=$("#tab_flask_contents");
  flask_tab_recipes=$("#flask_tab_recipes");
  flask_tab_ingredients=$("#flask_tab_ingredients");
  flask_tab_flask=$("#flask_tab_flask");

  raiders_guide_button=$("#raiders_guide_button");
  wicked_guide_button=$("#wicked_guide_button");
  hog_guide_button=$("#hog_guide_button");
  fort_guide_button=$("#fort_guide_button");
  gc_guide_button=$("#gc_guide_button");
  museum_guide_button=$("#museum_guide_button");
  cannibals_guide_button=$("#cannibals_guide_button");
  aviary_guide_button=$("#aviary_guide_button");

  alchemist_buymax_block=$("#alchemist_buymax_block");

  museum_multiplier_label=$("#museum_multiplier_label");
  museum_lock=$("#museum_lock");
  museum_body=$("#museum_body");
  museum_list=$("#museum_list");
  museum_block=$("#museum_block");

  rsouls_multiplier_label=$("#rsouls_multiplier_label");
  rsouls_label=$("#rsouls_label");

  aviary_title=$("#aviary_title");
  flask_title=$("#flask_title");

  aviary_button=$("#aviary_button");
  aviary_button_block=$("#aviary_button_block");
  aviary_catch_button=$("#aviary_catch_button");
  aviary_display=$("#aviary_display");
  aviary_multiplier_label=$("#aviary_multiplier_label");
  aviary_block=$("#aviary_block");

  save_del_confirm_block=$("#save_del_confirm_block");
  save_del_cancel=$("#save_del_cancel");
  save_del_confirm=$("#save_del_confirm");
  flask_confirm_button=$("#flask_confirm_button");
  flask_cancel_button=$("#flask_cancel_button");
  flask_confirm_block=$("#flask_confirm_block");
  ingredient_tooltip=$("#ingredient_tooltip");
  flask_load=$("#flask_load");
  fl_button=$("#fl_button");
  flask_button_block=$("#flask_button_block");
  dragonstower_button=$("#dragonstower_button");
  dragonstower_button_block=$("#dragonstower_button_block");
  gandlor_button_block=$("#gandlor_button_block");
  items_lock=$("#items_lock");
  flask_ingredients=$("#flask_ingredients");
  flask_recipe=$("#flask_recipe");
  flask_result=$("#flask_result");
  
  topmost_header=$("#topmost_header");
  body=$("body");

  winecellar_title=$("#winecellar_title");
  notifications_button=$("#notifications_button");
  hog_buymax=$("#hog_buymax");

  champ_tooltip=$("#champ_tooltip");
  champ_weaklings_button=$("#champ_weaklings_button");
  champ_dwarves_button=$("#champ_dwarves_button");
  champ_humans_button=$("#champ_humans_button");
  champ_ogres_button=$("#champ_ogres_button");
  champs_block=$("#champs_block");

  necropolis2_block=$("#necropolis2_block");
  necropolis2_lock=$("#necropolis2_lock");
  grandliches_button=$("#grandliches_button");
  grimlords_button=$("#grimlords_button");
  ghasts_button=$("#ghasts_button");
  ghouls_button=$("#ghouls_button");

  necromancer_block=$("#necromancer_block");
  necromancer_tooltip=$("#necromancer_tooltip");
  necromancer_upgrades=$("#necromancer_upgrades");

  frogs_button=$("#frogs_button");
  raiders_button_win=$("#raiders_button_win");
  loot_tooltip=$("#loot_tooltip");

  flask3=$("#flask3");
  flask2=$("#flask2");
  flask1=$("#flask1");
  flask_block=$("#flask_block");
  location_tooltip=$("#location_tooltip");
  raiders_location_next=$("#raiders_location_next");
  raiders_location_button=$("#raiders_location_button");
  raiders_block=$("#raiders_block");
  raiders_button=$("#raiders_button");
  fort_button_cannibals=$("#fort_button_cannibals");
  cannibals_button=$("#cannibals_button");
  temple_block=$("#temple_block");
  temple_tooltip=$("#temple_tooltip");
  temple_button=$("#temple_button");
  reincarnation_tomes=$("#reincarnation_tomes");
  button_sprites=$("#button_sprites");

  gc_tooltip=$("#gc_tooltip");
  item_tooltip=$("#item_tooltip");

  gandlor_bet=$("#gandlor_bet");
  gandlor_bonus2=$("#gandlor_bonus2");
  gandlor_bonus1=$("#gandlor_bonus1");
  gandlor_bonus0=$("#gandlor_bonus0");
  gandlor_funds=$("#gandlor_funds");
  gandlor_deal=$("#gandlor_deal");
  gandlor_wrap1=$("#gandlor_wrap1");
  gandlor_wrap2=$("#gandlor_wrap2");
  gandlor_wrap3=$("#gandlor_wrap3");
  gandlor_wrap4=$("#gandlor_wrap4");
  gandlor_wrap5=$("#gandlor_wrap5");
  gandlor_deuce2=$("#gandlor_deuce2");
  gandlor_deuce1=$("#gandlor_deuce1");
  gandlor_block=$("#gandlor_block");

  items_block=$("#items_block");
  gc_button=$("#gc_button");
  items_holder=$("#items_holder");
  maintowers_block=$("#maintowers_block");
  nav_right=$("#nav_right");
  nav_left=$("#nav_left");
  navigation_block=$("#navigation_block");

  outerwall_name_label=$("#outerwall_name_label");
  indicator_tree=$("#indicator_tree");

  fort_button_catapults=$("#fort_button_catapults");
  fort_button_crossbows=$("#fort_button_crossbows");
  fort_button_cheiroballistras=$("#fort_button_cheiroballistras");
  fort_button_wizards=$("#fort_button_wizards");
  fort_button_warlocks=$("#fort_button_warlocks");
  fort_button_witches=$("#fort_button_witches");
  fort_button_wyverns=$("#fort_button_wyverns");
  fort_button_ogres=$("#fort_button_ogres");
  fort_button_humans=$("#fort_button_humans");
  fort_button_dwarves=$("#fort_button_dwarves");
  fort_button_weaklings=$("#fort_button_weaklings");
  fort_tooltip=$("#fort_tooltip");

  tower1_fortifications=$("#tower1_fortifications");
  tower2_fortifications=$("#tower2_fortifications");
  tower3_fortifications=$("#tower3_fortifications");

  reincarnation_library_card_explanation=$("#reincarnation_library_card_explanation");
  bookshelves_intro=$("#bookshelves_intro");
  reincarnation_unlock=$("#reincarnation_unlock");
  garden_tooltip=$("#garden_tooltip");
  guards_of_the_wall=$("#guards_of_the_wall");
  library_funds=$("#library_funds");

  reincarnation_tome_page=$("#reincarnation_tome_page");

  reincarnation_stay=$("#reincarnation_stay");

  library_dykt=$("#library_dykt");
  library_greeting=$("#library_greeting");
  librarian_warning=$("#librarian_warning");
  library_body=$("#library_body");
  fortress_block=$("#fortress_block");
  outerwall_block=$("#outerwall_block");
  indicators_table=$("#indicators_table");

  blacksmiths_button=$("#blacksmiths_button");
  button_tree=$("#button_tree");
  garden_block=$("#garden_block");
  reincarnation_dwarves=$("#reincarnation_dwarves");

  wizards_drink_button=$("#wizards_drink_button");
  warlocks_drink_button=$("#warlocks_drink_button");
  witches_drink_button=$("#witches_drink_button");
  wyverns_drink_button=$("#wyverns_drink_button");
  ogres_drink_button=$("#ogres_drink_button");
  humans_drink_button=$("#humans_drink_button");
  dwarves_drink_button=$("#dwarves_drink_button");
  weaklings_drink_button=$("#weaklings_drink_button");

  alchemist_tooltip=$("#alchemist_tooltip");
  alchemist_upgrades=$("#alchemist_upgrades");

  ore_button=$("#ore_button");
  hammer_button=$("#hammer_button");
  collect_medallions_button=$("#collect_medallions_button");
  medallions_label=$("#medallions_label");

  da1_block=$("#da1_block");
  da2_block=$("#da2_block");
  da3_block=$("#da3_block");
  da4_block=$("#da4_block");
  next_da_button=$("#next_da_button");
  next_target_button=$("#next_target_button");
  graveyard_multiplier_label=$("#graveyard_multiplier_label");
  graveyard_counter_label=$("#graveyard_counter_label");
  graveyard_rate_label=$("#graveyard_rate_label");

  skeletons_button=$("#skeletons_button");
  spirits_button=$("#spirits_button");
  specters_button=$("#specters_button");
  succubi_button=$("#succubi_button");

  graveyard_block=$("#graveyard_block");
  graveyard_lock=$("#graveyard_lock");
  graveyard_body=$("#graveyard_body");

  diamonds1_button=$("#diamonds1_button");
  diamonds2_button=$("#diamonds2_button");
  diamonds3_button=$("#diamonds3_button");
  diamonds4_button=$("#diamonds4_button");
  diamonds5_button=$("#diamonds5_button");
  diamonds6_button=$("#diamonds6_button");
  diamonds7_button=$("#diamonds7_button");
  diamonds8_button=$("#diamonds8_button");

  recast_button=$("#recast_button");
  hog_block=$("#hog_block");
  hog_multiplier_label=$("#hog_multiplier_label");
  hog_body=$("#hog_body");
  hog_lock=$("#hog_lock");
  giant1_button=$("#giant1_button");
  giant2_button=$("#giant2_button");
  giant3_button=$("#giant3_button");
  giant4_button=$("#giant4_button");
  giant5_button=$("#giant5_button");
  giant6_button=$("#giant6_button");
  giant7_button=$("#giant7_button");
  giant8_button=$("#giant8_button");

  graveyard3_buy1=$("#graveyard3_buy1");
  graveyard3_buy10=$("#graveyard3_buy10");
  graveyard3_buy100=$("#graveyard3_buy100");

  graveyard2_buy1=$("#graveyard2_buy1");
  graveyard2_buy10=$("#graveyard2_buy10");
  graveyard2_buy100=$("#graveyard2_buy100");

  graveyard_buy1=$("#graveyard_buy1");
  graveyard_buy10=$("#graveyard_buy10");
  graveyard_buy100=$("#graveyard_buy100");

  button_guide=$("#button_guide");
  guide_block=$("#guide_block");
  guide_page=$("#guide_page");

  quests_body=$("#quests_body");
  quest1_button=$("#quest1_button");
  quest2_button=$("#quest2_button");
  quest3_button=$("#quest3_button");
  quest4_button=$("#quest4_button");

  quest1_label=$("#quest1_label");
  quest2_label=$("#quest2_label");
  quest3_label=$("#quest3_label");
  quest4_label=$("#quest4_label");
  quest5_label=$("#quest5_label");
  quest6_label=$("#quest6_label");
  quest7_label=$("#quest7_label");
  quest8_label=$("#quest8_label");
  quests_block=$("#quests_block");
  quests_multiplier_label=$("#quests_multiplier_label");

  reincarnation_cancel=$("#reincarnation_cancel");
  reincarnation_noupgrades=$("#reincarnation_noupgrades");
  reincarnation_messengers=$("#reincarnation_messengers");
  reincarnation_quests=$("#reincarnation_quests");
  reincarnation_winecellar=$("#reincarnation_winecellar");
  reincarnation_options_block=$("#reincarnation_options_block");
  
  winecellar_lock=$("#winecellar_lock");
  winecellar_body=$("#winecellar_body");
  winecellar_block=$("#winecellar_block");
  wineage_button=$("#wineage_button");
  cupsize_button=$("#cupsize_button");
  grapes_button=$("#grapes_button");
  drunken_multiplier_label=$("#drunken_multiplier_label");

  dragon1_button=$("#dragon1_button");
  dragon2_button=$("#dragon2_button");
  dragon3_button=$("#dragon3_button");
  dragon4_button=$("#dragon4_button");
  dragon5_button=$("#dragon5_button");
  fire_multiplier_label=$("#fire_multiplier_label");
  tower4_block=$("#tower4_block");
  tower4_body=$("#tower4_body");
  tower4_name_label=$("#tower4_name_label");

  reincarnate_button=$("#reincarnate_button");

  rmana_label=$("#rmana_label");
  nextrmana_label=$("#nextrmana_label");
  rmana_multiplier_label=$("#rmana_multiplier_label");

  messenger_button=$("#messenger_button");

  catapults_button=$("#catapults_button");
  crossbows_button=$("#crossbows_button");
  cheiroballistras_button=$("#cheiroballistras_button");

  wizards_button=$("#wizards_button");
  warlocks_button=$("#warlocks_button");
  witches_button=$("#witches_button");
  wyverns_button=$("#wyverns_button");

  tower3_block=$("#tower3_block");
  tower3_lock=$("#tower3_lock");
  tower3_body=$("#tower3_body");

  tower2_block=$("#tower2_block");
  tower2_lock=$("#tower2_lock");
  tower2_body=$("#tower2_body");

  tower1_lock=$("#tower1_lock");
  tower1_body=$("#tower1_body");

  winecellar_buy1=$("#winecellar_buy1");
  winecellar_buy10=$("#winecellar_buy10");
  winecellar_buy100=$("#winecellar_buy100");

  tower4_buy1=$("#tower4_buy1");
  tower4_buy10=$("#tower4_buy10");
  tower4_buy100=$("#tower4_buy100");

  tower5_buymax=$("#tower5_buymax");

  tower3_buy1=$("#tower3_buy1");
  tower3_buy10=$("#tower3_buy10");
  tower3_buy100=$("#tower3_buy100");

  tower2_buy1=$("#tower2_buy1");
  tower2_buy10=$("#tower2_buy10");
  tower2_buy100=$("#tower2_buy100");

  tower1_buy1=$("#tower1_buy1");
  tower1_buy10=$("#tower1_buy10");
  tower1_buy100=$("#tower1_buy100");

  tower0_buy1=$("#tower0_buy1");
  tower0_buy10=$("#tower0_buy10");
  tower0_buy100=$("#tower0_buy100");

  weaklings_button=$("#weaklings_button");
  dwarves_button=$("#dwarves_button");
  humans_button=$("#humans_button");
  ogres_button=$("#ogres_button");

  rate1_label=$("#rate1_label");
  rate2_label=$("#rate2_label");
  rate3_label=$("#rate3_label");
  rate4_label=$("#rate4_label");

  counter1_label=$("#counter1_label");
  counter2_label=$("#counter2_label");
  counter3_label=$("#counter3_label");
  counter4_label=$("#counter4_label");

  import_save_dump=$("#import_save_dump");
  button_importsave=$("#button_importsave");
  button_copysave=$("#button_copysave");
  button_scientific=$("#button_scientific");
  settings_block=$("#settings_block");
  button_settings=$("#button_settings");
  button_save=$("#button_save");
  button_delsave=$("#button_delsave");
  button_audio=$("#button_audio");
  audio_control_volume=$("#audio_control_volume");

  tower0_bai=$(".tower0_bai");
  tower1_bai=$(".tower1_bai");
  tower2_bai=$(".tower2_bai");
  tower3_bai=$(".tower3_bai");
  tower4_bai=$(".tower4_bai");
  winecellar_bai=$(".winecellar_bai");
  graveyard_bai=$(".graveyard_bai");
  graveyard2_bai=$(".graveyard2_bai");
  graveyard3_bai=$(".graveyard3_bai");
  hog_bai=$(".hog_bai");

  all_alchemist_upgrades_disabled=$(".all_alchemist_upgrades_disabled");
  all_alchemist_upgrades=$(".button6_tiny");
  all_tower_drinking_buttons=$(".button_tower_drink");
  all_guide_buttons=$(".guide");
  fort_button=$(".fort_button");
  fort_button_disabled=$(".fort_button_disabled");
  all_sprites=$(".sprite");
  button_champ=$(".button_champ");

});//document.ready