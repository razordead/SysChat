// Script to be run with jsexec, adds the default config info to services.ini

// Example configuration (in ctrl/services.ini):

// *** New format
// [RazorPage]
// Port=10005
// MaxClients=5
// Command=razorpageservice.js

// [RazorChat]
// Port=10006
// MaxClients=5
// Command=razorchatservice.js

// *** Old format
// [SysChat]
// Port=10005
// MaxClients=5
// Command=syschatservice.js

var servicesfile=system.ctrl_dir + "services.ini";
var oldservicefile=system.mods_dir + "syschatservice.js";
var syschatexists=false;
var razorpageexists=false;
var razorchatexists=false;
var syschatsection="SysChat";
var razorpagesection="RazorPage";
var razorchatsection="RazorChat";

var file=new File(servicesfile);
if(file.exists)
{
	file.open(file.exists ? 'r+':'w+');
	existingsections=file.iniGetSections();
	addsyschattoini(existingsections);
	deloldservicefile();
	file.close();
}

function addsyschattoini(existingsections)
{
	for(i=0; i<existingsections.length; i++)
	{
		if(existingsections[i].toLowerCase()==syschatsection.toLowerCase())
		{
			syschatexists=true;
		}
		
		if(existingsections[i].toLowerCase()==razorpagesection.toLowerCase())
		{
			razorpageexists=true;
		}
		
		if(existingsections[i].toLowerCase()==razorchatsection.toLowerCase())
		{
			razorchatexists=true;
		}
	}
	
	if(syschatexists)
	{
		// remove [SysChat] from services.ini
		file.iniRemoveSection(syschatsection);
		print("[SysChat] removed from services.ini");
	}
	else
	{
		print("[SysChat] doesn't exist in services.ini");
	}
	
	if(!razorpageexists)
	{
		// add [RazorPage] to services.ini
		file.iniSetValue(razorpagesection, "Port", "10005");
		file.iniSetValue(razorpagesection, "MaxClients", "5");
		file.iniSetValue(razorpagesection, "Command", "razorpageservice.js");
		print("[RazorPage] added to services.ini");
	}
	else
	{
		print("[RazorPage] already exists in services.ini");
	}
	
	if(!razorchatexists)
	{
		// add [RazorChat] to services.ini
		file.iniSetValue(razorchatsection, "Port", "10006");
		file.iniSetValue(razorchatsection, "MaxClients", "20");
		file.iniSetValue(razorchatsection, "Command", "razorchatservice.js");
		print("[RazorChat] added to services.ini");
	}
	else
	{
		print("[RazorChat] already exists in services.ini");
	}
}

function deloldservicefile()
{
	// this will currently delete sbbs/mods/syschatservice.js
	if(file_exists(oldservicefile))
	{
		file_remove(oldservicefile);
		print("syschatservice.js deleted");
	}
	else
	{
		print("syschatservice.js doesn't exist");
	}
}

