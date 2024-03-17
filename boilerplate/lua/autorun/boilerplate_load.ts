/** @noSelfInFile */

function LogDebug(message: string){
    if(boilerplate?.config?.debug ?? false){
        print(`[boilerplate DEBUG:] ${message}`);
    }
}

if (SERVER) {
    // Load Configuration File
    include( "boilerplate/sh_config.lua" );
    AddCSLuaFile( "boilerplate/sh_config.lua" );

    // Load all files in the core folder
    const core_path: string[] = file.Find( "boilerplate/core/*", "LUA" );
    core_path.forEach( (v) => {
        if(v.includes("sh_")){
            LogDebug("Adding shared file: " + v)
            include( "boilerplate/core/" + v );
            AddCSLuaFile( "boilerplate/core/" + v );
        }else if(v.includes("sv_")){
            include( "boilerplate/core/" + v );
            LogDebug("Adding server file: " + v);
        }else if(v.includes("cl_")){
            LogDebug("Adding client file: " + v);
            AddCSLuaFile( "boilerplate/core/" + v );
        }
    });
} else {
    // Load all files in the core folder
    const core_path: string[] = file.Find( "boilerplate/core/*", "LUA" );
    core_path.forEach( (v) => {
        if(v.includes("sh_")){
            LogDebug("Adding shared file: " + v)
            include( "boilerplate/core/" + v );
        }else if(v.includes("cl_")){
            LogDebug("Adding client file: " + v);
            include( "boilerplate/core/" + v );
        }
    });
}