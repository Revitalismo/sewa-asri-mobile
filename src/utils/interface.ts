interface Message {
    showMessage: boolean,
    name: string | ""
}

interface ParamListBase {
    [routeName: string]: object | undefined;
}

export { 
    Message ,
    ParamListBase
};