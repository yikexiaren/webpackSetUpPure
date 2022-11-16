export const establishFn = (eleStr:string,className?:string|string[]|null,rest?:object):HTMLElement=>{
    const element = document.createElement(eleStr);
    if(className){
        classNamePage(element,className)
    }
    return element
}

const classNamePage = (ele:HTMLElement,className:string|string[]):void =>{
    if(<string>className){
        ele.classList.add(<string>className)
    }else{
        (<string[]>className).forEach((name:string) => {
            ele.classList.add(name)
        });
    }
}