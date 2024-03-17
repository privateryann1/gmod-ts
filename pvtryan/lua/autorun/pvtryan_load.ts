/** @noSelfInFile */

function LogDebug(message: string){
    if(pvtryan?.config?.debug ?? false){
        print(`[pvtryan DEBUG:] ${message}`);
    }
}

if (SERVER) {
    // Load Configuration File
    include( "pvtryan/sh_config.lua" );
    AddCSLuaFile( "pvtryan/sh_config.lua" );

    // Load all files in the core folder
    const core_path: string[] = file.Find( "pvtryan/core/*", "LUA" );
    core_path.forEach( (v) => {
        if(v.includes("sh_")){
            LogDebug("Adding shared file: " + v)
            include( "pvtryan/core/" + v );
            AddCSLuaFile( "pvtryan/core/" + v );
        }else if(v.includes("sv_")){
            include( "pvtryan/core/" + v );
            LogDebug("Adding server file: " + v);
        }else if(v.includes("cl_")){
            LogDebug("Adding client file: " + v);
            AddCSLuaFile( "pvtryan/core/" + v );
        }
    });
} else {
    // Load all files in the core folder
    const core_path: string[] = file.Find( "pvtryan/core/*", "LUA" );
    core_path.forEach( (v) => {
        if(v.includes("sh_")){
            LogDebug("Adding shared file: " + v)
            include( "pvtryan/core/" + v );
        }else if(v.includes("cl_")){
            LogDebug("Adding client file: " + v);
            include( "pvtryan/core/" + v );
        }
    });
}