import loading, {Loading} from "loading-cli";

let instance: Loading

export const loadingBar = (): Loading => {
    if(!instance)
        instance = loading("Creating translations...".blue);

    return instance;
};
