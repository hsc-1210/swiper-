(function (w){
        function transformCss(el,prop,val){//el:元素对象 prop:属性 val:属性值
            if (el.styles===undefined){
                el.styles={}
            }
            let str=''
            if (arguments.length===3){
                el.styles[prop]=val
                for (let i in el.styles) {
                    switch (i) {
                        case 'translateX':
                        case 'translateY':
                        case 'translateZ':
                            str+=`${i}(${el.styles[i]}px) `
                            el.style.transform = str
                            break;
                        case 'scale':
                        case 'scaleX':
                        case 'scaleY':
                        case 'scaleZ':
                            str+=`${i}(${el.styles[i]}) `
                            el.style.transform = str
                            break;
                        case 'rotate':
                        case 'rotateX':
                        case 'rotateY':
                        case 'rotateZ':
                            str+=`${i}(${el.styles[i]}deg) `
                            el.style.transform = str
                            break;
                    }
                }
            }
            if (arguments.length===2){
                if (el.styles[prop]){
                    return  el.styles[prop]
                }
                var subStr =prop.substr(0,5)
                if (subStr==='scale'){
                    return 1
                }else {
                    return 0
                }
            }
        }
        w.transformCSS=transformCss
    }
)(window)