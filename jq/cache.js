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

var tower1_name_label;
var tower2_name_label;
var tower3_name_label;
var tower4_name_label;

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
var winecellar_bai;

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

var winecellar_buy1;
var winecellar_buy10;
var winecellar_buy100;

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

var next_messenger_label;

var reincarnate_button;

var dragon1_button;
var dragon2_button;
var dragon3_button;
var dragon4_button;
var dragon5_button;
var fire_multiplier_label;
var tower4_block;
var tower4_lock;
var tower4_body;
var tower4_name_label;

var wineage_button;
var cupsize_button;
var grapes_button;
var drunken_multiplier_label;
var drink_weaklings;
var drink_dwarves;
var drink_humans;
var drink_ogres;
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
var mine_button;
var alchemist_body;
var alchemist_lock;

var messenger_bonus_button;

var alchemist_upgrade_button;
var alchemist_upgrades;
var all_alchemist_upgrades;
var all_alchemist_upgrades_selected;

var weaklings_drink_button;
var dwarves_drink_button;
var humans_drink_button;
var ogres_drink_button;
var wizards_drink_button;
var warlocks_drink_button;
var witches_drink_button;
var wyverns_drink_button;
var all_tower_drinking_buttons;

var winecellar_mages_block;
var drink_wizards;
var drink_warlocks;
var drink_witches;
var drink_wyverns;

var courtyard_info_button;

var alchemist_label_elements=[];

var reincarnation_dwarves;

var garden_block;
var tree_button;

$(document).ready(function(){

  //CACHE

  tree_button=$("#tree_button");
  garden_block=$("#garden_block");

  reincarnation_dwarves=$("#reincarnation_dwarves");

  courtyard_info_button=$("#courtyard_info_button");

  drink_wyverns=$("#drink_wyverns");
  drink_wizards=$("#drink_wizards");
  drink_warlocks=$("#drink_warlocks");
  drink_witches=$("#drink_witches");
  winecellar_mages_block=$("#winecellar_mages_block");

  wizards_drink_button=$("#wizards_drink_button");
  warlocks_drink_button=$("#warlocks_drink_button");
  witches_drink_button=$("#witches_drink_button");
  wyverns_drink_button=$("#wyverns_drink_button");
  ogres_drink_button=$("#ogres_drink_button");
  humans_drink_button=$("#humans_drink_button");
  dwarves_drink_button=$("#dwarves_drink_button");
  weaklings_drink_button=$("#weaklings_drink_button");

  alchemist_upgrades=$("#alchemist_upgrades");
  alchemist_upgrade_button=$("#alchemist_upgrade_button");

  messenger_bonus_button=$("#messenger_bonus_button");
  alchemist_lock=$("#alchemist_lock");
  alchemist_body=$("#alchemist_body");
  mine_button=$("#mine_button");
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
  drink_weaklings=$("#drink_weaklings");
  drink_dwarves=$("#drink_dwarves");
  drink_humans=$("#drink_humans");
  drink_ogres=$("#drink_ogres");
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
  tower4_lock=$("#tower4_lock");
  tower4_body=$("#tower4_body");
  tower4_name_label=$("#tower4_name_label");

  reincarnate_button=$("#reincarnate_button");

  next_messenger_label=$("#next_messenger_label");

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

  winecellar_buy1=$("#winecellar_buy1");
  winecellar_buy10=$("#winecellar_buy10");
  winecellar_buy100=$("#winecellar_buy100");

  tower4_buy1=$("#tower4_buy1");
  tower4_buy10=$("#tower4_buy10");
  tower4_buy100=$("#tower4_buy100");

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

  tower1_name_label=$("#tower1_name_label");
  tower2_name_label=$("#tower2_name_label");
  tower3_name_label=$("#tower3_name_label");
  tower4_name_label=$("#tower4_name_label");

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

  all_alchemist_upgrades_selected=$(".button6_tiny_selected");
  all_alchemist_upgrades=$(".button6_tiny");
  all_tower_drinking_buttons=$(".button_tower_drink");
  all_guide_buttons=$(".guide");

});//document.ready