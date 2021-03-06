﻿function GetPluginSettings()
{
	return {
		"name":			"OK-iframe",	// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"OKAPI",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.3",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Odnoklassniki social network API SDK. Doesn't work for external applications.",
		"author":		"DevMule",
		"help url":		"https://github.com/DevMule",
		"category":		"Platform specific",	// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		pf_singleglobal			// uncomment lines to enable flags...
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

AddCondition(0,	cf_trigger, "On init done", "initialization", "On init done", "Triggered on start of layout when user is successfully initialized.", "OnInitDone");

AddCondition(1,	cf_trigger, "On init fail", "initialization", "On init fail", "Triggered on start of layout when user initialization failed.", "OnInitFail");

AddCondition(2,	cf_trigger, "On user data get", "initialization", "On user data get", "Triggered when user okapi successfully got userdata.", "OnUserdataLoaded");


AddCondition(3,	cf_trigger, "On transaction success", "payment", "On transaction success", "Triggered when payment done successfully.", "OnTransactionDone");

AddCondition(4,	cf_trigger, "On transaction failed", "payment", "On transaction failed", "Triggered when player reject payment.", "OnTransactionfail");


AddCondition(5,	cf_trigger, "On invited", "friend invitation", "On invited", "Trigger when invite at least one friend.", "OnInviteDone");

AddCondition(6,	cf_trigger, "On invite declined", "friend invitation", "On invite declined", "Triggered when player reject friend invitation.", "OnInviteDecline");

AddCondition(7, cf_looping, "For each invited friend", "friend invitation", "For each invited friend", "Repeat the event for each invited friend.", "ForEachInvited");

AddCondition(8, cf_looping, "For each friend", "user data", "For each player friend", "Repeat the event for each friend. call 'On friends get' when done", "ForEachFriend");

AddCondition(9,	cf_trigger, "On friends get", "user data", "On friends get", "Triggered when player friends call done successfully.", "OnFriendsGet");


// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

AddStringParam("name",			"Name of the product");
AddStringParam("description",	"Description of product like 'with gold you can buy stuff'");
AddStringParam("code",			"Product identificator");
AddNumberParam("price",			"Cost in OKs");
AddStringParam("attributes",	"JSON key - value pairs containing additional transaction parameters to be transferred to the server");
AddAction(0, af_none, "Show payment", "windows", "Show payment: {0}, {3} OK", "Show payment dialog with some options.", "ShowPayment");

AddStringParam("text",	"Text that will be shown to friends");
AddStringParam("params",		"JSON custom parameters to be transferred to the server");
AddAction(1, af_none, "Show invite", "windows", "Show invite: {0}", "Show invite dialog.", "ShowInvite");

AddAction(2, af_none, "Init User", "initialization", "Init User", "try to initialize user, call triggers 'On init done' and 'On init fail'", "InitUser");
AddAction(3, af_none, "Call for User data", "user data", "Call for User data", "get user data like name, avatar, etc. When done trigger 'On user data get'", "CallForUserData");
AddAction(4, af_none, "Call for friends list", "user data", "Call for friends list", "get actual OKID's of friends, trigger 'On friends get' when done", "CallForUserFriends");

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel


AddExpression(0, ef_return_string, "Get init status", "initialization", "GetIsInit", "return True if user initialized successfully");


AddExpression(1, ef_return_string, "User first name", "user data", "GetUserFirstName", "return User first name if init success, else return null");

AddExpression(2, ef_return_string, "User last name", "user data", "GetUserLastName", "return User last name if init success, else return null");

AddExpression(3, ef_return_string, "User ID", "user data", "GetUserID", "return User ID if init success, else return null");

AddExpression(4, ef_return_string, "User avatar", "user data", "GetUserAvatar", "return avatar url if init success, else return null");


AddExpression(5, ef_return_string, "Current invited friend ID", "friend invitation", "GetInvitedFriendID", "friend ID in foreach-loop cycle");


AddExpression(6, ef_return_string, "Current user friend ID", "user data", "GetFriendID", "friend ID in foreach-loop cycle");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	//new cr.Property(ept_text, 	"App id",			"",		"insert APP ID here"),
	//new cr.Property(ept_text, 	"App public key",	"",		"insert APP PUBLIC KEY here")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}


// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}


// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}