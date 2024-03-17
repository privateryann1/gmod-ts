/** @noSelfInFile */
LogDebug("sh_config initialization");

// ----- Configuration ----- //

const pvtryan: pvtryan = {
    config: {
        // Debug mode, useful for development
        debug: true,
    }
}

//----- Interfaces -----//

interface pvtryan {
    config: Config;
}

interface Config {
    debug: boolean;
}