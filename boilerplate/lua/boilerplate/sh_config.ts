/** @noSelfInFile */
LogDebug("sh_config initialization");

// ----- Configuration ----- //

const boilerplate: boilerplate = {
    config: {
        // Debug mode, useful for development
        debug: true,
    }
}

//----- Interfaces -----//

interface boilerplate {
    config: Config;
}

interface Config {
    debug: boolean;
}